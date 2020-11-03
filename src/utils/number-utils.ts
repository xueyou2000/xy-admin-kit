const FIX_NUMBER = 1000;

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 *
 * @param num 数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
export function formatCurrency(num: any) {
    if (!num) {
        return "0.00";
    }
    num = num.toString().replace(/\$|\,/g, "");
    if (isNaN(num)) num = "0";
    var sign = num == (num = Math.abs(num));
    num = Math.floor(num * 100 + 0.50000000001);
    var cents: any = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) {
        cents = "0" + cents;
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) num = num.substring(0, num.length - (4 * i + 3)) + "," + num.substring(num.length - (4 * i + 3));
    return (sign ? "" : "-") + num + "." + cents;
}

/**
 * 限制在 lower 和 upper 之间的值
 * @param i 被限制的值
 * @param min 下限
 * @param max 上限
 */
export function clamp(i: number, min: number, max: number) {
    if (i < min) {
        return min;
    } else if (i > max) {
        return max;
    } else {
        return i;
    }
}

/**
 * 提供精确的加法运算
 * @param num1 被加数
 * @param num2 加数
 * @returns 两个参数的和  num1 + num2
 */
export function add(num1: number, num2: number) {
    return (num1 * FIX_NUMBER + num2 * FIX_NUMBER) / FIX_NUMBER;
}

/**
 * 提供精确的减法运算
 * @param num1 被减数
 * @param num2 减数
 * @returns 两个参数的差  num1 - num2
 */
export function sub(num1: number, num2: number) {
    return (num1 * FIX_NUMBER - num2 * FIX_NUMBER) / FIX_NUMBER;
}
