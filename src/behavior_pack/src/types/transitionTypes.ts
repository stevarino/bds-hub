/******************************************************************************* 
 * Interface types (menus, dialogues, forms, etc)
*******************************************************************************/

/** Pack-side function */
export interface Action { action: string, args?: Args };
export interface Args {[key: string]: unknown};
/** Minecraft command */
export interface Command { command: string };
/** Minecraft dialogue entry */
export interface Scene { scene: string };

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

interface ThenElse {
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
export interface Sound {
  sound: string,
  volume?: number,
  pitch?: number,
  minVolume?: number,
}

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

interface TagSelector { tag: string }
interface NameSelector { name: string }
interface SelectorSelector { selector: string };
interface LoreSelector { lore: (string|null)[] };
interface ItemTypeSelector {item_type: string };

/** A dialogue response */
export type BaseTransition = Scene | Action | Command | Menu | HasTag | HasItem | Wait | Sequence | Sound | Random | ApplyTag | RemoveTag;
export type Transition = Partial< Scene & Action & Command & Menu & HasTag & HasItem & Wait & Sequence & Sound & Random & ApplyTag & RemoveTag >;
export type TransitionMap = {[key: string]: Transition};

export type Actor = { scene: string } & ( TagSelector | SelectorSelector | NameSelector );
export type SuperActor = Actor & Partial< TagSelector & SelectorSelector & NameSelector >;

type RequireTag = { require_tag?: string }
export type Button = { text: string } & RequireTag &  BaseTransition;
export type SuperButton = Button & Transition;

export interface Trader {
  trades: {
    gives: string,
    accepts: string[],
    ratio?: number,
  }[],
}

export type ItemUse = RequireTag & (TagSelector | NameSelector | LoreSelector | ItemTypeSelector) & BaseTransition;
export type SuperItemUse = Partial<RequireTag & TagSelector & NameSelector & LoreSelector & ItemTypeSelector & Transition>;

export type Chat = { 
  equals: string,
} & RequireTag &  BaseTransition
export type SuperChat = Partial< Chat & RequireTag & BaseTransition >