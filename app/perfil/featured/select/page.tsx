import SelectFeaturedClient from "@/components/Featured/SelectFeaturedClient";

export default async function SelectFeaturedPage({
  searchParams,
}: {
  searchParams: Promise<{ slot?: string }>;
}) {
  const params = await searchParams;
  const slot = params.slot;

  return <SelectFeaturedClient slot={slot} />;
}
