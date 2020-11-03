import { Authorization, AuthorizationOption } from "./types";

/**
 * SessionStorage认证授权
 * @description 使用SessionStorage管理token
 */
export default class AuthorizationSessionStorage implements Authorization<string> {
    /**
     * 认证授权配置
     */
    public readonly options: AuthorizationOption;

    /**
     * 不包含Bearer前缀的token
     */
    private token: string = null;

    /**
     * 构造session授权工具
     * @param options 配置
     */
    public constructor(options: AuthorizationOption) {
        this.options = options;
        this.initialize();
    }

    /**
     * 初始化token
     */
    public initialize(): void {
        // 尝试从 sessionStorage 初始化token
        const token = sessionStorage.getItem(this.options.storageKeyWord);
        if (token) {
            this.setToken(token);
        }
    }

    /**
     * 获取token
     * @description 获取的token包含 Bearer 前缀
     */
    getToken(): string {
        if (this.token) {
            return `${this.options.prefix} ${this.token}`;
        } else {
            return null;
        }
    }

    /**
     * 设置token
     * @param token 不包含Bearer的token值
     */
    setToken(token: string): void {
        const { changeHandle, storageKeyWord } = this.options;

        if (!token) {
            throw new Error("cannot set empty token");
        }
        this.token = token;
        sessionStorage.setItem(storageKeyWord, this.token);
        if (changeHandle) {
            changeHandle(this.getToken());
        }
    }

    /**
     * 清除token
     */
    clear(): void {
        this.token = null;
        sessionStorage.removeItem(this.options.storageKeyWord);
    }

    /**
     *是否存在token
     */
    exist(): boolean {
        return !!this.token;
    }
}
