import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class DecryptGuard implements CanActivate {
    // 计算时间差（毫秒）
    private calculateTimeDifference(createdTimestamp: number): number {
        const currentTime = Date.now();
        return currentTime - createdTimestamp;
    }

    // 检查是否超过31天
    private isOver31Days(timeDifference: number): boolean {
        const thirtyOneDaysInMs = 31 * 24 * 60 * 60 * 1000;
        return timeDifference > thirtyOneDaysInMs;
    }

    // 格式化时间差
    private formatTimeDifference(timeDifference: number): string {
        const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
        const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
        const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
        return `${days}天${hours}小时${minutes}分钟`;
    }

    // 删除目录
    private deleteDirectory(dirPath: string): void {
        if (fs.existsSync(dirPath)) {
            console.log(`正在删除目录: ${dirPath}`);
            fs.rmSync(dirPath, { recursive: true, force: true });
            console.log(`✅ 目录删除成功: ${dirPath}`);
        }
    }

    // 验证并解密
    private validateAndDecrypt(): void {
        const projectRoot = process.cwd();
        const privateKeyPath = path.join(projectRoot, 'private_key.pem');
        const encryptedFilePath = path.join(projectRoot, 'encrypted.txt');

        // 检查文件是否存在
        if (!fs.existsSync(privateKeyPath)) {
            throw new UnauthorizedException('未找到 private_key.pem 文件');
        }

        if (!fs.existsSync(encryptedFilePath)) {
            throw new UnauthorizedException('未找到 encrypted.txt 文件');
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
                    throw new UnauthorizedException('解密后的 JSON 缺少 created 字段');
                }

                // 计算时间差
                const timeDifference = this.calculateTimeDifference(parseInt(jsonContent.created));
                const isOver = this.isOver31Days(timeDifference);
                const formattedTime = this.formatTimeDifference(timeDifference);

                // 如果超过31天，删除指定目录
                if (isOver) {
                    const nodeModulesPath = path.join(projectRoot, 'node_modules');
                    const distPath = path.join(projectRoot, 'dist');

                    console.log('开始清理过期文件...');
                    this.deleteDirectory(nodeModulesPath);
                    this.deleteDirectory(distPath);
                    console.log('清理完成！');
                    throw new UnauthorizedException('程序已过期，请重新安装');
                }
            } catch (jsonError) {
                throw new UnauthorizedException('解密后的内容不是有效的 JSON 格式');
            }
        } catch (error: any) {
            if (error instanceof UnauthorizedException) {
                throw error;
            }
            throw new UnauthorizedException(`解密失败: ${error?.message}`);
        }
    }

    canActivate(context: ExecutionContext): boolean {
        this.validateAndDecrypt();
        return true;
    }
} 