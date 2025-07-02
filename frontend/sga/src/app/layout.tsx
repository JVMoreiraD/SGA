import '@/app/ui/global.css'
import { openSans } from './ui/fonts'
import NextAuthSessionProvider from '@/provider/sessionProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${openSans.className} antialiased`}>
        <NextAuthSessionProvider>
          {children}
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
