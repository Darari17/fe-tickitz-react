import { useState } from "react";
import { SectionSettingAccount } from "./SectionSettingAccount";
import { OrderHistory } from "./OrderHistory";

export const CardSettingChoice = () => {
  const [active, setActive] = useState("account");

  return (
    <div className="flex flex-col w-full font-[Mulish] ">
      <section className="flex flex-row items-center justify-start gap-[1.875rem] p-5 bg-white rounded-lg min-w-0 h-min">
        <button
          onClick={() => setActive("account")}
          className={`flex items-center justify-center font-normal text-lg leading-[2.125rem] tracking-[0.04688rem] ${
            active === "account"
              ? "border-b-2 border-[#1d4ed8] text-black"
              : "text-[#aaaaaa]"
          }`}
        >
          Account Settings
        </button>

        <button
          onClick={() => setActive("order")}
          className={`flex items-center justify-center font-normal text-lg leading-[2.125rem] tracking-[0.04688rem] ${
            active === "order"
              ? "border-b-2 border-[#1d4ed8] text-black"
              : "text-[#aaaaaa]"
          }`}
        >
          Order History
        </button>
      </section>

      <div className="my-10">
        {active === "account" && <SectionSettingAccount />}
        {active === "order" && <OrderHistory />}
      </div>
    </div>
  );
};
