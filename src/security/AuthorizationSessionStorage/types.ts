/**
 * token改变事件处理器
 */
export type TokenChangeHandle = (token: string) => void;

/**
 * jwt token 认证授权接口
 */
export interface Authorization<T = any> {
    /**
     * 配置
     */
    readonly options: AuthorizationOption;

    /**
     * 初始化
     * @description 一般从尝试缓存获取token, 初始化
     */
    initialize(): void;

    /**
     * 获取token
     * @description 获取的token包含 Bearer 前缀
     */
    getToken(): T;

    /**
     * 设置token
     * @description 不包含Bearer的token值
     * @param token
     */
    setToken(token: T): void;

    /**
     * 清除token
     */
    clear(): void;

    /**
     * 是否存在token
     */
    exist(): boolean;
}

/**
 * 授权选项
 */
export interface AuthorizationOption {
    /**
     * sessionStorage存储键
     */
    storageKeyWord: string;
    /**
     * Bearer前缀
     * @see http://www.rfcreader.com/#rfc6750
     */
    prefix?: string;
    /**
     * token改变事件
     */
    changeHandle?: TokenChangeHandle;
}
