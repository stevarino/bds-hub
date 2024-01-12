import * as mc from '@minecraft/server';

import * as server from '../server.js';
import * as mgt from './types.js';
import * as text from '../text.js';
import {DefaultMap} from '../../../lib/default_map.js';
import * as compiler from './compiler.js';
import {RegionNode, getRegionIntersection} from '../regions.js';

type vec3p = Partial<mc.Vector3>;
type vec2p = Partial<mc.Vector2>;

/** Player specific data */
class PlayerContext {
  curLocation: mc.Vector3;
  prevLocation: mc.Vector3;
  prevRegions = new Set<string>();
  regions = new Set<string>();

  constructor(
    public player: mc.Player,
    public stage: string,
    public stack: Function[],
  ) {
    this.curLocation = player.location;
    this.prevLocation = player.location;
  }

  updateRegions(root: RegionNode) {
    this.prevRegions = this.regions;
    this.regions = new Set<string>();
    for (const region of root.subtree?.find(this.curLocation) ?? []) {
      this.regions.add(region.name!);
    }
  }
}

/** Compiled stage statements by event type */
interface StageFunctions {
  stage: mgt.Stage | undefined;
  onEnter: Function[];
  onTick: Function[];
  onExit: Function[];
}

/**
 * Game Context, maps to the runtime state of a Minigame.
 **/
export class Context {
  stage = '';
  players = new Map<string, PlayerContext>();

  gameVars = new Map<string, unknown>();
  playerVars = new Map<string, Map<string, unknown>>();

  currentPlayer: string | undefined;

  /** Mapping of stage name to executable code */
  stages = new DefaultMap<string, StageFunctions>(() => {
    return {
      stage: undefined,
      onEnter: [],
      onTick: [],
      onExit: [],
    };
  });

  regions = new Map<string, mgt.NamedRegion>();
  regionGroups = new Map<string, string[]>();

  stack: Function[] = [];

  constructor(
    public game: mgt.Minigame,
    public region: RegionNode,
  ) {
    this.init();
  }

  init() {
    this.stages.clear();
    for (const stage of this.game.stages) {
      for (const event of ['onEnter', 'onExit', 'onTick'] as mgt.EventType[]) {
        const ev = stage[event];
        const ctxStage = this.stages.get(stage.id);
        ctxStage.stage = stage;
        for (const statement of ev ?? []) {
          ctxStage[event].push(
            new Function('ctx', 'pid', compiler.compileExpression(statement)),
          );
        }
      }
    }

    this.regions.clear();
    for (const region of this.game.regions ?? []) {
      this.regions.set(region.name, region);
    }
    this.regionGroups.clear();
    for (const [group, regions] of Object.entries(
      this.game.regionGroups ?? {},
    )) {
      this.regionGroups.set(group, regions);
    }
  }

  addPlayer(player: mc.Player) {
    if (this.game.mode !== mgt.GameMode.parellel) return;
    if (!this.game.active) return;

    const stage = this.game.defaultStage;
    this.players.set(
      player.id,
      new PlayerContext(player, stage, [...this.stages.get(stage).onEnter]),
    );
  }

  removePlayer(player: mc.Player) {
    this.players.delete(player.id);
  }

  /** Returns the mc.Player object of the current player */
  getPlayer() {
    return server.PLAYERS.get(this.currentPlayer!);
  }

  getPlayerContext() {
    const ctx = this.players.get(this.currentPlayer!);
    if (ctx === undefined) {
      console.error('Unable to find player context');
    }
    return ctx;
  }

  setPlayer(player: mc.Player) {
    this.currentPlayer = player.id;
    return this;
  }

  onTick() {
    for (const p of this.players.values()) {
      p.prevLocation = p.curLocation;
      p.curLocation = p.player.location;
      p.updateRegions(this.region);
    }
    this.performEvents();
  }

  performEvents() {
    if (this.game.mode === mgt.GameMode.singular) {
      this.stack.push(...this.stages.get(this.stage).onTick);
      for (const func of [...this.stack]) {
        if (func.call(null, this, null) === true) break;
      }
    } else if (this.game.mode === mgt.GameMode.parellel) {
      for (const [pid, status] of this.players.entries()) {
        status.stack.push(...this.stages.get(status.stage).onTick);
        for (const func of [...status.stack]) {
          if (func.call(null, this, pid) === true) break;
        }
      }
    } else {
      throw new Error('Unrecognized game mode');
    }
  }

