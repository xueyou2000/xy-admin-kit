import { RequestOption } from "./types";
import HttpStatusCode from "./HttpStatusCode";

/**
 * HttpClient 异常
 */
export default class HttpClientError extends Error {
    /**
     * http状态码
     */
    public status: number;

    /**
     * 请求配置
     */
    public requestOption: RequestOption;

    /**
     * 请求实例
     */
    public request: XMLHttpRequest;

    /**
     * 构造http异常
     * @param requestOption
     * @param request
     * @param message
     */
    public constructor(requestOption: RequestOption, request: XMLHttpRequest, message?: string, httpStatusCode: { [code: number]: string } = HttpStatusCode) {
        super(message || httpStatusCode[request.status] || "网络异常");
        this.status = request.status;
        this.requestOption = requestOption;
        this.request = request;
    }

    /**
     * 创建http异常
     * @param requestOption
     * @param request
     */
    public static Create(requestOption: RequestOption, request: XMLHttpRequest, httpStatusCode?: { [code: number]: string }) {
        return new HttpClientError(requestOption, request, null, httpStatusCode);
    }
}
