import { WxConfigStatus, WxPayStatus } from "./WxSdkEnums";
import { WxConfig, WxPayConfig, WxShare, WxScanType, WxScanQRCode } from "./interface";

const JsApiList = ["addCard", "chooseCard", "openCard", "updateAppMessageShareData", "updateTimelineShareData", "scanQRCode", "onMenuShareAppMessage", "onMenuShareTimeline", "onMenuShareTimeline", "onMenuShareAppMessage"];

/**
 * 微信sdk
 */
export default class WxSdk {
    /**
     * 获取微信签名配置
     */
    private readonly getWxSign: () => Promise<WxConfig>;

    /**
     * sdk文件路径，比如
     */
    private readonly sdkFile: string;

    /**
     * 微信sdk初始化状态
     */
    private status: WxConfigStatus = WxConfigStatus.wait;

    /**
     * 上一次签名成功时的URL
     */
    private signatureUrl: string;

    /**
     * wxjs sdk脚本是否加载
     */
    private jssdkLoad: boolean = false;

    /**
     * 构造函数
     * @param sdkFile sdk文件路径，比如 "static/js/jweixin-1.4.0.js"
     * @param getWxSign 获取微信签名配置
     */
    public constructor(sdkFile: string, getWxSign: () => Promise<WxConfig>) {
        this.getWxSign = getWxSign;
        this.sdkFile = sdkFile;
    }

    /**
     * 加载js sdk
     */
    private LoadWxJsSdk() {
        return new Promise((resolve, reject) => {
            if (this.jssdkLoad && window.wx) {
                resolve();
            } else {
                const wxsdkScript = document.createElement("script");
                wxsdkScript.type = "text/javascript";
                wxsdkScript.src = this.sdkFile;
                document.body.append(wxsdkScript);
                wxsdkScript.onload = () => {
                    this.jssdkLoad = true;
                    resolve();
                };
                wxsdkScript.onerror = (error) => {
                    reject(new Error("未加载微信SDK!"));
                };
            }
        });
    }

    /**
     * 初始化微信Sdk
     */
    private InitWxConfig() {
        const { status, signatureUrl } = this;
        return this.LoadWxJsSdk().then(() => {
            return new Promise((resolve, reject) => {
                if (!window.wx) {
                    reject(new Error("未加载微信SDK!"));
                    return;
                }
                if (status === WxConfigStatus.wait || status === WxConfigStatus.fail || window.location.href !== signatureUrl) {
                    var config: WxConfig;
                    this.getWxSign()
                        .then((response) => {
                            config = response;
                            window.wx.config({
                                ...config,
                                debug: false,
                                jsApiList: JsApiList,
                            });
                            window.wx.ready(() => {
                                this.status = WxConfigStatus.success;
                                this.signatureUrl = window.location.href;
                                resolve();
                            });
                            window.wx.error((res: any) => {
                                this.status = WxConfigStatus.fail;
                                this.signatureUrl = null;
                                reject(new Error("请稍后重试!"));
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                            reject(new Error("加载微信签名失败"));
                        });
                } else {
                    resolve();
                }
            });
        });
    }

    /**
     * 确保微信Sdk加载完毕
     */
    private MakeSureWxCnfigComplete() {
        const { status, signatureUrl } = this;
        return new Promise((resolve, reject) => {
            if (status !== WxConfigStatus.success || window.location.href !== signatureUrl) {
                this.InitWxConfig().then(resolve, reject);
            } else {
                resolve();
            }
        });
    }

    /**
     * 支付
     * @param wxPayConfig
     */
    public pay(wxPayConfig: WxPayConfig) {
        return new Promise((resolve, reject) => {
            this.MakeSureWxCnfigComplete()
                .then(() => {
                    function onBridgeReady() {
                        window.WeixinJSBridge.invoke("getBrandWCPayRequest", wxPayConfig, function(res: any) {
                            console.log("wxpay==========", res);
                            if (res.err_msg === WxPayStatus.OK) {
                                resolve();
                            } else if (res.err_msg === WxPayStatus.CANCEL) {
                                reject(new Error("用户取消支付"));
                            } else {
                                reject(new Error("支付失败"));
                            }
                        });
                    }
                    if (typeof window.WeixinJSBridge == "undefined") {
                        if (document.addEventListener) {
                            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
                        }
                    } else {
                        onBridgeReady();
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }

    /**
     * 分享
     * @param config
     */
    public share(config: WxShare) {
        return this.MakeSureWxCnfigComplete().then(() => {
            let fail = false;
            return new Promise((resolve, reject) => {
                // TODO: 微信新版分享接口有BUG, 不生效, 还是只能调老接口

                // 分享给朋友
                window.wx.onMenuShareAppMessage({
                    ...config,
                    success: () => {
                        resolve();
                    },
                    fail: (res: any) => {
                        if (!fail) {
                            console.error("updateAppMessageShareData Share Fail", res);
                            reject(new Error("Share Fail"));
                            fail = true;
                        }
                    },
                });

                // 分享朋友圈
                const timelineConfig = Object.assign({}, config);
                delete timelineConfig.desc;
                window.wx.onMenuShareTimeline({
                    ...timelineConfig,
                    success: () => {
                        resolve();
                    },
                    fail: (res: any) => {
                        if (!fail) {
                            console.error("updateTimelineShareData Share Fail", res);
                            reject(new Error("Share Fail"));
                            fail = true;
                        }
                    },
                });

                // 老的接口, 在1.6版本下好像不会进success, 所以直接返回成功
                setTimeout(() => {
                    resolve();
                }, 300);

                // // “分享给朋友”及“分享到QQ”
                // window.wx.updateAppMessageShareData({
                //     ...config,
                //     success: () => {
                //         ++count;
                //         if (count >= 2) {
                //             resolve();
                //         }
                //     },
                //     fail: (res: any) => {
                //         if (!fail) {
                //             console.error("updateAppMessageShareData Share Fail", res);
                //             reject(new Error("Share Fail"));
                //             fail = true;
                //         }
                //     },
                // });
                // // “分享到朋友圈”及“分享到QQ空间”
                // const timelineConfig = Object.assign({}, config);
                // delete timelineConfig.desc;
                // window.wx.updateTimelineShareData({
                //     ...timelineConfig,
                //     success: () => {
                //         ++count;
                //         if (count >= 2) {
                //             resolve();
                //         }
                //     },
                //     fail: (res: any) => {
                //         if (!fail) {
                //             console.error("updateTimelineShareData Share Fail", res);
                //             reject(new Error("Share Fail"));
                //             fail = true;
                //         }
                //     },
                // });
            });
        });
    }

    /**
     * 扫码
     * @param type
     */
    public scanQRCode(type: WxScanType[] = ["qrCode", "barCode"]) {
        return this.MakeSureWxCnfigComplete().then(() => {
            return new Promise<string>((resolve, reject) => {
                window.wx.scanQRCode({
                    needResult: 1,
                    scanType: type,
                    success: (res: WxScanQRCode) => {
                        resolve(res.resultStr);
                    },
                    cancel: (res: any) => {
                        reject(new Error("用户取消扫码!"));
                    },
                    fail: (res: any) => {
                        console.error("scanQRCode", res);
                        reject(new Error("扫描二维码失败, 请稍后重试..."));
                    },
                });
            });
        });
    }
}
