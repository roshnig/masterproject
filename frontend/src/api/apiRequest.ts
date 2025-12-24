import type { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { axiosClient } from "./axiosClient";
import type { ApiRequestOptions, ApiResponse } from "./types";

function extractFileName(contentDisposition?: string): string | undefined {
  if (!contentDisposition) return;
  let startFileNameIndex = contentDisposition.indexOf('"') + 1;
  let endFileNameIndex = contentDisposition.lastIndexOf('"');
  const filename: string | undefined = contentDisposition.substring(
    startFileNameIndex,
    endFileNameIndex,
  );
  return filename;
}

//Generic function for all kind of requests
export async function apiRequest<TResponse = unknown, TBody = unknown>(
  options: ApiRequestOptions<TBody>,
): Promise<ApiResponse<TResponse>> {
  const {
    url,
    method = "GET",
    data,
    params,
    headers,
    responseType = "json",
    onUploadProgress,
    onDownloadProgress,
    signal,
  } = options;

  const result: ApiResponse<TResponse> = {};

  const config: AxiosRequestConfig = {
    url,
    method: method as Method,
    data,
    params,
    headers,
    responseType,
    onUploadProgress: onUploadProgress
      ? (e) => {
          const percent = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
          result.uploadProgress = percent;
          onUploadProgress(percent);
        }
      : undefined,
    onDownloadProgress: onDownloadProgress
      ? (e) => {
          const percent = e.total ? Math.round((e.loaded * 100) / e.total) : 0;
          result.downloadProgress = percent;
          onDownloadProgress(percent);
        }
      : undefined,
    signal,
  };

  try {
    const response: AxiosResponse<TResponse> =
      await axiosClient.request<TResponse>(config);

    const fileName =
      responseType === "blob"
        ? extractFileName(response.headers["content-disposition"])
        : undefined;

    result.data = response.data;
    result.status = response.status;
    result.headers = response.headers as Record<string, string>;
    result.fileName = fileName;

    return result;
  } catch (err: any) {
    result.error = {
      message:
        err.response?.data?.message || err.message || "Unknown API Error",
      url: err.config?.url,
    };
    return result;
  }
}
