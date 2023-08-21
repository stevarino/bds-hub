import { showErrorMessage, request, forms, STATE, showDialogMessage } from '../lib.js';
import { enumStrings, Location, LocationColor, LocationResult, LocationType, ServerSuccess } from '../types/packTypes.js';
import { defineActions, Discussion, Args, actionCallback } from './discussion';

defineActions({ CreateLocation: SelectLocation, EditLocation });

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

async function SelectLocation(d: Discussion, args: Args) {
  function editLoc(locationId?: number) {
    return actionCallback(d, EditLocation.name, args, {locId: locationId});
  }
  const isAdmin = args.admin === true;
  const buttons = [
    {text: '[ Create New Location ]', action: editLoc()},
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
  const locs = await request<LocationResult[]> ('/location/list', {owner: args.owner});
  if (locs !== undefined) {
    for (const loc of locs) {
      const name = args.owner === '*' ? `[${loc.owner}] ${loc.name}` : loc.name;
      buttons.push({ text: name, action: editLoc(loc.id) })
    }
  }
  await forms.ActionForm(d.player, 'Locations', '', buttons);
}

async function EditLocation(d: Discussion, args: Args) {
  let title = 'Create Location';
  const isAdmin = args.admin === true;
  let location: Partial<Location> = {};
  if (args.locId !== undefined) {
    title = 'Edit Location';
    const res = await request<Location>(`/location/get?id=${args.locId}`);
    if (res === undefined) {
      showErrorMessage(d.player, 'Unable to find location');
      return;
    }
    location = res;
  }
  const newName = `${d.player.name} ${nameOptions[Math.floor(Math.random() * nameOptions.length)]}`
  const dimension = location.dimension ?? d.player.dimension.id;
  const x1 = location.x1 ?? Math.floor(d.player.location.x);
  const x2 = location.x2 ?? Math.floor(d.player.location.x);
  const z1 = location.z1 ?? Math.floor(d.player.location.z);
  const z2 = location.z2 ?? Math.floor(d.player.location.z);
  const y1 = location.y1 ?? Math.floor(d.player.location.y);
  const y2 = location.y2 ?? Math.floor(d.player.location.y);
  const {results} = await forms.ModalForm(d.player, title, {
    owner: forms.dropdown(['', ...STATE.getPlayers()], {
      defaultValue: location.owner ?? d.player.name,
      show: isAdmin,
    }),
    name: forms.textbox('Name', {defaultValue: location.name ?? newName}),
    dimension: forms.textbox('', {defaultValue: dimension}),
    x1: forms.textbox('', {defaultValue: String(x1)}),
    x2: forms.textbox('', {defaultValue: String(x2)}),
    z1: forms.textbox('', {defaultValue: String(z1)}),
    z2: forms.textbox('', {defaultValue: String(z2)}),
    y1: forms.textbox('', {defaultValue: String(y1)}),
    y2: forms.textbox('', {defaultValue: String(y2)}),
    ignoreY: forms.toggle({
      defaultValue: location.x1 !== undefined && location.y1  === undefined}),
    type: forms.dropdown(enumStrings(LocationType), {
      defaultValue: LocationType[location.type ?? 0] as string}),
    color: forms.dropdown(enumStrings(LocationColor), {
      defaultValue: LocationColor[location.color ?? 0] as string}),
    sort: forms.textbox('', {
      defaultValue: String(location.sort ?? 100),
      show: isAdmin,
    }),
    publiclyViewable: forms.toggle({defaultValue: location.isPublic ?? false}),
    delete: forms.toggle({defaultValue: false, show: args.locId !== undefined}),
  });

  if (results === undefined) return;

  if (results.delete.value === true) {
    const res = await showDialogMessage(d.player, 'Confirm Deletion', 
      `Are you sure you want to delete "${location.name}"`, ['Confirm', 'Cancel']);
    if (res === 0) {
      const res = await request<ServerSuccess>(`/location/delete?id=${args.locId}`);
      await showDialogMessage(d.player, title, res?.success === true ? 'Success'
        : 'An error was encountered saving the request.');
    }
    return;
  }

  let req: Location;
  try {
    req = {
      owner: results.owner.value ?? d.player.name,
      dimension: results.dimension.get(),
      x1: Number(results.x1.get()),
      x2: Number(results.x2.get()),
      z1: Number(results.z1.get()),
      z2: Number(results.z2.get()),
      y1: results.ignoreY ? undefined : Number(results.y1.get()),
      y2: results.ignoreY ? undefined : Number(results.y2.get()),
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
  let res: ServerSuccess|undefined;
  if (args.locId !== undefined) {
    req.id = args.locId as number;
    res = await request<ServerSuccess>('/location/update', req);
  } else {
    res = await request<ServerSuccess>('/location/new', req);
  }
  await showDialogMessage(d.player, title, res?.success === true ? 'Success'
    : 'An error was encountered saving the request.');
}
