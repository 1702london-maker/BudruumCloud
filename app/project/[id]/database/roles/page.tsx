import { redirect } from "next/navigation";

export default async function DatabaseRolesAliasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/project/${id}/database`);
}
