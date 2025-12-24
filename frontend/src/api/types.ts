import type { AxiosRequestConfig } from "axios";

export type HttpMethod =
  | 'GET'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE';

export interface ApiRequestOptions<TBody = any> {
  url: string;
  method?: HttpMethod;
  data?: TBody;
  params?: Record<string, any>;
  headers?: Record<string, string>;
  responseType?: AxiosRequestConfig['responseType'];
  onUploadProgress?: (progress: number) => void;
  onDownloadProgress?: (progress: number) => void;
  signal?: AbortSignal;
}

export type ApiError = {
    message: string;
    url?:string;
}

export interface ApiResponse<T>{
    data?: T;
    error?: ApiError;
    status?:number;
    headers?: Record<string, string>;
    fileName?: string; //for download filename which will be there in header's content-disposition property
    uploadProgress?: number;
    downloadProgress?: number;
}

export type CommonReqOptions = {
    params?: Record<string,any>;
    headers?: Record<string, string>;
    responseType?:AxiosRequestConfig["responseType"];
    onUploadProgress?: (progress: number) => void;
    onDownloadProgress?: (progress: number) => void;
    signal?: AbortSignal;
}