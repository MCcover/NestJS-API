import { Controller, Get, Req, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  hello(@Req() req: Request, @Res() res: Response) {
    res.status(200).json({
      value: "Hello World"
    });
  }
}
