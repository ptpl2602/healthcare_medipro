'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/Form/CustomFormField';
import { EMAIL_REGEX, FormFieldType, PASSWORD_REGEX } from '@/constants';
import { Form } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SubmitButton from '../../SubmitButton';

const RegistrationForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  
  const formSchema = z.object({
    fullname: z.string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Full_name') }) })
      .max(50, t('Validation.Name')),
    email: z.string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Email') }) })
      .regex(EMAIL_REGEX, { message: t('Validation.Email') }),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone),t('Validation.Phone')),
    password: z.string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Password.Header') })})
      .regex(PASSWORD_REGEX, { message: t('Validation.Password' )})
  });
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 flex-1">

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
          fieldType={FormFieldType.PHONE_INPUT}
          control={form.control}
          name='phone'
          label={t('Registration.Phone_number')}
          placeholder='84 345 533 1234'
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

        <SubmitButton isLoading={isLoading} className='w-full bg-primary text-white-200 mt-9'>{t('Registration.Sign_up')}</SubmitButton>
      </form>
    </Form>
  )
};

export default RegistrationForm;
