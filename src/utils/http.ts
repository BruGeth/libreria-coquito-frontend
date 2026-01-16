import { API_BASE_URL } from './constants';

interface RequestOptions extends RequestInit {
  params?: Record<string, string | number | boolean>;
}

interface ApiError {
  message: string;
  status: number;
  details?: unknown;
}

class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.status = status;
    this.details = details;
  }
}

/**
 * Build URL with query parameters
 */
function buildUrl(endpoint: string, params?: Record<string, string | number | boolean>): string {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
}

/**
 * Handle API response
 */
async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get('content-type');
  const isJson = contentType?.includes('application/json');
  
  // Parse response body
  const data = isJson ? await response.json() : await response.text();
  
  // Handle error responses
  if (!response.ok) {
    const error: ApiError = {
      message: data?.message || data || 'An error occurred',
      status: response.status,
      details: data,
    };
    
    throw new HttpError(error.message, error.status, error.details);
  }
  
  return data as T;
}

/**
 * Make HTTP request
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const { params, headers, ...fetchOptions } = options;
  
  const url = buildUrl(endpoint, params);
  
  const defaultHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    ...headers,
  };
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      headers: defaultHeaders,
    });
    
    return await handleResponse<T>(response);
  } catch (error) {
    if (error instanceof HttpError) {
      throw error;
    }
    
    // Handle network errors
    throw new HttpError(
      'Network error. Please check your connection.',
      0,
      error
    );
  }
}

/**
 * HTTP methods
 */
export const http = {
  get: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'GET' }),
  
  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  patch: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),
  
  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export { HttpError };
export type { ApiError };
