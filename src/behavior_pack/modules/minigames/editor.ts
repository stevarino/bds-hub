/**
 * minigames/editor.ts - A series of functions for minigame management and editing.
 */

import * as main from './main.js';
import * as mgt from './types.js';
import * as exprLib from './expressions.js';
import * as forms from '../../lib/form.js';
import * as storage from '../storage.js';
import {Discussion, defineActions} from '../discussion.js';

import {
  EXPRESSION_CATEGORIES as EC,
  EXPRESSION_ARGUMENT_TYPES as AT,
  ExpressionTuple as TT,
} from './types.js';
import {getField} from './editor_widgets.js';

defineActions({ManageGames});

const MG_STORAGE = main.MG_STORAGE

interface ValidationState {
  regionMap: {[key: string]: mgt.NamedRegion};
  stageMap: {[key: string]: mgt.Stage};
  playerVars: Set<string>;
  gameVars: Set<string>;
  errors: string[];
}

class Address {
  constructor(
    public minigame: mgt.Minigame,
    public stageIndex: number,
    public eventType: mgt.EventType,
    public root: mgt.StatementList,
    public path: number[],
  ) {}

  next(index: number) {
    return new Address(
      this.minigame,
      this.stageIndex,
      this.eventType,
      this.root,
      [...this.path, index],
    );
  }

  stage() {
    return this.minigame.stages[this.stageIndex]!;
  }

  toString() {
    const parts = [this.stage().id];
    let target: mgt.ExpressionTuple | mgt.StatementList = this.root;
    for (const i of this.path) {
      if (isStatementList(target)) {
        parts.push(`[${i}]`);
      } else {
        const def = exprLib.Expressions[(target as mgt.ExpressionTuple)[0]]!;
        const arg = def.args[i - 1]!;
        if (arg === undefined) break;
        parts.push(`${def.name} [ ${arg[0]} ]`);
      }
      target = target[i] as mgt.ExpressionTuple;
    }
    return parts.join(' > ');
  }
}

/** Save the given minigame to world dynamic properties */
function saveMinigame(mg: mgt.Minigame) {
  // , gcRegion = false) {
  console.log('SAVING: ', JSON.stringify(mg));
  storage.WORLD.setJSON(mgt.getMinigamePath(mg), mg);
  // TODO add regions
  // TODO gc regions
  // TODO update main
}

/** Check the game is valid, and therefore enablable */
function validateGame(mg: mgt.Minigame) {
  /** mapping of all regions */
  const vs: ValidationState = {
    regionMap: {},
    stageMap: {},
    errors: [],
    playerVars: new Set<string>(),
    gameVars: new Set<string>(),
  };

  const players = new Set(storage.getPlayerIds());
  if (!players.has(mg.owner)) {
    vs.errors.push('Owner not found');
  }

  // check for duplicate region names
  for (const r of mg.regions ?? []) {
    if (vs.regionMap[r.name] !== undefined) {
      vs.errors.push(`Duplicate region name: "${r.name}"`);
    }
    vs.regionMap[r.name] = r;
  }

  for (const v of Object.keys(mg.playerVars ?? {})) {
    vs.playerVars.add(v);
  }

  for (const v of Object.keys(mg.gameVars ?? {})) {
    if (vs.playerVars.has(v)) {
      vs.errors.push(
        `Variable name shared between player and game variables: "${v}"`,
      );
    }
    vs.gameVars.add(v);
  }

  // check for region/region-group conflicts
  // check for missing regions within a group
  for (const [g, rs] of Object.entries(mg.regionGroups ?? {})) {
    if (vs.regionMap[g] !== undefined) {
      // region group shares a name with a region
      vs.errors.push(`Region group name already allocated: "${g}"`);
    }
    for (const r of rs) {
      if (vs.regionMap[r] === undefined) {
        vs.errors.push(`Region group "${g}": Region "${r}" not found.`);
      }
    }
  }

  for (const [stageIndex, s] of (mg.stages ?? []).entries()) {
    // check for duplicate stage names
    if (vs.stageMap[s.id] !== undefined) {
      vs.errors.push(`Duplicate stage name: ${s.id}`);
    }
    vs.stageMap[s.id] = s;

    for (const ev of mgt.EventNames) {
      // clean up empty events
      if (s[ev]?.length === 0) {
        delete s[ev];
      }

      for (const [i, expr] of (s[ev] ?? []).entries()) {
        validateExpression(
          new Address(mg, stageIndex, ev, s[ev]!, [i]),
          expr,
          vs,
        );
      }
    }
  }
  return vs.errors;
}

