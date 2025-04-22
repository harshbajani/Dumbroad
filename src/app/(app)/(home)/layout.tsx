import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { ReactNode } from "react";
import { getPayload } from "payload";
import configPromise from "@payload-config";
import SearchFilters from "./search-filters";
import { Category } from "@/payload-types";
import { CustomCategory } from "@/types";

const Layout = async ({ children }: { children: ReactNode }) => {
  const payload = await getPayload({
    config: configPromise,
  });
  const data = await payload.find({
    collection: "categories",
    depth: 1,
    where: {
      parent: {
        exists: false,
      },
    },
    sort: "name",
    limit: 100,
  });
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category),
      subcategories: undefined,
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <SearchFilters data={formattedData} />
      <div className="flex-1 bg=[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
