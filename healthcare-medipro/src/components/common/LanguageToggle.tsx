'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { type Locale } from '@/constants';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const LanguageToggle: React.FC = () => {
  const locale = useLocale() as Locale;
  const router = useRouter();
  const t = useTranslations('Navbar');

  const changeLanguage = (newLocale: Locale) => {
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='text-foreground'>
          <span className={`${locale === 'vi' ? 'rotate-0 scale-100' : 'rotate-90 scale-0'} h-[1.2rem] w-[1.2rem] transition-all`}>VI</span>
          <span className={`${locale === 'en' ? 'rotate-0 scale-100' : '-rotate-90 scale-0'} absolute h-[1.2rem] w-[1.2rem] transition-all`}>EN</span>
          <span className='sr-only'>Toggle change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuCheckboxItem
            checked={ locale === 'vi' }
            onClick={() => changeLanguage('vi')}
        >
            {t('Language.Vietnamese')}
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
            checked={ locale === 'en' }
            onClick={() => changeLanguage('en')}
        >
            {t('Language.English')}
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageToggle;
