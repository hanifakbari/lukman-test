"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const zlib = __importStar(require("zlib"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const path = __importStar(require("path"));
const filePath = path.join(__dirname, 'uploads', 'HOST03_pmresult_1526726662_15_202207221130_202207221145.csv.gz');
let stream = fs.createReadStream(filePath).pipe(zlib.createGunzip());
let rowCount = 0;
stream
    .pipe((0, csv_parser_1.default)({ separator: ',' }))
    .on('data', (row) => {
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
//# sourceMappingURL=test-csv.js.map