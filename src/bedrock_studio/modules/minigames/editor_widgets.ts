import * as mgt from './types.js';
import * as forms from '../../../lib/form.js';
import * as patterns from '../../../lib/patterns.js';

import {EXPRESSION_ARGUMENT_TYPES as AT} from './types.js';

function deserializeNumber<T = {[k: string]: number}>(
  str: string | undefined,
  ptn: RegExp,
): T | undefined {
  return patterns.matchNamed(ptn, str ?? '', (v: string, k: string) => {
    if (k.length === 2 && k[1] === 'r') return v === '~' ? 1 : 0;
    return Number(v);
  }) as T | undefined;
}

function enumToObject(enumItems: {[k: string | number]: string | number}) {
  return Object.fromEntries(
    Object.entries(enumItems).filter(([k]) => isNaN(Number(k))),
  ) as {[k: string]: number};
}

export type Vec3<T = number> = {x: T; y: T; z: T};
export type Vec2<T = number> = {x: T; y: T};
type RelTuple = [isRel: number, value: number];
export type Vec3r = Vec3<RelTuple>;

abstract class Field<T> {
  abstract buildField(
    value: T | undefined,
    mg: mgt.Minigame,
  ): {
    /** Render the field into a ModalFormWidget onto the form */
    render: (form: forms.ModalFormType) => boolean;
    /** Parse the return value from the ModalFormWidget into a data object */
    parse: (form: forms.ModalFormType) => T | undefined;
    /** Compile the field into Javascript code */
    compile: () => string;
    /** Label to be used */
    label: () => string | undefined;
  };
}

class TextField<T> extends Field<T> {
  constructor(
    public pattern: RegExp,
    public serialize: (value: T) => string,
    public deserialize: (
      value: string | undefined,
      ptn: RegExp,
    ) => T | undefined,
    public options?: {
      validators?: forms.Validator[];
      default?: T;
      label?: string;
    },
  ) {
    super();
  }

  buildField(value: T | undefined) {
    return {
      render: (form: forms.ModalFormType) => {
        console.warn('PRE VALUE: ', JSON.stringify(value));
        value = value ?? this.options?.default;
        form.value = forms.textbox('', {
          displayName: this.options?.label,
          defaultValue:
            value === undefined || value === null ? '' : this.serialize(value),
          validators: [
            {regex: this.pattern},
            ...(this.options?.validators ?? []),
          ],
        }) as forms.ModalFormWidget;
        return true;
      },
      parse: (form: forms.ModalFormType) => {
        const value = form.value as forms.ModalFormWidget<string, string>;
        console.warn('POST VALUE: ', JSON.stringify(value.get()));
        return this.deserialize(value.get(), this.pattern);
      },
      compile: () => JSON.stringify(value),
      label: () => this.options?.label,
    };
  }
}

interface DropdownOptions {
  validators?: forms.Validator[];
  /** Whether to include a blank option, default true */
  includeBlank?: boolean;
  /** Allow the field to be overwritten with an expression, default true */
  allowExpression?: boolean;
  /** Label to be used */
  label?: string;
}

class DropdownField<T = string> extends Field<T> {
  constructor(
    public items:
      | string[]
      | {[key: string]: T}
      | ((mg: mgt.Minigame) => {[key: string]: T} | string[]),
    public options?: DropdownOptions,
  ) {
    super();
  }

  buildField(value: T | undefined, mg: mgt.Minigame) {
    let items = this.items;
    if (typeof items === 'function') {
      items = items(mg);
    }
    if (Array.isArray(items)) {
      items = Object.fromEntries(items.map(s => [s, s])) as {[k: string]: T};
    }

    return {
      render: (form: forms.ModalFormType) => {
        form.value = forms.dropdownFromObject(items as {[key: string]: T}, {
          displayName: this.options?.label,
          defaultValue: value,
          validators: [
            {isSet: this.options?.includeBlank !== false},
            ...(this.options?.validators ?? []),
          ],
          includeBlank: this.options?.includeBlank !== false,
        }) as forms.ModalFormWidget;
        return this.options?.allowExpression !== false;
      },
      parse: (form: forms.ModalFormType) => {
        const value = form.value as forms.ModalFormWidget<T, number>;
        return value.get();
      },
      compile: () => JSON.stringify(value),
      label: () => this.options?.label,
    };
  }
}

type FieldTypes = {
  [key in AT]:
    | null
    | TextField<string>
    | TextField<number>
    | DropdownField<number>
    | TextField<Vec3>
    | TextField<Vec3 | object>
    | TextField<Vec3r>
    | TextField<Vec2>;
};