function validateExpression(
  addr: Address,
  expr: mgt.ExpressionTuple,
  vs: ValidationState,
) {
  const def = exprLib.Expressions[expr[0]];
  if (def === undefined) {
    vs.errors.push(`${addr} : Unrecognized expression: ${expr[0]}`);
  } else {
    if (def.args.length !== expr.length - 1) {
      vs.errors.push(
        `${addr} : Expected ${def.args.length} arguments, received ${
          expr.length - 1
        }`,
      );
    }
  }
  for (let i = 1; i < expr.length; i++) {
    const arg = expr[i];
    if (arg === null) {
      vs.errors.push(`${addr} : Unset expression argument`);
    } else if (Array.isArray(arg)) {
      if (typeof arg[0] === 'string') {
        // Expression
        validateExpression(addr.next(i), arg as mgt.ExpressionTuple, vs);
      } else {
        const parent = addr.next(i);
        // Statement List
        for (const [i, expr] of arg.entries()) {
          validateExpression(parent.next(i), expr as mgt.ExpressionTuple, vs);
        }
      }
    } else if (def !== undefined) {
      const argDef = def.args[i - 1];
      if (argDef !== undefined) {
        const argType = argDef[1];
        if (
          argType === AT.Region &&
          vs.regionMap[arg as string] === undefined
        ) {
          vs.errors.push(`${addr} : Unknown region: "${arg}"`);
        }
        if (argType === AT.Stage && vs.stageMap[arg as string] === undefined) {
          vs.errors.push(`${addr} : Unknown stage: "${arg}"`);
        }
        if (argType === AT.VarPlayer && !vs.playerVars.has(arg as string)) {
          vs.errors.push(`${addr} : Unknown player variable: "${arg}"`);
        }
        if (argType === AT.VarGame && !vs.gameVars.has(arg as string)) {
          vs.errors.push(`${addr} : Unknown game variable: "${arg}"`);
        }
        if (
          argType === AT.Var &&
          !vs.gameVars.has(arg as string) &&
          !vs.playerVars.has(arg as string)
        ) {
          vs.errors.push(`${addr} : Unknown variable: "${arg}"`);
        }
      }
    }
  }
}

/** Display a selection-list of games */
export async function ManageGames(d: Discussion) {
  const buttons: forms.ActionButton[] = [
    {
      text: 'New Minigame',
      action: async () => newGame(d),
    },
  ];
  for (const mg of MG_STORAGE.keys()) {
    const json = MG_STORAGE.getJSON(mg) as mgt.Minigame;
    if (
      d.player.id === json?.owner ||
      (json?.editors ?? []).includes(d.player.id)
    ) {
      buttons.push(forms.makeButton(json.id, editGame, d, json));
    }
  }
  return forms.ActionForm(d.player, 'Select a Minigame', '', buttons);
}

