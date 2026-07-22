import { redirect } from "next/navigation";

export default async function DatabaseMigrationsAliasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/project/${id}/database`);
}
