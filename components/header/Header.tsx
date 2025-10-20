"use client"

import { SignInButton, UserButton } from "@clerk/nextjs"
import { Authenticated, Unauthenticated } from "convex/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "../ui/button"
import Image from "next/image"
import { useEffect } from "react"


const Header = () => {
    const pathname = usePathname()
    const isDashboard = pathname?.startsWith('/dashboard')
  
    const handleNavbarToggle = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
    }
    useEffect(() => {
       
       handleNavbarToggle()
      }, [pathname]);
  return (
    <header className="z-50 shadow bg-white sticky sm:fixed w-full top-0 ">
        <div className=" h-16 sm:px-6 flex items-center justify-between px-4 ">

        <Link href={'/'} onClick={handleNavbarToggle} >
        <div className="flex items-center justify-center gap-2">
            <Image style={{width: 50, height: 50}} src={'/images/logo/logo_africa.png'} width={50} height={50} alt="logo" />
            <span className="">
                <b className="text-primary">
                    African's</b> Connect
            </span>
            </div> 
            </Link>
        <div className="flex items-center gap-2">
            <Authenticated>
                {
                    !isDashboard && (
                        <Link href={'/dashboard'}>
                            <Button variant="outline" className="mr-4">Dashboard</Button>
                        </Link>
                    )
                }
              <UserButton afterSignOutUrl="/" />
            </Authenticated>
            <Unauthenticated>
                <SignInButton mode="modal"
                forceRedirectUrl="/dashboard"
                signUpFallbackRedirectUrl={"/dashboard"}
                >
                    <Button   variant="outline">Sign In</Button>
                </SignInButton>
                    
            </Unauthenticated>
        </div>
        </div>
    </header>
  )
}

export default Header