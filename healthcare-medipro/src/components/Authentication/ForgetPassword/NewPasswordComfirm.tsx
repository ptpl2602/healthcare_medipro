'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/Form/CustomFormField';
import { FormFieldType, PASSWORD_REGEX } from '@/constants';
import { Form } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SubmitButton from '@/components/SubmitButton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const NewPasswordConfirm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);

  const formSchema = z.object({
    password: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Password.Header') }) })
      .regex(PASSWORD_REGEX, { message: t('Validation.Password') })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
  };

  return (
    <Tabs defaultValue='code'>
      <TabsList className='grid w-full grid-cols-2 mb-8 bg-transparent text-foreground border-0'>
        <TabsTrigger
          value='code'
          className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-background font-semibold py-3'
        >
          {t('Registration.Forget_password.New_password_otp')}
        </TabsTrigger>
        <TabsTrigger
          value='reset'
          className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-background font-semibold py-3'
        >
          {t('Registration.Forget_password.New_password_confirm')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='code'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
            <CustomFormField
              fieldType={FormFieldType.OTP_INPUT}
              control={form.control}
              name='otp'
            />
            <SubmitButton isLoading={isLoading}>{t('Registration.Forget_password.New_password_otp_button')}</SubmitButton>
          </form>
        </Form>
      </TabsContent>
      <TabsContent value='reset'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6 flex-1'>
            <CustomFormField
              fieldType={FormFieldType.PASSWORD_INPUT}
              control={form.control}
              name='password'
              label={t('Registration.Password.Header')}
              placeholder={t('Registration.Password.Placeholder')}
              iconName='lock'
              iconAlt='password'
            />
            <SubmitButton isLoading={isLoading}>{t('Registration.Forget_password.New_password_confirm_button')}</SubmitButton>
          </form>
        </Form>
      </TabsContent>
    </Tabs>
  );
};

export default NewPasswordConfirm;
