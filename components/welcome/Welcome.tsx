import { SignedOut, SignInButton } from '@clerk/nextjs';
import React from 'react';
import { Button } from '../ui/button';

const Welcome = () => {
  return (
    <main className='overflow-hidden sm:px-6     flex-1 flex flex-col items-center px-4 py-8 sm:py-40 lg:py-22 '>
      <div className='container mx-auto relative  space-y-8 xl:space-y-0 '>
       
        <div className='flex justify-center xl:h-[50vh] flex-col items-center text-center space-y-8'>
          <h1
            className='text-5xl sm:text-7xl  font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-green-900 via-green-700 to-red-700
                dark:from-green-400 dark:via-red-400 dark:to-yellow-400
                '>
            Connecting...
            <br />
            <span
              className='bg-clip-text text-transparent bg-gradient-to-r from-red-800 to-yellow-500 dark:-indigo-600
                  dark:to-yellow-400'>
             African's One Click at a Time.
            </span>
          </h1>
            <p className='max-w-2xl sm:text-2xl  text-muted-foreground mx-auto leading-relaxed'>
                Empowering African Communities through Seamless Connections and Opportunities.
            </p>
        </div>
        <div className="flex items-center justify-center sm:flex-row gap-4 ">
            <SignedOut>
                <SignInButton mode="modal">
                    <Button size="lg" className='text-lg px-8 py-6 h-auto' >
                        Get Started for Free
                    </Button>
                </SignInButton>
            </SignedOut>
        </div>

       
       
      </div>
    </main>
  );
};

export default Welcome;
