'use client';

import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { useMutation } from 'convex/react';
import { useCallback, useEffect, useState } from 'react';
import LoadingSpinner from '../loadingSpinner/LoadingSpinner';
import streamClient from '@/lib/stream';
import { createToken } from '@/actions/createToken';

const UserSyncWrapper = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded: isUserLoader } = useUser();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const createOrtUpdateUser = useMutation(api.users.createOrUpdateUser);

  const syncUser = useCallback(async () => {
    if (!user?.id) return;
    try {
      setIsLoading(true);
      setError(null);
      const tokenProvider = async () => {
        if (!user.id) throw new Error('User is not authenticated');
        const token = await createToken(user.id);
       
        return token;
      };
      await createOrtUpdateUser({
        userId: user.id,
        name:
          user.fullName ||
          user.firstName ||
          user.emailAddresses[0]?.emailAddress ||
          'Unknown User',
        email: user.emailAddresses[0]?.emailAddress || '',
        imageUrl: user.imageUrl || '',
      });

     
      // 2. Connect user to Stream
      await streamClient.connectUser(
        {
          id: user.id,
          name:
            user.fullName ||
            user.firstName ||
            user.emailAddresses[0]?.emailAddress ||
            'Unknown User',
          image: user.imageUrl || '',
         
        },

        tokenProvider
      );
    } catch (err) {
      console.error('Error syncing user:', err);
      setError(
        err instanceof Error ?
          err.message
        : 'Failed to sync user. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  }, [user, createOrtUpdateUser]);

  const disconnectUser = useCallback(async () => {
    try {
      await streamClient.disconnectUser();
    } catch (err) {
      console.error('Failed to disconnect user:', err);
    }
  }
, []);

  useEffect(() => {
    if (!isUserLoader) return;
    if (user?.id) {
      syncUser();
    } else {
      disconnectUser();
      setIsLoading(false);
    }
    // Cleanup function to disconnect user on unmount
    return () => {
      if (user){
        disconnectUser();
        console.log("Disconnected user on unmount");
      }
     
    };
  }, [user, isUserLoader, syncUser, disconnectUser]);

  if (!isUserLoader || isLoading) {
    return (
      <LoadingSpinner
        size='lg'
        message={!isUserLoader ? 'Loading user...' : 'Syncing user data...'}
        className='min-h-screen'
      />
    );
  }

  if (error) {
    return (
      <div className='flex-1 h-screen items-center justify-center bg-white px-6'>
        <p className='text-red-500 text-lg font-semibold mb-2'>Sync Error</p>
        <p className='text-gray-600 text-lg font-semibold mb-2'>{error}</p>
        <p className='text-gray-500 text-sm text-center'>
          Please try refreshing the page or contact support if the issue
          persists.
        </p>
      </div>
    );
  }
  return <div>{children}</div>;
};

export default UserSyncWrapper;
