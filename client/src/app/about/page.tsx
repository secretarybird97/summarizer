import BasicPlanCard from "@/components/features/BasicPlanCard";
import PremiumPlanCard from "@/components/features/PremiumPlanCard";
export default function Page() {
  return (
    <div className="flex flex-col">
      <main className="grid grid-cols-1 justify-items-center pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="justify-items-center w-8/12">
          <h1 className="font-bold text-4xl text-NavText mb-4">About Summarizer</h1>
          <p className="text-justify w-8/12">
            Summarizer is an AI assisted tool focused on generating article summaries either through the URL or plain text. It uses web scraping tools to 
            get the text from the article, then generates a summary through a generative model.
            <br />
          </p>
          <h1 className="font-bold text-3xl text-NavText mt-20 mb-4">List of supported sites:</h1>
          <ul className="list-disc list-inside">
            <li>Dailymail</li>
            <li>Reuters</li>
          </ul>

          <h1 className="font-bold text-3xl text-NavText mt-20 mb-4">Plans</h1>
          <div className="grid grid-cols-2 justify-items-center">
            <BasicPlanCard />
            <PremiumPlanCard />
          </div>
          <h1 className="font-bold text-3xl text-NavText mt-20 mb-4">Technologies Used:</h1>
          <p>This project was created using the following tools and technologies.</p>
          <ul className="list-disc list-inside">
            <li>BeautifulSoup</li>
            <li>BART model</li>
            <li>REDIS Cache</li>
            <li>Next.js</li>
            <li>PostgreSQL</li>
          </ul>
        </div>
         
        
      </main>
    </div>
  );
}
