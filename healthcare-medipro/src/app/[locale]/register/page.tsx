import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import AuthenticationForm from '@/components/Authentication/AuthenticationForm';
import UserInfoForm from '@/components/Authentication/Registration/UserInfoForm';

type RegisterProps = {
  params: {
    locale: string;
  };
};

const RegisterPage = (props: RegisterProps) => {
  const {
    params: { locale }
  } = props;
  const t = useTranslations();

  unstable_setRequestLocale(locale);

  return (
    <div className='flex'>
      <section className='container my-12'>
        <div className='sub-container'>
          <UserInfoForm/>
        </div>
      </section>
      {/* <Image 
        src={'/assets/images/doctor.png'} 
        height={900} 
        width={900} 
        alt='Doctor' 
        className='side-img max-w-[50%] rounded'
      /> */}
    </div>
  );
};

export default RegisterPage;
