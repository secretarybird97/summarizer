import Summarizer from "@/components/features/summarizer";
import Footer from "@/components/layout/footer";
import SiteHeader from "@/components/layout/siteHeader";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="content-start self-center min-h-screen w-3/6 p-32 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Summarizer />
        
      </div>
      <Footer />
    </div>
  );
}
