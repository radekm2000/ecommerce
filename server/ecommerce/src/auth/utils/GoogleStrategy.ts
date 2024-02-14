import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, StrategyOptions } from 'passport-google-oauth20';
import 'dotenv/config';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';

type VerifyCallback = (err?: Error | null, user?: Express.User) => void;

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly authService: AuthService) {
    super({
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['profile', 'email'],
    } as StrategyOptions);
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: VerifyCallback,
  ) {
    try {
      const user = await this.authService.createOrGetUser(
        profile,
        accessToken,
        refreshToken,
      );
      return done(null, user);
    } catch (error: any) {
      return done(error);
    }
  }
}
