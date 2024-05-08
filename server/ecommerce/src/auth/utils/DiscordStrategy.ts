import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-discord';

import OAuth2Strategy, {
  InternalOAuthError,
  StrategyOptions,
} from 'passport-oauth2';
import 'dotenv/config';
import { AuthService } from '../auth.service';
import {
  DiscordProfile,
  DiscordProfileSchema,
} from 'src/utils/dtos/discord.dto';

type VerifyCallback = (err?: Error | null, user?: Express.User) => void;
type UserProfileCallback = (err?: Error | null, profile?: any) => void;

const AUTHORIZATION_URL = 'https://discord.com/oauth2/authorize';
const TOKEN_URL = 'https://discord.com/api/oauth2/token';
const PROFILE_URL = 'https://discord.com/api/users/@me';
@Injectable()
export class DiscordStrategy extends PassportStrategy(Strategy, 'discord') {
  private readonly logger: Logger;

  constructor(private readonly authService: AuthService) {
    super({
      authorizationURL: AUTHORIZATION_URL,
      tokenURL: TOKEN_URL,
      clientID: process.env.DISCORD_CLIENT_ID ?? '',
      clientSecret: process.env.DISCORD_CLIENT_SECRET ?? '',
      callbackURL: process.env.DISCORD_REDIRECT_URL ?? '',
      scope: ['identify', 'guilds'],
    } as StrategyOptions);
    this.logger = new Logger(DiscordStrategy.name);
  }

  public validate = async (
    accessToken: string,
    refreshToken: string,
    profile: DiscordProfile,
    done: VerifyCallback,
  ) => {
    try {
      const user = await this.authService.createOrGetDiscordUser(
        profile,
        accessToken,
        refreshToken,
      );
      return done(null, user as unknown as Express.User);
    } catch (error) {
      return done(error);
    }
  };

  public userProfile = async (
    accessToken: string,
    done: UserProfileCallback,
  ) => {
    this._oauth2.get(PROFILE_URL, accessToken, (err, body) => {
      if (err || !body) {
        this.logger.error({ err }, this.profileErrorMessage);
        return done(new InternalOAuthError(this.profileErrorMessage, err));
      }

      try {
        const parsedBody = JSON.parse((body ?? '').toString());
        return done(null, DiscordProfileSchema.parse(parsedBody));
      } catch (e) {
        this.logger.error(
          { err: e, rawProfile: body },
          this.profileErrorMessage,
        );
        return done(new Error(this.profileErrorMessage));
      }
    });
  };

  private get profileErrorMessage() {
    return 'Failed to parse user discord profile';
  }
}
