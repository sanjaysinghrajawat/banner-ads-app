import { Inter } from "next/font/google";
import "./globals.css";
import BannerProvider from "./bannerProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <BannerProvider>
          {children}
        </BannerProvider>
      </body>
    </html>
  );
}
