import {
  Controller,
  Post,
  Get,
  UseInterceptors,
  UploadedFiles,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { resolve } from 'path';
import * as fs from 'fs';
import { RawDataService } from './raw-data.service';

const uploadDir = resolve(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

@Controller('raw-data')
export class RawDataController {
  constructor(private readonly rawDataService: RawDataService) {}

  @Post('upload')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      storage: diskStorage({
        destination: uploadDir,
        filename: (_req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, uniqueSuffix + '-' + file.originalname);
        },
      }),
      limits: { fileSize: 50 * 1024 * 1024 },
    }),
  )
  async upload(@UploadedFiles() files: Express.Multer.File[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('No files uploaded');
    }
    const results = await Promise.all(
      files.map((f) => this.rawDataService.upload(f)),
    );
    return results;
  }

  @Get('graph')
  getGraph(@Query() query: any) {
    if (
      !query.enodebId ||
      !query.cellId ||
      !query.startDate ||
      !query.endDate
    ) {
      throw new BadRequestException('Missing required query params');
    }
    return this.rawDataService.getGraph(query);
  }

  @Get('options')
  getOptions() {
    return this.rawDataService.getOptions();
  }

  @Get('date-range')
  getDateRange(
    @Query('enodebId') enodebId: string,
    @Query('cellId') cellId: string,
  ) {
    return this.rawDataService.getDateRange(enodebId, cellId);
  }
}
