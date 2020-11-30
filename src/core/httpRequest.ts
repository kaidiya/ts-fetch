import { request } from "http";
import { FetchRequestConfig, FetchResponse, Method, InterceptorFn, FetchPromise } from "../types";
import dispatchRequest from "./dispatchRequest";
import InterceptorManage from './interceptorManager';

interface PromiseChain<T> {
  resolved: InterceptorFn<T> | ((config: FetchRequestConfig) => FetchPromise),
}

interface Interceptors {
  request: InterceptorManage<FetchRequestConfig>,
  response: InterceptorManage<FetchResponse>,
}
export default class HttpRequest {
  interceptors: Interceptors;

  constructor() {
    this.interceptors = {
      request: new InterceptorManage<FetchRequestConfig>(),
      response: new InterceptorManage<FetchResponse>(),
    };
  }
  request(method:Method, url:string, params?:any, options?:any):FetchPromise {
    const chain:PromiseChain<any>[] = [{
      resolved: dispatchRequest,
    }];
  
    const config = {method, url, params, ...(options || {})};
    config.headers = config.headers || {};
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    config.params = config.params || {};
    this.interceptors.request.forEach((interceptor) => {
      chain.unshift(interceptor);
    });
  
    this.interceptors.response.forEach(interceptor => {
      chain.push(interceptor);
    });
  
    let promise = Promise.resolve(config);
  
    while(chain.length) {
      const { resolved } = chain.shift()!;
      promise = promise.then(resolved);
    }
  
    return promise;
  }

  get(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithoutData('GET', url, params, config);
  };

  delete(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithoutData('DELETE', url, params, config);
  };

  head(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithoutData('HEAD', url, params, config);
  };

  options(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithoutData('OPTIONS', url, params, config);
  };

  post(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithData('POST', url, params, config);
  };

  put(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithData('PUT', url, params, config);
  };

  patch(url:string, params?:any, config?:any):FetchPromise {
    return this._requestMethodWithData('PATCH', url, params, config);
  };

  _requestMethodWithoutData(method:Method, url:string, params:any, config?:FetchRequestConfig):FetchPromise {
    return this.request(method, url, params, config)
  };

  _requestMethodWithData(method:Method, url:string, params?:any, config?:FetchRequestConfig):FetchPromise {
    return this.request(method, url, params, config);
  }
};
