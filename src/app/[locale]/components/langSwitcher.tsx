'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18nConfig from '@/app/i18nConfig';

export default function LangSwitcher() {
  const { t, i18n } = useTranslation();
    const currentLocale = i18n.language;
    const router = useRouter();
    const currentPathname = usePathname();

    const handleChange = React.useCallback(
        (newLocale: string) => () => {
            if (currentLocale === i18nConfig.defaultLocale) {
                router.push('/' + newLocale + currentPathname);
            } else {
                router.push(currentPathname.replace(`/${currentLocale}`, `/${newLocale}`));
            }

            router.refresh();
        },
        [currentLocale, currentPathname, router],
    ); 

  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <span className="text-balance font-bold">{t('home_text')}</span>
        <div className="flex flex-row gap-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleChange('en')}>
                English
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleChange('fr')}>
                Français
            </button>
        </div>
    </main>
  );
} 