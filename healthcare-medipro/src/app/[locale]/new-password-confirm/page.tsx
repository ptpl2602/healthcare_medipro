import { useTranslations } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import AuthenticationForm from '@/components/Authentication/AuthenticationForm';
import NewPasswordConfirm from '@/components/Authentication/ForgetPassword/NewPasswordComfirm';

type NewPasswordConfirmPageProps = {
  params: {
    locale: string;
  };
};

const NewPasswordConfirmPage = (props: NewPasswordConfirmPageProps) => {
  const {
    params: { locale }
  } = props;
  const t = useTranslations();

  unstable_setRequestLocale(locale);

  return (
    <div className='container max-w-[600px] mt-16'>
        <NewPasswordConfirm/>
    </div>
  );
};

export default NewPasswordConfirmPage;
