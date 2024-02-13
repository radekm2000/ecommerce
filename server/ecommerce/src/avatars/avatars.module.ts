import { Module } from '@nestjs/common';
import { AvatarsService } from './avatars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Avatar } from 'src/utils/entities/avatar.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Avatar])],
  providers: [AvatarsService],
})
export class AvatarsModule {}
