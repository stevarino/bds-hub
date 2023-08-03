import typia from "typia";
import { Button } from './packTypes.js';
export * from './packTypes.js';
export type Actor = {
    scene: string;
    tag?: string;
    name?: string;
    selector?: string;
};
export interface Scene {
    id: string;
    text: string;
    buttons?: Button[];
    // internal variable - marks if the scene is an initial scene
    _entrayPoint?: boolean;
}
;
export interface DialogueFile {
    actors?: Actor[];
    scenes?: Scene[];
}
export const assertDialogueFile = (input: any): DialogueFile => {
    const __is = (input: any): input is DialogueFile => {
        const $join = (typia.createAssert as any).join;
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && (undefined === input.tag || "string" === typeof input.tag) && (undefined === input.name || "string" === typeof input.name) && (undefined === input.selector || "string" === typeof input.selector);
        const $io2 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.buttons || Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io3 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io4(input.args));
        const $io4 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io5 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.command;
        const $io6 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.scene;
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.action)
                return $io3(input);
            if (undefined !== input.command)
                return $io5(input);
            if (undefined !== input.scene)
                return $io6(input);
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
                expected: "Actor",
                value: elem
            })) && $ao1(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "Actor",
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
            })) && $ao2(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".scenes[" + _index2 + "]",
                expected: "Scene",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".scenes",
                expected: "(Array<Scene> | undefined)",
                value: input.scenes
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && (undefined === input.tag || "string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "(string | undefined)",
                value: input.tag
            })) && (undefined === input.name || "string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "(string | undefined)",
                value: input.name
            })) && (undefined === input.selector || "string" === typeof input.selector || $guard(_exceptionable, {
                path: _path + ".selector",
                expected: "(string | undefined)",
                value: input.selector
            }));
            const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
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
            })) && input.buttons.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index3 + "]",
                expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
                value: elem
            })) && $au0(elem, _path + ".buttons[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index3 + "]",
                expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
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
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
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
            })) && $ao4(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return true;
            });
            const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.action)
                    return $ao3(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao5(input, _path, true && _exceptionable);
                if (undefined !== input.scene)
                    return $ao6(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
                    value: input
                });
            })();
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
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $io1(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && (undefined === input.tag || "string" === typeof input.tag) && (undefined === input.name || "string" === typeof input.name) && (undefined === input.selector || "string" === typeof input.selector);
        const $io2 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.buttons || Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io3 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io4(input.args));
        const $io4 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io5 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.command;
        const $io6 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.scene;
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.action)
                return $io3(input);
            if (undefined !== input.command)
                return $io5(input);
            if (undefined !== input.scene)
                return $io6(input);
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
                expected: "Actor",
                value: elem
            })) && $ao1(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "Actor",
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
            })) && $ao2(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".scenes[" + _index2 + "]",
                expected: "Scene",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".scenes",
                expected: "(Array<Scene> | undefined)",
                value: input.scenes
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            })) && (undefined === input.tag || "string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "(string | undefined)",
                value: input.tag
            })) && (undefined === input.name || "string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "(string | undefined)",
                value: input.name
            })) && (undefined === input.selector || "string" === typeof input.selector || $guard(_exceptionable, {
                path: _path + ".selector",
                expected: "(string | undefined)",
                value: input.selector
            }));
            const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
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
            })) && input.buttons.every((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index3 + "]",
                expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
                value: elem
            })) && $au0(elem, _path + ".buttons[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index3 + "]",
                expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
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
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
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
            })) && $ao4(input.args, _path + ".args", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".args",
                expected: "(Args | undefined)",
                value: input.args
            }));
            const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return true;
            });
            const $ao5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $au0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.action)
                    return $ao3(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao5(input, _path, true && _exceptionable);
                if (undefined !== input.scene)
                    return $ao6(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
                    value: input
                });
            })();
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
