'use client'

import { ProductCard } from '@/components/ProductCard'
import { getCelebrationCakes, getMiniCakes } from '@/lib/products'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const Home = () => {
  const celebrationCakes = getCelebrationCakes()
  const miniCakes = getMiniCakes()

  return (
    <div className="min-h-screen bg-[#FFFBF7]">
      {/* Hero Section */}
      <section className="py-24 md:py-36 hero-gradient">
        <div className="container mx-auto px-4 max-w-5xl text-center">     
          {/* Main heading */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl mb-8 text-primary-brown">
            Your Special Moments
            <span className="block mt-2 gradient-text">
              Deserve Our Best
            </span>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-secondary-brown">
            Handcrafted cakes baked fresh daily. From celebrations to everyday treats, 
            we bring quality and flavor to every bite.
          </p>
          
        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link href="#celebration">
            <Button 
              variant="primary-gradient"
              size="lg" 
              className="text-lg px-10 py-7 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              Explore Our Collection
              <span className="ml-2">→</span>
            </Button>
          </Link>
          <Link href="/login">
            <Button 
              variant="outline-red"
              size="lg" 
              className="text-lg px-10 py-7 font-semibold transition-all duration-300 hover:shadow-lg"
            >
              Sign In
            </Button>
          </Link>
        </div>
        </div>
      </section>

      <main className="container mx-auto px-4">
        {/* Celebration Cakes Section */}
        <section id="celebration" className="py-16 scroll-mt-20">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary-brown">
              Celebration Cakes
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-secondary-brown">
              Grand cakes perfect for birthdays, weddings, anniversaries, and life's most memorable moments
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {celebrationCakes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Mini Cakes Section */}
        <section id="mini" className="py-16 scroll-mt-20">
          <div className="text-center mb-16">
  
            <h2 className="text-5xl md:text-6xl font-serif font-bold mb-6 text-primary-brown">
              Mini Cakes & Cupcakes
            </h2>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto text-secondary-brown">
              Perfect individual portions for personal celebrations, gifts, and everyday sweet moments
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {miniCakes.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default Home;
