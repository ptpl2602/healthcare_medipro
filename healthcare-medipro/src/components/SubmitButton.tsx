import React from 'react'
import { Button } from '@/components/ui/button'
import DynamicThemeAwareSvgIcon from './common/DynamicThemeAwareSvgIcon'
import Image from 'next/image'

interface SubmitButtonProps {
  isLoading: boolean,
  className?: string,
  children: React.ReactNode
}

const SubmitButton = ({isLoading, className, children} : SubmitButtonProps) => {

  return (
    <Button type='submit' disabled={isLoading} className={className ?? 'sha-primary-btn w-full bg-primary text-white-200 mt-9'}>
      { isLoading ? (
        <div className='flex items-center gap-4'>
          <Image 
            src="/assets/icons/loading.svg"
            alt='loading'
            width={24}
            height={24}
            className='animate-spin'
          />
          Loading ...
        </div>
      ) : children }
    </Button>
  )
}

export default SubmitButton