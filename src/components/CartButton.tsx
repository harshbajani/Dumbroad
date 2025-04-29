import { useCart } from "@/hooks/use-cart";
import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export const CartButton = ({
  tenantSlug,
  productId,
}: {
  tenantSlug: string;
  productId: string;
}) => {
  const cart = useCart(tenantSlug);
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
