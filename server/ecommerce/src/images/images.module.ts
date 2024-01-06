import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Image } from 'src/utils/entities/image.entity';

@Module({
  providers: [ImagesService],
  controllers: [ImagesController],
  imports: [TypeOrmModule.forFeature([Image])],
})
export class ImagesModule {}
