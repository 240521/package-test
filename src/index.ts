// src/index.ts
export function greet(name: string): string {
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
export function toUpperCase(str: string): string {
    return str.toUpperCase();
}

/**
 * 将字符串转换为小写
 * @param str 输入字符串
 * @returns 小写字符串
 */
export function toLowerCase(str: string): string {
    return str.toLowerCase();
}

/**
 * 字符串工具类
 */
export class StringUtils {
    /**
     * 检查字符串是否为空
     * @param str 输入字符串
     * @returns 是否为空
     */
    static isEmpty(str: string): boolean {
        return !str || str.trim().length === 0;
    }

    /**
     * 检查字符串是否为非空
     * @param str 输入字符串
     * @returns 是否为非空
     */
    static isNotEmpty(str: string): boolean {
        return !this.isEmpty(str);
    }
}
