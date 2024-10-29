import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import '@/styles/globals.css';
import { getMessages } from 'next-intl/server';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import NavBar from '@/components/Navbar';
import Footer from '@/components/common/Footer';
import ConfigureAmplifyClientSide from '../amplify-cognito-config';
import { Toaster } from '@/components/ui/toaster';

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans'
});

export const metadata: Metadata = {
  title: 'MediPro',
  description: '- Book hospital and doctor appointments online'
};

type Props = {
  children: React.ReactNode;
  params: {
    locale: 'vi' | 'en';
  };
};

const RootLayout: React.FC<Props> = async ({ children, params: { locale } }) => {
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={cn('min-h-screen font-sans antialiased', fontSans.variable)}>
        <ConfigureAmplifyClientSide/>
        <ThemeProvider attribute='class' defaultTheme='light' enableSystem disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>
            <div className='flex flex-col min-h-screen'>
              <NavBar/>
              <main className='flex-grow pt-[64px]'>
                {children}
              </main>
              <Toaster/>
              <Footer/>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};

export default RootLayout;
