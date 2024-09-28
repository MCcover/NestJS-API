import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { SupabaseModule } from '@root/src/services/supabase/supabase.module';
import { JwtStrategy } from './jwt.strategy';
import { Environment } from '@environment/environment';
import { AuthSigninController } from './endpoints/signin/signin.endpoint';
import { AuthSignupController } from './endpoints/signup/signup.endpoint';
import { AuthRefreshController } from './endpoints/refresh/refresh.endpoint';
import { AuthLogoutController } from './endpoints/logout/logout.endpoint';

@Module({
  imports: [
    SupabaseModule,
    JwtModule.registerAsync({
      useFactory: async () => ({
        secret: Environment.Instance.JWT_SECRET,
      })
    }),
  ],
  controllers: [
    AuthSigninController,
    AuthSignupController,
    AuthRefreshController,
    AuthLogoutController
  ],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule { }
