import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'HOLO Print | Online Printing & Signage',
    template: '%s | HOLO Print',
  },
  description:
    'Order professional printing, signage and personalised products online from HOLO Print.',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en-GB">
      <body>
        <div className="site-shell">
          <header className="site-header">
            <div className="container header-row">
              <Link className="logo" href="/">
                HOLO <span>PRINT</span>
              </Link>
              <nav className="main-nav" aria-label="Main navigation">
                <Link href="/products">Products</Link>
                <Link href="/signage">Signage</Link>
                <Link href="/wedding-stationery">Wedding</Link>
                <Link href="/help">Help</Link>
              </nav>
              <div className="header-actions">
                <Link className="button" href="/account">
                  Account
                </Link>
                <Link className="button button-primary" href="/basket">
                  Basket
                </Link>
              </div>
            </div>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
