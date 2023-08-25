import { variables } from "@minecraft/server-admin";
import * as mcnet from "@minecraft/server-net";
import { Ctx } from "../types/requests";
export * from '../types/requests';

Ctx.listener = async (endpoint: string, req: object|undefined) => {
  return await _request(endpoint, req)
}

export const HOST = variables.get('host');

export async function _request<T = unknown>(endpoint: string, body?: string|object, headers?: Record<string, string>) {
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  const req = new mcnet.HttpRequest(HOST + endpoint);
  req.setTimeout(0.5);

  if (body !== undefined) {
    req.setBody(body);
    req.setMethod(mcnet.HttpRequestMethod.Post);
  }
  if (headers !== undefined) {
    const headerObjs: mcnet.HttpHeader[] = [];
    for (const [k, v] of Object.entries(headers)) {
      headerObjs.push(new mcnet.HttpHeader(k, v));
    }
    req.setHeaders(headerObjs);
  }

  let res;
  try {
    res = await mcnet.http.request(req);
  } catch(e) {
    console.error('Invalid request: ', e);
    return;
  }
  if (res.status != 200) {  // 2147954429 on error?
    return;
  }
  try {
    return JSON.parse(res.body) as T;
  } catch(e) {
    console.error('Invalid JSON response: ', e);
  }
}
