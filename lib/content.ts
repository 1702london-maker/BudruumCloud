export const blogPosts = [
  {
    slug: "branch-databases-agencies",
    category: "Engineering",
    title: "How branch databases changed the way we ship client projects",
    excerpt: "Every pull request can have its own isolated data workspace. That changes how agencies test client work.",
    date: "July 14, 2026",
    readTime: "6 min",
    body: [
      "Client projects usually fail at the handoff between development data, staging data, and production data. The schema changes, seed data drifts, and the team starts testing against whatever database happens to be convenient.",
      "Budruum's project model is built around isolation first. Each project owns its schema, API keys, auth users, storage namespace, and logs. That makes it possible to test a client app without touching the rest of the platform.",
      "For agencies, the practical win is confidence. A branch or preview environment should be disposable, repeatable, and easy to inspect from the dashboard."
    ],
  },
  {
    slug: "zero-egress-r2",
    category: "Infrastructure",
    title: "Why we moved storage to Cloudflare R2",
    excerpt: "R2 gives Budruum an S3-compatible storage layer with predictable economics for client-heavy agencies.",
    date: "June 28, 2026",
    readTime: "4 min",
    body: [
      "Storage is one of the places where backend pricing can become difficult to explain to a client. Uploads are simple, but egress and transfer fees can surprise people later.",
      "Budruum uses Cloudflare R2 so each project can have a real object storage namespace while keeping the API familiar. Files are scoped by project, dashboard uploads are logged, and deletes are visible in project logs.",
      "The next storage work is deeper bucket policies and public/private object rules."
    ],
  },
  {
    slug: "realtime-ably-postgres-cdc",
    category: "Engineering",
    title: "Building realtime subscriptions with Ably",
    excerpt: "Realtime starts with reliable project channels before database trigger automation is added.",
    date: "June 15, 2026",
    readTime: "9 min",
    body: [
      "Realtime is useful only when events are scoped correctly. A client app should not have to know about the platform internals; it should publish and subscribe inside its own project boundary.",
      "Budruum's current realtime layer uses Ably for project-scoped broadcasts. The dashboard can publish a real message, and that publish is captured in project logs.",
      "Automatic database change broadcasting is the next deeper layer."
    ],
  },
  {
    slug: "rls-agencies-guide",
    category: "Guide",
    title: "Row Level Security for agencies: a practical guide",
    excerpt: "Start with table-level policy switches, then move toward row-level rules as client apps mature.",
    date: "June 2, 2026",
    readTime: "8 min",
    body: [
      "Access control has to be understandable from the dashboard. Budruum now supports table policies that decide whether anon keys can read or write each project table.",
      "Service keys bypass those policies and should stay server-side. That mirrors the practical split most backend platforms use: browser-safe keys for clients, privileged keys for trusted servers.",
      "The long-term goal is SQL-backed row policies with test tools, but table-level enforcement is already live."
    ],
  },
  {
    slug: "drizzle-budruum",
    category: "Guide",
    title: "Type-safe database migrations with Drizzle ORM and Budruum",
    excerpt: "Use Drizzle locally and apply generated SQL through the Budruum SQL Editor.",
    date: "May 22, 2026",
    readTime: "5 min",
    body: [
      "Budruum projects expose a SQL Editor that can run multi-statement scripts against the project schema. That makes it a good fit for migration output from tools such as Drizzle.",
      "For a new app, create tables in SQL Editor, inspect them in Database, then verify reads and writes in Table Editor or through the SDK.",
      "The platform logs SQL activity so schema work is visible later."
    ],
  },
  {
    slug: "agency-pricing-model",
    category: "Product",
    title: "The pricing model built for agencies",
    excerpt: "Agencies need predictable backend cost per client, not surprise infrastructure invoices.",
    date: "May 10, 2026",
    readTime: "4 min",
    body: [
      "A backend platform for agencies has a different job from a backend platform for a single SaaS product. Agencies need repeatable project setup, clean client separation, and costs they can explain.",
      "Budruum is moving toward one console for project data, auth, storage, realtime, logs, functions, and settings.",
      "Usage enforcement and billing automation are still active build areas."
    ],
  },
  {
    slug: "edge-functions-typescript",
    category: "Engineering",
    title: "Writing production edge functions in TypeScript",
    excerpt: "Function support starts with callable project endpoints and moves toward isolated runtimes.",
    date: "April 28, 2026",
    readTime: "7 min",
    body: [
      "Running arbitrary code safely requires isolation. Budruum's current function MVP lets a project create callable JSON-response handlers and invoke them with project API keys.",
      "That means a project can test function URLs, observe invocations, and manage function entries from the dashboard today.",
      "A full TypeScript runtime should be backed by Cloudflare Workers or another sandbox, not the main app server."
    ],
  },
  {
    slug: "mfa-auth-agencies",
    category: "Security",
    title: "Enforcing MFA across client projects",
    excerpt: "MFA is planned; project-scoped email/password auth is live now.",
    date: "April 15, 2026",
    readTime: "4 min",
    body: [
      "Budruum now separates platform users from project auth users. That matters because a client's app users should not appear as Budruum Cloud dashboard users.",
      "The current project auth supports signup, login, password hashing, sessions, and a dashboard user list.",
      "MFA, magic links, and OAuth providers remain roadmap items."
    ],
  },
];

export function docFor(slugParts: string[]) {
  const path = slugParts.join("/") || "overview";
  const title = path.split("/").map((part) => part.replace(/-/g, " ")).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(" / ");
  const product = slugParts[0] || "platform";
  const liveMap: Record<string, string[]> = {
    database: ["Project schemas are isolated.", "SQL Editor supports multi-statement scripts.", "Table Editor can insert, edit, delete, and browse rows.", "Table policies can restrict anon read/write access."],
    auth: ["Project auth supports email/password signup and login.", "Passwords are hashed server-side.", "Auth users are scoped per project.", "OAuth, magic links, and MFA are planned."],
    storage: ["Storage uses Cloudflare R2.", "Dashboard upload, list, and delete are live.", "Storage actions are captured in project logs.", "Bucket-level policy controls are next."],
    functions: ["Callable project functions are live.", "Current functions return configured JSON responses.", "Invocations require a project API key.", "Full isolated TypeScript execution is planned."],
    realtime: ["Realtime is configured through Ably.", "Dashboard publish sends real project-scoped messages.", "Realtime events are logged.", "Automatic database change feeds are next."],
    platform: ["Projects, API keys, logs, and settings are managed in the dashboard.", "Health checks verify database, auth, storage, and realtime configuration.", "Usage enforcement and billing automation are planned."],
  };
  return { title, product, bullets: liveMap[product] || liveMap.platform };
}
