/**
 * State not sent to the server for storage
 */

/** if bot is online (fast-travable) */
export const NpcIsOnline: Record<string, boolean> = {};
/** if bot has been initiated */
export const NpcInitiated = new Set<string>();
/** scene to botId(s) mapping */
export const ActorBotMap: {[sceneHash: string]: string[]} = {};
