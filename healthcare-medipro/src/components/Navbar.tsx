'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { NAV_BOOKING_LINKS, NAV_LINKS } from '@/constants';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/common/ModeToggle';
import LanguageToggle from '@/components/common/LanguageToggle';
import Navigation from '@/components/common/Navigation';


const linkClassName = 'text-14-semibold text-foreground hover:bg-secondary hover:text-primary cursor-pointer p-4 rounded-lg lg:py-2.5 lg:mx-2';

const NavBar = () => {
  const t = useTranslations('Navbar');

  return (
    <nav className='fixed top-0 w-full flex-between mx-auto px-6 lg:px-10 3xl:px-0 z-30 transition-all duration-300 ease-in-out py-3'>
      <Link href='/'>
        <Image
          src='assets/icons/Logo.svg'
          height={170}
          width={170}
          alt='Logo MediPro'
          className='object-contain'
        ></Image>
      </Link>

      <ul className='hidden h-full gap-1.5 lg:flex'>
        <Navigation
          title={t('Booking.booking_online')}
          links={NAV_BOOKING_LINKS.map(link => ({
            ...link,
            title: t(link.title),
            description: t(link.description),
            href: link.href
          }))}
          className='text-sm font-semibold text-foreground hover:bg-secondary hover:text-primary cursor-pointer p-4 rounded-lg lg:py-2 lg:mx-2'
          menuWidth='w-[350px]'
        />

        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className={linkClassName}
          >
            {t(link.key)}
          </Link>
        ))}

        <Navigation
          title={t('Login_Professionals')}
          links={[{ title: 'MediPro Doctor', description:'', href: '/contact-doctor-service' }]}
          className='text-sm text-text-1 hover:bg-secondary hover:text-primary cursor-pointer p-4 rounded-lg lg:py-2 lg:mx-2'
          menuWidth='w-[180px]'
        />
      </ul>
      
      <div className='lg:flex-center gap-2.5 hidden'>
        <LanguageToggle/>
        <ModeToggle/>
        <Button variant={'outline'} className='font-semibold'>{t('Login')}</Button>
      </div>
    </nav>
  );
};

export default NavBar;
