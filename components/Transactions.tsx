import { Transaction } from "@/types/types";
import TableHead from "./TableHead";
export default function TransactionsTable({ transactions }: { transactions: Transaction[] }) {
    function formatDate(timestamp: string) {
        const date = new Date(timestamp);
        return date.toUTCString();
    }
    const columns = [
        { name: "Transaction ID", key: "id" },
        { name: "Asset ID", key: "assetid" },
        { name: "Shares", key: "shares" },
        { name: "Action", key: "action" },
        { name: "Date", key: "createdat" },
        { name: "Price", key: "price" }
    ]
    return (

        <table className="table-auto bg-amber-100 shadow-xl mt-5 mb-9 text-center font-mono">
            <TableHead columns={columns} />
            <tbody className="border border-purple-500">
                {transactions.map((transaction: Transaction) => (
                    <tr key={transaction.id} className="text-center">
                        <td className="border border-amber-200 px-4 py-2">{transaction.id}</td>
                        <td className="border border-amber-200 px-4 py-2">{transaction.assetid}</td>
                        <td className="border border-amber-200 px-4 py-2">{transaction.shares}</td>
                        <td className="border border-amber-200 px-4 py-2">{transaction.action}</td>
                        <td className="border border-amber-200 px-4 py-2">{formatDate(transaction.createdat)}</td>
                        <td className="border border-amber-200 px-4 py-2 text-left">${transaction.price}</td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}