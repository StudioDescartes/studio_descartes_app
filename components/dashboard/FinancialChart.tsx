"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export default function FinancialChart() {
    const data = [
        { name: 'Y1 Q1', mvp: 4000, revenue: 2400 },
        { name: 'Y1 Q2', mvp: 3000, revenue: 1398 },
        { name: 'Y1 Q3', mvp: 2000, revenue: 9800 },
        { name: 'Y1 Q4', mvp: 2780, revenue: 15000 },
        { name: 'Y2 Q1', mvp: 1890, revenue: 22000 },
        { name: 'Y2 Q2', mvp: 2390, revenue: 28000 },
        { name: 'Y2 Q3', mvp: 3490, revenue: 35000 },
        { name: 'Y3', mvp: 4000, revenue: 45000 },
    ];

    return (
        <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#A3FCC2" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#A3FCC2" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorMvp" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#EE6F54" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#EE6F54" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                    <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value / 1000}k`} />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#12192C', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="revenue" stroke="#A3FCC2" fillOpacity={1} fill="url(#colorRevenue)" strokeWidth={2} name="Revenus" />
                    <Area type="monotone" dataKey="mvp" stroke="#EE6F54" fillOpacity={1} fill="url(#colorMvp)" strokeWidth={2} name="Coûts" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
