import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Live Like a Monk | ISKCON NVCC Pune',
  description: 'Live Like a Monk — Residential Gurukul Training at ISKCON NVCC Pune.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="hi"><body>{children}</body></html>;
}
