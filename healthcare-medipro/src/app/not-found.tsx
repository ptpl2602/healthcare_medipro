import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col min-h-[100vh] items-center justify-center space-y-4 text-center'>
      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl'>
          Uh oh! This page could not be found.
        </h1>
        <p className='max-w-[600px] mx-auto text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
          Don&apos;t worry, you can find lots of other interesting stuff on our homepage.
        </p>
      </div>
      <div>
        <Image
          alt='Not Found page'
          className='rounded-lg shadow-xl'
          src={'/icons/placeholder.svg'}
          width={500}
          height={500}
          style={{
            objectFit: 'cover'
          }}
        />
      </div>
      <Link
        className='inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300'
        href='/'
      >
        Back to the homepage
      </Link>
    </div>
  );
}