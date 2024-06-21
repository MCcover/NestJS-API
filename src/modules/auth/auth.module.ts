import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseModule } from 'src/services/supabase/supabase.module';
import { JwtStrategy } from './jwt.strategy';
import { Environment } from 'src/config/environment/environment';

@Module({
  imports: [
    SupabaseModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: Environment.Instance.JWT_SECRET,
      })
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
