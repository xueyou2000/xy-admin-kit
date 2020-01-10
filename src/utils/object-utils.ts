/**
 * 提取扁平数据
 * @param data
 * @param key
 * @param children
 */
export function flat<T = any>(data: T[], key: string, children: string) {
    let keys: { [key: string]: T } = {};
    data.forEach((item) => {
        keys[item[key]] = { ...item };
        if (item[children] && item[children].length > 0) {
            keys = { ...keys, ...flat(item[children], key, children) };
        }
    });
    return keys;
}

/**
 * 提取扁平数据到数组
 * @param data
 * @param key
 * @param children
 */
export function flatToArray<T = any>(data: any[], key: string, children: string = "children") {
    let result: T[] = [];

    data.forEach((item) => {
        if (key in item) {
            result = result.concat(item[key]);
        }
        if (item[children] && item[children].length > 0) {
            result = result.concat(flatToArray(item[children], key, children));
        }
    });

    return result;
}

/**
 * 提取扁平数据
 * @param data
 * @param key
 * @param children
 */
export function flatNumberKey<T = any>(data: T[], key: string, children: string) {
    let keys: { [key: number]: T } = {};
    data.forEach((item) => {
        keys[item[key]] = { ...item };
        if (item[children] && item[children].length > 0) {
            keys = { ...keys, ...flat(item[children], key, children) };
        }
    });
    return keys;
}

/**
 * 检测是否纯对象类型
 * @param obj
 */
export function isObject(obj: any) {
    if (!obj) {
        return false;
    }
    return /Object/.test(Object.prototype.toString.call(obj));
}

/**
 * 检测是否纯数组类型
 * @param obj
 */
export function isArray(obj: any) {
    if (!obj) {
        return false;
    }
    return /Array/.test(Object.prototype.toString.call(obj));
}

/**
 * 对象key转数组
 * @param obj
 */
export function objectKeyToArray<T = any>(obj: any): T[] {
    if (!obj) {
        return [];
    }
    const keys = [];
    for (let key in obj) {
        keys.push(key);
    }
    return keys;
}

/**
 * 对象值转数组
 * @param obj
 */
export function objectValueToArray<T = any>(obj: any): T[] {
    if (!obj) {
        return [];
    }
    const keys = [];
    for (let key in obj) {
        keys.push(obj[key]);
    }
    return keys;
}

/**
 * 根据值获取对象key
 */
export function findObjectKey(object: any, value: any) {
    for (let key in object) {
        if (object[key] === value) {
            return key;
        }
    }
}
