# NetMon — LTE Network Availability Dashboard

Monitor dan analisis availability jaringan LTE secara real-time dari file PM Result EMS/OSS.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Recharts
- **Backend**: NestJS
- **Database**: MongoDB

## Prerequisites

- Node.js >= 18
- MongoDB running di localhost
- Yarn (frontend) / npm (backend)

## Setup & Installation

### 1. Clone repo

```bash
git clone <repo-url>
cd <repo-name>
```

### 2. Environment Variables

#### Frontend — buat file `.env.local` di folder `frontend/`

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

#### Backend — buat file `.env` di folder `backend/`

```env
MONGODB_URI=mongodb://localhost:27017/lukman_test
PORT=3001
```

### 3. Install Dependencies

```bash
# Frontend
cd frontend
yarn install

# Backend
cd backend
npm install
```

## Running the App

### Development

```bash
# Backend
cd backend
npm run start:dev

# Frontend (terminal baru)
cd frontend
yarn dev
```

### Production

```bash
# Backend
cd backend
npm run start:prod

# Frontend
cd frontend
yarn build
yarn start
```

App berjalan di:

- Frontend: http://localhost:3000
- Backend: http://localhost:3001

## Database

### Import Data (dari dump)

Pastikan MongoDB sudah berjalan, lalu jalankan:

```bash
cd ~/lukman-test
mongorestore --db lukman_test ./dump/lukman_test
```

### Export Data (membuat dump baru)

```bash
cd ~/lukman-test
mongodump --db lukman_test --out ./dump
```

## Upload Data

- Format file yang didukung: `.csv.gz` hasil export dari sistem EMS/OSS
- Field yang dibutuhkan di dalam CSV:
  - `Result Time` — waktu pengukuran
  - `Object Name` — berisi `eNodeB ID` dan `Local Cell ID`
  - `L.Cell.Avail.Dur` — durasi availability dalam detik
- File yang tidak mengandung kolom `L.Cell.Avail.Dur` akan diabaikan otomatis
- Duplikat data diabaikan berdasarkan kombinasi `eNodeB ID + Cell ID + Result Time`

---
