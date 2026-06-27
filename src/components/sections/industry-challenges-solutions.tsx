import { HexIcon } from "@/components/ui/hex-icon";

type Props = {
  challengesTitle: string;
  challenges: string[];
  solutionsTitle: string;
  solutionsIntro: string;
  solutions: string[];
};

export function IndustryChallengesSolutions({
  challengesTitle,
  challenges,
  solutionsTitle,
  solutionsIntro,
  solutions,
}: Props) {
  return (
    <section className="bg-white py-10 lg:py-16">
      <div className="container flex flex-col gap-5 lg:flex-row lg:justify-start lg:items-start lg:gap-16">

        {/* Challenges */}
        <div className="flex-1 self-stretch p-5 lg:p-7 bg-neutral-100 rounded-xl flex flex-col gap-5 lg:gap-6">
          <h3 className="text-stone-900 text-xl lg:text-2xl font-medium font-montserrat leading-7 lg:leading-8 line-clamp-5">
            {challengesTitle}
          </h3>
          <div className="flex flex-col">
            {challenges.map((c, i) => (
              <div key={i} className="self-stretch py-2.5 lg:py-3 border-b border-neutral-200 flex flex-col justify-center items-start gap-1.25">
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <HexIcon size={14} color="#d4d4d4" className="mt-0.5" />
                  <p className="flex-1 text-stone-900 text-sm font-medium font-montserrat leading-5">{c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Solutions */}
        <div className="flex-1 p-5 lg:p-7 bg-red-50 rounded-xl flex flex-col gap-5 lg:gap-6">
          <div className="flex flex-col gap-2 lg:gap-3">
            <h3 className="text-red-600 text-xl lg:text-2xl font-medium font-montserrat leading-7 lg:leading-8 line-clamp-5">
              {solutionsTitle}
            </h3>
            <p className="text-stone-900 text-sm font-medium font-montserrat leading-5">
              {solutionsIntro}
            </p>
          </div>
          <div className="flex flex-col">
            {solutions.map((s, i) => (
              <div key={i} className="self-stretch py-2.5 lg:py-3 border-b border-neutral-200 flex flex-col justify-center items-start">
                <div className="self-stretch inline-flex justify-start items-start gap-2">
                  <HexIcon size={14} className="mt-0.5" />
                  <p className="flex-1 text-stone-900 text-sm font-medium font-montserrat leading-5">{s}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
