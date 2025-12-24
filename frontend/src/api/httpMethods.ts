import { apiRequest } from "./apiRequest";
import type { ApiResponse, CommonReqOptions } from "./types";

export function apiGet<TResponse>(
  url: string,
  options?: Omit<CommonReqOptions, "onUploadProgress">,
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse>({
    url,
    method: "GET",
    ...options,
  });
}

export function apiPost<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  options?: CommonReqOptions,
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>({
    url,
    method: "POST",
    data,
    ...options,
  });
}

export function apiPut<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  options?: CommonReqOptions,
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>({
    url,
    method: "PUT",
    data,
    ...options,
  });
}

export function apiPatch<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  options?: CommonReqOptions,
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>({
    url,
    method: "PATCH",
    data,
    ...options,
  });
}

export function apiDelete<TResponse, TBody = unknown>(
  url: string,
  data?: TBody,
  options?: CommonReqOptions,
): Promise<ApiResponse<TResponse>> {
  return apiRequest<TResponse, TBody>({
    url,
    method: "DELETE",
    data,
    ...options,
  });
}
