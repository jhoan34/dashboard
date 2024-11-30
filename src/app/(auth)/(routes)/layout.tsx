import { Logo } from "@/components/logo/logo";
import React from "react";

export default function LayoutLogin ({children} : {children: React.ReactNode}) {
    return (
        <div className="flex flex-col justify-center h-full items-center">
            <Logo/>
            <h1>
                Welcome to my Dashboard
            </h1>
            <h2 className="text-2xl mb-3">JhoanDev</h2>
            {children}
        </div>
    )
}