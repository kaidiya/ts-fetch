import { InterceptorFn } from "../types";

interface Interceptor<T> {
  resolved: InterceptorFn<T>,
}

export default class InterceptorManager<T> {
  private interceptors: Array<Interceptor<T> | null>
  
  constructor() {
    this.interceptors = [];
  }

  use(resolved:InterceptorFn<T>) {
    this.interceptors.push({
      resolved,
    });
  }

  forEach(fn: (interceptor: Interceptor<T>) => void):void {
    this.interceptors.forEach(interceptor => {
      if (interceptor !== null) {
        fn(interceptor);
      }
    })
  }
}