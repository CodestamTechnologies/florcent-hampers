"use client"

import React, { useState } from 'react'
import { Button } from '../ui/button'
import { Bell, Menu, Search, ShoppingCart, User } from 'lucide-react'
import { Input } from '../ui/input'
import { useCart } from '@/providers/cartProvider'
import { useAuth } from '@/providers/authProvider'

const Header = () => {
    const [notificationCount] = useState(2);
    const { cartCount, openCartModal } = useCart();
    const { openLoginModal } = useAuth();
    return (<header className="bg-white py-4 px-6 border-b sticky top-0 z-30">
        <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="text-2xl font-serif font-medium">Élégance</div>
                </div>
                <div className="hidden md:flex items-center space-x-4">
                    <div className="relative">
                        <Input
                            placeholder="Search for products..."
                            className="w-64 pl-8 rounded-full bg-gray-50 border-gray-200 focus:bg-white"
                        />
                        <Search className="h-4 w-4 absolute left-2.5 top-2.5 text-gray-500" />
                    </div>
                    <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5" />
                        {notificationCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-rose-500 text-white text-xs flex items-center justify-center rounded-full">
                                {notificationCount}
                            </span>
                        )}
                    </Button>
                    <Button variant="ghost" size="icon" onClick={openLoginModal}>
                        <User className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative" onClick={openCartModal}>
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </div>
                <div className="flex md:hidden items-center space-x-2">
                    <Button variant="ghost" size="icon">
                        <Search className="h-5 w-5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="relative" onClick={openCartModal}>
                        <ShoppingCart className="h-5 w-5" />
                        {cartCount > 0 && (
                            <span className="absolute top-0 right-0 h-4 w-4 bg-blue-600 text-white text-xs flex items-center justify-center rounded-full">
                                {cartCount}
                            </span>
                        )}
                    </Button>
                </div>
            </div>
        </div>
    </header>
    )
}

export default Header
