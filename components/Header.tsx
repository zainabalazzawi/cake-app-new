'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { User, ShoppingCart, Menu, X } from 'lucide-react'
import SignInDialog from '@/components/SignInDialog'

const navLinkStyles = "font-semibold text-[#6B5D54] hover:text-[#C64636] transition-colors"

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [signInDialogOpen, setSignInDialogOpen] = useState(false)

  const handleCloseMobileMenu = () => {
    setMobileMenuOpen(false)
  }

  const handleOpenSignInDialog = () => {
    setSignInDialogOpen(true)
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
            <Button
              variant="ghost"
              className={`block ${navLinkStyles} py-2 text-left w-full`}
              onClick={handleOpenSignInDialog}
            >
              My Account
            </Button>
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
