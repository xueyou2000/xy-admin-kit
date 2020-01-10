/**
 * 微信sdk初始化状态
 */
export enum WxConfigStatus {
    /**
     * 等待连接
     */
    wait,
    /**
     * 连接中
     */
    connecting,
    /**
     * 连接成功
     */
    success,
    /**
     * 连接失败
     */
    fail,
}

/**
 * 付款状态枚举
 */
export enum WxPayStatus {
    /**
     * 支付成功
     */
    OK = "get_brand_wcpay_request:ok",
    /**
     * 支付取消
     */
    CANCEL = "get_brand_wcpay_request:cancel",
    /**
     * 支付失败
     */
    FAIL = "get_brand_wcpay_request:fail",
}
