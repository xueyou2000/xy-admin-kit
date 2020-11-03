// 显示打包进度
import progress from "rollup-plugin-progress";
// 解析node_modules里的包
import resolve from "@rollup/plugin-node-resolve";
// 解析commonjs包
import commonjs from "@rollup/plugin-commonjs";
// 解析ts
import typescript from "@rollup/plugin-typescript";

// 扩展名
const extensions = [".js", ".jsx", ".ts", ".tsx"];

export default {
    input: "src/index.ts",
    output: {
        // 打包成浏览器或node能调用的
        file: "dist/index.js",
        format: "umd",
        name: "XyAdminKit",
        sourcemap: true,
    },
    plugins: [
        resolve({
            extensions,
        }),
        commonjs({
            include: "node_modules/**",
        }),
        typescript(),
        progress({ clearLine: true }),
    ],
};
