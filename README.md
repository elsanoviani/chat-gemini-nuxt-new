# Chat App – Nuxt 3 + Prisma + PostgreSQL

A simple chat application with multiple chat sessions and messages.  
Built using **Nuxt 3**, **Prisma**, **PostgreSQL**, and **Logto** for authentication.
Url aplikasi: https://legendary-hotteok-d60c2e.netlify.app/
---

## 🚀 Tech Stack
- Nuxt 3 (frontend + backend)
- Prisma (ORM)
- PostgreSQL (database, bisa pakai lokal atau Supabase)
- Logto (authentication)

---

## ⚙️ Setup & Development

### 1. Clone repository
git clone https://github.com/yourusername/chat-app.git

cd chat-app


### 2. Install dependencies


npm install


### 3. Buat file `.env`
Isi dengan konfigurasi berikut:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/chatdb"
LOGTO_ENDPOINT="https://your-logto-domain
"
LOGTO_APP_ID="your-logto-app-id"
LOGTO_APP_SECRET="your-logto-app-secret"


### 4. Setup database
Jalankan migrasi Prisma:


npx prisma migrate dev --name init


Generate Prisma client:


npx prisma generate


### 5. Jalankan server


npm run dev

Buka [http://localhost:3000](http://localhost:3000)

---

## 📦 Project Structure


.
├── server/api/ # API routes (sessions, messages)
├── prisma/schema.prisma # Prisma schema
├── components/ # Vue components
├── pages/ # Nuxt pages
├── package.json
└── README.md


---

## 🛠️ Useful Commands

Run dev server

npm run dev

Build production

npm run build

Preview production build

npm run preview

Open Prisma Studio

npx prisma studio

---
