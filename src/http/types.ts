/**
 * http请求客户端
 */
export interface HttpClient {
    /**
     * httpClient 配置
     */
    readonly options: HttpClientOption;

    /**
     * httpClient 请求默认配置
     */
    readonly requestOptions: RequestOption;

    /**
     * Http状态码描述
     */
    readonly httpStatusCode: { [code: number]: string };

    /**
     * 请求
     * @param option
     */
    request<T>(option: RequestOption): Promise<Response<T>>;

    /**
     * post 请求
     * @param url 请求地址
     * @param data 请求参数
     * @param option 请求选项
     */
    post<T>(url?: string, data?: Object, option?: RequestOption): Promise<Response<T>>;

    /**
     * 设置通用请求头
     * @param headers
     */
    setHeaders(headers: { [key: string]: any }): void;

    /**
     * 清除头部
     * @param header
     */
    cleanHeader(header: string): void;
}

/**
 * 请求方法
 */
export type RequestMethod = "get" | "GET" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH";

/**
 * 请求转换
 */
export type TransformRequest = (request: RequestOption) => RequestOption;

/**
 * 响应转换
 */
export type TransformResponse = (response: Response<any>) => Response<any>;

/**
 * 请求选项
 */
export interface RequestOption {
    /**
     * 请求地址
     */
    url?: string;
    /**
     * 提交数据
     */
    data?: any;
    /**
     * 超时时间
     */
    timeout?: number;
    /**
     * 请求方法
     */
    method?: RequestMethod;
    /**
     * 是否异步请求
     */
    async?: boolean;
    /**
     * 请求头
     */
    headers?: any;
    /**
     * withCredentials
     */
    withCredentials?: boolean;
    /**
     * 预期响应类型
     */
    responseType?: XMLHttpRequestResponseType;
    /**
     * 上传进度
     */
    onProgress?: (percent: number, event: ProgressEvent) => void;
}

/**
 * 响应
 */
export interface Response<T> {
    /**
     * 响应数据
     */
    data?: T;
    /**
     * http状态码
     */
    status: number;
    /**
     * 请求时的参数
     */
    config?: RequestOption;
    /**
     * request实例
     */
    request?: XMLHttpRequest;
}

/**
 * httpClient 配置
 */
export interface HttpClientOption {
    /**
     * 基础url
     * @description 所有请求都用附加此url作为前缀
     */
    baseURL?: string;
    /**
     * 超时时间
     */
    timeout?: number;
    /**
     * 请求头
     */
    headers?: any;
    /**
     * 请求转换器
     */
    transformRequest?: TransformRequest;
    /**
     * 响应转换器
     */
    transformResponse?: TransformResponse;
}
