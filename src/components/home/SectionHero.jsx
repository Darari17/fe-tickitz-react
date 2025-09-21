import React from "react";

export const SectionHero = () => {
  return (
    <section className="flex flex-col lg:flex-row justify-between px-6 lg:px-12 py-10 gap-8">
      <div className="flex-2">
        <p className="text-[#1D4ED8] font-bold text-[18px]/[34px] tracking-[0.75px] font-[Mulish]">
          MOVIE TICKET PURCHASES #1 IN INDONESIA
        </p>
        <p className="text-[#121212] font-medium text-[32px]/[48px] md:text-[48px]/[70px] tracking-[1px] font-[Mulish]">
          Experience the Magic of Cinema: Book Your Tickets Today
        </p>
        <p className="text-[#A0A3BD] font-normal text-[16px]/[28px] md:text-[16px]/[32px] tracking-[0.75px]">
          Sign up and get the ticket with a lot of discount
        </p>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-2 h-fit">
        <div className="row-start-1 col-start-1">
          <img
            src="/images/john-whick-1.svg"
            alt="John Wick"
            className="w-full h-auto"
          />
        </div>

        <div className="row-start-1 row-end-3 col-start-2">
          <img
            src="/images/lion-king-2.svg"
            alt="Lion King"
            className="w-full h-auto"
          />
        </div>

        <div className="row-start-2 row-end-4 col-start-1">
          <img
            src="/images/spiderman-3.svg"
            alt="Spiderman"
            className="w-full h-auto"
          />
        </div>

        <div className="row-start-3 col-start-2">
          <img
            src="/images/roblox-4.svg"
            alt="Roblox"
            className="w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};
