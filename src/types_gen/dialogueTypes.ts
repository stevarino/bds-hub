import typia from "typia";
import * as types from "../behavior_pack/src/types/packTypes.js";
export * from '../behavior_pack/src/types/packTypes.js';
export interface Scene {
    id: string;
    text: string;
    npc_name?: string;
    /**
     * @minItems 1
     * @maxItems 6
     */
    buttons: types.Button[];
    // internal variable - marks if the scene is an initial scene
    _entrayPoint?: boolean;
}
export interface DialogueFile {
    actors?: types.Actor[];
    scenes?: Scene[];
    items?: types.ItemUse[];
    chats?: types.Chat[];
    actions?: types.TransitionMap;
}
export interface ScriptFile {
    actions: types.TransitionMap;
    actors: types.SuperActor[];
    items: types.SuperItemUse[];
    chats: types.Chat[];
}
export const assertDialogueFile = (input: any): DialogueFile => {
    const __is = (input: any): input is DialogueFile => {
        const $join = (typia.createAssert as any).join;
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any) => "object" === typeof elem && null !== elem && $iu2(elem))) && (undefined === input.chats || Array.isArray(input.chats) && input.chats.every((elem: any) => "object" === typeof elem && null !== elem && $iu3(elem))) && (undefined === input.actions || "object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) && $io81(input.actions));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.name;
        const $io4 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.npc_name || "string" === typeof input.npc_name) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io5 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene;
        const $io6 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io7 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io8 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command;
        const $io9 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io10 = (input: any): boolean => "string" === typeof input.title && (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io11 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io12 = (input: any): boolean => (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io10(input.menu)) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag) && (undefined === input.then || "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && (undefined === input["else"] || "object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"])) && (undefined === input.if_has_item || "object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && (undefined === input.wait || "number" === typeof input.wait) && (undefined === input.sequence || Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.sound || "string" === typeof input.sound) && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume) && (undefined === input.random || Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem)) && (undefined === input.apply_tag || "string" === typeof input.apply_tag) && (undefined === input.remove_tag || "string" === typeof input.remove_tag);
        const $io13 = (input: any): boolean => (undefined === input.name || "string" === typeof input.name) && (undefined === input.lore || Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && (undefined === input.item_type || "string" === typeof input.item_type);
        const $io14 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io15 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait;
        const $io16 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io17 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io18 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io19 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag;
        const $io20 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag;
        const $io21 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.scene;
        const $io22 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io23 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.command;
        const $io24 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io25 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io26 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io27 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "number" === typeof input.wait;
        const $io28 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io29 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io30 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io31 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.apply_tag;
        const $io32 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.remove_tag;
        const $io33 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.scene;
        const $io34 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io35 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.command;
        const $io36 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io37 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io38 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io39 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "number" === typeof input.wait;
        const $io40 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io41 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io42 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io43 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.apply_tag;
        const $io44 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.remove_tag;
        const $io45 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.scene;
        const $io46 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io47 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.command;
        const $io48 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io49 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io50 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io51 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "number" === typeof input.wait;
        const $io52 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io53 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io54 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io55 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.apply_tag;
        const $io56 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.remove_tag;
        const $io57 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.scene;
        const $io58 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io59 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.command;
        const $io60 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io61 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io62 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io63 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "number" === typeof input.wait;
        const $io64 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io65 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io66 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io67 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.apply_tag;
        const $io68 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.remove_tag;
        const $io69 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene;
        const $io70 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io71 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command;
        const $io72 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io73 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io74 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io75 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait;
        const $io76 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io77 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io78 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io79 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag;
        const $io80 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag;
        const $io81 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "object" === typeof value && null !== value && false === Array.isArray(value) && $io12(value);
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
            if (undefined !== input.if_has_tag)
                return $io11(input);
            if (undefined !== input.if_has_item)
                return $io14(input);
            if (undefined !== input.wait)
                return $io15(input);
            if (undefined !== input.sequence)
                return $io16(input);
            if (undefined !== input.sound)
                return $io17(input);
            if (undefined !== input.random)
                return $io18(input);
            if (undefined !== input.apply_tag)
                return $io19(input);
            if (undefined !== input.remove_tag)
                return $io20(input);
            return false;
        })();
        const $iu2 = (input: any): any => (() => {
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
            if ($io27(input))
                return $io27(input);
            if ($io28(input))
                return $io28(input);
            if ($io29(input))
                return $io29(input);
            if ($io30(input))
                return $io30(input);
            if ($io31(input))
                return $io31(input);
            if ($io32(input))
                return $io32(input);
            if ($io33(input))
                return $io33(input);
            if ($io34(input))
                return $io34(input);
            if ($io35(input))
                return $io35(input);
            if ($io36(input))
                return $io36(input);
            if ($io37(input))
                return $io37(input);
            if ($io38(input))
                return $io38(input);
            if ($io39(input))
                return $io39(input);
            if ($io40(input))
                return $io40(input);
            if ($io41(input))
                return $io41(input);
            if ($io42(input))
                return $io42(input);
            if ($io43(input))
                return $io43(input);
            if ($io44(input))
                return $io44(input);
            if ($io45(input))
                return $io45(input);
            if ($io46(input))
                return $io46(input);
            if ($io47(input))
                return $io47(input);
            if ($io48(input))
                return $io48(input);
            if ($io49(input))
                return $io49(input);
            if ($io50(input))
                return $io50(input);
            if ($io51(input))
                return $io51(input);
            if ($io52(input))
                return $io52(input);
            if ($io53(input))
                return $io53(input);
            if ($io54(input))
                return $io54(input);
            if ($io55(input))
                return $io55(input);
            if ($io56(input))
                return $io56(input);
            if ($io57(input))
                return $io57(input);
            if ($io58(input))
                return $io58(input);
            if ($io59(input))
                return $io59(input);
            if ($io60(input))
                return $io60(input);
            if ($io61(input))
                return $io61(input);
            if ($io62(input))
                return $io62(input);
            if ($io63(input))
                return $io63(input);
            if ($io64(input))
                return $io64(input);
            if ($io65(input))
                return $io65(input);
            if ($io66(input))
                return $io66(input);
            if ($io67(input))
                return $io67(input);
            if ($io68(input))
                return $io68(input);
            return false;
        })();
        const $iu3 = (input: any): any => (() => {
            if (undefined !== input.scene)
                return $io69(input);
            if (undefined !== input.action)
                return $io70(input);
            if (undefined !== input.command)
                return $io71(input);
            if (undefined !== input.menu)
                return $io72(input);
            if (undefined !== input.if_has_tag)
                return $io73(input);
            if (undefined !== input.if_has_item)
                return $io74(input);
            if (undefined !== input.wait)
                return $io75(input);
            if (undefined !== input.sequence)
                return $io76(input);
            if (undefined !== input.sound)
                return $io77(input);
            if (undefined !== input.random)
                return $io78(input);
            if (undefined !== input.apply_tag)
                return $io79(input);
            if (undefined !== input.remove_tag)
                return $io80(input);
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
                expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
            })) && (undefined === input.chats || (Array.isArray(input.chats) || $guard(_exceptionable, {
                path: _path + ".chats",
                expected: "(Array<Chat> | undefined)",
                value: input.chats
            })) && input.chats.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".chats[" + _index4 + "]",
                expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au3(elem, _path + ".chats[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".chats[" + _index4 + "]",
                expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".chats",
                expected: "(Array<Chat> | undefined)",
                value: input.chats
            })) && (undefined === input.actions || ("object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) || $guard(_exceptionable, {
                path: _path + ".actions",
                expected: "(TransitionMap | undefined)",
                value: input.actions
            })) && $ao81(input.actions, _path + ".actions", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actions",
                expected: "(TransitionMap | undefined)",
                value: input.actions
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
            })) && (undefined === input.npc_name || "string" === typeof input.npc_name || $guard(_exceptionable, {
                path: _path + ".npc_name",
                expected: "(string | undefined)",
                value: input.npc_name
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
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
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
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            })) && input.buttons.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index6 + "]",
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index6 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index6 + "]",
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
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
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.scene || "string" === typeof input.scene || $guard(_exceptionable, {
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
            })) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "(string | undefined)",
                value: input.if_has_tag
            })) && (undefined === input.then || ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input.then
            })) && (undefined === input["else"] || ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input["else"]
            })) && (undefined === input.if_has_item || ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "(Partial<NameSelector & LoreSelector & ItemTypeSelector> | undefined)",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "(Partial<NameSelector & LoreSelector & ItemTypeSelector> | undefined)",
                value: input.if_has_item
            })) && (undefined === input.wait || "number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "(number | undefined)",
                value: input.wait
            })) && (undefined === input.sequence || (Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index7: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index7 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index7 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index7 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.sequence
            })) && (undefined === input.sound || "string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "(string | undefined)",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            })) && (undefined === input.random || (Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.random
            })) && input.random.every((elem: any, _index8: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index8 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index8 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index8 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index9: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index9 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && (undefined === input.apply_tag || "string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "(string | undefined)",
                value: input.apply_tag
            })) && (undefined === input.remove_tag || "string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "(string | undefined)",
                value: input.remove_tag
            }));
            const $ao13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.name || "string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "(string | undefined)",
                value: input.name
            })) && (undefined === input.lore || (Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "(Array<string | null> | undefined)",
                value: input.lore
            })) && input.lore.every((elem: any, _index10: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index10 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "(Array<string | null> | undefined)",
                value: input.lore
            })) && (undefined === input.item_type || "string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "(string | undefined)",
                value: input.item_type
            }));
            const $ao14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index11: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index11 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index11 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index11 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao17 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao18 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index12: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index12 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index12 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index12 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index13: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index13 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao19 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao20 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao21 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao22 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao23 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao24 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao25 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao26 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao27 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao28 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index14: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index14 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index14 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index14 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao29 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao30 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index15: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index15 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index15 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index15 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index16: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index16 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao31 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao32 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao33 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao34 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao35 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao36 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao37 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao38 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao39 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao40 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index17: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index17 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index17 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index17 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao41 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao42 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index18: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index18 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index18 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index18 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index19: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index19 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao43 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao44 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao45 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index20: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index20 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao46 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index21: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index21 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
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
            const $ao47 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index22: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index22 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao48 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index23: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index23 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao49 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index24: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index24 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao50 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index25: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index25 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao51 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index26: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index26 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao52 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index27: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index27 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index28: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index28 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index28 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index28 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao53 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index29: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index29 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao54 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index30: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index30 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index31: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index31 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index31 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index31 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index32: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index32 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao55 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index33: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index33 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao56 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index34: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index34 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao57 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao58 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
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
            const $ao59 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao60 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao61 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao62 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao63 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao64 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index35: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index35 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index35 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index35 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao65 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao66 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index36: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index36 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index36 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index36 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index37: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index37 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao67 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao68 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao69 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao70 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao71 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao72 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao73 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao74 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao75 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao76 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index38: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index38 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index38 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index38 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao77 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao78 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index39: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index39 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index39 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index39 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index40: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index40 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao79 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao80 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao81 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return ("object" === typeof value && null !== value && false === Array.isArray(value) || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                        value: value
                    })) && $ao12(value, _path + $join(key), true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
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
                if (undefined !== input.if_has_tag)
                    return $ao11(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_item)
                    return $ao14(input, _path, true && _exceptionable);
                if (undefined !== input.wait)
                    return $ao15(input, _path, true && _exceptionable);
                if (undefined !== input.sequence)
                    return $ao16(input, _path, true && _exceptionable);
                if (undefined !== input.sound)
                    return $ao17(input, _path, true && _exceptionable);
                if (undefined !== input.random)
                    return $ao18(input, _path, true && _exceptionable);
                if (undefined !== input.apply_tag)
                    return $ao19(input, _path, true && _exceptionable);
                if (undefined !== input.remove_tag)
                    return $ao20(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Action | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & RemoveTag)",
                    value: input
                });
            })();
            const $au2 = (input: any, _path: string, _exceptionable: boolean = true): any => $ao21(input, _path, false && _exceptionable) || $ao22(input, _path, false && _exceptionable) || $ao23(input, _path, false && _exceptionable) || $ao24(input, _path, false && _exceptionable) || $ao25(input, _path, false && _exceptionable) || $ao26(input, _path, false && _exceptionable) || $ao27(input, _path, false && _exceptionable) || $ao28(input, _path, false && _exceptionable) || $ao29(input, _path, false && _exceptionable) || $ao30(input, _path, false && _exceptionable) || $ao31(input, _path, false && _exceptionable) || $ao32(input, _path, false && _exceptionable) || $ao33(input, _path, false && _exceptionable) || $ao34(input, _path, false && _exceptionable) || $ao35(input, _path, false && _exceptionable) || $ao36(input, _path, false && _exceptionable) || $ao37(input, _path, false && _exceptionable) || $ao38(input, _path, false && _exceptionable) || $ao39(input, _path, false && _exceptionable) || $ao40(input, _path, false && _exceptionable) || $ao41(input, _path, false && _exceptionable) || $ao42(input, _path, false && _exceptionable) || $ao43(input, _path, false && _exceptionable) || $ao44(input, _path, false && _exceptionable) || $ao45(input, _path, false && _exceptionable) || $ao46(input, _path, false && _exceptionable) || $ao47(input, _path, false && _exceptionable) || $ao48(input, _path, false && _exceptionable) || $ao49(input, _path, false && _exceptionable) || $ao50(input, _path, false && _exceptionable) || $ao51(input, _path, false && _exceptionable) || $ao52(input, _path, false && _exceptionable) || $ao53(input, _path, false && _exceptionable) || $ao54(input, _path, false && _exceptionable) || $ao55(input, _path, false && _exceptionable) || $ao56(input, _path, false && _exceptionable) || $ao57(input, _path, false && _exceptionable) || $ao58(input, _path, false && _exceptionable) || $ao59(input, _path, false && _exceptionable) || $ao60(input, _path, false && _exceptionable) || $ao61(input, _path, false && _exceptionable) || $ao62(input, _path, false && _exceptionable) || $ao63(input, _path, false && _exceptionable) || $ao64(input, _path, false && _exceptionable) || $ao65(input, _path, false && _exceptionable) || $ao66(input, _path, false && _exceptionable) || $ao67(input, _path, false && _exceptionable) || $ao68(input, _path, false && _exceptionable) || $guard(_exceptionable, {
                path: _path,
                expected: "(RequireTag & TagSelector & Scene | RequireTag & TagSelector & Action | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & Wait | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Random | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Action | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & Wait | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Random | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & RemoveTag)",
                value: input
            });
            const $au3 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $ao69(input, _path, true && _exceptionable);
                if (undefined !== input.action)
                    return $ao70(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao71(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $ao72(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_tag)
                    return $ao73(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_item)
                    return $ao74(input, _path, true && _exceptionable);
                if (undefined !== input.wait)
                    return $ao75(input, _path, true && _exceptionable);
                if (undefined !== input.sequence)
                    return $ao76(input, _path, true && _exceptionable);
                if (undefined !== input.sound)
                    return $ao77(input, _path, true && _exceptionable);
                if (undefined !== input.random)
                    return $ao78(input, _path, true && _exceptionable);
                if (undefined !== input.apply_tag)
                    return $ao79(input, _path, true && _exceptionable);
                if (undefined !== input.remove_tag)
                    return $ao80(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & RemoveTag)",
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
        const $io0 = (input: any): boolean => (undefined === input.actors || Array.isArray(input.actors) && input.actors.every((elem: any) => "object" === typeof elem && null !== elem && $iu0(elem))) && (undefined === input.scenes || Array.isArray(input.scenes) && input.scenes.every((elem: any) => "object" === typeof elem && null !== elem && $io4(elem))) && (undefined === input.items || Array.isArray(input.items) && input.items.every((elem: any) => "object" === typeof elem && null !== elem && $iu2(elem))) && (undefined === input.chats || Array.isArray(input.chats) && input.chats.every((elem: any) => "object" === typeof elem && null !== elem && $iu3(elem))) && (undefined === input.actions || "object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) && $io81(input.actions));
        const $io1 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.tag;
        const $io2 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.selector;
        const $io3 = (input: any): boolean => "string" === typeof input.scene && "string" === typeof input.name;
        const $io4 = (input: any): boolean => "string" === typeof input.id && "string" === typeof input.text && (undefined === input.npc_name || "string" === typeof input.npc_name) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem))) && (undefined === input._entrayPoint || "boolean" === typeof input._entrayPoint);
        const $io5 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene;
        const $io6 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io7 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return true;
            return true;
        });
        const $io8 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command;
        const $io9 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io10 = (input: any): boolean => "string" === typeof input.title && (undefined === input.body || "string" === typeof input.body) && (Array.isArray(input.buttons) && 1 <= input.buttons.length && 6 >= input.buttons.length && input.buttons.every((elem: any) => "object" === typeof elem && null !== elem && $iu1(elem)));
        const $io11 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io12 = (input: any): boolean => (undefined === input.scene || "string" === typeof input.scene) && (undefined === input.action || "string" === typeof input.action) && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args)) && (undefined === input.command || "string" === typeof input.command) && (undefined === input.menu || "object" === typeof input.menu && null !== input.menu && $io10(input.menu)) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag) && (undefined === input.then || "object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && (undefined === input["else"] || "object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"])) && (undefined === input.if_has_item || "object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && (undefined === input.wait || "number" === typeof input.wait) && (undefined === input.sequence || Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.sound || "string" === typeof input.sound) && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume) && (undefined === input.random || Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem)) && (undefined === input.apply_tag || "string" === typeof input.apply_tag) && (undefined === input.remove_tag || "string" === typeof input.remove_tag);
        const $io13 = (input: any): boolean => (undefined === input.name || "string" === typeof input.name) && (undefined === input.lore || Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && (undefined === input.item_type || "string" === typeof input.item_type);
        const $io14 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io15 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait;
        const $io16 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io17 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io18 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io19 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag;
        const $io20 = (input: any): boolean => "string" === typeof input.text && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag;
        const $io21 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.scene;
        const $io22 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io23 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.command;
        const $io24 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io25 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io26 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io27 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "number" === typeof input.wait;
        const $io28 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io29 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io30 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io31 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.apply_tag;
        const $io32 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.tag && "string" === typeof input.remove_tag;
        const $io33 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.scene;
        const $io34 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io35 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.command;
        const $io36 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io37 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io38 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io39 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "number" === typeof input.wait;
        const $io40 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io41 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io42 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io43 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.apply_tag;
        const $io44 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.name && "string" === typeof input.remove_tag;
        const $io45 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.scene;
        const $io46 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io47 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.command;
        const $io48 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io49 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io50 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io51 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "number" === typeof input.wait;
        const $io52 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io53 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io54 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io55 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.apply_tag;
        const $io56 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.lore) && input.lore.every((elem: any) => null === elem || "string" === typeof elem)) && "string" === typeof input.remove_tag;
        const $io57 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.scene;
        const $io58 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io59 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.command;
        const $io60 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io61 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io62 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io63 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "number" === typeof input.wait;
        const $io64 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io65 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io66 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io67 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.apply_tag;
        const $io68 = (input: any): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.item_type && "string" === typeof input.remove_tag;
        const $io69 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.scene;
        const $io70 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.action && (undefined === input.args || "object" === typeof input.args && null !== input.args && false === Array.isArray(input.args) && $io7(input.args));
        const $io71 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.command;
        const $io72 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.menu && null !== input.menu && $io10(input.menu));
        const $io73 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.if_has_tag && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io74 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) && $io13(input.if_has_item)) && ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) && $io12(input.then)) && ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) && $io12(input["else"]));
        const $io75 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "number" === typeof input.wait;
        const $io76 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.sequence) && input.sequence.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem)));
        const $io77 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.sound && (undefined === input.volume || "number" === typeof input.volume) && (undefined === input.pitch || "number" === typeof input.pitch) && (undefined === input.minVolume || "number" === typeof input.minVolume);
        const $io78 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && (Array.isArray(input.random) && 2 <= input.random.length && input.random.every((elem: any) => "object" === typeof elem && null !== elem && false === Array.isArray(elem) && $io12(elem))) && (undefined === input.weights || Array.isArray(input.weights) && input.weights.every((elem: any) => "number" === typeof elem));
        const $io79 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.apply_tag;
        const $io80 = (input: any): boolean => "string" === typeof input.equals && (undefined === input.require_tag || "string" === typeof input.require_tag) && "string" === typeof input.remove_tag;
        const $io81 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "object" === typeof value && null !== value && false === Array.isArray(value) && $io12(value);
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
            if (undefined !== input.if_has_tag)
                return $io11(input);
            if (undefined !== input.if_has_item)
                return $io14(input);
            if (undefined !== input.wait)
                return $io15(input);
            if (undefined !== input.sequence)
                return $io16(input);
            if (undefined !== input.sound)
                return $io17(input);
            if (undefined !== input.random)
                return $io18(input);
            if (undefined !== input.apply_tag)
                return $io19(input);
            if (undefined !== input.remove_tag)
                return $io20(input);
            return false;
        })();
        const $iu2 = (input: any): any => (() => {
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
            if ($io27(input))
                return $io27(input);
            if ($io28(input))
                return $io28(input);
            if ($io29(input))
                return $io29(input);
            if ($io30(input))
                return $io30(input);
            if ($io31(input))
                return $io31(input);
            if ($io32(input))
                return $io32(input);
            if ($io33(input))
                return $io33(input);
            if ($io34(input))
                return $io34(input);
            if ($io35(input))
                return $io35(input);
            if ($io36(input))
                return $io36(input);
            if ($io37(input))
                return $io37(input);
            if ($io38(input))
                return $io38(input);
            if ($io39(input))
                return $io39(input);
            if ($io40(input))
                return $io40(input);
            if ($io41(input))
                return $io41(input);
            if ($io42(input))
                return $io42(input);
            if ($io43(input))
                return $io43(input);
            if ($io44(input))
                return $io44(input);
            if ($io45(input))
                return $io45(input);
            if ($io46(input))
                return $io46(input);
            if ($io47(input))
                return $io47(input);
            if ($io48(input))
                return $io48(input);
            if ($io49(input))
                return $io49(input);
            if ($io50(input))
                return $io50(input);
            if ($io51(input))
                return $io51(input);
            if ($io52(input))
                return $io52(input);
            if ($io53(input))
                return $io53(input);
            if ($io54(input))
                return $io54(input);
            if ($io55(input))
                return $io55(input);
            if ($io56(input))
                return $io56(input);
            if ($io57(input))
                return $io57(input);
            if ($io58(input))
                return $io58(input);
            if ($io59(input))
                return $io59(input);
            if ($io60(input))
                return $io60(input);
            if ($io61(input))
                return $io61(input);
            if ($io62(input))
                return $io62(input);
            if ($io63(input))
                return $io63(input);
            if ($io64(input))
                return $io64(input);
            if ($io65(input))
                return $io65(input);
            if ($io66(input))
                return $io66(input);
            if ($io67(input))
                return $io67(input);
            if ($io68(input))
                return $io68(input);
            return false;
        })();
        const $iu3 = (input: any): any => (() => {
            if (undefined !== input.scene)
                return $io69(input);
            if (undefined !== input.action)
                return $io70(input);
            if (undefined !== input.command)
                return $io71(input);
            if (undefined !== input.menu)
                return $io72(input);
            if (undefined !== input.if_has_tag)
                return $io73(input);
            if (undefined !== input.if_has_item)
                return $io74(input);
            if (undefined !== input.wait)
                return $io75(input);
            if (undefined !== input.sequence)
                return $io76(input);
            if (undefined !== input.sound)
                return $io77(input);
            if (undefined !== input.random)
                return $io78(input);
            if (undefined !== input.apply_tag)
                return $io79(input);
            if (undefined !== input.remove_tag)
                return $io80(input);
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
                expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au2(elem, _path + ".items[" + _index3 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".items[" + _index3 + "]",
                expected: "(RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & Action | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & Random | RequireTag & NameSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Wait | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & Action | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & Random | RequireTag & TagSelector & RemoveTag | RequireTag & TagSelector & Scene | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Wait | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".items",
                expected: "(Array<ItemUse> | undefined)",
                value: input.items
            })) && (undefined === input.chats || (Array.isArray(input.chats) || $guard(_exceptionable, {
                path: _path + ".chats",
                expected: "(Array<Chat> | undefined)",
                value: input.chats
            })) && input.chats.every((elem: any, _index4: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".chats[" + _index4 + "]",
                expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au3(elem, _path + ".chats[" + _index4 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".chats[" + _index4 + "]",
                expected: "({ equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & RemoveTag | { equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".chats",
                expected: "(Array<Chat> | undefined)",
                value: input.chats
            })) && (undefined === input.actions || ("object" === typeof input.actions && null !== input.actions && false === Array.isArray(input.actions) || $guard(_exceptionable, {
                path: _path + ".actions",
                expected: "(TransitionMap | undefined)",
                value: input.actions
            })) && $ao81(input.actions, _path + ".actions", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".actions",
                expected: "(TransitionMap | undefined)",
                value: input.actions
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
            })) && (undefined === input.npc_name || "string" === typeof input.npc_name || $guard(_exceptionable, {
                path: _path + ".npc_name",
                expected: "(string | undefined)",
                value: input.npc_name
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
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index5 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index5 + "]",
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
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
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao6 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao9 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            })) && input.buttons.every((elem: any, _index6: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index6 + "]",
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
                value: elem
            })) && $au1(elem, _path + ".buttons[" + _index6 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".buttons[" + _index6 + "]",
                expected: "({ text: string; } & RequireTag & Action | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & RemoveTag | { text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse)",
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
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao12 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.scene || "string" === typeof input.scene || $guard(_exceptionable, {
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
            })) && (undefined === input.if_has_tag || "string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "(string | undefined)",
                value: input.if_has_tag
            })) && (undefined === input.then || ("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input.then
            })) && (undefined === input["else"] || ("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "(Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag> | undefined)",
                value: input["else"]
            })) && (undefined === input.if_has_item || ("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "(Partial<NameSelector & LoreSelector & ItemTypeSelector> | undefined)",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "(Partial<NameSelector & LoreSelector & ItemTypeSelector> | undefined)",
                value: input.if_has_item
            })) && (undefined === input.wait || "number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "(number | undefined)",
                value: input.wait
            })) && (undefined === input.sequence || (Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index7: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index7 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index7 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index7 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.sequence
            })) && (undefined === input.sound || "string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "(string | undefined)",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            })) && (undefined === input.random || (Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.random
            })) && input.random.every((elem: any, _index8: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index8 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index8 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index8 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "(Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>> | undefined)",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index9: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index9 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && (undefined === input.apply_tag || "string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "(string | undefined)",
                value: input.apply_tag
            })) && (undefined === input.remove_tag || "string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "(string | undefined)",
                value: input.remove_tag
            }));
            const $ao13 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.name || "string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "(string | undefined)",
                value: input.name
            })) && (undefined === input.lore || (Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "(Array<string | null> | undefined)",
                value: input.lore
            })) && input.lore.every((elem: any, _index10: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index10 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "(Array<string | null> | undefined)",
                value: input.lore
            })) && (undefined === input.item_type || "string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "(string | undefined)",
                value: input.item_type
            }));
            const $ao14 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao15 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao16 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index11: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index11 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index11 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index11 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao17 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao18 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index12: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index12 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index12 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index12 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index13: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index13 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao19 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao20 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.text || $guard(_exceptionable, {
                path: _path + ".text",
                expected: "string",
                value: input.text
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao21 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao22 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao23 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao24 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao25 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao26 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao27 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao28 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index14: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index14 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index14 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index14 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao29 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao30 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index15: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index15 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index15 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index15 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index16: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index16 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao31 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao32 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.tag || $guard(_exceptionable, {
                path: _path + ".tag",
                expected: "string",
                value: input.tag
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao33 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao34 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao35 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao36 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao37 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao38 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao39 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao40 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index17: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index17 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index17 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index17 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao41 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao42 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index18: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index18 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index18 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index18 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index19: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index19 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao43 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao44 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao45 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index20: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index20 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao46 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index21: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index21 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
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
            const $ao47 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index22: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index22 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao48 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index23: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index23 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao49 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index24: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index24 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao50 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index25: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index25 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao51 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index26: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index26 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao52 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index27: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index27 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index28: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index28 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index28 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index28 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao53 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index29: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index29 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao54 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index30: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index30 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index31: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index31 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index31 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index31 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index32: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index32 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao55 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index33: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index33 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao56 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.lore) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && input.lore.every((elem: any, _index34: number) => null === elem || "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".lore[" + _index34 + "]",
                expected: "(null | string)",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".lore",
                expected: "Array<string | null>",
                value: input.lore
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao57 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao58 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
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
            const $ao59 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao60 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao61 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao62 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao63 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao64 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index35: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index35 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index35 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index35 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao65 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao66 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index36: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index36 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index36 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index36 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index37: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index37 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao67 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao68 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.item_type || $guard(_exceptionable, {
                path: _path + ".item_type",
                expected: "string",
                value: input.item_type
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao69 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.scene || $guard(_exceptionable, {
                path: _path + ".scene",
                expected: "string",
                value: input.scene
            }));
            const $ao70 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
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
            const $ao71 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.command || $guard(_exceptionable, {
                path: _path + ".command",
                expected: "string",
                value: input.command
            }));
            const $ao72 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && (("object" === typeof input.menu && null !== input.menu || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            })) && $ao10(input.menu, _path + ".menu", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".menu",
                expected: "MenuDetails",
                value: input.menu
            }));
            const $ao73 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.if_has_tag || $guard(_exceptionable, {
                path: _path + ".if_has_tag",
                expected: "string",
                value: input.if_has_tag
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao74 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && (("object" === typeof input.if_has_item && null !== input.if_has_item && false === Array.isArray(input.if_has_item) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && $ao13(input.if_has_item, _path + ".if_has_item", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".if_has_item",
                expected: "Partial<NameSelector & LoreSelector & ItemTypeSelector>",
                value: input.if_has_item
            })) && (("object" === typeof input.then && null !== input.then && false === Array.isArray(input.then) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && $ao12(input.then, _path + ".then", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".then",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input.then
            })) && (("object" === typeof input["else"] && null !== input["else"] && false === Array.isArray(input["else"]) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            })) && $ao12(input["else"], _path + "[\"else\"]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + "[\"else\"]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: input["else"]
            }));
            const $ao75 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("number" === typeof input.wait || $guard(_exceptionable, {
                path: _path + ".wait",
                expected: "number",
                value: input.wait
            }));
            const $ao76 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.sequence) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            })) && input.sequence.every((elem: any, _index38: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index38 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".sequence[" + _index38 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".sequence[" + _index38 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".sequence",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.sequence
            }));
            const $ao77 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.sound || $guard(_exceptionable, {
                path: _path + ".sound",
                expected: "string",
                value: input.sound
            })) && (undefined === input.volume || "number" === typeof input.volume || $guard(_exceptionable, {
                path: _path + ".volume",
                expected: "(number | undefined)",
                value: input.volume
            })) && (undefined === input.pitch || "number" === typeof input.pitch || $guard(_exceptionable, {
                path: _path + ".pitch",
                expected: "(number | undefined)",
                value: input.pitch
            })) && (undefined === input.minVolume || "number" === typeof input.minVolume || $guard(_exceptionable, {
                path: _path + ".minVolume",
                expected: "(number | undefined)",
                value: input.minVolume
            }));
            const $ao78 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ((Array.isArray(input.random) && (2 <= input.random.length || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array.length (@minItems 2)",
                value: input.random
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && input.random.every((elem: any, _index39: number) => ("object" === typeof elem && null !== elem && false === Array.isArray(elem) || $guard(_exceptionable, {
                path: _path + ".random[" + _index39 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) && $ao12(elem, _path + ".random[" + _index39 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".random[" + _index39 + "]",
                expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".random",
                expected: "Array<Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>>",
                value: input.random
            })) && (undefined === input.weights || (Array.isArray(input.weights) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            })) && input.weights.every((elem: any, _index40: number) => "number" === typeof elem || $guard(_exceptionable, {
                path: _path + ".weights[" + _index40 + "]",
                expected: "number",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".weights",
                expected: "(Array<number> | undefined)",
                value: input.weights
            }));
            const $ao79 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.apply_tag || $guard(_exceptionable, {
                path: _path + ".apply_tag",
                expected: "string",
                value: input.apply_tag
            }));
            const $ao80 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.equals || $guard(_exceptionable, {
                path: _path + ".equals",
                expected: "string",
                value: input.equals
            })) && (undefined === input.require_tag || "string" === typeof input.require_tag || $guard(_exceptionable, {
                path: _path + ".require_tag",
                expected: "(string | undefined)",
                value: input.require_tag
            })) && ("string" === typeof input.remove_tag || $guard(_exceptionable, {
                path: _path + ".remove_tag",
                expected: "string",
                value: input.remove_tag
            }));
            const $ao81 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return ("object" === typeof value && null !== value && false === Array.isArray(value) || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
                        value: value
                    })) && $ao12(value, _path + $join(key), true && _exceptionable) || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "Partial<Scene & Action & Command & Menu & { if_has_tag: string; } & ThenElse & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ... 5 more ... & RemoveTag>",
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
                if (undefined !== input.if_has_tag)
                    return $ao11(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_item)
                    return $ao14(input, _path, true && _exceptionable);
                if (undefined !== input.wait)
                    return $ao15(input, _path, true && _exceptionable);
                if (undefined !== input.sequence)
                    return $ao16(input, _path, true && _exceptionable);
                if (undefined !== input.sound)
                    return $ao17(input, _path, true && _exceptionable);
                if (undefined !== input.random)
                    return $ao18(input, _path, true && _exceptionable);
                if (undefined !== input.apply_tag)
                    return $ao19(input, _path, true && _exceptionable);
                if (undefined !== input.remove_tag)
                    return $ao20(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ text: string; } & RequireTag & Scene | { text: string; } & RequireTag & Action | { text: string; } & RequireTag & Command | { text: string; } & RequireTag & Menu | { text: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { text: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { text: string; } & RequireTag & Wait | { text: string; } & RequireTag & Sequence | { text: string; } & RequireTag & Sound | { text: string; } & RequireTag & Random | { text: string; } & RequireTag & ApplyTag | { text: string; } & RequireTag & RemoveTag)",
                    value: input
                });
            })();
            const $au2 = (input: any, _path: string, _exceptionable: boolean = true): any => $ao21(input, _path, false && _exceptionable) || $ao22(input, _path, false && _exceptionable) || $ao23(input, _path, false && _exceptionable) || $ao24(input, _path, false && _exceptionable) || $ao25(input, _path, false && _exceptionable) || $ao26(input, _path, false && _exceptionable) || $ao27(input, _path, false && _exceptionable) || $ao28(input, _path, false && _exceptionable) || $ao29(input, _path, false && _exceptionable) || $ao30(input, _path, false && _exceptionable) || $ao31(input, _path, false && _exceptionable) || $ao32(input, _path, false && _exceptionable) || $ao33(input, _path, false && _exceptionable) || $ao34(input, _path, false && _exceptionable) || $ao35(input, _path, false && _exceptionable) || $ao36(input, _path, false && _exceptionable) || $ao37(input, _path, false && _exceptionable) || $ao38(input, _path, false && _exceptionable) || $ao39(input, _path, false && _exceptionable) || $ao40(input, _path, false && _exceptionable) || $ao41(input, _path, false && _exceptionable) || $ao42(input, _path, false && _exceptionable) || $ao43(input, _path, false && _exceptionable) || $ao44(input, _path, false && _exceptionable) || $ao45(input, _path, false && _exceptionable) || $ao46(input, _path, false && _exceptionable) || $ao47(input, _path, false && _exceptionable) || $ao48(input, _path, false && _exceptionable) || $ao49(input, _path, false && _exceptionable) || $ao50(input, _path, false && _exceptionable) || $ao51(input, _path, false && _exceptionable) || $ao52(input, _path, false && _exceptionable) || $ao53(input, _path, false && _exceptionable) || $ao54(input, _path, false && _exceptionable) || $ao55(input, _path, false && _exceptionable) || $ao56(input, _path, false && _exceptionable) || $ao57(input, _path, false && _exceptionable) || $ao58(input, _path, false && _exceptionable) || $ao59(input, _path, false && _exceptionable) || $ao60(input, _path, false && _exceptionable) || $ao61(input, _path, false && _exceptionable) || $ao62(input, _path, false && _exceptionable) || $ao63(input, _path, false && _exceptionable) || $ao64(input, _path, false && _exceptionable) || $ao65(input, _path, false && _exceptionable) || $ao66(input, _path, false && _exceptionable) || $ao67(input, _path, false && _exceptionable) || $ao68(input, _path, false && _exceptionable) || $guard(_exceptionable, {
                path: _path,
                expected: "(RequireTag & TagSelector & Scene | RequireTag & TagSelector & Action | RequireTag & TagSelector & Command | RequireTag & TagSelector & Menu | RequireTag & TagSelector & { if_has_tag: string; } & ThenElse | RequireTag & TagSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & TagSelector & Wait | RequireTag & TagSelector & Sequence | RequireTag & TagSelector & Sound | RequireTag & TagSelector & Random | RequireTag & TagSelector & ApplyTag | RequireTag & TagSelector & RemoveTag | RequireTag & NameSelector & Scene | RequireTag & NameSelector & Action | RequireTag & NameSelector & Command | RequireTag & NameSelector & Menu | RequireTag & NameSelector & { if_has_tag: string; } & ThenElse | RequireTag & NameSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & NameSelector & Wait | RequireTag & NameSelector & Sequence | RequireTag & NameSelector & Sound | RequireTag & NameSelector & Random | RequireTag & NameSelector & ApplyTag | RequireTag & NameSelector & RemoveTag | RequireTag & LoreSelector & Scene | RequireTag & LoreSelector & Action | RequireTag & LoreSelector & Command | RequireTag & LoreSelector & Menu | RequireTag & LoreSelector & { if_has_tag: string; } & ThenElse | RequireTag & LoreSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & LoreSelector & Wait | RequireTag & LoreSelector & Sequence | RequireTag & LoreSelector & Sound | RequireTag & LoreSelector & Random | RequireTag & LoreSelector & ApplyTag | RequireTag & LoreSelector & RemoveTag | RequireTag & ItemTypeSelector & Scene | RequireTag & ItemTypeSelector & Action | RequireTag & ItemTypeSelector & Command | RequireTag & ItemTypeSelector & Menu | RequireTag & ItemTypeSelector & { if_has_tag: string; } & ThenElse | RequireTag & ItemTypeSelector & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | RequireTag & ItemTypeSelector & Wait | RequireTag & ItemTypeSelector & Sequence | RequireTag & ItemTypeSelector & Sound | RequireTag & ItemTypeSelector & Random | RequireTag & ItemTypeSelector & ApplyTag | RequireTag & ItemTypeSelector & RemoveTag)",
                value: input
            });
            const $au3 = (input: any, _path: string, _exceptionable: boolean = true): any => (() => {
                if (undefined !== input.scene)
                    return $ao69(input, _path, true && _exceptionable);
                if (undefined !== input.action)
                    return $ao70(input, _path, true && _exceptionable);
                if (undefined !== input.command)
                    return $ao71(input, _path, true && _exceptionable);
                if (undefined !== input.menu)
                    return $ao72(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_tag)
                    return $ao73(input, _path, true && _exceptionable);
                if (undefined !== input.if_has_item)
                    return $ao74(input, _path, true && _exceptionable);
                if (undefined !== input.wait)
                    return $ao75(input, _path, true && _exceptionable);
                if (undefined !== input.sequence)
                    return $ao76(input, _path, true && _exceptionable);
                if (undefined !== input.sound)
                    return $ao77(input, _path, true && _exceptionable);
                if (undefined !== input.random)
                    return $ao78(input, _path, true && _exceptionable);
                if (undefined !== input.apply_tag)
                    return $ao79(input, _path, true && _exceptionable);
                if (undefined !== input.remove_tag)
                    return $ao80(input, _path, true && _exceptionable);
                return $guard(_exceptionable, {
                    path: _path,
                    expected: "({ equals: string; } & RequireTag & Scene | { equals: string; } & RequireTag & Action | { equals: string; } & RequireTag & Command | { equals: string; } & RequireTag & Menu | { equals: string; } & RequireTag & { if_has_tag: string; } & ThenElse | { equals: string; } & RequireTag & { if_has_item: Partial<NameSelector & LoreSelector & ItemTypeSelector>; } & ThenElse | { equals: string; } & RequireTag & Wait | { equals: string; } & RequireTag & Sequence | { equals: string; } & RequireTag & Sound | { equals: string; } & RequireTag & Random | { equals: string; } & RequireTag & ApplyTag | { equals: string; } & RequireTag & RemoveTag)",
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
