import { CardChoose } from "./CardChoose";

export const SectionChoose = () => {
  return (
    <section className="flex flex-col px-6 lg:px-12 py-10">
      <div className="text-[#1D4ED8] font-bold text-[18px]/[34px] tracking-[0.75px] font-[Mulish]">
        WHY CHOOSE US
      </div>
      <div className="text-[#121212] font-normal text-[32px]/[45px] tracking-[1px] mb-5">
        Unleashing the Ultimate Movie Experience
      </div>
      <div className="flex flex-row gap-3 mt-4">
        <CardChoose
          icon={"/logos/icon-choose-guaranteed.svg"}
          altIcon={"Guaranteed"}
          title={"Guaranteed"}
        />
        <CardChoose
          icon={"/logos/icon-choose-affordable.svg"}
          altIcon={"Affordable"}
          title={"Affordable"}
        />
        <CardChoose
          icon={"/logos/icon-choose-cs.svg"}
          altIcon={"24/7 Customer Supportanteed"}
          title={"24/7 Customer Support"}
        />
      </div>
    </section>
  );
};
