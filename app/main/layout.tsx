'use client';

import { ReactNode } from 'react';
import Navbar from '../../components/shared/Navbar';
import ThemeProvider from '../../components/providers/ThemeProvider';

export default function MainLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        <Navbar />
        <main className="overflow-x-hidden">{children}</main>
      </div>
    </ThemeProvider>
  );
}