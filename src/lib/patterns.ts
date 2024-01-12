/**
 * patterns.ts - Common Regex patterns
 */

export const IntP = /[+-]?[0-9]+/;
export const NumP = /[+-]?[0-9]+(?:\.[0-9]+)?/;

export function RegExpJoin(parts: (string | RegExp)[], glue?: string | RegExp) {
  for (const [i, p] of parts.entries()) {
    if (p instanceof RegExp) {
      parts[i] = p.source;
    }
  }
  if (glue === undefined) {
    glue = '\\s*';
  } else if (glue instanceof RegExp) {
    glue = glue.source;
  }
  return new RegExp(parts.join(glue));
}

/**
 * Returns an object of named patterns, sans undefined values.
 */
export function matchNamed<T = string>(
  ptn: RegExp,
  str: string,
  map?: (match: string, key: string) => T,
) {
  const m = ptn.exec(str);
  if (m === null) return undefined;
  if (m.groups === undefined) return undefined;
  const rv: Record<string, T> = {};
  for (const [k, v] of Object.entries(m.groups)) {
    if (v === undefined) continue;
    rv[k] = (map === undefined ? v : map(v, k)) as T;
  }
  return rv;
}

/** Numeric Vector3 */
export const Vec3P = RegExpJoin([
  /^\[?/,
  `(?<x>${NumP.source})`,
  /,?/,
  `(?<y>${NumP.source})`,
  /,?/,
  `(?<z>${NumP.source})`,
  /\]?$/,
]);

/** Partial Vector3 */
export const Vec3pP = RegExpJoin([
  /^\[?/,
  `(?:X?|(?<x>${NumP.source}|))`,
  /,/,
  `(?:Y?|(?<y>${NumP.source}|))`,
  /,?/,
  `(?:Z?|(?<z>${NumP.source}|))`,
  /\]?|\s*$/,
]);

/** Integer Vector3 */
export const Vec3iP = RegExpJoin([
  /^\[?/,
  `(?<x>${IntP.source})`,
  /,?/,
  `(?<y>${IntP.source})`,
  /,?/,
  `(?<z>${IntP.source})`,
  /\]?$/,
]);

/** Relative Vector3: [~, ~5, ~] */
export const Vec3rP = RegExpJoin([
  /^\[?/,
  `(?<xr>~?)(?<x>(?:${NumP.source})?)`,
  /,?/,
  `(?<yr>~?)(?<y>(?:${NumP.source})?)`,
  /,?/,
  `(?<zr>~?)(?<z>(?:${NumP.source})?)`,
  /\]?$/,
]);

/** Optional Vector3 */
export const Vec3oP = RegExpJoin(['(', Vec3P, ')|^$'], '');

/** Vector2 */
export const Vec2P = RegExpJoin([
  /^\[?/,
  `(?<x>${NumP.source})`,
  /,?/,
  `(?<y>${NumP.source})`,
  /\]?$/,
]);

/** Optional Vector2 */
export const Vec2oP = RegExpJoin(['(', Vec2P, ')|^$'], '');

/** Partial Vector2 */
export const Vec2pP = RegExpJoin([
  /^\[?/,
  `(?:X?|(?<x>${NumP.source}|))`,
  /,/,
  `(?:Y?|(?<y>${NumP.source}|))`,
  /\]?|\s*$/,
]);
