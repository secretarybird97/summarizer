import Summarizer from "@/components/features/summarizer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="content-start self-center w-3/6 p-32 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <Summarizer />
      </div>
    </div>
  );
}
