import { useCart } from "@/hooks/use-cart";
import { Button } from "./ui/button";
import { cn, generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";

interface Props {
  className?: string;
  hideIfEmpty?: boolean;
  tenantSlug: string;
}

export const CheckoutButton = ({
  className,
  hideIfEmpty,
  tenantSlug,
}: Props) => {
  const { totalItems } = useCart(tenantSlug);

  if (hideIfEmpty && totalItems === 0) return null;

  return (
    <Button variant="elevated" asChild className={cn("bg-white", className)}>
      <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
        <ShoppingCart /> {totalItems > 0 ? totalItems : ""}
      </Link>
    </Button>
  );
};
