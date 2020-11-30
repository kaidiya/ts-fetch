export type Method = 'GET' | 'DELETE' | 'POST' | 'PUT' | 'HEAD' | 'OPTIONS' | 'PATCH';

export interface FetchResponse{
  [key:string]:any,
}

export interface FetchPromise extends Promise<FetchResponse> {

}

export interface FetchRequestConfig {
  url?: string,
  method?: Method,
  params?:any,
  headers?:any,
  body?:any,
}

export interface InterceptorFn<T> {
  (val:T):T | Promise<T>;
}

export interface Fetch {
  interceptors: {
    request: FetchInterceptorManager<FetchRequestConfig>,
    response: FetchInterceptorManager<FetchResponse>,
  },

  request(url:string, params?:any, config?: FetchRequestConfig):FetchPromise,

  get(url:string, params?:any, config?:any):FetchPromise,

  delete(url:string, params?:any, config?:any):FetchPromise,

  head(url:string, params?:any, config?:any):FetchPromise,

  options(url:string, params?:any, config?:any):FetchPromise,

  post(url:string, params?:any, config?:any):FetchPromise,

  put(url:string, params?:any, config?:any):FetchPromise,

  patch(url:string, params?:any, config?:any):FetchPromise,
}

export interface FetchInstance extends Fetch {
  (config:FetchRequestConfig):FetchPromise

  (url:string, config?:FetchRequestConfig):FetchPromise
}


export interface FetchInterceptorManager<T> {
  use(resolved: InterceptorFn<T>):void;

  eject(id:number):void;
}