const Fields: FieldTypes = {
  [AT.Expression]: null,
  [AT.StatementList]: null,

  [AT.String]: new TextField<string>(
    /.*/,
    v => v,
    v => v,
    {default: ''},
  ),
  [AT.Number]: new TextField<number>(
    patterns.NumP,
    v => String(v),
    v => Number(v),
    {default: 0.0},
  ),
  [AT.Integer]: new TextField<number>(
    patterns.IntP,
    v => String(v),
    v => Number(v),
    {default: 0},
  ),
  [AT.Boolean]: new DropdownField({True: 1, False: 0}),
  [AT.Stage]: new DropdownField(mg =>
    Object.fromEntries(mg.stages.map(s => [s, s.id])),
  ),
  [AT.Region]: new DropdownField(mg => [
    ...(mg.regions ?? []).map(r => r.name),
    ...Object.keys(mg.regionGroups ?? {}),
  ]),
  [AT.Var]: new DropdownField(mg => [
    ...Object.keys(mg.playerVars ?? {}),
    ...Object.keys(mg.gameVars ?? {}),
  ]),
  [AT.VarGame]: new DropdownField(mg => Object.keys(mg.gameVars ?? {})),
  [AT.VarPlayer]: new DropdownField(mg => Object.keys(mg.playerVars ?? {})),

  // Datatypes
  [AT.Vector3]: new TextField(
    patterns.Vec3P,
    v => (v ? `${v.x}, ${v.y}, ${v.z}` : 'X, Y, Z'),
    deserializeNumber<Vec3>,
  ),
  [AT.Vector3o]: new TextField<Vec3 | object>(
    patterns.Vec3oP,
    v => (v && 'x' in v ? `${v.x}, ${v.y}, ${v.z}` : 'X, Y, Z'),
    v => deserializeNumber<Vec3>(v, patterns.Vec3P) ?? {},
  ),
  [AT.Vector3i]: new TextField<Vec3>(
    patterns.Vec3iP,
    v => (v ? `${v.x}, ${v.y}, ${v.z}` : 'X, Y, Z'),
    deserializeNumber<Vec3>,
  ),
  [AT.Vector3r]: new TextField<Vec3r>(
    patterns.Vec3rP,
    (value: Vec3r | null) => {
      if (value === null) return '~0, ~0, ~0';
      const serialize = (tup: RelTuple) => {
        if (tup[0] === 1) return `~${tup[1]}`;
        return String(tup[1]);
      };
      return [serialize(value.x), serialize(value.y), serialize(value.z)].join(
        ' ',
      );
    },
    s => {
      const o = deserializeNumber(s, patterns.Vec3rP) as Vec3 & {
        xr: number;
        yr: number;
        zr: number;
      };
      if (o === undefined) return undefined;
      return {x: [o.xr, o.x], y: [o.yr, o.y], z: [o.zr, o.z]};
    },
  ),
  [AT.Vector3p]: new TextField<Partial<Vec3>>(
    patterns.Vec3pP,
    v => `${v.x ?? 'X'}, ${v.y ?? 'Y'}, ${v.z ?? 'Z'}`,
    v => deserializeNumber<Partial<Vec3>>(v, patterns.Vec3pP) ?? {},
    {default: {x: undefined, y: undefined, z: undefined}},
  ),
  [AT.Vector2]: new TextField<Vec2>(
    patterns.Vec2P,
    v => (v ? `${v.x}, ${v.y}` : 'X, Y'),
    deserializeNumber<Vec2>,
  ),
  [AT.Vector2o]: new TextField<Vec2 | object>(
    patterns.Vec2oP,
    v => ('x' in v ? `${v.x}, ${v.y}` : 'X, Y'),
    v => deserializeNumber<Vec2>(v, patterns.Vec2P) ?? {},
    {default: {}},
  ),
  [AT.Vector2p]: new TextField<Partial<Vec2>>(
    patterns.Vec2pP,
    v => `${v.x ?? 'X'}, ${v.y ?? 'Y'}`,
    v => deserializeNumber<Partial<Vec2>>(v, patterns.Vec2pP) ?? {},
    {default: {x: undefined, y: undefined}},
  ),

  // Enums
  [AT.PlayerState]: new DropdownField(enumToObject(mgt.PLAYER_STATE)),
  [AT.CameraPreset]: new DropdownField(enumToObject(mgt.CAMERA_PRESET)),
  [AT.CameraEase]: new DropdownField(enumToObject(mgt.CAMERA_EASE)),
  [AT.CameraFade]: new DropdownField(enumToObject(mgt.CAMERA_FADE)),
};

/** Returns a field, given a Attribute type */
export function getField<T>(
  argType: mgt.EXPRESSION_ARGUMENT_TYPES,
  value: T,
  mg: mgt.Minigame,
) {
  const field = Fields[argType] as Field<T>;
  if (field === null) return;
  return field.buildField(value, mg);
}
