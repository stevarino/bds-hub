import typia, { tags } from "typia";
import * as types from "../behavior_pack/src/types/packTypes.js";
export * from '../behavior_pack/src/types/packTypes.js';
export interface IndexedFields {
    [index: (string & tags.Pattern<'^[0-9]+$'>)]: string;
}
;
export interface Variables {
    flags?: IndexedFields;
    bools?: IndexedFields;
    bytes?: IndexedFields;
    u32?: IndexedFields;
}
;
export interface ScriptFile {
    actors?: types.Actor[];
    scenes?: types.SavedScene[];
    items?: types.ItemUse[];
    chats?: types.Chat[];
    actions?: types.TransitionMap;
    variables?: {
        player?: Variables;
        npc?: Variables;
        global?: Variables;
    };
}
;
export const ActionArgs: {
    [key: string]: (input: unknown) => typia.IValidation;
} = {
    Give: (input: any): typia.IValidation<types.GiveArgs> => {
        const errors = [] as any[];
        const __is = (input: any, _exceptionable: boolean = true): input is types.GiveArgs => {
            const $join = (typia.createValidateEquals as any).join;
            const $io0 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.item && (undefined === input.qty || "number" === typeof input.qty) && (undefined === input.name || "string" === typeof input.name) && (undefined === input.lore || Array.isArray(input.lore) && (input.lore.length <= 3 && input.lore.every((elem: any, _index1: number) => "string" === typeof elem))) && (undefined === input.enchantments || "object" === typeof input.enchantments && null !== input.enchantments && false === Array.isArray(input.enchantments) && $io1(input.enchantments, true && _exceptionable)) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
                if (["item", "qty", "name", "lore", "enchantments"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                return false;
            }));
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
                    }), undefined === input.lore || (Array.isArray(input.lore) || $report(_exceptionable, {
                        path: _path + ".lore",
                        expected: "((Array<string> & MaxItems<3>) | undefined)",
                        value: input.lore
                    })) && ((input.lore.length <= 3 || $report(_exceptionable, {
                        path: _path + ".lore",
                        expected: "Array<> & MaxItems<3>",
                        value: input.lore
                    })) && input.lore.map((elem: any, _index1: number) => "string" === typeof elem || $report(_exceptionable, {
                        path: _path + ".lore[" + _index1 + "]",
                        expected: "string",
                        value: elem
                    })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                        path: _path + ".lore",
                        expected: "((Array<string> & MaxItems<3>) | undefined)",
                        value: input.lore
                    }), undefined === input.enchantments || ("object" === typeof input.enchantments && null !== input.enchantments && false === Array.isArray(input.enchantments) || $report(_exceptionable, {
                        path: _path + ".enchantments",
                        expected: "(__type | undefined)",
                        value: input.enchantments
                    })) && $vo1(input.enchantments, _path + ".enchantments", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".enchantments",
                        expected: "(__type | undefined)",
                        value: input.enchantments
                    }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["item", "qty", "name", "lore", "enchantments"].some((prop: any) => key === prop))
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
    Trader: (input: any): typia.IValidation<types.TraderArgs> => {
        const errors = [] as any[];
        const __is = (input: any, _exceptionable: boolean = true): input is types.TraderArgs => {
            const $io0 = (input: any, _exceptionable: boolean = true): boolean => Array.isArray(input.trades) && input.trades.every((elem: any, _index1: number) => "object" === typeof elem && null !== elem && $io1(elem, true && _exceptionable)) && (undefined === input.greeting || "string" === typeof input.greeting) && (undefined === input.noTrade || "string" === typeof input.noTrade) && (undefined === input.browseGreeting || "string" === typeof input.browseGreeting) && (undefined === input._browsing || "boolean" === typeof input._browsing) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
                if (["trades", "greeting", "noTrade", "browseGreeting", "_browsing"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                return false;
            }));
            const $io1 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.title || "string" === typeof input.title) && (undefined === input.icon || "string" === typeof input.icon) && (null !== input.gives && undefined !== input.gives && ("string" === typeof input.gives || Array.isArray(input.gives) && (null !== input.gives[0] && undefined !== input.gives[0] && ("string" === typeof input.gives[0] || "object" === typeof input.gives[0] && null !== input.gives[0] && $io2(input.gives[0], true && _exceptionable)) && (Array.isArray(input.gives.slice(1)) && input.gives.slice(1).every((elem: any, _index2: number) => null !== elem && undefined !== elem && ("string" === typeof elem || "object" === typeof elem && null !== elem && $io2(elem, true && _exceptionable))))))) && (null !== input.accepts && undefined !== input.accepts && ("string" === typeof input.accepts || Array.isArray(input.accepts) && input.accepts.every((elem: any, _index3: number) => Array.isArray(elem) && (null !== elem[0] && undefined !== elem[0] && ("string" === typeof elem[0] || "object" === typeof elem[0] && null !== elem[0] && $io2(elem[0], true && _exceptionable)) && (Array.isArray(elem.slice(1)) && elem.slice(1).every((elem: any, _index4: number) => null !== elem && undefined !== elem && ("string" === typeof elem || "object" === typeof elem && null !== elem && $io2(elem, true && _exceptionable)))))))) && (undefined === input._browsing || "boolean" === typeof input._browsing) && true && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
                if (["title", "icon", "gives", "accepts", "_browsing", "_traderArgs"].some((prop: any) => key === prop))
                    return true;
                const value = input[key];
                if (undefined === value)
                    return true;
                return false;
            }));
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
                    }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["trades", "greeting", "noTrade", "browseGreeting", "_browsing"].some((prop: any) => key === prop))
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
                        expected: "(TradeArray | string)",
                        value: input.gives
                    })) && (undefined !== input.gives || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeArray | string)",
                        value: input.gives
                    })) && ("string" === typeof input.gives || (Array.isArray(input.gives) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeArray | string)",
                        value: input.gives
                    })) && ([
                        (null !== input.gives[0] || $report(_exceptionable, {
                            path: _path + ".gives[0]",
                            expected: "(TradeItem | string)",
                            value: input.gives[0]
                        })) && (undefined !== input.gives[0] || $report(_exceptionable, {
                            path: _path + ".gives[0]",
                            expected: "(TradeItem | string)",
                            value: input.gives[0]
                        })) && ("string" === typeof input.gives[0] || ("object" === typeof input.gives[0] && null !== input.gives[0] || $report(_exceptionable, {
                            path: _path + ".gives[0]",
                            expected: "(TradeItem | string)",
                            value: input.gives[0]
                        })) && $vo2(input.gives[0], _path + ".gives[0]", true && _exceptionable) || $report(_exceptionable, {
                            path: _path + ".gives[0]",
                            expected: "(TradeItem | string)",
                            value: input.gives[0]
                        }))
                    ].every((flag: boolean) => flag) && ((Array.isArray(input.gives.slice(1)) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "...(TradeItem | string)",
                        value: input.gives.slice(1)
                    })) && input.gives.slice(1).map((elem: any, _index2: number) => (null !== elem || $report(_exceptionable, {
                        path: _path + ".gives[" + (1 + _index2) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    })) && (undefined !== elem || $report(_exceptionable, {
                        path: _path + ".gives[" + (1 + _index2) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    })) && ("string" === typeof elem || ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                        path: _path + ".gives[" + (1 + _index2) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    })) && $vo2(elem, _path + ".gives[" + (1 + _index2) + "]", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".gives[" + (1 + _index2) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    }))).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "...(TradeItem | string)",
                        value: input.gives.slice(1)
                    }))) || $report(_exceptionable, {
                        path: _path + ".gives",
                        expected: "(TradeArray | string)",
                        value: input.gives
                    })), (null !== input.accepts || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<TradeArray> | string)",
                        value: input.accepts
                    })) && (undefined !== input.accepts || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<TradeArray> | string)",
                        value: input.accepts
                    })) && ("string" === typeof input.accepts || (Array.isArray(input.accepts) || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<TradeArray> | string)",
                        value: input.accepts
                    })) && input.accepts.map((elem: any, _index3: number) => (Array.isArray(elem) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "]",
                        expected: "TradeArray",
                        value: elem
                    })) && ([
                        (null !== elem[0] || $report(_exceptionable, {
                            path: _path + ".accepts[" + _index3 + "][0]",
                            expected: "(TradeItem | string)",
                            value: elem[0]
                        })) && (undefined !== elem[0] || $report(_exceptionable, {
                            path: _path + ".accepts[" + _index3 + "][0]",
                            expected: "(TradeItem | string)",
                            value: elem[0]
                        })) && ("string" === typeof elem[0] || ("object" === typeof elem[0] && null !== elem[0] || $report(_exceptionable, {
                            path: _path + ".accepts[" + _index3 + "][0]",
                            expected: "(TradeItem | string)",
                            value: elem[0]
                        })) && $vo2(elem[0], _path + ".accepts[" + _index3 + "][0]", true && _exceptionable) || $report(_exceptionable, {
                            path: _path + ".accepts[" + _index3 + "][0]",
                            expected: "(TradeItem | string)",
                            value: elem[0]
                        }))
                    ].every((flag: boolean) => flag) && ((Array.isArray(elem.slice(1)) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "]",
                        expected: "...(TradeItem | string)",
                        value: elem.slice(1)
                    })) && elem.slice(1).map((elem: any, _index4: number) => (null !== elem || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "][" + (1 + _index4) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    })) && (undefined !== elem || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "][" + (1 + _index4) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    })) && ("string" === typeof elem || ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "][" + (1 + _index4) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    })) && $vo2(elem, _path + ".accepts[" + _index3 + "][" + (1 + _index4) + "]", true && _exceptionable) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "][" + (1 + _index4) + "]",
                        expected: "(TradeItem | string)",
                        value: elem
                    }))).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "]",
                        expected: "...(TradeItem | string)",
                        value: elem.slice(1)
                    }))) || $report(_exceptionable, {
                        path: _path + ".accepts[" + _index3 + "]",
                        expected: "TradeArray",
                        value: elem
                    })).every((flag: boolean) => flag) || $report(_exceptionable, {
                        path: _path + ".accepts",
                        expected: "(Array<TradeArray> | string)",
                        value: input.accepts
                    })), undefined === input._browsing || "boolean" === typeof input._browsing || $report(_exceptionable, {
                        path: _path + "._browsing",
                        expected: "(boolean | undefined)",
                        value: input._browsing
                    }), true, 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                        if (["title", "icon", "gives", "accepts", "_browsing", "_traderArgs"].some((prop: any) => key === prop))
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
        const $io0 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any, _index1: number) => "object" === typeof elem && null !== elem && $io1(elem, true && _exceptionable))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any, _index2: number) => "object" === typeof elem && null !== elem && $io41(elem, true && _exceptionable))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any, _index3: number) => "object" === typeof elem && null !== elem && $iu2(elem, true && _exceptionable))) && (undefined === input.chats || Array.isArray(input.chats) && input.chats.every((elem: any, _index4: number) => "object" === typeof elem && null !== elem && $iu3(elem, true && _exceptionable))) && (undefined === input.actions || "object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) && $io114(input.actions, true && _exceptionable)) && (undefined === input.variables || "object" === typeof input.variables && null !== input.variables && false === Array.isArray(input.variables) && $io115(input.variables, true && _exceptionable)) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["actors", "scenes", "items", "chats", "actions", "variables"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io1 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && "string" === typeof input.name && (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.scale || 25 === input.scale || 50 === input.scale || 75 === input.scale || 100 === input.scale || 125 === input.scale || 150 === input.scale) && (undefined === input.entityId || "string" === typeof input.entityId) && (undefined === input.skin || "string" === typeof input.skin) && (undefined === input.roles || Array.isArray(input.roles) && input.roles.every((elem: any, _index5: number) => "string" === typeof elem)) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag) && (undefined === input.then || "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && (undefined === input["else"] || "object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (undefined === input.if_has_item || "object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && (undefined === input.wait || "number" === typeof input.wait) && (undefined === input.sequence || Array.isArray(input.sequence) && input.sequence.every((elem: any, _index6: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (undefined === input.sound || "string" === typeof input.sound) && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (undefined === input.random || Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index7: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index8: number) => "number" === typeof elem)) && (undefined === input.apply_tag || "string" === typeof input.apply_tag) && (undefined === input.remove_tag || "string" === typeof input.remove_tag) && (undefined === input.variable || "string" === typeof input.variable) && (null !== input.value && (undefined === input.value || "string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["id", "name", "scene", "scale", "entityId", "skin", "roles", "action", "args", "command", "menu", "if_has_tag", "then", "else", "if_has_item", "wait", "sequence", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector", "random", "weights", "apply_tag", "remove_tag", "variable", "value"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io2 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return false;
        });
        const $io3 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.title && (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && (1 <= input.buttons.length && input.buttons.length <= 6 && input.buttons.every((elem: any, _index9: number) => "object" === typeof elem && null !== elem && $iu0(elem, true && _exceptionable)))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["title", "body", "buttons"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io4 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io5 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io6 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io7 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io8 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io9 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag) && (undefined === input.then || "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && (undefined === input["else"] || "object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (undefined === input.if_has_item || "object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && (undefined === input.wait || "number" === typeof input.wait) && (undefined === input.sequence || Array.isArray(input.sequence) && input.sequence.every((elem: any, _index10: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (undefined === input.sound || "string" === typeof input.sound) && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (undefined === input.random || Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index11: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index12: number) => "number" === typeof elem)) && (undefined === input.apply_tag || "string" === typeof input.apply_tag) && (undefined === input.remove_tag || "string" === typeof input.remove_tag) && (undefined === input.variable || "string" === typeof input.variable) && (null !== input.value && (undefined === input.value || "string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable))) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["scene", "action", "args", "command", "menu", "if_has_tag", "then", "else", "if_has_item", "wait", "sequence", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector", "random", "weights", "apply_tag", "remove_tag", "variable", "value"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io10 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.tag || "string" === typeof input.tag) && (undefined === input.name || "string" === typeof input.name) && (undefined === input.selector || "string" === typeof input.selector) && (undefined === input.lore || Array.isArray(input.lore) && input.lore.every((elem: any, _index13: number) => null === elem || "string" === typeof elem)) && (undefined === input.item_type || "string" === typeof input.item_type) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["tag", "name", "selector", "lore", "item_type"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io11 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.variable && (null !== input.value && (undefined === input.value || "string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable))) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["variable", "value"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io12 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.greater_than && undefined !== input.greater_than && ("string" === typeof input.greater_than || "number" === typeof input.greater_than || "object" === typeof input.greater_than && null !== input.greater_than && $iu1(input.greater_than, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "greater_than"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io13 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.less_than && undefined !== input.less_than && ("string" === typeof input.less_than || "number" === typeof input.less_than || "object" === typeof input.less_than && null !== input.less_than && $iu1(input.less_than, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "less_than"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io14 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.equals && undefined !== input.equals && ("string" === typeof input.equals || "number" === typeof input.equals || "object" === typeof input.equals && null !== input.equals && $iu1(input.equals, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "equals"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io15 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.strict_equals && undefined !== input.strict_equals && ("string" === typeof input.strict_equals || "number" === typeof input.strict_equals || "object" === typeof input.strict_equals && null !== input.strict_equals && $iu1(input.strict_equals, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "strict_equals"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io16 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.not_equals && undefined !== input.not_equals && ("string" === typeof input.not_equals || "number" === typeof input.not_equals || "object" === typeof input.not_equals && null !== input.not_equals && $iu1(input.not_equals, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "not_equals"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io17 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.strict_not_equals && undefined !== input.strict_not_equals && ("string" === typeof input.strict_not_equals || "number" === typeof input.strict_not_equals || "object" === typeof input.strict_not_equals && null !== input.strict_not_equals && $iu1(input.strict_not_equals, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "strict_not_equals"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io18 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.add && undefined !== input.add && ("string" === typeof input.add || "number" === typeof input.add || "object" === typeof input.add && null !== input.add && $iu1(input.add, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "add"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io19 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.subtract && undefined !== input.subtract && ("string" === typeof input.subtract || "number" === typeof input.subtract || "object" === typeof input.subtract && null !== input.subtract && $iu1(input.subtract, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "subtract"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io20 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.multiply && undefined !== input.multiply && ("string" === typeof input.multiply || "number" === typeof input.multiply || "object" === typeof input.multiply && null !== input.multiply && $iu1(input.multiply, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "multiply"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io21 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.divide && undefined !== input.divide && ("string" === typeof input.divide || "number" === typeof input.divide || "object" === typeof input.divide && null !== input.divide && $iu1(input.divide, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "divide"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io22 = (input: any, _exceptionable: boolean = true): boolean => null !== input.value && undefined !== input.value && ("string" === typeof input.value || "number" === typeof input.value || "object" === typeof input.value && null !== input.value && $iu1(input.value, true && _exceptionable)) && (null !== input.modulo && undefined !== input.modulo && ("string" === typeof input.modulo || "number" === typeof input.modulo || "object" === typeof input.modulo && null !== input.modulo && $iu1(input.modulo, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["value", "modulo"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io23 = (input: any, _exceptionable: boolean = true): boolean => "object" === typeof input.random && null !== input.random && $io24(input.random, true && _exceptionable) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["random"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io24 = (input: any, _exceptionable: boolean = true): boolean => null !== input.min && (undefined === input.min || "string" === typeof input.min || "number" === typeof input.min || "object" === typeof input.min && null !== input.min && $iu1(input.min, true && _exceptionable)) && (null !== input.max && undefined !== input.max && ("string" === typeof input.max || "number" === typeof input.max || "object" === typeof input.max && null !== input.max && $iu1(input.max, true && _exceptionable))) && (undefined === input.step || "number" === typeof input.step) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["min", "max", "step"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io25 = (input: any, _exceptionable: boolean = true): boolean => Array.isArray(input.and) && input.and.every((elem: any, _index14: number) => null !== elem && undefined !== elem && ("string" === typeof elem || "number" === typeof elem || "object" === typeof elem && null !== elem && $iu1(elem, true && _exceptionable))) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["and"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io26 = (input: any, _exceptionable: boolean = true): boolean => Array.isArray(input.or) && input.or.every((elem: any, _index15: number) => null !== elem && undefined !== elem && ("string" === typeof elem || "number" === typeof elem || "object" === typeof elem && null !== elem && $iu1(elem, true && _exceptionable))) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["or"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io27 = (input: any, _exceptionable: boolean = true): boolean => null !== input.not && undefined !== input.not && ("string" === typeof input.not || "number" === typeof input.not || "object" === typeof input.not && null !== input.not && $iu1(input.not, true && _exceptionable)) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["not"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io28 = (input: any, _exceptionable: boolean = true): boolean => null !== input.is_null && undefined !== input.is_null && ("string" === typeof input.is_null || "number" === typeof input.is_null || "object" === typeof input.is_null && null !== input.is_null && $iu1(input.is_null, true && _exceptionable)) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["is_null"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io29 = (input: any, _exceptionable: boolean = true): boolean => null !== input.not_null && undefined !== input.not_null && ("string" === typeof input.not_null || "number" === typeof input.not_null || "object" === typeof input.not_null && null !== input.not_null && $iu1(input.not_null, true && _exceptionable)) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["not_null"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io30 = (input: any, _exceptionable: boolean = true): boolean => "object" === typeof input.player_has_item && null !== input.player_has_item && false === Array.isArray(input.player_has_item) && $io10(input.player_has_item, true && _exceptionable) && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["player_has_item"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io31 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.player_has_tag && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["player_has_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io32 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.npc_has_tag && (1 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["npc_has_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io33 = (input: any, _exceptionable: boolean = true): boolean => null !== input["if"] && undefined !== input["if"] && ("string" === typeof input["if"] || "number" === typeof input["if"] || "object" === typeof input["if"] && null !== input["if"] && $iu1(input["if"], true && _exceptionable)) && (null !== input.then && undefined !== input.then && ("string" === typeof input.then || "number" === typeof input.then || "object" === typeof input.then && null !== input.then && $iu1(input.then, true && _exceptionable))) && (null !== input["else"] && undefined !== input["else"] && ("string" === typeof input["else"] || "number" === typeof input["else"] || "object" === typeof input["else"] && null !== input["else"] && $iu1(input["else"], true && _exceptionable))) && (3 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["if", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io34 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io35 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io36 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index16: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io37 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io38 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index17: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index18: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io39 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io40 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["text", "require_tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io41 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.id && "string" === typeof input.text && (Array.isArray(input.buttons) && input.buttons.every((elem: any, _index19: number) => "object" === typeof elem && null !== elem && $iu0(elem, true && _exceptionable))) && (undefined === input.npc_name || "string" === typeof input.npc_name) && (undefined === input.is_dummy || "boolean" === typeof input.is_dummy) && (3 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["id", "text", "buttons", "npc_name", "is_dummy"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io42 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io43 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io44 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io45 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io46 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io47 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io48 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io49 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index20: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io50 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io51 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index21: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index22: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io52 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io53 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io54 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io55 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io56 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io57 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io58 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io59 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io60 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io61 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index23: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io62 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io63 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index24: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index25: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io64 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io65 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "name", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io66 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io67 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io68 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io69 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io70 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io71 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io72 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io73 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index26: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io74 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "sound", "volume", "pitch", "x", "y", "z", "dimension"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io75 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index27: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index28: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io76 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io77 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.selector && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "selector", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io78 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index29: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io79 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index30: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io80 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index31: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io81 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index32: number) => null === elem || "string" === typeof elem)) && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io82 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index33: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io83 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index34: number) => null === elem || "string" === typeof elem)) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io84 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index35: number) => null === elem || "string" === typeof elem)) && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io85 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index36: number) => null === elem || "string" === typeof elem)) && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index37: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io86 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index38: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io87 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index39: number) => null === elem || "string" === typeof elem)) && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index40: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index41: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io88 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index42: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io89 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any, _index43: number) => null === elem || "string" === typeof elem)) && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "lore", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io90 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io91 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io92 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io93 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io94 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io95 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io96 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io97 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index44: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io98 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io99 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index45: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index46: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io100 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io101 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["require_tag", "item_type", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io102 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "scene"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io103 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io2(input.args, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "action", "args"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io104 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "command"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io105 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io3(input.menu, true && _exceptionable)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "menu"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io106 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io107 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io10(input.if_has_item, true && _exceptionable)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io9(input.then, true && _exceptionable)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io9(input["else"], true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "if_has_item", "then", "else"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io108 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "wait"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io109 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any, _index47: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable))) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "sequence"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io110 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.x || "number" === typeof input.x) && (undefined === input.y || "number" === typeof input.y) && (undefined === input.z || "number" === typeof input.z) && (undefined === input.dimension || "string" === typeof input.dimension) && (undefined === input.selector || "string" === typeof input.selector) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io111 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && (2 <= input.random.length && input.random.every((elem: any, _index48: number) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io9(elem, true && _exceptionable)))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any, _index49: number) => "number" === typeof elem)) && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "random", "weights"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io112 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "apply_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io113 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag && (2 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["equals", "require_tag", "remove_tag"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io114 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "object" === typeof value && null !== value && false === Array.isArray(value) && $io9(value, true && _exceptionable);
            return false;
        });
        const $io115 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.player || "object" === typeof input.player && null !== input.player && false === Array.isArray(input.player) && $io116(input.player, true && _exceptionable)) && (undefined === input.npc || "object" === typeof input.npc && null !== input.npc && false === Array.isArray(input.npc) && $io116(input.npc, true && _exceptionable)) && (undefined === input.global || "object" === typeof input.global && null !== input.global && false === Array.isArray(input.global) && $io116(input.global, true && _exceptionable)) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["player", "npc", "global"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io116 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.flags || "object" === typeof input.flags && null !== input.flags && false === Array.isArray(input.flags) && $io117(input.flags, true && _exceptionable)) && (undefined === input.bools || "object" === typeof input.bools && null !== input.bools && false === Array.isArray(input.bools) && $io117(input.bools, true && _exceptionable)) && (undefined === input.bytes || "object" === typeof input.bytes && null !== input.bytes && false === Array.isArray(input.bytes) && $io117(input.bytes, true && _exceptionable)) && (undefined === input.u32 || "object" === typeof input.u32 && null !== input.u32 && false === Array.isArray(input.u32) && $io117(input.u32, true && _exceptionable)) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["flags", "bools", "bytes", "u32"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io117 = (input: any, _exceptionable: boolean = true): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "string" === typeof value;
            return false;
        });
        const $iu0 = (input: any, _exceptionable: boolean = true): any => (() => {
            if (undefined !== input.scene)
                return $io4(input, true && _exceptionable);
            else if (undefined !== input.action)
                return $io5(input, true && _exceptionable);
            else if (undefined !== input.command)
                return $io6(input, true && _exceptionable);
            else if (undefined !== input.menu)
                return $io7(input, true && _exceptionable);
            else if (undefined !== input.if_has_tag)
                return $io8(input, true && _exceptionable);
            else if (undefined !== input.if_has_item)
                return $io34(input, true && _exceptionable);
            else if (undefined !== input.wait)
                return $io35(input, true && _exceptionable);
            else if (undefined !== input.sequence)
                return $io36(input, true && _exceptionable);
            else if (undefined !== input.sound)
                return $io37(input, true && _exceptionable);
            else if (undefined !== input.random)
                return $io38(input, true && _exceptionable);
            else if (undefined !== input.apply_tag)
                return $io39(input, true && _exceptionable);
            else if (undefined !== input.remove_tag)
                return $io40(input, true && _exceptionable);
            else
                return false;
        })();
        const $iu1 = (input: any, _exceptionable: boolean = true): any => (() => {
            if (undefined !== input.variable)
                return $io11(input, true && _exceptionable);
            else if (undefined !== input.greater_than)
                return $io12(input, true && _exceptionable);
            else if (undefined !== input.less_than)
                return $io13(input, true && _exceptionable);
            else if (undefined !== input.equals)
                return $io14(input, true && _exceptionable);
            else if (undefined !== input.strict_equals)
                return $io15(input, true && _exceptionable);
            else if (undefined !== input.not_equals)
                return $io16(input, true && _exceptionable);
            else if (undefined !== input.strict_not_equals)
                return $io17(input, true && _exceptionable);
            else if (undefined !== input.add)
                return $io18(input, true && _exceptionable);
            else if (undefined !== input.subtract)
                return $io19(input, true && _exceptionable);
            else if (undefined !== input.multiply)
                return $io20(input, true && _exceptionable);
            else if (undefined !== input.divide)
                return $io21(input, true && _exceptionable);
            else if (undefined !== input.modulo)
                return $io22(input, true && _exceptionable);
            else if (undefined !== input.random)
                return $io23(input, true && _exceptionable);
            else if (undefined !== input.and)
                return $io25(input, true && _exceptionable);
            else if (undefined !== input.or)
                return $io26(input, true && _exceptionable);
            else if (undefined !== input.not)
                return $io27(input, true && _exceptionable);
            else if (undefined !== input.is_null)
                return $io28(input, true && _exceptionable);
            else if (undefined !== input.not_null)
                return $io29(input, true && _exceptionable);
            else if (undefined !== input.player_has_item)
                return $io30(input, true && _exceptionable);
            else if (undefined !== input.player_has_tag)
                return $io31(input, true && _exceptionable);
            else if (undefined !== input.npc_has_tag)
                return $io32(input, true && _exceptionable);
            else if (undefined !== input["if"])
                return $io33(input, true && _exceptionable);
            else
                return false;
        })();
        const $iu2 = (input: any, _exceptionable: boolean = true): any => (() => {
            if ($io42(input, false && _exceptionable))
                return $io42(input, true && _exceptionable);
            else if ($io43(input, false && _exceptionable))
                return $io43(input, true && _exceptionable);
            else if ($io44(input, false && _exceptionable))
                return $io44(input, true && _exceptionable);
            else if ($io45(input, false && _exceptionable))
                return $io45(input, true && _exceptionable);
            else if ($io46(input, false && _exceptionable))
                return $io46(input, true && _exceptionable);
            else if ($io47(input, false && _exceptionable))
                return $io47(input, true && _exceptionable);
            else if ($io48(input, false && _exceptionable))
                return $io48(input, true && _exceptionable);
            else if ($io49(input, false && _exceptionable))
                return $io49(input, true && _exceptionable);
            else if ($io50(input, false && _exceptionable))
                return $io50(input, true && _exceptionable);
            else if ($io51(input, false && _exceptionable))
                return $io51(input, true && _exceptionable);
            else if ($io52(input, false && _exceptionable))
                return $io52(input, true && _exceptionable);
            else if ($io53(input, false && _exceptionable))
                return $io53(input, true && _exceptionable);
            else if ($io54(input, false && _exceptionable))
                return $io54(input, true && _exceptionable);
            else if ($io55(input, false && _exceptionable))
                return $io55(input, true && _exceptionable);
            else if ($io56(input, false && _exceptionable))
                return $io56(input, true && _exceptionable);
            else if ($io57(input, false && _exceptionable))
                return $io57(input, true && _exceptionable);
            else if ($io58(input, false && _exceptionable))
                return $io58(input, true && _exceptionable);
            else if ($io59(input, false && _exceptionable))
                return $io59(input, true && _exceptionable);
            else if ($io60(input, false && _exceptionable))
                return $io60(input, true && _exceptionable);
            else if ($io61(input, false && _exceptionable))
                return $io61(input, true && _exceptionable);
            else if ($io62(input, false && _exceptionable))
                return $io62(input, true && _exceptionable);
            else if ($io63(input, false && _exceptionable))
                return $io63(input, true && _exceptionable);
            else if ($io64(input, false && _exceptionable))
                return $io64(input, true && _exceptionable);
            else if ($io65(input, false && _exceptionable))
                return $io65(input, true && _exceptionable);
            else if ($io66(input, false && _exceptionable))
                return $io66(input, true && _exceptionable);
            else if ($io67(input, false && _exceptionable))
                return $io67(input, true && _exceptionable);
            else if ($io68(input, false && _exceptionable))
                return $io68(input, true && _exceptionable);
            else if ($io69(input, false && _exceptionable))
                return $io69(input, true && _exceptionable);
            else if ($io70(input, false && _exceptionable))
                return $io70(input, true && _exceptionable);
            else if ($io71(input, false && _exceptionable))
                return $io71(input, true && _exceptionable);
            else if ($io72(input, false && _exceptionable))
                return $io72(input, true && _exceptionable);
            else if ($io73(input, false && _exceptionable))
                return $io73(input, true && _exceptionable);
            else if ($io74(input, false && _exceptionable))
                return $io74(input, true && _exceptionable);
            else if ($io75(input, false && _exceptionable))
                return $io75(input, true && _exceptionable);
            else if ($io76(input, false && _exceptionable))
                return $io76(input, true && _exceptionable);
            else if ($io77(input, false && _exceptionable))
                return $io77(input, true && _exceptionable);
            else if ($io78(input, false && _exceptionable))
                return $io78(input, true && _exceptionable);
            else if ($io79(input, false && _exceptionable))
                return $io79(input, true && _exceptionable);
            else if ($io80(input, false && _exceptionable))
                return $io80(input, true && _exceptionable);
            else if ($io81(input, false && _exceptionable))
                return $io81(input, true && _exceptionable);
            else if ($io82(input, false && _exceptionable))
                return $io82(input, true && _exceptionable);
            else if ($io83(input, false && _exceptionable))
                return $io83(input, true && _exceptionable);
            else if ($io84(input, false && _exceptionable))
                return $io84(input, true && _exceptionable);
            else if ($io85(input, false && _exceptionable))
                return $io85(input, true && _exceptionable);
            else if ($io86(input, false && _exceptionable))
                return $io86(input, true && _exceptionable);
            else if ($io87(input, false && _exceptionable))
                return $io87(input, true && _exceptionable);
            else if ($io88(input, false && _exceptionable))
                return $io88(input, true && _exceptionable);
            else if ($io89(input, false && _exceptionable))
                return $io89(input, true && _exceptionable);
            else if ($io90(input, false && _exceptionable))
                return $io90(input, true && _exceptionable);
            else if ($io91(input, false && _exceptionable))
                return $io91(input, true && _exceptionable);
            else if ($io92(input, false && _exceptionable))
                return $io92(input, true && _exceptionable);
            else if ($io93(input, false && _exceptionable))
                return $io93(input, true && _exceptionable);
            else if ($io94(input, false && _exceptionable))
                return $io94(input, true && _exceptionable);
            else if ($io95(input, false && _exceptionable))
                return $io95(input, true && _exceptionable);
            else if ($io96(input, false && _exceptionable))
                return $io96(input, true && _exceptionable);
            else if ($io97(input, false && _exceptionable))
                return $io97(input, true && _exceptionable);
            else if ($io98(input, false && _exceptionable))
                return $io98(input, true && _exceptionable);
            else if ($io99(input, false && _exceptionable))
                return $io99(input, true && _exceptionable);
            else if ($io100(input, false && _exceptionable))
                return $io100(input, true && _exceptionable);
            else if ($io101(input, false && _exceptionable))
                return $io101(input, true && _exceptionable);
            else
                return false;
        })();
        const $iu3 = (input: any, _exceptionable: boolean = true): any => (() => {
            if (undefined !== input.scene)
                return $io102(input, true && _exceptionable);
            else if (undefined !== input.action)
                return $io103(input, true && _exceptionable);
            else if (undefined !== input.command)
                return $io104(input, true && _exceptionable);
            else if (undefined !== input.menu)
                return $io105(input, true && _exceptionable);
            else if (undefined !== input.if_has_tag)
                return $io106(input, true && _exceptionable);
            else if (undefined !== input.if_has_item)
                return $io107(input, true && _exceptionable);
            else if (undefined !== input.wait)
                return $io108(input, true && _exceptionable);
            else if (undefined !== input.sequence)
                return $io109(input, true && _exceptionable);
            else if (undefined !== input.sound)
                return $io110(input, true && _exceptionable);
            else if (undefined !== input.random)
                return $io111(input, true && _exceptionable);
            else if (undefined !== input.apply_tag)
                return $io112(input, true && _exceptionable);
            else if (undefined !== input.remove_tag)
                return $io113(input, true && _exceptionable);
            else
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
                    expected: "Actor",
                    value: elem
                })) && $vo1(elem, _path + ".actors[" + _index1 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".actors[" + _index1 + "]",
                    expected: "Actor",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".actors",
                    expected: "(Array<Actor> | undefined)",
                    value: input.actors
                }), undefined === input.scenes || (Array.isArray(input.scenes) || $report(_exceptionable, {
                    path: _path + ".scenes",
                    expected: "(Array<SavedScene> | undefined)",
                    value: input.scenes
                })) && input.scenes.map((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".scenes[" + _index2 + "]",
                    expected: "SavedScene",
                    value: elem
                })) && $vo41(elem, _path + ".scenes[" + _index2 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".scenes[" + _index2 + "]",
                    expected: "SavedScene",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".scenes",
                    expected: "(Array<SavedScene> | undefined)",
                    value: input.scenes
                }), undefined === input.items || (Array.isArray(input.items) || $report(_exceptionable, {
                    path: _path + ".items",
                    expected: "(Array<ItemUse> | undefined)",
                    value: input.items
                })) && input.items.map((elem: any, _index3: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".items[" + _index3 + "]",
                    expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & SelectorSelector & Action | RequireTag & SelectorSelector & ApplyTag | RequireTag & SelectorSelector & Command | RequireTag & SelectorSelector & Menu | RequireTag & SelectorSelector & Random | RequireTag & SelectorSelector & RemoveTag | RequireTag & SelectorSelector & Scene | RequireTag & SelectorSelector & Sequence | RequireTag & SelectorSelector & Sound | RequireTag & SelectorSelector & Wait | RequireTag & SelectorSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & SelectorSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".items[" + _index3 + "]",
                    expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & SelectorSelector & Action | RequireTag & SelectorSelector & ApplyTag | RequireTag & SelectorSelector & Command | RequireTag & SelectorSelector & Menu | RequireTag & SelectorSelector & Random | RequireTag & SelectorSelector & RemoveTag | RequireTag & SelectorSelector & Scene | RequireTag & SelectorSelector & Sequence | RequireTag & SelectorSelector & Sound | RequireTag & SelectorSelector & Wait | RequireTag & SelectorSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & SelectorSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
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
                    expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu3(elem, _path + ".chats[" + _index4 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".chats[" + _index4 + "]",
                    expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".chats",
                    expected: "(Array<Chat> | undefined)",
                    value: input.chats
                }), undefined === input.actions || ("object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) || $report(_exceptionable, {
                    path: _path + ".actions",
                    expected: "(TransitionMap | undefined)",
                    value: input.actions
                })) && $vo114(input.actions, _path + ".actions", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".actions",
                    expected: "(TransitionMap | undefined)",
                    value: input.actions
                }), undefined === input.variables || ("object" === typeof input.variables && null !== input.variables && false === Array.isArray(input.variables) || $report(_exceptionable, {
                    path: _path + ".variables",
                    expected: "(__type.o10 | undefined)",
                    value: input.variables
                })) && $vo115(input.variables, _path + ".variables", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".variables",
                    expected: "(__type.o10 | undefined)",
                    value: input.variables
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["actors", "scenes", "items", "chats", "actions", "variables"].some((prop: any) => key === prop))
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
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.id || $report(_exceptionable, {
                    path: _path + ".id",
                    expected: "string",
                    value: input.id
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), undefined === input.scene || "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "(string | undefined)",
                    value: input.scene
                }), undefined === input.scale || 25 === input.scale || 50 === input.scale || 75 === input.scale || 100 === input.scale || 125 === input.scale || 150 === input.scale || $report(_exceptionable, {
                    path: _path + ".scale",
                    expected: "(100 | 125 | 150 | 25 | 50 | 75 | undefined)",
                    value: input.scale
                }), undefined === input.entityId || "string" === typeof input.entityId || $report(_exceptionable, {
                    path: _path + ".entityId",
                    expected: "(string | undefined)",
                    value: input.entityId
                }), undefined === input.skin || "string" === typeof input.skin || $report(_exceptionable, {
                    path: _path + ".skin",
                    expected: "(string | undefined)",
                    value: input.skin
                }), undefined === input.roles || (Array.isArray(input.roles) || $report(_exceptionable, {
                    path: _path + ".roles",
                    expected: "(Array<string> | undefined)",
                    value: input.roles
                })) && input.roles.map((elem: any, _index5: number) => "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".roles[" + _index5 + "]",
                    expected: "string",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".roles",
                    expected: "(Array<string> | undefined)",
                    value: input.roles
                }), undefined === input.action || "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "(string | undefined)",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "(MenuDetails | undefined)",
                    value: input.menu
                }), undefined === input.if_has_tag || "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "(string | undefined)",
                    value: input.if_has_tag
                }), undefined === input.then || ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input.then
                }), undefined === input["else"] || ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input["else"]
                }), undefined === input.if_has_item || ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "(Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector> | undefined)",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "(Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector> | undefined)",
                    value: input.if_has_item
                }), undefined === input.wait || "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "(number | undefined)",
                    value: input.wait
                }), undefined === input.sequence || (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> | undefined)",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index6: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index6 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index6 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index6 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> | undefined)",
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
                }), undefined === input.random || (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "((Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>) | undefined)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index7: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index7 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index7 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index7 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "((Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>) | undefined)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index8: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index8 + "]",
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
                }), undefined === input.variable || "string" === typeof input.variable || $report(_exceptionable, {
                    path: _path + ".variable",
                    expected: "(string | undefined)",
                    value: input.variable
                }), (null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined === input.value || "string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["id", "name", "scene", "scale", "entityId", "skin", "roles", "action", "args", "command", "menu", "if_has_tag", "then", "else", "if_has_item", "wait", "sequence", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector", "random", "weights", "apply_tag", "remove_tag", "variable", "value"].some((prop: any) => key === prop))
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
            const $vo2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
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
            const $vo3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.title || $report(_exceptionable, {
                    path: _path + ".title",
                    expected: "string",
                    value: input.title
                }), undefined === input.body || "string" === typeof input.body || $report(_exceptionable, {
                    path: _path + ".body",
                    expected: "(string | undefined)",
                    value: input.body
                }), (Array.isArray(input.buttons) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "(Array<Button> & MinItems<1> & MaxItems<6>)",
                    value: input.buttons
                })) && ((1 <= input.buttons.length || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<> & MinItems<1>",
                    value: input.buttons
                })) && (input.buttons.length <= 6 || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<> & MaxItems<6>",
                    value: input.buttons
                })) && input.buttons.map((elem: any, _index9: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index9 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu0(elem, _path + ".buttons[" + _index9 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index9 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "(Array<Button> & MinItems<1> & MaxItems<6>)",
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
            const $vo4 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
            const $vo5 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
            const $vo7 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo8 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.scene || "string" === typeof input.scene || $report(_exceptionable, {
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
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "(MenuDetails | undefined)",
                    value: input.menu
                }), undefined === input.if_has_tag || "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "(string | undefined)",
                    value: input.if_has_tag
                }), undefined === input.then || ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input.then
                }), undefined === input["else"] || ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference> | undefined)",
                    value: input["else"]
                }), undefined === input.if_has_item || ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "(Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector> | undefined)",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "(Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector> | undefined)",
                    value: input.if_has_item
                }), undefined === input.wait || "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "(number | undefined)",
                    value: input.wait
                }), undefined === input.sequence || (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> | undefined)",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index10: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index10 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index10 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index10 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> | undefined)",
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
                }), undefined === input.random || (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "((Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>) | undefined)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index11: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index11 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index11 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index11 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "((Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>) | undefined)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index12: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index12 + "]",
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
                }), undefined === input.variable || "string" === typeof input.variable || $report(_exceptionable, {
                    path: _path + ".variable",
                    expected: "(string | undefined)",
                    value: input.variable
                }), (null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined === input.value || "string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["scene", "action", "args", "command", "menu", "if_has_tag", "then", "else", "if_has_item", "wait", "sequence", "sound", "volume", "pitch", "x", "y", "z", "dimension", "selector", "random", "weights", "apply_tag", "remove_tag", "variable", "value"].some((prop: any) => key === prop))
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
            const $vo10 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.tag || "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "(string | undefined)",
                    value: input.tag
                }), undefined === input.name || "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "(string | undefined)",
                    value: input.name
                }), undefined === input.selector || "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "(string | undefined)",
                    value: input.selector
                }), undefined === input.lore || (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "(Array<string | null> | undefined)",
                    value: input.lore
                })) && input.lore.map((elem: any, _index13: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index13 + "]",
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
                    if (["tag", "name", "selector", "lore", "item_type"].some((prop: any) => key === prop))
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
            const $vo11 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.variable || $report(_exceptionable, {
                    path: _path + ".variable",
                    expected: "string",
                    value: input.variable
                }), (null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined === input.value || "string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["variable", "value"].some((prop: any) => key === prop))
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
            const $vo12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.greater_than || $report(_exceptionable, {
                    path: _path + ".greater_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.greater_than
                })) && (undefined !== input.greater_than || $report(_exceptionable, {
                    path: _path + ".greater_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.greater_than
                })) && ("string" === typeof input.greater_than || "number" === typeof input.greater_than || ("object" === typeof input.greater_than && null !== input.greater_than || $report(_exceptionable, {
                    path: _path + ".greater_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.greater_than
                })) && $vu1(input.greater_than, _path + ".greater_than", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".greater_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.greater_than
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "greater_than"].some((prop: any) => key === prop))
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
            const $vo13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.less_than || $report(_exceptionable, {
                    path: _path + ".less_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.less_than
                })) && (undefined !== input.less_than || $report(_exceptionable, {
                    path: _path + ".less_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.less_than
                })) && ("string" === typeof input.less_than || "number" === typeof input.less_than || ("object" === typeof input.less_than && null !== input.less_than || $report(_exceptionable, {
                    path: _path + ".less_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.less_than
                })) && $vu1(input.less_than, _path + ".less_than", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".less_than",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.less_than
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "less_than"].some((prop: any) => key === prop))
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
            const $vo14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.equals
                })) && (undefined !== input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.equals
                })) && ("string" === typeof input.equals || "number" === typeof input.equals || ("object" === typeof input.equals && null !== input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.equals
                })) && $vu1(input.equals, _path + ".equals", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.equals
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "equals"].some((prop: any) => key === prop))
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
            const $vo15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.strict_equals || $report(_exceptionable, {
                    path: _path + ".strict_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_equals
                })) && (undefined !== input.strict_equals || $report(_exceptionable, {
                    path: _path + ".strict_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_equals
                })) && ("string" === typeof input.strict_equals || "number" === typeof input.strict_equals || ("object" === typeof input.strict_equals && null !== input.strict_equals || $report(_exceptionable, {
                    path: _path + ".strict_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_equals
                })) && $vu1(input.strict_equals, _path + ".strict_equals", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".strict_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_equals
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "strict_equals"].some((prop: any) => key === prop))
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
            const $vo16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.not_equals || $report(_exceptionable, {
                    path: _path + ".not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_equals
                })) && (undefined !== input.not_equals || $report(_exceptionable, {
                    path: _path + ".not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_equals
                })) && ("string" === typeof input.not_equals || "number" === typeof input.not_equals || ("object" === typeof input.not_equals && null !== input.not_equals || $report(_exceptionable, {
                    path: _path + ".not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_equals
                })) && $vu1(input.not_equals, _path + ".not_equals", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_equals
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "not_equals"].some((prop: any) => key === prop))
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
            const $vo17 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.strict_not_equals || $report(_exceptionable, {
                    path: _path + ".strict_not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_not_equals
                })) && (undefined !== input.strict_not_equals || $report(_exceptionable, {
                    path: _path + ".strict_not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_not_equals
                })) && ("string" === typeof input.strict_not_equals || "number" === typeof input.strict_not_equals || ("object" === typeof input.strict_not_equals && null !== input.strict_not_equals || $report(_exceptionable, {
                    path: _path + ".strict_not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_not_equals
                })) && $vu1(input.strict_not_equals, _path + ".strict_not_equals", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".strict_not_equals",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.strict_not_equals
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "strict_not_equals"].some((prop: any) => key === prop))
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
            const $vo18 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.add || $report(_exceptionable, {
                    path: _path + ".add",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.add
                })) && (undefined !== input.add || $report(_exceptionable, {
                    path: _path + ".add",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.add
                })) && ("string" === typeof input.add || "number" === typeof input.add || ("object" === typeof input.add && null !== input.add || $report(_exceptionable, {
                    path: _path + ".add",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.add
                })) && $vu1(input.add, _path + ".add", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".add",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.add
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "add"].some((prop: any) => key === prop))
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
            const $vo19 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.subtract || $report(_exceptionable, {
                    path: _path + ".subtract",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.subtract
                })) && (undefined !== input.subtract || $report(_exceptionable, {
                    path: _path + ".subtract",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.subtract
                })) && ("string" === typeof input.subtract || "number" === typeof input.subtract || ("object" === typeof input.subtract && null !== input.subtract || $report(_exceptionable, {
                    path: _path + ".subtract",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.subtract
                })) && $vu1(input.subtract, _path + ".subtract", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".subtract",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.subtract
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "subtract"].some((prop: any) => key === prop))
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
            const $vo20 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.multiply || $report(_exceptionable, {
                    path: _path + ".multiply",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.multiply
                })) && (undefined !== input.multiply || $report(_exceptionable, {
                    path: _path + ".multiply",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.multiply
                })) && ("string" === typeof input.multiply || "number" === typeof input.multiply || ("object" === typeof input.multiply && null !== input.multiply || $report(_exceptionable, {
                    path: _path + ".multiply",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.multiply
                })) && $vu1(input.multiply, _path + ".multiply", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".multiply",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.multiply
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "multiply"].some((prop: any) => key === prop))
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
            const $vo21 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.divide || $report(_exceptionable, {
                    path: _path + ".divide",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.divide
                })) && (undefined !== input.divide || $report(_exceptionable, {
                    path: _path + ".divide",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.divide
                })) && ("string" === typeof input.divide || "number" === typeof input.divide || ("object" === typeof input.divide && null !== input.divide || $report(_exceptionable, {
                    path: _path + ".divide",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.divide
                })) && $vu1(input.divide, _path + ".divide", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".divide",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.divide
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "divide"].some((prop: any) => key === prop))
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
            const $vo22 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && (undefined !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && ("string" === typeof input.value || "number" === typeof input.value || ("object" === typeof input.value && null !== input.value || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })) && $vu1(input.value, _path + ".value", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".value",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.value
                })), (null !== input.modulo || $report(_exceptionable, {
                    path: _path + ".modulo",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.modulo
                })) && (undefined !== input.modulo || $report(_exceptionable, {
                    path: _path + ".modulo",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.modulo
                })) && ("string" === typeof input.modulo || "number" === typeof input.modulo || ("object" === typeof input.modulo && null !== input.modulo || $report(_exceptionable, {
                    path: _path + ".modulo",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.modulo
                })) && $vu1(input.modulo, _path + ".modulo", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".modulo",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.modulo
                })), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["value", "modulo"].some((prop: any) => key === prop))
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
            const $vo23 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [("object" === typeof input.random && null !== input.random || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "__type",
                    value: input.random
                })) && $vo24(input.random, _path + ".random", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "__type",
                    value: input.random
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["random"].some((prop: any) => key === prop))
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
            const $vo24 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.min || $report(_exceptionable, {
                    path: _path + ".min",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.min
                })) && (undefined === input.min || "string" === typeof input.min || "number" === typeof input.min || ("object" === typeof input.min && null !== input.min || $report(_exceptionable, {
                    path: _path + ".min",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.min
                })) && $vu1(input.min, _path + ".min", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".min",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | undefined | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.min
                })), (null !== input.max || $report(_exceptionable, {
                    path: _path + ".max",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.max
                })) && (undefined !== input.max || $report(_exceptionable, {
                    path: _path + ".max",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.max
                })) && ("string" === typeof input.max || "number" === typeof input.max || ("object" === typeof input.max && null !== input.max || $report(_exceptionable, {
                    path: _path + ".max",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.max
                })) && $vu1(input.max, _path + ".max", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".max",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.max
                })), undefined === input.step || "number" === typeof input.step || $report(_exceptionable, {
                    path: _path + ".step",
                    expected: "(number | undefined)",
                    value: input.step
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["min", "max", "step"].some((prop: any) => key === prop))
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
            const $vo25 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(Array.isArray(input.and) || $report(_exceptionable, {
                    path: _path + ".and",
                    expected: "Array<OperationReference>",
                    value: input.and
                })) && input.and.map((elem: any, _index14: number) => (null !== elem || $report(_exceptionable, {
                    path: _path + ".and[" + _index14 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                })) && (undefined !== elem || $report(_exceptionable, {
                    path: _path + ".and[" + _index14 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                })) && ("string" === typeof elem || "number" === typeof elem || ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".and[" + _index14 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                })) && $vu1(elem, _path + ".and[" + _index14 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".and[" + _index14 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                }))).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".and",
                    expected: "Array<OperationReference>",
                    value: input.and
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["and"].some((prop: any) => key === prop))
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
            const $vo26 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(Array.isArray(input.or) || $report(_exceptionable, {
                    path: _path + ".or",
                    expected: "Array<OperationReference>",
                    value: input.or
                })) && input.or.map((elem: any, _index15: number) => (null !== elem || $report(_exceptionable, {
                    path: _path + ".or[" + _index15 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                })) && (undefined !== elem || $report(_exceptionable, {
                    path: _path + ".or[" + _index15 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                })) && ("string" === typeof elem || "number" === typeof elem || ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".or[" + _index15 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                })) && $vu1(elem, _path + ".or[" + _index15 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".or[" + _index15 + "]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: elem
                }))).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".or",
                    expected: "Array<OperationReference>",
                    value: input.or
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["or"].some((prop: any) => key === prop))
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
            const $vo27 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.not || $report(_exceptionable, {
                    path: _path + ".not",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not
                })) && (undefined !== input.not || $report(_exceptionable, {
                    path: _path + ".not",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not
                })) && ("string" === typeof input.not || "number" === typeof input.not || ("object" === typeof input.not && null !== input.not || $report(_exceptionable, {
                    path: _path + ".not",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not
                })) && $vu1(input.not, _path + ".not", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".not",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not
                })), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["not"].some((prop: any) => key === prop))
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
            const $vo28 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.is_null || $report(_exceptionable, {
                    path: _path + ".is_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.is_null
                })) && (undefined !== input.is_null || $report(_exceptionable, {
                    path: _path + ".is_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.is_null
                })) && ("string" === typeof input.is_null || "number" === typeof input.is_null || ("object" === typeof input.is_null && null !== input.is_null || $report(_exceptionable, {
                    path: _path + ".is_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.is_null
                })) && $vu1(input.is_null, _path + ".is_null", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".is_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.is_null
                })), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["is_null"].some((prop: any) => key === prop))
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
            const $vo29 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input.not_null || $report(_exceptionable, {
                    path: _path + ".not_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_null
                })) && (undefined !== input.not_null || $report(_exceptionable, {
                    path: _path + ".not_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_null
                })) && ("string" === typeof input.not_null || "number" === typeof input.not_null || ("object" === typeof input.not_null && null !== input.not_null || $report(_exceptionable, {
                    path: _path + ".not_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_null
                })) && $vu1(input.not_null, _path + ".not_null", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".not_null",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.not_null
                })), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["not_null"].some((prop: any) => key === prop))
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
            const $vo30 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [("object" === typeof input.player_has_item && null !== input.player_has_item && false === Array.isArray(input.player_has_item) || $report(_exceptionable, {
                    path: _path + ".player_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.player_has_item
                })) && $vo10(input.player_has_item, _path + ".player_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".player_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.player_has_item
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["player_has_item"].some((prop: any) => key === prop))
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
            const $vo31 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.player_has_tag || $report(_exceptionable, {
                    path: _path + ".player_has_tag",
                    expected: "string",
                    value: input.player_has_tag
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["player_has_tag"].some((prop: any) => key === prop))
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
            const $vo32 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.npc_has_tag || $report(_exceptionable, {
                    path: _path + ".npc_has_tag",
                    expected: "string",
                    value: input.npc_has_tag
                }), 1 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["npc_has_tag"].some((prop: any) => key === prop))
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
            const $vo33 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [(null !== input["if"] || $report(_exceptionable, {
                    path: _path + "[\"if\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["if"]
                })) && (undefined !== input["if"] || $report(_exceptionable, {
                    path: _path + "[\"if\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["if"]
                })) && ("string" === typeof input["if"] || "number" === typeof input["if"] || ("object" === typeof input["if"] && null !== input["if"] || $report(_exceptionable, {
                    path: _path + "[\"if\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["if"]
                })) && $vu1(input["if"], _path + "[\"if\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"if\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["if"]
                })), (null !== input.then || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.then
                })) && (undefined !== input.then || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.then
                })) && ("string" === typeof input.then || "number" === typeof input.then || ("object" === typeof input.then && null !== input.then || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.then
                })) && $vu1(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input.then
                })), (null !== input["else"] || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["else"]
                })) && (undefined !== input["else"] || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["else"]
                })) && ("string" === typeof input["else"] || "number" === typeof input["else"] || ("object" === typeof input["else"] && null !== input["else"] || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["else"]
                })) && $vu1(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "(Random | VariableReference | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9 | number | string | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; })",
                    value: input["else"]
                })), 3 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["if", "then", "else"].some((prop: any) => key === prop))
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
            const $vo34 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo35 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
            const $vo36 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index16: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index16 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index16 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index16 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
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
            const $vo37 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
            const $vo38 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index17: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index17 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index17 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index17 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index18: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index18 + "]",
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
            const $vo39 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
            const $vo40 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.text || $report(_exceptionable, {
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
            const $vo41 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.id || $report(_exceptionable, {
                    path: _path + ".id",
                    expected: "string",
                    value: input.id
                }), "string" === typeof input.text || $report(_exceptionable, {
                    path: _path + ".text",
                    expected: "string",
                    value: input.text
                }), (Array.isArray(input.buttons) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<Button>",
                    value: input.buttons
                })) && input.buttons.map((elem: any, _index19: number) => ("object" === typeof elem && null !== elem || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index19 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })) && $vu0(elem, _path + ".buttons[" + _index19 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".buttons[" + _index19 + "]",
                    expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".buttons",
                    expected: "Array<Button>",
                    value: input.buttons
                }), undefined === input.npc_name || "string" === typeof input.npc_name || $report(_exceptionable, {
                    path: _path + ".npc_name",
                    expected: "(string | undefined)",
                    value: input.npc_name
                }), undefined === input.is_dummy || "boolean" === typeof input.is_dummy || $report(_exceptionable, {
                    path: _path + ".is_dummy",
                    expected: "(boolean | undefined)",
                    value: input.is_dummy
                }), 3 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["id", "text", "buttons", "npc_name", "is_dummy"].some((prop: any) => key === prop))
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
            const $vo43 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo44 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo45 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo46 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo47 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo48 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo49 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index20: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index20 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index20 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index20 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
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
            const $vo50 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo51 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.tag || $report(_exceptionable, {
                    path: _path + ".tag",
                    expected: "string",
                    value: input.tag
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index21: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index21 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index21 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index21 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index22: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index22 + "]",
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
            const $vo52 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo53 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo54 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo55 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo56 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo57 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo58 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo59 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo60 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo61 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index23: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index23 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index23 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index23 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
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
            const $vo62 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo63 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.name || $report(_exceptionable, {
                    path: _path + ".name",
                    expected: "string",
                    value: input.name
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index24: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index24 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index24 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index24 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index25: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index25 + "]",
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
            const $vo64 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo65 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo66 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "string" === typeof input.scene || $report(_exceptionable, {
                    path: _path + ".scene",
                    expected: "string",
                    value: input.scene
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "scene"].some((prop: any) => key === prop))
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
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "action", "args"].some((prop: any) => key === prop))
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
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "string" === typeof input.command || $report(_exceptionable, {
                    path: _path + ".command",
                    expected: "string",
                    value: input.command
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "command"].some((prop: any) => key === prop))
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
            const $vo69 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), ("object" === typeof input.menu && null !== input.menu || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".menu",
                    expected: "MenuDetails",
                    value: input.menu
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "menu"].some((prop: any) => key === prop))
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
            const $vo70 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "if_has_tag", "then", "else"].some((prop: any) => key === prop))
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
            const $vo71 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "if_has_item", "then", "else"].some((prop: any) => key === prop))
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
            const $vo72 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "number" === typeof input.wait || $report(_exceptionable, {
                    path: _path + ".wait",
                    expected: "number",
                    value: input.wait
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "wait"].some((prop: any) => key === prop))
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
            const $vo73 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index26: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index26 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index26 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index26 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "sequence"].some((prop: any) => key === prop))
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
            const $vo74 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
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
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "sound", "volume", "pitch", "x", "y", "z", "dimension"].some((prop: any) => key === prop))
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
            const $vo75 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index27: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index27 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index27 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index27 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index28: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index28 + "]",
                    expected: "number",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "random", "weights"].some((prop: any) => key === prop))
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
            const $vo76 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "string" === typeof input.apply_tag || $report(_exceptionable, {
                    path: _path + ".apply_tag",
                    expected: "string",
                    value: input.apply_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "apply_tag"].some((prop: any) => key === prop))
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
            const $vo77 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.selector || $report(_exceptionable, {
                    path: _path + ".selector",
                    expected: "string",
                    value: input.selector
                }), "string" === typeof input.remove_tag || $report(_exceptionable, {
                    path: _path + ".remove_tag",
                    expected: "string",
                    value: input.remove_tag
                }), 2 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["require_tag", "selector", "remove_tag"].some((prop: any) => key === prop))
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
            const $vo78 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo79 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                }), "string" === typeof input.action || $report(_exceptionable, {
                    path: _path + ".action",
                    expected: "string",
                    value: input.action
                }), undefined === input.args || ("object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) || $report(_exceptionable, {
                    path: _path + ".args",
                    expected: "(Args | undefined)",
                    value: input.args
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo80 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index31: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index31 + "]",
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
            const $vo81 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index32: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index32 + "]",
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo82 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                }), "string" === typeof input.if_has_tag || $report(_exceptionable, {
                    path: _path + ".if_has_tag",
                    expected: "string",
                    value: input.if_has_tag
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo83 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo84 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index35: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index35 + "]",
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
            const $vo85 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index36: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index36 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index37: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index37 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index37 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index37 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
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
            const $vo86 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index38: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index38 + "]",
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
            const $vo87 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index39: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index39 + "]",
                    expected: "(null | string)",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index40: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index40 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index40 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index40 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index41: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index41 + "]",
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
            const $vo88 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index42: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index42 + "]",
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
            const $vo89 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.lore) || $report(_exceptionable, {
                    path: _path + ".lore",
                    expected: "Array<string | null>",
                    value: input.lore
                })) && input.lore.map((elem: any, _index43: number) => null === elem || "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".lore[" + _index43 + "]",
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
            const $vo90 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo91 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo92 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo93 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo94 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo95 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo96 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo97 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index44: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index44 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index44 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index44 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
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
            const $vo98 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo99 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), "string" === typeof input.item_type || $report(_exceptionable, {
                    path: _path + ".item_type",
                    expected: "string",
                    value: input.item_type
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index45: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index45 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index45 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index45 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index46: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index46 + "]",
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
            const $vo100 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo101 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
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
            const $vo102 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
            const $vo103 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
                })) && $vo2(input.args, _path + ".args", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo104 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
            const $vo105 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
                })) && $vo3(input.menu, _path + ".menu", true && _exceptionable) || $report(_exceptionable, {
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
            const $vo106 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo107 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                })) && $vo10(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".if_has_item",
                    expected: "Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>",
                    value: input.if_has_item
                }), ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                })) && $vo9(input.then, _path + ".then", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".then",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input.then
                }), ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: input["else"]
                })) && $vo9(input["else"], _path + "[\"else\"]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + "[\"else\"]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
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
            const $vo108 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
            const $vo109 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.sequence) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
                    value: input.sequence
                })) && input.sequence.map((elem: any, _index47: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index47 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".sequence[" + _index47 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".sequence[" + _index47 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".sequence",
                    expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>>",
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
            const $vo110 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
            const $vo111 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
                    path: _path + ".equals",
                    expected: "string",
                    value: input.equals
                }), undefined === input.require_tag || "string" === typeof input.require_tag || $report(_exceptionable, {
                    path: _path + ".require_tag",
                    expected: "(string | undefined)",
                    value: input.require_tag
                }), (Array.isArray(input.random) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                })) && ((2 <= input.random.length || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "Array<> & MinItems<2>",
                    value: input.random
                })) && input.random.map((elem: any, _index48: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $report(_exceptionable, {
                    path: _path + ".random[" + _index48 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })) && $vo9(elem, _path + ".random[" + _index48 + "]", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".random[" + _index48 + "]",
                    expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                    value: elem
                })).every((flag: boolean) => flag)) || $report(_exceptionable, {
                    path: _path + ".random",
                    expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>> & MinItems<2>)",
                    value: input.random
                }), undefined === input.weights || (Array.isArray(input.weights) || $report(_exceptionable, {
                    path: _path + ".weights",
                    expected: "(Array<number> | undefined)",
                    value: input.weights
                })) && input.weights.map((elem: any, _index49: number) => "number" === typeof elem || $report(_exceptionable, {
                    path: _path + ".weights[" + _index49 + "]",
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
            const $vo112 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
            const $vo113 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.equals || $report(_exceptionable, {
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
            const $vo114 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    if (RegExp(/(.*)/).test(key))
                        return ("object" === typeof value && null !== value && false === Array.isArray(value) || $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                            value: value
                        })) && $vo9(value, _path + $join(key), true && _exceptionable) || $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ... 6 more ... & VariableReference>",
                            value: value
                        });
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
            const $vo115 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.player || ("object" === typeof input.player && null !== input.player && false === Array.isArray(input.player) || $report(_exceptionable, {
                    path: _path + ".player",
                    expected: "(Variables | undefined)",
                    value: input.player
                })) && $vo116(input.player, _path + ".player", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".player",
                    expected: "(Variables | undefined)",
                    value: input.player
                }), undefined === input.npc || ("object" === typeof input.npc && null !== input.npc && false === Array.isArray(input.npc) || $report(_exceptionable, {
                    path: _path + ".npc",
                    expected: "(Variables | undefined)",
                    value: input.npc
                })) && $vo116(input.npc, _path + ".npc", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".npc",
                    expected: "(Variables | undefined)",
                    value: input.npc
                }), undefined === input.global || ("object" === typeof input.global && null !== input.global && false === Array.isArray(input.global) || $report(_exceptionable, {
                    path: _path + ".global",
                    expected: "(Variables | undefined)",
                    value: input.global
                })) && $vo116(input.global, _path + ".global", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".global",
                    expected: "(Variables | undefined)",
                    value: input.global
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["player", "npc", "global"].some((prop: any) => key === prop))
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
            const $vo116 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.flags || ("object" === typeof input.flags && null !== input.flags && false === Array.isArray(input.flags) || $report(_exceptionable, {
                    path: _path + ".flags",
                    expected: "(IndexedFields | undefined)",
                    value: input.flags
                })) && $vo117(input.flags, _path + ".flags", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".flags",
                    expected: "(IndexedFields | undefined)",
                    value: input.flags
                }), undefined === input.bools || ("object" === typeof input.bools && null !== input.bools && false === Array.isArray(input.bools) || $report(_exceptionable, {
                    path: _path + ".bools",
                    expected: "(IndexedFields | undefined)",
                    value: input.bools
                })) && $vo117(input.bools, _path + ".bools", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".bools",
                    expected: "(IndexedFields | undefined)",
                    value: input.bools
                }), undefined === input.bytes || ("object" === typeof input.bytes && null !== input.bytes && false === Array.isArray(input.bytes) || $report(_exceptionable, {
                    path: _path + ".bytes",
                    expected: "(IndexedFields | undefined)",
                    value: input.bytes
                })) && $vo117(input.bytes, _path + ".bytes", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".bytes",
                    expected: "(IndexedFields | undefined)",
                    value: input.bytes
                }), undefined === input.u32 || ("object" === typeof input.u32 && null !== input.u32 && false === Array.isArray(input.u32) || $report(_exceptionable, {
                    path: _path + ".u32",
                    expected: "(IndexedFields | undefined)",
                    value: input.u32
                })) && $vo117(input.u32, _path + ".u32", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".u32",
                    expected: "(IndexedFields | undefined)",
                    value: input.u32
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["flags", "bools", "bytes", "u32"].some((prop: any) => key === prop))
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
            const $vo117 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [false === _exceptionable || Object.keys(input).map((key: any) => {
                    const value = input[key];
                    if (undefined === value)
                        return true;
                    if (RegExp(/(.*)/).test(key))
                        return "string" === typeof value || $report(_exceptionable, {
                            path: _path + $join(key),
                            expected: "string",
                            value: value
                        });
                    return $report(_exceptionable, {
                        path: _path + $join(key),
                        expected: "undefined",
                        value: value
                    });
                }).every((flag: boolean) => flag)].every((flag: boolean) => flag);
            const $vu0 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $vo4(input, _path, true && _exceptionable);
                else if (undefined !== input.action)
                    return $vo5(input, _path, true && _exceptionable);
                else if (undefined !== input.command)
                    return $vo6(input, _path, true && _exceptionable);
                else if (undefined !== input.menu)
                    return $vo7(input, _path, true && _exceptionable);
                else if (undefined !== input.if_has_tag)
                    return $vo8(input, _path, true && _exceptionable);
                else if (undefined !== input.if_has_item)
                    return $vo34(input, _path, true && _exceptionable);
                else if (undefined !== input.wait)
                    return $vo35(input, _path, true && _exceptionable);
                else if (undefined !== input.sequence)
                    return $vo36(input, _path, true && _exceptionable);
                else if (undefined !== input.sound)
                    return $vo37(input, _path, true && _exceptionable);
                else if (undefined !== input.random)
                    return $vo38(input, _path, true && _exceptionable);
                else if (undefined !== input.apply_tag)
                    return $vo39(input, _path, true && _exceptionable);
                else if (undefined !== input.remove_tag)
                    return $vo40(input, _path, true && _exceptionable);
                else
                    return $report(_exceptionable, {
                        path: _path,
                        expected: "({ text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Action | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { text: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & RemoveTag)",
                        value: input
                    });
            })();
            const $vu1 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.variable)
                    return $vo11(input, _path, true && _exceptionable);
                else if (undefined !== input.greater_than)
                    return $vo12(input, _path, true && _exceptionable);
                else if (undefined !== input.less_than)
                    return $vo13(input, _path, true && _exceptionable);
                else if (undefined !== input.equals)
                    return $vo14(input, _path, true && _exceptionable);
                else if (undefined !== input.strict_equals)
                    return $vo15(input, _path, true && _exceptionable);
                else if (undefined !== input.not_equals)
                    return $vo16(input, _path, true && _exceptionable);
                else if (undefined !== input.strict_not_equals)
                    return $vo17(input, _path, true && _exceptionable);
                else if (undefined !== input.add)
                    return $vo18(input, _path, true && _exceptionable);
                else if (undefined !== input.subtract)
                    return $vo19(input, _path, true && _exceptionable);
                else if (undefined !== input.multiply)
                    return $vo20(input, _path, true && _exceptionable);
                else if (undefined !== input.divide)
                    return $vo21(input, _path, true && _exceptionable);
                else if (undefined !== input.modulo)
                    return $vo22(input, _path, true && _exceptionable);
                else if (undefined !== input.random)
                    return $vo23(input, _path, true && _exceptionable);
                else if (undefined !== input.and)
                    return $vo25(input, _path, true && _exceptionable);
                else if (undefined !== input.or)
                    return $vo26(input, _path, true && _exceptionable);
                else if (undefined !== input.not)
                    return $vo27(input, _path, true && _exceptionable);
                else if (undefined !== input.is_null)
                    return $vo28(input, _path, true && _exceptionable);
                else if (undefined !== input.not_null)
                    return $vo29(input, _path, true && _exceptionable);
                else if (undefined !== input.player_has_item)
                    return $vo30(input, _path, true && _exceptionable);
                else if (undefined !== input.player_has_tag)
                    return $vo31(input, _path, true && _exceptionable);
                else if (undefined !== input.npc_has_tag)
                    return $vo32(input, _path, true && _exceptionable);
                else if (undefined !== input["if"])
                    return $vo33(input, _path, true && _exceptionable);
                else
                    return $report(_exceptionable, {
                        path: _path,
                        expected: "(VariableReference | { value: OperationReference; } & { greater_than: OperationReference; } | { value: OperationReference; } & { less_than: OperationReference; } | { value: OperationReference; } & { equals: OperationReference; } | { value: OperationReference; } & { strict_equals: OperationReference; } | { value: OperationReference; } & { not_equals: OperationReference; } | { value: OperationReference; } & { strict_not_equals: OperationReference; } | { value: OperationReference; } & { add: OperationReference; } | { value: OperationReference; } & { subtract: OperationReference; } | { value: OperationReference; } & { multiply: OperationReference; } | { value: OperationReference; } & { divide: OperationReference; } | { value: OperationReference; } & { modulo: OperationReference; } | Random | __type.o1 | __type.o2 | __type.o3 | __type.o4 | __type.o5 | __type.o6 | __type.o7 | __type.o8 | __type.o9)",
                        value: input
                    });
            })();
            const $vu2 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if ($vo42(input, _path, false && _exceptionable))
                    return $vo42(input, _path, true && _exceptionable);
                else if ($vo43(input, _path, false && _exceptionable))
                    return $vo43(input, _path, true && _exceptionable);
                else if ($vo44(input, _path, false && _exceptionable))
                    return $vo44(input, _path, true && _exceptionable);
                else if ($vo45(input, _path, false && _exceptionable))
                    return $vo45(input, _path, true && _exceptionable);
                else if ($vo46(input, _path, false && _exceptionable))
                    return $vo46(input, _path, true && _exceptionable);
                else if ($vo47(input, _path, false && _exceptionable))
                    return $vo47(input, _path, true && _exceptionable);
                else if ($vo48(input, _path, false && _exceptionable))
                    return $vo48(input, _path, true && _exceptionable);
                else if ($vo49(input, _path, false && _exceptionable))
                    return $vo49(input, _path, true && _exceptionable);
                else if ($vo50(input, _path, false && _exceptionable))
                    return $vo50(input, _path, true && _exceptionable);
                else if ($vo51(input, _path, false && _exceptionable))
                    return $vo51(input, _path, true && _exceptionable);
                else if ($vo52(input, _path, false && _exceptionable))
                    return $vo52(input, _path, true && _exceptionable);
                else if ($vo53(input, _path, false && _exceptionable))
                    return $vo53(input, _path, true && _exceptionable);
                else if ($vo54(input, _path, false && _exceptionable))
                    return $vo54(input, _path, true && _exceptionable);
                else if ($vo55(input, _path, false && _exceptionable))
                    return $vo55(input, _path, true && _exceptionable);
                else if ($vo56(input, _path, false && _exceptionable))
                    return $vo56(input, _path, true && _exceptionable);
                else if ($vo57(input, _path, false && _exceptionable))
                    return $vo57(input, _path, true && _exceptionable);
                else if ($vo58(input, _path, false && _exceptionable))
                    return $vo58(input, _path, true && _exceptionable);
                else if ($vo59(input, _path, false && _exceptionable))
                    return $vo59(input, _path, true && _exceptionable);
                else if ($vo60(input, _path, false && _exceptionable))
                    return $vo60(input, _path, true && _exceptionable);
                else if ($vo61(input, _path, false && _exceptionable))
                    return $vo61(input, _path, true && _exceptionable);
                else if ($vo62(input, _path, false && _exceptionable))
                    return $vo62(input, _path, true && _exceptionable);
                else if ($vo63(input, _path, false && _exceptionable))
                    return $vo63(input, _path, true && _exceptionable);
                else if ($vo64(input, _path, false && _exceptionable))
                    return $vo64(input, _path, true && _exceptionable);
                else if ($vo65(input, _path, false && _exceptionable))
                    return $vo65(input, _path, true && _exceptionable);
                else if ($vo66(input, _path, false && _exceptionable))
                    return $vo66(input, _path, true && _exceptionable);
                else if ($vo67(input, _path, false && _exceptionable))
                    return $vo67(input, _path, true && _exceptionable);
                else if ($vo68(input, _path, false && _exceptionable))
                    return $vo68(input, _path, true && _exceptionable);
                else if ($vo69(input, _path, false && _exceptionable))
                    return $vo69(input, _path, true && _exceptionable);
                else if ($vo70(input, _path, false && _exceptionable))
                    return $vo70(input, _path, true && _exceptionable);
                else if ($vo71(input, _path, false && _exceptionable))
                    return $vo71(input, _path, true && _exceptionable);
                else if ($vo72(input, _path, false && _exceptionable))
                    return $vo72(input, _path, true && _exceptionable);
                else if ($vo73(input, _path, false && _exceptionable))
                    return $vo73(input, _path, true && _exceptionable);
                else if ($vo74(input, _path, false && _exceptionable))
                    return $vo74(input, _path, true && _exceptionable);
                else if ($vo75(input, _path, false && _exceptionable))
                    return $vo75(input, _path, true && _exceptionable);
                else if ($vo76(input, _path, false && _exceptionable))
                    return $vo76(input, _path, true && _exceptionable);
                else if ($vo77(input, _path, false && _exceptionable))
                    return $vo77(input, _path, true && _exceptionable);
                else if ($vo78(input, _path, false && _exceptionable))
                    return $vo78(input, _path, true && _exceptionable);
                else if ($vo79(input, _path, false && _exceptionable))
                    return $vo79(input, _path, true && _exceptionable);
                else if ($vo80(input, _path, false && _exceptionable))
                    return $vo80(input, _path, true && _exceptionable);
                else if ($vo81(input, _path, false && _exceptionable))
                    return $vo81(input, _path, true && _exceptionable);
                else if ($vo82(input, _path, false && _exceptionable))
                    return $vo82(input, _path, true && _exceptionable);
                else if ($vo83(input, _path, false && _exceptionable))
                    return $vo83(input, _path, true && _exceptionable);
                else if ($vo84(input, _path, false && _exceptionable))
                    return $vo84(input, _path, true && _exceptionable);
                else if ($vo85(input, _path, false && _exceptionable))
                    return $vo85(input, _path, true && _exceptionable);
                else if ($vo86(input, _path, false && _exceptionable))
                    return $vo86(input, _path, true && _exceptionable);
                else if ($vo87(input, _path, false && _exceptionable))
                    return $vo87(input, _path, true && _exceptionable);
                else if ($vo88(input, _path, false && _exceptionable))
                    return $vo88(input, _path, true && _exceptionable);
                else if ($vo89(input, _path, false && _exceptionable))
                    return $vo89(input, _path, true && _exceptionable);
                else if ($vo90(input, _path, false && _exceptionable))
                    return $vo90(input, _path, true && _exceptionable);
                else if ($vo91(input, _path, false && _exceptionable))
                    return $vo91(input, _path, true && _exceptionable);
                else if ($vo92(input, _path, false && _exceptionable))
                    return $vo92(input, _path, true && _exceptionable);
                else if ($vo93(input, _path, false && _exceptionable))
                    return $vo93(input, _path, true && _exceptionable);
                else if ($vo94(input, _path, false && _exceptionable))
                    return $vo94(input, _path, true && _exceptionable);
                else if ($vo95(input, _path, false && _exceptionable))
                    return $vo95(input, _path, true && _exceptionable);
                else if ($vo96(input, _path, false && _exceptionable))
                    return $vo96(input, _path, true && _exceptionable);
                else if ($vo97(input, _path, false && _exceptionable))
                    return $vo97(input, _path, true && _exceptionable);
                else if ($vo98(input, _path, false && _exceptionable))
                    return $vo98(input, _path, true && _exceptionable);
                else if ($vo99(input, _path, false && _exceptionable))
                    return $vo99(input, _path, true && _exceptionable);
                else if ($vo100(input, _path, false && _exceptionable))
                    return $vo100(input, _path, true && _exceptionable);
                else if ($vo101(input, _path, false && _exceptionable))
                    return $vo101(input, _path, true && _exceptionable);
                else
                    return $report(_exceptionable, {
                        path: _path,
                        expected: "(RequireTag & TagSelector & Scene | RequireTag & TagSelector & Action | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & Wait | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Random | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Action | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & Wait | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Random | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & RemoveTag | RequireTag & SelectorSelector & Scene | RequireTag & SelectorSelector & Action | RequireTag & SelectorSelector & Command | RequireTag & SelectorSelector & Menu | RequireTag & SelectorSelector & { if_has_tag: string; } & ThenElse | RequireTag & SelectorSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & SelectorSelector & Wait | RequireTag & SelectorSelector & Sequence | RequireTag & SelectorSelector & Sound | RequireTag & SelectorSelector & Random | RequireTag & SelectorSelector & ApplyTag | RequireTag & SelectorSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & RemoveTag)",
                        value: input
                    });
            })();
            const $vu3 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $vo102(input, _path, true && _exceptionable);
                else if (undefined !== input.action)
                    return $vo103(input, _path, true && _exceptionable);
                else if (undefined !== input.command)
                    return $vo104(input, _path, true && _exceptionable);
                else if (undefined !== input.menu)
                    return $vo105(input, _path, true && _exceptionable);
                else if (undefined !== input.if_has_tag)
                    return $vo106(input, _path, true && _exceptionable);
                else if (undefined !== input.if_has_item)
                    return $vo107(input, _path, true && _exceptionable);
                else if (undefined !== input.wait)
                    return $vo108(input, _path, true && _exceptionable);
                else if (undefined !== input.sequence)
                    return $vo109(input, _path, true && _exceptionable);
                else if (undefined !== input.sound)
                    return $vo110(input, _path, true && _exceptionable);
                else if (undefined !== input.random)
                    return $vo111(input, _path, true && _exceptionable);
                else if (undefined !== input.apply_tag)
                    return $vo112(input, _path, true && _exceptionable);
                else if (undefined !== input.remove_tag)
                    return $vo113(input, _path, true && _exceptionable);
                else
                    return $report(_exceptionable, {
                        path: _path,
                        expected: "({ equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { equals: string; } & RequireTag & { if_has_item: Partial<TagSelector & NameSelector & SelectorSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & RemoveTag)",
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
