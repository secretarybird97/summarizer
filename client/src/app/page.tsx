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

        {/* <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Globe className="w-6 h-6" />}
              title="URL Summarization"
              description="Summarize any web article by simply pasting the URL"
            />
            <FeatureCard
              icon={<FileText className="w-6 h-6" />}
              title="Text Summarization"
              description="Paste any text to get a concise summary in seconds"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Results"
              description="Get summaries quickly with our advanced AI technology"
            />
          </div>
        </section> */}

        <section>
          <Summarizer />
        </section>
      </div>
    </div>
  );
}
