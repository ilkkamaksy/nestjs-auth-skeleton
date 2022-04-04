import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  createToken(user: any) {
    const ttl = 60;
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: ttl }),
      expires_in: ttl,
    };
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);
    if (user && this.checkPassword(user.password, pass)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private checkPassword(hash, pass) {
    const a = Buffer.from(crypto.createHmac('sha256', pass).digest('hex'));
    const b = Buffer.from(hash);
    const valid = crypto.timingSafeEqual(a, b);
    return valid;
  }
}
