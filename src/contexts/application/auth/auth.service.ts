import { Injectable } from '@nestjs/common';
import { SupabaseService } from '@root/src/services/supabase/supabase.service';
import { SigninRequest } from './endpoints/signin/dto/signin.request';
import { SignupRequest } from './endpoints/signup/dto/signup.request';
import { Environment } from '@environment/environment';
import { AuthResponse, User } from '@supabase/supabase-js';
import { InvalidCredentialsError } from './errors/invalid_credentials.error';
import { EmailAlreadyExistsError } from './errors/email_already_exists.error';

@Injectable()
export class AuthService {
  constructor(private readonly authService: SupabaseService) { }

  async login(authLoginDto: SigninRequest) {
    const { data, error } = await this.authService.getClient().auth.signInWithPassword(authLoginDto);

    if (error) {
      throw new InvalidCredentialsError();
    }

    const session = data.session;
    delete session.user;

    return session;
  }

  async logout(jwtToken: string) {
    const { error } = await this.authService.getClient().auth.admin.signOut(jwtToken);

    if (error) {
      throw new InvalidCredentialsError();
    }
  }

  async refresh(jwtRefresh: string): Promise<AuthResponse> {
    return this.authService.getClient().auth.refreshSession({ refresh_token: jwtRefresh });
  }

  async create(createUserDto: SignupRequest): Promise<User> {
    const { data, error } = await this.authService.getClient().auth.signUp({
      ...createUserDto,
      options: { emailRedirectTo: Environment.Instance.SIGNUP_REDIRECT_URL },
    });

    if (error) {
      throw new EmailAlreadyExistsError();
    }

    return data.user;
  }
}
