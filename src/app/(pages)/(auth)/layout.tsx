import Footer from "@/components/common/Footer";
import Motion from "@/components/ui/Motion";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main>
        <Motion>{children}</Motion>
      </main>
      <Footer />
    </>
  );
}
