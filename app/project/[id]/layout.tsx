import { Sidebar } from "@/components/layout/sidebar";

const PROJECT_NAMES: Record<string, string> = {
  "proj-dehadza": "Dehadza Homes",
  "proj-fennby": "Fennby Education",
  "proj-reevyl": "REEVYL Leather",
  "proj-trovu": "Trovu Platform",
};

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const name = PROJECT_NAMES[id] ?? "My Project";
  return (
    <div className="flex h-screen overflow-hidden bg-white">
      <Sidebar projectId={id} projectName={name} />
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
}
