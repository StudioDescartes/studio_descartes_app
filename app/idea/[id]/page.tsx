"use client";

import { MOCK_IDEAS } from "@/lib/mockData";
import { ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScoreMatrix from "@/components/dashboard/ScoreMatrix";
import FinancialChart from "@/components/dashboard/FinancialChart";
import AnalysisProcess from "@/components/dashboard/AnalysisProcess";
import { motion } from "framer-motion";
import { useState } from "react";

export default function IdeaDetail({ params }: { params: { id: string } }) {
    const originalIdea = MOCK_IDEAS.find((i) => i.id === params.id);
    const [idea, setIdea] = useState(originalIdea);

    if (!idea) {
        return notFound();
    }

    const handleAnalysisProgress = (currentScore: number) => {
        // Persist to global store for dashboard update
        if (originalIdea) {
            originalIdea.score_global = currentScore;
        }
        setIdea(prev => prev ? ({
            ...prev,
            score_global: currentScore
        }) : undefined);
    };

    const handleAnalysisComplete = (completedTasks: any[]) => {
        // Persist to global store
        if (originalIdea) {
            originalIdea.status = "scored";
            originalIdea.tasks = completedTasks;
            originalIdea.metrics = { ...originalIdea.metrics, tam: "15M€", ca_potentiel: "80K€", breakeven: "12m" };
        }

        setIdea(prev => prev ? ({
            ...prev,
            status: "scored",
            tasks: completedTasks,
            // Mock updating metrics after analysis
            metrics: { ...prev.metrics, tam: "15M€", ca_potentiel: "80K€", breakeven: "12m" }
        }) : undefined);
    };

    const isAnalyzed = idea.status !== 'pending';

    return (
        <main className="min-h-screen p-8 md:p-12 max-w-7xl mx-auto relative z-10">

            {/* Navigation */}
            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-8 group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au Dashboard
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column: Analysis & Text */}
                <div className="lg:col-span-2 space-y-8">

                    {/* Header */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <span className="px-3 py-1 bg-brand-blue/20 text-brand-blue border border-brand-blue/20 rounded-full text-xs font-bold uppercase tracking-wider">
                                {idea.tags[0]} Analysis
                            </span>
                            {isAnalyzed && <span className="text-white/40 text-sm">Validé par l'IA le 03/02/2025</span>}
                        </div>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{idea.nom}</h1>
                        <p className="text-xl text-white/70 leading-relaxed font-light border-l-4 border-brand-blue pl-6">
                            {idea.concept}
                        </p>
                    </div>

                    {/* ACTION CENTER: Analysis Workflow */}
                    <AnalysisProcess
                        tasks={idea.tasks}
                        isCompleted={isAnalyzed}
                        onComplete={handleAnalysisComplete}
                        onProgress={handleAnalysisProgress}
                    />

                    {/* Results (Only show if analyzed) */}
                    {isAnalyzed && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="space-y-8"
                        >
                            {/* AI Insights */}
                            <div className="glass-card p-8 rounded-2xl">
                                <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
                                    <Zap size={20} className="text-brand-purple" />
                                    Résultats de l'Analyse
                                </h3>

                                <div className="space-y-6">
                                    <div>
                                        <h4 className="text-brand-mint font-bold mb-2 flex items-center gap-2">
                                            <CheckCircle size={16} /> Points Forts Identifiés
                                        </h4>
                                        <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                                            <li>Alignement parfait avec la mission éducative du studio.</li>
                                            <li>Marché de niche mais profondeur de demande (TAM {idea.metrics.tam}).</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-brand-coral font-bold mb-2 flex items-center gap-2">
                                            <AlertTriangle size={16} /> Risques & Vigilance
                                        </h4>
                                        <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                                            <li>Concurrents directs identifiés : 3 majeurs.</li>
                                            <li>Cycle de vente B2B potentiellement long (&gt;3 mois).</li>
                                        </ul>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <h4 className="text-white font-bold mb-2">Recommandation IA</h4>
                                        <p className="text-white/80">
                                            <strong className="text-brand-mint">GO (Conditionnel)</strong> - Lancer un MVP sur 3 mois.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Financial Projections */}
                            <div className="glass-card p-8 rounded-2xl">
                                <h3 className="text-xl font-serif text-white mb-6 flex items-center gap-2">
                                    <TrendingUp size={20} className="text-brand-mint" />
                                    Trajectoire Financière
                                </h3>
                                <FinancialChart />
                            </div>
                        </motion.div>
                    )}

                </div>

                {/* Right Column: Score Card & Metrics */}
                <div className="space-y-6">

                    {/* Global Score Card (Blurred if pending) */}
                    <motion.div
                        animate={{ filter: isAnalyzed ? "blur(0px)" : "blur(5px)", opacity: isAnalyzed ? 1 : 0.5 }}
                        className="glass-card p-8 rounded-2xl text-center relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-blue via-brand-purple to-brand-mint"></div>
                        <h3 className="text-white/50 font-bold uppercase tracking-widest text-sm mb-4">Score Global</h3>
                        <div className="text-7xl font-serif font-bold text-brand-blue mb-2">
                            {idea.score_global > 0 ? idea.score_global : "?"}
                        </div>
                        <div className="text-brand-blue/60 font-medium mb-6">
                            {isAnalyzed ? "EXCELLENT POTENTIEL" : "EN ATTENTE"}
                        </div>

                        {isAnalyzed && (
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-left">
                                <div>
                                    <div className="text-xs text-white/40">Break-even</div>
                                    <div className="font-bold text-white">{idea.metrics.breakeven}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40">Investissement</div>
                                    <div className="font-bold text-white">{idea.metrics.investment}</div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Radar Chart Card */}
                    {isAnalyzed && (
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="text-white/60 font-medium mb-4 text-sm text-center">Répartition des Scores</h3>
                            <ScoreMatrix idea={idea} />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="glass-card p-6 rounded-2xl space-y-3">
                        <button disabled={!isAnalyzed} className="w-full py-3 bg-brand-blue disabled:opacity-50 hover:bg-brand-blue/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/20">
                            Générer Pitch Deck
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
}
