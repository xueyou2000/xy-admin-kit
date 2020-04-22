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

/**
 * 数组取差集
 * @param arr1
 * @param arr2
 * @example differenceSet([1, 2], [3, 4]) => [1, 2, 3, 4]
 * @example differenceSet([1, 2, 3], [4]) => [1, 2, 4]
 */
export function differenceSet<T>(arr1: T[], arr2: T[]) {
    return arr1.concat(arr2).filter(function (v) {
        return arr1.indexOf(v) === -1 || arr2.indexOf(v) === -1;
    });
}

/**
 * 数组取交集
 * @param arr1
 * @param arr2
 * @example intersectionSet([1, 2], [3, 1, 4]) => [1]
 * @example intersectionSet([1, 2], 3, [3, 4]) => [3]
 */
export function intersectionSet<T>(arr1: T[], arr2: T[]) {
    return arr1.filter(function (v) {
        return arr2.indexOf(v) !== -1; // 利用filter方法来遍历是否有相同的元素
    });
}

/**
 * 数组并集
 * @param arr1
 * @param arr2
 * @example unionSet([1, 2], [3, 1, 4]) => [1, 2, 3, 4]
 */
export function unionSet<T>(a: T[], b: T[]) {
    return a.concat(b.filter((v) => !a.includes(v)));
}
