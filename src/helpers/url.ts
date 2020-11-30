import { Method } from "../types";

export default function buildURL(url:string, params:any, method:Method) {
  if (!params || method !== 'GET') {
    return url;
  }
  const parts: string[] = [];
  Object.keys(params).forEach(key => {
    parts.push(`${key}=${params[key]}`)
  });
  url += (url.indexOf('?') === -1 ? '?' : '&') + parts.join('&');
  return url;
}