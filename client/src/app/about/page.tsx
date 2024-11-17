import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

export default function Page() {
  const techStack = [
    { name: "Frontend", logo: "/nextjs-logo.jpg", alt: "NextJS Logo" },
    { name: "Backend", logo: "/dotnet-logo.png", alt: "Dotnet Core Logo" },
    { name: "Database", logo: "/postgres-logo.png", alt: "PostgreSQL Logo" },
    { name: "API", logo: "/fastapi-logo.jpg", alt: "FastAPI Logo" },
    { name: "Caching", logo: "/redis-logo.png", alt: "Redis Logo" },
    { name: "AI", logo: "/huggingface-logo.png", alt: "PyTorch Logo" },
  ];

  const supportedSites = [
    "Dailymail",
    "Reuters",
    "The Guardian",
    "BBC News",
    "CNN",
    "The New York Times",
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">About Summarizer</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Summarizer is an AI-assisted tool focused on generating article
          summaries from URLs or plain text, using advanced web scraping and
          generative models.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {techStack.map((tech) => (
            <Card
              key={tech.name}
              className="flex flex-col items-center justify-center p-4"
            >
              <Image
                src={tech.logo}
                alt={tech.alt}
                width={64}
                height={64}
                className="mb-2"
              />
              <h3 className="font-semibold text-center">{tech.name}</h3>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-6">Supported Sites</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {supportedSites.map((site) => (
            <Badge
              key={site}
              variant="secondary"
              className="text-lg justify-center py-2"
            >
              {site}
            </Badge>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6">Plans</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Basic Plan</CardTitle>
              <CardDescription>Free - For casual users</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>5 summaries per day</li>
                <li>Access to basic summarization model</li>
                <li>Web-based interface</li>
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Premium Plan</CardTitle>
              <CardDescription>
                $6.99 USD / Month - For power users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2">
                <li>Unlimited summaries</li>
                <li>
                  Access to advanced AI models
                  <Badge variant="secondary" className="ml-2">
                    Coming Soon
                  </Badge>
                </li>
                <li>
                  API access for integration
                  <Badge variant="secondary" className="ml-2">
                    Coming Soon
                  </Badge>
                </li>
                <li>
                  Priority support
                  <Badge variant="secondary" className="ml-2">
                    Coming Soon
                  </Badge>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
