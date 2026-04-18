import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ERP Varejo Genérico",
  description: "Sistema de Gestão Completo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="pt-BR">
        <body className={`${inter.className} min-h-screen bg-background antialiased`}>
          <TooltipProvider>
            {children}
          </TooltipProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
