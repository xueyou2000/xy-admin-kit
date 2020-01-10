/**
 * ws套接字
 */
export default class SocktSimple<T> {
    /**
     * ws套接字
     */
    private socket: WebSocket;

    /**
     * ws/wss 协议地址
     */
    private url: string;

    /**
     * 消息接收事件
     */
    private onMessage?: (d: T) => void;

    /**
     * 构造函数
     * @param url ws/wss 协议地址
     */
    public constructor(url: string, onMessage?: (d: T) => void) {
        this.url = url;
        this.onMessage = onMessage;
        this.socket = new WebSocket(url);
        this.init();
    }

    private init() {
        const { socket, onMessage, url } = this;

        socket.addEventListener("open", function(event) {
            console.log(`${url} 套接字连接成功!`);
        });

        socket.addEventListener("error", function(event) {
            console.error("套接字连接失败 ", event);
        });

        socket.addEventListener("message", (event) => {
            const response: T = JSON.parse(event.data);
            if (onMessage) {
                onMessage(response);
            }
        });

        // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
        window.onbeforeunload = function() {
            socket.close();
        };
    }

    /**
     * 发送数据
     * @param data
     */
    public send(data: string) {
        this.socket.send(data);
    }
}
