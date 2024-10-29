'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/Form/CustomFormField';
import { EMAIL_REGEX, FormFieldType, PASSWORD_REGEX } from '@/constants';
import { Form } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SubmitButton from '../SubmitButton';
import { Button } from '../ui/button';

interface LoginFormProps {
  onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onForgotPassword }) => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    email: z.string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Email') }) })
      .regex(EMAIL_REGEX, { message: t('Validation.Email') }),
    password: z.string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Password.Header') })})
      .regex(PASSWORD_REGEX, { message: t('Validation.Password' )})
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 flex-1">
        <CustomFormField 
          fieldType={FormFieldType.INPUT}
          control={form.control}
          name='email'
          label='Email'
          placeholder='nguyenvananh@gmail.com'
          iconName='mail'
          iconAlt='email'
        />

        <CustomFormField 
          fieldType={FormFieldType.PASSWORD_INPUT}
          control={form.control}
          name='password'
          label={t('Registration.Password.Header')}
          placeholder={t('Registration.Password.Placeholder')}
          iconName='lock'
          iconAlt='password'
        />

        <div className='w-full flex justify-end'>
          <Button variant='link' onClick={onForgotPassword}>{t('Registration.Forget_password.Header')}</Button>
        </div>

        <SubmitButton isLoading={isLoading}>{t('Registration.Login')}</SubmitButton>
      </form>
    </Form>
  )
};

export default LoginForm;