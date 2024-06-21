import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/services/supabase/supabase.service';
import { SigninRequest } from './dto/signin/signin.request';
import { SignupRequest } from './dto/signup/signup.request';
import { Environment } from 'src/config/environment/environment';

@Injectable()
export class AuthService {
  constructor(private readonly authService: SupabaseService) { }

  async login(authLoginDto: SigninRequest) {
    const { data, error } = await this.authService.getClient().auth.signInWithPassword(authLoginDto);

    if (error) throw new HttpException(error.message, error.status);

    const session = data.session;
    delete session.user;

    return session;
  }

  async logout(jwtToken: string) {
    const { error } = await this.authService.getClient().auth.admin.signOut(jwtToken);

    if (error) throw new HttpException(error.message, error.status);
  }

  async create(createUserDto: SignupRequest) {
    const { data, error } = await this.authService.getClient().auth.signUp({
      ...createUserDto,
      options: { emailRedirectTo: Environment.Instance.SIGNUP_REDIRECT_URL },
    });

    if (error) throw new HttpException(error.message, error.status);

    return data.user;
  }
}