/** Create a new game */
export async function newGame(d: Discussion): Promise<void> {
  const loc = d.player.location;
  const form = {
    id: forms.textbox('', {
      displayName: 'ID',
      validators: [{regex: /^[^/]+$/, message: 'Slashes not allowed'}],
    }),
    mode: forms.dropdownFromEnum<number>(mgt.GameMode),
    nw: forms.vector3({
      displayName: 'First Corner',
      defaultValue: {
        x: Math.floor(loc.x - 8),
        y: Math.floor(loc.y),
        z: Math.floor(loc.z - 8),
      },
      validators: [{isSet: true}],
    }),
    se: forms.vector3({
      displayName: 'Second Corner',
      defaultValue: {
        x: Math.floor(loc.x + 8),
        y: Math.floor(loc.y + 4),
        z: Math.floor(loc.z + 8),
      },
      validators: [{isSet: true}],
    }),
  };
  const {results} = await forms.ModalForm(d.player, 'New Minigame', form);
  if (results === undefined) return;

  const mg: mgt.Minigame = {
    id: form.id.get(),
    mode: form.mode.get(),
    active: false,
    region: {
      name: form.id.get(),
      pos1: form.nw.get(),
      pos2: form.se.get(),
    },
    stages: [
      {
        id: 'default',
      },
    ],
    defaultStage: 'default',
    owner: d.player.id,
  };

  saveMinigame(mg);
  return editGame(d, mg);
}

/** Minigame edit screen */
async function editGame(d: Discussion, mg: mgt.Minigame) {
  const body = [
    `Editing ${mg.id}`,
    `Game is: ${mg.active ? 'Open' : 'Closed'}`,
    `Corner: ${JSON.stringify(mg.region.pos1)}`,
    `Corner: ${JSON.stringify(mg.region.pos2)}`,
    `Regions: ${mg.regions?.length ?? 0}`,
    `Stages: ${mg.stages.length}`,
  ];
  const buttons: forms.ActionButton[] = [
    forms.makeButton(
      `${mg.active ? 'Dea' : 'A'}ctivate Game`,
      activateGame,
      d,
      mg,
    ),
    forms.makeButton('Edit Properties', editProperties, d, mg),
    forms.makeButton('Edit Collaborators', editCollaborators, d, mg),
    forms.makeButton('Delete Game', maybeDeleteGame, d, mg),
    forms.makeButton('Regions', editRegions, d, mg),
    forms.makeButton('Stages', editStages, d, mg),
  ];
  return forms.ActionForm(d.player, 'Minigame Edit', body.join('\n'), buttons);
}

/** Try to activate the game if valid */
async function activateGame(d: Discussion, mg: mgt.Minigame) {
  if (mg.active) {
    mg.active = false;
    saveMinigame(mg);
    return editGame(d, mg);
  }
  const errors = validateGame(mg);
  if (errors.length > 0) {
    const msg = `Unable to activate game due to the following errors:\n\n${errors.join(
      '\n\n',
    )}`;
    await d.error(msg);
    return editGame(d, mg);
  }
  mg.active = true;
  saveMinigame(mg);
  return editGame(d, mg);
}

/** Confirm that the game should be deleted  */
async function maybeDeleteGame(d: Discussion, mg: mgt.Minigame) {
  return confirm(
    d,
    `Delete minigame ${mg.id}`,
    'Are you sure you want to delete this minigame?',
    () => editGame(d, mg),
    () => reallyDeleteGame(d, mg),
    'Delete',
  );
}

/** A generic confirmation dialogue */
async function confirm(
  d: Discussion,
  title: string,
  msg: string,
  no: () => Promise<void>,
  yes: () => Promise<void>,
  yesText?: string,
) {
  return d.actionForm(title, msg, [
    {text: 'Cancel', action: no},
    {text: yesText ?? 'Confirm', action: yes},
  ]);
}

/** Delete the game, once confirmed */
async function reallyDeleteGame(d: Discussion, mg: mgt.Minigame) {
  MG_STORAGE.delete(mg.id);
  main.MG_BY_ID.delete(mg.id);
  for (const [region, ctx] of main.MG_BY_REGION.entries()) {
    if (ctx.game.id === mg.id) main.MG_BY_REGION.delete(region);
  }
  return ManageGames(d);
}

