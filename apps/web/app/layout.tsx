import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'MN FormBuilder',
  description: 'Constructor de formularios conversacionales con bloques de cálculo.'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-slate-50 text-slate-900">
        {children}
      </body>
    </html>
  );
}
