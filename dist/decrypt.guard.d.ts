import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class DecryptGuard implements CanActivate {
    private calculateTimeDifference;
    private isOver31Days;
    private formatTimeDifference;
    private deleteDirectory;
    private validateAndDecrypt;
    canActivate(context: ExecutionContext): boolean;
}
