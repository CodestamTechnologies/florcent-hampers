import Blogs from '@/components/main/blogs';
import Footer from '@/components/main/footer';
import Header from '@/components/main/header';
import Sidebar from '@/components/main/Sidebar';
import { CartProvider } from '@/providers/cartProvider';
import React from 'react'

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <CartProvider>
            <div className="min-h-screen bg-gradient-to-b from-purple-100 to-white flex">
                <Sidebar />
                <div className="flex-1">
                    <main className="">
                        <div className="bg-blue-900 text-white py-2 px-6 text-xs text-center">
                            Free shipping on all orders over $100 | Use code WELCOME15 for 15% off your first order
                        </div>
                        <Header />
                        {children}
                        <Blogs />
                        <Footer />
                    </main>
                </div>
            </div>
        </CartProvider>
    )
}

export default layout
