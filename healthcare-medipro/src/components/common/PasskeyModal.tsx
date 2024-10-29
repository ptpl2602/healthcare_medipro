'use client'

import React, { useState } from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { useTranslations } from 'next-intl'

interface PasskeyModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSubmitPasskey: (passkey: string) => void;
}

const PasskeyModal = ({ open, onOpenChange, onSubmitPasskey }: PasskeyModalProps) => {
    const t = useTranslations('Registration');
    const [passkey, setPasskey] = useState('');
    const [error, setError] = useState('');

    const validatePasskey = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();

        //Nếu passkey == key verificate code trong mail --> chuyển sang trang chủ --> sign up thành công
        // if(passkey === process.env) {

        // } else {
        //     setError('Invalid passkey. Please try again');
        // }
    }

    const handleSubmit = async () => {
        await onSubmitPasskey(passkey);
        setPasskey('');
    }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
        <AlertDialogContent className='shad-alert-dialog'>
            <AlertDialogHeader>
                <AlertDialogTitle className='flex items-start justify-between text-xl'>
                    {t('Passkey.Title')}
                </AlertDialogTitle>
                <AlertDialogDescription className='text-foreground'>
                    {t('Passkey.Description')}
                </AlertDialogDescription>
            </AlertDialogHeader>

            <div>
                <InputOTP maxLength={6} value={passkey} onChange={(value) => setPasskey(value)}>
                    <InputOTPGroup className='shad-otp'>
                        <InputOTPSlot className='shad-otp-slot' index={0} />
                        <InputOTPSlot className='shad-otp-slot' index={1} />
                        <InputOTPSlot className='shad-otp-slot' index={2} />
                        <InputOTPSlot className='shad-otp-slot' index={3} />
                        <InputOTPSlot className='shad-otp-slot' index={4} />
                        <InputOTPSlot className='shad-otp-slot' index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <AlertDialogFooter>
            <AlertDialogAction className='w-full' onClick={handleSubmit}>{t('Passkey.Submit_button')}</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default PasskeyModal