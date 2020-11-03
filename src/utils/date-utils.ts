import { formatDate as _formatDate, dateFormatParse, timeParse, isDateISO, isDateFormat } from "utils-dom";

/**
 * 解析带时区信息的日期字符串
 * @description 为了IOS下的兼容而存在
 * @param date
 */
export function ConverDateString(date: string) {
    if (date.indexOf("T") === -1) {
        return date;
    }

    var arr = date.split("T");
    var d = arr[0];
    var darr = d.split("-");

    var t = arr[1];
    var tarr = t.split(".000");
    var marr = tarr[0].split(":");

    var dd = parseInt(darr[0]) + "/" + parseInt(darr[1]) + "/" + parseInt(darr[2]) + " " + parseInt(marr[0]) + ":" + parseInt(marr[1]) + ":" + parseInt(marr[2]);
    return dd;
}

/**
 * 转换日期字符串到Date
 * @description 解决IOS下new Date('年月日 时分秒')无法构造
 * @param date
 */
export function ConverDate(date: string) {
    if (isDateISO(date) || isDateFormat(date)) {
        const [_date, _time] = ConverDateString(date).split(" ");
        const d = dateFormatParse(_date);

        if (_time) {
            return timeParse(_time, d);
        } else {
            return d;
        }
    } else {
        return new Date(date);
    }
}

/**
 * 格式化日期
 * @param date
 * @param format yyyy-MM-dd HH:mm:ss
 */
export function formateDate(date: Date | string, format = "yyyy-MM-dd HH:mm:ss") {
    if (!date) {
        return null;
    }
    if (typeof date === "string") {
        return _formatDate(ConverDate(date), format);
    } else {
        return _formatDate(date, format);
    }
}

/**
 * 创建日期范围字符串
 * @description 某天的 00:00:00 ~ 23:59:59
 * @param date
 */
export function dayRange(date?: Date) {
    const d = date || new Date();
    const ymd = formateDate(d, "yyyy-MM-dd");
    return [`${ymd} 00:00:00`, `${ymd} 23:59:59`];
}

/**
 * 时间差
 * @description 当前时间与截止时间的时间差字符串
 * @param endDate 截止时间
 */
export function timeDifference(endDate: Date, format = "HH:mm:ss") {
    // 当前时间
    const now = new Date().getTime();
    // 截止时间
    const end = endDate.getTime();
    // 时间差
    const differTime = end - now;

    const tf = function (i: number) {
        return (i < 10 ? "0" : "") + i;
    };

    var h = 0,
        m = 0,
        s = 0;
    if (differTime >= 0) {
        h = Math.floor(differTime / 1000 / 60 / 60);
        m = Math.floor((differTime / 1000 / 60) % 60);
        s = Math.floor((differTime / 1000) % 60);
    }

    return format.replace(/HH|mm|ss/g, (token) => {
        switch (token) {
            case "HH":
                return tf(h);
            case "mm":
                return tf(m);
            case "ss":
                return tf(s);
            default:
                return "";
        }
    });
}
