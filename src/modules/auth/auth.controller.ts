import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RegisterRequest } from './requests/register.request';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('register')
  public async register(@Body() body: RegisterRequest): Promise<any> {
    return this.userService.createUser(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  public async login(@Request() req): Promise<any> {
    return this.authService.createToken(req.user);
  }
}
