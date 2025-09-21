export const AddNewMovie = () => {
  return (
    <section className="bg-white w-full rounded-lg font-[Mulish] p-10 ">
      <h1 className="font-bold text-[24px] mb-6">Add New Movie</h1>

      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <span className="font-normal text-[16px] text-[#696F79]">
            Upload Image
          </span>
          <label
            htmlFor="upload"
            className="bg-blue-600 px-6 py-1 rounded-md font-bold text-[12px]/[28px] text-white cursor-pointer w-fit"
          >
            Upload
          </label>
          <input type="file" id="upload" className="hidden" />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="movie-name"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Movie Name
          </label>
          <input
            type="text"
            id="movie-name"
            className="border border-[#DEDEDE] rounded-md p-2"
            placeholder="Enter movie name"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="category"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Category
          </label>
          <input
            type="text"
            id="category"
            className="border border-[#DEDEDE] rounded-md p-2"
            placeholder="Action, Adventure, Sci-Fi"
          />
        </div>

        <div className="flex justify-between gap-4">
          <div className="flex flex-col flex-1">
            <label
              htmlFor="release-date"
              className="font-normal text-[#4E4B66] text-[16px]"
            >
              Release Date
            </label>
            <input
              type="date"
              id="release-date"
              className="border border-[#DEDEDE] rounded-md p-2"
            />
          </div>

          <div className="flex flex-col flex-1">
            <label className="font-normal text-[#4E4B66] text-[16px]">
              Duration (hour / minute)
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                className="border border-[#DEDEDE] rounded-md p-2 w-1/2"
                placeholder="2"
              />
              <input
                type="number"
                min="0"
                className="border border-[#DEDEDE] rounded-md p-2 w-1/2"
                placeholder="13"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="director-name"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Director Name
          </label>
          <input
            type="text"
            id="director-name"
            className="border border-[#DEDEDE] rounded-md p-2"
            placeholder="Jon Watts"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="cast"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Cast
          </label>
          <input
            type="text"
            id="cast"
            className="border border-[#DEDEDE] rounded-md p-2"
            placeholder="Tom Holland, Michael Keaton, Robert Downey Jr."
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="synopsis"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Synopsis
          </label>
          <textarea
            name="synopsis"
            id="synopsis"
            rows="4"
            className="border border-[#DEDEDE] rounded-md p-2"
            placeholder="Enter synopsis..."
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="location"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Add Location
          </label>
          <input
            type="text"
            id="location"
            className="border border-[#DEDEDE] rounded-md p-2"
            placeholder="Purwokerto, Bandung, Bekasi"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="set-date"
            className="font-normal text-[#4E4B66] text-[16px]"
          >
            Set Date & Time
          </label>
          <input
            type="date"
            id="set-date"
            className="border border-[#DEDEDE] rounded-md p-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-bold text-blue-600 text-xl cursor-pointer">
            +
          </span>
          <input
            type="time"
            className="border border-[#DEDEDE] rounded-md p-2"
          />
          <input
            type="time"
            className="border border-[#DEDEDE] rounded-md p-2"
          />
        </div>

        <div className="w-full mt-5 border-t pt-5 border-[#DEDEDE]">
          <button
            type="submit"
            className="bg-[#1D4ED8] w-full text-white font-bold text-[17px]/[28px] rounded-md tracking-[0.75px] py-2"
          >
            Save Movie
          </button>
        </div>
      </form>
    </section>
  );
};
