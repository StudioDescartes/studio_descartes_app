import { BusinessIdea, ValidationTask } from "./types"; // Assuming types are exported, or I'll redefine them if needed in the same file as before.

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
    result?: TaskResult;
}

export interface BusinessIdea {
    id: string;
    nom: string;
    concept: string;
    status: AnalysisStatus;
    score_global: number;
    scores: {
        demand_market: number;
        competitor_gap: number;
        nocode_feasibility: number;
        monetization_speed: number;
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
    // PHASE 1: DEMAND & DISTRIBUTION
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

    // PHASE 2: COMPETITION
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

    // PHASE 4: STUDIO DESCARTES DNA
    {
        id: "t6",
        phase: "4. Studio Fit (Descartes)",
        name: "French/Smart Touch",
        description: "Is it tailored for the French Market or High-Culture? (No Generic English dropshipping)",
        status: "todo",
        points: 20,
        estimatedDuration: "Instant",
        result: { label: "Descartes Score", value: "..." }
    }
];

// Helper to init tasks
const initTasks = () => JSON.parse(JSON.stringify(INDIE_PROTOCOL));

export const MOCK_IDEAS: BusinessIdea[] = [
    {
        id: "1",
        nom: "Cinéma Philosophique",
        concept: "Séances de cinéma (Quartier Latin) avec intro/débrief philosophique par des étudiants. Target: Public sénior + étudiants en heures creuses.",
        status: "scored",
        score_global: 88,
        scores: { demand_market: 8, competitor_gap: 9, nocode_feasibility: 7, monetization_speed: 9 }, // High DNA Fit
        metrics: { monthly_searches: "2.5k (Event)", competitor_count: "Faible", dev_time_est: "1 semaine (LP)", price_point: "Billeterie + Comm" },
        tags: ["Event", "Culture", "Paris"],
        tasks: INDIE_PROTOCOL.map(t => {
            const result =
                t.id === 't1' ? { label: "Vol. Sorties", value: "High (Paris)", highlight: true } :
                    t.id === 't2' ? { label: "Groupes Senior", value: "Actifs (FB)", highlight: true } :
                        t.id === 't3' ? { label: "Viralité", value: "Bouche à oreille" } :
                            t.id === 't4' ? { label: "Bloat Score", value: "N/A (Expérience)" } :
                                t.id === 't5' ? { label: "Dev Time", value: "1 jour (Eventbrite)" } :
                                    { label: "Fit Descartes", value: "100% (Philo/Paris)" };
            return { ...t, status: 'done', result };
        })
    },
    {
        id: "2",
        nom: "Dîner Philosophique",
        concept: "Dîner 50 places avec animations/débats. 3 invités, 1 thème. Format agile (Entrée -> Débat -> Plat).",
        status: "pending",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["Event", "Gastronomie", "Networking"],
        tasks: initTasks()
    },
    {
        id: "3",
        nom: "Philo Box",
        concept: "Box mensuelle de philosophie (Livre + Goodies + Fiches). Abonnement récurrent.",
        status: "pending",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["E-com", "Sub", "Produit"],
        tasks: initTasks()
    },
    {
        id: "4",
        nom: "Call Center Philo",
        concept: "La philosophie au bout du fil. Service de consultation/écoute philosophique à la demande.",
        status: "analyzing",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["Service", "Phone", "Niche"],
        tasks: initTasks().map((t, i) => i < 2 ? { ...t, status: 'done' } : t) // Simulating progress
    },
    {
        id: "5",
        nom: "Tourisme Philosophique",
        concept: "Parcours audio-guidés dans Paris (Maison de Comte, Sartre, Foucault...). Application ou MP3.",
        status: "scored",
        score_global: 92,
        scores: { demand_market: 7, competitor_gap: 10, nocode_feasibility: 9, monetization_speed: 8 },
        metrics: { monthly_searches: "15k (Tourisme Paris)", competitor_count: "Nul", dev_time_est: "2 semaines", price_point: "9.99€" },
        tags: ["App", "Tourisme", "Audio"],
        tasks: INDIE_PROTOCOL.map(t => ({ ...t, status: 'done' }))
    },
    {
        id: "6",
        nom: "Créateur Contenu Philo",
        concept: "Comptes automatisés (TikTok/Insta) sur les 'Clashs de Philosophes'. Monetisation vias sponsors.",
        status: "pending",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["Media", "Viral", "IA"],
        tasks: initTasks()
    },
    {
        id: "7",
        nom: "Guide 'Lieux de la Philo'",
        concept: "Livre/Ebook référençant les lieux cultes de la philosophie à Paris. Croisement Guide du Routard x Hegel.",
        status: "pending",
        score_global: 0,
        scores: { demand_market: 0, competitor_gap: 0, nocode_feasibility: 0, monetization_speed: 0 },
        metrics: { monthly_searches: "-", competitor_count: "-", dev_time_est: "-", price_point: "-" },
        tags: ["Livre", "Publishing", "Paris"],
        tasks: initTasks()
    }
];
