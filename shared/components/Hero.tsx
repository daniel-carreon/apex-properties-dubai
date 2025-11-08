'use client'

import Image from 'next/image'
import { Button } from './Button'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero() {
  const scrollToProperties = () => {
    const element = document.getElementById('properties')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1920"
          alt="Dubai Skyline at Sunset"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <div className="mx-auto max-w-7xl px-6 text-center lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* Glassmorphism Badge */}
            <div className="mb-6 inline-block rounded-full glass-dark px-6 py-2 text-sm font-montserrat text-white">
              Dubai's Premier Luxury Real Estate Agency
            </div>

            {/* Main Heading */}
            <h1 className="font-playfair text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl mb-6">
              Discover Dubai's Most{' '}
              <span className="text-gradient-gold">Exclusive Properties</span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto max-w-2xl text-lg sm:text-xl font-montserrat text-gray-200 mb-10">
              Penthouses • Waterfront Villas • Off-Plan Developments •
              Investment Opportunities
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg">
                Explore Properties
              </Button>
              <Button variant="secondary" size="lg">
                Talk to AI Consultant
              </Button>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3"
            >
              <div className="glass-dark rounded-xl p-6">
                <div className="text-4xl font-orbitron font-bold text-secondary">
                  AED 2B+
                </div>
                <div className="mt-2 text-sm font-montserrat text-gray-300">
                  Properties Sold
                </div>
              </div>
              <div className="glass-dark rounded-xl p-6">
                <div className="text-4xl font-orbitron font-bold text-secondary">
                  500+
                </div>
                <div className="mt-2 text-sm font-montserrat text-gray-300">
                  Happy Clients
                </div>
              </div>
              <div className="glass-dark rounded-xl p-6">
                <div className="text-4xl font-orbitron font-bold text-secondary">
                  98%
                </div>
                <div className="mt-2 text-sm font-montserrat text-gray-300">
                  Client Satisfaction
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToProperties}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-secondary"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-10 w-10" />
      </motion.button>
    </section>
  )
}
