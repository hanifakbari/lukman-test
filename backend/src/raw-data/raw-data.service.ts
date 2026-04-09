import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as zlib from 'zlib';
import * as path from 'path';
import csv from 'csv-parser';

import { RawData, RawDataDocument } from './raw-data.schema';

@Injectable()
export class RawDataService {
  constructor(
    @InjectModel(RawData.name)
    private rawModel: Model<RawDataDocument>,
  ) {}

  async upload(file: Express.Multer.File) {
    console.log('Processing:', file.originalname);

    if (!file.path || !fs.existsSync(file.path)) {
      throw new Error('File not found');
    }

    // Return Promise yang benar
    return new Promise((resolve, reject) => {
      const results: any[] = [];

      let stream: any = fs.createReadStream(file.path);

      if (file.originalname.endsWith('.gz')) {
        stream = stream.pipe(zlib.createGunzip());
      }

      stream
        .pipe(csv({ separator: ',' }))
        .on('data', (data: any) => {
          if (data['Object Name']?.trim()) {
            results.push(data);
          }
        })
        .on('end', async () => {
          console.log('Parsed rows:', results.length);

          // Handle empty file
          if (results.length === 0) {
            fs.unlinkSync(file.path);
            resolve({
              message: 'No data found',
              totalRows: 0,
              inserted: 0,
              skipped: 0,
            });
            return;
          }

          if (results.length > 0 && !results[0]['L.Cell.Avail.Dur']) {
            fs.unlinkSync(file.path);
            resolve({
              message:
                'File tidak mengandung data availability (L.Cell.Avail.Dur tidak ditemukan)',
              totalRows: results.length,
              inserted: 0,
              skipped: results.length,
            });
            return;
          }

          try {
            let inserted = 0;
            let skipped = 0;

            // Process dengan try-catch per row
            for (const row of results) {
              try {
                const objectName = row['Object Name']?.trim();
                const resultTimeStr = row['Result Time']?.trim();
                const availDurStr = (
                  row['L.Cell.Avail.Dur'] || row['"L.Cell.Avail.Dur"']
                )?.trim();

                if (!objectName || !resultTimeStr || !availDurStr) {
                  console.log('Skip reason - missing field:', {
                    hasObjectName: !!objectName,
                    hasResultTime: !!resultTimeStr,
                    hasAvailDur: !!availDurStr,
                    rowKeys: Object.keys(row),
                  });
                  skipped++;
                  continue;
                }

                if (!objectName || !resultTimeStr || !availDurStr) {
                  skipped++;
                  continue;
                }

                const enodebMatch = objectName.match(/eNodeB ID=(\d+)/);
                const cellMatch = objectName.match(/Local Cell ID=(\d+)/);

                if (!enodebMatch || !cellMatch) {
                  skipped++;
                  continue;
                }

                const enodebId = enodebMatch[1];
                const cellId = cellMatch[1];
                const resultTime = new Date(resultTimeStr);
                const availDur = parseInt(availDurStr, 10);

                if (isNaN(resultTime.getTime()) || isNaN(availDur)) {
                  skipped++;
                  continue;
                }

                // Upsert ke MongoDB
                await this.rawModel.updateOne(
                  { enodebId, cellId, resultTime },
                  { enodebId, cellId, resultTime, availDur },
                  { upsert: true },
                );
                inserted++;
              } catch (rowError: any) {
                console.log('Row error:', rowError.message);
                skipped++;
              }
            }

            console.log('Insert complete:', { inserted, skipped });

            // Cleanup file setelah proses
            fs.unlinkSync(file.path);

            // Resolve dengan hasil
            resolve({
              message: 'Upload complete',
              totalRows: results.length,
              inserted,
              skipped,
            });
          } catch (error) {
            console.log('Process error:', error);
            // Cleanup juga saat error
            if (fs.existsSync(file.path)) {
              fs.unlinkSync(file.path);
            }
            reject(error);
          }
        })
        .on('error', (err: any) => {
          console.log('Parse error:', err);
          // Cleanup saat parse error
          if (fs.existsSync(file.path)) {
            fs.unlinkSync(file.path);
          }
          reject(err);
        });
    });
  }

  async getGraph(query: any) {
    const { enodebId, cellId, startDate, endDate } = query;

    // Convert ke string untuk match schema
    const searchEnodebId = String(enodebId);
    const searchCellId = String(cellId);

    console.log('Query:', {
      enodebId: searchEnodebId,
      cellId: searchCellId,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
    });

    const data = await this.rawModel
      .find({
        enodebId: searchEnodebId,
        cellId: searchCellId,
        resultTime: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      })
      .sort({ resultTime: 1 });

    console.log('Found:', data.length, 'records');

    // Return format yang sesuai frontend
    return data.map((item) => ({
      resultTime: item.resultTime,
      availability: (item.availDur / 900) * 100,
    }));
  }
  async getOptions() {
    return this.rawModel.aggregate([
      {
        $group: {
          _id: { enodebId: '$enodebId', cellId: '$cellId' },
        },
      },
      {
        $project: {
          _id: 0,
          enodebId: '$_id.enodebId',
          cellId: '$_id.cellId',
        },
      },
    ]);
  }

  async getDateRange(enodebId: string, cellId: string) {
    const result = await this.rawModel.aggregate([
      { $match: { enodebId, cellId } },
      {
        $group: {
          _id: null,
          minDate: { $min: '$resultTime' },
          maxDate: { $max: '$resultTime' },
        },
      },
    ]);
    return result[0];
  }
}
