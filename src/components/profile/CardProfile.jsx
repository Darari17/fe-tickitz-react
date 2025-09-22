import { useSelector, useDispatch } from "react-redux";
import { updateProfile, getUser } from "../../store/slices/profileSlice";
import { toast } from "react-toastify";

export const CardProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(updateProfile({ avatar: file }))
        .unwrap()
        .then(() => {
          toast.success("Avatar updated!");
          dispatch(getUser());
        })
        .catch((err) => toast.error(err));
    }
  };

  if (loading) {
    return (
      <section className="font-[Mulish] w-70 flex flex-col gap-7 bg-white rounded-lg p-5">
        <span>Loading...</span>
      </section>
    );
  }

  const displayName =
    profile?.firstname && profile?.firstname.trim() !== ""
      ? `${profile.firstname} ${profile.lastname ?? ""}`
      : profile?.email || user?.email || "Guest";

  return (
    <section className="font-[Mulish] w-70 flex flex-col gap-7 bg-white rounded-lg p-5">
      <div className="flex justify-between">
        <span>INFO</span>
        <img src="/logos/dot-horizontal.svg" alt="dot" />
      </div>

      <div className="flex justify-center relative">
        <label htmlFor="avatar-upload" className="cursor-pointer">
          <img
            src={
              profile?.avatar
                ? `http://localhost:8080/img/${profile.avatar}`
                : "/images/ava-profile.svg"
            }
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover hover:opacity-80"
          />
        </label>
        <input
          type="file"
          id="avatar-upload"
          accept="image/*"
          className="hidden"
          onChange={handleAvatarChange}
        />
      </div>

      <div className="flex flex-col justify-center items-center border-b-2 border-[#DEDEDE]">
        <span className="font-semibold text-[20px]/[34px] text-center">
          {displayName}
        </span>
        <span className="font-normal text-[#4E4B66] text-[14px]/[24px] pb-10">
          Moviegoers
        </span>
      </div>

      <div>
        <span className="font-semibold text-[16px]/[28px] text-[#4E4B66]">
          Loyalty Points
        </span>
      </div>

      <div className="relative flex flex-col justify-between items-start gap-2 text-white bg-blue-700 rounded-lg h-40 p-4 overflow-hidden">
        <span className="text-lg font-bold">Moviegoers</span>
        <span className="text-2xl font-semibold">
          {profile?.point ?? 0}{" "}
          <span className="text-sm font-normal">points</span>
        </span>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bg-[#FFFFFF4D] rounded-full w-32 h-32 right-0 bottom-25 translate-x-8 overflow-hidden"></div>
          <div className="absolute bg-[#FFFFFF4D] rounded-full w-32 h-32 right-0 bottom-20 translate-x-15 overflow-hidden"></div>
          <img src="/images/star.svg" alt="star" className="absolute right-0" />
        </div>
      </div>

      <div className="w-full flex flex-col items-center gap-2">
        <span className="font-normal text-[16px]/[32px] text-[#4E4B66]">
          {180 - (profile?.point ?? 0)} points become a master
        </span>

        <div className="w-[248px] h-4 bg-[#f5f6f8] rounded-lg overflow-hidden">
          <div
            className="h-full bg-[#1d4ed8] rounded-lg"
            style={{
              width: `${Math.min(((profile?.point ?? 0) / 180) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};
