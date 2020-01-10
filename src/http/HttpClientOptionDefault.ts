import { HttpClientOption } from "./types";

/**
 * 默认 httpClient 配置
 */
const HttpClientOptionDefault: HttpClientOption = {
    baseURL: "",
    headers: {},
    transformRequest: null,
    transformResponse: null,
    timeout: null,
};

export default HttpClientOptionDefault;
