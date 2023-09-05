import * as mc from "@minecraft/server";

import { showErrorMessage, forms, STATE, showDialogMessage, LocList, LocGet, LocDel, LocUpdate, LocNew, StartupEvent, LocGetAll } from '../lib.js';
import { colorNames, enumStrings, Location, LocationColor, LocationResult, LocationType, ServerSuccess } from '../types/packTypes.js';
import { defineActions, Discussion, Args, actionCallback } from './discussion';
import { addActionBarText } from "./text.js";
import * as settings from './settings.js';


defineActions({ SelectLocation, EditLocation, NewLocation });
StartupEvent.addListener(startup);

const LocationShown = settings.DefaultBitSettings.LocationShown;
settings.registerSetting({
  id: LocationShown,
  name: 'showItemDurability',
  defaultValue: true,
});


const nameOptions = [
  'Location',
  'Place',
  'Locale',
  'Home',
  'Bunker',
  'Hangout',
  'Haunt',
  'Hangout',
  'Territory',
  'Domain',
  'Den',
  'Retreat',
  'Manor',
  'Nest',
  'Shelter',
  'Refuge',
  'Lair',
  'Hideout',
  'Hidey-Hole',
]

const DEFAULT_SIZES = [0, 8, 16, 32, 64, 128, 256, 512];
const DEFAULT_SIZE = 'Point'
const DEFAULT_SORT = 50;
const DIMENSIONS = ['overworld', 'nether', 'the_end'];

const locations: Location[] = [];

async function startup() {
  await updateLocations();
  onTick();
}

function onTick() {
  mc.system.runTimeout(onTick, 5);
  for (const player of mc.world.getAllPlayers()) {
    if (settings.getPlayerDefaultBit(player, LocationShown, true)) {
      const locs: [string, number][] = [];
      const ploc = player.location;
      for (const loc of locations) {
        if (!loc.isPublic && loc.owner === player.name) continue;
        if (loc.x1 > ploc.x || loc.x2 < ploc.x) continue;
        if (loc.z1 > ploc.z || loc.z2 < ploc.z) continue;
        if (typeof loc.y1 === 'number' && (loc.y1 > ploc.y || loc.y2! < ploc.y)) continue;

        const color = colorNames[LocationColor[loc.color] as keyof typeof colorNames] as string|undefined;
        locs.push([`${color ?? ''}${loc.name}`, loc.sort])
      }
      const final: string[] = [];
      locs.sort((a,b) => b[1]-a[1]);
      for (const loc of locs) {
        final.push(loc[0]);
      }
      addActionBarText({
        id: `loc:${player.name}`,
        text: final.length === 0 ? undefined : final.join('§r / '),
        targets: [player.name],
        priority: 100,
      });
    } else {
      addActionBarText({id: `loc:${player.name}`});
    }
  }
}

async function updateLocations() {
  const locs = await LocGetAll.request();
  if (locs?.locations === undefined) {
    console.error('Unable to update locations.');
    return false;
  }
  locations.length = 0;
  locations.push(...locs.locations);
  return true;
}

async function SelectLocation(d: Discussion, args: Args) {
  function editLoc(locationId?: number) {
    return actionCallback(d, EditLocation.name, args, {locId: locationId});
  }
  const isAdmin = args.admin === true;
  const buttons: forms.ActionButton[] = [
    {text: '[ Create New Location ]', action: actionCallback(d, NewLocation.name, args)},
  ];
  if (isAdmin && args.owner === undefined) {
    buttons.push(...[
      { text: '[ Edit Community locations ]',
        action: actionCallback(d, SelectLocation.name, args, {owner: ''})},
      { text: '[ Edit All locations ]',
        action: actionCallback(d, SelectLocation.name, args, {owner: '*'})},
    ]);
  } else {
    args.owner = d.player.name;
  }
  const locs = await LocList.request({owner: args.owner as string|undefined});
  if (locs !== undefined) {
    for (const loc of locs.locations) {
      const name = args.owner === '*' ? `[${loc.owner}] ${loc.name}` : loc.name;
      buttons.push({ text: name, action: editLoc(loc.id) })
    }
  }
  await forms.ActionForm(d.player, 'Locations', '', buttons);
}

