import Navbar from "@/modules/checkout/ui/components/Navbar";
import Footer from "@/modules/tenants/ui/components/Footer";
import { ReactNode } from "react";

const Layout = async ({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      <Navbar slug={slug} />

      <div className="flex-1 ">
        <div className="max-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
