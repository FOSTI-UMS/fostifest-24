/**
 * Below are the metadata list that are used in the app to increase SEO performance.
 */

import OpenGraphImage from "../../public/images/metadata/opengraph-image.jpg";

const openGraphConstant = {
  type: "website",
  url: "https://fostifest.fostiums.org/",
  title: "FOSTIFEST 2024",
  description:
    "FOSTIFEST adalah kegiatan tahunan yang diselenggarakan oleh Forum Open Source Teknik Informatika (FOSTI) UMS. FOSTIFEST 2024 mengusung tema &quot;Designing the Future: Creative Tech for The Digital Age&quot;. Acara ini mencakup workshop tentang pembuatan aplikasi chat dengan Vue.js, serta lomba pada kategori Competitive Programming, Software Development dan UI/UX Design. FOSTIFEST bertujuan meningkatkan keterampilan teknis, mendorong kreativitas, dan memperluas peluang karir di teknologi digital.",
  images: [
    {
      url: OpenGraphImage.src,
      width: 1517,
      height: 1080,
    },
  ],
};

export { openGraphConstant };
