import { Montserrat } from "next/font/google";
import "./globals.css";
import { metadataConstant } from "@/constants/metadataConstant";

const inter = Montserrat({ subsets: ["latin"] });

export const metadata = metadataConstant;

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {children}
        </body>
    </html>
  );
}