/** Add (or remove) collaborators */
async function editCollaborators(d: Discussion, mg: mgt.Minigame) {
  const byId: {[key: string]: string} = {};
  const byName: {[key: string]: string} = {};
  const set = new Set<string>();
  for (const [id, {name}] of storage.getPlayerRecords()) {
    byId[id] = name;
    byName[name] = id;
  }
  const names = Object.keys(byName).sort();
  for (const id of mg.editors ?? []) {
    const name = byId[id];
    if (name !== undefined) set.add(name);
  }
  const collab = await forms.SetToggleForm(
    d.player,
    `Collaborators for "${mg.id}"`,
    names,
    set,
  );
  if (collab === undefined) return;
  mg.editors = [];
  for (const name of collab) {
    mg.editors.push(byName[name]!);
  }
  saveMinigame(mg);
  return editGame(d, mg);
}

/** Edit basic properties fo the game (owner, mode, bounds) */
async function editProperties(d: Discussion, mg: mgt.Minigame) {
  const playersById: Record<string, string> = {}
  const playersByName: Record<string, string> = {}
  storage.getPlayerRecords().forEach((rec, id) => {
    playersById[id] = rec.name;
    playersByName[rec.name] = id;
  });
  const stages = mg.stages.map(s => s.id);
  const form = {
    owner: forms.dropdown(['', ...Object.values(playersById)], {
      defaultValue: playersById[mg.owner] ?? '',
    }),
    gameMode: forms.dropdownFromEnum<number>(mgt.GameMode, {
      defaultValue: mg.mode,
    }),
    isAdventureMode: forms.toggle({
      displayName: 'Adventure Mode',
      defaultValue: mg.adventureMode === true,
    }),
    defaultStage: forms.dropdown(stages, {defaultValue: mg.defaultStage ?? ''}),
    pos1: forms.vector3({
      displayName: 'First Corner',
      defaultValue: mg.region.pos1,
      validators: [{isSet: true}],
    }),
    pos2: forms.vector3({
      displayName: 'Second Corner',
      defaultValue: mg.region.pos2,
      validators: [{isSet: true}],
    }),
  };
  const {results} = await forms.ModalForm(d.player, `Editing ${mg.id}`, form);
  if (results === undefined) return;
  mg.owner = playersByName[results.owner.get()] ?? '';
  mg.mode = results.gameMode.get();
  mg.adventureMode = results.isAdventureMode.get();
  mg.defaultStage = results.defaultStage.get();
  mg.region.pos1 = results.pos1.get();
  mg.region.pos2 = results.pos2.get();
  saveMinigame(mg);
  return editGame(d, mg);
}

/** Add, edit, or remove a region */
async function editRegions(d: Discussion, mg: mgt.Minigame) {
  const buttons: forms.ActionButton[] = [
    forms.makeButton('Back', editGame, d, mg),
    forms.makeButton('[ New Region ]', editRegion, d, mg, undefined),
  ];
  for (const [i, r] of (mg.regions ?? []).entries()) {
    buttons.push(forms.makeButton(r.name, editRegion, d, mg, i));
  }
  return d.actionForm('', '', buttons);
}

async function editRegion(d: Discussion, mg: mgt.Minigame, i?: number) {
  const region = i === undefined ? undefined : (mg.regions ?? [])[i];
  const loc = d.player.location;
  const nw = region?.pos1 ?? {
    x: Math.floor(loc.x - 8),
    y: Math.floor(loc.y),
    z: Math.floor(loc.z - 8),
  };
  const se = region?.pos2 ?? {
    x: Math.floor(loc.x + 8),
    y: Math.floor(loc.y + 4),
    z: Math.floor(loc.z + 8),
  };

  const {results} = await d.modalForm('Edit Region', {
    id: forms.textbox('', {
      displayName: 'ID',
      defaultValue: region?.name ?? `Region ${(mg.regions ?? []).length + 1}`,
    }),
    nw: forms.vector3({
      displayName: 'First Corner',
      defaultValue: nw,
      validators: [{isSet: true}],
    }),
    se: forms.vector3({
      displayName: 'Second Corner',
      defaultValue: se,
      validators: [{isSet: true}],
    }),
    delete: forms.dropdown(['', 'Delete'], {
      show: region !== undefined,
    }),
  });
  if (results === undefined) return;

  if (i === undefined) {
    if (mg.regions === undefined) {
      mg.regions = [];
    }
    mg.regions?.push({
      name: results.id.get(),
      pos1: results.nw.get(),
      pos2: results.se.get(),
    });
  } else {
    if (results.delete.get()) {
      delete mg.regions![i];
    } else {
      region!.name = results.id.get();
      region!.pos1 = results.nw.get();
      region!.pos2 = results.se.get();
    }
  }
  return editRegions(d, mg);
}

