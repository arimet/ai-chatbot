import { type ReactNode } from 'react';
import { AI } from './actions';
import '@/app/globals.css'


export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AI>
      <html lang="en">
        <body>{children}</body>
      </html>
    </AI>
  );
}