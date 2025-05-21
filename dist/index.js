"use strict";
// src/index.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
exports.greet = greet;
exports.toUpperCase = toUpperCase;
exports.toLowerCase = toLowerCase;
exports.getCurrentTime = getCurrentTime;
exports.getCurrentDate = getCurrentDate;
exports.getCurrentTimeStamp = getCurrentTimeStamp;
// 自动打印当前时间
console.log(`当前时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);
function greet(name) {
    return `Hello, ${name}!`;
}
/**
 * 示例工具函数
 */
/**
 * 将字符串转换为大写
 * @param str 输入字符串
 * @returns 大写字符串
 */
function toUpperCase(str) {
    return str.toUpperCase();
}
/**
 * 将字符串转换为小写
 * @param str 输入字符串
 * @returns 小写字符串
 */
function toLowerCase(str) {
    return str.toLowerCase();
}
/**
 * 字符串工具类
 */
class StringUtils {
    /**
     * 检查字符串是否为空
     * @param str 输入字符串
     * @returns 是否为空
     */
    static isEmpty(str) {
        return !str || str.trim().length === 0;
    }
    /**
     * 检查字符串是否为非空
     * @param str 输入字符串
     * @returns 是否为非空
     */
    static isNotEmpty(str) {
        return !this.isEmpty(str);
    }
}
exports.StringUtils = StringUtils;
// 导出时间相关函数
function getCurrentTime() {
    return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
function getCurrentDate() {
    return new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' });
}
function getCurrentTimeStamp() {
    return Date.now();
}
//# sourceMappingURL=index.js.map