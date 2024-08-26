<!DOCTYPE html>
<html lang="en">
<body>
  <div class="container">
    <h1>FOSTIFEST 2024</h1>
    <p>FOSTIFEST adalah kegiatan tahunan yang diselenggarakan oleh Forum Open Source Teknik Informatika (FOSTI) UMS. FOSTIFEST 2024 mengusung tema "Designing the Future: Creative Tech for The Digital Age". Acara ini mencakup workshop tentang pembuatan aplikasi chat dengan Vue.js, serta kompetisi pada kategori Competitive Programming, Software Development dan UI/UX Design. FOSTIFEST bertujuan meningkatkan keterampilan teknis, mendorong kreativitas, dan memperluas peluang karir di teknologi digital.
</p>
    <h2>Documentation</h2>
    <h3>Struktur proyek</h3>
<a href="https://medium.com/@megh16/next-clean-architecture-a-guide-for-scalable-apps-611326d4581b "> Referensi arsitektur </a>
    <pre>
fostifest-24/
├── public/
│   ├── fonts/
│   ├── icons/
│   ├── images/
│   └── svgs/
├── src/
│   ├── app/
│   ├── components/
│   ├── constants/
│   ├── hooks/
│   ├── styles/
│   ├── utils/
│   └── service/
├── next.config.js
├── package.json
└── README.md
    </pre>
    <h3>Penjelasan struktur proyek</h3>
    <ul>
      <li><strong>public/</strong> : berisi folder-folder yang menyimpan file statis seperti gambar, font, dan aset lainnya.</li>
      <li><strong>images/</strong> : untuk menyimpan file gambar seperti .png, .jpg, .jpeg, .webp.</li>
      <li><strong>icons/</strong> : Menyimpan ikon (misalnya .ico, .png, .svg) yang digunakan dalam aplikasi.</li>
      <li><strong>svgs/</strong> : Menyimpan file SVG (Scalable Vector Graphics) yang digunakan dalam aplikasi.</li>
      <li><strong>src/</strong> : berisi kode utama
        <ul>
          <li><strong>app/</strong> : Menyimpan halaman-halaman aplikasi. Setiap file di dalam folder ini akan menjadi rute (route) di Next.js.</li>
          <li><strong>components/</strong> : Menyimpan komponen-komponen untuk digunakan pada halaman-halaman web.</li>
          <li><strong>hooks/</strong> : Menyimpan custom hooks React yang digunakan untuk mengelola logika aplikasi yang dapat digunakan kembali.</li>
          <li><strong>styles/</strong> : Menyimpan file CSS (sangat tidak disarankan untuk sering menggunakan css manual, karena sudah menggunakan framework Tailwind).</li>
          <li><strong>utils/</strong> : Menyimpan utilitas atau fungsi helper yang digunakan di berbagai bagian aplikasi.</li>
          <li><strong>services/</strong> : Menyimpan kode yang berhubungan dengan komunikasi dengan API atau layanan eksternal lainnya.</li>
          <li><strong>constants/</strong> : Menyimpan kode konstant(tidak berubah-ubah) seperti pendeklarasian gambar, teks, dll</li>
        </ul>
      </li>
      <li><strong>next.config.js</strong> : File konfigurasi untuk aplikasi Next.js. Digunakan untuk mengatur berbagai aspek aplikasi Next.js.</li>
      <li><strong>package.json</strong> : File yang berisi informasi tentang proyek, termasuk dependensi, skrip, dan metadata lainnya.</li>
      <li><strong>README.md</strong> : File dokumentasi yang menjelaskan proyek, bagaimana cara menginstal, menjalankan, dan informasi penting lainnya.</li>
    </ul>
    <h3>Aturan penulisan/penamaan</h3>
    <ul>
      <li><strong>folder</strong> : camelCase, contoh: userDashboard/</li>
      <li><strong>file</strong> : camelCase, contoh: fostifestSection.jsx</li>
      <li><strong>component</strong> : UpperCase, contoh: &lt;AboutUsSection /&gt;</li>
      <li><strong>component function</strong> : UpperCase, contoh: AboutUsSection()</li>
      <li><strong>variable</strong> : camelCase, contoh: selectedIndex</li>
      <li><strong>function</strong> : camelCase, contoh: handleButton()</li>
      <li><strong>images/svgs/icons</strong> : kebab-case, contoh: header-image.png</li>
      <li><strong>CSS class</strong> : kebab-case, contoh: .burger-bar{}</li>
    </ul>
  </div>
</body>
</html>
