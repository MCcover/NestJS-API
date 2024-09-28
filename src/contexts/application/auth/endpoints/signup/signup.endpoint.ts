import { Body, Controller, HttpStatus, Post } from "@nestjs/common";
import { AuthService } from "../../auth.service";
import { ApiTags } from "@nestjs/swagger";
import { SignupRequest } from "./dto/signup.request";
import { ErrorResponse } from "@root/src/common/responses/error.response";
import { SignupResponse } from "./dto/signup.response";

@Controller('auth')
@ApiTags('Authentication')
export class AuthSignupController {
    constructor(private readonly authService: AuthService,) { }

    @Post('signup')
    async signup(@Body() createUserDto: SignupRequest): Promise<SignupResponse> {
        await this.authService.create(createUserDto);

        return new SignupResponse("OK");
    }
}