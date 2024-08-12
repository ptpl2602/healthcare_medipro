'use client';
import { NAV_BOOKING_LINKS, NAV_LINKS } from '@/constants';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger
} from './ui/navigation-menu';
import ListItem from './common/ListItem';
import { Button } from './ui/button';
import ModeToggle from './common/ModeToggle';


const linkClassName = 'text-14-semibold text-foreground hover:bg-secondary hover:text-primary cursor-pointer p-4 rounded-lg lg:py-2.5 lg:mx-2';
const NavBar = () => {
  const t = useTranslations('Navbar');

  return (
    <nav className='fixed top-0 w-full flex-between mx-auto px-6 lg:px-12 3xl:px-0 z-30 transition-all duration-300 ease-in-out py-3'>
      <Link href='/'>
        <Image
          src='assets/icons/Logo.svg'
          height={170}
          width={170}
          alt='Logo MediPro'
          className='object-contain'
        ></Image>
      </Link>

      <ul className='hidden h-full gap-3 lg:flex'>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className='text-sm font-semibold text-foreground hover:bg-secondary hover:text-primary cursor-pointer p-4 rounded-lg lg:py-2 lg:mx-2'>{t('Booking.booking_online')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='w-[200px] p-1.5 md:w-[300px] lg:w-[350px] mt-2'>
                  {NAV_BOOKING_LINKS.map((link) => (
                    <ListItem key={link.title} title={t(link.title)} href={link.href}>
                      {t(link.description)}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className={linkClassName}
          >
            {t(link.key)}
          </Link>
        ))}

        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className='text-sm text-text-1 hover:bg-secondary hover:text-primary cursor-pointer p-4 rounded-lg lg:py-2 lg:mx-2'>{t('Login_Professionals')}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className='w-[180px] p-0.5 mt-2'>
                  <ListItem href='/contact-doctor-service' title='MediPro Doctor' className='font-normal'></ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </ul>
      
      <div className='lg:flex-center hidden'>
        <Button variant={'outline'} className='mr-4'>{t('Login')}</Button>
        <ModeToggle/>
      </div>
    </nav>
  );
};

export default NavBar;
