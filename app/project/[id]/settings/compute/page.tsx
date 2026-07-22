import { redirect } from "next/navigation";

export default async function SettingsComputeAliasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/project/${id}/settings`);
}
