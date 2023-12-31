import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import { timeout } from "./functions";
import { DELAY } from "./constants";
import { Obj } from "../types/transitionTypes";


interface Options<T> {
  defaultValue?: T,
  requireTag?: string, 
  displayName?: string,
  show?: boolean,
}

export async function ModalForm<T={[label: string]: ModalFormWidget}>(
  player: mc.Player, title: string, form: T): Promise<Result<T>> {
  const modal = new ui.ModalFormData().title(title);
  const widgets: ModalFormWidget<unknown, unknown>[] = [];
  for (const [name, widget] of Object.entries(form as Obj<ModalFormWidget>)) {
    if (widget.shouldSkip(player)) continue;
    widgets.push(widget);
    widget.render(modal, name);
  }
  await timeout(DELAY);
  const res = await modal.show(player);
  if (res.formValues === undefined) return res;
  const results = [...res.formValues].reverse();
  for (const [name, widget] of Object.entries(form as Obj<ModalFormWidget>)) {
    if (widget.shouldSkip(player)) continue;
    let value = results.pop();
    if (widget.setValue !== undefined) {
      widget.value = widget.setValue(value);
    } else {
      widget.value = value;
    }
  }
  return Object.assign({}, res, {results: form});
}

/** Formats a camelCase name for human reading */
export function formatName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1).replace(/([a-z])([A-Z])/, '$1 $2')
}

export class ModalFormWidget<T=any, U=any> {
  value: T|undefined;
  constructor(
    public options: Options<T>,
    public addToForm: (form: ui.ModalFormData, label: string) => void,
    public setValue?: (value: U) => T) {}
  
  render(form: ui.ModalFormData, title: string) {
    try {
      let label = this.options.displayName ?? formatName(title)
      this.addToForm(form, label);
    } catch (e) {
      console.error(`[form field ${title}]: ${e}`);
    }
  }

  shouldSkip(player: mc.Player) {
    if (this.options.requireTag !== undefined && !player.hasTag(this.options.requireTag)) {
      return true;
    }
    if (this.options.show === false) {
      return true;
    }
    return false;
  }
  
  get() {
    if (this.value === undefined) {
      throw new Error('Attempted to read an undefined value');
    }
    return this.value;
  }

  isSet() {
    return this.value !== undefined;
  }
}

export function textbox(placeHolder: string, options: Options<string>={}) {
  return new ModalFormWidget<string, string>(options,
    (form, label) => form.textField(label, placeHolder, options.defaultValue)
  );
}

export function dropdown(dropdownOptions: string[], options: Options<string>={}) {
  return new ModalFormWidget<string, number>(
    options,
    (form, label) => {
      let dv: number|undefined = undefined;
      if (options.defaultValue !== undefined) {
        dv = dropdownOptions.indexOf(options.defaultValue);
        if (dv === -1) dv = undefined;
      }
      form.dropdown(label, dropdownOptions, dv);
    },
    (i) => dropdownOptions[i] as string,
  );
}

export function toggle(options: Options<boolean>={}) {
  return new ModalFormWidget<boolean, boolean>(options, (form, label) => {
    form.toggle(label, options.defaultValue);
  })
}

export function slider(min: number, max: number, options: Options<number> & {step?: number}={}) {
  return new ModalFormWidget<number, number>(options, (form, label) => {
    form.slider(label, min, max, options.step ?? 1, options.defaultValue);
  })
}

export interface Result<T> extends ui.ModalFormResponse {
  results?: T
}

export type ActionButton = {
  text: string,
  action: () => void|Promise<void>,
  show?: boolean,
  icon?: string,
} 
export async function ActionForm(player: mc.Player, title: string, body: string, buttons: ActionButton[]) {
  const form = new ui.ActionFormData();
  form.title(title);
  if (body !== '') {
    form.body(`\n${body}\n`);
  }
  const actions: (() => void|Promise<void>)[] = [];
  for (const button of buttons) {
    if (button.show === false) continue;
    form.button(button.text, button.icon);
    actions.push(button.action);
  }
  await timeout(DELAY);
  const res = await form.show(player);
  if (res.selection === undefined) return;
  await (actions[res.selection] as () => void|Promise<void>)();
}
