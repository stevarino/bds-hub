/**
 * Simple functions with minimal requirements.
 */

/** 
 * Strips whitespace from the beginning and end of a stirng, and start of
 * each line. 
 */
export function strip(s: string) {
  return s.replace(/^\s+/, '').replace(/\s+$/, '').replace(/^[ \t]+/m, '');
}
