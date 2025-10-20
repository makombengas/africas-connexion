'use client';

import { createToken } from '@/actions/createToken';
import { InlineSpinner } from '@/components/loadingSpinner/LoadingSpinner';
import StatutsCard from '@/components/statutsCard/StatutsCard';
import { useUser } from '@clerk/nextjs';
import {
  Call,
  StreamTheme,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
  User,
} from '@stream-io/video-react-sdk';
import { AlertTriangle, Video } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import '@stream-io/video-react-sdk/dist/css/styles.css';

if (!process.env.NEXT_PUBLIC_STREAM_API_KEY) {
  throw new Error('NEXT_PUBLIC_STREAM_API_KEY is not defined');
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user } = useUser();
  const { id } = useParams();
  const [call, setCall] = useState<Call | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<StreamVideoClient | null>(null);

  const streamUser = useMemo(() => {
    if (!user) return null;
    return {
      id: user.id,
      name:
        user.fullName ||
        user.emailAddresses[0]?.emailAddress ||
        'Unknown User',
      image: user.imageUrl || '',
      type: 'authenticated' as const,
    };
  }, [user]);

  const tokenProvider = useCallback(async () => {
    if (!user?.id) {
      throw new Error('User is not authenticated');
    }
    // Make sure createToken returns the token string
    const token = await createToken(user.id);
    return token; // This should return the actual token string
  }, [user?.id]);

  // Initialise client in useEffect to avoid side effects during render

  useEffect(() => {
    if (!streamUser) {
      setClient(null);
      return;
    }

    const newClient = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY as string,
      user: streamUser,
      tokenProvider,
    });

    setClient(newClient);

    return () => {
      newClient.disconnectUser().catch(console.error);
    };
  }, [streamUser, tokenProvider]);

  useEffect(() => {
    if (!client || !id) return;
    setError(null);
    const streamCall = client.call("default", id as string);

    const joinCall = async () => {
      try {
        await streamCall.join({create: true});
        setCall(streamCall);
      
      } catch (error) {
        console.error('Failed to join call:', error);
        setError(
         error instanceof Error ? error.message : 'Failed to join call'
        );
      }
    };
    joinCall();

    // cleanup function

    return () => {
      if (streamCall && streamCall.state.callingState === CallingState.JOINED) {
        streamCall.leave().catch(console.error);
      }
    };
  }, [id, client]);

  if (error) {
    return (
      <StatutsCard
        title='Call Error'
        description={error}
        className='min-h-screen bg-red-50'
        action={
          <button
            className='w-full bg-red-500 hover:bg-red-700 font-semibold 
            focus:ring-red-500 focus:ring-offset-2
            py-3 px-6 rounded-lg transition-colors duration-300
            text-white'
            onClick={() => window.location.reload()}>
            Retry
          </button>
        }>
        <div
          className='w-16 h-16 bg-red-100 rounded-full 
        flex items-center justify-center mx-auto
        '>
          <AlertTriangle className='w-6 h-6 text-red-600' />
        </div>
      </StatutsCard>
    );
  }

  if (!client) {
    return (
      <StatutsCard
        description='Setting up video call connection...'
        title='Initializing Client...'
        className='min-h-screen bg-blue-50'>
        <InlineSpinner size='lg' />
      </StatutsCard>
    );
  }

  if (!call) {
    return (
      <StatutsCard
        description='Joining call...'
        title='Joining Call...'
        className='min-h-screen bg-blue-50'>
        <div className='flex flex-col  items-center justify-center animate-bounce  mx-auto'>
          <div className='my-4 w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center'>
            <Video className='w-8 h-8 text-green-700' />
          </div>
          <div className='w-full text-sm text-gray-700 px-3 py-1  inline-block'>
            Call ID: {id}
          </div>
        </div>
      </StatutsCard>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamTheme className='text-white'>
        <StreamCall call={call}>{children}</StreamCall>
      </StreamTheme>
    </StreamVideo>
  );
};

export default Layout;
