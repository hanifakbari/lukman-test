import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawDataController } from './raw-data.controller';
import { RawDataService } from './raw-data.service';
import { RawData, RawDataSchema } from './raw-data.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RawData.name, schema: RawDataSchema }]),
  ],
  controllers: [RawDataController],
  providers: [RawDataService],
})
export class RawDataModule {}
