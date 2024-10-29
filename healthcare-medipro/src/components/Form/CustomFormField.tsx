import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DATE_FORMAT, FormFieldType } from '@/constants';
import { Control } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { E164Number } from 'libphonenumber-js/core';
import DynamicThemeAwareSvgIcon from '@/components/common/DynamicThemeAwareSvgIcon';
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import PasswordInput from './PasswordInput';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';

interface CustomFormFieldProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  label?: string;
  placeholder?: string;
  iconName?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
  options?: { value: string; label: string }[];
  onChange?: (value: string) => void;
}

const RenderInput = ({ field, props }: { field: any; props: CustomFormFieldProps }) => {
  const {
    fieldType,
    placeholder,
    iconName,
    iconAlt,
    disabled,
    dateFormat,
    showTimeSelect,
    children,
    renderSkeleton,
    options = [],
    onChange
  } = props;
  const [passkey, setPasskey] = useState('');

  switch (fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className='flex rounded-md border border-input-border bg-input-background'>
          {iconName && (
            <DynamicThemeAwareSvgIcon name={iconName} className='ml-2 text-foreground' color='currentColor' />
          )}
          <FormControl>
            <Input placeholder={placeholder} {...field} className='shad-input border-0' />
          </FormControl>
        </div>
      );

    case FormFieldType.PHONE_INPUT:
      return (
        <FormControl>
          <PhoneInput
            defaultCountry='VN'
            placeholder={placeholder}
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className='input-phone'
          />
        </FormControl>
      );

    case FormFieldType.DATE_PICKER:
      return (
        <div className='flex rounded-md border border-input-border bg-input-background'>
          <FormControl>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'ghost'}
                  className={cn('w-full justify-start text-left font-normal', !field.value && 'text-foreground')}
                >
                  <DynamicThemeAwareSvgIcon name='calendar' className='mr-2 text-foreground' color='currentColor' />
                  {field.value ? (
                    format(field.value, DATE_FORMAT.dd_mm_yyyy)
                  ) : (
                    <span className='text-input-placeholder'>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0' align='start'>
                <Calendar
                  mode='single'
                  selected={field.value}
                  onSelect={field.onChange}
                  disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                  autoFocus
                />
              </PopoverContent>
            </Popover>
          </FormControl>
        </div>
      );

    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;

    case FormFieldType.SELECT:
      return (
        <div className='flex rounded-md border border-input-border bg-input-background'>
          {iconName && (
            <DynamicThemeAwareSvgIcon name={iconName} className='ml-2 text-foreground' color='currentColor' />
          )}
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                onChange && onChange(value);
              }}
              disabled={disabled}
              value={field.value}
            >
              <SelectTrigger className='w-full shad-select-trigger'>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent className='shad-select-content'>
                {options.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
      );

    case FormFieldType.CHECKBOX:
      return (
        <FormControl>
          <div className='flex items-center gap-4'>
            <Checkbox id={props.name} checked={field.value} onCheckedChange={field.onChange} />
            <label htmlFor={props.name} className='checkbox-label'>
              {props.label}
            </label>
          </div>
        </FormControl>
      );

    case FormFieldType.PASSWORD_INPUT:
      return (
        <div className='flex rounded-md border border-input-border bg-input-background'>
          {iconName && (
            <DynamicThemeAwareSvgIcon name={iconName} className='ml-2 text-foreground' color='currentColor' />
          )}
          <FormControl>
            <PasswordInput field={field} placeholder={placeholder} />
          </FormControl>
        </div>
      );

    case FormFieldType.OTP_INPUT:
      return (
        <FormControl>
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
        </FormControl>
      );

    default:
      break;
  }
};

const CustomFormField = (props: CustomFormFieldProps) => {
  const { control, fieldType, name, label } = props;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className='flex-1'>
          {fieldType !== FormFieldType.CHECKBOX && label && <FormLabel className='shad-input-label'>{label}</FormLabel>}
          <RenderInput field={field} props={props} />
          <FormMessage className='shad-error'></FormMessage>
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
