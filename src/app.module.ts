import { LoggingMiddleware } from '@middlewares/logging/logging.middleware';
import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { DecryptPipe } from '@pipes/decrypt/decrypt.pipe';
import { SupabaseModule } from '@root/src/services/supabase/supabase.module';
import { AuthModule } from './contexts/application/auth/auth.module';
import { CryptographyModule } from './contexts/application/cryptography/cryptography.module';
import { FilesModule } from './contexts/application/files/files.module';
import { PrismaModule } from './services/prisma/prisma.module';
import { PrismaService } from './services/prisma/prisma.service';

@Global()
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
    PrismaModule,
    SupabaseModule,
    AuthModule,
    FilesModule,
    CryptographyModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_PIPE,
      useClass: DecryptPipe,
    },
    PrismaService,
  ],

  exports: [

  ]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggingMiddleware).forRoutes("*");
  }
}
