import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { RawDataService } from './raw-data/raw-data.service';

// Path yang benar: ke root backend/, bukan ke dist/
const uploadDir = join(process.cwd(), 'uploads');

// Pastikan folder ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@Controller('raw-data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('files', {
      storage: diskStorage({
        destination: uploadDir,
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const filename = uniqueSuffix + extname(file.originalname);
          // console.log('Saving to:', join(uploadDir, filename));
          cb(null, filename);
        },
      }),
    }),
  )
  upload(@UploadedFile() file: Express.Multer.File) {
    console.log('File saved at:', file?.path);
    console.log('File size:', file?.size);
    console.log('=== DEBUG PATH ===');
    console.log('CWD:', process.cwd());
    console.log('__dirname:', __dirname);
    console.log('Upload dir:', uploadDir);
    console.log('File object:', file);
    console.log('==================');
    return this.rawDataService.upload(file);
  }
}
