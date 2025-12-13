import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import Motion from "@/components/ui/Motion";
import ClientBreadcrumb from "@/utils/ClientBreadcrumb";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <ClientBreadcrumb />
      <main>
        <Motion>{children}</Motion>
      </main>
      <Footer />
    </>
  );
}
