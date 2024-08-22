import type { Metadata } from "next";
import "../globals.css";
import AppWrapper from "@/container/AppWrapper";
import { ReduxProvider } from "@/redux/provider";
import initTranslations from '@/app/i18n';
import TranslationProvider from '@/app/[locale]/TranslationProvider';

export const metadata: Metadata = {
  title: "Movie web",
};

const i18nNamespaces = ['translation'];
export default async function RootLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string}
}>) {
  const { resources } = await initTranslations(locale, i18nNamespaces);
  return (
    <html lang={locale}>
      <body>
        <ReduxProvider>
        <TranslationProvider locale={locale} resources={resources} namespaces={i18nNamespaces}>
          <AppWrapper>{children}</AppWrapper>
          </TranslationProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
