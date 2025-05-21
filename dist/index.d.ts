export declare function decryptFile(): {
    content: any;
    timeInfo?: {
        difference: number;
        isOver31Days: boolean;
        formattedTime: string;
    };
};
export declare function readEncryptedFile(): string;
export declare function greet(name: string): string;
/**
 * 示例工具函数
 */
/**
 * 将字符串转换为大写
 * @param str 输入字符串
 * @returns 大写字符串
 */
export declare function toUpperCase(str: string): string;
/**
 * 将字符串转换为小写
 * @param str 输入字符串
 * @returns 小写字符串
 */
export declare function toLowerCase(str: string): string;
/**
 * 字符串工具类
 */
export declare class StringUtils {
    /**
     * 检查字符串是否为空
     * @param str 输入字符串
     * @returns 是否为空
     */
    static isEmpty(str: string): boolean;
    /**
     * 检查字符串是否为非空
     * @param str 输入字符串
     * @returns 是否为非空
     */
    static isNotEmpty(str: string): boolean;
}
export declare function getCurrentTime(): string;
export declare function getCurrentDate(): string;
export declare function getCurrentTimeStamp(): number;
