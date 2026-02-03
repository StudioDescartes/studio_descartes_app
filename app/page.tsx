"use client";

import { MotionConfig } from "framer-motion";
import { Activity, Brain, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import IdeaCard from "@/components/dashboard/IdeaCard";
import MetricCard from "@/components/dashboard/MetricCard";
import { MOCK_IDEAS } from "@/lib/mockData";

export default function Home() {
  return (
    <MotionConfig transition={{ duration: 0.5 }}>
      <main className="min-h-screen p-8 md:p-12 relative z-10 max-w-7xl mx-auto">

        <header className="mb-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="flex items-center gap-3 text-brand-mint mb-2">
              <Zap size={18} />
              <span className="uppercase tracking-widest text-xs font-bold">Studio Descartes Intelligence</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">
              Business Ideas <br /> Scorer <span className="text-brand-light">.</span>
            </h1>
          </div>

          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-4">
              <Link href="/methodologie" className="text-sm text-white/60 hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                Notre Méthodologie
              </Link>
              <Link href="/inputs" className="text-sm text-white/60 hover:text-white transition-colors underline decoration-white/30 underline-offset-4">
                Données Requises
              </Link>
            </div>
            <div className="flex gap-4">
              <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-white/60">
                v1.0.0 (Alpha)
              </div>
              <div className="px-4 py-2 bg-brand-blue text-white rounded-full text-sm font-bold shadow-lg shadow-brand-blue/20 cursor-pointer hover:bg-brand-blue/90 transition-colors">
                + Nouvelle Idée
              </div>
            </div>
          </div>
        </header>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <MetricCard
            label="Total Market Cap (TAM)"
            value="1.03Md€"
            trend="+12%"
            trendUp={true}
            icon={<TrendingUp />}
            delay={0.1}
          />
          <MetricCard
            label="Top Score Global"
            value="92/100"
            trend="Stoic App"
            trendUp={true}
            icon={<Activity />}
            delay={0.2}
          />
          <MetricCard
            label="Idées Analysées"
            value="12"
            trend="4 waiting"
            trendUp={false}
            icon={<Brain />}
            delay={0.3}
          />
          <MetricCard
            label="Revenu Potentiel"
            value="2.5M€"
            trend="Year 3"
            trendUp={true}
            icon={<Zap />}
            delay={0.4}
          />
        </div>

        {/* Filters / Section Title */}
        <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
          <h2 className="text-2xl font-serif text-white">Opportunités Détectées</h2>
          <div className="flex gap-4 text-sm text-white/40">
            <span className="text-white font-medium cursor-pointer">Tous</span>
            <span className="hover:text-white cursor-pointer transition-colors">Top Tier (&gt;80)</span>
            <span className="hover:text-white cursor-pointer transition-colors">Quick Wins</span>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_IDEAS.sort((a, b) => b.score_global - a.score_global).map((idea, index) => (
            <IdeaCard key={idea.id} idea={idea} index={index} />
          ))}

          {/* Add placeholder card for "Add New" visual balance */}
          <div className="border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-6 min-h-[300px] hover:border-white/20 hover:bg-white/5 transition-all cursor-pointer group">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-blue/20 group-hover:text-brand-blue transition-colors text-white/20">
                <span className="text-3xl font-light">+</span>
              </div>
              <p className="text-white/40 font-serif">Analyser une nouvelle idée</p>
            </div>
          </div>
        </div>
      </main>
    </MotionConfig>
  );
}
