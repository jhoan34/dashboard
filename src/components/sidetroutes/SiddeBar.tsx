"use client"
import { SideBarItem } from "../sidebarItem"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import {dataGeneralSidebar, dataSupportSidebar, dataToolsSidebar} from "./SideBar.data"

export function SideBarRoutes () {
    return (
        <div  className="flex flex-col justify-between h-full">
            <div>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2">General</p>
                    {
                        dataGeneralSidebar.map((element , index) => (
                            <SideBarItem key={element.label} item={element} />
                        ))
                    }
                </div>
                <Separator/>
                <div className="p-2 md:p-6">
                    <p className="text-slate-500 mb-2" >Tools</p>
                    {
                        dataToolsSidebar.map((element, index) => (
                            <SideBarItem key={element.label} item={element} />
                        ))
                    }
                </div>
                <Separator/>
                <div className="p-2 md:p-6 ">
                    <p className="text-slate-500 mb-2" >Support</p>
                    {
                        dataSupportSidebar.map((element, index) => (
                            <SideBarItem key={element.label} item={element} />
                        ))
                    }
                </div>
            </div>
            <div>
                <div className="text-center p-6">
                    <Button variant="outline" className="w-full">
                        Upgrade Plan
                    </Button>
                </div>
                <Separator/>
                <footer className="mt-3 p-3 text-center">
                    2024. All Rights reserved.
                </footer>
            </div>
        </div>
    )
}