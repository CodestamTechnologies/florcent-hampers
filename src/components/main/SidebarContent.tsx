import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import HelpModal from "../help-modal";
import { X } from "lucide-react";

const SidebarContent = ({ closeSidebar, categories, quickLinks }: any) => (
    <div className="w-full h-full flex flex-col bg-gradient-to-b from-white to-blue-50 z-50">
        {/* Top Logo & Close */}
        <div className="flex justify-between items-center px-4 py-4">
            <h1 className="text-xl font-serif tracking-tight font-medium text-gray-900">
                <span className="font-light italic">florcent</span>
                <span className="text-gray-400 mx-1">&</span>
                <span className="font-medium">hampers</span>
            </h1>
            <div className="md:hidden">
                <Button variant="ghost" size="icon" onClick={closeSidebar}>
                    <X className="w-5 h-5" />
                </Button>
            </div>
        </div>

        <Separator className="mb-2" />

        <div className="px-6 pt-4">
            <h2 className="font-bold text-xl text-gray-900 tracking-tight">Explore</h2>
        </div>

        <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 p-2">
                {categories.map((category: any) => (
                    <div key={category.name}>
                        <a href={category.link}
                            className={buttonVariants({
                                variant: "ghost",
                                className: `w-full justify-start font-medium`
                            })}
                        >
                            {category.icon}
                            {category.name}
                            {category.isNew && (
                                <Badge variant="secondary" className="ml-2 bg-blue-100 text-blue-700 text-xs">New</Badge>
                            )}
                        </a>
                    </div>
                ))}
            </div>

            <div className="p-2 mt-4">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Quick Access</h3>
                <div className="space-y-1">
                    {quickLinks.map((link: any) => !link.isHidden && (
                        <Button
                            key={link.name}
                            variant="ghost"
                            className="w-full justify-start font-medium border-gray-300 text-gray-700 hover:bg-blue-100 hover:text-blue-800"
                            onClick={link.onClick}
                        >
                            {link.icon}
                            {link.name}
                            {link.count !== 0 && (
                                <Badge className="ml-auto bg-blue-600 text-white">{link.count}</Badge>
                            )}
                        </Button>
                    ))}
                </div>
            </div>
        </ScrollArea>

        <div className="p-4 mt-auto">
            <Separator className="mb-4" />
            <HelpModal />
        </div>
    </div>
);

export default SidebarContent;
