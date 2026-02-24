import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Enerva Elektrik",
  description: "Enerva Elektrik – Elektrische Energielösungen",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
