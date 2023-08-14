import typia from "typia";
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
}
;
// export const assertConfigFile = typia.createAssert<ConfigFile>();
export const validateConfigFile = (input: any): typia.IValidation<ConfigFile> => {
    const errors = [] as any[];
    const __is = (input: any, _exceptionable: boolean = true): input is ConfigFile => {
        const $join = (typia.createValidateEquals as any).join;
        const $io0 = (input: any, _exceptionable: boolean = true): boolean => (undefined === input.port || "number" === typeof input.port) && (undefined === input.host || "string" === typeof input.host) && (undefined === input.databaseFilename || "string" === typeof input.databaseFilename) && (undefined === input.discord || "object" === typeof input.discord && null !== input.discord && $io1(input.discord, true && _exceptionable)) && (undefined === input.script_files || Array.isArray(input.script_files) && input.script_files.every((elem: any, _index1: number) => "string" === typeof elem)) && (0 === Object.keys(input).length || Object.keys(input).every((key: any) => {
            if (["port", "host", "databaseFilename", "discord", "script_files"].some((prop: any) => key === prop))
                return true;
            const value = input[key];
            if (undefined === value)
                return true;
            return false;
        }));
        const $io1 = (input: any, _exceptionable: boolean = true): boolean => "string" === typeof input.token && "string" === typeof input.app_id && (Array.isArray(input.channels) && input.channels.every((elem: any, _index2: number) => "string" === typeof elem)) && (undefined === input.nick || "string" === typeof input.nick) && ("object" === typeof input.users && null !== input.users && false === Array.isArray(input.users) && $io2(input.users, true && _exceptionable)) && (4 === Object.keys(input).length || Object.keys(input).every((key: any) => {
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
            if (RegExp(/(.*)/).test(key))
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
                }), 0 === Object.keys(input).length || (false === _exceptionable || Object.keys(input).map((key: any) => {
                    if (["port", "host", "databaseFilename", "discord", "script_files"].some((prop: any) => key === prop))
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
                })) && input.channels.map((elem: any, _index2: number) => "string" === typeof elem || $report(_exceptionable, {
                    path: _path + ".channels[" + _index2 + "]",
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
