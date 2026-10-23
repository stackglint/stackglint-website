// All site copy lives here so it can be edited without touching components.

export const TECH_STRIP = ["WordPress", "E-commerce", "Python", "Django", "FastAPI", "Next.js", "React", "TypeScript", "JavaScript",
  "Node.js", "Odoo ERP", "PostgreSQL", "Docker", "Kubernetes", "AWS", "GitHub Actions", "CI/CD", "AI integration"];

export const TRUST = [
  { big: "7+", unit: "yrs", label: "industry experience", text: "Real products, real users, real deadlines, long before StackGlint had a name." },
  { big: "E2E", label: "full software life cycle", text: "Discovery, architecture, build, testing, deployment and support. One team owns all of it." },
  { big: "Prod", label: "production-grade, hands-on", text: "We have run live systems, handled incidents and shipped fixes. We build with that in mind." },
  { big: "1:1", label: "a partner, not a vendor", text: "Honest advice, including when you don't need something. We stay with you after launch." },
];

export type Layer = { name: string; tag: string; icon: string; code: string; title: string; text: string; items: string[]; tech: string[] };
export const LAYERS: Layer[] = [
  { name: "Interface", tag: "websites", icon: "web", code: "websites & frontend", title: "Interface: websites and web apps",
    text: "Business websites, online stores and web apps that load fast, look sharp on every screen and are easy for your team to update.",
    items: ["Business websites and landing pages", "E-commerce stores", "WordPress sites and custom themes", "Web applications and customer portals"],
    tech: ["WordPress", "Next.js", "React", "TypeScript", "HTML & CSS"] },
  { name: "Services", tag: "APIs", icon: "server", code: "backend & APIs", title: "Services: backends and APIs that hold up",
    text: "Clean, layered backends with documented APIs, background jobs and data models designed for growth.",
    items: ["REST APIs with full documentation", "Integrations with payment, email and third-party systems", "Data modelling and performance tuning"],
    tech: ["Python", "Django", "FastAPI", "Node.js", "PostgreSQL"] },
  { name: "Business", tag: "Odoo ERP", icon: "erp", code: "odoo erp", title: "Business: Odoo ERP that fits how you work",
    text: "Implementation, custom modules and integrations, so sales, inventory, accounting and operations run in one system.",
    items: ["Odoo implementation and migration", "Custom modules and workflow automation", "Payment gateway and third-party integrations"],
    tech: ["Odoo", "Python", "PostgreSQL"] },
  { name: "Intelligence", tag: "AI", icon: "ai", code: "ai", title: "Intelligence: AI inside real products",
    text: "AI features that solve a specific business problem and plug into the systems you already use.",
    items: ["AI assistants trained on your own documents", "Document processing and data extraction", "Workflow automation with AI"],
    tech: ["Python", "AI APIs", "FastAPI"] },
  { name: "Infrastructure", tag: "cloud & CI/CD", icon: "cloud", code: "cloud, devops & ci/cd", title: "Infrastructure: cloud, DevOps and CI/CD",
    text: "Infrastructure written as code, pipelines that test and ship every change, and monitoring that tells you before users do.",
    items: ["Cloud architecture and migration", "CI/CD pipelines with zero manual steps", "Containers, monitoring and backups"],
    tech: ["AWS", "Docker", "Kubernetes", "GitHub Actions"] },
];

export type Group = "frontend" | "backend" | "erp" | "data" | "ai" | "devops" | "cloud" | "ci/cd";
export const ELEMENTS: { sym: string; name: string; group: Group }[] = [
  { sym: "Py", name: "Python", group: "backend" }, { sym: "Dj", name: "Django", group: "backend" },
  { sym: "Fa", name: "FastAPI", group: "backend" }, { sym: "No", name: "Node.js", group: "backend" },
  { sym: "Nx", name: "Next.js", group: "frontend" }, { sym: "Re", name: "React", group: "frontend" },
  { sym: "Ts", name: "TypeScript", group: "frontend" }, { sym: "Js", name: "JavaScript", group: "frontend" },
  { sym: "Wp", name: "WordPress", group: "frontend" }, { sym: "Ht", name: "HTML & CSS", group: "frontend" },
  { sym: "Od", name: "Odoo ERP", group: "erp" }, { sym: "Pg", name: "PostgreSQL", group: "data" },
  { sym: "Ai", name: "AI integration", group: "ai" }, { sym: "Ci", name: "CI/CD", group: "ci/cd" },
  { sym: "Dk", name: "Docker", group: "devops" }, { sym: "K8", name: "Kubernetes", group: "devops" },
  { sym: "Aw", name: "AWS", group: "cloud" }, { sym: "Gh", name: "GitHub Actions", group: "ci/cd" },
];
export const GROUP_COLOR: Record<Group, string> = {
  frontend: "var(--color-accent)", backend: "var(--color-ok)", data: "var(--color-ok)", erp: "var(--color-gold)",
  ai: "var(--color-lilac)", devops: "var(--color-sky)", cloud: "var(--color-sky)", "ci/cd": "var(--color-sky)",
};
export const SYMBOL: Record<string, string> = Object.fromEntries(ELEMENTS.map(e => [e.name, e.sym]));
Object.assign(SYMBOL, { Odoo: "Od", "AI APIs": "Ai" });

