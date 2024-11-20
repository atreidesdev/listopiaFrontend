import { StoreWrapper } from '@/app/store/provider';
import { leftRoutes, rightRoutes } from '@/shared/constants';
import NavBarWrapper from '@/widgets/Navbar/ui/NavBarWrapper';
import type { Metadata } from 'next';
import './globals.css';
import { ReactNode } from 'react';
import Image from 'next/image';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Listopia',
  description: 'Portfolio project',
};

const logo = { name: 'LISTOPIA' };

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="body">
        <header className="header">
          <StoreWrapper>
            <NavBarWrapper
              leftRoutes={leftRoutes}
              logo={logo}
              rightRoutes={rightRoutes}
            />
          </StoreWrapper>
        </header>

        <main className="main">{children}</main>

        <Script
          id={'1'}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){
                m[i]=m[i]||function(){
                  (m[i].a=m[i].a||[]).push(arguments)
                };
                m[i].l=1*new Date();
                for (var j = 0; j < document.scripts.length; j++) {
                  if (document.scripts[j].src === r) { return; }
                }
                k=e.createElement(t),
                a=e.getElementsByTagName(t)[0],
                k.async=1,
                k.src=r,
                a.parentNode.insertBefore(k,a)
              })
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              ym(98978715, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true,
                trackHash:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <Image
              src="https://mc.yandex.ru/watch/98978715"
              style={{ position: 'absolute', left: '-9999px' }}
              alt=""
              width={0}
              height={0}
            />
          </div>
        </noscript>
      </body>
    </html>
  );
}
