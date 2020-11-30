import HttpRequest from './core/httpRequest';
import { FetchInstance } from './types';
export function extend<T, U>(to:T, from:U):T & U {
  for(let key in from) {
    (to as T & U)[key] = from[key] as any;
  }
  return to as T & U;
}

function createInstance():FetchInstance {
  const context = new HttpRequest();
  const instance = HttpRequest.prototype.request.bind(context);

  extend(instance, context);

  return instance as FetchInstance;
}

const fetch = createInstance();

export default fetch;