import * as fs from "node:fs";
import typia from "typia";
export type Version = [
    number,
    number,
    number
];
function readAndParseJson<T>(parser: (input: string) => T) {
    return ((path: string) => {
        return parser(JSON.parse(fs.readFileSync(path, 'utf-8')));
    });
}
export interface ConfigFile {
    /** Port for server and add on */
    port?: number;
    /** Used to override add on requested domain, otherwise `127.0.0.1:{port}` */
    host?: string;
    databaseFilename?: string;
    discord?: {
        token: string;
        app_id: string;
        /** Channel URL */
        channels: string[];
        nick?: string;
        /** discord username to xbox gamertag */
        users: {
            [discordUsername: string]: string;
        };
    };
    // list of files to be included as dialogues (accepts json and yaml)
    script_files?: string[];
    // list of optiaonl addons to include.
    addons?: string[];
}
;
export const validateConfigFile = (input: any): typia.IValidation<ConfigFile> => {
    const errors = [] as any[];
    const __is = (input: any, _exceptionable: boolean = true): input is ConfigFile => {
        const $join = (typia.createValidateEquals as any).join;
        const $io0 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.port || "number" === typeof input.port) && (undefined === input.host || "string" === typeof input.host) && (undefined === input.databaseFilename || "string" === typeof input.databaseFilename) && (undefined === input.discord || "object" === typeof input.discord && null !== input.discord && $io1(input.discord, true && _exceptionable)) && (undefined === input.script_files || Array.isArray(input.script_files) && input.script_files.every((elem: any, _index1: number) => "string" === typeof elem)) && (undefined === input.addons || Array.isArray(input.addons) && input.addons.every((elem: any, _index2: number) => "string" === typeof elem)) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["port", "host", "databaseFilename", "discord", "script_files", "addons"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io1 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.token && "string" === typeof input.app_id && (Array.isArray(input.channels) && input.channels.every((elem: any, _index3: number) => "string" === typeof elem)) && (undefined === input.nick || "string" === typeof input.nick) && ("object" === typeof input.users && null !== input.users && false === Array.isArray(input.users) && $io2(input.users, true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["token", "app_id", "channels", "nick", "users"].some((prop: any) => key === prop))
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
            if (true)
                return "string" === typeof value;
            return false;
        });
        return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input, true);
    };
    if (false === __is(input)) {
        const $report = (typia.createValidateEquals as any).report(errors);
        ((input: any, _path: string, _exceptionable: boolean = true): input is ConfigFile => {
            const $join = (typia.createValidateEquals as any).join;
            const $vo0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => [undefined === input.port || "number" === typeof input.port || $report(_exceptionable, {
                    path: _path + ".port",
                    expected: "(number | undefined)",
                    value: input.port
                }), undefined === input.host || "string" === typeof input.host || $report(_exceptionable, {
                    path: _path + ".host",
                    expected: "(string | undefined)",
                    value: input.host
                }), undefined === input.databaseFilename || "string" === typeof input.databaseFilename || $report(_exceptionable, {
                    path: _path + ".databaseFilename",
                    expected: "(string | undefined)",
                    value: input.databaseFilename
                }), undefined === input.discord || ("object" === typeof input.discord && null !== input.discord || $report(_exceptionable, {
                    path: _path + ".discord",
                    expected: "(__type | undefined)",
                    value: input.discord
                })) && $vo1(input.discord, _path + ".discord", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".discord",
                    expected: "(__type | undefined)",
                    value: input.discord
                }), undefined === input.script_files || (Array.isArray(input.script_files) || $report(_exceptionable, {
                    path: _path + ".script_files",
                    expected: "(Array<string> | undefined)",
                    value: input.script_files
                })) && input.script_files.map((elem: any, _index1: number) => "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".script_files[" + _index1 + "]",
                    expected: "string",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".script_files",
                    expected: "(Array<string> | undefined)",
                    value: input.script_files
                }), undefined === input.addons || (Array.isArray(input.addons) || $report(_exceptionable, {
                    path: _path + ".addons",
                    expected: "(Array<string> | undefined)",
                    value: input.addons
                })) && input.addons.map((elem: any, _index2: number) => "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".addons[" + _index2 + "]",
                    expected: "string",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".addons",
                    expected: "(Array<string> | undefined)",
                    value: input.addons
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["port", "host", "databaseFilename", "discord", "script_files", "addons"].some((prop: any) => key === prop))
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
            const $vo1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ["string" === typeof input.token || $report(_exceptionable, {
                    path: _path + ".token",
                    expected: "string",
                    value: input.token
                }), "string" === typeof input.app_id || $report(_exceptionable, {
                    path: _path + ".app_id",
                    expected: "string",
                    value: input.app_id
                }), (Array.isArray(input.channels) || $report(_exceptionable, {
                    path: _path + ".channels",
                    expected: "Array<string>",
                    value: input.channels
                })) && input.channels.map((elem: any, _index3: number) => "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".channels[" + _index3 + "]",
                    expected: "string",
                    value: elem
                })).every((flag: boolean) => flag) || $report(_exceptionable, {
                    path: _path + ".channels",
                    expected: "Array<string>",
                    value: input.channels
                }), undefined === input.nick || "string" === typeof input.nick || $report(_exceptionable, {
                    path: _path + ".nick",
                    expected: "(string | undefined)",
                    value: input.nick
                }), ("object" === typeof input.users && null !== input.users && false === Array.isArray(input.users) || $report(_exceptionable, {
                    path: _path + ".users",
                    expected: "__type.o1",
                    value: input.users
                })) && $vo2(input.users, _path + ".users", true && _exceptionable) || $report(_exceptionable, {
                    path: _path + ".users",
                    expected: "__type.o1",
                    value: input.users
                }), 4 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["token", "app_id", "channels", "nick", "users"].some((prop: any) => key === prop))
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
                    if (true)
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
            return ("object" === typeof input && null !== input && false === Array.isArray(input) || $report(true, {
                path: _path + "",
                expected: "ConfigFile",
                value: input
            })) && $vo0(input, _path + "", true) || $report(true, {
                path: _path + "",
                expected: "ConfigFile",
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
/** Contains useful information about build state */
export interface BuildFile {
    bp_version: Version;
    bp_hash: string;
    rp_version: Version;
    rp_hash: string;
}
const parseBuildFile = (input: any): BuildFile => {
    const __is = (input: any): input is BuildFile => {
        const $io0 = (input: any): boolean => Array.isArray(input.bp_version) && (input.bp_version.length === 3 && "number" === typeof input.bp_version[0] && "number" === typeof input.bp_version[1] && "number" === typeof input.bp_version[2]) && "string" === typeof input.bp_hash && (Array.isArray(input.rp_version) && (input.rp_version.length === 3 && "number" === typeof input.rp_version[0] && "number" === typeof input.rp_version[1] && "number" === typeof input.rp_version[2])) && "string" === typeof input.rp_hash;
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is BuildFile => {
            const $guard = (typia.createAssert as any).guard;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ((Array.isArray(input.bp_version) || $guard(_exceptionable, {
                path: _path + ".bp_version",
                expected: "Version",
                value: input.bp_version
            })) && ((input.bp_version.length === 3 || $guard(_exceptionable, {
                path: _path + ".bp_version",
                expected: "[number, number, number]",
                value: input.bp_version
            })) && ("number" === typeof input.bp_version[0] || $guard(_exceptionable, {
                path: _path + ".bp_version[0]",
                expected: "number",
                value: input.bp_version[0]
            })) && ("number" === typeof input.bp_version[1] || $guard(_exceptionable, {
                path: _path + ".bp_version[1]",
                expected: "number",
                value: input.bp_version[1]
            })) && ("number" === typeof input.bp_version[2] || $guard(_exceptionable, {
                path: _path + ".bp_version[2]",
                expected: "number",
                value: input.bp_version[2]
            }))) || $guard(_exceptionable, {
                path: _path + ".bp_version",
                expected: "Version",
                value: input.bp_version
            })) && ("string" === typeof input.bp_hash || $guard(_exceptionable, {
                path: _path + ".bp_hash",
                expected: "string",
                value: input.bp_hash
            })) && ((Array.isArray(input.rp_version) || $guard(_exceptionable, {
                path: _path + ".rp_version",
                expected: "Version",
                value: input.rp_version
            })) && ((input.rp_version.length === 3 || $guard(_exceptionable, {
                path: _path + ".rp_version",
                expected: "[number, number, number]",
                value: input.rp_version
            })) && ("number" === typeof input.rp_version[0] || $guard(_exceptionable, {
                path: _path + ".rp_version[0]",
                expected: "number",
                value: input.rp_version[0]
            })) && ("number" === typeof input.rp_version[1] || $guard(_exceptionable, {
                path: _path + ".rp_version[1]",
                expected: "number",
                value: input.rp_version[1]
            })) && ("number" === typeof input.rp_version[2] || $guard(_exceptionable, {
                path: _path + ".rp_version[2]",
                expected: "number",
                value: input.rp_version[2]
            }))) || $guard(_exceptionable, {
                path: _path + ".rp_version",
                expected: "Version",
                value: input.rp_version
            })) && ("string" === typeof input.rp_hash || $guard(_exceptionable, {
                path: _path + ".rp_hash",
                expected: "string",
                value: input.rp_hash
            }));
            return ("object" === typeof input && null !== input || $guard(true, {
                path: _path + "",
                expected: "BuildFile",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "BuildFile",
                value: input
            });
        })(input, "$input", true);
    return input;
};
export const readBuildFile = readAndParseJson(parseBuildFile);
export interface ManifestFile {
    format_version: number;
    header: {
        name: string;
        description: string;
        uuid: string;
        version: Version;
        min_engine_version: Version;
    };
    modules: Array<{
        type: string;
        uuid: string;
        version: Version;
        language?: string;
        entry?: string;
        description?: string;
    }>;
    dependencies?: Array<{
        uuid?: string;
        module_name?: string;
        version: Version | string;
    }>;
}
const parseManifest = (input: any): ManifestFile => {
    const __is = (input: any): input is ManifestFile => {
        const $io0 = (input: any): boolean => "number" === typeof input.format_version && ("object" === typeof input.header && null !== input.header && $io1(input.header)) && (Array.isArray(input.modules) && input.modules.every((elem: any) => "object" === typeof elem && null !== elem && $io2(elem))) && (undefined === input.dependencies || Array.isArray(input.dependencies) && input.dependencies.every((elem: any) => "object" === typeof elem && null !== elem && $io3(elem)));
        const $io1 = (input: any): boolean => "string" === typeof input.name && "string" === typeof input.description && "string" === typeof input.uuid && (Array.isArray(input.version) && (input.version.length === 3 && "number" === typeof input.version[0] && "number" === typeof input.version[1] && "number" === typeof input.version[2])) && (Array.isArray(input.min_engine_version) && (input.min_engine_version.length === 3 && "number" === typeof input.min_engine_version[0] && "number" === typeof input.min_engine_version[1] && "number" === typeof input.min_engine_version[2]));
        const $io2 = (input: any): boolean => "string" === typeof input.type && "string" === typeof input.uuid && (Array.isArray(input.version) && (input.version.length === 3 && "number" === typeof input.version[0] && "number" === typeof input.version[1] && "number" === typeof input.version[2])) && (undefined === input.language || "string" === typeof input.language) && (undefined === input.entry || "string" === typeof input.entry) && (undefined === input.description || "string" === typeof input.description);
        const $io3 = (input: any): boolean => (undefined === input.uuid || "string" === typeof input.uuid) && (undefined === input.module_name || "string" === typeof input.module_name) && (null !== input.version && undefined !== input.version && ("string" === typeof input.version || Array.isArray(input.version) && (input.version.length === 3 && "number" === typeof input.version[0] && "number" === typeof input.version[1] && "number" === typeof input.version[2])));
        return "object" === typeof input && null !== input && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is ManifestFile => {
            const $guard = (typia.createAssert as any).guard;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("number" === typeof input.format_version || $guard(_exceptionable, {
                path: _path + ".format_version",
                expected: "number",
                value: input.format_version
            })) && (("object" === typeof input.header && null !== input.header || $guard(_exceptionable, {
                path: _path + ".header",
                expected: "__type",
                value: input.header
            })) && $ao1(input.header, _path + ".header", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".header",
                expected: "__type",
                value: input.header
            })) && ((Array.isArray(input.modules) || $guard(_exceptionable, {
                path: _path + ".modules",
                expected: "Array<__type>",
                value: input.modules
            })) && input.modules.every((elem: any, _index1: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".modules[" + _index1 + "]",
                expected: "__type.o1",
                value: elem
            })) && $ao2(elem, _path + ".modules[" + _index1 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".modules[" + _index1 + "]",
                expected: "__type.o1",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".modules",
                expected: "Array<__type>",
                value: input.modules
            })) && (undefined === input.dependencies || (Array.isArray(input.dependencies) || $guard(_exceptionable, {
                path: _path + ".dependencies",
                expected: "(Array<__type>.o1 | undefined)",
                value: input.dependencies
            })) && input.dependencies.every((elem: any, _index2: number) => ("object" === typeof elem && null !== elem || $guard(_exceptionable, {
                path: _path + ".dependencies[" + _index2 + "]",
                expected: "__type.o2",
                value: elem
            })) && $ao3(elem, _path + ".dependencies[" + _index2 + "]", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".dependencies[" + _index2 + "]",
                expected: "__type.o2",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".dependencies",
                expected: "(Array<__type>.o1 | undefined)",
                value: input.dependencies
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.name || $guard(_exceptionable, {
                path: _path + ".name",
                expected: "string",
                value: input.name
            })) && ("string" === typeof input.description || $guard(_exceptionable, {
                path: _path + ".description",
                expected: "string",
                value: input.description
            })) && ("string" === typeof input.uuid || $guard(_exceptionable, {
                path: _path + ".uuid",
                expected: "string",
                value: input.uuid
            })) && ((Array.isArray(input.version) || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "Version",
                value: input.version
            })) && ((input.version.length === 3 || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "[number, number, number]",
                value: input.version
            })) && ("number" === typeof input.version[0] || $guard(_exceptionable, {
                path: _path + ".version[0]",
                expected: "number",
                value: input.version[0]
            })) && ("number" === typeof input.version[1] || $guard(_exceptionable, {
                path: _path + ".version[1]",
                expected: "number",
                value: input.version[1]
            })) && ("number" === typeof input.version[2] || $guard(_exceptionable, {
                path: _path + ".version[2]",
                expected: "number",
                value: input.version[2]
            }))) || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "Version",
                value: input.version
            })) && ((Array.isArray(input.min_engine_version) || $guard(_exceptionable, {
                path: _path + ".min_engine_version",
                expected: "Version",
                value: input.min_engine_version
            })) && ((input.min_engine_version.length === 3 || $guard(_exceptionable, {
                path: _path + ".min_engine_version",
                expected: "[number, number, number]",
                value: input.min_engine_version
            })) && ("number" === typeof input.min_engine_version[0] || $guard(_exceptionable, {
                path: _path + ".min_engine_version[0]",
                expected: "number",
                value: input.min_engine_version[0]
            })) && ("number" === typeof input.min_engine_version[1] || $guard(_exceptionable, {
                path: _path + ".min_engine_version[1]",
                expected: "number",
                value: input.min_engine_version[1]
            })) && ("number" === typeof input.min_engine_version[2] || $guard(_exceptionable, {
                path: _path + ".min_engine_version[2]",
                expected: "number",
                value: input.min_engine_version[2]
            }))) || $guard(_exceptionable, {
                path: _path + ".min_engine_version",
                expected: "Version",
                value: input.min_engine_version
            }));
            const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.type || $guard(_exceptionable, {
                path: _path + ".type",
                expected: "string",
                value: input.type
            })) && ("string" === typeof input.uuid || $guard(_exceptionable, {
                path: _path + ".uuid",
                expected: "string",
                value: input.uuid
            })) && ((Array.isArray(input.version) || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "Version",
                value: input.version
            })) && ((input.version.length === 3 || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "[number, number, number]",
                value: input.version
            })) && ("number" === typeof input.version[0] || $guard(_exceptionable, {
                path: _path + ".version[0]",
                expected: "number",
                value: input.version[0]
            })) && ("number" === typeof input.version[1] || $guard(_exceptionable, {
                path: _path + ".version[1]",
                expected: "number",
                value: input.version[1]
            })) && ("number" === typeof input.version[2] || $guard(_exceptionable, {
                path: _path + ".version[2]",
                expected: "number",
                value: input.version[2]
            }))) || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "Version",
                value: input.version
            })) && (undefined === input.language || "string" === typeof input.language || $guard(_exceptionable, {
                path: _path + ".language",
                expected: "(string | undefined)",
                value: input.language
            })) && (undefined === input.entry || "string" === typeof input.entry || $guard(_exceptionable, {
                path: _path + ".entry",
                expected: "(string | undefined)",
                value: input.entry
            })) && (undefined === input.description || "string" === typeof input.description || $guard(_exceptionable, {
                path: _path + ".description",
                expected: "(string | undefined)",
                value: input.description
            }));
            const $ao3 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.uuid || "string" === typeof input.uuid || $guard(_exceptionable, {
                path: _path + ".uuid",
                expected: "(string | undefined)",
                value: input.uuid
            })) && (undefined === input.module_name || "string" === typeof input.module_name || $guard(_exceptionable, {
                path: _path + ".module_name",
                expected: "(string | undefined)",
                value: input.module_name
            })) && ((null !== input.version || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "(Version | string)",
                value: input.version
            })) && (undefined !== input.version || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "(Version | string)",
                value: input.version
            })) && ("string" === typeof input.version || (Array.isArray(input.version) || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "(Version | string)",
                value: input.version
            })) && ((input.version.length === 3 || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "[number, number, number]",
                value: input.version
            })) && ("number" === typeof input.version[0] || $guard(_exceptionable, {
                path: _path + ".version[0]",
                expected: "number",
                value: input.version[0]
            })) && ("number" === typeof input.version[1] || $guard(_exceptionable, {
                path: _path + ".version[1]",
                expected: "number",
                value: input.version[1]
            })) && ("number" === typeof input.version[2] || $guard(_exceptionable, {
                path: _path + ".version[2]",
                expected: "number",
                value: input.version[2]
            }))) || $guard(_exceptionable, {
                path: _path + ".version",
                expected: "(Version | string)",
                value: input.version
            })));
            return ("object" === typeof input && null !== input || $guard(true, {
                path: _path + "",
                expected: "ManifestFile",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "ManifestFile",
                value: input
            });
        })(input, "$input", true);
    return input;
};
export const readManifest = readAndParseJson(parseManifest);
export namespace MinecraftAssetFiles {
    export interface Entity {
        description: {
            identifier: string;
        };
        components?: {
            "minecraft:type_family"?: {
                family: string[];
            };
        };
    }
    ;
    export interface ClientEntity {
        description: {
            identifier: string;
            render_controllers: string[];
        };
    }
    ;
    export interface RenderContoller {
        render_controllers: {
            [key: string]: {
                arrays?: {
                    textures?: {
                        "Array.skins"?: string[];
                    };
                };
            };
        };
    }
    ;
}
export interface SceneFileScene {
    scene_tag: string;
    text: string | {
        rawtext: unknown[];
    };
    npc_name?: string;
    on_open_commands?: string[];
    on_close_commands?: string[];
    buttons: {
        name: string;
        commands: string[];
    }[];
}
export interface SceneFile {
    format_version: "1.17";
    "minecraft:npc_dialogue": {
        scenes: SceneFileScene[];
    };
}
