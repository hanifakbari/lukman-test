import * as fs from 'fs';
import * as zlib from 'zlib';
import csv from 'csv-parser';
import * as path from 'path';

const filePath = path.join(
  __dirname,
  'uploads',
  'HOST03_pmresult_1526726662_15_202207221130_202207221145.csv.gz',
);

let stream: any = fs.createReadStream(filePath).pipe(zlib.createGunzip());

let rowCount = 0;
stream
  .pipe(csv({ separator: ',' })) // Hanya separator
  .on('data', (row: any) => {
    // Skip empty rows manual
    if (!row['Object Name'] && !row['Result Time']) {
      console.log('Skipping empty row');
      return;
    }

    rowCount++;
    if (rowCount <= 3) {
      console.log(`\n=== Row ${rowCount} ===`);
      console.log('All keys:', Object.keys(row));
      console.log('Object Name:', row['Object Name']);
      console.log('Result Time:', row['Result Time']);

      const availDur = row['L.Cell.Avail.Dur'] || row['"L.Cell.Avail.Dur"'];
      console.log('AvailDur:', availDur);
    }
  })
  .on('end', () => {
    console.log(`\nTotal rows (non-empty): ${rowCount}`);
  })
  .on('error', console.error);
