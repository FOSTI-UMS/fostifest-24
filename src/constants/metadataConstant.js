/**
 * Below are the metadata list that are used in the app to increase SEO performance.
 */

import { keywordConstants } from "./keywordConstant";
import { authorsConstants } from "./authorsConstant";
import { openGraphConstant } from "./openGraphConstant";
import IconImage from "/public/images/logo/fostifest-2.webp";

const metadataConstant = {
  title: "FOSTIFEST",
  description:
    'FOSTIFEST adalah acara teknologi oleh FOSTI UMS dengan tema "Designing the Future: Creative Tech for The Digital Age". Acara ini mencakup workshop tentang pembuatan aplikasi chat dengan Vue.js, serta kompetisi di keamanan digital, hackathon, pemrograman, dan desain UI/UX. Penutup acara meliputi diskusi, tanya jawab, dan pengumuman pemenang. FOSTIFEST bertujuan meningkatkan keterampilan teknis, mendorong kreativitas, dan memperluas peluang karir di teknologi digital.',
  keywords: keywordConstants,
  authors: authorsConstants,
  abstract: "Fosti Festival",
  publisher: "FOSTI UMS",
  openGraph: openGraphConstant,
  icons: {
    icon: IconImage.src,
    apple: IconImage.src,
  },
  metadataBase: new URL("https://fostifest.fostiums.org/"),
};

export { metadataConstant };
