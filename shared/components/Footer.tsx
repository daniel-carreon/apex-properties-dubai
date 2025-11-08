import Link from 'next/link'
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-primary text-white">
      {/* Gold divider line */}
      <div className="h-1 bg-gradient-gold" />

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Column 1: Logo & Tagline */}
          <div>
            <h3 className="text-2xl font-playfair font-bold mb-4">
              APEX <span className="text-gradient-gold">PROPERTIES</span>
            </h3>
            <p className="text-gray-400 font-inter text-sm mb-6">
              Dubai's premier ultra-luxury real estate agency. Your gateway to
              exclusive waterfront villas, penthouses, and investment
              opportunities.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-secondary transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-4 text-secondary">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/properties"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200 font-inter text-sm"
                >
                  Browse Properties
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200 font-inter text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200 font-inter text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/golden-visa"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200 font-inter text-sm"
                >
                  Golden Visa Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="text-lg font-montserrat font-semibold mb-4 text-secondary">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 font-inter text-sm">
                  DIFC Gate Village 10, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                <a
                  href="tel:+97144445555"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200 font-inter text-sm"
                >
                  +971 4 444 5555
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-secondary mr-3 flex-shrink-0" />
                <a
                  href="mailto:inquiries@apexpropertiesdubai.ae"
                  className="text-gray-400 hover:text-secondary transition-colors duration-200 font-inter text-sm"
                >
                  inquiries@apexpropertiesdubai.ae
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <p className="text-center text-gray-400 font-inter text-sm">
            &copy; {currentYear} Apex Properties Dubai. All rights reserved. |{' '}
            <span className="text-secondary">
              Powered by AI-Driven Real Estate Technology
            </span>
          </p>
        </div>
      </div>
    </footer>
  )
}
