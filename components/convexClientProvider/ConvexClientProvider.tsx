"use client"
import { ConvexProviderWithClerk } from 'convex/react-clerk'
import { useAuth } from '@clerk/nextjs'
import { ConvexReactClient } from 'convex/react'
const ConvexClientProvider = ({ children }: { children: React.ReactNode }) => {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error('NEXT_PUBLIC_CONVEX_URL is not defined')
  }

  const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL)
  return (
   <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
    {children}
   </ConvexProviderWithClerk>
  )
}

export default ConvexClientProvider