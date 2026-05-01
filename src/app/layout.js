import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });



export const metadata = {
   icons: {
    icon: "/icon.png",
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
