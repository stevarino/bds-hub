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
    dialogues?: string[];
}
;
export const assertConfigFile = (input: any): ConfigFile => {
    const __is = (input: any): input is ConfigFile => {
        const $join = (typia.createAssert as any).join;
        const $io0 = (input: any): boolean => (undefined === input.port || "number" === typeof input.port) && (undefined === input.host || "string" === typeof input.host) && (undefined === input.databaseFilename || "string" === typeof input.databaseFilename) && (undefined === input.discord || "object" === typeof input.discord && null !== input.discord && $io1(input.discord)) && (undefined === input.dialogues || Array.isArray(input.dialogues) && input.dialogues.every((elem: any) => "string" === typeof elem));
        const $io1 = (input: any): boolean => "string" === typeof input.token && "string" === typeof input.app_id && (Array.isArray(input.channels) && input.channels.every((elem: any) => "string" === typeof elem)) && (undefined === input.nick || "string" === typeof input.nick) && ("object" === typeof input.users && null !== input.users && false === Array.isArray(input.users) && $io2(input.users));
        const $io2 = (input: any): boolean => Object.keys(input).every((key: any) => {
            const value = input[key];
            if (undefined === value)
                return true;
            if (RegExp(/(.*)/).test(key))
                return "string" === typeof value;
            return true;
        });
        return "object" === typeof input && null !== input && false === Array.isArray(input) && $io0(input);
    };
    if (false === __is(input))
        ((input: any, _path: string, _exceptionable: boolean = true): input is ConfigFile => {
            const $guard = (typia.createAssert as any).guard;
            const $join = (typia.createAssert as any).join;
            const $ao0 = (input: any, _path: string, _exceptionable: boolean = true): boolean => (undefined === input.port || "number" === typeof input.port || $guard(_exceptionable, {
                path: _path + ".port",
                expected: "(number | undefined)",
                value: input.port
            })) && (undefined === input.host || "string" === typeof input.host || $guard(_exceptionable, {
                path: _path + ".host",
                expected: "(string | undefined)",
                value: input.host
            })) && (undefined === input.databaseFilename || "string" === typeof input.databaseFilename || $guard(_exceptionable, {
                path: _path + ".databaseFilename",
                expected: "(string | undefined)",
                value: input.databaseFilename
            })) && (undefined === input.discord || ("object" === typeof input.discord && null !== input.discord || $guard(_exceptionable, {
                path: _path + ".discord",
                expected: "(__type | undefined)",
                value: input.discord
            })) && $ao1(input.discord, _path + ".discord", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".discord",
                expected: "(__type | undefined)",
                value: input.discord
            })) && (undefined === input.dialogues || (Array.isArray(input.dialogues) || $guard(_exceptionable, {
                path: _path + ".dialogues",
                expected: "(Array<string> | undefined)",
                value: input.dialogues
            })) && input.dialogues.every((elem: any, _index1: number) => "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".dialogues[" + _index1 + "]",
                expected: "string",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".dialogues",
                expected: "(Array<string> | undefined)",
                value: input.dialogues
            }));
            const $ao1 = (input: any, _path: string, _exceptionable: boolean = true): boolean => ("string" === typeof input.token || $guard(_exceptionable, {
                path: _path + ".token",
                expected: "string",
                value: input.token
            })) && ("string" === typeof input.app_id || $guard(_exceptionable, {
                path: _path + ".app_id",
                expected: "string",
                value: input.app_id
            })) && ((Array.isArray(input.channels) || $guard(_exceptionable, {
                path: _path + ".channels",
                expected: "Array<string>",
                value: input.channels
            })) && input.channels.every((elem: any, _index2: number) => "string" === typeof elem || $guard(_exceptionable, {
                path: _path + ".channels[" + _index2 + "]",
                expected: "string",
                value: elem
            })) || $guard(_exceptionable, {
                path: _path + ".channels",
                expected: "Array<string>",
                value: input.channels
            })) && (undefined === input.nick || "string" === typeof input.nick || $guard(_exceptionable, {
                path: _path + ".nick",
                expected: "(string | undefined)",
                value: input.nick
            })) && (("object" === typeof input.users && null !== input.users && false === Array.isArray(input.users) || $guard(_exceptionable, {
                path: _path + ".users",
                expected: "__type.o1",
                value: input.users
            })) && $ao2(input.users, _path + ".users", true && _exceptionable) || $guard(_exceptionable, {
                path: _path + ".users",
                expected: "__type.o1",
                value: input.users
            }));
            const $ao2 = (input: any, _path: string, _exceptionable: boolean = true): boolean => false === _exceptionable || Object.keys(input).every((key: any) => {
                const value = input[key];
                if (undefined === value)
                    return true;
                if (RegExp(/(.*)/).test(key))
                    return "string" === typeof value || $guard(_exceptionable, {
                        path: _path + $join(key),
                        expected: "string",
                        value: value
                    });
                return true;
            });
            return ("object" === typeof input && null !== input && false === Array.isArray(input) || $guard(true, {
                path: _path + "",
                expected: "ConfigFile",
                value: input
            })) && $ao0(input, _path + "", true) || $guard(true, {
                path: _path + "",
                expected: "ConfigFile",
                value: input
            });
        })(input, "$input", true);
    return input;
};
