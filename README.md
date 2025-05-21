# package-test

一个简单的 TypeScript 工具库，提供常用的字符串处理功能和时间工具。

## 特性

- 自动打印当前时间（当包被导入时）
- 字符串处理工具
- 时间处理工具

## 安装

```bash
npm install package-test
```

## 使用方法

```typescript
// 导入包时会自动打印当前时间
import 'package-test'

// 使用字符串工具
import { toUpperCase, toLowerCase, StringUtils } from 'package-test'

// 使用时间工具
import {
  getCurrentTime,
  getCurrentDate,
  getCurrentTimeStamp,
} from 'package-test'

// 获取当前时间
const currentTime = getCurrentTime() // 返回格式：2024/3/14 15:30:45

// 获取当前日期
const currentDate = getCurrentDate() // 返回格式：2024/3/14

// 获取时间戳
const timestamp = getCurrentTimeStamp() // 返回毫秒级时间戳
```

## API 文档

### 字符串工具

#### toUpperCase(str: string): string

将字符串转换为大写。

#### toLowerCase(str: string): string

将字符串转换为小写。

#### StringUtils.isEmpty(str: string): boolean

检查字符串是否为空。

#### StringUtils.isNotEmpty(str: string): boolean

检查字符串是否为非空。

### 时间工具

#### getCurrentTime(): string

获取当前时间（中国时区）。

#### getCurrentDate(): string

获取当前日期（中国时区）。

#### getCurrentTimeStamp(): number

获取当前时间戳（毫秒）。

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 构建
npm run build

# 代码格式化
npm run format

# 代码检查
npm run lint
```

## 许可证

MIT
