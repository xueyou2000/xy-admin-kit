/**
 * 设置Cookie
 * @param cname cookie名称
 * @param cvalue cookie值
 * @param exdays 过期天数
 */
export function setCookie(cname: string, cvalue: string, exdays: number) {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires;
}

/**
 * 获取cookie值
 * @param cname cookie名称
 */
export function getCookie(cname: string) {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i].trim();
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

/**
 * 删除cookie
 * @param cname cookie名称
 */
export function delCookie(cname: string) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null) document.cookie = name + "=" + cval + ";expires=" + exp.toUTCString();
}
