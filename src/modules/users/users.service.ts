import { HttpException, Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/modules/supabase/supabase.service';

@Injectable()
export class UsersService {
  constructor(private readonly supabase: SupabaseService) { }

  async deleteOne(id: string) {
    const { data, error } = await this.supabase
      .getClient()
      .auth.admin.deleteUser(id);

    if (error) throw new HttpException(error.message, error.status);

    return data.user;
  }
}
