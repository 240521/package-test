import { toUpperCase, toLowerCase, StringUtils } from './index';

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