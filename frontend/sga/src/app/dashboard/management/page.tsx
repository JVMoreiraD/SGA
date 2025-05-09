// 'use client'
// import { Input } from "@/components/ui/input"
import { DialogDemo } from "@/app/forms/dialog"

import { InputDemo } from "@/components/Input"



export default async function DemoPage() {
    return (
        <div className="w-full">

            <div className="flex justify-center items-start py-4 gap-x-14">
                <InputDemo />
                <DialogDemo />
            </div>

            <div className="flex items-center justify-center">




            </div>
        </div>

    )
}

