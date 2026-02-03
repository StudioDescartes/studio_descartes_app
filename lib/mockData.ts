export type AnalysisStatus = "pending" | "analyzing" | "scored" | "validated";
export type TaskStatus = "todo" | "in_progress" | "done";

export interface TaskResult {
    label: string;
    value: string | number;
    highlight?: boolean;
}

export interface ValidationTask {
    id: string;
    phase: string;
    name: string;
    description: string;
    status: TaskStatus;
    points: number;
    estimatedDuration: string;
    result?: TaskResult; // To store simulated data (e.g. "Vol: 1200/mo")
}

export interface BusinessIdea {
    id: string;
    nom: string;
    concept: string;
    status: AnalysisStatus;
    score_global: number;
    // New Indie Metrics
    scores: {
        demand_market: number;      // SEO + Communities
        competitor_gap: number;     // Is there space?
        nocode_feasibility: number; // Can we build it fast?
        monetization_speed: number; // Time to first $
    };
    metrics: {
        monthly_searches: string;
        competitor_count: string;
        dev_time_est: string;
        price_point: string;
    };
    tags: string[];
    tasks: ValidationTask[];
}

const INDIE_PROTOCOL: ValidationTask[] = [
    // PHASE 1: DEMAND (40 pts) - The most important for Indie Hackers
    {
        id: "t1",
        phase: "1. Demande & SEO",
        name: "Volume de Recherche (SEO)",
        description: "Recherche Google Keyword Planner & Trends.",
        status: "todo",
        points: 20,
        estimatedDuration: "2 min",
        result: { label: "Volume Mensuel", value: "..." }
    },
    {
        id: "t2",
        phase: "1. Demande & SEO",
        name: "Communautés (Reddit/Fb)",
        description: "Scan des discussions et plaintes récentes.",
        status: "todo",
        points: 20,
        estimatedDuration: "3 min",
        result: { label: "Discussions actives", value: "..." }
    },

    // PHASE 2: COMPETITION GAP (20 pts)
    {
        id: "t3",
        phase: "2. Concurrence",
        name: "Analyse des gaps",
        description: "Les concurrents sont-ils trop gros/lents/chers ?",
        status: "todo",
        points: 20,
        estimatedDuration: "5 min",
        result: { label: "Concurrents directs", value: "..." }
    },

    // PHASE 3: EXECUTION (20 pts)
    {
        id: "t4",
        phase: "3. Faisabilité No-Code",
        name: "Audit Tech Stack",
        description: "Peut-on le faire avec Bubble/NextJS en < 2 semaines ?",
        status: "todo",
        points: 20,
        estimatedDuration: "Instant",
        result: { label: "Complexité", value: "..." }
    },

    // PHASE 4: MONEY (20 pts)
    {
        id: "t5",
        phase: "4. Monétisation",
        name: "Check Pricing Power",
        description: "Les gens paient-ils déjà pour résoudre ça ?",
        status: "todo",
        points: 20,
        estimatedDuration: "Instant",
        result: { label: "Prix Cible", value: "..." }
    }
];

export const MOCK_IDEAS: BusinessIdea[] = [
    {
        id: "1",
        nom: "Créateur de contenu Philo",
        concept: "Vidéo IA qui font revivre les grands moments de l'histoire de la philo. Comptes TikTok/Insta automatisés.",
        status: "pending",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["Media", "IA", "Viral"],
        tasks: JSON.parse(JSON.stringify(INDIE_PROTOCOL))
    },
    {
        id: "2",
        nom: "Notion Template Freelance",
        concept: "Pack Notion ultra-complet pour freelances (Devis, CRM, Finance).",
        status: "scored",
        score_global: 85,
        scores: { demand_market: 9, competitor_gap: 7, nocode_feasibility: 10, monetization_speed: 9 },
        metrics: { monthly_searches: "12k/mo", competitor_count: "High", dev_time_est: "3 jours", price_point: "49€" },
        tags: ["Digital Product", "No-Code", "B2B"],
        tasks: INDIE_PROTOCOL.map(t => ({
            ...t,
            status: 'done',
            result: t.id === 't1' ? { label: "Volume Mensuel", value: "12,500", highlight: true } :
                t.id === 't2' ? { label: "Subs Actifs", value: "5 (r/freelance...)", highlight: true } :
                    t.id === 't3' ? { label: "Concurrents", value: "Saturé mais cher" } :
                        t.id === 't4' ? { label: "Complexité", value: "Faible (Notion)" } :
                            { label: "Prix Moyen", value: "45-90€" }
        }))
    },
    {
        id: "3",
        nom: "SaaS Feedback Widget",
        concept: "Widget simple pour collecter des feedbacks vidéo sur site web.",
        status: "validated",
        score_global: 72,
        scores: { demand_market: 8, competitor_gap: 6, nocode_feasibility: 8, monetization_speed: 7 },
        metrics: { monthly_searches: "5k/mo", competitor_count: "Medium", dev_time_est: "10 jours", price_point: "19€/mo" },
        tags: ["SaaS", "B2B", "Tool"],
        tasks: INDIE_PROTOCOL.map(t => ({ ...t, status: 'done' }))
    },
    {
        id: "4",
        nom: "Job Board Niche AI",
        concept: "Job board pour les experts en Prompt Engineering uniquement.",
        status: "pending",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["Marketplace", "Niche", "Job"],
        tasks: JSON.parse(JSON.stringify(INDIE_PROTOCOL))
    }
];
