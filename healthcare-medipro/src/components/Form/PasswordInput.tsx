import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import DynamicThemeAwareSvgIcon from '@/components/common/DynamicThemeAwareSvgIcon';

interface PasswordInputProps {
  field: any;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({ field, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='relative w-full'>
      <Input type={showPassword ? 'text' : 'password'} {...field} placeholder={placeholder} className='shad-input border-0' />
      <Button
        type='button'
        variant='ghost'
        size='sm'
        className='absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent'
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? (
          <DynamicThemeAwareSvgIcon name='visible' className='ml-2 text-foreground h-4 w-4' color='currentColor' />
        ) : (
          <DynamicThemeAwareSvgIcon name='invisible' className='ml-2 text-foreground h-4 w-4' color='currentColor' />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
