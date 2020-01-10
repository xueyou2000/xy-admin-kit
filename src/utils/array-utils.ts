/**
 * 填充构造指定长度数组
 * @param size
 * @param val
 */
export function fillingArray<T = any>(size: number, val: T) {
    const array = [];
    for (let i = 0; i < size; ++i) {
        array.push(val);
    }
    return array;
}

/**
 * 数组去重
 * @description 利用对象的属性不会重复这一特性，校验数组元素是否重复, 效率非常高, 比Set都高
 * @see https://www.cnblogs.com/wisewrong/p/9642264.html
 * @param a
 * @param b
 */
export function distinct<T>(a: T[], b: T[]) {
    let arr = a.concat(b);
    let result = [];
    let obj: any = {};

    for (let i of arr) {
        if (!obj[i]) {
            result.push(i);
            obj[i] = 1;
        }
    }

    return result;
}
