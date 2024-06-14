import { Controller, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UserPayload } from 'src/common/decorators/user-payload.decorator';
import { JwtUserPayload } from 'src/common/types/jwt-user-payload';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';
import { User } from '@supabase/supabase-js';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly service: UsersService) { }

  @Delete('delete')
  @UseGuards(JwtAuthGuard)
  @ApiCookieAuth()
  async deleteOwnAccount(@UserPayload() user: JwtUserPayload): Promise<User> {
    return await this.service.deleteOne(user.sub);
  }
}
