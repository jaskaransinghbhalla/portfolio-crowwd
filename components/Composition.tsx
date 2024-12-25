import { Category } from "@/types/types"
export default function CompositionTable({ category, holdings }: { category: string, holdings: Category[] }) {
    return (
        <table className="table-auto bg-amber-100 m-5 shadow-xl text-center font-mono">
            <thead className="border border-amber-200">
                <tr className="">
                    <th className="font-semibold border border-amber-200 bg-amber-300 px-4 py-2">{category} </th>
                    <th className="font-semibold border border-amber-200 bg-amber-300 px-4 py-2">Composition</th>
                </tr>
            </thead>
            <tbody className="border border-violet-300">
                {holdings.map((holding: Category) => (
                    <tr key={holding.category} className="text-center">
                        <td className="border border-amber-200 px-4 py-2">{holding.category}</td>
                        <td className="border border-amber-200 px-4 py-2">{holding.composition}% </td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}