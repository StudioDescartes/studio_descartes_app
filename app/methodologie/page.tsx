"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, CheckCircle, Target, Zap, Shield, Rocket } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MethodologyPage() {
    const [openSection, setOpenSection] = useState<string | null>("phase1");

    const toggleSection = (id: string) => {
        setOpenSection(openSection === id ? null : id);
    };

    const phases = [
        {
            id: "phase1",
            title: "Phase 1 : Demande & Distribution",
            icon: <Target className="text-brand-mint" />,
            description: "Est-ce que les gens cherchent déjà une solution ?",
            details: [
                "Volume SEO : Y a-t-il au moins 1000 recherches/mois surv Google ?",
                "Communautés : Scan de Reddit/Facebook pour trouver des plaintes récurrentes.",
                "Viralité : Potentiel de croissance organique (TikTok/Twitter) sans ads payantes.",
                "Critère : +30 points si audience active identifiée."
            ]
        },
        {
            id: "phase2",
            title: "Phase 2 : Analyse 'Bloat' (Concurrence)",
            icon: <Shield className="text-brand-purple" />,
            description: "Les concurrents sont-ils trop complexes ou chers ?",
            details: [
                "Bloat Score : Les concurrents actuels sont-ils des 'usines à gaz' ?",
                "Indie Advantage : Peut-on faire plus simple, moins cher et plus rapide ?",
                "Niche : Est-ce un segment ignoré par les gros acteurs ?",
                "Critère : +20 points si opportunité de simplification (Unbundling)."
            ]
        },
        {
            id: "phase3",
            title: "Phase 3 : Faisabilité No-Code",
            icon: <Zap className="text-brand-blue" />,
            description: "Peut-on livrer un MVP en moins de 2 semaines ?",
            details: [
                "Tech Stack : Faisable avec Bubble, Make ou Next.js starter ?",
                "Complexité : Éviter l'IA lourde ou le Hardware au début.",
                "Time-to-Market : L'objectif est de tester l'idée ce week-end.",
                "Critère : +30 points si dev estimé < 5 jours."
            ]
        },
        {
            id: "phase4",
            title: "Phase 4 : L'ADN Studio Descartes",
            icon: <Rocket className="text-brand-coral" />,
            description: "Est-ce aligné avec notre unfair advantage (Paris/Culture/Tech) ?",
            details: [
                "Ancrage Culturel : Le produit a-t-il une 'French Touch' ou une profondeur intellectuelle ? (ex: Philo, Droit).",
                "Spécificité Locale : On évite le 'Generic English SaaS'. On vise des niches francophones mal servies.",
                "Zéro Logistique : Pas de stock, pas d'envois postaux. 100% Digital.",
                "Critère : +20 points si match parfait avec notre expertise."
            ]
        }
    ];

    return (
        <main className="min-h-screen p-8 md:p-12 max-w-4xl mx-auto relative z-10">

            {/* Navigation */}
            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-12 group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au Dashboard
            </Link>

            {/* Header */}
            <div className="mb-16">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                    Méthodologie "Indie" <span className="text-brand-mint">.</span>
                </h1>
                <p className="text-xl text-white/70 leading-relaxed font-light">
                    Oubliez les Business Plans de 50 pages. Notre protocole <strong className="text-white">"Flash Validation"</strong> est conçu pour identifier les micro-business rentables, rapides à lancer et peu coûteux.
                </p>
            </div>

            {/* Accordion Sections */}
            <div className="space-y-4">
                {phases.map((phase) => (
                    <div key={phase.id} className="glass-card rounded-2xl overflow-hidden border border-white/5 transition-all duration-300 hover:border-white/10">
                        <button
                            onClick={() => toggleSection(phase.id)}
                            className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                        >
                            <div className="flex items-center gap-6">
                                <div className={`p-4 rounded-xl bg-white/5 ${openSection === phase.id ? 'bg-white/10 shadow-lg' : ''}`}>
                                    {phase.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-1">{phase.title}</h3>
                                    <p className="text-white/50 text-sm hidden md:block">{phase.description}</p>
                                </div>
                            </div>
                            <ChevronDown
                                className={`text-white/40 transition-transform duration-300 ${openSection === phase.id ? 'rotate-180' : ''}`}
                            />
                        </button>

                        <AnimatePresence>
                            {openSection === phase.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="px-8 pb-8 md:pl-28"
                                >
                                    <ul className="space-y-3 pt-4 border-t border-white/5">
                                        {phase.details.map((detail, idx) => (
                                            <li key={idx} className="flex items-start gap-3 text-white/70 leading-relaxed relative">
                                                <CheckCircle size={18} className="text-brand-mint shrink-0 mt-1" />
                                                <span>{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                ))}
            </div>

            {/* Trust Footer */}
            <div className="mt-16 text-center p-8 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-white/40 text-sm mb-2">Inspiration</p>
                <p className="text-white/60 font-medium">
                    Basé sur les standards <span className="text-white">Indie Hackers</span>, <span className="text-white">Micro-SaaS HQ</span> et l'approche <span className="text-white">"Build in Public"</span>.
                </p>
            </div>

        </main>
    );
}
