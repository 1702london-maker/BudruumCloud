import { redirect } from "next/navigation";

export default async function ObservabilityAuthAliasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/project/${id}/observability`);
}
