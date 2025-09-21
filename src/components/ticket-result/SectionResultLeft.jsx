export const SectionResultLeft = () => {
  return (
    <>
      <section className="flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 py-6 md:px-25 md:py-10 bg-[url('/images/bg-ticket-result.svg')] bg-center object-cover bg-black/30 bg-blend-overlay text-white h-auto md:h-[920px] bg-no-repeat bg-cover flex-1 gap-5">
        <div>
          <img src="/logos/tickitz-logo-white.svg" alt="" />
        </div>
        <div className="font-bold text-[22px] md:text-[28px] leading-[1] tracking-[0.3%]">
          Thankyou For Purchasing
        </div>
        <div className="text-white/70 text-[14px] md:text-[18px] py-2 md:py-3 leading-[1] ">
          Lorem ipsum dolor sit amet consectetur. Quam
          <br />
          pretium pretium tempor integer sed magna et.
        </div>
        <div className="py-2 md:py-4">
          <a href="text-white font-bold text-[16px] no-underline">
            Please Download Your Ticket →
          </a>
        </div>
      </section>
    </>
  );
};
