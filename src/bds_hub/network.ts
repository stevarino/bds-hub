import * as mcnet from '@minecraft/server-net';

import {Ctx} from '../types/requests.js';
export * from '../types/requests.js';

Ctx.listener = async (endpoint: string, req: string | object | undefined) => {
  return await request(endpoint, req);
};

let HOST = '127.0.0.1:8888';

export function setHost(host?: string) {
  if (host !== undefined) {
    HOST = host;
  }
}

export async function request<T = unknown>(
  endpoint: string,
  body?: string | object,
  headers?: Record<string, string>,
) {
  const res = await requestRaw(endpoint, body, headers);
  if (res === undefined) return res;
  try {
    return JSON.parse(res) as T;
  } catch (e) {
    console.error(`[${HOST} ${endpoint}] Invalid JSON response: ${e}`);
  }
  return;
}

export async function requestRaw(
  endpoint: string,
  body?: string | object,
  headers?: Record<string, string>,
) {
  if (typeof body !== 'string') {
    body = JSON.stringify(body);
  }

  const req = new mcnet.HttpRequest(HOST + endpoint);
  req.setTimeout(0.5);

  if (body !== undefined) {
    const method = mcnet.HttpRequestMethod.POST;
    req.setMethod(method);
    req.setBody(body);
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
  } catch (e) {
    console.error(`[${HOST} ${endpoint}] Invalid request: ${e}`);
    return;
  }
  if (res.status !== 200) {
    console.error(`[${HOST} ${endpoint}] Invalid status: ${res.status} - ${res.body}`);
    return;
  }
  return res.body;
}
