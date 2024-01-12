import * as mc from '@minecraft/server';
import * as ui from '@minecraft/server-ui';
import {showErrorMessage, timeout} from './functions.js';
import {Obj} from '../types/transitions.js';
import {DefaultMap} from './default_map.js';

export * from './patterns.js';

const DELAY = 0;

export interface Options<T> {
  defaultValue?: T;
  includeBlank?: boolean;
  requireTag?: string;
  displayName?: string;
  show?: boolean;
  validators?: Validator[];
}

export interface Validator {
  /** must match the regex (don't froget ^ and $) */
  regex?: RegExp;
  /** must be set (useful for vector3 and other parsed input) */
  isSet?: boolean;
  message?: string;
}

const Vector3Pattern =
  /^\[?\s*(-?[0-9]+),?\s+(-?[0-9]+),?\s+(-?[0-9]+)\s*\]?\s*$/;
function parseVector3(vec3: string) {
  const match = Vector3Pattern.exec(vec3);
  if (match === null) return;
  return {
    x: Number(match[1]),
    y: Number(match[2]),
    z: Number(match[3]),
  };
}

export type ModalFormType = {[label: string]: unknown};

export async function ModalForm<T = ModalFormType>(
  player: mc.Player,
  title: string,
  form: T,
): Promise<ui.ModalFormResponse & {results?: T}> {
  const errors = new DefaultMap(() => Array<string>());
  while (true) {
    errors.clear();
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
    const values = [...res.formValues].reverse();
    for (const [name, widget] of Object.entries(form as Obj<ModalFormWidget>)) {
      const displayName = widget.options.displayName ?? name;
      if (widget.shouldSkip(player)) continue;
      const value = values.pop();
      try {
        if (widget.setValue !== undefined) {
          widget.value = widget.setValue(value);
        } else {
          widget.value = value;
        }
        for (const val of widget.options.validators ?? []) {
          if (
            val.regex !== undefined &&
            !val.regex.test(widget.value as string)
          ) {
            errors
              .get(displayName)
              .push(val.message ?? `Invalid format, expected: ${val.regex}`);
          }
          if (val.isSet === true && widget.value === undefined) {
            errors
              .get(displayName)
              .push(val.message ?? 'Error processing value.');
          }
        }
      } catch (e) {
        errors.get(displayName).push(String(e));
      }
    }

    if (errors.size === 0) {
      return Object.assign({}, res, {results: form});
    }
    const msgs: string[] = [];
    for (const [k, v] of errors?.entries() ?? []) {
      msgs.push(`${k}:`, ...v, '');
    }
    await showErrorMessage(player, msgs.join('\n'));
  }
}

/** Formats a camelCase name for human reading */
export function formatName(name: string) {
  return (
    name.charAt(0).toUpperCase() +
    name.slice(1).replace(/([a-z])([A-Z])/, '$1 $2')
  );
}

export class ModalFormWidget<ValueType = unknown, FormReturnType = unknown> {
  value: ValueType | undefined;
  constructor(
    public options: Options<ValueType>,
    public addToForm: (form: ui.ModalFormData, label: string) => void,
    public setValue?: (value: FormReturnType) => ValueType,
  ) {}

  render(form: ui.ModalFormData, title: string) {
    try {
      const label = this.options.displayName ?? formatName(title);
      this.addToForm(form, label);
    } catch (e) {
      console.error(`[form field ${title}]: ${e}`);
    }
  }

