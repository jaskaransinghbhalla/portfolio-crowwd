"use client"
// Imports
import CompositionTable from "@/components/Composition"
import { Category } from "@/types/types";
import axios from "axios"
import { useEffect, useState } from "react"
import { Pie, PieChart } from "recharts";
import Loading from "@/components/Loading"

// Component
export default function () {
    const [holdings, setHoldings] = useState<Category[]>([]);
    const [category, setCategory] = useState("Sector");
    const [loading, setLoading] = useState(true)
    function fetchData() {
        axios.get('http://localhost:3000/api/v1/holdings/visual', {
            params: {
                category: category
            }
        }).then((res) => {
            setHoldings(res.data)
            setLoading(false)
        })
    }
    useEffect(() => {
        fetchData()
    }, [category])

    if (loading) {
        return <Loading />
    }
    return <div >
        <div className="flex flex-col justify-center items-center ">
            <div className="text-4xl font-bold drop-shadow-lg my-3">Portfolio Composition</div>
            <div className="my-3">
                <button className="m-3 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded shadow-xl" onClick={() => { setCategory("Sector") }}>Sector</button>
                <button className="m-3 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded shadow-xl" onClick={() => { setCategory("Country") }}>Country</button>
                <button className="m-3 p-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded shadow-xl" onClick={() => { setCategory("AssetClass") }}>Asset Class</button>
            </div>
            <div className="flex jplace-items-center content-center my-3 items-center mx-3 ">
                <div className="py-3 drop-shadow-lg mx-5 px-3">
                    <CompositionTable category={category} holdings={holdings} />
                </div>
                <div className="py-1 drop-shadow-lg mx-5 px-3">
                    <PieChart width={300} height={300}>
                        <Pie data={holdings} dataKey="composition" nameKey="category" cx="50%" cy="50%" outerRadius={100} fill="#4338ca" label />
                    </PieChart>
                </div>
            </div>
        </div>
    </div>

}