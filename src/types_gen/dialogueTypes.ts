import typia from "typia";
export interface DialogueFile {
    actors?: Actor[];
    scenes?: Scene[];
}
export type Actor = BaseActor & (TagActor | SelectorActor);
interface BaseActor {
    scene: string;
}
;
interface TagActor {
    tag: string;
}
;
interface SelectorActor {
    selector: string;
}
;
type SuperActor = (Actor & Partial<TagActor> & Partial<SelectorActor>);
export interface Scene {
    id: string;
    text: string;
    buttons?: Button[];
}
type Button = BaseButton & (ActionButton | CommandButton | SceneButton);
interface BaseButton {
    text: string;
}
;
interface ActionButton {
    action: string;
}
;
interface CommandButton {
    command: string;
}
;
interface SceneButton {
    scene: string;
}
;
export type SuperButton = Button & Partial<ActionButton & CommandButton & SceneButton>;
;
export type Transition = Partial<SuperButton>;
export type TransitionMap = {
    [key: string]: Transition;
};
export const assertDialogueFile = (input: any): DialogueFile => {
    const __is = (input: any): input is DialogueFile => {
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io3(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.buttons || Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io4 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.action;
        const $io5 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.command;
        const $io6 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.scene;
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.tag)
                return $io1(input);
            if (undefined !== input.selector)
                return $io2(input);
            return false;
        })();
        const $iu1 = (input: any): any => (() => {
            if (undefined !== input.action)
                return $io4(input);
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
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.actors || (Array.isArray(input.actors) || $guard(_exceptionable, {
                path: _path + ".actors",
                expected: "(Array<Actor> | undefined)",
                value: input.actors
            })) && input.actors.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "(BaseActor & SelectorActor | BaseActor & TagActor)",
                value: elem
            })) && $au0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "(BaseActor & SelectorActor | BaseActor & TagActor)",
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
            })) && $ao3(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
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
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
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
            })) && $au1(elem, _path + ".buttons[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index3 + "]",
                expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "(Array<Button> | undefined)",
                value: input.buttons
            }));
            const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            }));
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
                if (undefined !== input.tag)
                    return $ao1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $ao2(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseActor & TagActor | BaseActor & SelectorActor)",
                    value: input
                });
            })();
            const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.action)
                    return $ao4(input, _path, true && _exceptionable);
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
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io3(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.buttons || Array.isArray(input.buttons) && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io4 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.action;
        const $io5 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.command;
        const $io6 = (input: any): boolean => "string" === typeof input.text && "string" === typeof input.scene;
        const $iu0 = (input: any): any => (() => {
            if (undefined !== input.tag)
                return $io1(input);
            if (undefined !== input.selector)
                return $io2(input);
            return false;
        })();
        const $iu1 = (input: any): any => (() => {
            if (undefined !== input.action)
                return $io4(input);
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
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.actors || (Array.isArray(input.actors) || $guard(_exceptionable, {
                path: _path + ".actors",
                expected: "(Array<Actor> | undefined)",
                value: input.actors
            })) && input.actors.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "(BaseActor & SelectorActor | BaseActor & TagActor)",
                value: elem
            })) && $au0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actors[" + _index1 + "]",
                expected: "(BaseActor & SelectorActor | BaseActor & TagActor)",
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
            })) && $ao3(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
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
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.id || $guard(_exceptionable, {
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
            })) && $au1(elem, _path + ".buttons[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index3 + "]",
                expected: "(BaseButton & ActionButton | BaseButton & CommandButton | BaseButton & SceneButton)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".buttons",
                expected: "(Array<Button> | undefined)",
                value: input.buttons
            }));
            const $ao4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && ("string" === typeof input.action || $guard(_exceptionable, {
                path: _path + ".action",
                expected: "string",
                value: input.action
            }));
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
                if (undefined !== input.tag)
                    return $ao1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $ao2(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "(BaseActor & TagActor | BaseActor & SelectorActor)",
                    value: input
                });
            })();
            const $au1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.action)
                    return $ao4(input, _path, true && _exceptionable);
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
