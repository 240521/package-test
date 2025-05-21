"use strict";
// src/index.ts
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
exports.decryptFile = decryptFile;
exports.readEncryptedFile = readEncryptedFile;
exports.greet = greet;
exports.toUpperCase = toUpperCase;
exports.toLowerCase = toLowerCase;
exports.getCurrentTime = getCurrentTime;
exports.getCurrentDate = getCurrentDate;
exports.getCurrentTimeStamp = getCurrentTimeStamp;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
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
    const decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(encryptedContent, 'base64'));
    console.log('解密后的内容:', decrypted.toString('utf-8'));
}
catch (error) {
    console.error('解密过程中发生错误:', error instanceof Error ? error.message : String(error));
}
// 导出解密函数
function decryptFile() {
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
        const decrypted = crypto.privateDecrypt({
            key: privateKey,
            padding: crypto.constants.RSA_PKCS1_PADDING,
        }, Buffer.from(encryptedContent, 'base64'));
        return decrypted.toString('utf-8');
    }
    catch (error) {
        throw new Error(`解密失败: ${error instanceof Error ? error.message : String(error)}`);
    }
}
// 导出文件读取函数
function readEncryptedFile() {
    try {
        const projectRoot = process.cwd();
        const filePath = path.join(projectRoot, 'encrypted.txt');
        if (fs.existsSync(filePath)) {
            return fs.readFileSync(filePath, 'utf-8');
        }
        throw new Error('未找到 encrypted.txt 文件');
    }
    catch (error) {
        throw new Error(`读取文件失败: ${error instanceof Error ? error.message : String(error)}`);
    }
}
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