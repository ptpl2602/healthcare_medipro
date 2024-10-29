import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Link from 'next/link';

type HomepageProps = {
  params: {
    locale: string
  }
}

export default function Homepage(props: HomepageProps) {
  const { params: { locale }} = props;

  unstable_setRequestLocale(locale);

  const t = useTranslations();
  return (
    <div className=''>
    </div>
  );
}
