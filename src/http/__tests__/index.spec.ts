import XMLXmlHttpClientMock from "./XMLHttpRequestMock";
import XmlHttpClient from "../XmlHttpClient";
import HttpClientError from "../HttpClientError";
import HttpStatusCode from "../HttpStatusCode";
import { RequestOption, RequestMethod, Response } from "../types";

describe("HttpClient", () => {
    test("Request success", () => {
        const data = { status: "200", data: { name: "XueYou", age: 66 } };
        class SeccuessHttp extends XMLXmlHttpClientMock {
            public send(body?: Document | BodyInit | null) {
                this.status = 200;
                this.response = data;
                super.send(body);
            }
        }
        (global as any).XMLHttpRequest = SeccuessHttp;
        const http = new XmlHttpClient();
        return http.post("/user/1").then((res) => {
            expect(res.data).toEqual(data);
            expect(res.status).toBe(200);
        });
    });

    test("exception", () => {
        const data = { status: "401", msg: "未授权，请先登录" };
        class ErrorHttp extends XMLXmlHttpClientMock {
            public send(body?: Document | BodyInit | null) {
                this.status = 401;
                this.response = data;
                super.send(body);
            }
        }
        (global as any).XMLHttpRequest = ErrorHttp;
        const http = new XmlHttpClient();
        return http
            .post("/user/1")
            .then(() => console.error("401 status code should be error"))
            .catch((error: HttpClientError) => {
                expect(error.status).toBe(401);
                expect(error.message).toBe(HttpStatusCode[401]);
                expect(error.requestOption.url).toBe("/user/1");
            });
    });

    test("http option", () => {
        const data = { status: "200", data: { name: "XueYou", age: 66 } };
        class SeccuessHttp extends XMLXmlHttpClientMock {
            public send(body?: Document | BodyInit | null) {
                this.status = 200;
                this.response = data;
                super.send(body);
            }
        }
        (global as any).XMLHttpRequest = SeccuessHttp;
        const http = new XmlHttpClient({ baseURL: "/boss", timeout: 60000, headers: { client: "web" } }) as jest.Mocked<XmlHttpClient>;

        return http.post("/user/1").then((res) => {
            expect(res.config.url).toBe("/boss/user/1");
            expect(res.config.headers["client"]).toBe("web");
            expect(res.request.timeout).toBe(60000);
        });
    });

    test("request option", () => {
        const data = { status: "200", data: { name: "XueYou", age: 66 } };
        class SeccuessHttp extends XMLXmlHttpClientMock {
            public send(body?: Document | BodyInit | null) {
                expect(body).toBe(JSON.stringify({ name: "XueYou", age: 66 }));
                this.status = 200;
                this.response = data;
                super.send(body);
            }

            public open(method: RequestMethod, url: string, async?: boolean) {
                expect(method).toBe("POST");
                expect(url).toBe("/user/1");
            }
        }
        (global as any).XMLHttpRequest = SeccuessHttp;
        const http = new XmlHttpClient();
        return http.post("/user/1", { name: "XueYou", age: 66 }, { async: false, headers: { test: "test" } }).then((res) => {
            expect(res.data).toEqual(data);
            expect(res.config.headers["test"]).toBe("test");
        });
    });

    test("transformRequest", () => {
        const data = { status: "200", data: { name: "XueYou", age: 66 } };
        class SeccuessHttp extends XMLXmlHttpClientMock {
            public send(body?: Document | BodyInit | null) {
                expect(body).toBe(JSON.stringify({ name: "XueYou", age: 66, trans: "add" }));
                this.status = 200;
                this.response = data;
                super.send(body);
            }

            public open(method: RequestMethod, url: string, async?: boolean) {
                expect(method).toBe("POST");
                expect(url).toBe("/user/1");
            }
        }
        (global as any).XMLHttpRequest = SeccuessHttp;
        function transformRequest(request: RequestOption) {
            request.data["trans"] = "add";
            return request;
        }
        const http = new XmlHttpClient({ transformRequest }) as jest.Mocked<XmlHttpClient>;
        return http.post("/user/1", { name: "XueYou", age: 66 });
    });

    test("transformResponse", () => {
        const data = { status: "200", data: { name: "XueYou", age: 66 } };
        class SeccuessHttp extends XMLXmlHttpClientMock {
            public send(body?: Document | BodyInit | null) {
                this.status = 200;
                this.response = data;
                super.send(body);
            }
        }
        (global as any).XMLHttpRequest = SeccuessHttp;
        function transformResponse(response: Response<typeof data>) {
            response.data["token"] = "123456";
            return response;
        }
        const http = new XmlHttpClient({ transformResponse }) as jest.Mocked<XmlHttpClient>;
        return http.post("/user/1").then((res) => {
            expect(res.data).toEqual({ status: "200", data: { name: "XueYou", age: 66 }, token: "123456" });
        });
    });
});
