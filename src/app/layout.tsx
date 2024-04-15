import React from 'react';
import type { Metadata } from 'next';
import './globals.css';
import { Logo } from './icons/logo';
import { CoopMarked } from './icons/CoopMarked';
import { CoopMega } from './icons/CoopMega';
import { Prix } from './icons/Prix';
import { Matkroken } from './icons/Matkroken';
import { Obs } from './icons/Obs';
import { Extra } from './icons/Extra';
import { Byggprix } from './icons/Byggprix';
import { ObsBygg } from './icons/ObsBygg';
import { CoopElectro } from './icons/CoopElectro';

export const metadata: Metadata = {
  title: "Butikker - Coop",
};

const StoreLogoWrapper: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <div className="w-10 store-logo" {...props}>
      {children}
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>
        <div className="flex items-center bg-[#003366] p-5 justify-between">
          <div className="w-24">
            <Logo />
          </div>
          <div className="flex items-center gap-6">
            <ul className="hidden header-breakpoint:flex items-center text-white gap-3">
              <li>Coop.no</li>
              <li>Min Side</li>
              <li>Våre Butikker</li>
              <li>Medlem</li>
              <li>Coop Kjeder</li>
            </ul>
            <input className="rounded-3xl p-2" type="text" placeholder="Hva leter du etter?" />
          </div>
        </div>
        <div className="flex justify-center gap-0.5 md:gap-3 p-2 md:p-4 bg-[#DCF0FA]">
          <StoreLogoWrapper>
            <CoopMarked />
          </StoreLogoWrapper>
          <StoreLogoWrapper>
            <CoopMega />
          </StoreLogoWrapper>
          <StoreLogoWrapper>
            <Prix />
          </StoreLogoWrapper>
          <StoreLogoWrapper>
            <Matkroken />
          </StoreLogoWrapper>
          <StoreLogoWrapper>
            <Obs />
          </StoreLogoWrapper>
          <StoreLogoWrapper className="w-20">
            <Extra />
          </StoreLogoWrapper>
          <StoreLogoWrapper>
            <Byggprix />
          </StoreLogoWrapper>
          <StoreLogoWrapper className="w-8">
            <ObsBygg />
          </StoreLogoWrapper>
          <StoreLogoWrapper>
            <CoopElectro />
          </StoreLogoWrapper>
        </div>
        { children }
      </body>
    </html>
  );
}
