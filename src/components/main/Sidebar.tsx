"use client"

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { useAuth } from '@/providers/authProvider';
import { useCart } from '@/providers/cartProvider';
import {
    Gift,
    Heart,
    LayoutDashboard,
    Package,
    Plus,
    Shirt,
    ShoppingBasket,
    ShoppingCart,
    Sparkles,
    ToyBrick,
    User,
    WalletCards
} from "lucide-react";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HelpModal from "../help-modal";

const Sidebar = () => {
    const { cartCount, favoritesCount } = useCart();
    const { openLoginModal, user } = useAuth();
    const router = useRouter();

    const categories = [
        {
            name: "Home",
            link: "/",
            icon: <LayoutDashboard className="h-4 w-4 mr-3" />,
            color: "bg-pink-50 text-pink-700",
        },
        {
            name: "Gifts",
            link: "/gifts",
            icon: <Gift className="h-4 w-4 mr-3" />,
            color: "bg-pink-50 text-pink-700",
        },
        {
            name: "Hampers",
            link: "/hampers",
            icon: <Package className="h-4 w-4 mr-3" />,
            isNew: true,
            color: "bg-green-50 text-green-700",
        },
        {
            name: "Baskets",
            link: "/baskets",
            icon: <ShoppingBasket className="h-4 w-4 mr-3" />,
            color: "bg-orange-50 text-orange-700",
        },
        {
            name: "Poshak",
            link: "/poshak",
            icon: <Shirt className="h-4 w-4 mr-3" />,
            color: "bg-violet-50 text-violet-700",
        },
        {
            name: "Soft Toys",
            link: "/soft-toys",
            icon: <ToyBrick className="h-4 w-4 mr-3" />,
            isNew: true,
            color: "bg-rose-50 text-rose-700",
        },
        {
            name: "Bhandarwals",
            link: "/bhandarwals",
            icon: <Sparkles className="h-4 w-4 mr-3" />,
            color: "bg-yellow-50 text-yellow-700",
        },
        {
            name: "Diwali Items",
            link: "/diwali-items",
            icon: <Sparkles className="h-4 w-4 mr-3" />,
            isNew: true,
            color: "bg-amber-50 text-amber-700",
        },
        {
            name: "Envelope n potlis",
            link: "/envelope-n-potlis",
            icon: <WalletCards className="h-4 w-4 mr-3" />,
            isNew: true,
            color: "bg-amber-50 text-amber-700",
        },
    ];


    const allowedEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];
    const quickLinks = [
        {
            name: "Favorites",
            icon: <Heart className="h-4 w-4 mr-2" />,
            count: favoritesCount,
            onClick: () => router.push('/favourites')
        },
        {
            name: "My Cart",
            icon: <ShoppingCart className="h-4 w-4 mr-2" />,
            count: cartCount,
            onClick: () => router.push('/cart')
        },
        {
            name: "Account",
            icon: <User className="h-4 w-4 mr-2" />,
            onClick: openLoginModal,
            count: 0,
        },
        {
            name: "Orders",
            icon: <LayoutDashboard className="h-4 w-4 mr-2" />,
            onClick: () => router.push('/orders'),
            count: 0,
        },
        {
            name: "Add Product",
            icon: <Plus className="h-4 w-4 mr-2" />,
            count: 0,
            onClick: () => router.push('/add-product'),
            isHidden: !allowedEmails.includes(user?.email || ""),
        }
    ];

    return (
        <div className="w-64 bg-gradient-to-b from-white to-blue-50 h-screen flex flex-col shadow-sm sticky top-0">
            {/* Logo Section */}
            <div className="flex flex-col items-center py-4">
                {/* Logo Typography */}
                <div className="">
                    <h1 className="text-xl font-serif tracking-tight font-medium text-gray-900">
                        <span className="font-light italic">florcent</span>
                        <span className="text-gray-400 mx-1">&</span>
                        <span className="font-medium">hampers</span>
                    </h1>
                </div>
            </div>

            <Separator className="mb-2" />

            {/* Explore Header */}
            <div className="px-6 pt-4">
                <h2 className="font-bold text-xl text-gray-900 tracking-tight">Explore</h2>
            </div>

            {/* Categories */}
            <ScrollArea className="flex-1 px-2">
                <div className="space-y-1 p-2">
                    {categories.map((category) => (
                        <div key={category.name}>
                            <Link
                                href={category.link}
                                className={buttonVariants({
                                    variant: "ghost",
                                    className: `w-full justify-start font-medium`
                                })}
                            >
                                {category.icon}
                                {category.name}
                                {category.isNew && (
                                    <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 text-xs">
                                        New
                                    </Badge>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="p-2 mt-4">
                    <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Quick Access</h3>
                    <div className="space-y-1">
                        {quickLinks.map((link) => !link.isHidden && (
                            <Button
                                key={link.name}
                                variant="ghost"
                                className={`w-full justify-start font-medium border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-800 group cursor-pointer`}
                                onClick={link.onClick}
                            >
                                {link.icon}
                                {link.name}
                                {link.count !== 0 && (
                                    <Badge className="ml-auto bg-blue-600 text-white">
                                        {link.count}
                                    </Badge>
                                )}
                            </Button>
                        ))}
                    </div>
                </div>
            </ScrollArea>

            {/* Help Section */}
            <div className="p-4 mt-auto">
                <Separator className="mb-4" />
                <HelpModal />
            </div>
        </div>
    );
};

export default Sidebar;
