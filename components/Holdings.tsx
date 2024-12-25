import TableHead from "./TableHead"
import { Holding } from "@/types/types"
export default function HoldingsTable({ holdings }: { holdings: Holding[] }) {
    const columns = [
        { name: "Asset", key: "asset" },
        { name: "Value", key: "value" },
        { name: "Composition", key: "composition" }
    ]
    return (
        <table className=" table-auto bg-amber-100 shadow-xl text-center font-mono">
            <TableHead columns={columns} />
            <tbody className="border border-violet-300">
                {holdings.map((holding: Holding) => (
                    <tr key={holding.asset}>
                        <td className="border border-amber-200 px-4 py-2">{holding.asset}</td>
                        <td className="border border-amber-200 px-4 py-2 ">${holding.value}</td>
                        <td className="border border-amber-200 px-4 py-2">{holding.composition}% </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}