  /** Get a player variable */
  gtP(name: string) {
    return this.playerVars.get(this.currentPlayer!)?.get(name);
  }

  /** Set a player variable */
  stP(name: string, value: unknown) {
    this.playerVars.get(this.currentPlayer!)?.set(name, value);
  }

  /** Add the player to the game leaderboard */
  lb(value: number) {
    // TODO
  }

  /** Get a player variable */
  gtG(name: string) {
    return this.gameVars.get(name);
  }

  /** Set a player variable */
  stG(name: string, value: unknown) {
    this.gameVars.set(name, value);
  }

  tck(): number {
    return mc.world.getAbsoluteTime();
  }

  /** Format a ms time into MM:SS.0ms */
  fmS(ms: number): string {
    const minutes = Math.floor(ms / 60_000);
    return [
      ((minutes < 10 ? '0' : '') + minutes.toString()).slice(-2),
      ':',
      ('0' + Math.floor((ms - minutes * 60_000) / 1000).toString()).slice(-2),
      '.',
      ('00' + (ms % 1000).toString()).slice(-3),
    ].join('');
  }

  /** Go to a given state for the player/game */
  gto(stage: string) {
    if (this.game.mode === mgt.GameMode.singular) {
      this.stack.length = 0;
      this.stack.push(...this.stages.get(this.stage)!.onExit);
      this.stage = stage;
      this.stack.push(...this.stages.get(this.stage)!.onEnter);
    } else if (this.game.mode === mgt.GameMode.parellel) {
      const status = this.players.get(this.currentPlayer ?? '');
      if (status === undefined) {
        throw new Error(`Player not found: "${this.currentPlayer}"`);
      }
      status.stack.length = 0;
      status.stack.push(...this.stages.get(status.stage)!.onExit);
      status.stage = stage;
      status.stack.push(...this.stages.get(status.stage)!.onEnter);
    } else {
      throw new Error('Unrecognized game mode');
    }
    return true;
  }

  /** Returns the current Player ID */
  pid() {
    return this.currentPlayer;
  }

  /** Returns the current Player Name */
  pnm() {
    return this.getPlayer()?.name;
  }

  /** Given a Player State enum, tests if it is currently true */
  pis(state: mgt.PLAYER_STATE): boolean | undefined {
    switch (state) {
      case mgt.PLAYER_STATE.Climbing:
        return this.getPlayer()?.isClimbing;
      case mgt.PLAYER_STATE.Emoting:
        return this.getPlayer()?.isEmoting;
      case mgt.PLAYER_STATE.Falling:
        return this.getPlayer()?.isFalling;
      case mgt.PLAYER_STATE.Flying:
        return this.getPlayer()?.isFlying;
      case mgt.PLAYER_STATE.Gliding:
        return this.getPlayer()?.isGliding;
      case mgt.PLAYER_STATE.InWater:
        return this.getPlayer()?.isInWater;
      case mgt.PLAYER_STATE.Jumping:
        return this.getPlayer()?.isJumping;
      case mgt.PLAYER_STATE.OnGround:
        return this.getPlayer()?.isOnGround;
      case mgt.PLAYER_STATE.Sleeping:
        return this.getPlayer()?.isSleeping;
      case mgt.PLAYER_STATE.Sneaking:
        return this.getPlayer()?.isSneaking;
      case mgt.PLAYER_STATE.Sprinting:
        return this.getPlayer()?.isSprinting;
      case mgt.PLAYER_STATE.Swimming:
        return this.getPlayer()?.isSwimming;
    }
  }

  /** Tests if a player is in the specified region */
  pir(region: string) {
    const regions = this.regionGroups.get(region) ?? [region];
    const pctx = this.getPlayerContext();
    if (pctx === undefined) return false;
    for (const reg of regions) {
      if (pctx.regions.has(reg)) {
        return true;
      }
    }
    return false;
  }

  /** Tests if a player has passed through the specified region */
  ptr(region: string) {
    const p = this.getPlayerContext();
    if (p === undefined) return false;
    const regions = this.regionGroups.get(region) ?? [region];
    for (const regionName of regions) {
      const region = this.regions.get(regionName);
      if (region === undefined) continue;
      const intersect = getRegionIntersection(
        region,
        p.curLocation,
        p.prevLocation,
      );
      if (intersect !== undefined) return true;
    }
    return false;
  }

