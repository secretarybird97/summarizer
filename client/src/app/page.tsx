import Summarizer from "@/components/features/summarizer";
import SiteHeader from "@/components/layout/siteHeader";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-32 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Summarizer />
      </div>
      {/* <Footer /> */}
    </div>
  );
}
