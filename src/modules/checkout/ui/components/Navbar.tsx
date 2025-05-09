import { Button } from "@/components/ui/button";
import { generateTenantURL } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const Navbar = ({ slug }: { slug: string }) => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <p className="text-xl">Checkout</p>
        <Button variant="elevated" asChild>
          <Link href={generateTenantURL(slug)}>Continue Shopping</Link>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;
