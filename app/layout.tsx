import type { Metadata } from "next";
import "./fonts.css";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Sleepy Gatekeeper ($402) - Payment Required",
  description: "The internet's toll booth is finally open on Solana. Dormant since 1997. Woken up by Base. Running on Solana for speed.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="/x402-icon-black.png" />
        <link rel="apple-touch-icon" href="/x402-icon-black.png" />
        <meta name="apple-mobile-web-app-title" content="x402" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

