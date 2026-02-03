export type AnalysisStatus = "pending" | "analyzing" | "scored" | "validated";
export type TaskStatus = "todo" | "in_progress" | "done";

export interface ValidationTask {
    id: string;
    phase: string;
    name: string;
    description: string;
    status: TaskStatus;
    points: number; // Score contribution
    estimatedDuration: string;
}

export interface BusinessIdea {
    id: string;
    nom: string;
    concept: string;
    status: AnalysisStatus;
    score_global: number;
    scores: {
        potentiel_marche: number;
        barrieres_entree: number;
        investissement_initial: number;
        temps_breakeven: number;
        scalabilite: number;
        differenciation: number;
        complexite_ops: number;
        alignement_mission: number;
    };
    metrics: {
        tam: string; // Total Addressable Market
        ca_potentiel: string;
        breakeven: string;
        investment: string;
    };
    tags: string[];
    tasks: ValidationTask[];
}

const DESCARTES_PROTOCOL: ValidationTask[] = [
    // PHASE 1: MARKET FIT (30 pts)
    {
        id: "t1",
        phase: "1. Market Fit",
        name: "Analyse Volumétrie Recherche (SEO)",
        description: "Vérification du volume de recherche mensuel sur les mots-clés cibles (Google Trends / Semrush).",
        status: "todo",
        points: 15,
        estimatedDuration: "2 min (IA)"
    },
    {
        id: "t2",
        phase: "1. Market Fit",
        name: "Ciblage Audience & Pain Points",
        description: "Identification précise des segments clients et validation du problème douloureux à résoudre.",
        status: "todo",
        points: 15,
        estimatedDuration: "3 min (IA)"
    },

    // PHASE 2: COMPETITION (20 pts)
    {
        id: "t3",
        phase: "2. Analyse Concurrentielle",
        name: "Benchmark Direct & Indirect",
        description: "Scraping des 5 principaux concurrents et analyse de leur offre de valeur.",
        status: "todo",
        points: 10,
        estimatedDuration: "5 min (IA)"
    },
    {
        id: "t4",
        phase: "2. Analyse Concurrentielle",
        name: "Analyse SWOT & Différenciation",
        description: "Évaluation des forces/faiblesses et définition de l'Unique Value Proposition.",
        status: "todo",
        points: 10,
        estimatedDuration: "Instant"
    },

    // PHASE 3: FINANCIALS (30 pts)
    {
        id: "t5",
        phase: "3. Viabilité Financière",
        name: "Modélisation Unit Economics",
        description: "Calcul du coût d'acquisition (CAC) et de la valeur vie client (LTV).",
        status: "todo",
        points: 15,
        estimatedDuration: "Instant"
    },
    {
        id: "t6",
        phase: "3. Viabilité Financière",
        name: "Projection Cashflow & Breakeven",
        description: "Simulation de trésorerie sur 3 ans pour valider la rentabilité.",
        status: "todo",
        points: 15,
        estimatedDuration: "Instant"
    },

    // PHASE 4: STRATEGIC FIT (20 pts)
    {
        id: "t7",
        phase: "4. Fit Studio Descartes",
        name: "Alignement Vision Long Terme",
        description: "Vérification de la cohérence avec l'écosystème Studio Descartes et les cibles actuelles.",
        status: "todo",
        points: 10,
        estimatedDuration: "Manual Review"
    },
    {
        id: "t8",
        phase: "4. Fit Studio Descartes",
        name: "Faisabilité Opérationnelle",
        description: "Validation des ressources humaines et techniques disponibles en interne.",
        status: "todo",
        points: 10,
        estimatedDuration: "Manual Review"
    }
];

// Helper to calculate score based on task completion
export const calculateScore = (tasks: ValidationTask[]): number => {
    return tasks.reduce((acc, task) => task.status === 'done' ? acc + task.points : acc, 0);
};