export const PLANNER = [
  { key: "site", label: "Website / E-commerce", name: "Website or online store", why: "A fast, mobile-friendly site your team can update yourselves, with online payments if you sell.", stack: ["WordPress", "Next.js", "React", "HTML & CSS"], need: "Website, e-commerce or WordPress" },
  { key: "web", label: "Web app / SaaS", name: "Web app or SaaS product", why: "A secure web app with a clean, well-tested backend and room to grow.", stack: ["Next.js", "TypeScript", "Python", "FastAPI", "PostgreSQL"], need: "Full-stack web application" },
  { key: "erp", label: "Odoo ERP", name: "Odoo ERP", why: "Sales, inventory, accounting and operations in one system, set up around how you already work.", stack: ["Odoo", "Python", "PostgreSQL"], need: "Odoo ERP" },
  { key: "ai", label: "AI feature", name: "AI feature", why: "AI that solves one clear problem and plugs into the tools you already use.", stack: ["Python", "FastAPI", "AI APIs"], need: "AI solution" },
  { key: "auto", label: "Automation", name: "Automation", why: "Repetitive work handled automatically, so your team can focus on the important things.", stack: ["Python", "Django", "AI APIs"], need: "Something else" },
  { key: "improve", label: "Improve my system", name: "Improve an existing system", why: "We review what you have, then make it faster, more reliable and easier to deploy.", stack: ["Docker", "GitHub Actions", "AWS"], need: "Cloud, DevOps & CI/CD" },
];
export const NEEDS = ["Website, e-commerce or WordPress", "Full-stack web application", "Odoo ERP", "Cloud, DevOps & CI/CD", "AI solution", "Something else"];

export const STAGES = [
  { name: "DISCOVER", text: "We learn your business, users and constraints, then agree on scope, timeline and cost.", out: "scope & estimate" },
  { name: "ARCHITECT", text: "We design the system before writing it: data model, APIs and infrastructure.", out: "architecture docs" },
  { name: "BUILD", text: "Short iterations with a working demo every week. Code lives in your repository from day one.", out: "weekly demos" },
  { name: "TEST", text: "Automated tests and code review on every change before anything is merged.", out: "tests in CI" },
  { name: "DEPLOY", text: "CI/CD pipelines ship each release to production with zero manual steps.", out: "production release" },
  { name: "SUPPORT", text: "Monitoring, maintenance and a full handover, so your team can own it.", out: "handover & support" },
];

export const HOW = [
  { icon: "mail", title: "Clear communication", text: "Email updates every week, quick replies, and one point of contact who knows your project." },
  { icon: "doc", title: "Proper documentation", text: "Architecture, API and handover documents written as we build, not after." },
  { icon: "clock", title: "On-time delivery", text: "Realistic estimates, visible progress, and production-ready releases on the agreed date." },
];

export const PRINCIPLES: [string, string][] = [
  ["architecture", "clean, layered, documented"], ["code", "SOLID, reviewed before merge"], ["testing", "automated, runs in CI"],
  ["infra", "as code, reproducible"], ["releases", "CI/CD, zero manual steps"], ["handover", "your repo, your docs, your keys"],
];

export const NAV = [
  { href: "#stack", label: "Stack" }, { href: "#idea", label: "Your idea" }, { href: "#elements", label: "Elements" },
  { href: "#lifecycle", label: "Life cycle" }, { href: "#how", label: "How we work" },
];
