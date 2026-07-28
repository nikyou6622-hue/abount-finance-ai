import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'Abount Finance AI — Financial & AI Intelligence Engine',
  description: 'Automated 24H multi-source news aggregator parsing live market signals with AI sentiment analysis. Powered by NikNeuron Infotech.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      </head>
      <body className="bg-[#080613] text-slate-100 font-sans antialiased min-h-screen relative selection:bg-purple-500 selection:text-white overflow-x-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-900/20 blur-[130px]" />
          <div className="absolute top-[20%] right-[-5%] w-[40%] h-[40%] rounded-full bg-pink-900/15 blur-[140px]" />
          <div className="absolute bottom-[-10%] left-[20%] w-[45%] h-[45%] rounded-full bg-indigo-950/25 blur-[150px]" />
        </div>
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
