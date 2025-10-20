import { IoStarSharp } from 'react-icons/io5';
import FeatureCard from '../featureCard/FeatureCard';
import { featureCard } from '@/data/data';


const FeaturedSection = () => {
  return (
    <div className='mt-16 container mx-auto px-4 sm:px-6 lg:px-8'>
      <div className='w-full flex items-center justify-center mb-16'>
        <div className='flex-1 h-px bg-gradient-to-r from-transparent via-border  border-green-800 to-transparent'></div>
        <div className='px-6 '>
          <IoStarSharp />
        </div>
        <div className='flex-1 h-px bg-gradient-to-r from-transparent via-border to-transparent'></div>
      </div>
      <div className='text-center mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold  mb-6'>
          Everything you need, in one place.
        </h2>
        <p className=' sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
          Our platform offers a comprehensive suite of features designed to
          connect African communities, foster collaboration, and drive growth.
          From networking tools to resource sharing, we provide everything you
          need to thrive in today's interconnected world.
        </p>
      </div>
      <div className='pb-8 sm:pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center'>
        {featureCard.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturedSection;
