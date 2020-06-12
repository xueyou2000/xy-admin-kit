// 创建文本域用于全选文本
function virtualTextArea(text: string) {
    var textarea = document.createElement("textarea");
    textarea.id = "virtual-clipboard";
    // 防止ios放大
    textarea.style.fontSize = "12pt";
    // 移出可视区
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    textarea.value = text;
    document.body.append(textarea);
    textarea.select();
    textarea.focus();
    textarea.setSelectionRange(0, -1);
    return textarea;
}

/**
 * 内容拷贝
 * @param text
 */
export function clipboard(text: string) {
    if (!document.queryCommandSupported("copy")) {
        console.log("拷贝文本失败, 当前浏览器不支持copy命令!");
        return false;
    }
    var textarea = virtualTextArea(text);
    var result = document.execCommand("Copy");
    textarea.remove();
    return result;
}
