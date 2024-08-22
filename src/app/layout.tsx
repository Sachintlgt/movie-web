import type { Metadata } from "next";
import "./globals.css";
import AppWrapper from "@/container/AppWrapper";
import { ReduxProvider } from "@/redux/provider";

export const metadata: Metadata = {
  title: "Movie web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AppWrapper>{children}</AppWrapper>
        </ReduxProvider>
      </body>
    </html>
  );
}