  /** Returns a list of players in the given region */
  rgp(region: string) {
    const regions = this.regionGroups.get(region) ?? [region];
    const players: string[] = [];
    for (const [pid, ctx] of this.players.entries()) {
      for (const region of regions) {
        if (ctx.regions.has(region)) {
          players.push(pid);
        }
      }
    }
    return players;
  }

  /** Teleport a player the specified region */
  tel(region: string, location: mc.Vector3 | {}, facing: mc.Vector2 | {}) {
    const player = this.getPlayer();
    if (player === undefined) return;

    if (!('x' in location)) {
      const reg = this.regions.get(region);
      if (reg === undefined) return;
      location = {
        x: Math.random() * (reg.pos1.x - reg.pos2.x) + reg.pos2.x,
        y: Math.random() * (reg.pos1.y - reg.pos2.y) + reg.pos2.y,
        z: Math.random() * (reg.pos1.z - reg.pos2.z) + reg.pos2.z,
      };
    }

    const loc = location as mc.Vector3;
    const rot = 'x' in facing ? ` ${facing.x} ${facing.y}` : '';
    player.runCommand(`teleport ${loc.x} ${loc.y} ${loc.z}${rot}`);
  }

  /** Give the current player an achievement */
  ach(name: string, desc: string) {
    // TODO
  }

  msg(message: string) {
    this.getPlayer()?.sendMessage(message);
  }

  bdc(message: string) {
    mc.world.sendMessage(message);
  }

  /** Fill a region with a block type */
  blk(region: string, block: string) {
    // TODO
  }

  /** Counts the number of players, performing cleanup */
  pln(playerList: string) {
    const valid: string[] = [];
    for (const p of this.frP(playerList)) {
      if (!server.PLAYERS.has(p)) continue;
      // TODO: player in game region
      valid.push(p);
    }
    this.gameVars.set(playerList, valid);
    return valid.length;
  }

  /** Removes a player from the player list */
  prm(playerList: string, playerId: string) {
    const valid: string[] = [];
    for (const p of this.frP(playerList)) {
      if (p !== playerId) valid.push(p);
    }
    this.gameVars.set(playerList, valid);
  }

  /** For each player */
  *frP(playerList: string): IterableIterator<string> {
    const list = this.gameVars.get(playerList);
    if (list === undefined) {
      // TODO: console.warn()
      return;
    }
    if (!Array.isArray(list)) {
      // TODO: console.warn()
      return;
    }
    if (list.length === 0) return 0;
    for (const p of list) {
      if (typeof p !== 'string') {
        // TODO: console.warn()
        return;
      }
      yield p;
    }
  }

  setCameraLocation(
    player: mc.Player,
    loc: vec3p,
    relOff: vec3p,
    absOff: vec3p,
  ) {
    const pos = Object.assign({}, player.location, loc) as mc.Vector3;
    const ang = Object.assign({}, player.getRotation());
    pos.x += absOff.x ?? 0;
    pos.y += absOff.y ?? 0;
    pos.z += absOff.z ?? 0;

    const vals = [0, ...Object.values(relOff)];
    if (Math.max(...vals) === 0 && Math.min(...vals) === 0) return pos;

    const x = relOff.x ?? 0;
    const y = relOff.y ?? 0;
    const z = relOff.z ?? 0;
    // 0 = fwd, 90 = down
    const xCos = Math.cos((ang.x / 180) * Math.PI);
    const xSin = Math.sin((ang.x / 180) * Math.PI);
    // 0 = North, 90 = West?
    // (cos, sin): N: 1,0, S: -1,0, W: 0,1 E: 0,-1
    const yCos = Math.cos((ang.y / 180) * Math.PI);
    const ySin = Math.sin((ang.y / 180) * Math.PI);

    // TODO: x rotation (vertical tilt)

    pos.z += ySin * x - yCos * z;
    pos.x += yCos * x - ySin * z;
    return pos;
  }

  setCameraEasing(
    cam:
      | mc.CameraSetFacingOptions
      | mc.CameraSetPosOptions
      | mc.CameraSetRotOptions,
    ease: mgt.CAMERA_EASE,
    time: number,
  ) {
    if (ease !== mgt.CAMERA_EASE.None) {
      cam.easeOptions = {
        easeTime: time,
        easeType:
          mc.EasingType[mgt.CAMERA_EASE[ease] as keyof typeof mc.EasingType],
      };
    }
  }

