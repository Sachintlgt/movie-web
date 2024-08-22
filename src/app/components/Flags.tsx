"use client";

import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import i18nConfig from '../i18nConfig';
type FlagKey = 'en' | 'fr';
const flags = {
  en: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" width="24" height="12">
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/>
      </clipPath>
      <path d="M0,0 v30 h60 v-30 z" fill="#00247d"/>
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
      <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#cf142b" strokeWidth="4"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
      <path d="M30,0 v30 M0,15 h60" stroke="#cf142b" strokeWidth="6"/>
    </svg>
  ),
  fr: (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" width="24" height="16">
      <path fill="#EC1920" d="M0 0h3v2H0z"/>
      <path fill="#fff" d="M0 0h2v2H0z"/>
      <path fill="#051440" d="M0 0h1v2H0z"/>
    </svg>
  )
};

export default function FlagDropdown() {
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;
    const [selectedFlag, setSelectedFlag] =  useState<FlagKey>(currentLocale as FlagKey);
  const router = useRouter();
  const currentPathname = usePathname();

  useEffect(() => {
    debugger
    if(selectedFlag === 'fr') {
        router.push('/' + selectedFlag + '/' + currentPathname.replace(selectedFlag, ''));
    } else {
        router.push('/' + currentPathname.replace('/fr', ''));
    }
  }, [selectedFlag])

  return (
    <Menu as="div" className="fixed right-4 top-4 inline-block text-left">
      <div>
        <Menu.Button className="inline-flex items-center w-full justify-center gap-x-1.5 rounded-md bg-input-bg border-input-bg px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm  ">
          {flags[selectedFlag]}
          <svg className="-mr-1 h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setSelectedFlag('en')}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } flex w-full items-center px-4 py-2 text-sm`}
                >
                  {flags.en}
                </button>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => setSelectedFlag('fr')}
                  className={`${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  } flex w-full items-center px-4 py-2 text-sm`}
                >
                  {flags.fr}
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}