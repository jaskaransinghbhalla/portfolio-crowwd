"use client"
// Imports
import HoldingsTable from "@/components/Holdings"
import { Holding } from "@/types/types"
import axios from "axios"
import { useEffect, useState } from "react"
import Loading from "@/components/Loading"

// Component
export default function () {
    const [holdings, setHoldings] = useState<Holding[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/holdings/all').then((res) => {
            setHoldings(res.data)
            setLoading(false)
        })
    }, [])
    if (loading) {
        return <Loading />
    }
    return <div>
        <div className="flex flex-col justify-center items-center ">
            <div className="my-4 text-4xl font-bold drop-shadow-lg">List of Holdings</div>
            <div className="my-4">
                <HoldingsTable holdings={holdings} />
            </div>
        </div>
    </div>

}