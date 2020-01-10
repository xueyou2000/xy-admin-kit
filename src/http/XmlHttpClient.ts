import { isObject } from "../utils/object-utils";
import { HttpClient, HttpClientOption, RequestOption, Response } from "./types";
import HttpClientOptionDefault from "./HttpClientOptionDefault";
import RequestOptionDefault from "./RequestOptionDefault";
import HttpClientError from "./HttpClientError";
import HttpStatusCode from "./HttpStatusCode";

/**
 * 基于 XMLHttpRequest 的http请求客户端
 */
export default class XmlHttpClient implements HttpClient {
    /**
     * httpClient 配置
     */
    public readonly options: HttpClientOption;

    /**
     * httpClient 请求默认配置
     */
    public readonly requestOptions: RequestOption;

    /**
     * Http状态码描述
     */
    public readonly httpStatusCode: { [code: number]: string };

    /**
     * 构造函数
     * @param options httpClient 配置
     */
    public constructor(options: HttpClientOption = HttpClientOptionDefault, requestOptions: RequestOption = RequestOptionDefault, httpStatusCode = HttpStatusCode) {
        this.options = options;
        this.requestOptions = requestOptions;
        this.httpStatusCode = httpStatusCode;
    }

    /**
     * 设置通用请求头
     * @param headers
     */
    public setHeaders(headers: { [key: string]: string }) {
        this.options.headers = Object.assign({}, this.options.headers, headers);
    }

    /**
     * 清除头部
     * @param header
     */
    public cleanHeader(header: string) {
        if (this.options.headers) {
            delete this.options.headers[header];
        }
    }

    /**
     * 请求
     * @param option
     */
    public request<T>(option: RequestOption): Promise<Response<T>> {
        const { options, requestOptions, httpStatusCode } = this;

        return new Promise<Response<T>>((resolve, reject) => {
            let opt: RequestOption = Object.assign({}, requestOptions, option);
            const headers = Object.assign({}, options.headers, opt.headers);

            // 执行 请求转换器
            if (options.transformRequest) {
                opt = options.transformRequest(opt);
            }

            const xmlHttp = new XMLHttpRequest();
            opt.url = prefixUrl(opt.url, options.baseURL);
            xmlHttp.open(opt.method, opt.url, opt.async);
            xmlHttp.responseType = opt.responseType;
            xmlHttp.withCredentials = opt.withCredentials;
            xmlHttp.timeout = opt.timeout || options.timeout;
            opt.headers = headers;
            for (const x in headers) {
                if (headers[x] !== null) {
                    xmlHttp.setRequestHeader(x, headers[x]);
                }
            }
            if (opt.data && isObject(opt.data)) {
                xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
                opt.data = JSON.stringify(opt.data);
            }
            if (opt.onProgress && xmlHttp.upload) {
                xmlHttp.upload.onprogress = (e) => {
                    let percent = 0;
                    if (e.total > 0) {
                        percent = (e.loaded / e.total) * 100;
                    }
                    opt.onProgress(parseFloat(percent.toFixed(2)), e);
                };
            }

            xmlHttp.onload = () => {
                if (xmlHttp.status < 200 || xmlHttp.status >= 300) {
                    reject(HttpClientError.Create(opt, xmlHttp, httpStatusCode));
                } else {
                    // 执行 响应转换器
                    let response: Response<T> = { data: tryGetResponse(xmlHttp), status: xmlHttp.status, config: opt, request: xmlHttp };
                    if (options.transformResponse) {
                        response = options.transformResponse(response);
                    }
                    resolve(response);
                }
            };

            xmlHttp.onerror = (ev: ProgressEvent) => {
                reject(HttpClientError.Create(opt, xmlHttp, httpStatusCode));
            };

            xmlHttp.send(opt.data);
        });
    }

    /**
     * post请求
     * @param url   请求地址
     * @param data  请求参数
     * @param option    请求选项
     */
    public post<T>(url?: string, data?: Object, option: RequestOption = {}): Promise<Response<T>> {
        option.url = url;
        option.data = data;
        option.method = "POST";
        return this.request<T>(option);
    }

    /**
     * get请求
     * @param url
     * @param option
     */
    public get<T>(url: string, option: RequestOption = {}): Promise<Response<T>> {
        option.url = url;
        option.method = "GET";
        return this.request<T>(option);
    }
}

/**
 * 尝试获取响应内容
 * @param xhr
 */
function tryGetResponse(xhr: XMLHttpRequest) {
    const text = xhr.responseText || xhr.response;
    if (!text) {
        return text;
    }

    try {
        return JSON.parse(text);
    } catch (e) {
        return text;
    }
}

/**
 * 增加url前缀
 * @param url
 * @param baseUrl
 */
function prefixUrl(url: string, baseUrl?: string) {
    if (!baseUrl) {
        return url;
    }
    baseUrl = baseUrl.replace(/\/$/, "");
    if (url[0] !== "/") {
        url = "/" + url;
    }
    return baseUrl + url;
}
