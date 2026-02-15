"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"


export default function Demopage() {
    const [loading, setLoading] = useState(false);
    const [loading1, setloading1] = useState(false);
    const handleBlocking = async () => {
        setLoading(true);
        await fetch("/api/demo/blocking", { method: "POST" })
        setLoading(false);
    };

    const handleBackground = async () => {
        setloading1(true);
        await fetch("/api/demo/background", { method: "POST" })
        setloading1(false);
    }
    return (
        <div className="p-8 space-x-4">
            <Button disabled={loading} onClick={handleBlocking}>
                {loading ? "loading.." : "Blocking"}
            </Button>
            <Button disabled={loading1} onClick={handleBackground}>
                {loading1 ? "loading.." : "Background"}
            </Button>
        </div>
    )
}