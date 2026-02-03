"use client";

import { BusinessIdea } from "@/lib/mockData";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface ScoreMatrixProps {
    idea: BusinessIdea;
}

export default function ScoreMatrix({ idea }: ScoreMatrixProps) {
    const data = [
        { subject: 'Demande', A: idea.scores.demand_market, fullMark: 10 },
        { subject: 'Compet. Gap', A: idea.scores.competitor_gap, fullMark: 10 },
        { subject: 'Local/Ops', A: idea.scores.nocode_feasibility, fullMark: 10 },
        { subject: 'Paris Fit', A: idea.scores.monetization_speed, fullMark: 10 },
    ];

    return (
        <div className="w-full h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 'bold' }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                        name={idea.nom}
                        dataKey="A"
                        stroke="#00f2ff"
                        strokeWidth={3}
                        fill="#00f2ff"
                        fillOpacity={0.2}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#12192C', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        itemStyle={{ color: '#00f2ff' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0 p-2 text-xs text-white/40 font-mono">
                Indie Score
            </div>
        </div>
    );
}
