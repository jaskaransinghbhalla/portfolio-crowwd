"use client"
// Imports
import axios from "axios"
import { useEffect, useState } from "react";
import LineChartComponent from "@/components/LineChart"
import { LineData } from "@/types/types"
import Loading from "@/components/Loading";

// Component
export default function () {
    const [value, setValue] = useState<{ data: LineData }>();
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/transactions/value').then((res) => {
            setValue(res.data);
            setLoading(false);
        })
    }, [])
    if (loading) {
        return <Loading />
    }
    return (
        <div className="bg-violet-100">
            <div className="flex flex-col justify-center items-center ">
                <div className="text-4xl font-bold drop-shadow-lg my-3">Portfolio Value Chart</div>
                <div className="mt-4 mb-8">
                    <LineChartComponent data={value} />
                </div>
            </div>
        </div>
    )
}




