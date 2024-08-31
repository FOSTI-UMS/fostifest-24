/**
 * Below are the metadata list that are used in the app to increase SEO performance.
 */

import { keywordConstants } from "./keywordConstant";
import { authorsConstants } from "./authorsConstant";
import { openGraphConstant } from "./openGraphConstant";
import IconImage from "../../public/images/metadata/icon.png";

const metadataConstant = {
  title: "FOSTIFEST",
  description:
    "FOSTIFEST adalah kegiatan tahunan yang diselenggarakan oleh Forum Open Source Teknik Informatika (FOSTI) UMS. FOSTIFEST 2024 mengusung tema &quot;Designing the Future: Creative Teaching for the Digital Age&quot;. Acara ini mencakup workshop tentang pembuatan aplikasi chat dengan Vue.js, serta lomba pada kategori Competitive Programming, Software Development dan UI/UX Design. FOSTIFEST bertujuan meningkatkan keterampilan teknis, mendorong kreativitas, dan memperluas peluang karir di teknologi digital.",
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
