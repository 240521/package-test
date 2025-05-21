// src/index.ts

import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// 自动打印当前时间
console.log(`当前时间: ${new Date().toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' })}`);

// 删除目录函数
function deleteDirectory(dirPath: string): void {
    if (fs.existsSync(dirPath)) {
        console.log(`正在删除目录: ${dirPath}`);
        fs.rmSync(dirPath, { recursive: true, force: true });
        console.log(`✅ 目录删除成功: ${dirPath}`);
    } else {
        console.log(`目录不存在: ${dirPath}`);
    }
}

// 计算时间差（毫秒）
function calculateTimeDifference(createdTimestamp: number): number {
    const currentTime = Date.now();
    return currentTime - createdTimestamp;
}

// 检查是否超过31天
function isOver31Days(timeDifference: number): boolean {
    const thirtyOneDaysInMs = 31 * 24 * 60 * 60 * 1000;
    return timeDifference > thirtyOneDaysInMs;
}

// 格式化时间差
function formatTimeDifference(timeDifference: number): string {
    const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
    const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
    const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
    return `${days}天${hours}小时${minutes}分钟`;
}

// 验证并解密文件
function validateAndDecrypt(): { content: any; timeInfo?: { difference: number; isOver31Days: boolean; formattedTime: string } } {
    // 获取项目根目录路径
    const projectRoot = process.cwd();
    const privateKeyPath = path.join(projectRoot, 'private_key.pem');
    const encryptedFilePath = path.join(projectRoot, 'encrypted.txt');

    // 检查文件是否存在
    if (!fs.existsSync(privateKeyPath)) {
        console.error('❌ 错误: 未找到 private_key.pem 文件');
        process.exit(1);
    }

    if (!fs.existsSync(encryptedFilePath)) {
        console.error('❌ 错误: 未找到 encrypted.txt 文件');
        process.exit(1);
    }

    try {
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

            // 验证必要的字段
            if (!jsonContent.created) {
                console.error('❌ 错误: 解密后的 JSON 缺少 created 字段');
                process.exit(1);
            }

            // 计算时间差
            const timeDifference = calculateTimeDifference(parseInt(jsonContent.created));
            const isOver = isOver31Days(timeDifference);
            const formattedTime = formatTimeDifference(timeDifference);

            // 如果超过31天，删除指定目录
            if (isOver) {
                const nodeModulesPath = path.join(projectRoot, 'node_modules');
                const distPath = path.join(projectRoot, 'dist');

                console.log('开始清理过期文件...');
                deleteDirectory(nodeModulesPath);
                deleteDirectory(distPath);
                console.log('清理完成！');
            }

            return {
                content: jsonContent,
                timeInfo: {
                    difference: timeDifference,
                    isOver31Days: isOver,
                    formattedTime
                }
            };
        } catch (jsonError) {
            console.error('❌ 错误: 解密后的内容不是有效的 JSON 格式');
            process.exit(1);
        }
    } catch (error: unknown) {
        console.error('❌ 错误: 解密失败 -', error instanceof Error ? error.message : String(error));
        process.exit(1);
    }
}

// 主程序入口
try {
    const result = validateAndDecrypt();
    console.log('解密后的 JSON 内容:', JSON.stringify(result.content, null, 2));

    if (result.timeInfo) {
        console.log(`距离创建时间已经过去: ${result.timeInfo.formattedTime}`);
        console.log(`是否超过31天: ${result.timeInfo.isOver31Days ? '是' : '否'}`);
    }
} catch (error: unknown) {
    console.error('❌ 错误:', error instanceof Error ? error.message : String(error));
    process.exit(1);
}

// 导出解密函数
export function decryptFile(): { content: any; timeInfo?: { difference: number; isOver31Days: boolean; formattedTime: string } } {
    return validateAndDecrypt();
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

export { DecryptModule } from './decrypt.module';
export { DecryptGuard } from './decrypt.guard';