  shouldSkip(player: mc.Player) {
    if (
      this.options.requireTag !== undefined &&
      !player.hasTag(this.options.requireTag)
    ) {
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

export function textbox(placeHolder: string, options: Options<string> = {}) {
  return new ModalFormWidget<string, string>(options, (form, label) =>
    form.textField(label, placeHolder, options.defaultValue),
  );
}

/** Parses vector3 - WARNING check hasValue() before calling get() */
export function vector3(options: Options<mc.Vector3 | undefined> = {}) {
  let defaultValue = '';
  if (options.defaultValue !== undefined) {
    const {x, y, z} = options.defaultValue;
    defaultValue = `${x}, ${y}, ${z}`;
  }
  return new ModalFormWidget<mc.Vector3 | undefined, string>(
    options,
    (form, label) => form.textField(label, 'X, Y, Z', defaultValue),
    val => parseVector3(val),
  );
}

export function dropdown(
  dropdownOptions: string[],
  options: Options<string> = {},
) {
  return new ModalFormWidget<string, number>(
    options,
    (form, label) => {
      let dv: number | undefined = undefined;
      if (options.defaultValue !== undefined) {
        dv = dropdownOptions.indexOf(options.defaultValue);
        if (dv === -1) dv = undefined;
      }
      const items = [...dropdownOptions];
      if (options.includeBlank === true) items.unshift('');
      form.dropdown(label, items, dv);
    },
    i => {
      if (options.includeBlank === true) {
        i = i - 1;
      }
      if (i === -1) {
        throw new Error('No value selected');
      }
      return dropdownOptions[i] as string;
    },
  );
}

export function dropdownFromObject<T = unknown>(
  items: {[key: string]: T},
  options: Options<T> = {},
) {
  return new ModalFormWidget<T, number>(
    options,
    (form, label) => {
      let dv: number | undefined = undefined;
      if (options.defaultValue !== undefined) {
        dv = Object.values(items).indexOf(options.defaultValue);
        if (dv === -1) dv = undefined;
      }
      const keys = Object.keys(items);
      if (options.includeBlank === true) keys.unshift('');
      form.dropdown(label, keys, dv);
    },
    i => {
      if (options.includeBlank) {
        i = i - 1;
      }
      if (i === -1) {
        throw new Error('No value selected');
      }
      return Object.values(items)[i]!;
    },
  );
}

export function dropdownFromEnum<T>(
  enumItems: object,
  options: Options<T> = {},
) {
  return dropdownFromObject<T>(
    Object.fromEntries(
      Object.entries(enumItems).filter(([k]) => isNaN(Number(k))),
    ),
    options,
  );
}

export function toggle(options: Options<boolean> = {}) {
  return new ModalFormWidget<boolean, boolean>(options, (form, label) => {
    form.toggle(label, options.defaultValue);
  });
}

export function slider(
  min: number,
  max: number,
  options: Options<number> & {step?: number} = {},
) {
  return new ModalFormWidget<number, number>(options, (form, label) => {
    form.slider(label, min, max, options.step ?? 1, options.defaultValue);
  });
}

export interface Result<T> extends ui.ModalFormResponse {
  results?: T;
}

export async function SetToggleForm(
  player: mc.Player,
  title: string,
  fullSet: string[],
  activeSet: Set<string>,
) {
  const form: {[key: string]: ModalFormWidget<boolean, boolean>} = {};
  for (const s of fullSet) {
    form[s] = toggle({defaultValue: activeSet.has(s)});
  }
  const {results} = await ModalForm(player, title, form);
  if (results === undefined) return undefined;
  const set = new Set<string>();
  for (const [key, widget] of Object.entries(results)) {
    if (widget.get()) set.add(key);
  }
  return set;
}

export type ActionButton = {
  text: string;
  action: () => void | Promise<void>;
  show?: boolean;
  icon?: string;
};

export async function ActionForm(
  player: mc.Player,
  title: string,
  body: string,
  buttons: ActionButton[],
) {
  const form = new ui.ActionFormData();
  form.title(title);
  if (body !== '') {
    form.body(`\n${body}\n`);
  }
  const actions: (() => void | Promise<void>)[] = [];
  for (const button of buttons) {
    if (button.show === false) continue;
    form.button(button.text, button.icon);
    actions.push(button.action);
  }
  await timeout(DELAY);
  const res = await form.show(player);
  if (res.selection === undefined) return;
  return actions[res.selection]!();
}

// https://stackoverflow.com/a/51851844/4001895
type ArgumentTypes<F extends Function> = F extends (...args: infer A) => unknown
  ? A
  : never;

export function makeButton<T extends Function>(
  text: string,
  callable: T,
  ...args: ArgumentTypes<T>
) {
  return {text, action: () => callable(...args)};
}
