import { RequestMethod } from "../types";

export default class XMLHttpRequestMock {
    public responseType: XMLHttpRequestResponseType;
    public withCredentials: boolean;
    public timeout: number;
    public status: number;
    public response: any;
    public responseText: string;

    public send(body?: Document | BodyInit | null) {
        this.onload();
    }

    public open(method: RequestMethod, url: string, async?: boolean) {}

    public setRequestHeader(name: string, value: string) {}

    public onload() {}

    public onerror() {}
}