/** Select a game stage for editing */
async function editStages(d: Discussion, mg: mgt.Minigame): Promise<void> {
  const buttons: forms.ActionButton[] = [
    forms.makeButton('[ Back ]', editGame, d, mg),
    forms.makeButton('[ New Stage ]', editStageProperties, d, mg, undefined),
  ];
  for (const [i, stage] of mg.stages.entries()) {
    buttons.push(forms.makeButton(stage.id, editStage, d, mg, i));
  }
  return d.actionForm('', '', buttons);
}

/** Edit the game stages */
async function editStage(d: Discussion, mg: mgt.Minigame, stageId: number) {
  // TODO: apply preset button
  const stage = mg.stages[stageId]!;
  const buttons = [
    forms.makeButton('[ Back ]', editStages, d, mg),
    forms.makeButton('[ Properties ]', editStageProperties, d, mg, stageId),
  ];
  for (const f of mgt.EventNames) {
    const stmts = stage[f as mgt.EventType] ?? [];
    buttons.push(
      forms.makeButton(
        `${f} (${stmts.length})`,
        browse,
        d,
        new Address(mg, stageId, f, stmts, []),
      ),
    );
  }
  return d.actionForm('Edit Stage', '', buttons);
}

/** Edits the stage properties (name), or delete the stage */
async function editStageProperties(
  d: Discussion,
  mg: mgt.Minigame,
  stageId?: number,
): Promise<void> {
  // TODO: cut/copy stages
  const {results} = await d.modalForm('', {
    name: forms.textbox(''),
    delete: forms.dropdown(['', 'Delete'], {
      show: stageId !== undefined,
    }),
  });
  if (results === undefined) return;
  if (results.delete.value === 'Delete') {
    delete mg.stages[stageId as number];
    saveMinigame(mg);
    return editStages(d, mg);
  }
  if (results.name.get() === '') {
    // no value - cancel
    if (stageId === undefined) return editStages(d, mg);
    return editStage(d, mg, stageId);
  }
  if (stageId === undefined) {
    mg.stages.push({id: results.name.get()});
    saveMinigame(mg);
    return editStage(d, mg, mg.stages.length - 1);
  }
  mg.stages[stageId].id = results.name.get();
  saveMinigame(mg);
  return editStage(d, mg, stageId);
}

/**
 * Browse expression categories, with the intent of creating an expression or statement.
 *
 * `exprCat` allows filtering of expression types
 **/
async function createExpression(
  d: Discussion,
  addr: Address,
  exprCat: EC[],
): Promise<void> {
  const buttons = [
    forms.makeButton('[ Back ]', browse, d, addr),
    forms.makeButton('[ Help ]', expressionHelp, d, addr, exprCat),
  ];
  for (const [catName, category] of exprLib.expressionsByCategory) {
    // iff we can't allow statements and the category has just statements, skip
    let skip = false;
    for (const c of exprCat) skip = skip && !category.categories.has(c);
    if (skip) continue;
    buttons.push(
      forms.makeButton(
        catName,
        createExpressionCategory,
        d,
        addr,
        exprCat,
        catName,
      ),
    );
  }
  return d.actionForm('New Expression', addr.toString(), buttons);
}

