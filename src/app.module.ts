import { MiddlewareConsumer, Module, NestModule, Scope } from '@nestjs/common';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SupabaseModule } from './services/supabase/supabase.module';
import { AuthModule } from './modules/auth/auth.module';
import { FilesModule } from './modules/files/files.module';
import { CryptographyModule } from './modules/cryptography/cryptography.module';
import { DecryptPipe } from './pipes/decrypt/decrypt.pipe';

@Module({

  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 20,
      }
    ]),
    SupabaseModule,
    AuthModule,
    FilesModule,
    CryptographyModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useClass: DecryptPipe,
    }
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }

}
