'use client'

import { useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import LoginForm from './LoginForm';
import RegistrationForm from './Registration/RegistrationForm';
import { useState } from 'react';
import ForgetPasswordForm from './ForgetPassword/ForgetPasswordForm';

const AuthenticationForm = () => {
  const t = useTranslations('Registration');
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  if(showForgotPassword) {
    return (
      <ForgetPasswordForm onLogin={() => setShowForgotPassword(false)}/>
    )
  }

  return (
    <Tabs defaultValue='login'>
      <TabsList className='grid w-full grid-cols-2 mb-8 bg-transparent text-foreground border-0'>
        <TabsTrigger
          value='login'
          className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-background py-3'
        >
          {t('Login')}
        </TabsTrigger>
        <TabsTrigger
          value='register'
          className='data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-background py-3'
        >
          {t('Sign_up')}
        </TabsTrigger>
      </TabsList>
      <TabsContent value='login'>
        <LoginForm onForgotPassword={() => setShowForgotPassword(true)}/>
      </TabsContent>
      <TabsContent value='register'>
        <RegistrationForm />
      </TabsContent>
    </Tabs>
  );
};

export default AuthenticationForm;
