// src/index.ts

import * as fs from 'fs';
import * as path from 'path';

// 自动打印当前时间
console.log(`当前时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);

// 读取项目根目录的 encrypted.txt 文件
try {
    // 获取项目根目录路径
    const projectRoot = process.cwd();
    const filePath = path.join(projectRoot, 'encrypted.txt');

    // 检查文件是否存在
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf-8');
        console.log('读取到的 encrypted.txt 内容:', content);
    } else {
        console.log('未找到 encrypted.txt 文件');
    }
} catch (error: unknown) {
    console.error('读取文件时发生错误:', error instanceof Error ? error.message : String(error));
}

// 导出文件读取函数
export function readEncryptedFile(): string {
    try {
        const projectRoot = process.cwd();
        const filePath = path.join(projectRoot, 'encrypted.txt');

        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf-8');
        }
        throw new Error('未找到 encrypted.txt 文件');
    } catch (error: unknown) {
        throw new Error(`读取文件失败: ${error instanceof Error ? error.message : String(error)}`);
    }
}

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

// 导出时间相关函数
export function getCurrentTime(): string {
    return new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

export function getCurrentDate(): string {
    return new Date().toLocaleDateString('zh-CN', { timeZone: 'Asia/Shanghai' });
}

export function getCurrentTimeStamp(): number {
    return Date.now();
}
