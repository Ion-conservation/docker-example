import type { InjectionKey } from 'vue';
const isDev: boolean = import.meta.env.DEV;

interface IAPI_ENDPOINTS {
  [prop: string]: string
}

interface IRequestOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: Record<string, string>,
  timeout?: number;
}


const API_ENDPOINTS: IAPI_ENDPOINTS = {
  users: isDev ? '' : import.meta.env.VITE_USERS_BASE_URL || 'http://backend-dev:3000',
  cities: isDev ? '' : import.meta.env.VITE_USERS_BASE_URL || 'http://backend-dev:3000',
  orders: isDev ? '' : import.meta.env.VITE_ORDERS_BASE_URL || 'http://order-service:4000',
};

const request = async <T>(endpoint: string, url: string, options: IRequestOptions = {}): Promise<T> => {
  const baseUrl = API_ENDPOINTS[endpoint] || '';
  const { method = 'GET', headers = {}, body, timeout = 10000 } = options;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  const config = {
    method,
    headers: { 'Content-Type': 'application/json', ...headers },
    signal: controller.signal,
    body: ''
  };
  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response: Response = await fetch(`${baseUrl}${url}`, config);
    clearTimeout(timeoutId);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json() as T;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

interface IApi {
  users: {
    get: <T>(url: string) => Promise<T>,
    post: <T>(url: string, data: Record<string, string>) => Promise<T>
  },
  cities: {
    get: <T> (url: string) => Promise<T>,
    post: <T>(url: string, data: Record<string, string>) => Promise<T>
  },
  orders: {
    get: <T>(url: string) => Promise<T>,
    post: <T>(url: string, data: Record<string, string>) => Promise<T>
  },
}

export const apiKey: InjectionKey<IApi> = Symbol('api');

export const api: IApi = {
  users: {
    get: (url) => request('users', url),
    post: (url, data) => request('users', url, { method: 'POST', body: data }),
  },
  cities: {
    get: (url) => request('cities', url),
    post: (url, data) => request('cities', url, { method: 'POST', body: data }),
  },
  orders: {
    get: (url) => request('orders', url),
    post: (url, data) => request('orders', url, { method: 'POST', body: data }),
  },
};