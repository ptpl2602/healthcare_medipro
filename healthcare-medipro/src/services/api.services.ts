/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { API_URL, API_VERSION, HTTP_STATUS_CODE_SUCCESS } from '@/constants';
import { takeValueFromLocalStorage } from '@/lib/helpers/localStorageHelper';
import { ResponseBase } from '@/types/base.type';

const DEFAULT_BASE_URL = API_URL ?? '';

type Config = Record<string, string>;

/**
 * Returns a set of headers for making a JSON API request.
 * @returns {HeadersInit} A set of headers for JSON content.
 * @example:
 * Content-Type,
 * Accept
 * Authorization,
 * Content-Language,
 * Timezone
 */
export const getFullHeader = () => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: localStorage.getItem('access_token') ? (localStorage.getItem('access_token') as string) : ''
  };

  return headers;
};

let isRefreshTokenBeingHandled = false;
let refreshAttemptCount = 0;

const handleCheckRefreshToken = async <T = any>(data: ResponseBase<T>) => {
  if (isRefreshTokenBeingHandled) return data;
  isRefreshTokenBeingHandled = true;
  const baseURL = DEFAULT_BASE_URL;
  const { key, refreshToken } = takeValueFromLocalStorage('user_info');
  if (!key || !refreshToken) {
    logoutUser();
    return;
  }
  try {
    const headers = getFullHeader();
    const encodedRefreshToken = encodeURIComponent(refreshToken); // encodedRefreshToken because of the api will call the encodedRefreshToken
    const response = await fetch(`${baseURL}/${API_VERSION}/auth/refresh-token?token=${encodedRefreshToken}`, {
      method: 'GET',
      headers: headers
    });
    const res = await response.json();
    const newAccessToken = res.data?.accessToken;
    if (res.message === 'Success' && res.statusCode === 200 && typeof window !== 'undefined') {
      const user_info = key;
      localStorage.setItem(
        'user_info',
        JSON.stringify({
          ...user_info,
          accessToken: newAccessToken,
          refreshToken: refreshToken
        })
      );
      localStorage.setItem('access_token', newAccessToken);
      window.location.reload();
      refreshAttemptCount = 0;
    }
  } catch (error) {
    refreshAttemptCount++;
    if (refreshAttemptCount >= 2) {
      logoutUser();
    } else {
      // Re-throw the error if it's not the final attempt
      throw error;
    }
  } finally {
    isRefreshTokenBeingHandled = false;
  }
};

const logoutUser = () => {
  refreshAttemptCount = 0; // Reset the refresh attempt count
  if (typeof window !== 'undefined') {
    window.location.replace('/login');
    window.localStorage.removeItem('user_info');
    window.localStorage.removeItem('access_token');
  }
};

/**
 * Makes a generic HTTP request with the specified URL, options, and configuration.
 *
 * @param {string} url - The URL to which the request will be made.
 * @param {RequestInit} options - Options for the fetch request.
 * @param {Config} config - (Optional) Configuration options for the request.
 * @returns {Promise<ResponseBase<T>>} A Promise resolving to the response data of type `ResponseBase<T>`.
 * @throws {Error} Throws an error if the request fails or if the response status code indicates failure.
 */
const makeRequest = async <T = any>(url: string, options: RequestInit, config?: Config): Promise<ResponseBase<T>> => {
  const baseURL = config?.baseURL ?? DEFAULT_BASE_URL;
  const { baseURL: _, ...restConfig } = config ?? {};

  const headers = getFullHeader();

  try {
    const res = await fetch(`${baseURL}${url}`, {
      ...options,
      headers: headers,
      ...restConfig
    });

    const data: ResponseBase<T> = await res.json();
    if (data.message === 'Unauthorized' && data.statusCode === 401) {
      // Handle Unauthorized
      handleCheckRefreshToken(data);
    }

    if (!HTTP_STATUS_CODE_SUCCESS.includes(data.statusCode)) {
      throw new Error(`Request failed with status code ${data.statusCode}`);
    }

    return data;
  } catch (error) {
    throw error;
  }
};

/**
 * Makes a GET request to the specified URL with optional configuration and request options.
 *
 * @param {string} url - The URL to which the GET request will be made.
 * @param {Config} config - (Optional) Additional configuration options for the request.
 *
 * @see [Fetch Documentation](https://nextjs.org/docs/app/api-reference/functions/fetchs)
 * @param {RequestInit} options - (Optional) Additional options for the fetch request.
 *
 * @param {AbortSignal} signal - (Optional) An AbortSignal object that allows you to communicate with a DOM request (such as a Fetch) and abort it if required.
 * @returns {Promise<ResponseBase<T>>} A Promise resolving to the response data of type `ResponseBase<T>`.
 */
export const get = <T = any>(
  url: string,
  config?: Config,
  options?: RequestInit,
  signal?: AbortSignal
): Promise<ResponseBase<T>> => makeRequest(url, { method: 'GET', signal, ...options }, config);

/**
 * Makes a PUT request to the specified URL with the provided request body and optional configuration.
 *
 * @param {string} url - The URL to which the PUT request will be made.
 * @param {D} body - The data to be sent as the request body. It will be converted to JSON string.
 * @param {Config} config - (Optional) Additional configuration options for the request.
 * @returns {Promise<ResponseBase<T>>} A Promise resolving to the response data of type `ResponseBase<T>`.
 */
export const put = <T = any, D = any>(url: string, body: D, config?: Config): Promise<ResponseBase<T>> =>
  makeRequest(url, { method: 'PUT', body: JSON.stringify(body) }, config);

/**
 * Makes a POST request to the specified URL with the provided request body and optional configuration.
 *
 * @param {string} url - The URL to which the POST request will be made.
 * @param {D} body - (Optional) The data to be sent as the request body. It will be converted to JSON string.
 * @param {Config} config - (Optional) Additional configuration options for the request.
 * @returns {Promise<ResponseBase<T>>} A Promise resolving to the response data of type `ResponseBase<T>`.
 */
export const post = <T = any, D = any>(url: string, body?: D, config?: Config): Promise<ResponseBase<T>> =>
  makeRequest(url, { method: 'POST', body: JSON.stringify(body) }, config);

/**
 * Makes a DELETE request to the specified URL with optional configuration.
 *
 * @param {string} url - The URL from which the resource will be deleted.
 * @param {Config} config - (Optional) Additional configuration options for the request.
 * @returns {Promise<ResponseBase<T>} A Promise resolving to the response data of type `ResponseBase<T>`.
 */
export const remove = <T = any>(url: string, config?: Config): Promise<ResponseBase<T>> =>
  makeRequest(url, { method: 'DELETE' }, config);