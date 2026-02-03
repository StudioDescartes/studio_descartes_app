"use client";

import Link from "next/link";
import { ArrowLeft, Database, FileText, Globe, DollarSign, LayoutTemplate, Send, Loader2, CheckCircle } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InputsPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        // Simulate API call / AI Processing start
        await new Promise(resolve => setTimeout(resolve, 2000));

        setIsSubmitting(false);
        setIsSuccess(true);

        // Optional: Redirect after success
        // setTimeout(() => router.push('/'), 1500);
    };

    const inputCategories = [
        {
            title: "1. Identité & Concept",
            icon: <LayoutTemplate size={24} className="text-brand-blue" />,
            fields: [
                { name: "Nom du Projet", key: "nom", placeholder: "Ex: Super App", type: "text" },
                { name: "Pitch Court", key: "pitch", placeholder: "Le Uber de la Philo...", type: "textarea" },
                { name: "Problème Résolu", key: "problem", placeholder: "Les gens s'ennuient...", type: "textarea" },
                { name: "Solution", key: "solution", placeholder: "Une app qui gamifie...", type: "textarea" }
            ]
        },
        {
            title: "2. Marché & Cible",
            icon: <Globe size={24} className="text-brand-mint" />,
            fields: [
                { name: "Audience Cible", key: "target", placeholder: "Étudiants, RH...", type: "text" },
                { name: "Zone Géographique", key: "geo", placeholder: "France, Europe...", type: "text" },
                { name: "Concurrents Connus", key: "competitors", placeholder: "Concurrent A, B...", type: "text" },
                { name: "Mots-clés SEO", key: "keywords", placeholder: "Philosophie, Cours...", type: "text" }
            ]
        },
        {
            title: "3. Business Model",
            icon: <DollarSign size={24} className="text-brand-coral" />,
            fields: [
                { name: "Sources de Revenus", key: "revenue", placeholder: "Abonnement 9€/mois...", type: "text" },
                { name: "Prix Estimé", key: "price", placeholder: "10-20€", type: "text" },
                { name: "Coûts Principaux", key: "costs", placeholder: "Serveurs, Marketing...", type: "text" }
            ]
        },
        {
            title: "4. Ressources & Vision",
            icon: <FileText size={24} className="text-brand-purple" />,
            fields: [
                { name: "Stade Actuel", key: "stage", placeholder: "Concept, MVP...", type: "text" },
                { name: "Ressources Clés", key: "assets", placeholder: "Réseau, Tech...", type: "text" },
                { name: "Ambition à 3 ans", key: "ambition", placeholder: "1M€ ARR...", type: "text" }
            ]
        }
    ];

    if (isSuccess) {
        return (
            <main className="min-h-screen flex items-center justify-center p-8 bg-brand-dark">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-card p-12 rounded-3xl text-center max-w-lg w-full border border-brand-mint/20"
                >
                    <div className="w-20 h-20 bg-brand-mint/10 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} className="text-brand-mint" />
                    </div>
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">Données Reçues</h2>
                    <p className="text-white/60 mb-8">
                        L'IA "Studio Descartes" analyse vos inputs. <br />
                        Génération du scoring et du protocole de validation en cours...
                    </p>
                    <Link
                        href="/"
                        className="inline-block w-full py-4 bg-brand-mint text-brand-dark font-bold rounded-xl hover:bg-brand-mint/90 transition-colors"
                    >
                        Retour au Dashboard
                    </Link>
                </motion.div>
            </main>
        )
    }

    return (
        <main className="min-h-screen p-8 md:p-12 max-w-5xl mx-auto relative z-10">

            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-12 group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au Dashboard
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Saisie Manuelle <span className="text-brand-blue">.</span>
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed font-light max-w-2xl">
                        Remplissez les champs ci-dessous pour initialiser une nouvelle analyse.
                        <br />L'IA utilisera ces données comme base pour le scraping et le scoring.
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`
                flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all shadow-xl
                ${isSubmitting ? 'bg-white/10 text-white/50 cursor-wait' : 'bg-brand-blue text-white hover:bg-brand-blue/90 hover:-translate-y-1 shadow-brand-blue/20'}
            `}
                >
                    {isSubmitting ? (
                        <> <Loader2 className="animate-spin" /> Traitement IA... </>
                    ) : (
                        <> <Send size={20} /> Générer l'Analyse </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inputCategories.map((category, idx) => (
                    <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5">
                        <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                            <div className="p-3 bg-white/5 rounded-lg border border-white/5">
                                {category.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white">{category.title}</h3>
                        </div>

                        <div className="space-y-6">
                            {category.fields.map((field, fIdx) => (
                                <div key={fIdx} className="space-y-2">
                                    <label className="text-sm font-bold text-white/80 uppercase tracking-wide ml-1">
                                        {field.name}
                                    </label>
                                    {field.type === 'textarea' ? (
                                        <textarea
                                            placeholder={field.placeholder}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/50 focus:bg-black/40 transition-all min-h-[100px] resize-none"
                                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            placeholder={field.placeholder}
                                            className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/50 focus:bg-black/40 transition-all"
                                            onChange={(e) => handleInputChange(field.key, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </main>
    );
}
