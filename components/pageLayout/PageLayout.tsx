import { FC } from 'react';

import ConvexClientProvider from '../convexClientProvider/ConvexClientProvider';
import Header from '../header/Header';
import Footer from '../footer/Footer';

interface PageLayoutProps {
  // Define any props if needed
  children?: React.ReactNode;
}

const PageLayout: FC<PageLayoutProps> = ({ children }) => {
  return (
  
      <ConvexClientProvider>
        <Header />
        <div className=' pb-20 relative'>
          <div className='-z-20  absolute top-0 left-0 right-0 
          h-full bg-gradient-to-b from-green-500/10 via-yellow-500/5
           to-gray-500/10' />
          {children}
        </div>

        <Footer />
      </ConvexClientProvider>
 
  );
};

export default PageLayout;
