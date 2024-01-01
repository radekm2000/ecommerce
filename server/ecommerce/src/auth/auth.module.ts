import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/utils/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { GoogleStrategy } from './utils/GoogleStrategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
    }),
  ],
  providers: [AuthService, UsersService, GoogleStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
