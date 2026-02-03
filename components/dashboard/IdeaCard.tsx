"use client";

import { BusinessIdea } from "@/lib/mockData";
import { motion } from "framer-motion";
import { ArrowUpRight, TrendingUp } from "lucide-react";
import Link from "next/link";

interface IdeaCardProps {
    idea: BusinessIdea;
    index: number;
}

export default function IdeaCard({ idea, index }: IdeaCardProps) {
    // Color code based on score
    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-brand-mint border-brand-mint/30";
        if (score >= 60) return "text-brand-blue border-brand-blue/30";
        return "text-brand-coral border-brand-coral/30";
    };

    return (
        <Link href={`/idea/${idea.id}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.5)" }}
                className="glass-card p-6 rounded-2xl h-full flex flex-col relative group cursor-pointer"
            >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

                <div className="relative z-10 flex justify-between items-start mb-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-white/50 border border-white/5">
                        {idea.tags[0]}
                    </span>
                    <div className={`flex items-center gap-1 font-bold font-mono text-lg px-2 py-1 rounded-lg border bg-background/50 backdrop-blur-sm ${getScoreColor(idea.score_global)}`}>
                        {idea.score_global}
                        <span className="text-xs opacity-60">/100</span>
                    </div>
                </div>

                <h3 className="relative z-10 text-xl font-serif font-bold text-white mb-2 group-hover:text-brand-light transition-colors">
                    {idea.nom}
                </h3>

                <p className="relative z-10 text-sm text-white/60 mb-6 line-clamp-2 flex-grow">
                    {idea.concept}
                </p>

                <div className="relative z-10 grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                    <div>
                        <div className="text-xs text-white/40 mb-1">TAM Estimation</div>
                        <div className="text-sm font-medium text-white">{idea.metrics.tam}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-white/40 mb-1">Potentiel CA</div>
                        <div className="text-sm font-medium text-brand-mint">{idea.metrics.ca_potentiel}</div>
                    </div>
                </div>

                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-brand-light">
                    <ArrowUpRight size={24} />
                </div>
            </motion.div>
        </Link>
    );
}
