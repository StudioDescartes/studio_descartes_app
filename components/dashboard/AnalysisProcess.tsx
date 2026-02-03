"use client";

import { useEffect, useState } from "react";
import { ValidationTask } from "@/lib/mockData";
import { CheckCircle, Circle, Loader2, Play } from "lucide-react";
import { motion } from "framer-motion";

interface AnalysisProcessProps {
    tasks: ValidationTask[];
    onComplete: () => void;
    isCompleted: boolean;
}

export default function AnalysisProcess({ tasks, onComplete, isCompleted }: AnalysisProcessProps) {
    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [isRunning, setIsRunning] = useState(false);

    const startAnalysis = async () => {
        setIsRunning(true);

        // Simulate sequential task completion
        for (let i = 0; i < currentTasks.length; i++) {
            if (currentTasks[i].status === 'done') continue;

            // Set to in_progress
            setCurrentTasks(prev => prev.map((t, idx) => idx === i ? { ...t, status: 'in_progress' } : t));

            // Wait (simulate AI work)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Set to done
            setCurrentTasks(prev => prev.map((t, idx) => idx === i ? { ...t, status: 'done' } : t));
        }

        setIsRunning(false);
        onComplete();
    };

    return (
        <div className="glass-card p-8 rounded-2xl">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-serif text-white">Protocole de Validation</h3>
                {!isCompleted && !isRunning && (
                    <button
                        onClick={startAnalysis}
                        className="flex items-center gap-2 px-4 py-2 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-lg transition-all shadow-lg shadow-brand-blue/20"
                    >
                        <Play size={16} /> Lancer l'analyse
                    </button>
                )}
                {isRunning && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 text-brand-mint font-medium rounded-lg">
                        <Loader2 size={16} className="animate-spin" /> Analyse en cours...
                    </div>
                )}
                {isCompleted && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-brand-mint/10 text-brand-mint font-bold rounded-lg border border-brand-mint/20">
                        <CheckCircle size={16} /> Validation Terminée
                    </div>
                )}
            </div>

            <div className="space-y-4">
                {currentTasks.map((task, index) => (
                    <div key={task.id} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="mt-1">
                            {task.status === 'done' && <CheckCircle className="text-brand-mint" size={20} />}
                            {task.status === 'in_progress' && <Loader2 className="text-brand-blue animate-spin" size={20} />}
                            {task.status === 'todo' && <Circle className="text-white/20" size={20} />}
                        </div>
                        <div className="flex-1">
                            <div className="flex justify-between items-start">
                                <h4 className="font-bold text-white mb-1">{task.name}</h4>
                                <span className="text-xs text-brand-purple font-medium bg-brand-purple/10 px-2 py-0.5 rounded">
                                    {task.impact}
                                </span>
                            </div>
                            <p className="text-sm text-white/50">{task.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
