"use client";

import Link from "next/link";
import { ArrowLeft, ChevronDown, CheckCircle, Target, TrendingUp, Shield, Users } from "lucide-react";
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
            title: "Phase 1 : Market Fit & Volumétrie",
            icon: <Target className="text-brand-mint" />,
            description: "Validation de l'existence d'une demande active et solvable.",
            details: [
                "Analyse SEO : Recherche de volume mensuel sur mots-clés transactionnels.",
                "Qualification du besoin : Identification des 'Pain Points' critiques via analyse sémantique.",
                "Taille du Marché (TAM) : Estimation du marché adressable total et segmentation.",
                "Critère de Score : +30 points si >10k recherches/mois et problème qualifié."
            ]
        },
        {
            id: "phase2",
            title: "Phase 2 : Intelligence Concurrentielle",
            icon: <Shield className="text-brand-purple" />,
            description: "Cartographie des acteurs en place et identification de l'Océan Bleu.",
            details: [
                "Benchmark Outils : Comparaison fonctionnelle des 5 leaders du marché.",
                "Analyse Pricing : Positionnement prix par rapport à la moyenne du secteur.",
                "Facteur Différenciant : Validation d'un avantage injuste (Unfair Advantage).",
                "Critère de Score : +20 points si offre unique identifiée."
            ]
        },
        {
            id: "phase3",
            title: "Phase 3 : Viabilité Financière (Unit Economics)",
            icon: <TrendingUp className="text-brand-coral" />,
            description: "Projection de la rentabilité opérationnelle à 3 ans.",
            details: [
                "CAC vs LTV : Ratio Coût d'Acquisition / Valeur Vie Client (Cible > 3).",
                "Marge Brute : Analyse de la structure de coûts par unité vendue.",
                "Break-even Point : Calcul du délai de retour sur investissement (ROI).",
                "Critère de Score : +30 points si marge nette > 20% à l'année 2."
            ]
        },
        {
            id: "phase4",
            title: "Phase 4 : Fit Studio Descartes",
            icon: <Users className="text-brand-blue" />,
            description: "Cohérence avec la thèse d'investissement et les ressources du Studio.",
            details: [
                "Alignement Mission : Contribution à la démocratisation du savoir.",
                "Ressources Internes : Capacité à délivrer avec l'équipe actuelle.",
                "Synergies : Potentiel de cross-sell avec les autres ventures du Studio.",
                "Critère de Score : +20 points si synergie identifiée."
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
                    Méthodologie de Scoring <span className="text-brand-mint">.</span>
                </h1>
                <p className="text-xl text-white/70 leading-relaxed font-light">
                    Notre algorithme d'évaluation repose sur le protocole <strong className="text-white">"Deep Business Validation"</strong>.
                    Il croise des données de marché temps réel avec des modèles financiers éprouvés pour dérisquer chaque opportunité avant investissement.
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
                <p className="text-white/40 text-sm mb-2">Sources & Standards</p>
                <p className="text-white/60 font-medium">
                    Basé sur les méthodologies <span className="text-white">Lean Startup</span>, <span className="text-white">Blue Ocean Strategy</span> et les critères <span className="text-white">Series A VC</span>.
                </p>
            </div>

        </main>
    );
}
