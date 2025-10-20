import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-gradient-to-r from-gray-500/20 via-gray-500/5 to-gray-400/25   py-8 sm:py-16'>
      <div className='flex flex-col px-4  space-y-8 container mx-auto'>
        <div className='flex items-center gap-8 sm:gap-4 flex-col sm:flex-row flex-wrap justify-between'>
          <div className=''>
            <Link href={'/'}>
              <div className='flex items-center justify-center gap-2'>
                <Image
                  style={{ width: 50, height: 50 }}
                  src={'/images/logo/logo_africa.png'}
                  width={50}
                  height={50}
                  alt='logo'
                />
                <span className=''>
                  <b className='text-primary'>African's</b> Connect
                </span>
              </div>
            </Link>
          </div>
          <div className='text-center sm:text-right space-y-4'>
            <nav className='space-x-4'>
              <Link href='/privacy' className='text-sm hover:underline'>
                Private Policy
              </Link>
              <Link href='/terms' className='text-sm hover:underline'>
                Terms of Service
              </Link>
              <Link href='/support' className='text-sm hover:underline'>
                Support Center
              </Link>
             
            </nav>
          </div>
        </div>
        <div className="border-t border-gray-200"></div>
       <div className="flex justify-center items-center">
          <p className='text-sm text-muted-foreground'>
            &copy; {new Date().getFullYear()} African's Connect. All rights
            reserved.
            This is a demo project and not affiliated with any Brand mentioned in the video including African's Connect, any usage ist strictly for educational purposes. In case of any infringement, please contact us and we will remove after the content immediately.
          </p>
       </div>
      </div>
    </footer>
  );
};

export default Footer;
