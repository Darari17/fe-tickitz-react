export const CardChoose = ({ icon, altIcon, title }) => {
  return (
    <section className="flex flex-col h-max gap-3">
      <div className="rounded-full bg-[#1D4ED833] w-12 h-12 flex justify-center items-center">
        <img src={icon} alt={altIcon} />
      </div>
      <div className="font-bold text-[18px]/[24px] text-[#18181B] font-[mulish]">
        {title}
      </div>
      <div className="font-normal text-[16px]/[32px] text-[#A0A3BD] font-[Mulish] tracking-[0.75px] text-balance">
        Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin
        faucibus nibh et sagittis a. Lacinia purus ac amet.
      </div>
    </section>
  );
};
