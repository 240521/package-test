import { Module, Global } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { DecryptGuard } from './decrypt.guard';

@Global()
@Module({
    providers: [
        {
            provide: APP_GUARD,
            useClass: DecryptGuard,
        },
    ],
    exports: [DecryptGuard],
})
export class DecryptModule { } 