import { RequestOption } from "./types";

/**
 * httpClient 请求默认参数
 */
const RequestOptionDefault: RequestOption = {
    url: "",
    data: {},
    method: "POST",
    async: true,
    headers: {},
    withCredentials: false,
    timeout: null,
    responseType: "",
};

export default RequestOptionDefault;
