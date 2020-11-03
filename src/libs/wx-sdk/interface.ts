/**
 * 微信签名配置Vo
 */
export interface WxConfig {
  /**
   * 公众号的唯一标识
   */
  appId: string;
  /**
   * 生成签名的时间戳
   */
  timestamp: string;
  /**
   * 生成签名的随机串
   */
  nonceStr: string;
  /**
   * 签名
   */
  signature: string;
}

/**
 * 微信支付配置
 */
export interface WxPayConfig {
  /**
   * 公众号的唯一标识
   */
  appId: string;
  /**
   * 生成签名的时间戳
   */
  timestamp: string;
  /**
   * 生成签名的随机串
   */
  nonceStr: string;
  /**
   * 签名类型 (MD5)
   */
  signType: string;
  /**
   * 签名
   */
  paySign: string;
  /**
   * 订单详情扩展字符串
   */
  package: string;
}

/**
 * 微信分享
 */
export interface WxShare {
  /**
   * 分享标题
   */
  title?: string;
  /**
   * 分享说明
   */
  desc?: string;
  /**
   * 分享链接
   */
  link?: string;
  /**
   * 缩略图
   */
  imgUrl?: string;
}

export interface WxBaseResult {
  /**
   * 错误消息
   */
  errMsg: string;
}

/**
 * 微信扫码类型
 */
export type WxScanType = "qrCode" | "barCode";

/**
 * 扫码
 */
export interface WxScanQRCode extends WxBaseResult {
  /**
   * 扫码结果字符串
   */
  resultStr: string;
}

/**
 * 地理位置
 */
export interface WxLocation extends WxBaseResult {
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
}

/**
 * 拍照或选择图片
 */
export interface WxChooseImage extends WxBaseResult {
  /**
   * 图片id集合
   */
  localIds: string[];
}
