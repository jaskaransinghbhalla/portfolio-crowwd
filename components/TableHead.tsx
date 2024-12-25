export default function TableHead({ columns }: { columns: { name: string, key: string }[] }) {
    return (
        <thead>
            <tr className="font-semibold  border border-purple-400">
                {columns.map((column) => (
                    <th key={column.key} className=" font-semibold border border-amber-200 bg-amber-300 px-4 py-2">{column.name}</th>
                ))}
            </tr>
        </thead>
    )
}