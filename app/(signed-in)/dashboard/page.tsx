'use client';

import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';
import { useUser } from '@clerk/nextjs';
import { LogOutIcon, VideoIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  ChannelHeader,
  MessageInput,
  MessageList,
  useChatContext,
} from 'stream-chat-react';
import { Channel, Thread, Window } from 'stream-chat-react';

const Dashboard = () => {
  const { user } = useUser();
  const router = useRouter();
  const { channel, setActiveChannel } = useChatContext();
  const [confirmLeave, setConfirmLeave] = useState(false);
  const { setOpen } = useSidebar();
  const handleCall = () => {
    console.log('call started');
    if(!channel) return;
    router.push(`/dashboard/video-call/${channel.id}`);
  };

  const handleLeaveChat = async () => {
    if(!channel || !user?.id) {
      console.log('no channel or user');
      return;
    }

    setConfirmLeave(false);
    if (!confirm) return;
    try {
      await channel.removeMembers([user.id]);
      setActiveChannel(undefined);
      router.push('/dashboard');
    } catch (error) {
      console.log(error);
    }
    
  };


  return (
    <div className=' flex justify-center items-center   w-full'>
     {confirmLeave && <div className="flex p-4 justify-center items-center z-50 fixed top-0 left-0 w-full h-full bg-black/50 bg-opacity-30">
      <div className="min-h-30 max-w-[900px] mx-auto bg-white rounded-lg p-6 flex flex-col gap-4 ">
        <p className="text-center text-lg font-semibold">Are you sure you want to leave this chat?</p>
        <div className="flex justify-center sm:justify-end gap-4">
          <Button   onClick={() => setConfirmLeave(false)}>Cancel</Button>
          <Button className='bg-red-600 hover:bg-red-500' onClick={handleLeaveChat}>Leave</Button>
        </div>
      </div>
      </div>}
      <div className='bg-transparent  h-[80vh] sm:px-4 container mx-auto '>
        {channel ?
          <Channel>
            <Window>
              <div className=' flex flex-col sm:flex-row gap-4 items-center justify-between'>
                {channel.data?.member_count === 1 ?
                  <ChannelHeader title='Everyone else has left this Chat' />
                : <ChannelHeader />}
                <div className='flex items-center gap-2'>
                  <Button variant='outline' onClick={handleCall}>
                    <VideoIcon className='w-4 h-4' />
                    <span>Start Call</span>
                  </Button>

                  <Button
                    className='text-red-500 hover:text-red-600 hover:bg-red-50'
                    variant='outline'
                    onClick={() => setConfirmLeave(true)}>
                    <LogOutIcon className='w-4 h-4' />
                    <span>Leave Chat</span>
                  </Button>
                </div>

              </div>
                <MessageList />
                <div className='sticky bottom-0 w-full'>
                  <MessageInput />
                </div>
            </Window>
            <Thread />
          </Channel>
        : <div className='flex flex-col items-center justify-center h-full'>
            <h2 className='text-2xl font-semibold text-muted-foreground mb-4'>
              No Chat Selected
            </h2>
            <p className='text-muted-foreground'>
              Select a chat from the sidebar or start a new communication.
            </p>
          </div>
        }
      </div>
    </div>
  );
};

export default Dashboard;
