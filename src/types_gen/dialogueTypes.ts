import typia from "typia";
import { Button, Actor, ItemUse } from './packTypes.js';
export * from './packTypes.js';
export interface Scene {
    id: string;
    text: string;
    buttons?: Button[];
    // internal variable - marks if the scene is an initial scene
    _entrayPoint?: boolean;
}
export interface DialogueFile {
    actors?: Actor[];
    scenes?: Scene[];
    items?: ItemUse[];
}
export const assertDialogueFile = (input: any): DialogueFile => {
    const __is = (input: any): input is DialogueFile => {
        const $join = (typia.createAssert as any).join;
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any) => "object" === typeof elem && null !== elem && $iu2(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.name;
        const $io4 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.buttons || Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io5 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io6(input.args));
        const $io6 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io7 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.command;
        const $io8 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.scene;
        const $io9 = (input: any): boolean => "string" === typeof input.text && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io10 = (input: any): boolean => (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io11 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io6(input.args));
        const $io12 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.command;
        const $io13 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io14 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io6(input.args));
        const $io15 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.command;
        const $io16 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
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
            if (undefined !== input.action)
                return $io5(input);
            if (undefined !== input.command)
                return $io7(input);
            if (undefined !== input.scene)
                return $io8(input);
            if (undefined !== input.menu)
                return $io9(input);
            return false;
        })();
        const $iu2 = (input: any): any => (() => {
            if ($io11(input))
                return $io11(input);
            if ($io12(input))
                return $io12(input);
            if ($io13(input))
                return $io13(input);
            if ($io14(input))
                return $io14(input);
            if ($io15(input))
                return $io15(input);
            if ($io16(input))
                return $io16(input);
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
                expected: "(BaseActor & NameSelector | BaseActor & SelectorSelector | BaseActor & TagSelector)",
                value: elem
            })) && $au0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "(BaseActor & NameSelector | BaseActor & SelectorSelector | BaseActor & TagSelector)",
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
                expected: "(BaseItemUse & NameSelector & Action | BaseItemUse & NameSelector & Command | BaseItemUse & NameSelector & Menu | BaseItemUse & TagSelector & Action | BaseItemUse & TagSelector & Command | BaseItemUse & TagSelector & Menu)",
                value: elem
            })) && $au2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(BaseItemUse & NameSelector & Action | BaseItemUse & NameSelector & Command | BaseItemUse & NameSelector & Menu | BaseItemUse & TagSelector & Action | BaseItemUse & TagSelector & Command | BaseItemUse & TagSelector & Menu)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
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
            })) && (undefined === input.buttons || (Array.isArray(input.buttons) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "(Array<Button> | undefined)",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "(Array<Button> | undefined)",
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
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao6(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return true;
            });
            const $ao7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            }));
            const $ao10 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.body || "string" === typeof input.body || $guard(_exceptionable, {
                path: _path + ".body",
                expected: "(string | undefined)",
                value: input.body
            })) && ((Array.isArray(input.buttons) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            }));
            const $ao11 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            })) && $ao6(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            const $ao13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            }));
            const $ao14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            })) && $ao6(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            const $ao16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            }));
            const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.tag)
                    return $ao1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $ao2(input, _path, true && _exceptionable);
                if (undefined !== input.name)
                    return $ao3(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseActor & TagSelector | BaseActor & SelectorSelector | BaseActor & NameSelector)",
                    value: input
                });
            })();
            const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.action)
                    return $ao5(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao7(input, _path, true && _exceptionable);
                if (undefined !== input.scene)
                    return $ao8(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $ao9(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Scene | BaseButton & Menu)",
                    value: input
                });
            })();
            const $au2 = (input: any, _path: string, _exceptionable: boolean = true): any => $ao11(input, _path, false && _exceptionable) || $ao12(input, _path, false && _exceptionable) || $ao13(input, _path, false && _exceptionable) || $ao14(input, _path, false && _exceptionable) || $ao15(input, _path, false && _exceptionable) || $ao16(input, _path, false && _exceptionable) || $guard(_exceptionable, {
                path: _path,
                expected: "(BaseItemUse & TagSelector & Action | BaseItemUse & TagSelector & Command | BaseItemUse & TagSelector & Menu | BaseItemUse & NameSelector & Action | BaseItemUse & NameSelector & Command | BaseItemUse & NameSelector & Menu)",
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
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any) => "object" === typeof elem && null !== elem && $iu2(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.name;
        const $io4 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.buttons || Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io5 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io6(input.args));
        const $io6 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io7 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.command;
        const $io8 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.scene;
        const $io9 = (input: any): boolean => "string" === typeof input.text && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io10 = (input: any): boolean => (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io11 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io6(input.args));
        const $io12 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && "string" === typeof input.command;
        const $io13 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io14 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io6(input.args));
        const $io15 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && "string" === typeof input.command;
        const $io16 = (input: any): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
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
            if (undefined !== input.action)
                return $io5(input);
            if (undefined !== input.command)
                return $io7(input);
            if (undefined !== input.scene)
                return $io8(input);
            if (undefined !== input.menu)
                return $io9(input);
            return false;
        })();
        const $iu2 = (input: any): any => (() => {
            if ($io11(input))
                return $io11(input);
            if ($io12(input))
                return $io12(input);
            if ($io13(input))
                return $io13(input);
            if ($io14(input))
                return $io14(input);
            if ($io15(input))
                return $io15(input);
            if ($io16(input))
                return $io16(input);
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
                expected: "(BaseActor & NameSelector | BaseActor & SelectorSelector | BaseActor & TagSelector)",
                value: elem
            })) && $au0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "(BaseActor & NameSelector | BaseActor & SelectorSelector | BaseActor & TagSelector)",
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
                expected: "(BaseItemUse & NameSelector & Action | BaseItemUse & NameSelector & Command | BaseItemUse & NameSelector & Menu | BaseItemUse & TagSelector & Action | BaseItemUse & TagSelector & Command | BaseItemUse & TagSelector & Menu)",
                value: elem
            })) && $au2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(BaseItemUse & NameSelector & Action | BaseItemUse & NameSelector & Command | BaseItemUse & NameSelector & Menu | BaseItemUse & TagSelector & Action | BaseItemUse & TagSelector & Command | BaseItemUse & TagSelector & Menu)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
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
            })) && (undefined === input.buttons || (Array.isArray(input.buttons) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "(Array<Button> | undefined)",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index4 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "(Array<Button> | undefined)",
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
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            })) && (undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            })) && $ao6(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return true;
            });
            const $ao7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            }));
            const $ao10 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.body || "string" === typeof input.body || $guard(_exceptionable, {
                path: _path + ".body",
                expected: "(string | undefined)",
                value: input.body
            })) && ((Array.isArray(input.buttons) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            })) && input.buttons.every((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Menu | BaseButton & Scene)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "Array<Button>",
                value: input.buttons
            }));
            const $ao11 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            })) && $ao6(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            const $ao13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            }));
            const $ao14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            })) && $ao6(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
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
            const $ao16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.requireOp || "boolean" === typeof input.requireOp || $guard(_exceptionable, {
                path: _path + ".requireOp",
                expected: "(boolean | undefined)",
                value: input.requireOp
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "__type",
                value: input.menu
            }));
            const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.tag)
                    return $ao1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $ao2(input, _path, true && _exceptionable);
                if (undefined !== input.name)
                    return $ao3(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseActor & TagSelector | BaseActor & SelectorSelector | BaseActor & NameSelector)",
                    value: input
                });
            })();
            const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.action)
                    return $ao5(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao7(input, _path, true && _exceptionable);
                if (undefined !== input.scene)
                    return $ao8(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $ao9(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseButton & Action | BaseButton & Command | BaseButton & Scene | BaseButton & Menu)",
                    value: input
                });
            })();
            const $au2 = (input: any, _path: string, _exceptionable: boolean = true): any => $ao11(input, _path, false && _exceptionable) || $ao12(input, _path, false && _exceptionable) || $ao13(input, _path, false && _exceptionable) || $ao14(input, _path, false && _exceptionable) || $ao15(input, _path, false && _exceptionable) || $ao16(input, _path, false && _exceptionable) || $guard(_exceptionable, {
                path: _path,
                expected: "(BaseItemUse & TagSelector & Action | BaseItemUse & TagSelector & Command | BaseItemUse & TagSelector & Menu | BaseItemUse & NameSelector & Action | BaseItemUse & NameSelector & Command | BaseItemUse & NameSelector & Menu)",
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
