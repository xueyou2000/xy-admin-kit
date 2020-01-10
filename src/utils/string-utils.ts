/**
 * 尾部匹配
 * @param str 字符串
 * @param suffix 尾部字符串
 */
export function endsWith(str: string, suffix: string) {
    return str.indexOf(suffix, str.length - suffix.length) !== -1;
}

/**
 * 判断 accept 是否匹配
 */
export function attrAccept(file: File, acceptedFiles: string) {
    if (file && acceptedFiles) {
        const acceptedFilesArray = Array.isArray(acceptedFiles) ? acceptedFiles : acceptedFiles.split(",");
        const fileName = file.name || "";
        const mimeType = file.type || "";
        const baseMimeType = mimeType.replace(/\/.*$/, "");

        return acceptedFilesArray.some((type) => {
            const validType = type.trim();
            if (validType.charAt(0) === ".") {
                return endsWith(fileName.toLowerCase(), validType.toLowerCase());
            } else if (/\/\*$/.test(validType)) {
                // This is something like a image/* mime type
                return baseMimeType === validType.replace(/\/.*$/, "");
            }
            return mimeType === validType;
        });
    }
    return true;
}

/**
 * 获取扩展名
 * @param url
 */
export function extname(url: string) {
    if (!url) {
        return "";
    }
    const temp = url.split("/");
    const filename = temp[temp.length - 1];
    const filenameWithoutSuffix = filename.split(/\?/)[0];
    return (/\.[^./\\]*$/.exec(filenameWithoutSuffix) || [""])[0];
}

/**
 * 是否图片
 * @param url
 */
export function isImageUrl(url: string): boolean {
    const extension = extname(url);
    if (/^data:image\//.test(url) || /(webp|svg|png|gif|jpg|jpeg|bmp)$/i.test(extension)) {
        return true;
    } else if (/^data:/.test(url)) {
        // other file types of base64
        return false;
    } else if (extension) {
        // other file types which have extension
        return false;
    }
    return false;
}

/**
 * 清除空格
 * @param str
 */
export function trim(str?: string) {
    return (str + "").replace(/\s+/g, "");
}

/**
 * 获取url中 ? 后面的参数map
 * @param url
 */
export function parseSearch(url?: string) {
    url = url || window.location.href;
    url = decodeURIComponent(url);
    const search: string = url.slice(url.indexOf("?") + 1);
    const pariList = search.split("&");
    const paramsMap: any = {};

    pariList.forEach((pari) => {
        const params = pari.split("=");
        if (!params || params.length === 0) {
            return;
        }
        paramsMap[params[0]] = params[1];
    });

    return paramsMap;
}
