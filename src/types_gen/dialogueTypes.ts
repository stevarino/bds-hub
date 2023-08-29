import typia from "typia";
import * as types from "../behavior_pack/src/types/packTypes.js";
export * from '../behavior_pack/src/types/packTypes.js';
export interface ScriptFile {
    actors?: types.Actor[];
    scenes?: types.ScriptScene[];
    items?: types.ItemUse[];
    chats?: types.Chat[];
    actions?: types.TransitionMap;
}
export const ActionArgs: {
    [key: string]: (input: unknown) => typia.IValidation;
} = {
    Give: (input: any): typia.IValidation<types.GiveArgs> => {
        const errors = [] as any[];
        const __is = (input: any, _exceptionable: boolean = true): input is types.GiveArgs => {
            const $join = (typia.createValidateEquals as any).join;
            const $io0 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.item && (undefined === input.qty || "number" === typeof input.qty) && (undefined === input.name || "string" === typeof input.name) && (undefined === input.lore || Array.isArray(input.lore) && 3 >= input.lore.length && input.lore.every((elem: any, _index1: number) => "string" === typeof elem)) && (undefined === input.enchantments || "object" === typeof input.enchantments && null !== input.enchantments && false === Array.isArray(input.enchantments) && $io1(input.enchantments, true && _exceptionable)) && Object.keys(input).every((key: any) => {
                if (["item", "qty", "name", "lore", "enchantments"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return false;
            });
            const $io1 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return "number" === typeof value;
                return false;
            });
            return "object" === typeof input && null !== input && $io0(input, true);
        };
        if (false === __is(input)) {
            const $report = (typia.createValidateEquals as any).report(errors);
            ((input: any, _path: string, _exceptionable: boolean = true): input is types.GiveArgs => {
                const $join = (typia.createValidateEquals as any).join;
                const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.item || $report(_exceptionable, {
                        path: _path + ".item",
                        expected: "string",
                        value: input.item
                    }), undefined === input.qty || "number" === typeof input.qty || $report(_exceptionable, {
                        path: _path + ".qty",
                        expected: "(number | undefined)",
                        value: input.qty
                    }), undefined === input.name || "string" === typeof input.name || $report(_exceptionable, {
                        path: _path + ".name",
                        expected: "(string | undefined)",
                        value: input.name
                    }), undefined === input.lore || (Array.isArray(input.lore) && (3 >= input.lore.length || $report(_exceptionable, {
                        path: _path + ".lore",
                        expected: "Array.length (@maxItems 3)",
                        value: input.lore
                    })) || $report(_exceptionable, {
                        path: _path + ".lore",
                        expected: "(Array<string> | undefined)",
                        value: input.lore
                    })) && input.lore.map((elem: any, _index1: number) => "string" === typeof elem || $report(_exceptionable, {
                        path: _path + ".lore[" + _index1 + "]",
                        expected: "string",
                        value: elem
                    })).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".lore",
                        expected: "(Array<string> | undefined)",
                        value: input.lore
                    }), undefined === input.enchantments || ("object" === typeof input.enchantments && null !== input.enchantments && false === Array.isArray(input.enchantments) || $report(_exceptionable, {
                        path: _path + ".enchantments",
                        expected: "(__type | undefined)",
                        value: input.enchantments
                    })) && $vo1(input.enchantments, _path + ".enchantments", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".enchantments",
                        expected: "(__type | undefined)",
                        value: input.enchantments
                    }), false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["item", "qty", "name", "lore", "enchantments"].some((prop: any) => key === prop))
                            return true;
                        const value = input[key];
                        if (undefined === value)
                            return true;
                        if (RegExp(/(.*)/).test(key))
                            return true;
                        return $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "undefined",
                            value: value
                        });
                    }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
                const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                        const value = input[key];
                        if (undefined === value)
                            return true;
                        if (RegExp(/(.*)/).test(key))
                            return "number" === typeof value || $report(_exceptionable, {
                                path: _path + $join(key),
                                expected: "number",
                                value: value
                            });
                        return $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "undefined",
                            value: value
                        });
                    }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
                return ("object" === typeof input && null !== input || $report(true, {
                    path: _path + "",
                    expected: "GiveArgs",
                    value: input
                })) && $vo0(input, _path + "", true) || $report(true, {
                    path: _path + "",
                    expected: "GiveArgs",
                    value: input
                });
            })(input, "$input", true);
        }
        const success = 0 === errors.length;
        return {
            success,
            errors,
            data: success ? input : undefined
        } as any;
    },
    Trade: (input: any): typia.IValidation<types.TraderArgs> => {
        const errors = [] as any[];
        const __is = (input: any, _exceptionable: boolean = true): input is types.TraderArgs => {
            const $join = (typia.createValidateEquals as any).join;
            const $io0 = (input: any, _exceptionable: boolean = true): boolean => Array.isArray(input.trades) && input.trades.every((elem: any, _index1: number) => "object" === typeof elem && null !== elem && $io1(elem, true && _exceptionable)) && (undefined === input.greeting || "string" === typeof input.greeting) && (undefined === input.noTrade || "string" === typeof input.noTrade) && (undefined === input.browseGreeting || "string" === typeof input.browseGreeting) && (undefined === input._browsing || "boolean" === typeof input._browsing) && Object.keys(input).every((key: any) => {
                if (["trades", "greeting", "noTrade", "browseGreeting", "_browsing"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return false;
            });
            const $io1 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.title || "string" === typeof input.title) && (undefined === input.icon || "string" === typeof input.icon) && (null !== input.gives && undefined !== input.gives && (Array.isArray(input.gives) && ("object" === typeof input.gives[0] && null !== input.gives[0] && $io2(input.gives[0], true && _exceptionable) && (Array.isArray(input.gives.slice(1)) && input.gives.slice(1).every((elem: any, _index2: number) => "object" === typeof elem && null !== elem && $io2(elem, true && _exceptionable)))) || "object" === typeof input.gives && null !== input.gives && $io2(input.gives, true && _exceptionable))) && (null !== input.accepts && undefined !== input.accepts && (Array.isArray(input.accepts) && input.accepts.every((elem: any, _index3: number) => Array.isArray(elem) && elem.every((elem: any, _index4: number) => "object" === typeof elem && null !== elem && $io2(elem, true && _exceptionable))) || "object" === typeof input.accepts && null !== input.accepts && $io2(input.accepts, true && _exceptionable))) && (undefined === input._browsing || "boolean" === typeof input._browsing) && true && Object.keys(input).every((key: any) => {
                if (["title", "icon", "gives", "accepts", "_browsing", "_traderArgs"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return true;
                return false;
            });
            const $io2 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.item && (undefined === input.qty || "number" === typeof input.qty) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
                if (["item", "qty"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                return false;
            }));
            return "object" === typeof input && null !== input && $io0(input, true);
        };
        if (false === __is(input)) {
            const $report = (typia.createValidateEquals as any).report(errors);
            ((input: any, _path: string, _exceptionable: boolean = true): input is types.TraderArgs => {
                const $join = (typia.createValidateEquals as any).join;
                const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(Array.isArray(input.trades) || $report(_exceptionable, {
                        path: _path + ".trades",
                        expected: "Array<TradeOffer>",
                        value: input.trades
                    })) && input.trades.map((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                        path: _path + ".trades[" + _index1 + "]",
                        expected: "TradeOffer",
                        value: elem
                    })) && $vo1(elem, _path + ".trades[" + _index1 + "]", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".trades[" + _index1 + "]",
                        expected: "TradeOffer",
                        value: elem
                    })).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".trades",
                        expected: "Array<TradeOffer>",
                        value: input.trades
                    }), undefined === input.greeting || "string" === typeof input.greeting || $report(_exceptionable, {
                        path: _path + ".greeting",
                        expected: "(string | undefined)",
                        value: input.greeting
                    }), undefined === input.noTrade || "string" === typeof input.noTrade || $report(_exceptionable, {
                        path: _path + ".noTrade",
                        expected: "(string | undefined)",
                        value: input.noTrade
                    }), undefined === input.browseGreeting || "string" === typeof input.browseGreeting || $report(_exceptionable, {
                        path: _path + ".browseGreeting",
                        expected: "(string | undefined)",
                        value: input.browseGreeting
                    }), undefined === input._browsing || "boolean" === typeof input._browsing || $report(_exceptionable, {
                        path: _path + "._browsing",
                        expected: "(boolean | undefined)",
                        value: input._browsing
                    }), false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["trades", "greeting", "noTrade", "browseGreeting", "_browsing"].some((prop: any) => key === prop))
                            return true;
                        const value = input[key];
                        if (undefined === value)
                            return true;
                        if (RegExp(/(.*)/).test(key))
                            return true;
                        return $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "undefined",
                            value: value
                        });
                    }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
                const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.title || "string" === typeof input.title || $report(_exceptionable, {
                        path: _path + ".title",
                        expected: "(string | undefined)",
                        value: input.title
                    }), undefined === input.icon || "string" === typeof input.icon || $report(_exceptionable, {
                        path: _path + ".icon",
                        expected: "(string | undefined)",
                        value: input.icon
                    }), (null !== input.gives || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeItem | [TradeItem, ...TradeItem[]])",
                        value: input.gives
                    })) && (undefined !== input.gives || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeItem | [TradeItem, ...TradeItem[]])",
                        value: input.gives
                    })) && (Array.isArray(input.gives) && ([
                        ("object" === typeof input.gives[0] && null !== input.gives[0] || $report(_exceptionable, {
                            path: _path + ".gives[0]",
                            expected: "TradeItem",
                            value: input.gives[0]
                        })) && $vo2(input.gives[0], _path + ".gives[0]", true && _exceptionable) || $report(_exceptionable, {
                            path: _path + ".gives[0]",
                            expected: "TradeItem",
                            value: input.gives[0]
                        })
                    ].every((flag: boolean) => flag) && ((Array.isArray(input.gives.slice(1)) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "...TradeItem",
                        value: input.gives.slice(1)
                    })) && input.gives.slice(1).map((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                        path: _path + ".gives[" + (1 + _index2) + "]",
                        expected: "TradeItem",
                        value: elem
                    })) && $vo2(elem, _path + ".gives[" + (1 + _index2) + "]", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".gives[" + (1 + _index2) + "]",
                        expected: "TradeItem",
                        value: elem
                    })).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "...TradeItem",
                        value: input.gives.slice(1)
                    }))) || "object" === typeof input.gives && null !== input.gives && $vo2(input.gives, _path + ".gives", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeItem | [TradeItem, ...TradeItem[]])",
                        value: input.gives
                    }) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeItem | [TradeItem, ...TradeItem[]])",
                        value: input.gives
                    })), (null !== input.accepts || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<Array<TradeItem>> | TradeItem)",
                        value: input.accepts
                    })) && (undefined !== input.accepts || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<Array<TradeItem>> | TradeItem)",
                        value: input.accepts
                    })) && (Array.isArray(input.accepts) && input.accepts.map((elem: any, _index3: number) => (Array.isArray(elem) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "]",
                        expected: "Array<TradeItem>",
                        value: elem
                    })) && elem.map((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "][" + _index4 + "]",
                        expected: "TradeItem",
                        value: elem
                    })) && $vo2(elem, _path + ".accepts[" + _index3 + "][" + _index4 + "]", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "][" + _index4 + "]",
                        expected: "TradeItem",
                        value: elem
                    })).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "]",
                        expected: "Array<TradeItem>",
                        value: elem
                    })).every((flag: boolean) => flag) || "object" === typeof input.accepts && null !== input.accepts && $vo2(input.accepts, _path + ".accepts", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<Array<TradeItem>> | TradeItem)",
                        value: input.accepts
                    }) || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<Array<TradeItem>> | TradeItem)",
                        value: input.accepts
                    })), undefined === input._browsing || "boolean" === typeof input._browsing || $report(_exceptionable, {
                        path: _path + "._browsing",
                        expected: "(boolean | undefined)",
                        value: input._browsing
                    }), true, false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["title", "icon", "gives", "accepts", "_browsing", "_traderArgs"].some((prop: any) => key === prop))
                            return true;
                        const value = input[key];
                        if (undefined === value)
                            return true;
                        if (RegExp(/(.*)/).test(key))
                            return true;
                        return $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "undefined",
                            value: value
                        });
                    }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
                const $vo2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.item || $report(_exceptionable, {
                        path: _path + ".item",
                        expected: "string",
                        value: input.item
                    }), undefined === input.qty || "number" === typeof input.qty || $report(_exceptionable, {
                        path: _path + ".qty",
                        expected: "(number | undefined)",
                        value: input.qty
                    }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["item", "qty"].some((prop: any) => key === prop))
                            return true;
                        const value = input[key];
                        if (undefined === value)
                            return true;
                        return $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "undefined",
                            value: value
                        });
                    }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
                return ("object" === typeof input && null !== input || $report(true, {
                    path: _path + "",
                    expected: "TraderArgs",
                    value: input
                })) && $vo0(input, _path + "", true) || $report(true, {
                    path: _path + "",
                    expected: "TraderArgs",
                    value: input
                });
            })(input, "$input", true);
        }
        const success = 0 === errors.length;
        return {
            success,
            errors,
            data: success ? input : undefined
        } as any;
    },
};
export const validateScript = (input: any): typia.IValidation<ScriptFile> => {
    const errors = [] as any[];
    const __is = (input: any, _exceptionable: boolean = true): input is ScriptFile => {
        const $join = (typia.createValidateEquals as any).join;
        const $io0 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any, _index1: number) => "object" === typeof elem && null !== elem && $iu0(elem, true && _exceptionable))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any, _index2: number) => "object" === typeof elem && null !== elem && $io4(elem, true && _exceptionable))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any, _index3: number) => "object" === typeof elem && null !== elem && $iu2(elem, true && _exceptionable))) && (undefined === input.chats || Array.isArray(input.chats) && input.chats.every((elem: any, _index4: number) => "object" === typeof elem && null !== elem && $iu3(elem, true && _exceptionable))) && (undefined === input.actions || "object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) && $io81(input.actions, true && _exceptionable)) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["actors", "scenes", "items", "chats", "actions"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io1 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.scene && (undefined === input.npc_name || "string" === typeof input.npc_name) && (undefined === input._hash || "string" === typeof input._hash) && (undefined === input._scene || "string" === typeof input._scene) && "string" === typeof input.tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["scene", "npc_name", "_hash", "_scene", "tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io2 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.scene && (undefined === input.npc_name || "string" === typeof input.npc_name) && (undefined === input._hash || "string" === typeof input._hash) && (undefined === input._scene || "string" === typeof input._scene) && "string" === typeof input.selector && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["scene", "npc_name", "_hash", "_scene", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io3 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.scene && (undefined === input.npc_name || "string" === typeof input.npc_name) && (undefined === input._hash || "string" === typeof input._hash) && (undefined === input._scene || "string" === typeof input._scene) && "string" === typeof input.name && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["scene", "npc_name", "_hash", "_scene", "name"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io4 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.npc_name || "string" === typeof input.npc_name) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any, _index5: number) => "object" === typeof elem && null !== elem && $iu1(elem, true && _exceptionable))) && (undefined === input._actor || "string" === typeof input._actor) && (3 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["id", "text", "npc_name", "buttons", "_actor"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io5 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io6 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io7 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return false;
        });
        const $io8 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io9 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io10 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.title && (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any, _index6: number) => "object" === typeof elem && null !== elem && $iu1(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["title", "body", "buttons"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io11 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io12 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag) && (undefined === input.then || "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && (undefined === input["else"] || "object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (undefined === input.if_has_item || "object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && (undefined === input.wait || "number" === typeof input.wait) && (undefined === input.sequence || Array.isArray(input.sequence) && input.sequence.every((elem: any, _index7: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.sound || "string" === typeof input.sound) && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (undefined === input.random || Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index8: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index9: number) => "number" === typeof elem)) && (undefined === input.apply_tag || "string" === typeof input.apply_tag) && (undefined === input.remove_tag || "string" === typeof input.remove_tag) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["scene", "action", "args", "command", "menu", "if_has_tag", "then", "else", "if_has_item", "wait", "sequence", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector", "random", "weights", "apply_tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io13 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.name || "string" === typeof input.name) && (undefined === input.lore || Array.isArray(input.lore) && input.lore.every((elem: any, _index10: number) => null === elem || "string" === typeof elem)) && (undefined === input.item_type || "string" === typeof input.item_type) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["name", "lore", "item_type"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io14 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io15 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io16 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index11: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io17 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io18 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index12: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index13: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io19 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io20 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io21 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io22 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io23 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io24 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io25 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io26 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io27 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io28 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index14: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io29 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io30 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index15: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index16: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io31 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io32 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io33 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io34 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io35 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io36 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io37 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io38 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io39 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io40 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index17: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io41 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io42 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index18: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index19: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io43 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io44 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io45 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index20: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io46 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index21: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io47 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index22: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io48 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index23: number) => null === elem || "string" === typeof elem)) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io49 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index24: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io50 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index25: number) => null === elem || "string" === typeof elem)) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io51 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index26: number) => null === elem || "string" === typeof elem)) && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io52 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index27: number) => null === elem || "string" === typeof elem)) && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index28: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io53 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index29: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io54 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index30: number) => null === elem || "string" === typeof elem)) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index31: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index32: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io55 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index33: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io56 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index34: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io57 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io58 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io59 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io60 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io61 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io62 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io63 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io64 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index35: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io65 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io66 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index36: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index37: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io67 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io68 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io69 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io70 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io71 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io72 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io73 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io74 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io75 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io76 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index38: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io77 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io78 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any, _index39: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem, true && _exceptionable))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index40: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io79 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io80 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io81 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "object" === typeof value && null !== value && false === Array.isArray(value) && $io12(value, true && _exceptionable);
            return false;
        });
        const $iu0 = (input: any, _exceptionable: boolean = true): any => (() => {
            if (undefined !== input.tag)
                return $io1(input, true && _exceptionable);
            if (undefined !== input.selector)
                return $io2(input, true && _exceptionable);
            if (undefined !== input.name)
                return $io3(input, true && _exceptionable);
            return false;
        })();
        const $iu1 = (input: any, _exceptionable: boolean = true): any => (() => {
            if (undefined !== input.scene)
                return $io5(input, true && _exceptionable);
            if (undefined !== input.action)
                return $io6(input, true && _exceptionable);
            if (undefined !== input.command)
                return $io8(input, true && _exceptionable);
            if (undefined !== input.menu)
                return $io9(input, true && _exceptionable);
            if (undefined !== input.if_has_tag)
                return $io11(input, true && _exceptionable);
            if (undefined !== input.if_has_item)
                return $io14(input, true && _exceptionable);
            if (undefined !== input.wait)
                return $io15(input, true && _exceptionable);
            if (undefined !== input.sequence)
                return $io16(input, true && _exceptionable);
            if (undefined !== input.sound)
                return $io17(input, true && _exceptionable);
            if (undefined !== input.random)
                return $io18(input, true && _exceptionable);
            if (undefined !== input.apply_tag)
                return $io19(input, true && _exceptionable);
            if (undefined !== input.remove_tag)
                return $io20(input, true && _exceptionable);
            return false;
        })();
        const $iu2 = (input: any, _exceptionable: boolean = true): any => (() => {
            if ($io21(input, false && _exceptionable))
                return $io21(input, true && _exceptionable);
            if ($io22(input, false && _exceptionable))
                return $io22(input, true && _exceptionable);
            if ($io23(input, false && _exceptionable))
                return $io23(input, true && _exceptionable);
            if ($io24(input, false && _exceptionable))
                return $io24(input, true && _exceptionable);
            if ($io25(input, false && _exceptionable))
                return $io25(input, true && _exceptionable);
            if ($io26(input, false && _exceptionable))
                return $io26(input, true && _exceptionable);
            if ($io27(input, false && _exceptionable))
                return $io27(input, true && _exceptionable);
            if ($io28(input, false && _exceptionable))
                return $io28(input, true && _exceptionable);
            if ($io29(input, false && _exceptionable))
                return $io29(input, true && _exceptionable);
            if ($io30(input, false && _exceptionable))
                return $io30(input, true && _exceptionable);
            if ($io31(input, false && _exceptionable))
                return $io31(input, true && _exceptionable);
            if ($io32(input, false && _exceptionable))
                return $io32(input, true && _exceptionable);
            if ($io33(input, false && _exceptionable))
                return $io33(input, true && _exceptionable);
            if ($io34(input, false && _exceptionable))
                return $io34(input, true && _exceptionable);
            if ($io35(input, false && _exceptionable))
                return $io35(input, true && _exceptionable);
            if ($io36(input, false && _exceptionable))
                return $io36(input, true && _exceptionable);
            if ($io37(input, false && _exceptionable))
                return $io37(input, true && _exceptionable);
            if ($io38(input, false && _exceptionable))
                return $io38(input, true && _exceptionable);
            if ($io39(input, false && _exceptionable))
                return $io39(input, true && _exceptionable);
            if ($io40(input, false && _exceptionable))
                return $io40(input, true && _exceptionable);
            if ($io41(input, false && _exceptionable))
                return $io41(input, true && _exceptionable);
            if ($io42(input, false && _exceptionable))
                return $io42(input, true && _exceptionable);
            if ($io43(input, false && _exceptionable))
                return $io43(input, true && _exceptionable);
            if ($io44(input, false && _exceptionable))
                return $io44(input, true && _exceptionable);
            if ($io45(input, false && _exceptionable))
                return $io45(input, true && _exceptionable);
            if ($io46(input, false && _exceptionable))
                return $io46(input, true && _exceptionable);
            if ($io47(input, false && _exceptionable))
                return $io47(input, true && _exceptionable);
            if ($io48(input, false && _exceptionable))
                return $io48(input, true && _exceptionable);
            if ($io49(input, false && _exceptionable))
                return $io49(input, true && _exceptionable);
            if ($io50(input, false && _exceptionable))
                return $io50(input, true && _exceptionable);
            if ($io51(input, false && _exceptionable))
                return $io51(input, true && _exceptionable);
            if ($io52(input, false && _exceptionable))
                return $io52(input, true && _exceptionable);
            if ($io53(input, false && _exceptionable))
                return $io53(input, true && _exceptionable);
            if ($io54(input, false && _exceptionable))
                return $io54(input, true && _exceptionable);
            if ($io55(input, false && _exceptionable))
                return $io55(input, true && _exceptionable);
            if ($io56(input, false && _exceptionable))
                return $io56(input, true && _exceptionable);
            if ($io57(input, false && _exceptionable))
                return $io57(input, true && _exceptionable);
            if ($io58(input, false && _exceptionable))
                return $io58(input, true && _exceptionable);
            if ($io59(input, false && _exceptionable))
                return $io59(input, true && _exceptionable);
            if ($io60(input, false && _exceptionable))
                return $io60(input, true && _exceptionable);
            if ($io61(input, false && _exceptionable))
                return $io61(input, true && _exceptionable);
            if ($io62(input, false && _exceptionable))
                return $io62(input, true && _exceptionable);
            if ($io63(input, false && _exceptionable))
                return $io63(input, true && _exceptionable);
            if ($io64(input, false && _exceptionable))
                return $io64(input, true && _exceptionable);
            if ($io65(input, false && _exceptionable))
                return $io65(input, true && _exceptionable);
            if ($io66(input, false && _exceptionable))
                return $io66(input, true && _exceptionable);
            if ($io67(input, false && _exceptionable))
                return $io67(input, true && _exceptionable);
            if ($io68(input, false && _exceptionable))
                return $io68(input, true && _exceptionable);
            return false;
        })();
        const $iu3 = (input: any, _exceptionable: boolean = true): any => (() => {
            if (undefined !== input.scene)
                return $io69(input, true && _exceptionable);
            if (undefined !== input.action)
                return $io70(input, true && _exceptionable);
            if (undefined !== input.command)
                return $io71(input, true && _exceptionable);
            if (undefined !== input.menu)
                return $io72(input, true && _exceptionable);
            if (undefined !== input.if_has_tag)
                return $io73(input, true && _exceptionable);
            if (undefined !== input.if_has_item)
                return $io74(input, true && _exceptionable);
            if (undefined !== input.wait)
                return $io75(input, true && _exceptionable);
            if (undefined !== input.sequence)
                return $io76(input, true && _exceptionable);
            if (undefined !== input.sound)
                return $io77(input, true && _exceptionable);
            if (undefined !== input.random)
                return $io78(input, true && _exceptionable);
            if (undefined !== input.apply_tag)
                return $io79(input, true && _exceptionable);
            if (undefined !== input.remove_tag)
                return $io80(input, true && _exceptionable);
            return false;
        })();
        return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input, true);
    };
    if (false === __is(input)) {
        const $report = (typia.createValidateEquals as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is ScriptFile => {
            const $join = (typia.createValidateEquals as any).join;
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.actors || (Array.isArray(input.actors) || $report(_exceptionable, {
                    path: _path + ".actors",
                    expected: "(Array<Actor> | undefined)",
                    value: input.actors
                })) && input.actors.map((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".actors[" + _index1 + "]",
                    expected: "({ scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & NameSelector | { scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & SelectorSelector | { scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & TagSelector)",
                    value: elem
                })) && $vu0(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".actors[" + _index1 + "]",
                    expected: "({ scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & NameSelector | { scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & SelectorSelector | { scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & TagSelector)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".actors",
                    expected: "(Array<Actor> | undefined)",
                    value: input.actors
                }), undefined === input.scenes || (Array.isArray(input.scenes) || $report(_exceptionable, {
                    path: _path + ".scenes",
                    expected: "(Array<ScriptScene> | undefined)",
                    value: input.scenes
                })) && input.scenes.map((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".scenes[" + _index2 + "]",
                    expected: "ScriptScene",
                    value: elem
                })) && $vo4(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".scenes[" + _index2 + "]",
                    expected: "ScriptScene",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".scenes",
                    expected: "(Array<ScriptScene> | undefined)",
                    value: input.scenes
                }), undefined === input.items || (Array.isArray(input.items) || $report(_exceptionable, {
                    path: _path + ".items",
                    expected: "(Array<ItemUse> | undefined)",
                    value: input.items
                })) && input.items.map((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".items[" + _index3 + "]",
                    expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".items[" + _index3 + "]",
                    expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".items",
                    expected: "(Array<ItemUse> | undefined)",
                    value: input.items
                }), undefined === input.chats || (Array.isArray(input.chats) || $report(_exceptionable, {
                    path: _path + ".chats",
                    expected: "(Array<Chat> | undefined)",
                    value: input.chats
                })) && input.chats.map((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".chats[" + _index4 + "]",
                    expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu3(elem, _path + ".chats[" + _index4 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".chats[" + _index4 + "]",
                    expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".chats",
                    expected: "(Array<Chat> | undefined)",
                    value: input.chats
                }), undefined === input.actions || ("object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) || $report(_exceptionable, {
                    path: _path + ".actions",
                    expected: "(TransitionMap | undefined)",
                    value: input.actions
                })) && $vo81(input.actions, _path + ".actions", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".actions",
                    expected: "(TransitionMap | undefined)",
                    value: input.actions
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["actors", "scenes", "items", "chats", "actions"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), undefined === input.npc_name || "string" === typeof input.npc_name || $report(_exceptionable, {
                    path: _path + ".npc_name",
                    expected: "(string | undefined)",
                    value: input.npc_name
                }), undefined === input._hash || "string" === typeof input._hash || $report(_exceptionable, {
                    path: _path + "._hash",
                    expected: "(string | undefined)",
                    value: input._hash
                }), undefined === input._scene || "string" === typeof input._scene || $report(_exceptionable, {
                    path: _path + "._scene",
                    expected: "(string | undefined)",
                    value: input._scene
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["scene", "npc_name", "_hash", "_scene", "tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), undefined === input.npc_name || "string" === typeof input.npc_name || $report(_exceptionable, {
                    path: _path + ".npc_name",
                    expected: "(string | undefined)",
                    value: input.npc_name
                }), undefined === input._hash || "string" === typeof input._hash || $report(_exceptionable, {
                    path: _path + "._hash",
                    expected: "(string | undefined)",
                    value: input._hash
                }), undefined === input._scene || "string" === typeof input._scene || $report(_exceptionable, {
                    path: _path + "._scene",
                    expected: "(string | undefined)",
                    value: input._scene
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["scene", "npc_name", "_hash", "_scene", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), undefined === input.npc_name || "string" === typeof input.npc_name || $report(_exceptionable, {
                    path: _path + ".npc_name",
                    expected: "(string | undefined)",
                    value: input.npc_name
                }), undefined === input._hash || "string" === typeof input._hash || $report(_exceptionable, {
                    path: _path + "._hash",
                    expected: "(string | undefined)",
                    value: input._hash
                }), undefined === input._scene || "string" === typeof input._scene || $report(_exceptionable, {
                    path: _path + "._scene",
                    expected: "(string | undefined)",
                    value: input._scene
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["scene", "npc_name", "_hash", "_scene", "name"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.id || $report(_exceptionable, {
                    path: _path + ".id",
                    expected: "string",
                    value: input.id
                }), "string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.npc_name || "string" === typeof input.npc_name || $report(_exceptionable, {
                    path: _path + ".npc_name",
                    expected: "(string | undefined)",
                    value: input.npc_name
                }), (Array.isArray(input.buttons) && (1 <= input.buttons.length || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array.length (@minItems 1)",
                    value: input.buttons
                })) && (6 >= input.buttons.length || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array.length (@maxItems 6)",
                    value: input.buttons
                })) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<Button>",
                    value: input.buttons
                })) && input.buttons.map((elem: any, _index5: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index5 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index5 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<Button>",
                    value: input.buttons
                }), undefined === input._actor || "string" === typeof input._actor || $report(_exceptionable, {
                    path: _path + "._actor",
                    expected: "(string | undefined)",
                    value: input._actor
                }), 3 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["id", "text", "npc_name", "buttons", "_actor"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "scene"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "action", "args"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    if (RegExp(/(.*)/).test(key))
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
            const $vo8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "command"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "menu"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo10 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.title || $report(_exceptionable, {
                    path: _path + ".title",
                    expected: "string",
                    value: input.title
                }), undefined === input.body || "string" === typeof input.body || $report(_exceptionable, {
                    path: _path + ".body",
                    expected: "(string | undefined)",
                    value: input.body
                }), (Array.isArray(input.buttons) && (1 <= input.buttons.length || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array.length (@minItems 1)",
                    value: input.buttons
                })) && (6 >= input.buttons.length || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array.length (@maxItems 6)",
                    value: input.buttons
                })) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<Button>",
                    value: input.buttons
                })) && input.buttons.map((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index6 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu1(elem, _path + ".buttons[" + _index6 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index6 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<Button>",
                    value: input.buttons
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["title", "body", "buttons"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo11 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.scene || "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "(string | undefined)",
                    value: input.scene
                }), undefined === input.action || "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "(string | undefined)",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), undefined === input.command || "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "(string | undefined)",
                    value: input.command
                }), undefined === input.menu || ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "(MenuDetails | undefined)",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "(MenuDetails | undefined)",
                    value: input.menu
                }), undefined === input.if_has_tag || "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "(string | undefined)",
                    value: input.if_has_tag
                }), undefined === input.then || ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                    value: input.then
                }), undefined === input["else"] || ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                    value: input["else"]
                }), undefined === input.if_has_item || ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "(Partial<NameSelector & LoreSelector & ItemTypeSelector> | undefined)",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "(Partial<NameSelector & LoreSelector & ItemTypeSelector> | undefined)",
                    value: input.if_has_item
                }), undefined === input.wait || "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "(number | undefined)",
                    value: input.wait
                }), undefined === input.sequence || (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index7: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index7 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index7 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index7 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                    value: input.sequence
                }), undefined === input.sound || "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "(string | undefined)",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), undefined === input.random || (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                    value: input.random
                })) && input.random.map((elem: any, _index8: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index8 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index8 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index8 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index9: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index9 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), undefined === input.apply_tag || "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "(string | undefined)",
                    value: input.apply_tag
                }), undefined === input.remove_tag || "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "(string | undefined)",
                    value: input.remove_tag
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["scene", "action", "args", "command", "menu", "if_has_tag", "then", "else", "if_has_item", "wait", "sequence", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector", "random", "weights", "apply_tag", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.name || "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "(string | undefined)",
                    value: input.name
                }), undefined === input.lore || (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "(Array<string | null> | undefined)",
                    value: input.lore
                })) && input.lore.map((elem: any, _index10: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index10 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "(Array<string | null> | undefined)",
                    value: input.lore
                }), undefined === input.item_type || "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "(string | undefined)",
                    value: input.item_type
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["name", "lore", "item_type"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "wait"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index11: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index11 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index11 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index11 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "sequence"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo17 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "string",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo18 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                })) && input.random.map((elem: any, _index12: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index12 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index12 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index12 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index13: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index13 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "random", "weights"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo19 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "apply_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo20 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["text", "require_tag", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo21 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "scene"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo22 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "action", "args"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo23 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "command"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo24 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "menu"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo25 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo26 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo27 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "wait"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo28 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index14: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index14 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index14 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index14 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "sequence"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo29 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "string",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo30 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                })) && input.random.map((elem: any, _index15: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index15 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index15 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index15 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index16: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index16 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "random", "weights"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo31 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "apply_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo32 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "tag", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo33 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "scene"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo34 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "action", "args"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo35 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "command"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo36 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "menu"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo37 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo38 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo39 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "wait"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo40 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index17: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index17 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index17 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index17 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "sequence"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo41 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "string",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo42 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                })) && input.random.map((elem: any, _index18: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index18 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index18 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index18 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index19: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index19 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "random", "weights"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo43 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "apply_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo44 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "name", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo45 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index20: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index20 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "scene"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo46 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index21: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index21 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "action", "args"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo47 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index22: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index22 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "command"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo48 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index23: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index23 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "menu"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo49 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index24: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index24 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo50 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index25: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index25 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo51 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index26: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index26 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "wait"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo52 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index27: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index27 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index28: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index28 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index28 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index28 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "sequence"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo53 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index29: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index29 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "string",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo54 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index30: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index30 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                })) && input.random.map((elem: any, _index31: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index31 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index31 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index31 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index32: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index32 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "random", "weights"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo55 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index33: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index33 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "apply_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo56 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index34: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index34 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "lore", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo57 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "scene"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo58 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "action", "args"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo59 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "command"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo60 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "menu"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo61 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo62 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo63 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "wait"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo64 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index35: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index35 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index35 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index35 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "sequence"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo65 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "string",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo66 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                })) && input.random.map((elem: any, _index36: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index36 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index36 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index36 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index37: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index37 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "random", "weights"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo67 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "apply_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo68 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "item_type", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo69 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "scene"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo70 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo7(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "action", "args"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo71 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "command"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo72 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo10(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "menu"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo73 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo74 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                })) && $vo12(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                })) && $vo12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo75 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "wait"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo76 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index38: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index38 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".sequence[" + _index38 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index38 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "sequence"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo77 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.sound || $report(_exceptionable, {
                    path: _path + ".sound",
                    expected: "string",
                    value: input.sound
                }), undefined === input.volume || "number" === typeof input.volume || $report(_exceptionable, {
                    path: _path + ".volume",
                    expected: "(number | undefined)",
                    value: input.volume
                }), undefined === input.pitch || "number" === typeof input.pitch || $report(_exceptionable, {
                    path: _path + ".pitch",
                    expected: "(number | undefined)",
                    value: input.pitch
                }), undefined === input.x || "number" === typeof input.x || $report(_exceptionable, {
                    path: _path + ".x",
                    expected: "(number | undefined)",
                    value: input.x
                }), undefined === input.y || "number" === typeof input.y || $report(_exceptionable, {
                    path: _path + ".y",
                    expected: "(number | undefined)",
                    value: input.y
                }), undefined === input.z || "number" === typeof input.z || $report(_exceptionable, {
                    path: _path + ".z",
                    expected: "(number | undefined)",
                    value: input.z
                }), undefined === input.dimension || "string" === typeof input.dimension || $report(_exceptionable, {
                    path: _path + ".dimension",
                    expected: "(string | undefined)",
                    value: input.dimension
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo78 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.random) && (2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array.length (@minItems 2)",
                    value: input.random
                })) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                })) && input.random.map((elem: any, _index39: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index39 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })) && $vo12(elem, _path + ".random[" + _index39 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index39 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index40: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index40 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "random", "weights"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo79 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "apply_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo80 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["equals", "require_tag", "remove_tag"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag))].every((flag: boolean) => flag);
            const $vo81 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    if (RegExp(/(.*)/).test(key))
                        return ("object" === typeof value && null !== value && false === Array.isArray(value) || $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                            value: value
                        })) && $vo12(value, _path + $join(key), true && _exceptionable) || $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                            value: value
                        });
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
            const $vu0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.tag)
                    return $vo1(input, _path, true && _exceptionable);
                if (undefined !== input.selector)
                    return $vo2(input, _path, true && _exceptionable);
                if (undefined !== input.name)
                    return $vo3(input, _path, true && _exceptionable);
                return $report(_exceptionable, {
                    path: _path,
                    expected: "({ scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & TagSelector | { scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & SelectorSelector | { scene: string; npc_name?: string | undefined; _hash?: string | undefined; _scene?: string | undefined; } & NameSelector)",
                    value: input
                });
            })();
            const $vu1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $vo5(input, _path, true && _exceptionable);
                if (undefined !== input.action)
                    return $vo6(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $vo8(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $vo9(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_tag)
                    return $vo11(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_item)
                    return $vo14(input, _path, true && _exceptionable);
                if (undefined !== input.wait)
                    return $vo15(input, _path, true && _exceptionable);
                if (undefined !== input.sequence)
                    return $vo16(input, _path, true && _exceptionable);
                if (undefined !== input.sound)
                    return $vo17(input, _path, true && _exceptionable);
                if (undefined !== input.random)
                    return $vo18(input, _path, true && _exceptionable);
                if (undefined !== input.apply_tag)
                    return $vo19(input, _path, true && _exceptionable);
                if (undefined !== input.remove_tag)
                    return $vo20(input, _path, true && _exceptionable);
                return $report(_exceptionable, {
                    path: _path,
                    expected: "({ text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Action | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & RemoveTag)",
                    value: input
                });
            })();
            const $vu2 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if ($vo21(input, _path, false && _exceptionable))
                    return $vo21(input, _path, true && _exceptionable);
                if ($vo22(input, _path, false && _exceptionable))
                    return $vo22(input, _path, true && _exceptionable);
                if ($vo23(input, _path, false && _exceptionable))
                    return $vo23(input, _path, true && _exceptionable);
                if ($vo24(input, _path, false && _exceptionable))
                    return $vo24(input, _path, true && _exceptionable);
                if ($vo25(input, _path, false && _exceptionable))
                    return $vo25(input, _path, true && _exceptionable);
                if ($vo26(input, _path, false && _exceptionable))
                    return $vo26(input, _path, true && _exceptionable);
                if ($vo27(input, _path, false && _exceptionable))
                    return $vo27(input, _path, true && _exceptionable);
                if ($vo28(input, _path, false && _exceptionable))
                    return $vo28(input, _path, true && _exceptionable);
                if ($vo29(input, _path, false && _exceptionable))
                    return $vo29(input, _path, true && _exceptionable);
                if ($vo30(input, _path, false && _exceptionable))
                    return $vo30(input, _path, true && _exceptionable);
                if ($vo31(input, _path, false && _exceptionable))
                    return $vo31(input, _path, true && _exceptionable);
                if ($vo32(input, _path, false && _exceptionable))
                    return $vo32(input, _path, true && _exceptionable);
                if ($vo33(input, _path, false && _exceptionable))
                    return $vo33(input, _path, true && _exceptionable);
                if ($vo34(input, _path, false && _exceptionable))
                    return $vo34(input, _path, true && _exceptionable);
                if ($vo35(input, _path, false && _exceptionable))
                    return $vo35(input, _path, true && _exceptionable);
                if ($vo36(input, _path, false && _exceptionable))
                    return $vo36(input, _path, true && _exceptionable);
                if ($vo37(input, _path, false && _exceptionable))
                    return $vo37(input, _path, true && _exceptionable);
                if ($vo38(input, _path, false && _exceptionable))
                    return $vo38(input, _path, true && _exceptionable);
                if ($vo39(input, _path, false && _exceptionable))
                    return $vo39(input, _path, true && _exceptionable);
                if ($vo40(input, _path, false && _exceptionable))
                    return $vo40(input, _path, true && _exceptionable);
                if ($vo41(input, _path, false && _exceptionable))
                    return $vo41(input, _path, true && _exceptionable);
                if ($vo42(input, _path, false && _exceptionable))
                    return $vo42(input, _path, true && _exceptionable);
                if ($vo43(input, _path, false && _exceptionable))
                    return $vo43(input, _path, true && _exceptionable);
                if ($vo44(input, _path, false && _exceptionable))
                    return $vo44(input, _path, true && _exceptionable);
                if ($vo45(input, _path, false && _exceptionable))
                    return $vo45(input, _path, true && _exceptionable);
                if ($vo46(input, _path, false && _exceptionable))
                    return $vo46(input, _path, true && _exceptionable);
                if ($vo47(input, _path, false && _exceptionable))
                    return $vo47(input, _path, true && _exceptionable);
                if ($vo48(input, _path, false && _exceptionable))
                    return $vo48(input, _path, true && _exceptionable);
                if ($vo49(input, _path, false && _exceptionable))
                    return $vo49(input, _path, true && _exceptionable);
                if ($vo50(input, _path, false && _exceptionable))
                    return $vo50(input, _path, true && _exceptionable);
                if ($vo51(input, _path, false && _exceptionable))
                    return $vo51(input, _path, true && _exceptionable);
                if ($vo52(input, _path, false && _exceptionable))
                    return $vo52(input, _path, true && _exceptionable);
                if ($vo53(input, _path, false && _exceptionable))
                    return $vo53(input, _path, true && _exceptionable);
                if ($vo54(input, _path, false && _exceptionable))
                    return $vo54(input, _path, true && _exceptionable);
                if ($vo55(input, _path, false && _exceptionable))
                    return $vo55(input, _path, true && _exceptionable);
                if ($vo56(input, _path, false && _exceptionable))
                    return $vo56(input, _path, true && _exceptionable);
                if ($vo57(input, _path, false && _exceptionable))
                    return $vo57(input, _path, true && _exceptionable);
                if ($vo58(input, _path, false && _exceptionable))
                    return $vo58(input, _path, true && _exceptionable);
                if ($vo59(input, _path, false && _exceptionable))
                    return $vo59(input, _path, true && _exceptionable);
                if ($vo60(input, _path, false && _exceptionable))
                    return $vo60(input, _path, true && _exceptionable);
                if ($vo61(input, _path, false && _exceptionable))
                    return $vo61(input, _path, true && _exceptionable);
                if ($vo62(input, _path, false && _exceptionable))
                    return $vo62(input, _path, true && _exceptionable);
                if ($vo63(input, _path, false && _exceptionable))
                    return $vo63(input, _path, true && _exceptionable);
                if ($vo64(input, _path, false && _exceptionable))
                    return $vo64(input, _path, true && _exceptionable);
                if ($vo65(input, _path, false && _exceptionable))
                    return $vo65(input, _path, true && _exceptionable);
                if ($vo66(input, _path, false && _exceptionable))
                    return $vo66(input, _path, true && _exceptionable);
                if ($vo67(input, _path, false && _exceptionable))
                    return $vo67(input, _path, true && _exceptionable);
                if ($vo68(input, _path, false && _exceptionable))
                    return $vo68(input, _path, true && _exceptionable);
                return $report(_exceptionable, {
                    path: _path,
                    expected: "(RequireTag & TagSelector & Scene | RequireTag & TagSelector & Action | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & Wait | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Random | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Action | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & Wait | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Random | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & RemoveTag)",
                    value: input
                });
            })();
            const $vu3 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $vo69(input, _path, true && _exceptionable);
                if (undefined !== input.action)
                    return $vo70(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $vo71(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $vo72(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_tag)
                    return $vo73(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_item)
                    return $vo74(input, _path, true && _exceptionable);
                if (undefined !== input.wait)
                    return $vo75(input, _path, true && _exceptionable);
                if (undefined !== input.sequence)
                    return $vo76(input, _path, true && _exceptionable);
                if (undefined !== input.sound)
                    return $vo77(input, _path, true && _exceptionable);
                if (undefined !== input.random)
                    return $vo78(input, _path, true && _exceptionable);
                if (undefined !== input.apply_tag)
                    return $vo79(input, _path, true && _exceptionable);
                if (undefined !== input.remove_tag)
                    return $vo80(input, _path, true && _exceptionable);
                return $report(_exceptionable, {
                    path: _path,
                    expected: "({ equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & RemoveTag)",
                    value: input
                });
            })();
            return ("object" === typeof input && null !== input && false === Array.isArray(input) || $report(true, {
                path: _path + "",
                expected: "ScriptFile",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "ScriptFile",
                value: input
            });
        })(input, "$input", true);
    }
    const success = 0 === errors.length;
    return {
        success,
        errors,
        data: success ? input : undefined
    } as any;
};
