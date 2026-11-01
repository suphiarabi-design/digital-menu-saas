import { Storefront } from "@/components/storefront/Storefront";

type PageProps = {
  params: Promise<{ brand: string }>;
};

export default async function BrandPage({ params }: PageProps) {
  const { brand } = await params;
  return <Storefront slug={brand} />;
}
