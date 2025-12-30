/************ react query hooks if want to use react query ************** */
//check usageQueryHooks.ts file to see how to use them inside component

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseMutationOptions,
  type UseQueryOptions,
} from "@tanstack/react-query";
import type { ApiResponse, CommonReqOptions } from "./types";
import { apiDelete, apiGet, apiPatch, apiPost, apiPut } from "./httpMethods";

//GET HOOK
export function useApiGet<T>(
  url: string,
  options?: UseQueryOptions<ApiResponse<T>>,
  reqOptions?: CommonReqOptions,
) {
  return useQuery<ApiResponse<T>>({
    queryKey: [url],
    queryFn: () => apiGet<T>(url, reqOptions),
    staleTime: Infinity,
    ...options, //we can overwrite queryKey by passing that in option
  });
}

//POST HOOK
export function useApiPost<TResponse, TBody = unknown>(
  url: string,
  invalidateKeys?: string[],
  options?: UseMutationOptions<ApiResponse<TResponse>, unknown, TBody>,
  reqOptions?: CommonReqOptions,
) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<TResponse>, unknown, TBody>({
    mutationFn: (data: TBody) =>
      apiPost<TResponse, TBody>(url, data, reqOptions),
    ...options,
    onSuccess: (...args) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
    retry: options?.retry || false,
    //retryDelay: options?.retryDelay || undefined,
  });
}

//PUT HOOK
export function useApiPut<TResponse, TBody = unknown>(
  url: string,
  invalidateKeys?: string[],
  options?: UseMutationOptions<ApiResponse<TResponse>, unknown, TBody>,
  reqOptions?: CommonReqOptions,
) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<TResponse>, unknown, TBody>({
    mutationFn: (data: TBody) =>
      apiPut<TResponse, TBody>(url, data, reqOptions),
    ...options,
    onSuccess: (...args) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
    retry: options?.retry || false,
    //retryDelay: options?.retryDelay || undefined,
  });
}

//PATCH HOOK
export function useApiPatch<TResponse, TBody = unknown>(
  url: string,
  invalidateKeys?: string[],
  options?: UseMutationOptions<ApiResponse<TResponse>, unknown, TBody>,
  reqOptions?: CommonReqOptions,
) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<TResponse>, unknown, TBody>({
    mutationFn: (data: TBody) =>
      apiPatch<TResponse, TBody>(url, data, reqOptions),
    ...options,
    onSuccess: (...args) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
    retry: options?.retry || false,
    //retryDelay: options?.retryDelay || undefined,
  });
}

//DELETE HOOK
export function useApiDelete<TResponse>(
  url: string,
  invalidateKeys?: string[],
  options?: UseMutationOptions<ApiResponse<TResponse>, unknown, void>,
  //reqOptions?: CommonReqOptions,
) {
  const queryClient = useQueryClient();
  return useMutation<ApiResponse<TResponse>, unknown, void>({
    mutationFn: () => apiDelete<TResponse>(url),
    ...options,
    onSuccess: (...args) => {
      invalidateKeys?.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      options?.onSuccess?.(...args);
    },
    onError: (...args) => {
      options?.onError?.(...args);
    },
    onSettled: (...args) => {
      options?.onSettled?.(...args);
    },
    retry: options?.retry || false,
    //retryDelay: options?.retryDelay || undefined,
  });
}
