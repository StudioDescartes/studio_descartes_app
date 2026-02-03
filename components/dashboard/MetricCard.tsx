"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon?: ReactNode;
    delay?: number;
}

export default function MetricCard({ label, value, trend, trendUp, icon, delay = 0 }: MetricCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.5 }}
            className="glass-card p-6 rounded-2xl relative overflow-hidden group"
        >
            <div className="absolute -right-6 -top-6 bg-brand-blue/10 w-24 h-24 rounded-full blur-2xl group-hover:bg-brand-blue/20 transition-all duration-500"></div>

            <div className="flex justify-between items-start mb-4">
                <h3 className="text-sm font-medium text-white/60 font-sans tracking-wide uppercase">{label}</h3>
                {icon && <div className="text-brand-light opacity-80">{icon}</div>}
            </div>

            <div className="flex items-baseline gap-3">
                <span className="text-3xl font-bold font-serif text-white">{value}</span>
                {trend && (
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full",
                        trendUp ? "bg-brand-mint/10 text-brand-mint" : "bg-brand-coral/10 text-brand-coral"
                    )}>
                        {trend}
                    </span>
                )}
            </div>
        </motion.div>
    );
}
