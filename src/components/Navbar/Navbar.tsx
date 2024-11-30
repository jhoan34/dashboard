import { Input } from "../ui/input"
import {Sheet , SheetContent, SheetTrigger} from "@/components/ui/sheet"
import { UserButton } from "@clerk/nextjs"
import { Menu, Search } from "lucide-react"
import { SideBarRoutes } from "../sidetroutes"
import { ToggleTheme } from "../toogletheme"
export function Navbar () {
    return (
        <nav className=" flex items-center px-2 gap-x-4 md:px-6 justify-between w-full bg-background border-b h-20">
            <div className="block xl:hidden ">
                <Sheet>
                    <SheetTrigger>
                        <Menu/>
                    </SheetTrigger>
                    <SheetContent>  
                        <SideBarRoutes/>
                    </SheetContent>
                </Sheet>
            </div>
            <div className="relative w-[300px]">
                <Input placeholder="search" className="rounded-lg"/>
                <Search strokeWidth={1} className="absolute top-2 right-2"/> 
            </div>
            <div className="flex gap-x-2 items-center">
                <ToggleTheme/>
                <UserButton/>
            </div>
        </nav>
    )
} 