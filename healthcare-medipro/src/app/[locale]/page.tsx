import { Button } from '@/components/ui/button';
import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';

type HomepageProps = {
  params: {
    locale: string
  }
}

export default function Homepage(props: HomepageProps) {
  const { params: { locale }} = props;

  unstable_setRequestLocale(locale);

  const t = useTranslations('Index');
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
        <h1>MEDIPRO</h1>
      </section>
    </div>
  );
}
