import React from 'react'
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { Facebook, Instagram, Twitter } from 'lucide-react'

const Footer = () => {
  return (
      <footer className="bg-gray-900 text-white pt-16 pb-8 px-6">
          <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                  <div>
                      <div className="mb-2">
                          <h3 className="text-xl font-serif tracking-tight font-medium text-gray-100">
                              <span className="font-light italic">florcent</span>
                              <span className="text-gray-400 mx-1">&</span>
                              <span className="font-medium">hampers</span>
                          </h3>
                      </div>
                      <p className="text-gray-400 text-sm mb-6">
                          Contemporary fashion for the modern individual. Elevate your style with our thoughtfully crafted collections.
                      </p>
                      <div className="flex space-x-4">
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Instagram className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
                              <Facebook className="h-5 w-5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white">
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
                          <li><a href="#" className="text-gray-400 text-sm hover:text-white">Terms & Conditions</a></li>
                      </ul>
                  </div>
              </div>
              <Separator className="bg-gray-800" />
              <div className="pt-8 flex flex-col md:flex-row justify-between items-center">
                  <p className="text-gray-400 text-sm mb-4 md:mb-0">© 2025 Élégance. All rights reserved.</p>
                  <div className="flex items-center gap-4">
                      <img src="/api/placeholder/40/24?text=Visa" alt="Visa" className="h-6" />
                      <img src="/api/placeholder/40/24?text=MC" alt="Mastercard" className="h-6" />
                      <img src="/api/placeholder/40/24?text=Amex" alt="American Express" className="h-6" />
                      <img src="/api/placeholder/40/24?text=PayPal" alt="PayPal" className="h-6" />
                  </div>
              </div>
          </div>
      </footer>
  )
}

export default Footer
