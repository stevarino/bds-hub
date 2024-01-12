/**
 * expressions.ts - Operations for minigames
 *
 * Game Designers use the in-game editor (editor.ts) to build a token
 * tree, which then gets compiled down into JS code. Upon world load,
 * the JS code is then converted into JS bytecode via Function()
 * calls.
 */

import {
  EXPRESSION_ARGUMENT_TYPES as AT,
  EXPRESSION_CATEGORIES as EC,
  Expression,
} from './types.js';

/**
 * Expression List - Defined expressions to be used by game makers
 *
 * NOTE: these use two-to-three char codes to balance minimizing byte length
 * with readability.
 **/
export const Expressions: {[id: string]: Expression} = {
  if: new Expression(
    'If',
    'A logical check, splitting the code into a true/false path',
    [
      ['condition', AT.Expression],
      ['then', AT.StatementList],
      ['else', AT.StatementList],
    ],
    [EC.Statement, EC.Logic],
    'if (%s) { %s } else { %s }',
  ),

  and: new Expression(
    'And',
    'Returns true if both expressions are true (or truthy)',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) && (%s)',
  ),
  or: new Expression(
    'Or',
    'Returns true if either expressions are true (or truthy)',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) || (%s)',
  ),
  not: new Expression(
    'Not',
    'Negates a true variable to false, and false to true',
    ['Not'],
    [EC.Logic],
    '!(%s)',
  ),
  eq: new Expression(
    'Equals',
    'Returns true if the left value equals the right value',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) === (%s)',
  ),
  ne: new Expression(
    'Not Equals',
    'Returns true if the left value does not equal the right value',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) !== (%s)',
  ),
  eql: new Expression(
    'Equalish',
    'Returns true if the left value loosely equals the right value',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) == (%s)',
  ),
  nel: new Expression(
    'Not Equalish',
    'Returns true if the left value does not loosely equal the right value',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) != (%s)',
  ),
  lt: new Expression(
    'Less Than',
    '',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) < (%s)',
  ),
  lte: new Expression(
    'Less Than or Equal',
    '',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) <= (%s)',
  ),
  lt0: new Expression(
    'Less Than or Equal to Zero',
    '',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) <= 0',
  ),
  gt: new Expression(
    'Greater Than',
    '',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) > (%s)',
  ),
  gte: new Expression(
    'Greater Than or Equal',
    '',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) >= (%s)',
  ),
  gt0: new Expression(
    'Greater Than or Equal to Zero',
    '',
    ['LHV', 'RHV'],
    [EC.Logic],
    '(%s) >= 0',
  ),
  eq0: new Expression(
    'Is Zero',
    'Returns true if the value given is equal to zero',
    ['Value'],
    [EC.Logic],
    '(%s) === 0',
  ),
  ne0: new Expression(
    'Is Not Zero',
    'Returns true if the value given is not zero',
    ['Value'],
    [EC.Logic],
    '(%s) !== 0',
  ),

  add: new Expression(
    'Add',
    'Sum two numbers',
    ['LHV', 'RHV'],
    [EC.Math],
    '(%s) + (%s)',
  ),
  sub: new Expression(
    'Subtract',
    'Difference of two numbers',
    ['LHV', 'RHV'],
    [EC.Math],
    '(%s) - (%s)',
  ),
  mul: new Expression(
    'Multiply',
    'Product of two numbers',
    ['LHV', 'RHV'],
    [EC.Math],
    '(%s) * (%s)',
  ),
  div: new Expression(
    'Divide',
    'Division of two numbers',
    ['LHV', 'RHV'],
    [EC.Math],
    '(%s) / (%s)',
  ),
  mod: new Expression(
    'Modulo',
    'Returns the remainder from a divisor',
    ['LHV', 'RHV'],
    [EC.Math],
    '(%s) % (%s)',
  ),
  rdm: new Expression(
    'Random',
    'A random number between 0 and 1',
    [],
    [EC.Math],
    'Math.random()',
  ),
  rdi: new Expression(
    'Random Integer',
    'A random integer between the min and max (inclusive)',
    ['Min', 'Max'],
    [EC.Math],
    'Math.round(Math.random() * ((%1) - (%0)) + %0})',
  ),

  gtP: new Expression(
    'Get',
    'Retrieve a player variable',
    [['Variable', AT.VarPlayer]],
    [EC.Player],
    'ctx.gtP(%s)',
  ),
  stP: new Expression(
    'Set',
    'Set a player variable',
    [
      ['Variable', AT.VarPlayer],
      ['Value', AT.Expression],
    ],
    [EC.Statement, EC.Player],
    'ctx.stP(%s, %s)',
  ),
  cpP: new Expression(
    'Copy',
    'Copy a player variable',
    [
      ['From', AT.VarPlayer],
      ['To', AT.VarPlayer],
    ],
    [EC.Statement, EC.Player],
    'ctx.stP(%1, ctx.gtP(%0))',
  ),
  inP: new Expression(
    'Increment',
    'Add one to a game variable',
    [['Variable', AT.VarPlayer]],
    [EC.Statement, EC.Player],
    'ctx.stP(%s, (ctx.gtP(%s) ?? 0) + 1)',
  ),
  deP: new Expression(
    'Decrement',
    'Subtract one from a game variable',
    [['Variable', AT.VarPlayer]],
    [EC.Statement, EC.Player],
    'ctx.stP(%s, (ctx.gtP(%s) ?? 0) - 1)',
  ),
  zeP: new Expression(
    'Zero',
    'Set a game variable to zero',
    [['Variable', AT.VarPlayer]],
    [EC.Statement, EC.Player],
    'ctx.stP(%s, 0)',
  ),
  nwP: new Expression(
    'Time Set To Now (ms)',
    'Set a variable to the current time (ms)',
    [['Variable', AT.VarPlayer]],
    [EC.Statement, EC.Player],
    'ctx.stP(%s, new Date().getTime())',
  ),
  elP: new Expression(
    'Time Elapsed (ms)',
    'How many ms since the specified timer started',
    [['Variable', AT.VarPlayer]],
    [EC.Player],
    'new Date().getTime() - ctx.gtP(%s)',
  ),
  snP: new Expression(
    'Time Left (ms)',
    'How many ms before the timer ends',
    [['Variable', AT.VarPlayer]],
    [EC.Player],
    'new Date().getTime() - ctx.gtP(%s)',
  ),

  lb: new Expression(
    'Add Player to Leader Board',
    'Adds the player to the leaderboard',
    [['Value', AT.VarPlayer]],
    [EC.Statement, EC.Player],
    'ctx.lb(ctx.gtP(%s))',
  ),

  gtG: new Expression(
    'Get',
    'Retrieve a game variable',
    [['Variable', AT.VarGame]],
    [EC.Game],
    'ctx.gtG(%s)',
  ),
  stG: new Expression(
    'Set',
    'Set a game variable',
    [
      ['Variable', AT.VarGame],
      ['Value', AT.Expression],
    ],
    [EC.Statement, EC.Game],
    'ctx.stG(%s, %s)',
  ),
  cpG: new Expression(
    'Copy',
    'Copy a game variable',
    [
      ['From', AT.VarGame],
      ['To', AT.VarGame],
    ],
    [EC.Statement, EC.Game],
    'ctx.stG(%1, ctx.gtG(%0))',
  ),
  inG: new Expression(
    'Increment',
    'Add one to a game variable',
    [['Variable', AT.VarGame]],
    [EC.Statement, EC.Game],
    'ctx.stG(%0, (ctx.gtG(%0) ?? 0) + 1)',
  ),
  deG: new Expression(
    'Decrement',
    'Subtract one from a game variable',
    [['Variable', AT.VarGame]],
    [EC.Statement, EC.Game],
    'ctx.stG(%0, (ctx.gtG(%0) ?? 0) - 1)',
  ),
  zeG: new Expression(
    'Zero',
    'Set a game variable to zero',
    [['Variable', AT.VarGame]],
    [EC.Statement, EC.Game],
    'ctx.stG(%s, 0)',
  ),
  nwG: new Expression(
    'Time Set To Now (ms)',
    'Set a variable to the current time (ms)',
    [['Variable', AT.VarGame]],
    [EC.Statement, EC.Game],
    'ctx.stG(%s, new Date().getTime())',
  ),
  elG: new Expression(
    'Time Elapsed (ms)',
    'How many ms since the specified timer started',
    [['Variable', AT.VarGame]],
    [EC.Game],
    'new Date().getTime() - ctx.stG(%s)',
  ),
  snG: new Expression(
    'Time Left (ms)',
    'How many ms before the timer ends',
    [['Variable', AT.VarGame]],
    [EC.Game],
    'new Date().getTime() - ctx.stG(%s)',
  ),

  now: new Expression(
    'Time Now (ms)',
    'Get the current time (ms)',
    [],
    [EC.Data],
    'new Date().getTime()',
  ),
  tck: new Expression(
    'Current Tick',
    'Returns the number of ticks since game start',
    [],
    [EC.Data],
    'ctx.tck()',
  ),
  fmS: new Expression(
    'Format to Seconds',
    'Formats ms to "MM:SS.0ms"',
    ['Time'],
    [EC.Data],
    'ctx.fmS(%s)',
  ),

  gto: new Expression(
    'Go to State',
    'Switch game execution to the specified state',
    [['State', AT.Stage]],
    [EC.Statement, EC.Game],
    'return ctx.gto(%s)',
  ),

  pid: new Expression(
    'Player ID',
    'Returns the player ID (string)',
    [],
    [EC.Player],
    'ctx.pid()',
  ),
  pnm: new Expression(
    'Player Name',
    "Given a Player ID, return the player's gamertag",
    ['Player ID'],
    [EC.Player],
    'ctx.pnm(%s)',
  ),
  pis: new Expression(
    'Player Is...',
    'Returns true if the player is in a certain state',
    [['State', AT.PlayerState]],
    [EC.Player],
    'ctx.pis(%s)',
  ),
  pir: new Expression(
    'Player in Region',
    'Returns true if the player is in the specified region',
    [['Region', AT.Region]],
    [EC.Player],
    'ctx.pir(%s)',
  ),
  ptr: new Expression(
    'Player through Region',
    'Returns true if the player is in or passed through the specified region within the last tick',
    [['Region', AT.Region]],
    [EC.Player],
    'ctx.ptr(%s)',
  ),
  tel: new Expression(
    'Teleport',
    'Teleports the player to the specified region',
    [
      ['Region', AT.Region],
      ['Location', AT.Vector3o],
      ['Facing', AT.Vector2o],
    ],
    [EC.Player],
    'ctx.tel(%s, %s, %s)',
  ),
  msg: new Expression(
    'Player Message',
    'Sends a message to the player',
    ['Message'],
    [EC.Statement, EC.Player],
    'ctx.msg(%s)',
  ),
  bdc: new Expression(
    'Broadcast',
    'Sends a meessage to the whole server',
    ['Message'],
    [EC.Statement, EC.Player],
    'ctx.bdc(%s)',
  ),
  ach: new Expression(
    'Achievement',
    'Give the player an achievement',
    ['ID', 'Name', 'Description'],
    [EC.Statement, EC.Player],
    'ctx.ach(%s, %s, %s)',
  ),

  rgp: new Expression(
    'Get Players in Region',
    'Returns the players who are in a given region',
    [['Region', AT.Region]],
    [EC.Player, EC.Game],
    'ctx.rgp(%s)',
  ),
  prm: new Expression(
    'Remove Player',
    'Removes a specified player from a list of players',
    [
      ['Player List', AT.VarGame],
      ['playerId', AT.Expression],
    ],
    [EC.Statement, EC.Game],
    'ctx.prm(%s, %s)',
  ),

  blk: new Expression(
    'Place Blocks',
    'Fill a region with specified blocks',
    [
      ['Region', AT.Region],
      ['Block', AT.Expression],
    ],
    [EC.Game],
    'ctx.blk(%s, %s)',
  ),

  str: new Expression(
    'String Value',
    'A constant string value',
    [['Value', AT.String]],
    [EC.Data],
    '%s',
  ),
  num: new Expression(
    'Number Value',
    'A constant number value',
    [['Value', AT.String]],
    [EC.Data],
    'Number(%s)',
  ),
  tru: new Expression('True', 'The value true', [], [EC.Data], 'true'),
  fal: new Expression('False', 'The value false', [], [EC.Data], 'false'),
  len: new Expression(
    'Length',
    'The length of a given string or array',
    ['Value'],
    [EC.Data],
    '%s.length',
  ),
  pln: new Expression(
    'Player Count',
    'The number of still active players',
    [['Player List', AT.VarGame]],
    [EC.Data, EC.Game],
    'ctx.pln(%s)',
  ),

  frP: new Expression(
    'For Each Player',
    'Iterates across each player',
    [
      ['Player List', AT.VarGame],
      ['Statements', AT.StatementList],
    ],
    [EC.Statement, EC.Data, EC.Game],
    'for (const p of ctx.frp(%s)) {%s}',
  ),

  cmE: new Expression(
    'Camera Entity',
    'Sets the camera to focus on an entity selector',
    [
      ['Location', AT.Vector3p],
      ['Rel Offset', AT.Vector3p],
      ['Abs Offset', AT.Vector3p],
      ['Entity Tag', AT.String],
      ['Ease', AT.CameraEase],
      ['EaseTime', AT.Number, 1],
    ],
    [EC.Statement, EC.Player],
    'ctx.cmE(...%n)',
  ),

  cmF: new Expression(
    'Camera Position',
    'Sets the camera to face a position',
    [
      ['Location', AT.Vector3p],
      ['Rel Offset', AT.Vector3p],
      ['Abs Offset', AT.Vector3p],
      ['Facing', AT.Vector2p],
      ['Ease', AT.CameraEase],
      ['EaseTime', AT.Number, 1],
    ],
    [EC.Statement, EC.Player],
    'ctx.cmF(...%n)',
  ),

  cmR: new Expression(
    'Camera Rotation',
    'Sets the camera with a given rotation',
    [
      ['Location', AT.Vector3p],
      ['Rel Offset', AT.Vector3p],
      ['Abs Offset', AT.Vector3p],
      ['Rel Angle', AT.Vector2p],
      ['Abs Angle', AT.Vector2p],
      ['Ease', AT.CameraEase],
      ['EaseTime', AT.Number, 1],
    ],
    [EC.Statement, EC.Player],
    'ctx.cmR(...%n)',
  ),

  fad: new Expression(
    'Camera Fade',
    'Fade to a given color',
    [
      ['Color', AT.CameraFade],
      ['Fade In (s)', AT.Number, 0.25],
      ['Hold (s)', AT.Number, 1],
      ['Fade Out (s)', AT.Number, 0.25],
    ],
    [EC.Statement, EC.Player],
    'ctx.fad(...%n)',
  ),

  per: new Expression(
    'Permissions',
    'Lock the players camera or controls',
    [
      ['Camera', AT.Boolean],
      ['Movement', AT.Boolean],
    ],
    [EC.Statement, EC.Player],
    'ctx.per(%s,%s)',
  ),

  snd: new Expression(
    'Sound',
    'Play a sound for the player',
    [
      ['Sound', AT.String],
      ['Pitch', AT.Number, 1],
      ['Volume', AT.Number, 1],
    ],
    [EC.Statement, EC.Player],
    'ctx.snd(%s,%s,%s)',
  ),
  tit: new Expression(
    'Title',
    'Display a title and/or subtitle',
    [
      ['Title', AT.Expression],
      ['Subitle', AT.Expression],
      ['Fade In (s)', AT.Number, 0.1],
      ['Hold (s)', AT.Number, 1],
      ['Fade Out (s)', AT.Number, 0.1],
    ],
    [EC.Statement, EC.Player],
    'ctx.tit(...%n)',
  ),
};

class ExpressionCategorySummary {
  expressions = new Map<string, Expression>();
  categories = new Set<EC>();
}

export const expressionsByCategory = new Map<
  string,
  ExpressionCategorySummary
>();
const categoriesToSkip = new Set([EC.Statement, EC.Expression]);
for (const key of Object.keys(EC)) {
  if (!isNaN(Number(key))) continue;
  if (categoriesToSkip.has(EC[key as keyof typeof EC])) continue;
  expressionsByCategory.set(key, new ExpressionCategorySummary());
}
const ALL_CAT = new ExpressionCategorySummary();
expressionsByCategory.set('All', ALL_CAT);
for (const [key, val] of Object.entries(Expressions)) {
  for (const cat of val.categories) {
    if (categoriesToSkip.has(cat)) continue;
    const group = expressionsByCategory.get(EC[cat] as string)!;
    group.expressions.set(key, val);
    for (const cat of val.categories) {
      group.categories.add(cat);
    }
  }
  ALL_CAT.expressions.set(key, val);
  for (const cat of val.categories) {
    ALL_CAT.categories.add(cat);
  }
}
