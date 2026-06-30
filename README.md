# Admira Dashboard

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.x-42b883?style=for-the-badge&logo=vue.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-5.x-646cff?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/TailwindCSS-3.x-38bdf8?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge"/>
</p>

Admira Dashboard adalah template admin panel modern berbasis **Vue 3** dan **Vite**, didesain untuk mengelola data bisnis seperti produk, pesanan, pelanggan, dan laporan — semuanya dalam satu tampilan yang bersih dan responsif.

<img width="1850" height="915" alt="Login" src="https://github.com/user-attachments/assets/de890271-b918-4e70-977d-a12db332334b" />
<img width="1915" height="941" alt="Setting" src="https://github.com/user-attachments/assets/d7149af3-4b78-4de7-88d2-c19795f2ea81" />
<img width="1889" height="934" alt="profile" src="https://github.com/user-attachments/assets/e5c237a2-01d5-4994-8733-9eee711fd72c" />
<img width="1902" height="941" alt="Signup" src="https://github.com/user-attachments/assets/8d76e0c8-6956-401c-9966-a3f848d7a57e" />
<img width="1896" height="933" alt="forgot" src="https://github.com/user-attachments/assets/74fa81d7-54f4-4883-ab18-f91b1831c69e" />

---

## ✨ Fitur Utama

- **Overview** — ringkasan statistik bisnis secara real-time
- **Analytics** — visualisasi data penjualan dan performa
- **Products** — manajemen katalog produk dengan grid & list view
- **Orders** — pelacakan dan pengelolaan pesanan pelanggan
- **Customers** — database pelanggan dengan segmentasi
- **Reports** — laporan bisnis yang dapat diekspor
- **Settings** — pengaturan akun, keamanan, dan preferensi
- **My Profile** — halaman profil pengguna dengan progress completion
- **Auth Pages** — Login, Register, dan Forgot Password
- Desain responsif untuk desktop dan mobile
- Komponen modular dengan Vue 3 Composition API + Composables

---

## 🛠️ Teknologi yang Digunakan

| Teknologi | Versi | Kegunaan |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.x | Framework utama (Composition API) |
| [Vite](https://vitejs.dev/) | ^5.x | Build tool & dev server |
| [Vue Router](https://router.vuejs.org/) | ^4.x | Client-side routing |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.x | Utility-first styling |
| JavaScript (ES2020+) | — | Bahasa pemrograman utama |
| HTML5 | — | Struktur template |
| CSS3 | — | Styling tambahan |

---

## 📋 Requirement

Pastikan perangkat kamu sudah terinstal:

- **Node.js** versi `18.x` atau lebih baru → [Download Node.js](https://nodejs.org/)
- **npm** versi `9.x` atau lebih baru (sudah termasuk dalam Node.js)
- **Git** → [Download Git](https://git-scm.com/)
- Editor kode, disarankan **VS Code** dengan ekstensi [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

Cek versi yang sudah terinstal:

```bash
node -v
npm -v
git --version
```

---

## 🚀 Cara Instalasi

### 1. Clone Repository

```bash
git clone https://github.com/username/admira-dashboard.git
cd admira-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Jalankan Dev Server

```bash
npm run dev
```

Buka browser dan akses `http://localhost:5173`

### 4. Build untuk Production

```bash
npm run build
```

### 5. Preview Build Production

```bash
npm run preview
```

---

## 🪟 Instalasi di Windows

Jika kamu menggunakan Windows, ikuti langkah berikut:

**1. Install Node.js**

Download installer Node.js dari [nodejs.org](https://nodejs.org/) dan jalankan sebagai Administrator.

**2. Buka Terminal**

Gunakan salah satu dari:
- **Command Prompt** (CMD)
- **PowerShell**
- **Git Bash** (direkomendasikan)
- **Windows Terminal**

**3. Clone & Install**

```bash
git clone https://github.com/UIDesign-Stack/admira-dashboard
cd admira-dashboard
npm install
npm run dev
```

**4. Jika ada error `EACCES` atau permission denied**

Jalankan terminal sebagai **Administrator**, atau gunakan:

```bash
npm install --legacy-peer-deps
```

**5. Jika port 5173 sudah digunakan**

```bash
npm run dev -- --port 3000
```

## 🔓 Open Source

Proyek ini bersifat **open source** dan dirilis di bawah lisensi **MIT**.

Kontribusi sangat disambut! Jika kamu menemukan bug atau ingin menambahkan fitur baru:

1. Fork repository ini
2. Buat branch baru: `git checkout -b fitur/nama-fitur`
3. Commit perubahan: `git commit -m 'feat: tambah fitur X'`
4. Push ke branch: `git push origin fitur/nama-fitur`
5. Buat Pull Request

---

## 📄 Lisensi

```
MIT License

Copyright (c) 2026 Admira Dashboard Created By: FajarDev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

<p align="center">Dibuat dengan ❤️ menggunakan Vue 3 + Vite</p>
