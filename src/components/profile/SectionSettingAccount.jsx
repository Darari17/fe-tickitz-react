import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  changePassword,
  getUser,
} from "../../store/slices/profileSlice";
import { useState, useEffect } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";

const profileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email("Email tidak valid").optional(),
  phoneNumber: z.string().optional(),
  oldPassword: z.string().optional(),
  newPassword: z.string().optional(),
});

export const SectionSettingAccount = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [showNewPassword, setShowNewPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      oldPassword: "",
      newPassword: "",
    },
  });

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    if (profile || user) {
      reset({
        firstName: profile?.firstname || "",
        lastName: profile?.lastname || "",
        email: user?.email || "",
        phoneNumber: profile?.phone_number || "",
      });
    }
  }, [profile, user, reset]);

  const onSubmit = async (data) => {
    try {
      await dispatch(
        updateProfile({
          firstName: data.firstName || undefined,
          lastName: data.lastName || undefined,
          phoneNumber: data.phoneNumber || undefined,
        })
      ).unwrap();

      if (data.newPassword) {
        await dispatch(
          changePassword({
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
          })
        ).unwrap();
      }

      toast.success("Perubahan berhasil disimpan!");
      dispatch(getUser());
    } catch (err) {
      toast.error(err || "Gagal menyimpan perubahan");
    }
  };

  return (
    <div className="max-w-full font-[Mulish] text-[#4E4B66]">
      {/* Details Info */}
      <div className="bg-white rounded-lg mb-5 p-10">
        <h2 className="text-xl font-bold mb-6 text-black border-b-2 border-[#DEDEDE] pb-2">
          Details Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("firstName")}
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>
          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("lastName")}
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
          {/* Email (readonly) */}
          <div>
            <label className="block text-sm font-medium mb-1">E-mail</label>
            <input
              type="email"
              readOnly
              className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              {...register("email")}
            />
          </div>
          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              className="w-full p-2 border border-gray-300 rounded"
              {...register("phoneNumber")}
            />
            {errors.phoneNumber && (
              <p className="text-sm text-red-500 mt-1">
                {errors.phoneNumber.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg mb-5 p-10">
        <h2 className="text-xl font-bold mb-6 text-black border-b-2 border-[#DEDEDE] pb-2">
          Change Password
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Old Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Old Password
            </label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter old password"
              {...register("oldPassword")}
            />
          </div>
          {/* New Password */}
          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              New Password
            </label>
            <input
              type={showNewPassword ? "text" : "password"}
              className="w-full p-2 border border-gray-300 rounded pr-10"
              placeholder="Write your password"
              {...register("newPassword")}
            />
            <span
              onClick={() => setShowNewPassword((p) => !p)}
              className="absolute right-3 bottom-3 cursor-pointer text-gray-500"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </span>
            {errors.newPassword && (
              <p className="text-sm text-red-500 mt-1">
                {errors.newPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Update button */}
      <div className="flex justify-start">
        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 cursor-pointer text-white font-medium py-2 px-6 rounded-lg"
        >
          Update changes
        </button>
      </div>
    </div>
  );
};
