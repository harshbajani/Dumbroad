import { CheckoutView } from "@/modules/checkout/ui/views/CheckoutView";
import React from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

const Page = async ({ params }: Props) => {
  const { slug } = await params;
  return <CheckoutView tenantSlug={slug} />;
};

export default Page;
