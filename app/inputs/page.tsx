"use client";

import Link from "next/link";
import { ArrowLeft, Database, FileText, Globe, DollarSign, LayoutTemplate } from "lucide-react";

export default function InputsPage() {
    const inputCategories = [
        {
            title: "1. Identité & Concept",
            icon: <LayoutTemplate size={24} className="text-brand-blue" />,
            fields: [
                { name: "Nom du Projet", desc: "Nom de code ou définitif." },
                { name: "Pitch Court", desc: "Le concept en une phrase (Value Proposition)." },
                { name: "Problème Résolu", desc: "Quel 'Pain Point' adressez-vous ?" },
                { name: "Solution", desc: "Description fonctionnelle du produit/service." }
            ]
        },
        {
            title: "2. Marché & Cible",
            icon: <Globe size={24} className="text-brand-mint" />,
            fields: [
                { name: "Audience Cible (Persona)", desc: "Qui paie ? (Age, Pro, CSP...)" },
                { name: "Zone Géographique", desc: "France, Europe, Monde ?" },
                { name: "Concurrents Connus", desc: "Noms de 2-3 concurrents directs (si connus)." },
                { name: "Mots-clés (Optionnel)", desc: "Termes de recherche associés." }
            ]
        },
        {
            title: "3. Business Model",
            icon: <DollarSign size={24} className="text-brand-coral" />,
            fields: [
                { name: "Sources de Revenus", desc: "Abonnement, Vente unique, Comm..." },
                { name: "Prix Estimé", desc: "Fourchette de prix envisagée." },
                { name: "Coûts Principaux", desc: "Tech, Humain, Logistique..." }
            ]
        },
        {
            title: "4. Ressources & Vision",
            icon: <FileText size={24} className="text-brand-purple" />,
            fields: [
                { name: "Stade Actuel", desc: "Idée, MVP, Pre-Seed..." },
                { name: "Ressources Clés", desc: "Ce que vous avez déjà (Tech, Audience...)." },
                { name: "Ambition à 3 ans", desc: "Objectif de CA ou d'impact." }
            ]
        }
    ];

    return (
        <main className="min-h-screen p-8 md:p-12 max-w-5xl mx-auto relative z-10">

            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-12 group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au Dashboard
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Inputs Requis <span className="text-brand-blue">.</span>
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed font-light max-w-2xl">
                        Pour que nos modèles d'IA génèrent des scores précis, voici les données structurées que nous ingérons.
                        <br />Plus l'input est riche, plus la prédiction financière est fiable.
                    </p>
                </div>
                <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-xl flex items-center gap-4">
                    <Database className="text-brand-blue" />
                    <div>
                        <div className="text-xs text-brand-blue uppercase font-bold tracking-wider">Format Accepté</div>
                        <div className="text-white font-medium">CSV, Notion DB, JSON</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputCategories.map((category, idx) => (
                    <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5 hover:border-white/10 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        </div>

                        <div className="space-y-4">
                            {category.fields.map((field, fIdx) => (
                                <div key={fIdx} className="flex flex-col border-b border-white/5 last:border-0 pb-3 last:pb-0">
                                    <span className="text-white/90 font-medium mb-1">{field.name}</span>
                                    <span className="text-white/50 text-sm">{field.desc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 rounded-xl bg-gradient-to-r from-brand-blue/20 to-brand-purple/20 border border-white/10 text-center">
                <p className="text-white font-medium">
                    💡 Astuce : Vous pouvez connecter votre base Notion existante directement via l'API.
                </p>
            </div>

        </main>
    );
}
