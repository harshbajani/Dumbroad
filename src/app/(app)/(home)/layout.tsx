import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import React, { ReactNode, Suspense } from "react";
import { SearchFilters, SearchFiltersSkeleton } from "./search-filters";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const Layout = async ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  void queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<SearchFiltersSkeleton />}>
          <SearchFilters />
        </Suspense>
      </HydrationBoundary>
      <div className="flex-1 bg=[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
