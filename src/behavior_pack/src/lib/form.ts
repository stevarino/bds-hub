import * as mc from "@minecraft/server";
import * as ui from "@minecraft/server-ui";
import { timeout } from "./functions";
import { DELAY } from "./constants";
import { Obj } from "../types/transitionTypes";


interface options<T> {
  defaultValue?: T,
  requireTag?: string, 
  displayName?: string,
  show?: boolean,
}

class FormWidget<T=any, U=any> {
  value: T|undefined;
  constructor(
    public options: options<T>,
    public addToForm: (form: ui.ModalFormData, label: string) => void,
    public setValue?: (value: U) => T) {}
  
  render(form: ui.ModalFormData, title: string) {
    let label = this.options.displayName ?? (
      title.charAt(0).toUpperCase() + title.slice(1).replace(/([a-z])([A-Z])/, '$1 $2')
    );
    this.addToForm(form, label);
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
}

export function textbox(placeHolder: string, options: options<string>={}) {
  return new FormWidget<string, string>(options,
    (form, label) => form.textField(label, placeHolder, options.defaultValue)
  );
}

export function dropdown(dropdownOptions: string[], options: options<string>={}) {
  return new FormWidget<string, number>(
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

export function toggle(options: options<boolean>={}) {
  return new FormWidget<boolean, boolean>(options, (form, label) => {
    form.toggle(label, options.defaultValue);
  })
}

export function slider(min: number, max: number, options: options<number> & {step?: number}={}) {
  return new FormWidget<number, number>(options, (form, label) => {
    form.slider(label, min, max, options.step ?? 1, options.defaultValue);
  })
}

interface Result<T> extends ui.ModalFormResponse {
  results?: T
}

export async function show<T={[label: string]: FormWidget}>(
      player: mc.Player, title: string, form: T): Promise<Result<T>> {
  const modal = new ui.ModalFormData().title(title);
  const widgets: FormWidget<unknown, unknown>[] = [];
  for (const [name, widget] of Object.entries(form as Obj<FormWidget>)) {
    if (widget.shouldSkip(player)) continue;
    widgets.push(widget);
    widget.render(modal, name);
  }
  await timeout(DELAY);
  const res = await modal.show(player);
  if (res.formValues === undefined) return res;
  const results = [...res.formValues].reverse();
  for (const [name, widget] of Object.entries(form as Obj<FormWidget>)) {
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