import { toUpperCase, toLowerCase, StringUtils, getCurrentTime, getCurrentDate, getCurrentTimeStamp, readEncryptedFile, decryptFile } from './index';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

// 模拟 fs 模块
jest.mock('fs');
jest.mock('path');
jest.mock('crypto');

describe('String Utils', () => {
    describe('toUpperCase', () => {
        it('should convert string to uppercase', () => {
            expect(toUpperCase('hello')).toBe('HELLO');
            expect(toUpperCase('Hello World')).toBe('HELLO WORLD');
        });
    });

    describe('toLowerCase', () => {
        it('should convert string to lowercase', () => {
            expect(toLowerCase('HELLO')).toBe('hello');
            expect(toLowerCase('Hello World')).toBe('hello world');
        });
    });

    describe('StringUtils', () => {
        describe('isEmpty', () => {
            it('should return true for empty strings', () => {
                expect(StringUtils.isEmpty('')).toBe(true);
                expect(StringUtils.isEmpty('   ')).toBe(true);
                expect(StringUtils.isEmpty(null as any)).toBe(true);
                expect(StringUtils.isEmpty(undefined as any)).toBe(true);
            });

            it('should return false for non-empty strings', () => {
                expect(StringUtils.isEmpty('hello')).toBe(false);
                expect(StringUtils.isEmpty('  hello  ')).toBe(false);
            });
        });

        describe('isNotEmpty', () => {
            it('should return false for empty strings', () => {
                expect(StringUtils.isNotEmpty('')).toBe(false);
                expect(StringUtils.isNotEmpty('   ')).toBe(false);
                expect(StringUtils.isNotEmpty(null as any)).toBe(false);
                expect(StringUtils.isNotEmpty(undefined as any)).toBe(false);
            });

            it('should return true for non-empty strings', () => {
                expect(StringUtils.isNotEmpty('hello')).toBe(true);
                expect(StringUtils.isNotEmpty('  hello  ')).toBe(true);
            });
        });
    });
});

describe('Time Utils', () => {
    describe('getCurrentTime', () => {
        it('should return current time in Chinese format', () => {
            const time = getCurrentTime();
            expect(typeof time).toBe('string');
            expect(time).toMatch(/\d{4}\/\d{1,2}\/\d{1,2} \d{1,2}:\d{1,2}:\d{1,2}/);
        });
    });

    describe('getCurrentDate', () => {
        it('should return current date in Chinese format', () => {
            const date = getCurrentDate();
            expect(typeof date).toBe('string');
            expect(date).toMatch(/\d{4}\/\d{1,2}\/\d{1,2}/);
        });
    });

    describe('getCurrentTimeStamp', () => {
        it('should return current timestamp', () => {
            const timestamp = getCurrentTimeStamp();
            expect(typeof timestamp).toBe('number');
            expect(timestamp).toBeGreaterThan(0);
        });
    });
});

describe('File Utils', () => {
    beforeEach(() => {
        // 重置所有模拟
        jest.clearAllMocks();
    });

    describe('readEncryptedFile', () => {
        it('should read file content when file exists', () => {
            // 模拟文件存在
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.readFileSync as jest.Mock).mockReturnValue('test content');
            (path.join as jest.Mock).mockReturnValue('/test/path/encrypted.txt');

            const content = readEncryptedFile();
            expect(content).toBe('test content');
            expect(fs.existsSync).toHaveBeenCalled();
            expect(fs.readFileSync).toHaveBeenCalledWith('/test/path/encrypted.txt', 'utf-8');
        });

        it('should throw error when file does not exist', () => {
            // 模拟文件不存在
            (fs.existsSync as jest.Mock).mockReturnValue(false);
            (path.join as jest.Mock).mockReturnValue('/test/path/encrypted.txt');

            expect(() => readEncryptedFile()).toThrow('未找到 encrypted.txt 文件');
        });

        it('should throw error when file read fails', () => {
            // 模拟文件读取失败
            (fs.existsSync as jest.Mock).mockReturnValue(true);
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error('读取错误');
            });
            (path.join as jest.Mock).mockReturnValue('/test/path/encrypted.txt');

            expect(() => readEncryptedFile()).toThrow('读取文件失败: 读取错误');
        });
    });
});

describe('Decryption Utils', () => {
    beforeEach(() => {
        // 重置所有模拟
        jest.clearAllMocks();
    });

    describe('decryptFile', () => {
        it('should decrypt file content successfully', () => {
            // 模拟文件存在
            (fs.existsSync as jest.Mock).mockImplementation((path: string) => true);
            (fs.readFileSync as jest.Mock).mockImplementation((path: string) => {
                if (path.includes('private_key.pem')) {
                    return '-----BEGIN PRIVATE KEY-----\nMOCK_PRIVATE_KEY\n-----END PRIVATE KEY-----';
                }
                return 'MOCK_ENCRYPTED_CONTENT';
            });
            (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
            (crypto.privateDecrypt as jest.Mock).mockReturnValue(Buffer.from('decrypted content'));

            const content = decryptFile();
            expect(content).toBe('decrypted content');
            expect(fs.existsSync).toHaveBeenCalledTimes(2);
            expect(fs.readFileSync).toHaveBeenCalledTimes(2);
            expect(crypto.privateDecrypt).toHaveBeenCalled();
        });

        it('should throw error when private key file is missing', () => {
            // 模拟私钥文件不存在
            (fs.existsSync as jest.Mock).mockImplementation((path: string) =>
                !path.includes('private_key.pem')
            );
            (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));

            expect(() => decryptFile()).toThrow('未找到 private_key.pem 文件');
        });

        it('should throw error when encrypted file is missing', () => {
            // 模拟加密文件不存在
            (fs.existsSync as jest.Mock).mockImplementation((path: string) =>
                !path.includes('encrypted.txt')
            );
            (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));

            expect(() => decryptFile()).toThrow('未找到 encrypted.txt 文件');
        });

        it('should throw error when decryption fails', () => {
            // 模拟文件存在但解密失败
            (fs.existsSync as jest.Mock).mockImplementation((path: string) => true);
            (fs.readFileSync as jest.Mock).mockImplementation((path: string) => {
                if (path.includes('private_key.pem')) {
                    return '-----BEGIN PRIVATE KEY-----\nMOCK_PRIVATE_KEY\n-----END PRIVATE KEY-----';
                }
                return 'MOCK_ENCRYPTED_CONTENT';
            });
            (path.join as jest.Mock).mockImplementation((...args) => args.join('/'));
            (crypto.privateDecrypt as jest.Mock).mockImplementation(() => {
                throw new Error('解密失败');
            });

            expect(() => decryptFile()).toThrow('解密失败: 解密失败');
        });
    });
}); 