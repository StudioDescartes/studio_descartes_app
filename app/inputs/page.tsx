"use client";

import Link from "next/link";
import { ArrowLeft, Database, FileText, Globe, DollarSign, LayoutTemplate, Send, Loader2, CheckCircle, UploadCloud, FileSpreadsheet } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function InputsPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState<Record<string, string>>({});

    const handleInputChange = (key: string, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setIsSuccess(true);
    };

    const inputCategories = [
        {
            title: "1. Identité & Concept",
            icon: <LayoutTemplate size={24} className="text-brand-blue" />,
            fields: [
                { name: "Nom du Projet", key: "nom", placeholder: "Ex: Super App", type: "text" },
                { name: "Pitch Court", key: "pitch", placeholder: "Décrivez le concept en 2-3 phrases...", type: "textarea", rows: 3 },
                { name: "Problème Résolu", key: "problem", placeholder: "Quel est le 'Pain Point' majeur ? Racontez une histoire...", type: "textarea", rows: 4 },
                { name: "Solution Détaillée", key: "solution", placeholder: "Comment ça marche concrètement ? Fonctionnalités clés...", type: "textarea", rows: 4 }
            ]
        },
        {
            title: "2. Marché & Cible",
            icon: <Globe size={24} className="text-brand-mint" />,
            fields: [
                { name: "Audience Cible (Persona)", key: "target", placeholder: "Qui sont vos clients ? (Age, Profession, Besoins...)", type: "textarea", rows: 3 },
                { name: "Zone Géographique", key: "geo", placeholder: "France, Europe, Monde...", type: "text" },
                { name: "Concurrents Connus", key: "competitors", placeholder: "Listez vos concurrents directs et indirects...", type: "textarea", rows: 3 },
                { name: "Mots-clés SEO", key: "keywords", placeholder: "Mots-clés sur lesquels vous voulez être trouvé...", type: "text" }
            ]
        },
        {
            title: "3. Business Model",
            icon: <DollarSign size={24} className="text-brand-coral" />,
            fields: [
                { name: "Stratégie de Revenus", key: "revenue", placeholder: "Abonnement, Vente unique, Commission ? Détaillez le pricing...", type: "textarea", rows: 3 },
                { name: "Structure de Coûts", key: "costs", placeholder: "Quels sont vos plus gros postes de dépenses ?", type: "textarea", rows: 3 }
            ]
        },
        {
            title: "4. Ressources & Vision",
            icon: <FileText size={24} className="text-brand-purple" />,
            fields: [
                { name: "Stade Actuel", key: "stage", placeholder: "Juste une idée ? MVP prêt ? Premiers clients ?", type: "text" },
                { name: "Vision à 3 ans", key: "ambition", placeholder: "Où voyez-vous le projet dans 3 ans ? (CA, Impact...)", type: "textarea", rows: 3 }
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
                    <h2 className="text-3xl font-serif font-bold text-white mb-4">Dossier Transmis</h2>
                    <p className="text-white/60 mb-8">
                        L'IA "Studio Descartes" ingère vos données financières et textuelles.<br />
                        Le scoring sera mis à jour dans quelques instants.
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
        <main className="min-h-screen p-8 md:p-12 max-w-6xl mx-auto relative z-10">

            <Link href="/" className="inline-flex items-center text-white/40 hover:text-white transition-colors mb-12 group">
                <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" />
                Retour au Dashboard
            </Link>

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">
                        Saisie & Documents <span className="text-brand-blue">.</span>
                    </h1>
                    <p className="text-xl text-white/70 leading-relaxed font-light max-w-2xl">
                        Remplissez les champs textuels et importez vos tableaux financiers pour une analyse précise à 360°.
                    </p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`
                flex items-center gap-3 px-8 py-4 rounded-xl font-bold transition-all shadow-xl z-50
                ${isSubmitting ? 'bg-white/10 text-white/50 cursor-wait' : 'bg-brand-blue text-white hover:bg-brand-blue/90 hover:-translate-y-1 shadow-brand-blue/20'}
            `}
                >
                    {isSubmitting ? (
                        <> <Loader2 className="animate-spin" /> Traitement IA... </>
                    ) : (
                        <> <Send size={20} /> Lancer l'Analyse Complète </>
                    )}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Left Column: Text Inputs */}
                <div className="space-y-8">
                    {inputCategories.map((category, idx) => (
                        <div key={idx} className="glass-card p-8 rounded-2xl border border-white/5">
                            <div className="flex items-center gap-4 mb-6 border-b border-white/5 pb-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/5 text-brand-light">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-white">{category.title}</h3>
                            </div>

                            <div className="space-y-6">
                                {category.fields.map((field: any, fIdx) => (
                                    <div key={fIdx} className="space-y-2">
                                        <label className="text-sm font-bold text-white/80 uppercase tracking-wide ml-1">
                                            {field.name}
                                        </label>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                placeholder={field.placeholder}
                                                rows={field.rows || 3}
                                                className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-white placeholder-white/20 focus:outline-none focus:border-brand-blue/50 focus:bg-black/40 transition-all resize-y"
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

                {/* Right Column: Financial Uploads */}
                <div className="lg:sticky lg:top-8 h-fit space-y-8">

                    {/* Financials Upload Box */}
                    <div className="glass-card p-8 rounded-2xl border border-brand-mint/20 bg-brand-mint/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-32 bg-brand-mint/10 blur-[100px] rounded-full pointer-events-none"></div>

                        <div className="flex items-center gap-4 mb-6 relative z-10">
                            <div className="p-3 bg-brand-mint/20 rounded-lg text-brand-mint">
                                <FileSpreadsheet size={24} />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">5. Projections Financières</h3>
                                <p className="text-brand-mint/80 text-sm">Vital pour le scoring de rentabilité</p>
                            </div>
                        </div>

                        <div className="space-y-6 relative z-10">
                            <p className="text-white/70 text-sm leading-relaxed">
                                Pour valider la viabilité économique, l'IA a besoin de vos tableaux prévisionnels. Importez ici vos fichiers CSV ou Excel.
                            </p>

                            <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-3">
                                <h4 className="text-white font-bold text-sm">Fichiers attendus :</h4>
                                <ul className="space-y-2">
                                    <li className="flex items-center gap-2 text-white/60 text-sm">
                                        <CheckCircle size={14} className="text-brand-mint" /> Compte de Résultat (P&L) prévisionnel
                                    </li>
                                    <li className="flex items-center gap-2 text-white/60 text-sm">
                                        <CheckCircle size={14} className="text-brand-mint" /> Plan de Trésorerie (Cashflow)
                                    </li>
                                    <li className="flex items-center gap-2 text-white/60 text-sm">
                                        <CheckCircle size={14} className="text-brand-mint" /> Historique des ventes (si existant)
                                    </li>
                                </ul>
                            </div>

                            {/* Upload Zone */}
                            <div className="border-2 border-dashed border-white/20 hover:border-brand-mint/50 hover:bg-brand-mint/5 transition-all rounded-xl p-8 text-center cursor-pointer group-hover:shadow-lg">
                                <UploadCloud size={40} className="mx-auto text-white/30 group-hover:text-brand-mint mb-4 transition-colors" />
                                <p className="text-white font-medium mb-1">Glissez-déposez vos fichiers CSV</p>
                                <p className="text-white/40 text-sm">ou cliquez pour parcourir</p>
                            </div>
                        </div>
                    </div>

                    {/* AI Context Helper */}
                    <div className="glass-card p-6 rounded-2xl border border-white/5">
                        <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                            <Loader2 size={16} className="text-brand-blue" />
                            Comment l'IA analyse ces fichiers ?
                        </h4>
                        <p className="text-white/60 text-sm leading-relaxed">
                            Notre algorithme croise vos projections avec les multiples de marché actuels (EBITDA, Revenue) pour estimer une valorisation réaliste et détecter les incohérences de trésorerie.
                        </p>
                    </div>

                </div>

            </div>

        </main>
    );
}
