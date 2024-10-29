'use client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import CustomFormField from '@/components/Form/CustomFormField';
import { EMAIL_REGEX, FormFieldType, GENDER, ID_CARDNUMBER_REGEX, PASSWORD_REGEX } from '@/constants';
import { Form, FormControl } from '@/components/ui/form';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import SubmitButton from '../../SubmitButton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import LocationPicker from '@/components/common/LocationPicker';
import { useToast } from '@/hooks/use-toast';
import PasskeyModal from '@/components/common/PasskeyModal';

const UserInfoForm = () => {
  const t = useTranslations();
  const [isLoading, setIsLoading] = useState(false);
  const [isPasskeyModalOpen, setIsPasskeyModalOpen] = useState(false);
  const { toast } = useToast();

  const formSchema = z.object({
    fullname: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Full_name') }) })
      .max(50, t('Validation.Name')),
    email: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Email') }) })
      .regex(EMAIL_REGEX, { message: t('Validation.Email') }),
    idcardnumber: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Id_card_number') }) })
      .max(12, t('Validation.Id_card_number.Max'))
      .regex(ID_CARDNUMBER_REGEX, { message: t('Validation.Id_card_number.Invalid') }),
    birthDate: z.date({
      required_error: t('Validation.Field_required', { Field: t('Registration.Date_of_birth.Header') })
    }),
    phone: z.string().refine((phone) => /^\+\d{10,15}$/.test(phone), t('Validation.Phone')),
    province: z.string({ required_error: t('Validation.Address.Province') }),
    district: z.string({ required_error: t('Validation.Address.District') }),
    ward: z.string({ required_error: t('Validation.Address.Ward') }),
    address: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Address.Detail') }) }),
    privacyConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: t('Validation.Privacy_consent')
      }),
    disclosureConsent: z
      .boolean()
      .default(false)
      .refine((value) => value === true, {
        message: t('Validation.Privacy_consent')
      }),
    password: z.string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Password.Header') })})
      .regex(PASSWORD_REGEX, { message: t('Validation.Password' )}),
    occupation: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Occupation.Header') }) })
      .max(50, t('Validation.Occupation')),
    nationality: z
      .string()
      .min(1, { message: t('Validation.Field_required', { Field: t('Registration.Nationality.Header') }) })
      .min(2, t('Validation.Nationality')),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullname: '',
      email: '',
      phone: '',
      idcardnumber: '',
      address: '',
      password: '',
      occupation: '',
      nationality: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      // Here you would typically make an API call to submit the form data
      // and request the OTP to be sent to the user's email
      
      // After successful form submission and OTP request

      setIsPasskeyModalOpen(true);
    } catch(error) {
        toast({
          title: t('Toast.Error'),
          description: error instanceof Error ? error.message : t('Toast.Submit_error'),
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasskeySubmit = async (passkey: string) => {
    try {
      // Here you would verify the passkey/OTP
      // await verifyPasskey(passkey);
      
      toast({
        title: t('Toast.Success'),
        description: t('Toast.Verification_success'),
        variant: "default",
      });
      
      setIsPasskeyModalOpen(false);
      // Handle successful verification (e.g., redirect)
      
    } catch (error) {
      toast({
        title: t('Toast.Error'),
        description: error instanceof Error ? error.message : t('Toast.Verification_error'),
        variant: "destructive",
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-12 flex-1'>
          <section className='space-y-4'>
            <h1 className='header'>{t('Registration.Header')}</h1>
            <p>{t('Registration.Sub_header')}</p>
          </section>
          <section className='space-y-6'>
            <div className='mb-9 space-y-1'>
              <h2 className='sub-header'>{t('Registration.Personal_info')}</h2>
            </div>
            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='fullname'
                label={t('Registration.Full_name')}
                placeholder='Nguyen Van Anh'
                iconName='person'
                iconAlt='user'
              />
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='email'
                label='Email'
                placeholder='nguyenvananh@gmail.com'
                iconName='mail'
                iconAlt='email'
              />
            </div>

            <div className='flex flex-col gap-6 xl:flex-row'>
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
            </div>

            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.DATE_PICKER}
                control={form.control}
                name='birthDate'
                label={t('Registration.Date_of_birth.Header')}
                iconName='calendar'
                iconAlt='calendar'
                placeholder={t('Registration.Date_of_birth.Placeholder')}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='occupation'
                label={t('Registration.Occupation.Header')}
                placeholder={t('Registration.Occupation.Placeholder')}
                iconName='bag'
                iconAlt='career'
              />
            </div>

            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='idcardnumber'
                label={t('Registration.Id_card_number')}
                placeholder='073293847372'
                iconName='identifier_card'
                iconAlt='user_identifier_card'
              />
              <CustomFormField
                fieldType={FormFieldType.SKELETON}
                control={form.control}
                name='gender'
                label={t('Registration.Gender.Label')}
                iconName='mail'
                iconAlt='email'
                renderSkeleton={(field) => (
                  <FormControl>
                    <RadioGroup
                      className='flex h-11 gap-6 xl:justify-between'
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      {GENDER.map((item) => (
                        <div key={item.value} className='radio-group'>
                          <RadioGroupItem value={item.value} id={item.value} />
                          <Label htmlFor={item.value} className='cursor-pointer'>
                            {t(item.labelKey)}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                )}
              />
            </div>

            <LocationPicker formControl={form.control} />

            <div className='flex flex-col gap-6 xl:flex-row'>
              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='address'
                label={t('Registration.Address.Detail')}
                placeholder={t('Registration.Address.Placeholder_address')}
              />

              <CustomFormField
                fieldType={FormFieldType.INPUT}
                control={form.control}
                name='nationality'
                label={t('Registration.Nationality.Header')}
                placeholder={t('Registration.Nationality.Placeholder')}
                iconName='earth'
                iconAlt='nationality'
              />
            </div>
          </section>

          <section className='space-y-6'>
            <div className='mb-9 space-y-1'>
              <h2 className='sub-header'>{t('Registration.Privacy_consent.Header')}</h2>
            </div>

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name='privacyConsent'
              label={t('Registration.Privacy_consent.Policy')}
            />

            <CustomFormField
              fieldType={FormFieldType.CHECKBOX}
              control={form.control}
              name='disclosureConsent'
              label={t('Registration.Privacy_consent.Infor_health')}
            />
          </section>

          <SubmitButton isLoading={isLoading}>{t('Registration.Send_otp')}</SubmitButton>
        </form>
      </Form>

      <PasskeyModal 
          open={isPasskeyModalOpen}
          onOpenChange={setIsPasskeyModalOpen}
          onSubmitPasskey={handlePasskeySubmit}
      />
    </>
  );
};

export default UserInfoForm;
