
export function processHeaders(headers:Record<string, any>) {
  return headers['Content-Type'] = 'application/json; charset=utf-8';
}