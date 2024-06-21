import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ErrorResponse } from 'src/common/responses/error.response';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {

}