/** Allows creating an expression as described by the expression type. */
async function createExpressionCategory(
  d: Discussion,
  addr: Address,
  exprCat: EC[],
  cat: string,
): Promise<void> {
  const category = exprLib.expressionsByCategory.get(cat)!;
  const buttons = [
    forms.makeButton('[ Back ]', createExpression, d, addr, exprCat),
  ];
  for (const [key, expr] of category.expressions) {
    let skip = false;
    for (const c of exprCat) skip = skip && !expr.categories.includes(c);
    if (skip) continue;
    buttons.push(forms.makeButton(expr.name, insertExpression, d, addr, key));
  }
  return d.actionForm('New Expression', addr.toString(), buttons);
}

/** Displays expression definition info */
async function expressionHelp(
  d: Discussion,
  addr: Address,
  exprCat: mgt.EXPRESSION_CATEGORIES[],
): Promise<void> {
  const body = [
    'Expressions are pieces of code that can help you build games ',
    'and other event-driven processes to your Minecraft world!\n\n',
    'Examples include timers, objectives, and camera setups for',
    'players to experience. Below is a comprehensive list:\n\n',
  ];

  for (const [catName, category] of exprLib.expressionsByCategory) {
    body.push(`§l${catName} Expressions§r\n\n`);
    for (const expr of category.expressions.values()) {
      body.push(`${expr.name}: ${expr.desc}\n\n`);
    }
  }

  return d.actionForm('Expressions', body.join(''), [
    forms.makeButton('[ Back ]', createExpression, d, addr, exprCat),
  ]);
}

/** Write an expression at the given address */
async function insertExpression(
  d: Discussion,
  addr: Address,
  key: string,
): Promise<void> {
  if (addr.stage()[addr.eventType] === undefined) {
    addr.stage()[addr.eventType] = addr.root;
  }
  let target: TT[] | TT = addr.root;
  const copy = [...addr.path];
  const final = copy.pop()!;
  for (const i of addr.path.slice(0, -1)) {
    target = target[i] as TT;
  }
  const def = exprLib.Expressions[key]!;
  const expr: mgt.ExpressionTuple = [key];
  for (const arg of def.args) {
    if (arg[2] !== undefined) {
      expr.push(arg[2] as mgt.TokenExpressionArg);
    } else if (arg[1] === AT.StatementList) {
      expr.push([]);
    } else {
      expr.push(null);
    }
  }
  target[final] = expr;
  saveMinigame(addr.minigame);
  return editExpression(d, addr, expr);
}

/**
 * Returns the expression or statement list of the given address.
 *
 * If the address points to an argument, returns undefined.
 *
 * If the expression has not been defined, returns null.
 **/
function findExpression(root: mgt.StatementList, ad: number[], force = false) {
  let expr: TT[] | TT = root;
  for (const i of ad) {
    expr = expr[i] as TT[] | TT;
    if (expr === undefined) break;
  }
  if (expr === null) return null;
  if (!force && !Array.isArray(expr)) {
    return undefined;
  }
  return expr;
}

async function expressionError(d: Discussion, msg: string, addr: Address) {
  const expr = findExpression(addr.root, addr.path, true);
  return d.error(
    `${msg}: ${JSON.stringify(expr)}\n\n` +
      `Path: ${JSON.stringify(addr.path)}\n\n` +
      `Address: ${addr.toString()}\n\n` +
      `Statement: ${JSON.stringify(addr.root)}`,
  );
}

function isStatementList(expression: TT[] | TT) {
  return typeof expression[0] !== 'string';
}

async function browse(d: Discussion, addr: Address, back = false) {
  if (back) {
    if (addr.path.length === 0)
      return editStage(d, addr.minigame, addr.stageIndex);
    addr.path.pop();
  }
  const expr = findExpression(addr.root, addr.path);
  if (expr === undefined) {
    return expressionError(d, 'Failed to load expression', addr);
  }
  if (expr === null) {
    return createExpression(d, addr, [EC.Expression]);
  }

  if (isStatementList(expr)) {
    return editStatementList(d, addr, expr as TT[]);
  }
  return editExpression(d, addr, expr as TT);
}

