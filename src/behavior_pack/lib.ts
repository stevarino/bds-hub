
import { variables } from "@minecraft/server-admin";
import * as mcnet from "@minecraft/server-net";

const HOST = variables.get('host');

export async function request<T=unknown>(
      endpoint: string, body?: string|object, headers?: Record<string, string>) {
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  const req = new mcnet.HttpRequest(HOST + endpoint);

  if (body !== undefined) req.setBody(body);
  if (headers !== undefined) {
    const headerObjs: mcnet.HttpHeader[] = [];
    for (const [k, v] of Object.entries(headers)) {
      headerObjs.push(new mcnet.HttpHeader(k, v));
    }
    req.setHeaders(headerObjs);
  }
  req.setTimeout(0.5);

  const res = await mcnet.http.request(req);
  if (res.status != 200) {  // 2147954429 on error?
    return;
  }
  return JSON.parse(res.body) as T;
}

export function padToWidth(str: string, pixels: number, char: string = ' ', padLeft: boolean=false) {
  // source: very inaccurate squinting....
  const orig = str;
  const charWidth: Record<string, number> = {
    'i': 2,
    'l': 3,
    'k': 4,
    't': 4,
    '.': 2,
    ',': 2,
  }
  const defaultWidth = 6;
  let total = 0;
  for (const c of str) {
    total += charWidth[c] ?? defaultWidth;
  }
  const origTotal = total;
  let i = 0;
  const delta = charWidth[char] ?? defaultWidth;
  while (total + delta <= pixels) {
    total += delta;
    str = padLeft ? char + str : str + char;
    i += 1;
  }
  return str;
}

