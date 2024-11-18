import Typewriter from "@/components/common/typewriter";
import Summarizer from "@/components/features/summarizer";

export default function Home() {
  return (
    <div className="bg-gradient-to-b">
      <div className="container mx-auto px-4 py-8">
        <section className="text-center mb-16 pt-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-NavText to-yellow-300">
            <Typewriter text="Welcome to Summarizer." delay={50} />
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Instantly summarize any text or article with the power of AI
          </p>
        </section>

        <section>
          <Summarizer />
        </section>
      </div>
    </div>
  );
}