async function editStatementList(
  d: Discussion,
  addr: Address,
  statements: mgt.StatementList,
) {
  const buttons: forms.ActionButton[] = [
    forms.makeButton('[ Back ]', browse, d, addr, true),
    forms.makeButton(
      '[ New Statement ]',
      createExpression,
      d,
      addr.next(statements.length),
      [EC.Statement],
    ),
  ];

  for (const [i, stmt] of statements.entries()) {
    buttons.push(
      forms.makeButton(
        `${i}: ${exprLib.Expressions[stmt[0]]?.name}`,
        editExpression,
        d,
        addr.next(i),
        stmt,
      ),
    );
  }

  return d.actionForm('Statements', addr.toString(), buttons);
}

async function editExpression(
  d: Discussion,
  addr: Address,
  expr: mgt.ExpressionTuple,
): Promise<void> {
  const def = exprLib.Expressions[expr[0]];
  if (def === undefined) return expressionError(d, 'Invalid expression', addr);

  const buttons = [
    forms.makeButton('[ Back ]', browse, d, addr, true),
    forms.makeButton('[ Delete ]', confirmDeleteExpression, d, addr, expr),
  ];

  for (const [i, arg] of def.args.entries()) {
    let name = arg[0];
    if (expr[i + 1] === null) {
      name = `${name} §c§onull§r`;
    }
    buttons.push(forms.makeButton(arg[0], editArgument, d, addr, expr, i));
  }
  // TODO: list buttons for expressions/statements
  return d.actionForm('Expression', addr.toString(), buttons);
}

async function confirmDeleteExpression(
  d: Discussion,
  addr: Address,
  expr: mgt.ExpressionTuple,
) {
  const parent = findExpression(addr.root, addr.path.slice(0, -1))!;
  let msg: string;
  if (isStatementList(parent)) {
    msg = 'Delete this statement?';
  } else {
    msg =
      'This will convert this expression back to a primitive value, permanently ' +
      'deleting any expressions nested within this argument.';
  }
  return confirm(
    d,
    'Confirm Deletion',
    `${addr}\n\n${msg}`,
    () => editExpression(d, addr, expr),
    () => deleteExpression(d, addr),
  );
}

async function deleteExpression(d: Discussion, addr: Address) {
  const target = addr.path.pop()!;
  const parent = findExpression(addr.root, addr.path)!;
  if (isStatementList(parent)) {
    delete parent[target];
  } else {
    parent[target] = null;
  }
  saveMinigame(addr.minigame);
  return browse(d, addr);
}

/**
 * Edit an argument
 *
 * NOTE: argIndex is 0-based for the expression definition arguments, but
 * 1-based for the expression tuple due to the expression type being in
 * position [0].
 */
async function editArgument(
  d: Discussion,
  addr: Address,
  expr: mgt.ExpressionTuple,
  argIndex: number,
) {
  const def = exprLib.Expressions[expr[0]];
  if (def === undefined) return expressionError(d, 'Invalid expression', addr);
  const argType = def.args[argIndex]![1];
  // An arg can either be a statement list, an expression, or a primitive
  // value (string, number, or enumerables like regions). However some
  // primitive args can be converted to expressions.
  if (
    argType === AT.Expression ||
    argType === AT.StatementList ||
    Array.isArray(expr[argIndex + 1])
  ) {
    return browse(d, addr.next(argIndex + 1));
  }

  const field = getField(argType, expr[argIndex + 1], addr.minigame);

  const form: Record<string, unknown> = {};
  const expressionable = field?.render(form);
  const _expression = forms.dropdown(['No', 'Yes'], {
    displayName: 'Convert to Expression',
    show: expressionable,
  });
  form._expression = _expression;
  const {results} = await d.modalForm('Edit Argument', form);
  if (results === undefined) return;

  if (_expression?.value === 'Yes') {
    return createExpression(d, addr.next(argIndex + 1), [EC.Expression]);
  }

  const expressionArg = field?.parse(results);
  if (expressionArg !== undefined) {
    expr[argIndex + 1] = expressionArg;
  }
  saveMinigame(addr.minigame);
  return editExpression(d, addr, expr);
}
