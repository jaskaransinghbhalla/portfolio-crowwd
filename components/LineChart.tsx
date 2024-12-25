import { LineData } from '@/types/types';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
const LineChartComponent = ({ data }: { data: LineData[] | any }) => {
    return (
        <div className='bg-amber-100 border-2 rounded border-black-200 shadow-xl'>
            <LineChart width={900} height={500} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis label={"$"} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default LineChartComponent;
