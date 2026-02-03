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
    // PHASE 1: DEMAND & DISTRIBUTION (40 pts)
    {
        id: "t1",
        phase: "1. Demand & Distribution",
        name: "Search Volume (SEO)",
        description: "Is people searching for this solution? (Keyword Planner)",
        status: "todo",
        points: 15,
        estimatedDuration: "2 min",
        result: { label: "Monthly Vol", value: "..." }
    },
    {
        id: "t2",
        phase: "1. Demand & Distribution",
        name: "Community Pulse",
        description: "Are there active subreddits/FB groups complaining about this?",
        status: "todo",
        points: 15,
        estimatedDuration: "3 min",
        result: { label: "Active Threads", value: "..." }
    },
    {
        id: "t3",
        phase: "1. Demand & Distribution",
        name: "Viral Potential",
        description: "Can this grow organically on TikTok/Twitter? (Shareable?)",
        status: "todo",
        points: 10,
        estimatedDuration: "Instant",
        result: { label: "K-Factor Pot.", value: "..." }
    },

    // PHASE 2: COMPETITION (Use the 'Bloat' factor)
    {
        id: "t4",
        phase: "2. Competition Check",
        name: "Competitor Bloat",
        description: "Are competitors too complex/expensive? (The 'Indie Advantage')",
        status: "todo",
        points: 20,
        estimatedDuration: "5 min",
        result: { label: "Bloat Score", value: "..." }
    },

    // PHASE 3: EXECUTION SPEED
    {
        id: "t5",
        phase: "3. Build Speed",
        name: "No-Code Stack Check",
        description: "Can it be built in <2 weeks with Bubble/Make/NextJS?",
        status: "todo",
        points: 20,
        estimatedDuration: "Instant",
        result: { label: "Dev Time", value: "..." }
    },

    // PHASE 4: PASSIVE INCOME POTENTIAL
    {
        id: "t6",
        phase: "4. Maintenance",
        name: "Passive Score",
        description: "Once built, does it run itself? (Low Support/Ops)",
        status: "todo",
        points: 20,
        estimatedDuration: "Instant",
        result: { label: "Hours/Week", value: "..." }
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
        tasks: INDIE_PROTOCOL.map(t => {
            const result =
                t.id === 't1' ? { label: "Volume Mensuel", value: "12,500", highlight: true } :
                    t.id === 't2' ? { label: "Subs Actifs", value: "5 (r/freelance...)", highlight: true } :
                        t.id === 't3' ? { label: "Viralité", value: "Moyenne (SEO led)" } :
                            t.id === 't4' ? { label: "Bloat Score", value: "High (Logiciels chers)" } :
                                t.id === 't5' ? { label: "Dev Time", value: "3 jours" } :
                                    { label: "Passive", value: "100% (Digital DL)" };
            return { ...t, status: 'done', result };
        })
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
