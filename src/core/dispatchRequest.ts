import buildURL from '../helpers/url'
import { processHeaders } from '../helpers/headers'
import { FetchRequestConfig, FetchPromise, FetchResponse } from '../types'

export default function dispatchRequest(config: FetchRequestConfig): Promise<any> {
  processConfig(config)
  const { url, ...options } = config
  return fetch(url!, options)
    .then(async (res) => {
      const { status, statusText } = res
      if (status >= 200 && status < 300) {
        const data = await res.json();
        console.log(222222222, data);
        return {
          ...data,
          config,
        };
      }
      return Promise.reject({
        status,
        statusText,
        config
      })
    })
}

function processConfig(config: FetchRequestConfig): void {
  config.url = transformURL(config)
  if (config.method !== 'GET') {
    config.body = transformBody(config);
  }
}

function transformURL(config: FetchRequestConfig) {
  const { url, params, method = 'GET' } = config || {}
  return buildURL(url!, params, method)
}

function transformBody(config: FetchRequestConfig): any {
  const { params } = config
  return JSON.stringify(params);
}
