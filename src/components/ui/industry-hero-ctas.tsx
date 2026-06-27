"use client";

const btnClass =
  "px-5 py-2.5 rounded-full ring-1 ring-inset ring-stone-500 text-white text-xs font-semibold font-montserrat uppercase leading-5 hover:bg-white/10 transition-colors duration-200";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function IndustryHeroCtas() {
  return (
    <div className="flex flex-wrap gap-5">
      <button className={btnClass} onClick={() => scrollTo("enquiry-form")}>
        Talk to an Expert
      </button>
      <button className={btnClass} onClick={() => scrollTo("recommended-products")}>
        See Recommended Products
      </button>
    </div>
  );
}