  cmE(
    loc: vec3p,
    relOff: vec3p,
    absOff: vec3p,
    tag: string,
    ease: mgt.CAMERA_EASE,
    easeTime: number,
  ) {
    const player = this.getPlayer();
    if (player === undefined) return;
    const pos = this.setCameraLocation(player, loc, relOff, absOff);
    const entity = player.dimension.getEntities({tags: [tag]})[0];
    if (entity === undefined) {
      console.warn(
        `Game [${this.game.id}]: Unable to locate entity with tag: "${tag}"`,
      );
      return;
    }
    const cam: mc.CameraSetFacingOptions = {
      facingEntity: entity,
      location: pos,
    };
    this.setCameraEasing(cam, ease, easeTime);
    player.camera.setCamera('free', cam);
  }

  cmF(
    loc: vec3p,
    relOff: vec3p,
    absOff: vec3p,
    facing: mc.Vector3,
    ease: mgt.CAMERA_EASE,
    easeTime: number,
  ) {
    const player = this.getPlayer();
    if (player === undefined) return;
    const pos = this.setCameraLocation(player, loc, relOff, absOff);
    const cam: mc.CameraSetPosOptions = {facingLocation: facing, location: pos};
    this.setCameraEasing(cam, ease, easeTime);
    player.camera.setCamera('free', cam);
  }

  cmR(
    loc: vec3p,
    relOff: vec3p,
    absOff: vec3p,
    relAng: vec2p,
    absAng: vec2p,
    ease: mgt.CAMERA_EASE,
    easeTime: number,
  ) {
    const player = this.getPlayer();
    if (player === undefined) return;
    const pos = this.setCameraLocation(player, loc, relOff, absOff);
    const ang = Object.assign({}, player.getRotation());
    ang.x = absAng.x ?? ang.x;
    ang.y = absAng.y ?? ang.y;
    ang.x += relAng.x ?? 0;
    ang.y += relAng.x ?? 0;

    const cam: mc.CameraSetRotOptions = {location: pos, rotation: ang};
    this.setCameraEasing(cam, ease, easeTime);
    player.camera.setCamera('free', cam);
  }

  /** Fade the camera */
  fad(color: mgt.CAMERA_FADE, fadeIn: number, hold: number, fadeOut: number) {
    const player = this.getPlayer();
    if (player === undefined) return;

    let fadeColor = {red: 0, green: 0, blue: 0};
    if (/^#[0-9a-fA-F]{3}$/.test(color)) {
      const r = parseInt(color.slice(1, 2), 16);
      const g = parseInt(color.slice(2, 3), 16);
      const b = parseInt(color.slice(3, 4), 16);
      fadeColor = {
        red: (r * 16 + r) / 255,
        green: (g * 16 + g) / 255,
        blue: (b * 16 + b) / 255,
      };
    } else if (/^#[0-9a-fA-F]{6}$/.test(color)) {
      fadeColor = {
        red: parseInt(color.slice(1, 3), 16) / 255,
        green: parseInt(color.slice(3, 5), 16) / 255,
        blue: parseInt(color.slice(5, 7), 16) / 255,
      };
    }
    player.camera.fade({
      fadeColor,
      fadeTime: {
        fadeInTime: fadeIn ?? 0.25,
        holdTime: hold ?? 0.25,
        fadeOutTime: fadeOut ?? 0.25,
      },
    });
  }

  /** Change player permissions */
  per(cam: boolean, mov: boolean) {
    const player = this.getPlayer();
    if (player === undefined) return;

    player.runCommand(
      `inputpermission set @s camera ${cam ? 'enabled' : 'disabled'}`,
    );
    player.runCommand(
      `inputpermission set @s movement ${mov ? 'enabled' : 'disabled'}`,
    );
  }

  /** Play a sound for the player */
  snd(sound: string, pitch: number, volume: number) {
    const player = this.getPlayer();
    if (player === undefined) return;

    player.playSound(sound, {pitch, volume});
  }

  tit(
    title: string,
    subtitle: string,
    fadeIn: number,
    hold: number,
    fadeOut: number,
  ) {
    const player = this.getPlayer();
    if (player === undefined) return;
    text.displayTitle(player, title, subtitle, fadeIn, hold, fadeOut);
  }
}
