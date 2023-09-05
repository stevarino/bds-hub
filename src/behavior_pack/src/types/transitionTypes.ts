/******************************************************************************* 
 * Interface types (menus, dialogues, forms, etc)
*******************************************************************************/

export type Obj<T> = {[key: string]: T};

/** Pack-side function */
export interface Action { action: string, args?: Args };
export interface Args {[key: string]: unknown};
/** Minecraft command */
export interface Command { command: string };
/** Minecraft dialogue entry */
export interface Scene { scene: string };

export interface ScriptScene {
  id: string,
  text: string,
  /**
   * @minItems 1
   * @maxItems 6
   */
  buttons: Button[],
}

export interface SavedScene {
  id: string,
  text: string,
  buttons: Button[],
  npc_name?: string,
  is_dummy?: boolean
}

export interface GiveArgs {
  item: string,
  qty?: number,
  name?: string,
  /** 
   * @maxItems 3
   **/
  lore?: string[],
  enchantments?: {[enchantmentId: string]: number},
}

export interface TradeItem {
  item: string,
  // default 1
  qty?: number,
}

export type TradeArray = Array<TradeItem|string>;

export interface TradeOffer {
  /* shown instead of the item/qty */
  title?: string,
  /* iconPath argument for button */
  icon?: string,
  /** can be a single type of item, or set of items */
  gives: TradeArray|string,
  /** 
   * TradeOffer.accepts - can be a single type of item, or multiple options of
   * multiple items
   * 
   * If the two-dimensional array format is used, first layer is OR and second
   * layer is AND.
   * 
   * A one-dimensional array is not supported due to the inherent ambiguity.
   */
  accepts: TradeArray[]|string,
  /** internal */
  _browsing?: boolean,
  /** internal */
  _traderArgs?: unknown,
}

export interface TraderArgs {
  trades: TradeOffer[],
  /** displayed before the list of trades available */
  greeting?: string,
  /** message shown if no trades are acceptable */
  noTrade?: string,
  /** Shown if the user wants to see unavailable trades */
  browseGreeting?: string,
  /** internal */
  _browsing?: boolean,
}

/** Describes a menu to open up */
export interface Menu { menu: MenuDetails };
export interface MenuDetails {
  title: string,
  body?: string,
  /**
   * @minItems 1
   * @maxItems 6
   */
  buttons: Button[],
};

export interface ThenElse {
  then: Transition,
  else: Transition,
}

export type HasTag = {
  if_has_tag: string,
} & ThenElse;

export type HasItem = {
  if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>
} & ThenElse

export interface Wait {
  wait: number,
}

export interface ApplyTag {
  apply_tag: string,
}

export interface RemoveTag {
  remove_tag: string,
}

/**
 * Perform a sequence of things.
 */
export interface Sequence {
  sequence: Transition[],
}

/**
 * Play a sound for the player in the discussion.
 */
export type Sound = {
  sound: string,
  volume?: number,
  pitch?: number,
  // specifying location broadcasts to all players
  // excluding locatgion broadcasts to one player
  x?: number,
  y?: number,
  z?: number,
  dimension?: string,
  selector?: string,
};

/**
 * Random transition, with optional weights
 */
export interface Random {
  /** 
   * @minItems 2
   **/
  random: Transition[]
  weights?: number[],
}

export interface TagSelector { tag: string }
export interface NameSelector { name: string }
export interface SelectorSelector { selector: string };
export interface LoreSelector { lore: (string|null)[] };
export interface ItemTypeSelector {item_type: string };

/** A dialogue response */
export type BaseTransition = Scene | Action | Command | Menu | HasTag | HasItem | Wait | Sequence | Sound | Random | ApplyTag | RemoveTag;
export type Transition = Partial< Scene & Action & Command & Menu & HasTag & HasItem & Wait & Sequence & Sound & Random & ApplyTag & RemoveTag >;
export type TransitionMap = {[key: string]: Transition};

export type Actor = { 
  id: string,
  name: string,
  scene?: string,
  /** NPC scale percentage, with 100 being normal */
  scale?: 25|50|75|100|125|150,
  skin?: string,
  /** additional roles this Actor performs */
  roles?: string[],
};

export type FinalActor = Omit<Actor, 'skin'|'scene'|'roles'> & {
  skin?: number,
  scene: string,
  roles: string[],
};

type RequireTag = { require_tag?: string };
export type Button = { text: string } & RequireTag &  BaseTransition;
export type SuperButton = Button & Transition & RequireTag;

export type ItemUse = RequireTag & (TagSelector | NameSelector | LoreSelector | ItemTypeSelector) & BaseTransition;
export type SuperItemUse = Partial<RequireTag & TagSelector & NameSelector & LoreSelector & ItemTypeSelector & Transition>;

export type Chat = { 
  equals: string,
} & RequireTag &  BaseTransition
export type SuperChat = Partial< Chat & RequireTag & BaseTransition >