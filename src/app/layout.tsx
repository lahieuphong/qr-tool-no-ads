import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import LanguageProvider from "@/components/providers/LanguageProvider";
import ThemeProvider from "@/components/providers/ThemeProvider";

export const metadata: Metadata = {
  title: "QR Studio",
  description: "Tool tạo mã QR không quảng cáo",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="light" suppressHydrationWarning>
      <body className="min-h-screen bg-slate-100 text-slate-900 antialiased transition-colors duration-300 dark:bg-slate-950 dark:text-slate-100">
        <Script id="qr-tool-theme-init" strategy="beforeInteractive">
          {`
            (function () {
              try {
                var saved = localStorage.getItem("qr-tool-theme");
                var theme = saved === "dark" ? "dark" : "light";
                var root = document.documentElement;

                root.classList.remove("light", "dark");
                root.classList.add(theme);
                root.style.colorScheme = theme;
              } catch (e) {
                document.documentElement.classList.remove("dark");
                document.documentElement.classList.add("light");
                document.documentElement.style.colorScheme = "light";
              }
            })();
          `}
        </Script>

        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}