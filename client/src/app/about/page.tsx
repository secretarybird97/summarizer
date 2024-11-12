import PlanCard from "@/components/features/planCard";
export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="grid grid-cols-2 items-center justify-items-center min-h-screen pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="justify-items-center w-10/12 ">
          <h1 className="font-bold ">About Summarizer</h1>
          <p className="text-justify">
            Summarizer is an AI assisted tool focused on generating article
            summaries either through the URL or plain text.
            <br /> Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Maiores expedita cumque facere dolorem nemo est tenetur unde, fugit
            ipsam dignissimos natus! Laudantium quis quas repudiandae quaerat,
            sequi doloribus commodi quae! Lorem ipsum, dolor sit amet
            consectetur adipisicing elit. Temporibus, nostrum placeat, corporis
            omnis tempora aliquam incidunt praesentium, repudiandae architecto
            dolores sit natus minus ab nihil magnam minima fuga quo qui. <br />
            <br />
          </p>
          <h3 className="font-bold ">List of supported sites:</h3>
          <ul className="list-disc list-inside">
            <li>Example</li>
            <li>Example</li>
            <li>Example</li>
          </ul>
        </div>
        <PlanCard />
      </main>
    </div>
  );
}
