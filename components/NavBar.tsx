export default function NavBar() {
    return <div className="flex flex-col items-center my-5">
        <div className="text-center flex items-center my-4">
            <img className="h-10 w-10" src="icon.webp"></img>
            <h1 className="m-2 p-2 justify-center font-bold text-4xl text-bold drop-shadow-xl">
                <a className="text-indigo-600 text-5xl font-bold animate-pulse " href="https://crowwd.io/">Crowwd.io</a> : 24 Hours Assessment</h1>
        </div>
        <div className="flex justify-center backdrop-blur-lg">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold m-3 p-3 rounded shadow-xl"><a href="/task-01">Task 1 : Portfolio Value Chart</a></button>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold m-3 p-3 rounded shadow-xl"><a href="/task-02">Task 2 : List of Transactions</a></button>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold m-3 p-3 rounded shadow-xl"><a href="/task-03">Task 3 : List of Holdings</a></button>
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold m-3 p-3 rounded shadow-xl"><a href="/task-04">Task 4 : Portfolio Composition Pie Chart</a></button>
        </div>

    </div>
}
