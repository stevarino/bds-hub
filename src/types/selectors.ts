export interface TagSelector {
  tag: string;
}
export interface NameSelector {
  name: string;
}
export interface SelectorSelector {
  selector: string;
}
export interface LoreSelector {
  lore: (string | null)[];
}
export interface ItemTypeSelector {
  item_type: string;
}

export type SuperSelector = Partial<
  TagSelector &
    NameSelector &
    SelectorSelector &
    LoreSelector &
    ItemTypeSelector
>;

export type SubSelector =
  | TagSelector
  | NameSelector
  | SelectorSelector
  | LoreSelector
  | ItemTypeSelector;
