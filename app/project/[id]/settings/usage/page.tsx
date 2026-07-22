import { redirect } from "next/navigation";

export default async function SettingsUsageAliasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/project/${id}/settings`);
}