async function NewLocation(d: Discussion, args: Args) {
  let title = 'Create Location';
  const isAdmin = args.admin === true;
  let location: Partial<Location> = {};
  const name = `${d.player.name}'s ${nameOptions[Math.floor(Math.random() * nameOptions.length)]}`;

  const {results} = await forms.ModalForm(d.player, title, {
    name: forms.textbox('Name', {defaultValue: name}),
    owner: forms.dropdown(['', ...STATE.getPlayers()], {
      defaultValue: d.player.name,
      show: isAdmin,
    }),
    dimension: forms.dropdown(DIMENSIONS, {
      defaultValue: d.player.dimension.id.replace('minecraft:', '')}),
    x: forms.textbox('', {defaultValue: d.player.location.x.toFixed()}),
    z: forms.textbox('', {defaultValue: d.player.location.z.toFixed()}),
    size: forms.dropdown(
      DEFAULT_SIZES.map(s => s ? `${s}x${s}` : DEFAULT_SIZE),
      { defaultValue: DEFAULT_SIZE }),
    type: forms.dropdown(enumStrings(LocationType), {
      defaultValue: LocationType[location.type ?? 0] as string}),
    color: forms.dropdown(enumStrings(LocationColor), {
      defaultValue: LocationColor[location.color ?? 0] as string}),
    publiclyViewable: forms.toggle({defaultValue: location.isPublic ?? false}),
  });

  if (results === undefined) return;

  const size = (results.size.get() === DEFAULT_SIZE ? 0 : parseInt(results.size.get()));

  let req: Location;
  
  try {
    req = {
      owner: results.owner.value ?? d.player.name,
      dimension: results.dimension.get(),
      x1: Number(results.x.get()) - size / 2,
      x2: Number(results.x.get()) + size / 2,
      z1: Number(results.z.get()) - size / 2,
      z2: Number(results.z.get()) + size / 2,
      y1: undefined,
      y2: undefined,
      name: results.name.get(),
      type: LocationType[results.type.get() as keyof typeof LocationType],
      color: LocationColor[results.color.get() as keyof typeof LocationColor],
      sort: DEFAULT_SORT,
      isPublic: results.publiclyViewable.get(),
    }
  } catch(e) {
    await showErrorMessage(d.player, String(e));
    return;
  }
  let res = await LocNew.request(req);
  if (res?.success !== true) {
    await d.error('An error was encountered saving the request.', title);
  } else {
    await d.action(SelectLocation.name, {admin: isAdmin});
  }
}

async function EditLocation(d: Discussion, args: Args) {
  const locId = args.locId as number|undefined;
  if (locId === undefined) return await d.error('Error retrieving location.');
  const isAdmin = args.admin === true;
  const title = 'Edit Location';
  const loc = (await LocGet.request({id: args.locId as number})).location;
  if (loc === undefined) {
    showErrorMessage(d.player, 'Unable to find location');
    return;
  }

  const {results} = await forms.ModalForm(d.player, title, {
    owner: forms.dropdown(['', ...STATE.getPlayers()], {
      defaultValue: loc.owner ?? d.player.name,
      show: isAdmin,
    }),
    name: forms.textbox('Name', {defaultValue: loc.name}),
    dimension: forms.dropdown(DIMENSIONS, {defaultValue: loc.dimension}),
    x1: forms.textbox('', {defaultValue: String(loc.x1)}),
    x2: forms.textbox('', {defaultValue: String(loc.x2)}),
    z1: forms.textbox('', {defaultValue: String(loc.z1)}),
    z2: forms.textbox('', {defaultValue: String(loc.z2)}),
    y1: forms.textbox('', {defaultValue: String(loc.y1 ?? d.player.location.y)}),
    y2: forms.textbox('', {defaultValue: String(loc.y2 ?? d.player.location.y)}),
    ignoreY: forms.toggle({defaultValue: loc.y1  === null}),
    type: forms.dropdown(enumStrings(LocationType), {
      defaultValue: LocationType[loc.type] as string}),
    color: forms.dropdown(enumStrings(LocationColor), {
      defaultValue: LocationColor[loc.color] as string}),
    sort: forms.textbox('', {
      defaultValue: String(loc.sort ?? DEFAULT_SORT),
      show: isAdmin,
    }),
    publiclyViewable: forms.toggle({defaultValue: loc.isPublic ?? false}),
    delete: forms.toggle({defaultValue: false, show: args.locId !== undefined}),
  });

  if (results === undefined) return;

  if (results.delete.value === true) {
    const res = await showDialogMessage(d.player, 'Confirm Deletion', 
      `Are you sure you want to delete "${loc.name}"`, ['Confirm', 'Cancel']);
    if (res === 0) {
      const res = await LocDel.request({id: args.locId as number});
      await showDialogMessage(d.player, title, res?.success === true ? 'Success'
        : 'An error was encountered saving the request.');
    }
    return;
  }

  const x1 = Number(results.x1.get());
  const x2 = Number(results.x2.get());
  const z1 = Number(results.z1.get());
  const z2 = Number(results.z2.get());
  let y1 = 0;
  let y2 = 0;
  if (!results.ignoreY.get()) {
    y1 = Number(results.y1.get());
    y2 = Number(results.y2.get());
  }

  let req: Location;
  try {
    req = {
      id: locId,
      owner: results.owner.value ?? d.player.name,
      dimension: results.dimension.get(),
      x1: Math.min(x1, x2),
      x2: Math.max(x1, x2),
      z1: Math.min(z1, z2),
      z2: Math.max(z1, z2),
      y1: results.ignoreY.get() ? undefined : Math.min(y1, y2),
      y2: results.ignoreY.get() ? undefined : Math.max(y1, y2),
      name: results.name.get(),
      type: LocationType[results.type.get() as keyof typeof LocationType],
      color: LocationColor[results.color.get() as keyof typeof LocationColor],
      sort: Number(results.sort.value ?? 100),
      isPublic: results.publiclyViewable.get(),
    }
  } catch(e) {
    await showErrorMessage(d.player, String(e));
    return;
  }
  const res = await LocUpdate.request(req);
  if (res?.success !== true) {
    await showDialogMessage(d.player, title, 
      'An error was encountered saving the request.');
  } else {
    await updateLocations();
    await d.action(SelectLocation.name, {admin: isAdmin});
  }
}
