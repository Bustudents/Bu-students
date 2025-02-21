import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Bu-students",
  description: "The official website for Bu-students.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Favicon & Mobile Icons */}
        <link rel="icon" href="/favicon.jpg" sizes="any" />
        <link rel="apple-touch-icon" href="/favicon.jpg" sizes="180x180" />
        <link rel="icon" href="/favicon.jpg" sizes="192x192" type="image/png" />

        {/* Web Manifest for Progressive Web App (PWA) Support */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
