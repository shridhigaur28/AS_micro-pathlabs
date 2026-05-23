import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });



export const metadata = {
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    shortcut: '/favicon-32x32.png',
    apple: { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
  },
  title: 'AS MICRO & PATH LABS | Trusted Pathology Lab',
  description: 'Fast, accurate and affordable pathology tests with home sample collection and digital reports. Book your appointment today.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body suppressHydrationWarning className={`${inter.className} text-gray-900 antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
