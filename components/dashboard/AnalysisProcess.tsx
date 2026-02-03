"use client";

import { useState } from "react";
import { ValidationTask } from "@/lib/mockData";
import { CheckCircle, Circle, Loader2, Play, ChevronRight, Trophy, Search, Globe, Code, DollarSign, Database } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisProcessProps {
    tasks: ValidationTask[];
    onComplete: (completedTasks: ValidationTask[]) => void;
    onProgress: (currentScore: number) => void;
    isCompleted: boolean;
}

export default function AnalysisProcess({ tasks, onComplete, onProgress, isCompleted }: AnalysisProcessProps) {
    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [isGlobalRunning, setIsGlobalRunning] = useState(false);
    const [runningTaskIds, setRunningTaskIds] = useState<string[]>([]);

    // Simulate result generation based on task type
    const generateMockResult = (taskId: string) => {
        const randomVol = Math.floor(Math.random() * 15000) + 500;
        const randomCompetitors = Math.floor(Math.random() * 8);

        switch (taskId) {
            case 't1': return { label: "Volume estimé", value: `${randomVol}/mois`, highlight: true };
            case 't2': return { label: "Discussions", value: `${Math.floor(Math.random() * 20)} threads`, highlight: true };
            case 't3': return { label: "Concurrents", value: `${randomCompetitors} directs` };
            case 't4': return { label: "Stack", value: "NextJS + Supabase" };
            case 't5': return { label: "Prix conseillé", value: "${9 + Math.floor(Math.random() * 40)}/mois" };
            default: return { label: "Donnée", value: "Validée" };
        }
    };

    const runTask = async (taskId: string) => {
        if (runningTaskIds.includes(taskId)) return;

        setRunningTaskIds(prev => [...prev, taskId]);

        // Update to in_progress
        let tempTasks = currentTasks.map(t => t.id === taskId ? { ...t, status: 'in_progress' as const } : t);
        setCurrentTasks(tempTasks);

        // Simulate Web Search / Processing delay (1.5s - 3s)
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1500));

        // Update to done with result
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

    // Icons Helper
    const getPhaseIcon = (phase: string) => {
        if (phase.includes("Demande")) return <Search size={14} className="text-brand-mint" />;
        if (phase.includes("Concurrence")) return <Globe size={14} className="text-brand-blue" />;
        if (phase.includes("Faisabilité")) return <Code size={14} className="text-brand-purple" />;
        return <DollarSign size={14} className="text-brand-coral" />;
    };

    const phases = Array.from(new Set(currentTasks.map(t => t.phase)));

    return (
        <div className="glass-card p-0 rounded-2xl overflow-hidden border border-white/5">
            {/* Header Panel */}
            <div className="p-6 md:p-8 bg-white/5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-xl font-serif text-white mb-2">Protocole "Flash Validation"</h3>
                    <p className="text-white/50 text-sm">Vérification rapide : Demande, Faisabilité, Monétisation.</p>
                </div>

                {!isCompleted && !isGlobalRunning && (
                    <button
                        onClick={runAllTasks}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/20 transform hover:-translate-y-1"
                    >
                        <Play size={18} fill="currentColor" /> Tout automatiser
                    </button>
                )}
                {isGlobalRunning && (
                    <div className="flex items-center gap-3 px-6 py-3 bg-brand-blue/10 text-brand-blue font-bold rounded-xl border border-brand-blue/20 animate-pulse">
                        <Loader2 size={18} className="animate-spin" /> Auto-Pilot...
                    </div>
                )}
            </div>

            {/* List */}
            <div className="p-6 md:p-8 space-y-8">
                {phases.map((phase) => (
                    <div key={phase}>
                        <h4 className="text-brand-light/60 font-medium text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                            {getPhaseIcon(phase)} {phase}
                        </h4>
                        <div className="space-y-3 pl-4 border-l border-white/5">
                            {currentTasks.filter(t => t.phase === phase).map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    className={`flex items-center gap-4 p-4 rounded-xl border transition-colors ${task.status === 'in_progress' ? 'bg-white/5 border-brand-blue/30' : 'bg-transparent border-white/5 hover:border-white/10'
                                        }`}
                                >
                                    {/* Status Icon */}
                                    <div className="shrink-0">
                                        {task.status === 'done' && <CheckCircle className="text-brand-mint" size={24} />}
                                        {task.status === 'in_progress' && <Loader2 className="text-brand-blue animate-spin" size={24} />}
                                        {task.status === 'todo' && <Circle className="text-white/10" size={24} />}
                                    </div>

                                    {/* Text Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h5 className={`font-bold truncate ${task.status === 'done' ? 'text-white' : 'text-white/60'}`}>
                                                {task.name}
                                            </h5>

                                            {/* Result or Points */}
                                            {task.status === 'done' && task.result ? (
                                                <motion.div
                                                    initial={{ scale: 0.8, opacity: 0 }}
                                                    animate={{ scale: 1, opacity: 1 }}
                                                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border ${task.result.highlight
                                                            ? 'bg-brand-mint/10 text-brand-mint border-brand-mint/20'
                                                            : 'bg-white/5 text-white/50 border-white/10'
                                                        }`}
                                                >
                                                    {task.result.value}
                                                </motion.div>
                                            ) : (
                                                <span className="text-xs font-mono font-bold text-white/30 bg-white/5 px-2 py-1 rounded">
                                                    +{task.points} pts
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-sm text-white/40 truncate">{task.description}</p>
                                    </div>

                                    {/* Manual Action Button */}
                                    {task.status === 'todo' && !isGlobalRunning && (
                                        <button
                                            onClick={() => runTask(task.id)}
                                            className="p-2 hover:bg-white/10 rounded-lg text-brand-blue transition-colors group"
                                            title="Lancer cette vérification"
                                        >
                                            <Search size={18} className="group-hover:scale-110 transition-transform" />
                                        </button>
                                    )}
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
