"use client";
import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const CheckoutButton = dynamic(
  () => import("@/components/CheckoutButton").then((mod) => mod.CheckoutButton),
  {
    ssr: false,
    loading: () => (
      <Button disabled variant="elevated" className="bg-white">
        <ShoppingCart />
      </Button>
    ),
  }
);

const Navbar = ({ slug }: { slug: string }) => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug }));
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantURL(slug)}
          className="flex items-center gap-2"
        >
          {data.image?.url && (
            <Image
              src={data.image.url}
              alt={slug}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
            />
          )}
          <p className="text-xl">{data.name}</p>
        </Link>
        <CheckoutButton hideIfEmpty tenantSlug={slug} />
      </div>
    </nav>
  );
};

export default Navbar;

export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        <Button disabled variant="elevated" className="bg-white">
          <ShoppingCart />
        </Button>
      </div>
    </nav>
  );
};
