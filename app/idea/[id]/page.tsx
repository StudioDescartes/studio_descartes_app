"use client";

import { MOCK_IDEAS } from "@/lib/mockData";
import { ArrowLeft, CheckCircle, AlertTriangle, TrendingUp, Zap, Clock, Search, Code, Globe } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import ScoreMatrix from "@/components/dashboard/ScoreMatrix";
import FinancialChart from "@/components/dashboard/FinancialChart";
import AnalysisProcess from "@/components/dashboard/AnalysisProcess";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function IdeaDetail() {
    const params = useParams();
    const [idea, setIdea] = useState<typeof MOCK_IDEAS[0] | undefined>(undefined);

    useEffect(() => {
        if (params?.id) {
            const found = MOCK_IDEAS.find((i) => i.id === params.id);
            setIdea(found);
        }
    }, [params?.id]);

    if (!idea && params?.id) {
        const found = MOCK_IDEAS.find((i) => i.id === params.id);
        if (!found) return notFound();
    }

    // Initial loading state
    if (!idea) return <main className="min-h-screen p-12 bg-brand-dark text-white">Chargement...</main>;

    const handleAnalysisProgress = (currentScore: number) => {
        // Persist to global store for dashboard update
        const currentId = params?.id;
        if (currentId) {
            const original = MOCK_IDEAS.find(i => i.id === currentId);
            if (original) original.score_global = currentScore;
        }

        setIdea(prev => prev ? ({
            ...prev,
            score_global: currentScore
        }) : undefined);
    };

    const handleAnalysisComplete = (completedTasks: any[]) => {
        // Persist to global store
        const currentId = params?.id;
        if (currentId) {
            const original = MOCK_IDEAS.find(i => i.id === currentId);
            if (original) {
                original.status = "scored";
                original.tasks = completedTasks;
                // Mock smart updates based on simulated results
                original.metrics = {
                    ...original.metrics,
                    monthly_searches: "3,400/mo",
                    dev_time_est: "5 jours",
                    competitor_count: "Faible",
                    price_point: "29€/mo"
                };
                // Add dummy score values if they were 0
                if (original.score_global > 0) {
                    original.scores = {
                        demand_market: 8,
                        competitor_gap: 7,
                        nocode_feasibility: 9,
                        monetization_speed: 8
                    };
                }
            }
        }

        setIdea(prev => prev ? ({
            ...prev,
            status: "scored",
            tasks: completedTasks,
            metrics: {
                ...prev.metrics,
                monthly_searches: "3,400/mo",
                dev_time_est: "5 jours",
                competitor_count: "Faible",
                price_point: "29€/mo"
            },
            scores: {
                demand_market: 8,
                competitor_gap: 7,
                nocode_feasibility: 9,
                monetization_speed: 8
            }
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
                                    Verdict "Flash Validation"
                                </h3>

                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="p-4 bg-brand-mint/10 border border-brand-mint/20 rounded-xl">
                                            <h4 className="text-brand-mint font-bold mb-2 flex items-center gap-2">
                                                <Search size={16} /> Demande
                                            </h4>
                                            <p className="text-white text-lg font-bold">{idea.metrics.monthly_searches}</p>
                                            <p className="text-brand-mint/60 text-sm">Via Keyword Planner</p>
                                        </div>
                                        <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl">
                                            <h4 className="text-brand-blue font-bold mb-2 flex items-center gap-2">
                                                <Code size={16} /> Faisabilité
                                            </h4>
                                            <p className="text-white text-lg font-bold">{idea.metrics.dev_time_est}</p>
                                            <p className="text-brand-blue/60 text-sm">Est. Low-Code Stack</p>
                                        </div>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                            <CheckCircle size={16} className="text-brand-mint" /> Points Forts
                                        </h4>
                                        <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                                            <li>Signal de demande fort sur les communautés visées.</li>
                                            <li>Concurrents existants sont souvent "bloated" (trop complexes).</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                            <AlertTriangle size={16} className="text-brand-coral" /> Vigilance
                                        </h4>
                                        <ul className="list-disc list-inside text-white/70 space-y-1 ml-2">
                                            <li>Pricing ({idea.metrics.price_point}) nécessite un volume élevé.</li>
                                        </ul>
                                    </div>

                                    <div className="pt-4 border-t border-white/5">
                                        <h4 className="text-white font-bold mb-2">Recommandation IA</h4>
                                        <p className="text-white/80">
                                            <strong className="text-brand-mint">GO (MVP)</strong> - Lancer une Landing Page de test ce week-end.
                                        </p>
                                    </div>
                                </div>
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
                        <h3 className="text-white/50 font-bold uppercase tracking-widest text-sm mb-4">Score "Indie"</h3>
                        <div className="text-7xl font-serif font-bold text-brand-blue mb-2">
                            {idea.score_global > 0 ? idea.score_global : "?"}
                        </div>
                        <div className="text-brand-blue/60 font-medium mb-6">
                            {isAnalyzed ? "VALIDÉ MICRO-SAAS" : "EN ATTENTE"}
                        </div>

                        {isAnalyzed && (
                            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-left">
                                <div>
                                    <div className="text-xs text-white/40">Volume SEO</div>
                                    <div className="font-bold text-white">{idea.metrics.monthly_searches}</div>
                                </div>
                                <div>
                                    <div className="text-xs text-white/40">Dev Time</div>
                                    <div className="font-bold text-white">{idea.metrics.dev_time_est}</div>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Radar Chart Card */}
                    {isAnalyzed && (
                        <div className="glass-card p-6 rounded-2xl">
                            <h3 className="text-white/60 font-medium mb-4 text-sm text-center">Indie Radar</h3>
                            <ScoreMatrix idea={idea} />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="glass-card p-6 rounded-2xl space-y-3">
                        <button disabled={!isAnalyzed} className="w-full py-3 bg-brand-blue disabled:opacity-50 hover:bg-brand-blue/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/20">
                            Générer Plan d'Action
                        </button>
                    </div>

                </div>

            </div>
        </main>
    );
}
