'use client';
import AppSidebar from "@/components/appSidebar";
import "stream-chat-react/dist/css/v2/index.css";
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import UserSyncWrapper from "@/components/userSyncWrapper/UserSyncWrapper";
import streamClient from '@/lib/stream';
import Link from "next/link";

import { Chat } from 'stream-chat-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserSyncWrapper>
      <Chat client={streamClient}>
        <SidebarProvider
          style={
            {
              '--sidebar-width': '19rem',
            } as React.CSSProperties
          }>
          <AppSidebar />
          <SidebarInset>
            <header className=' flex sm:mt-20 h-16 shrink-0 items-center gap-2 px-4 sm:px-6'>
              <SidebarTrigger className='-ml-1' />
              <Separator
                orientation='vertical'
                className='mr-2 data-[orientation=vertical]:h-4'
              />
             <Link href="/dashboard">
              <h1 className='text-lg font-bold tracking-wider uppercase'>We Connect African's</h1>
             </Link>
            </header>
            <div className='flex flex-1 bg-transparent   flex-col gap-4 p-4 pt-0'>
          
            {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </Chat>
    </UserSyncWrapper>
  );
};

export default Layout;