import BasicPlanCard from "@/components/features/BasicPlanCard";
import PremiumPlanCard from "@/components/features/PremiumPlanCard";
export default function Page() {
  return (
    <div className="flex flex-col">
      <main className="grid grid-cols-1 justify-items-center pb-20 font-[family-name:var(--font-geist-sans)]">
        <div className="justify-items-center w-8/12">
          <h1 className="font-bold text-4xl text-NavText mb-4">About Summarizer</h1>
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
          <h1 className="font-bold text-3xl text-NavText mt-20 mb-4">List of supported sites:</h1>
          <ul className="list-disc list-inside">
            <li>Example</li>
            <li>Example</li>
            <li>Example</li>
          </ul>

          <h1 className="font-bold text-3xl text-NavText mt-20 mb-4">Plans</h1>
          <div className="grid grid-cols-2 justify-items-center">
            <BasicPlanCard />
            <PremiumPlanCard />
          </div>
          <h1 className="font-bold text-3xl text-NavText mt-20 mb-4">Technologies Used:</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias veritatis ex suscipit doloremque laborum a quisquam repellendus autem impedit distinctio? Similique, cum illum. Numquam deleniti quod quia debitis nobis ad.</p>
          <ul className="list-disc list-inside">
            <li>Power of Friendship</li>
            <li>Internet</li>
            <li>Si sharp</li>
            <li>Ingles y español</li>
          </ul>
        </div>
         
        
      </main>
    </div>
  );
}
