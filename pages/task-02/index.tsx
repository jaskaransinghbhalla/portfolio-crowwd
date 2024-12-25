"use client"
// Imports
import TransactionsTable from "@/components/Transactions"
import axios from "axios"
import { useEffect, useState } from "react"
import { Transaction } from "@/types/types"
import Loading from "@/components/Loading"

// Component
export default function () {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        axios.get('http://localhost:3000/api/v1/transactions/all').then((res) => {
            setTransactions(res.data)
            setLoading(false)
        })
    }, [])

    if (loading) {
        return <Loading />
    }

    return <div className="bg-violet-100">
        <div className="flex flex-col justify-center items-center ">
            <div className="my-4 text-4xl font-bold drop-shadow-lg">List of Transactions</div>
            <div className="my-4">
                <TransactionsTable transactions={transactions} />
            </div>
        </div>
    </div>

}