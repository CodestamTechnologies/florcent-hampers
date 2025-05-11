import React from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  <div>
                        {/* Logo */}
                              <div className=" text-center mb-5 mr-16  flex items-center justify-center">
                        <Image
                          src='/logofooter.jpg'
                          alt="Florcent & Hampers" 
                          width={100} // adjust as needed
                          height={100} // adjust as needed
                          className="object-contain text-center flex items-center-safe justify-center"
                        />
                      </div>
                      <p className="text-gray-400 text-sm mb-6">
                          Contemporary fashion for the modern individual. Elevate your style with our thoughtfully crafted collections.
                      </p>
                      <div className="flex space-x-4">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                              <Instagram className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                              <Facebook className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-500">
                              <Twitter className="h-5 w-5" />
                          </Button>
                      </div>
                  </div>
                  <div>
                      <h4 className="font-medium mb-4">Shop</h4>
                      <ul className="space-y-2">
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">New Arrivals</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Bestsellers</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Sale</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Collections</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Gift Cards</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-medium mb-4">Information</h4>
                      <ul className="space-y-2">
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">About Us</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Sustainability</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Careers</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Affiliates</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Blog</a></li>
                      </ul>
                  </div>
                  <div>
                      <h4 className="font-medium mb-4">Customer Service</h4>
                      <ul className="space-y-2">
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Contact Us</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Shipping & Returns</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">FAQ</a></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Size Guide</a></li>
                          <li><Link href="/privacy" className="text-gray-400 text-sm hover:text-white">Privacy Policy</Link></li>
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Terms & Conditions</a></li>
                      </ul>
                  </div>
              </div>
              <Separator className="bg-gray-800" />
              <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Élégance. All rights reserved.</p>
                  <div className="flex items-center gap-4">
                      <img src="/visa.webp" alt="Visa" className="h-6" />
                      <img src="/Mastercard.webp" alt="Mastercard" className="h-6" />
                      <img src="/american1.webp" alt="American Express" className="h-6" />
                      <img src="/paypal.webp" alt="PayPal" className="h-6" />
                  </div>
              </div>
          </div>
      </footer>
  )
}

export default Footer
