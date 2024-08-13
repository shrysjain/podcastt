import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ConvexClientProvider } from "./providers/ConvexProvider";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "podcastt 🎙️",
  description: "for podcasts, forever",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <ConvexClientProvider>{children}</ConvexClientProvider>
      </body>
    </html>
  );
}
