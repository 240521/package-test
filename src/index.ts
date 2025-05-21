// src/index.ts

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// 自动打印当前时间
console.log(`当前时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);

// 读取并解密文件
try {
    // 获取项目根目录路径
    const projectRoot = process.cwd();
    const privateKeyPath = path.join(projectRoot, 'private_key.pem');
    const encryptedFilePath = path.join(projectRoot, 'encrypted.txt');

    // 检查文件是否存在
    if (!fs.existsSync(privateKeyPath)) {
        console.error('未找到 private_key.pem 文件');
        process.exit(1);
    }

    if (!fs.existsSync(encryptedFilePath)) {
        console.error('未找到 encrypted.txt 文件');
        process.exit(1);
    }

    // 读取私钥和加密内容
    const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
    const encryptedContent = fs.readFileSync(encryptedFilePath, 'utf-8');

    // 解密内容
    const decrypted = crypto.privateDecrypt(
        {
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
            oaepHash: 'sha256',
        },
        Buffer.from(encryptedContent, 'base64')
    );

    // 尝试解析 JSON
    try {
        const jsonContent = JSON.parse(decrypted.toString('utf-8'));
        console.log('解密后的 JSON 内容:', JSON.stringify(jsonContent, null, 2));
        // 将时间戳转换为年月日格式
        const createdDate = new Date(parseInt(jsonContent.created));
        const formattedDate = createdDate.toLocaleDateString('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });

        console.log('创建时间:', formattedDate);
    } catch (jsonError) {
        console.log('解密后的内容:', decrypted.toString('utf-8'));
    }
} catch (error: unknown) {
    console.error('解密过程中发生错误:', error instanceof Error ? error.message : String(error));
}

// 导出解密函数
export function decryptFile(): string {
    try {
        const projectRoot = process.cwd();
        const privateKeyPath = path.join(projectRoot, 'private_key.pem');
        const encryptedFilePath = path.join(projectRoot, 'encrypted.txt');

        // 检查文件是否存在
        if (!fs.existsSync(privateKeyPath)) {
            throw new Error('未找到 private_key.pem 文件');
        }

        if (!fs.existsSync(encryptedFilePath)) {
            throw new Error('未找到 encrypted.txt 文件');
        }

        // 读取私钥和加密内容
        const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
        const encryptedContent = fs.readFileSync(encryptedFilePath, 'utf-8');

        // 解密内容
        const decrypted = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            Buffer.from(encryptedContent, 'base64')
        );

        // 尝试解析 JSON
        try {
            const jsonContent = JSON.parse(decrypted.toString('utf-8'));
            return JSON.stringify(jsonContent, null, 2);
        } catch (jsonError) {
            return decrypted.toString('utf-8');
        }
    } catch (error: unknown) {
        throw new Error(`解密失败: ${error instanceof Error ? error.message : String(error)}`);
    }
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
