"use client";

import { useState } from "react";
import { ValidationTask } from "@/lib/mockData";
import { CheckCircle, Circle, Loader2, Play, ChevronDown, Check, FileText, Globe, Cpu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisProcessProps {
    tasks: ValidationTask[];
    onComplete: (completedTasks: ValidationTask[]) => void;
    onProgress: (currentScore: number) => void;
    isCompleted: boolean;
}

export default function AnalysisProcess({ tasks, onComplete, onProgress, isCompleted }: AnalysisProcessProps) {
    const [runningTaskIds, setRunningTaskIds] = useState<string[]>([]);
    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [isGlobalRunning, setIsGlobalRunning] = useState(false);
    const [expandedTask, setExpandedTask] = useState<string | null>(null);

    const toggleDetails = (id: string) => setExpandedTask(prev => prev === id ? null : id);

    const runTask = async (taskId: string) => {
        if (runningTaskIds.includes(taskId)) return;

        setRunningTaskIds(prev => [...prev, taskId]);

        // Update to in_progress
        let tempTasks = currentTasks.map(t => t.id === taskId ? { ...t, status: 'in_progress' as const } : t);
        setCurrentTasks(tempTasks);

        // Simulate Web Search / Processing delay (1.5s - 3s)
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

        // Update to done with result
        const generateMockResult = (taskId: string) => {
            const randomVol = Math.floor(Math.random() * 15000) + 500;

            const makeSources = (type: string) => [
                { id: "s1", title: `Rapport Xerfi - Marché ${type}`, type: "pdf" as const },
                { id: "s2", title: "Google Trends (12 mois)", url: "https://trends.google.com", type: "web" as const },
                { id: "s3", title: "Analyse Concurrentielle (Agent)", type: "calculation" as const }
            ];

            switch (taskId) {
                case 't1': return {
                    label: "Volume estimé",
                    value: `${randomVol}/mois`,
                    highlight: true,
                    sources: makeSources("Culture/Loisirs"),
                    reasoning: "Croisement des volumes de recherche 'Sortie Paris' avec le taux de conversion moyen du secteur événementiel (2%)."
                };
                case 't2': return {
                    label: "Discussions",
                    value: `${Math.floor(Math.random() * 20)} threads`,
                    highlight: true,
                    sources: [{ id: "r1", title: "Reddit r/Paris", url: "https://reddit.com/r/france", type: "web" as const }],
                    reasoning: "Détection de mots-clés sémantiques 'Où sortir ce soir' et 'Rencontre intellectuelle' sur les 30 derniers jours."
                };
                case 't3': return { label: "Viral-Score", value: `${Math.floor(Math.random() * 10)}/10`, reasoning: "Analyse de la courbe de partage de concepts similaires sur TikTok." };
                case 't4': return { label: "Bloat Score", value: "High", reasoning: "Les concurrents (MK2, Gaumont) ont des frais de structure élevés qui ne leur permettent pas cette agilité." };
                case 't5': return { label: "Logistique", value: "Complexe", reasoning: "Nécessite de bloquer une salle et de gérer la billetterie physique." };
                case 't6': return {
                    label: "Fit Paris",
                    value: "100%",
                    sources: [{ id: "d1", title: "Base Élèves Sorbonne", type: "pdf" as const }],
                    reasoning: "Correspondance parfaite avec la démographie du Quartier Latin (étudiants + CSP+)."
                };
                default: return { label: "Donnée", value: "Validée" };
            }
        };
        const result = generateMockResult(taskId);
        tempTasks = tempTasks.map(t => t.id === taskId ? { ...t, status: 'done' as const, result } : t);
        setCurrentTasks(tempTasks);
        setRunningTaskIds(prev => prev.filter(id => id !== taskId));

        // Notify Progress
        const score = tempTasks.reduce((acc, t) => t.status === 'done' ? acc + t.points : acc, 0);
        onProgress(score);

        // Check completion
        if (tempTasks.every(t => t.status === 'done')) {
            onComplete(tempTasks);
        }
    };

    const runAllTasks = async () => {
        setIsGlobalRunning(true);
        for (const task of currentTasks) {
            if (task.status !== 'done') {
                await runTask(task.id);
            }
        }
        setIsGlobalRunning(false);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-serif text-white flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
                    Protocole d'Analyse (Live)
                </h3>
                {!isGlobalRunning && !isCompleted && (
                    <button onClick={runAllTasks} className="text-sm text-brand-blue hover:text-white transition-colors underline">
                        Tout lancer
                    </button>
                )}
            </div>

            <div className="space-y-3">
                {currentTasks.map((task) => (
                    <div key={task.id} className="relative group">
                        {/* Main Task Row */}
                        <div className={`
                            relative z-10 p-4 rounded-xl border transition-all duration-300
                            ${task.status === 'done'
                                ? 'bg-brand-blue/10 border-brand-blue/30'
                                : task.status === 'in_progress'
                                    ? 'bg-white/5 border-white/20'
                                    : 'bg-black/20 border-white/5 hover:border-white/10'
                            }
                        `}>
                            <div className="flex items-center justify-between gap-4">
                                <div className="flex items-center gap-4 flex-1">
                                    <div className={`
                                        w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors
                                        ${task.status === 'done' ? 'bg-brand-blue text-white' : 'bg-white/10 text-white/30'}
                                    `}>
                                        {task.status === 'done' ? <Check size={16} /> :
                                            task.status === 'in_progress' ? <Loader2 size={16} className="animate-spin" /> :
                                                <span className="text-xs font-mono">{task.id.replace('t', '')}</span>}
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h4 className={`font-medium ${task.status === 'done' ? 'text-white' : 'text-white/60'}`}>
                                                {task.name}
                                            </h4>
                                            <span className="text-xs text-white/30 font-mono px-2 py-0.5 rounded-full bg-white/5">
                                                {task.phase.split(':')[0]}
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/40">{task.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    {task.status === 'done' && task.result && (
                                        <div className="text-right">
                                            <div className="text-xs text-brand-mint uppercase tracking-wider font-bold mb-0.5">
                                                {task.result.label}
                                            </div>
                                            <div className="text-white font-bold font-mono">
                                                {task.result.value}
                                            </div>
                                        </div>
                                    )}

                                    {task.status === 'todo' && (
                                        <button
                                            onClick={() => runTask(task.id)}
                                            disabled={isGlobalRunning}
                                            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                                            title="Lancer cette analyse"
                                        >
                                            <Play size={16} />
                                        </button>
                                    )}

                                    {task.status === 'done' && (
                                        <button
                                            onClick={() => toggleDetails(task.id)}
                                            className={`p-1 rounded hover:bg-white/10 transition-colors ${expandedTask === task.id ? 'text-white' : 'text-white/30'}`}
                                        >
                                            <ChevronDown size={16} className={`transition-transform ${expandedTask === task.id ? 'rotate-180' : ''}`} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Collapsible Details (Provenance) */}
                        <div className={`
                            pl-16 pr-4 overflow-hidden transition-all duration-300 ease-in-out
                            ${expandedTask === task.id ? 'max-h-96 opacity-100 py-4' : 'max-h-0 opacity-0'}
                        `}>
                            <div className="p-4 rounded-lg bg-black/40 border border-white/5 space-y-4 text-sm">
                                {task.result?.reasoning && (
                                    <div className="flex gap-3">
                                        <Cpu size={14} className="text-brand-purple shrink-0 mt-1" />
                                        <div>
                                            <span className="text-brand-purple font-bold block mb-1">Logique de calcul</span>
                                            <p className="text-white/70 leading-relaxed">{task.result.reasoning}</p>
                                        </div>
                                    </div>
                                )}

                                {task.result?.sources && task.result.sources.length > 0 && (
                                    <div className="flex gap-3">
                                        <Globe size={14} className="text-brand-blue shrink-0 mt-1" />
                                        <div className="w-full">
                                            <span className="text-brand-blue font-bold block mb-2">Sources Vérifiées</span>
                                            <div className="grid grid-cols-1 gap-2">
                                                {task.result.sources.map(source => (
                                                    <div key={source.id} className="flex items-center justify-between p-2 rounded bg-white/5 hover:bg-white/10 transition-colors cursor-pointer group/source">
                                                        <div className="flex items-center gap-2">
                                                            {source.type === 'pdf' ? <FileText size={12} className="text-white/40" /> : <Globe size={12} className="text-white/40" />}
                                                            <span className="text-white/80 group-hover/source:text-white transition-colors">{source.title}</span>
                                                        </div>
                                                        <span className="text-[10px] text-brand-mint/50 border border-brand-mint/20 px-1.5 py-0.5 rounded">VÉRIFIÉ</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