export const MOCK_IDEAS: BusinessIdea[] = [
    {
        id: "1",
        nom: "Créateur de contenu Philo",
        concept: "Vidéo IA qui font revivre les grands moments de l'histoire de la philo. Comptes TikTok/Insta automatisés.",
        status: "pending",
        score_global: 0,
        scores: {
            potentiel_marche: 0, barrieres_entree: 0, investissement_initial: 0, temps_breakeven: 0,
            scalabilite: 0, differenciation: 0, complexite_ops: 0, alignement_mission: 0
        },
        metrics: { tam: "-", ca_potentiel: "-", breakeven: "-", investment: "-" },
        tags: ["Media", "IA", "B2C"],
        tasks: JSON.parse(JSON.stringify(DESCARTES_PROTOCOL)) // Deep copy
    },
    {
        id: "2",
        nom: "Atelier de philosophie",
        concept: "Ateliers pratiques de philosophie pour entreprises (B2B) et particuliers. Partenariats Funbooker.",
        status: "scored",
        score_global: 75,
        scores: {
            potentiel_marche: 7.0, barrieres_entree: 8.0, investissement_initial: 9.0, temps_breakeven: 8.0,
            scalabilite: 4.0, differenciation: 6.5, complexite_ops: 8.0, alignement_mission: 9.5
        },
        metrics: { tam: "45M€", ca_potentiel: "120K€/an", breakeven: "3 mois", investment: "2K€" },
        tags: ["Service", "B2B", "Formation"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: Math.random() > 0.2 ? 'done' : 'todo' })) as ValidationTask[]
    },
    {
        id: "3",
        nom: "Formation en philosophie",
        concept: "Formation 'Deviens toi-même'. Visites guidées lieux historiques (Maison d'Auguste Comte, etc).",
        status: "validated",
        score_global: 85,
        scores: {
            potentiel_marche: 7.5, barrieres_entree: 7.5, investissement_initial: 8.5, temps_breakeven: 7.5,
            scalabilite: 6.0, differenciation: 7.0, complexite_ops: 7.0, alignement_mission: 9.0
        },
        metrics: { tam: "80M€", ca_potentiel: "250K€/an", breakeven: "6 mois", investment: "5K€" },
        tags: ["Education", "Culture", "Event"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: 'done' })) as ValidationTask[]
    },
    {
        id: "4",
        nom: "Philo Box",
        concept: "Box mensuelle par abonnement contenant livre, guide de lecture, goodies. Modèle récurrent.",
        status: "scored",
        score_global: 90,
        scores: {
            potentiel_marche: 8.5, barrieres_entree: 7.0, investissement_initial: 6.5, temps_breakeven: 7.0,
            scalabilite: 9.0, differenciation: 6.0, complexite_ops: 5.5, alignement_mission: 8.0
        },
        metrics: { tam: "120M€", ca_potentiel: "450K€/an", breakeven: "9 mois", investment: "15K€" },
        tags: ["E-commerce", "Abonnement", "Scalable"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: 'done' })) as ValidationTask[]
    },
    {
        id: "5",
        nom: "Club Philo",
        concept: "Club privé ou associatif pour échanges philosophiques réguliers.",
        status: "pending",
        score_global: 0,
        scores: {
            potentiel_marche: 0, barrieres_entree: 0, investissement_initial: 0, temps_breakeven: 0,
            scalabilite: 0, differenciation: 0, complexite_ops: 0, alignement_mission: 0
        },
        metrics: { tam: "-", ca_potentiel: "-", breakeven: "-", investment: "-" },
        tags: ["Communauté", "Event", "B2C"],
        tasks: JSON.parse(JSON.stringify(DESCARTES_PROTOCOL))
    },
    {
        id: "6",
        nom: "Collaboration Artistique",
        concept: "Partenariats avec artistes pour des oeuvres à concepts philosophiques (ex: Allegra).",
        status: "scored",
        score_global: 60,
        scores: {
            potentiel_marche: 5.0, barrieres_entree: 6.0, investissement_initial: 7.0, temps_breakeven: 5.0,
            scalabilite: 3.0, differenciation: 9.0, complexite_ops: 4.0, alignement_mission: 8.5
        },
        metrics: { tam: "Niche", ca_potentiel: "Variable", breakeven: "Projet", investment: "Low" },
        tags: ["Art", "Partenariat", "Branding"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: Math.random() > 0.4 ? 'done' : 'todo' })) as ValidationTask[]
    },
    {
        id: "7",
        nom: "Tourisme Philosophique",
        concept: "Parcours de 90 min dans Paris. 'Visites philosophiques par les temps qui restent'.",
        status: "validated",
        score_global: 68,
        scores: {
            potentiel_marche: 6.5, barrieres_entree: 8.0, investissement_initial: 9.0, temps_breakeven: 8.5,
            scalabilite: 4.0, differenciation: 7.5, complexite_ops: 7.5, alignement_mission: 9.0
        },
        metrics: { tam: "Tourisme", ca_potentiel: "60K€/an", breakeven: "immédiat", investment: "0€" },
        tags: ["Tourisme", "Event", "Culture"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: 'done' })) as ValidationTask[]
    },
    {
        id: "8",
        nom: "Événementiel Philo Expérience",
        concept: "Expériences immersives basées sur des concepts philosophiques au Palais de Tokyo.",
        status: "pending",
        score_global: 0,
        scores: {
            potentiel_marche: 0, barrieres_entree: 0, investissement_initial: 0, temps_breakeven: 0,
            scalabilite: 0, differenciation: 0, complexite_ops: 0, alignement_mission: 0
        },
        metrics: { tam: "-", ca_potentiel: "-", breakeven: "-", investment: "-" },
        tags: ["Event", "Premium", "Expérience"],
        tasks: JSON.parse(JSON.stringify(DESCARTES_PROTOCOL))
    },
    {
        id: "9",
        nom: "Call Center Philosophique",
        concept: "'La philosophie au bout du fil'. Service d'écoute et de conseil philosophique.",
        status: "scored",
        score_global: 55,
        scores: {
            potentiel_marche: 4.0, barrieres_entree: 9.0, investissement_initial: 9.5, temps_breakeven: 8.0,
            scalabilite: 5.0, differenciation: 8.0, complexite_ops: 6.0, alignement_mission: 8.0
        },
        metrics: { tam: "Faible", ca_potentiel: "40K€/an", breakeven: "1 mois", investment: "1K€" },
        tags: ["Service", "B2C", "Insolite"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: Math.random() > 0.5 ? 'done' : 'todo' })) as ValidationTask[]
    },
    {
        id: "10",
        nom: "Livre - Lieux Philo Paris",
        concept: "Guide de référence croisant lieux et philosophie (Odile Jacob style).",
        status: "validated",
        score_global: 65,
        scores: {
            potentiel_marche: 5.5, barrieres_entree: 6.0, investissement_initial: 7.0, temps_breakeven: 6.0,
            scalabilite: 8.0, differenciation: 6.0, complexite_ops: 8.0, alignement_mission: 9.5
        },
        metrics: { tam: "Edition", ca_potentiel: "Passive", breakeven: "12 mois", investment: "Temps" },
        tags: ["Livre", "Produit", "Culture"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: 'done' })) as ValidationTask[]
    },
    {
        id: "11",
        nom: "Dîner Philosophique",
        concept: "Dîner 50 places, animations, 3 invités, interventions entre les plats.",
        status: "scored",
        score_global: 70,
        scores: {
            potentiel_marche: 6.0, barrieres_entree: 6.5, investissement_initial: 6.0, temps_breakeven: 7.0,
            scalabilite: 3.5, differenciation: 7.0, complexite_ops: 4.0, alignement_mission: 8.5
        },
        metrics: { tam: "Event", ca_potentiel: "80K€/an", breakeven: "3 events", investment: "5K€" },
        tags: ["Event", "Food", "Premium"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: Math.random() > 0.3 ? 'done' : 'todo' })) as ValidationTask[]
    },
    {
        id: "12",
        nom: "Cinéma Philosophique",
        concept: "Séances dans le quartier latin, intro/débrief philosophique. Target étudiants et seniors.",
        status: "validated",
        score_global: 76,
        scores: {
            potentiel_marche: 6.5, barrieres_entree: 6.5, investissement_initial: 7.0, temps_breakeven: 7.0,
            scalabilite: 5.0, differenciation: 7.5, complexite_ops: 5.5, alignement_mission: 9.0
        },
        metrics: { tam: "15M€", ca_potentiel: "80K€/an", breakeven: "12 mois", investment: "2K€" },
        tags: ["Culture", "Partenariat", "Scalable"],
        tasks: DESCARTES_PROTOCOL.map(t => ({ ...t, status: 'done' })) as ValidationTask[]
    }
];
