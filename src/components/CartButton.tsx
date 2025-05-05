import { useCart } from "@/hooks/use-cart";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const CartButton = ({
  tenantSlug,
  productId,
  isPurchased,
}: {
  tenantSlug: string;
  productId: string;
  isPurchased?: boolean;
}) => {
  const cart = useCart(tenantSlug);
  if (isPurchased) {
    return (
      <Button
        className="flex-1 font-medium bg-white"
        asChild
        variant="elevated"
      >
        <Link prefetch href={`/library/${productId}`}>
          View in library
        </Link>
      </Button>
    );
  }
  return (
    <Button
      variant="elevated"
      className={cn(
        "flex-1 bg-pink-400",
        cart.isProductInCart(productId) && "bg-white"
      )}
      onClick={() => cart.toggleProduct(productId)}
    >
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
