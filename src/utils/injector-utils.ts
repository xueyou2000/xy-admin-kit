/**
 * 获取方法名
 * @description 通过解析Function.prototype.toString()取得参数名
 * @param func
 */
export function getFunctionName(func: Function) {
    if (func.name) {
        return func.name;
    }
    // 正则表达式出自http://krasimirtsonev.com/blog/article/Dependency-injection-in-JavaScript
    const matchs = func.toString().match(/^function\s*[^\(]*\(\s*([^\)]*)\)/m);
    if (!matchs || matchs.length < 2) {
        return "";
    }
    var paramNames = matchs[1];
    paramNames = paramNames.replace(/ /g, "");
    paramNames = paramNames.split(",")[0];
    return paramNames;
}
