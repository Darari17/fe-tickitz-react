export const Subscriber = () => {
  return (
    <div className="flex justify-center items-center relative px-6 lg:px-12 py-10">
      <form className="flex flex-col justify-center items-center w-full bg-[#2563eb] rounded-[20px] gap-7 py-10 px-6 relative overflow-hidden">
        <div className="text-[#ffffff] font-normal text-4xl/[50px] tracking-wider text-center">
          Subscribe to our newsletter
        </div>

        <div className="flex flex-col lg:flex-row lg:justify-center lg:items-center gap-5 w-full lg:pr-20">
          <input
            type="text"
            placeholder="First name"
            className="bg-[#2563eb] rounded-[9px] border border-[#d4d4d8] text-white font-normal h-14 pl-2.5 w-full lg:w-52"
          />
          <input
            type="text"
            placeholder="Email address"
            className="bg-[#2563eb] rounded-[9px] border border-[#d4d4d8] text-white h-14 pl-2.5 w-full lg:w-56"
          />
          <button className="bg-white rounded-[9px] text-[18px]/[28px] font-bold text-[#1d4ed8] cursor-pointer h-14 w-full lg:w-56 mb-20 lg:mb-0">
            Subscribe Now
          </button>
        </div>

        <div className="absolute border-6 border-white w-[150px] h-[150px] lg:w-[200px] lg:h-[200px] rounded-full right-0 bottom-0 translate-x-1/3 translate-y-2/3 pointer-events-none"></div>
      </form>
    </div>
  );
};
