import typia from "typia";
import { Button, Actor, ItemUse, MenuDetails } from './packTypes.js';
export * from './packTypes.js';
export interface Scene {
    id: string;
    text: string;
    /**
     * @minItems 1
     * @maxItems 6
     */
    buttons: Button[];
    // internal variable - marks if the scene is an initial scene
    _entrayPoint?: boolean;
}
export interface DialogueFile {
    actors?: Actor[];
    scenes?: Scene[];
    items?: ItemUse[];
    menus?: {
        [ref: string]: MenuDetails;
    };
}
export const assertDialogueFile = (input: any): DialogueFile => {
    const __is = (input: any): input is DialogueFile => {
        const $join = (typia.createAssert as any).join;
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any) => "object" === typeof elem && null !== elem && $iu2(elem))) && (undefined === input.menus || "object" === typeof input.menus && null !== input.menus && false === Array.isArray(input.menus) && $io27(input.menus));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.name;
        const $io4 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io5 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.scene;
        const $io6 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io7 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io8 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.command;
        const $io9 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io10 = (input: any): boolean => "string" === typeof input.title && (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io11 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.menuRef;
        const $io12 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && ("object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io13 = (input: any): boolean => "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io14(input.then) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io14(input["else"]));
        const $io14 = (input: any): boolean => (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io10(input.menu)) && (undefined === input.menuRef || "string" === typeof input.menuRef) && (undefined === input.ifIsOp || "object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io15 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.scene;
        const $io16 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io17 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.command;
        const $io18 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io19 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.menuRef;
        const $io20 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && ("object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io21 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.scene;
        const $io22 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io23 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.command;
        const $io24 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io25 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.menuRef;
        const $io26 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && ("object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io27 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "object" === typeof value && null !== value && $io10(value);
            return true;
        });
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.tag)
                return $io1(input);
            if (undefined !== input.selector)
                return $io2(input);
            if (undefined !== input.name)
                return $io3(input);
            return false;
        })();
        const $iu1 = (input: any): any => (() => {
            if (undefined !== input.scene)
                return $io5(input);
            if (undefined !== input.action)
                return $io6(input);
            if (undefined !== input.command)
                return $io8(input);
            if (undefined !== input.menu)
                return $io9(input);
            if (undefined !== input.menuRef)
                return $io11(input);
            if (undefined !== input.ifIsOp)
                return $io12(input);
            return false;
        })();
        const $iu2 = (input: any): any => (() => {
            if ($io15(input))
                return $io15(input);
            if ($io16(input))
                return $io16(input);
            if ($io17(input))
                return $io17(input);
            if ($io18(input))
                return $io18(input);
            if ($io19(input))
                return $io19(input);
            if ($io20(input))
                return $io20(input);
            if ($io21(input))
                return $io21(input);
            if ($io22(input))
                return $io22(input);
            if ($io23(input))
                return $io23(input);
            if ($io24(input))
                return $io24(input);
            if ($io25(input))
                return $io25(input);
            if ($io26(input))
                return $io26(input);
            return false;
        })();
        return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is DialogueFile => {
            const $guard = (typia.createAssert as any).guard;
            const $join = (typia.createAssert as any).join;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.actors || (Array.isArray(input.actors) || $guard(_exceptionable, {
                path: _path + ".actors",
                expected: "(Array<Actor> | undefined)",
                value: input.actors
            })) && input.actors.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "({ scene: string; } & NameSelector | { scene: string; } & SelectorSelector | { scene: string; } & TagSelector)",
                value: elem
            })) && $au0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "({ scene: string; } & NameSelector | { scene: string; } & SelectorSelector | { scene: string; } & TagSelector)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".actors",
                expected: "(Array<Actor> | undefined)",
                value: input.actors
            })) && (undefined === input.scenes || (Array.isArray(input.scenes) || $guard(_exceptionable, {
                path: _path + ".scenes",
                expected: "(Array<Scene> | undefined)",
                value: input.scenes
            })) && input.scenes.every((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".scenes[" + _index2 + "]",
                expected: "Scene",
                value: elem
            })) && $ao4(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".scenes[" + _index2 + "]",
                expected: "Scene",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".scenes",
                expected: "(Array<Scene> | undefined)",
                value: input.scenes
            })) && (undefined === input.items || (Array.isArray(input.items) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
            })) && input.items.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(requireOp & NameSelector & Action | requireOp & NameSelector & Command | requireOp & NameSelector & IsOp | requireOp & NameSelector & Menu | requireOp & NameSelector & MenuRef | requireOp & NameSelector & Scene | requireOp & TagSelector & Action | requireOp & TagSelector & Command | requireOp & TagSelector & IsOp | requireOp & TagSelector & Menu | requireOp & TagSelector & MenuRef | requireOp & TagSelector & Scene)",
                value: elem
            })) && $au2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(requireOp & NameSelector & Action | requireOp & NameSelector & Command | requireOp & NameSelector & IsOp | requireOp & NameSelector & Menu | requireOp & NameSelector & MenuRef | requireOp & NameSelector & Scene | requireOp & TagSelector & Action | requireOp & TagSelector & Command | requireOp & TagSelector & IsOp | requireOp & TagSelector & Menu | requireOp & TagSelector & MenuRef | requireOp & TagSelector & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
            })) && (undefined === input.menus || ("object" === typeof input.menus && null !== input.menus && false === Array.isArray(input.menus) || $guard(_exceptionable, {
                path: _path + ".menus",
                expected: "(__type.o1 | undefined)",
                value: input.menus
            })) && $ao27(input.menus, _path + ".menus", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menus",
                expected: "(__type.o1 | undefined)",
                value: input.menus
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            }));
            const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && ("string" === typeof input.selector || $guard(_exceptionable, {
                path: _path + ".selector",
                expected: "string",
                value: input.selector
            }));
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            }));
            const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
                path: _path + ".id",
                expected: "string",
                value: input.id
            })) && ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ((Array.isArray(input.buttons) && (1 <= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@minItems 1)",
                value: input.buttons
            })) && (6 >= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@maxItems 6)",
                value: input.buttons
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint || $guard(_exceptionable, {
                path: _path + "._entrayPoint",
                expected: "(boolean | undefined)",
                value: input._entrayPoint
            }));
            const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return true;
            });
            const $ao8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao10 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.title || $guard(_exceptionable, {
                path: _path + ".title",
                expected: "string",
                value: input.title
            })) && (undefined === input.body || "string" === typeof input.body || $guard(_exceptionable, {
                path: _path + ".body",
                expected: "(string | undefined)",
                value: input.body
            })) && ((Array.isArray(input.buttons) && (1 <= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@minItems 1)",
                value: input.buttons
            })) && (6 >= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@maxItems 6)",
                value: input.buttons
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            }));
            const $ao11 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "string",
                value: input.menuRef
            }));
            const $ao12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && (("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            }));
            const $ao13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input.then
            })) && $ao14(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input["else"]
            })) && $ao14(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input["else"]
            }));
            const $ao14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.scene || "string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "(string | undefined)",
                value: input.scene
            })) && (undefined === input.action || "string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "(string | undefined)",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && (undefined === input.command || "string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "(string | undefined)",
                value: input.command
            })) && (undefined === input.menu || ("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "(MenuDetails | undefined)",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "(MenuDetails | undefined)",
                value: input.menu
            })) && (undefined === input.menuRef || "string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "(string | undefined)",
                value: input.menuRef
            })) && (undefined === input.ifIsOp || ("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "(__type | undefined)",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "(__type | undefined)",
                value: input.ifIsOp
            }));
            const $ao15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao17 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao18 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao19 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "string",
                value: input.menuRef
            }));
            const $ao20 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            }));
            const $ao21 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao22 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao23 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao24 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao25 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "string",
                value: input.menuRef
            }));
            const $ao26 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            }));
            const $ao27 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return ("object" === typeof value && null !== value || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "MenuDetails",
                        value: value
                    })) && $ao10(value, _path + $join(key), true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "MenuDetails",
                        value: value
                    });
                return true;
            });
            const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.tag)
                    return $ao1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $ao2(input, _path, true && _exceptionable);
                if (undefined !== input.name)
                    return $ao3(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ scene: string; } & TagSelector | { scene: string; } & SelectorSelector | { scene: string; } & NameSelector)",
                    value: input
                });
            })();
            const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $ao5(input, _path, true && _exceptionable);
                if (undefined !== input.action)
                    return $ao6(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao8(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $ao9(input, _path, true && _exceptionable);
                if (undefined !== input.menuRef)
                    return $ao11(input, _path, true && _exceptionable);
                if (undefined !== input.ifIsOp)
                    return $ao12(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ text: string; } & requireOp & Scene | { text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & IsOp)",
                    value: input
                });
            })();
            const $au2 = (input: any, _path: string, _exceptionable: boolean = true): any => $ao15(input, _path, false && _exceptionable) || $ao16(input, _path, false && _exceptionable) || $ao17(input, _path, false && _exceptionable) || $ao18(input, _path, false && _exceptionable) || $ao19(input, _path, false && _exceptionable) || $ao20(input, _path, false && _exceptionable) || $ao21(input, _path, false && _exceptionable) || $ao22(input, _path, false && _exceptionable) || $ao23(input, _path, false && _exceptionable) || $ao24(input, _path, false && _exceptionable) || $ao25(input, _path, false && _exceptionable) || $ao26(input, _path, false && _exceptionable) || $guard(_exceptionable, {
                path: _path,
                expected: "(requireOp & TagSelector & Scene | requireOp & TagSelector & Action | requireOp & TagSelector & Command | requireOp & TagSelector & Menu | requireOp & TagSelector & MenuRef | requireOp & TagSelector & IsOp | requireOp & NameSelector & Scene | requireOp & NameSelector & Action | requireOp & NameSelector & Command | requireOp & NameSelector & Menu | requireOp & NameSelector & MenuRef | requireOp & NameSelector & IsOp)",
                value: input
            });
            return ("object" === typeof input && null !== input && false === Array.isArray(input) || $guard(true, {
                path: _path + "",
                expected: "DialogueFile",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "DialogueFile",
                value: input
            });
        })(input, "$input", true);
    return input;
};
export const parseDialogueFile = (input: string): typia.Primitive<DialogueFile> => { const assert = (input: any): DialogueFile => {
    const __is = (input: any): input is DialogueFile => {
        const $join = (typia.createAssertParse as any).join;
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any) => "object" === typeof elem && null !== elem && $iu2(elem))) && (undefined === input.menus || "object" === typeof input.menus && null !== input.menus && false === Array.isArray(input.menus) && $io27(input.menus));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.name;
        const $io4 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io5 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.scene;
        const $io6 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io7 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io8 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.command;
        const $io9 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io10 = (input: any): boolean => "string" === typeof input.title && (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io11 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.menuRef;
        const $io12 = (input: any): boolean => "string" === typeof input.text && (undefined === input.requireOp || "boolean" === typeof input.requireOp) && ("object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io13 = (input: any): boolean => "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io14(input.then) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io14(input["else"]));
        const $io14 = (input: any): boolean => (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io10(input.menu)) && (undefined === input.menuRef || "string" === typeof input.menuRef) && (undefined === input.ifIsOp || "object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io15 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.scene;
        const $io16 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io17 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.command;
        const $io18 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io19 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.menuRef;
        const $io20 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && ("object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io21 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.scene;
        const $io22 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io23 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.command;
        const $io24 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io25 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.menuRef;
        const $io26 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && ("object" === typeof input.ifIsOp && null !== input.ifIsOp && $io13(input.ifIsOp));
        const $io27 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "object" === typeof value && null !== value && $io10(value);
            return true;
        });
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.tag)
                return $io1(input);
            if (undefined !== input.selector)
                return $io2(input);
            if (undefined !== input.name)
                return $io3(input);
            return false;
        })();
        const $iu1 = (input: any): any => (() => {
            if (undefined !== input.scene)
                return $io5(input);
            if (undefined !== input.action)
                return $io6(input);
            if (undefined !== input.command)
                return $io8(input);
            if (undefined !== input.menu)
                return $io9(input);
            if (undefined !== input.menuRef)
                return $io11(input);
            if (undefined !== input.ifIsOp)
                return $io12(input);
            return false;
        })();
        const $iu2 = (input: any): any => (() => {
            if ($io15(input))
                return $io15(input);
            if ($io16(input))
                return $io16(input);
            if ($io17(input))
                return $io17(input);
            if ($io18(input))
                return $io18(input);
            if ($io19(input))
                return $io19(input);
            if ($io20(input))
                return $io20(input);
            if ($io21(input))
                return $io21(input);
            if ($io22(input))
                return $io22(input);
            if ($io23(input))
                return $io23(input);
            if ($io24(input))
                return $io24(input);
            if ($io25(input))
                return $io25(input);
            if ($io26(input))
                return $io26(input);
            return false;
        })();
        return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is DialogueFile => {
            const $guard = (typia.createAssertParse as any).guard;
            const $join = (typia.createAssertParse as any).join;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.actors || (Array.isArray(input.actors) || $guard(_exceptionable, {
                path: _path + ".actors",
                expected: "(Array<Actor> | undefined)",
                value: input.actors
            })) && input.actors.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "({ scene: string; } & NameSelector | { scene: string; } & SelectorSelector | { scene: string; } & TagSelector)",
                value: elem
            })) && $au0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "({ scene: string; } & NameSelector | { scene: string; } & SelectorSelector | { scene: string; } & TagSelector)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".actors",
                expected: "(Array<Actor> | undefined)",
                value: input.actors
            })) && (undefined === input.scenes || (Array.isArray(input.scenes) || $guard(_exceptionable, {
                path: _path + ".scenes",
                expected: "(Array<Scene> | undefined)",
                value: input.scenes
            })) && input.scenes.every((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".scenes[" + _index2 + "]",
                expected: "Scene",
                value: elem
            })) && $ao4(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".scenes[" + _index2 + "]",
                expected: "Scene",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".scenes",
                expected: "(Array<Scene> | undefined)",
                value: input.scenes
            })) && (undefined === input.items || (Array.isArray(input.items) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
            })) && input.items.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(requireOp & NameSelector & Action | requireOp & NameSelector & Command | requireOp & NameSelector & IsOp | requireOp & NameSelector & Menu | requireOp & NameSelector & MenuRef | requireOp & NameSelector & Scene | requireOp & TagSelector & Action | requireOp & TagSelector & Command | requireOp & TagSelector & IsOp | requireOp & TagSelector & Menu | requireOp & TagSelector & MenuRef | requireOp & TagSelector & Scene)",
                value: elem
            })) && $au2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(requireOp & NameSelector & Action | requireOp & NameSelector & Command | requireOp & NameSelector & IsOp | requireOp & NameSelector & Menu | requireOp & NameSelector & MenuRef | requireOp & NameSelector & Scene | requireOp & TagSelector & Action | requireOp & TagSelector & Command | requireOp & TagSelector & IsOp | requireOp & TagSelector & Menu | requireOp & TagSelector & MenuRef | requireOp & TagSelector & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
            })) && (undefined === input.menus || ("object" === typeof input.menus && null !== input.menus && false === Array.isArray(input.menus) || $guard(_exceptionable, {
                path: _path + ".menus",
                expected: "(__type.o1 | undefined)",
                value: input.menus
            })) && $ao27(input.menus, _path + ".menus", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menus",
                expected: "(__type.o1 | undefined)",
                value: input.menus
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            }));
            const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && ("string" === typeof input.selector || $guard(_exceptionable, {
                path: _path + ".selector",
                expected: "string",
                value: input.selector
            }));
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            }));
            const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
                path: _path + ".id",
                expected: "string",
                value: input.id
            })) && ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ((Array.isArray(input.buttons) && (1 <= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@minItems 1)",
                value: input.buttons
            })) && (6 >= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@maxItems 6)",
                value: input.buttons
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint || $guard(_exceptionable, {
                path: _path + "._entrayPoint",
                expected: "(boolean | undefined)",
                value: input._entrayPoint
            }));
            const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return true;
            });
            const $ao8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao10 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.title || $guard(_exceptionable, {
                path: _path + ".title",
                expected: "string",
                value: input.title
            })) && (undefined === input.body || "string" === typeof input.body || $guard(_exceptionable, {
                path: _path + ".body",
                expected: "(string | undefined)",
                value: input.body
            })) && ((Array.isArray(input.buttons) && (1 <= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@minItems 1)",
                value: input.buttons
            })) && (6 >= input.buttons.length || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array.length (@maxItems 6)",
                value: input.buttons
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "({ text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & IsOp | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            }));
            const $ao11 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "string",
                value: input.menuRef
            }));
            const $ao12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && (("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            }));
            const $ao13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input.then
            })) && $ao14(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input["else"]
            })) && $ao14(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & MenuRef & IsOp>",
                value: input["else"]
            }));
            const $ao14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.scene || "string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "(string | undefined)",
                value: input.scene
            })) && (undefined === input.action || "string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "(string | undefined)",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && (undefined === input.command || "string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "(string | undefined)",
                value: input.command
            })) && (undefined === input.menu || ("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "(MenuDetails | undefined)",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "(MenuDetails | undefined)",
                value: input.menu
            })) && (undefined === input.menuRef || "string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "(string | undefined)",
                value: input.menuRef
            })) && (undefined === input.ifIsOp || ("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "(__type | undefined)",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "(__type | undefined)",
                value: input.ifIsOp
            }));
            const $ao15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao17 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao18 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao19 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "string",
                value: input.menuRef
            }));
            const $ao20 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            }));
            const $ao21 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao22 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao7(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao23 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao24 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao25 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.menuRef || $guard(_exceptionable, {
                path: _path + ".menuRef",
                expected: "string",
                value: input.menuRef
            }));
            const $ao26 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.ifIsOp && null !== input.ifIsOp || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            })) && $ao13(input.ifIsOp, _path + ".ifIsOp", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".ifIsOp",
                expected: "__type",
                value: input.ifIsOp
            }));
            const $ao27 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return ("object" === typeof value && null !== value || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "MenuDetails",
                        value: value
                    })) && $ao10(value, _path + $join(key), true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "MenuDetails",
                        value: value
                    });
                return true;
            });
            const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.tag)
                    return $ao1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $ao2(input, _path, true && _exceptionable);
                if (undefined !== input.name)
                    return $ao3(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ scene: string; } & TagSelector | { scene: string; } & SelectorSelector | { scene: string; } & NameSelector)",
                    value: input
                });
            })();
            const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $ao5(input, _path, true && _exceptionable);
                if (undefined !== input.action)
                    return $ao6(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao8(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $ao9(input, _path, true && _exceptionable);
                if (undefined !== input.menuRef)
                    return $ao11(input, _path, true && _exceptionable);
                if (undefined !== input.ifIsOp)
                    return $ao12(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ text: string; } & requireOp & Scene | { text: string; } & requireOp & Action | { text: string; } & requireOp & Command | { text: string; } & requireOp & Menu | { text: string; } & requireOp & MenuRef | { text: string; } & requireOp & IsOp)",
                    value: input
                });
            })();
            const $au2 = (input: any, _path: string, _exceptionable: boolean = true): any => $ao15(input, _path, false && _exceptionable) || $ao16(input, _path, false && _exceptionable) || $ao17(input, _path, false && _exceptionable) || $ao18(input, _path, false && _exceptionable) || $ao19(input, _path, false && _exceptionable) || $ao20(input, _path, false && _exceptionable) || $ao21(input, _path, false && _exceptionable) || $ao22(input, _path, false && _exceptionable) || $ao23(input, _path, false && _exceptionable) || $ao24(input, _path, false && _exceptionable) || $ao25(input, _path, false && _exceptionable) || $ao26(input, _path, false && _exceptionable) || $guard(_exceptionable, {
                path: _path,
                expected: "(requireOp & TagSelector & Scene | requireOp & TagSelector & Action | requireOp & TagSelector & Command | requireOp & TagSelector & Menu | requireOp & TagSelector & MenuRef | requireOp & TagSelector & IsOp | requireOp & NameSelector & Scene | requireOp & NameSelector & Action | requireOp & NameSelector & Command | requireOp & NameSelector & Menu | requireOp & NameSelector & MenuRef | requireOp & NameSelector & IsOp)",
                value: input
            });
            return ("object" === typeof input && null !== input && false === Array.isArray(input) || $guard(true, {
                path: _path + "",
                expected: "DialogueFile",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "DialogueFile",
                value: input
            });
        })(input, "$input", true);
    return input;
}; input = JSON.parse(input); return assert(input) as any; };
