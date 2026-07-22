import { redirect } from "next/navigation";

export default async function EditorAliasPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  redirect(`/project/${id}/table-editor`);
}
