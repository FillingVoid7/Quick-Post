import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./components/contexts/providers";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Quick Post",
  description: "A simple blogging platform designed with redis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <main>{children}</main>
          <Toaster richColors closeButton position="top-right" />

        </Providers>
      </body>
    </html>
  );
}
