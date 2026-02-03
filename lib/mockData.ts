export type AnalysisStatus = "pending" | "analyzing" | "scored" | "validated";
export type TaskStatus = "todo" | "in_progress" | "done";

export interface ValidationTask {
    id: string;
    name: string;
    description: string;
    status: TaskStatus;
    estimatedDuration: string;
    impact: string; // Which score dimension it affects
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
        tam: string;
        ca_potentiel: string;
        breakeven: string;
        investment: string;
    };
    tags: string[];
    tasks: ValidationTask[]; // New: Actionable tasks
}

const STANDARD_TASKS: ValidationTask[] = [
    {
        id: "t1",
        name: "Étude de Marché (Volume & Tendances)",
        description: "Analyse des volumes de recherche Google et des discussions sociales pour valider la demande.",
        status: "todo",
        estimatedDuration: "2 min (IA)",
        impact: "Potentiel Marché"
    },
    {
        id: "t2",
        name: "Benchmark Concurrentiel",
        description: "Identification et scraping des 5 concurrents directs. Comparaison des offres et prix.",
        status: "todo",
        estimatedDuration: "5 min (IA)",
        impact: "Barrières & Différenciation"
    },
    {
        id: "t3",
        name: "Modélisation Financière Macro",
        description: "Estimation du TAM, SAM, SOM et projection du seuil de rentabilité.",
        status: "todo",
        estimatedDuration: "Instant",
        impact: "Investissement & Break-even"
    },
    {
        id: "t4",
        name: "Check Faisabilité Opérationnelle",
        description: "Vérification des contraintes légales, logistiques et humaines.",
        status: "todo",
        estimatedDuration: "3 min (IA)",
        impact: "Complexité Ops"
    }
];

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
        tasks: [...STANDARD_TASKS]
    },
    {
        id: "2",
        nom: "Atelier de philosophie",
        concept: "Ateliers pratiques de philosophie pour entreprises (B2B) et particuliers. Partenariats Funbooker.",
        status: "scored",
        score_global: 72,
        scores: {
            potentiel_marche: 7.0, barrieres_entree: 8.0, investissement_initial: 9.0, temps_breakeven: 8.0,
            scalabilite: 4.0, differenciation: 6.5, complexite_ops: 8.0, alignement_mission: 9.5
        },
        metrics: { tam: "45M€", ca_potentiel: "120K€/an", breakeven: "3 mois", investment: "2K€" },
        tags: ["Service", "B2B", "Formation"],
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
    },
    {
        id: "3",
        nom: "Formation en philosophie",
        concept: "Formation 'Deviens toi-même'. Visites guidées lieux historiques (Maison d'Auguste Comte, etc).",
        status: "validated",
        score_global: 78,
        scores: {
            potentiel_marche: 7.5, barrieres_entree: 7.5, investissement_initial: 8.5, temps_breakeven: 7.5,
            scalabilite: 6.0, differenciation: 7.0, complexite_ops: 7.0, alignement_mission: 9.0
        },
        metrics: { tam: "80M€", ca_potentiel: "250K€/an", breakeven: "6 mois", investment: "5K€" },
        tags: ["Education", "Culture", "Event"],
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
    },
    {
        id: "4",
        nom: "Philo Box",
        concept: "Box mensuelle par abonnement contenant livre, guide de lecture, goodies. Modèle récurrent.",
        status: "scored",
        score_global: 84,
        scores: {
            potentiel_marche: 8.5, barrieres_entree: 7.0, investissement_initial: 6.5, temps_breakeven: 7.0,
            scalabilite: 9.0, differenciation: 6.0, complexite_ops: 5.5, alignement_mission: 8.0
        },
        metrics: { tam: "120M€", ca_potentiel: "450K€/an", breakeven: "9 mois", investment: "15K€" },
        tags: ["E-commerce", "Abonnement", "Scalable"],
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
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
        tasks: [...STANDARD_TASKS]
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
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
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
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
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
        tasks: [...STANDARD_TASKS]
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
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
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
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
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
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
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
        tasks: STANDARD_TASKS.map(t => ({ ...t, status: "done" }))
    }
];
