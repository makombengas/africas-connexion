"use client"
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const ScrollToTop = () => {
const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [pathname]);

  return (
   
        <div className="z-50 absolute  bottom-0 right-0  flex justify-end p-4  h-4 w-4 gradient-to-r from-green-500 via-yellow-500 to-red-500">
            Top
        </div>
   
  );
}

export default ScrollToTop