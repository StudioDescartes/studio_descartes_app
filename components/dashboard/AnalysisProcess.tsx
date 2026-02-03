"use client";

import { useState } from "react";
import { ValidationTask } from "@/lib/mockData";
import { CheckCircle, Circle, Loader2, Play, ChevronRight, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface AnalysisProcessProps {
    tasks: ValidationTask[];
    onComplete: (completedTasks: ValidationTask[]) => void;
    onProgress: (currentScore: number) => void;
    isCompleted: boolean;
}

export default function AnalysisProcess({ tasks, onComplete, onProgress, isCompleted }: AnalysisProcessProps) {
    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [isRunning, setIsRunning] = useState(false);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    const startAnalysis = async () => {
        setIsRunning(true);
        let tempTasks = [...currentTasks];

        // Simulate sequential task completion
        for (let i = 0; i < tempTasks.length; i++) {
            if (tempTasks[i].status === 'done') continue;

            setActiveTaskId(tempTasks[i].id);

            // Set to in_progress
            const newTasksStart = tempTasks.map((t, idx) => idx === i ? { ...t, status: 'in_progress' } : t) as ValidationTask[];
            setCurrentTasks(newTasksStart);

            // Wait (simulate AI work with variable time)
            await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 1000));

            // Set to done
            const newTasksEnd = tempTasks.map((t, idx) => idx === i ? { ...t, status: 'done' } : t) as ValidationTask[];
            setCurrentTasks(newTasksEnd);
            tempTasks = newTasksEnd; // Update reference for next loop

            // Notify parent of incremental score
            const currentScore = tempTasks.reduce((acc, t) => t.status === 'done' ? acc + t.points : acc, 0);
            onProgress(currentScore);
        }

        setActiveTaskId(null);
        setIsRunning(false);
        onComplete(tempTasks);
    };

    // Group tasks by Phase
    const phases = Array.from(new Set(currentTasks.map(t => t.phase)));

    return (
        <div className="glass-card p-0 rounded-2xl overflow-hidden border border-white/5">
            {/* Header Panel */}
            <div className="p-6 md:p-8 bg-white/5 border-b border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h3 className="text-xl font-serif text-white mb-2">Protocole de Validation Studio Descartes</h3>
                    <p className="text-white/50 text-sm">Processus standardisé en 5 phases pour valider la viabilité business.</p>
                </div>

                {!isCompleted && !isRunning && (
                    <button
                        onClick={startAnalysis}
                        className="flex items-center gap-2 px-6 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/20 transform hover:-translate-y-1"
                    >
                        <Play size={18} fill="currentColor" /> Lancer le Protocole
                    </button>
                )}
                {isRunning && (
                    <div className="flex items-center gap-3 px-6 py-3 bg-brand-blue/10 text-brand-blue font-bold rounded-xl border border-brand-blue/20 animate-pulse">
                        <Loader2 size={18} className="animate-spin" /> Analyse IA en cours...
                    </div>
                )}
                {isCompleted && (
                    <div className="flex items-center gap-3 px-6 py-3 bg-brand-mint/10 text-brand-mint font-bold rounded-xl border border-brand-mint/20">
                        <Trophy size={18} /> Protocol Validé
                    </div>
                )}
            </div>

            {/* Tasks List */}
            <div className="p-6 md:p-8 space-y-8">
                {phases.map((phase) => (
                    <div key={phase}>
                        <h4 className="text-brand-light/60 font-medium text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
                            <ChevronRight size={12} /> {phase}
                        </h4>
                        <div className="space-y-3 pl-4 border-l border-white/5">
                            {currentTasks.filter(t => t.phase === phase).map((task) => (
                                <motion.div
                                    key={task.id}
                                    layout
                                    initial={false}
                                    animate={{
                                        backgroundColor: activeTaskId === task.id ? "rgba(97, 130, 244, 0.1)" : "rgba(255,255,255,0.02)",
                                        borderColor: activeTaskId === task.id ? "rgba(97, 130, 244, 0.3)" : "rgba(255,255,255,0.05)"
                                    }}
                                    className="flex items-center gap-4 p-4 rounded-xl border transition-colors"
                                >
                                    <div className="shrink-0">
                                        {task.status === 'done' && <CheckCircle className="text-brand-mint" size={24} />}
                                        {task.status === 'in_progress' && <Loader2 className="text-brand-blue animate-spin" size={24} />}
                                        {task.status === 'todo' && <Circle className="text-white/10" size={24} />}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-center mb-1">
                                            <h5 className={`font-bold truncate ${task.status === 'done' ? 'text-white' : 'text-white/60'}`}>
                                                {task.name}
                                            </h5>
                                            <span className="text-xs font-mono font-bold text-white/30 bg-white/5 px-2 py-1 rounded">
                                                +{task.points} pts
                                            </span>
                                        </div>
                                        <p className="text-sm text-white/40 truncate">{task.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
