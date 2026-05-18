import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RollMatch",
  description: "Encontre parceiros de treino de Jiu-Jitsu perto de você.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
