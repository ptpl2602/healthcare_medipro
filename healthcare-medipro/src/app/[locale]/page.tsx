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

  const t = useTranslations();
  return (
    <div className='flex h-screen max-h-screen'>
      <section className='remove-scrollbar container my-auto'>
      </section>
    </div>
  );
}
