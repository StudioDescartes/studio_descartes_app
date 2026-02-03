"use client";

import { BusinessIdea } from "@/lib/mockData";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer, Tooltip } from "recharts";

interface ScoreMatrixProps {
    idea: BusinessIdea;
}

export default function ScoreMatrix({ idea }: ScoreMatrixProps) {
    const data = [
        { subject: 'Marché', A: idea.scores.potentiel_marche, fullMark: 10 },
        { subject: 'Barrières', A: idea.scores.barrieres_entree, fullMark: 10 },
        { subject: 'Invest.', A: idea.scores.investissement_initial, fullMark: 10 },
        { subject: 'Break-even', A: idea.scores.temps_breakeven, fullMark: 10 },
        { subject: 'Scalabilité', A: idea.scores.scalabilite, fullMark: 10 },
        { subject: 'Différenc.', A: idea.scores.differenciation, fullMark: 10 },
        { subject: 'Ops', A: idea.scores.complexite_ops, fullMark: 10 },
        { subject: 'Mission', A: idea.scores.alignement_mission, fullMark: 10 },
    ];

    return (
        <div className="w-full h-[350px] relative">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 10]} tick={false} axisLine={false} />
                    <Radar
                        name={idea.nom}
                        dataKey="A"
                        stroke="#6182F4"
                        strokeWidth={3}
                        fill="#6182F4"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#12192C', borderColor: 'rgba(255,255,255,0.1)', color: '#fff' }}
                        itemStyle={{ color: '#6182F4' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
            <div className="absolute top-0 right-0 p-2 text-xs text-white/40">
                Score Radar
            </div>
        </div>
    );
}
