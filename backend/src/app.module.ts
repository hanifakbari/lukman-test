import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RawDataModule } from './raw-data/raw-data.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    RawDataModule,
  ],
})
export class AppModule {}
