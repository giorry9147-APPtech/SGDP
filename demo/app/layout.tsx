import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppShell } from "@/components/layout/app-shell";
import { getCurrentUser } from "@/lib/auth";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SGDP — Grondenrechten & Decentralisatie Platform",
  description:
    "Werkarm van het Staatshoofd voor advies over grondenrechten en decentralisatie. Demo-versie.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Geen sessie → child rendert eigen volledig-scherm layout (login).
  // Sessie aanwezig → wikkelen met AppShell (sidebar + header).
  const user = await getCurrentUser();

  return (
    <html lang="nl" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        {user ? <AppShell user={user}>{children}</AppShell> : children}
      </body>
    </html>
  );
}
