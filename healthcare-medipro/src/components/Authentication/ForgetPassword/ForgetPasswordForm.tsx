'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/Form/CustomFormField';
import { EMAIL_REGEX, FormFieldType } from '@/constants';
import { Form } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface ForgotPasswordFormProps {
  onLogin: () => void;
}

const ForgetPasswordForm: React.FC<ForgotPasswordFormProps> = ({ onLogin }) => {
  const t = useTranslations();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mail, setMail] = useState('');

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Email') }) })
      .regex(EMAIL_REGEX, { message: t('Validation.Email') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    router.push('/new-password-confirm');

    setIsLoading(false);    
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-7 flex-1'>
          <h3 className='text-2xl font-bold'>{t('Registration.Forget_password.Header')}</h3>
          <section className='space-y-2'>
            <CustomFormField
              fieldType={FormFieldType.INPUT}
              control={form.control}
              name='email'
              label='Email'
              placeholder='nguyenvananh@gmail.com'
              iconName='mail'
              iconAlt='email'
            />
            <p className='text-sm text-input-placeholder'>{t('Registration.Forget_password.Sub_header')}</p>
          </section>

          <SubmitButton isLoading={isLoading}>{t('Registration.Send_otp')}</SubmitButton>
          
          <div className='text-center text-sm p-6 mt-8 border-t-2'>
              {t('Registration.Forget_password.HasAccount')}
              <Button variant='link' className='font-medium text-sm p-0 pl-2' onClick={onLogin}>{t('Registration.Login')}</Button>
          </div>
        </form>
      </Form>

    </>
  );
};

export default ForgetPasswordForm;
