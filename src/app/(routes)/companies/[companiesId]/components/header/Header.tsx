"use client"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

export function HeaderCompanyIdPage () {
    const router = useRouter()
    return (
        <div className=" flex items-center text-xl">
            <ArrowLeft className="mb-5 h-5 mr-2 cursor-pointer" onClick={() => router.push("/companies")}/>
            Edit Company
        </div>
    )
}