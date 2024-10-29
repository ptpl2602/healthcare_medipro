import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import AuthenticationForm from '@/components/Authentication/AuthenticationForm';

type LoginProps = {
  params: {
    locale: string;
  };
};

const LoginPage = (props: LoginProps) => {
  const {
    params: { locale }
  } = props;
  const t = useTranslations();

  unstable_setRequestLocale(locale);

  return (
    <div className='flex'>
      <section className='container my-8'>
        <div className='sub-container max-w-[496px]'>
          <AuthenticationForm/>
        </div>
      </section>
      <Image 
        src={'/assets/images/doctor.png'} 
        height={1000} 
        width={1000} 
        alt='Doctor' 
        className='side-img max-w-[50%] rounded'
      />
    </div>
  );
};

export default LoginPage;
