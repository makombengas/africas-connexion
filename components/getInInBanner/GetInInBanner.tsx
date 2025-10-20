import { SignedOut, SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import { GoCheckCircleFill } from "react-icons/go";
import { Button } from '../ui/button';

const GetInInBanner = () => {
  return (
    <div className='container mx-auto flex flex-col items-center  px-4 sm:px-0   my-0 sm:my-32 '>
      <div className='max-w-5xl mx-auto shadow-lg sm:shadow-none   border bg-gradient-to-l from-gray-500/20 via-gray-500/5 to-gray-400/25 py-12 px-4 sm:px-6 lg:px-16 rounded-lg  sm:mx-6 lg:mx-8'>
        <div className='max-w-3xl mx-auto text-center '>
          <h2 className='text-2xl sm:text-4xl font-bold mb-4'>
            Ready to transform your conversation?
          </h2>
          <p className='max-w-xl text-muted-foreground mx-auto sm:text-lg mb-8'>
            Join African's Connect today and be part of a vibrant community
            that's shaping the future. Whether you're looking to network,
            collaborate, or simply stay informed, we've got you covered.
          </p>
          <SignedOut>
                <SignInButton mode="modal">
                    <Button size="lg" className='text-lg px-8 py-6 h-auto' >
                        Get Started for Free
                    </Button>
                </SignInButton>
            </SignedOut>
        </div>
        <div className='max-w-xl mx-auto text-muted-foreground place-content-center place-items-center space-y-4 sm:space-y-0 grid grid-cols-1 md:grid-cols-3 mt-8 sm:mt-12'>
          <div className='flex justify-center items-center flex-wrap'>
            <div className='h-2 w-2 bg-green-500 rounded-full mr-2' />
            <span className=''>No Credit Card Required</span>
          </div>

          <div className='flex justify-center items-center flex-wrap'>
            <div className='h-2 w-2 bg-green-500 rounded-full mr-2' />
            <span className=''>Free forever plan</span>
          </div>

          <div className='flex justify-center items-center flex-wrap'>
            <div className='h-2 w-2 bg-green-500 rounded-full mr-2' />
            <span className=''>Setup in minutes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetInInBanner;
