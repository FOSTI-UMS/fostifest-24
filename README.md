# FOSTIFEST 2024

# Documentation
### Struktur proyek
``` 
fostifest-24/
├── public/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   └── svgs/
├── src/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   └── service/
├── next.config.js
├── package.json
└── README.md
```
### Penjelasan struktur proyek
```
public/ : berisi folder-folder yang menyimpan file statis seperti gambar, font, dan aset lainnya.
images/ : untuk menyimpan file gambar seperti .png, .jpg, .jpeg, .webp.
icons/: Menyimpan ikon (misalnya .ico, .png, .svg) yang digunakan dalam aplikasi.
svgs/: Menyimpan file SVG (Scalable Vector Graphics) yang digunakan dalam aplikasi.

src/ : berisi kode utama
app/: Menyimpan halaman-halaman aplikasi. Setiap file di dalam folder ini akan menjadi rute (route) di Next.js.
components/: Menyimpan komponen-komponen untuk digunakan pada halaman-halaman web.
hooks/: Menyimpan custom hooks React yang digunakan untuk mengelola logika aplikasi yang dapat digunakan kembali.
styles/: Menyimpan file CSS (sangat tidak disarankan untuk sering menggunakan css manual, karena sudah menggunakan framework Tailwind).
utils/: Menyimpan utilitas atau fungsi helper yang digunakan di berbagai bagian aplikasi.
service/: Menyimpan kode yang berhubungan dengan komunikasi dengan API atau layanan eksternal lainnya.

next.config.js: File konfigurasi untuk aplikasi Next.js. Digunakan untuk mengatur berbagai aspek aplikasi Next.js.
package.json: File yang berisi informasi tentang proyek, termasuk dependensi, skrip, dan metadata lainnya.
README.md: File dokumentasi yang menjelaskan proyek, bagaimana cara menginstal, menjalankan, dan informasi penting lainnya.
```

### Aturan penulisan/penamaan
```
folder: camelCase, contoh: userDashboard/
file: camelCase, contoh: fostifestSection.jsx
component: UpperCase, contoh: <AboutUsSection />
component function: UpperCase, contoh: AboutUsSection()
variable: camelCase, contoh: selectedIndex
function: camelCase, contoh: handleButton()
images/svgs/icons : kebab-case, contoh: header-image.png
CSS class: kebab-case, contoh: .burger-bar{}
```

# About
