import { CustomIcon } from "@/components/customIcon";
import { Building } from "lucide-react";
import { CustomersTable } from "../customersTable";

export function LastCustomer () {
    return (
        <div className="shadow-sm bg-background rounded-lg p-5 ">
            <div className="flex gap-x-2 items-center">
                <CustomIcon icon={Building}/>
                <p className="text-xl">Last Customers</p>
            </div>
            <div>
                <CustomersTable/>
            </div>
        </div>
    )

}