'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, ShoppingCart, Menu, X, ChevronDown, LogOut, Settings } from 'lucide-react'
import SignInDialog from '@/components/SignInDialog'
import { useSession, signOut } from 'next-auth/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const navLinkStyles = "font-semibold text-[#6B5D54] hover:text-[#C64636] transition-colors"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInDialogOpen, setSignInDialogOpen] = useState(false)
  const { data: session } = useSession()

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full shadow-md bg-[#FFF5EE] border-b border-[#C64636]/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo/Brand */}
          <Link href="/" className="text-3xl font-bold text-[#C64636] hover:text-[#A03828] transition-colors font-serif">
            candy & cake
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            <Link
              href="/"
              className={navLinkStyles}
            >
              Home
            </Link>
            <Link
              href="/#celebration"
              className={navLinkStyles}
            >
              Celebration Cakes
            </Link>
            <Link
              href="/#mini"
              className={navLinkStyles}
            >
              Mini Cakes
            </Link>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`flex items-center gap-2 ${navLinkStyles}`}
                  >
                    <User className="w-5 h-5" />
                    {session.user?.name || 'My Account'}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem
                    onClick={() => {
                      // Settings functionality can be added later
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center gap-2 cursor-pointer text-[#C64636]"
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SignInDialog 
                open={signInDialogOpen} 
                onOpenChange={setSignInDialogOpen}
              >
                <Button
                  variant="ghost"
                  className={`flex items-center gap-2 ${navLinkStyles}`}
                >
                  <User className="w-5 h-5" />
                  My Account
                </Button>
              </SignInDialog>
            )}
            <Link href="/checkout">
              <Button 
                size="sm" 
                className="flex items-center gap-2 text-white font-semibold shadow-md hover:shadow-lg bg-linear-to-br from-[#C64636] to-[#A03828]"
              >
                <ShoppingCart className="w-5 h-5" />
                Cart
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-[#C64636]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="lg:hidden py-4 space-y-3 border-t border-[#C64636]/20">
            <Link
              href="/"
              className={`block ${navLinkStyles} py-2`}
              onClick={handleCloseMobileMenu}
            >
              Home
            </Link>
            <Link
              href="/#celebration"
              className={`block ${navLinkStyles} py-2`}
              onClick={handleCloseMobileMenu}
            >
              Celebration Cakes
            </Link>
            <Link
              href="/#mini"
              className={`block ${navLinkStyles} py-2`}
              onClick={handleCloseMobileMenu}
            >
              Mini Cakes
            </Link>
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={`block ${navLinkStyles} w-full pl-0`}
                  >
                    <div className="flex items-center gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <span>{session.user?.name || 'My Account'}</span>
                      </div>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem
                    onClick={() => {
                      // Settings functionality can be added later
                      handleCloseMobileMenu()
                    }}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      signOut({ callbackUrl: '/' })
                      handleCloseMobileMenu()
                    }}
                    className="flex items-center gap-2 cursor-pointer text-[#C64636]"
                    variant="destructive"
                  >
                    <LogOut className="w-4 h-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <SignInDialog 
              open={signInDialogOpen} 
              onOpenChange={setSignInDialogOpen}
            >
              <Button
                variant="ghost"
                className={`flex items-center gap-2 pl-0! ${navLinkStyles}`}
                >
                <User className="w-5 h-5" />
                My Account
              </Button>
            </SignInDialog>
              
            )}
            <Link href="/checkout" onClick={handleCloseMobileMenu} className="block pt-3">
              <Button 
                className="w-full flex items-center justify-center gap-2 text-white font-semibold shadow-md bg-linear-to-br from-[#C64636] to-[#A03828]"
              >
                <ShoppingCart className="w-5 h-5" />
                View Cart
              </Button>
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
