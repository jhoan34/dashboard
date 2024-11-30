import { Logo } from "../logo/logo";
import { SideBarRoutes } from "../sidetroutes";

export function SideBarComponent () {
    return (
        <div className="h-screen">
            <div className="h-full flex flex-col border">
                <Logo/>
                <SideBarRoutes/>
            </div>
        </div>
    )
}