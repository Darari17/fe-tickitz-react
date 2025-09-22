import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import z from "zod";
import { createOrder } from "../store/slices/orderSlice";

const schema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(8, "Phone number is required"),
  paymentMethod: z.string().min(1, "Please select a payment method"),
});

export const PaymentPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    selectedMovie,
    date,
    time,
    cinema,
    selectedSeats = [],
    scheduleId,
  } = useSelector((state) => state.order || {});

  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { paymentMethod: "" },
  });

  const selectedMethod = watch("paymentMethod");
  const [isModal, setModal] = useState(false);

  const pricePerTicket = 10;
  const numberOfTickets = selectedSeats.length;
  const totalPayment = numberOfTickets * pricePerTicket;

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email, { shouldValidate: true });
    }
  }, [user, setValue]);

  const payments = [
    { id: 1, name: "GPay", logo: "/logos/google-pay-logo.svg" },
    { id: 2, name: "Visa", logo: "/logos/visa-logo.svg" },
    { id: 3, name: "Gopay", logo: "/logos/gopay-logo.svg" },
    { id: 4, name: "PayPal", logo: "/logos/paypal-logo.svg" },
    { id: 5, name: "Dana", logo: "/logos/dana-logo.svg" },
    { id: 6, name: "BCA", logo: "/logos/bca-logo.svg" },
    { id: 7, name: "BRI", logo: "/logos/bri-logo.svg" },
    { id: 8, name: "OVO", logo: "/logos/ovo-logo.svg" },
  ];

  const onSubmit = async (data) => {
    if (!scheduleId) {
      alert("Mohon pilih Date, Time, Location, dan Cinema terlebih dahulu");
      return;
    }
    if (selectedSeats.length === 0) {
      alert("Mohon pilih kursi terlebih dahulu");
      return;
    }

    const orderData = {
      schedule_id: scheduleId,
      payment_id: Number(data.paymentMethod),
      seat_codes: selectedSeats,
      fullname: data.fullName,
      email: data.email,
      phone: "+62" + data.phoneNumber,
    };

    try {
      const resultAction = await dispatch(createOrder(orderData));
      if (createOrder.fulfilled.match(resultAction)) {
        openModal();
      } else {
        alert(
          "Gagal membuat order: " +
            (resultAction.payload || "Terjadi kesalahan di server")
        );
      }
    } catch (err) {
      alert("Terjadi error: " + err.message);
    }
  };

  const onCheckPayment = () => {
    navigate("/result");
  };

  return (
    <main className="bg-[#A0A3BD33] h-full py-10 relative">
      {/* step indicator */}
      <section className="flex flex-row justify-center items-center gap-4 mx-8 mb-4">
        <div className="flex flex-col items-center justify-between w-14 h-16 ">
          <div className="flex items-center justify-center bg-green-600 text-white w-10 h-10 rounded-full">
            ✓
          </div>
          <div className="text-xs text-center w-max font-[Mulish]">
            Dates & Time
          </div>
        </div>
        <div className="border-b border-dashed border-gray-400 h-min w-10"></div>
        <div className="flex flex-col items-center justify-between gap-2 w-14 h-16">
          <div className="flex items-center justify-center bg-green-600 text-white w-10 h-10 rounded-full">
            ✓
          </div>
          <div className="text-xs font-[Mulish]">Seat</div>
        </div>
        <div className="border-b border-dashed border-gray-400 h-min w-10"></div>
        <div className="flex flex-col items-center justify-between gap-2 w-14 h-16">
          <div className="flex items-center justify-center bg-blue-700 text-white w-10 h-10 rounded-full">
            3
          </div>
          <div className="text-xs font-[Mulish]">Payment</div>
        </div>
      </section>

      <form
        className="flex flex-col items-center w-full mb-12"
        onSubmit={handleSubmit(onSubmit)}
      >
        <section className="bg-white border border-black w-150 rounded-md">
          {/* payment info */}
          <div className="flex flex-col items-start px-8 py-6">
            <div className="font-bold text-lg font-[Mulish]">Payment Info</div>
            <div className="w-full py-2">
              <div className="text-xs text-gray-400 font-[Mulish]">
                DATE & TIME
              </div>
              <div className="border-b border-gray-200 leading-6 font-[Mulish]">
                {date} at {time}
              </div>
            </div>
            <div className="w-full py-2">
              <div className="text-xs text-gray-400 font-[Mulish]">
                MOVIE TITLE
              </div>
              <div className="border-b border-gray-200 leading-6 font-[Mulish]">
                {selectedMovie?.title || "-"}
              </div>
            </div>
            <div className="w-full py-2">
              <div className="text-xs text-gray-400 font-[Mulish]">
                CINEMA NAME
              </div>
              <div className="border-b border-gray-200 leading-6 font-[Mulish]">
                {cinema?.name || "-"}
              </div>
            </div>
            <div className="w-full py-2">
              <div className="text-xs text-gray-400 font-[Mulish]">
                NUMBER OF TICKETS
              </div>
              <div className="border-b border-gray-200 leading-6">
                {numberOfTickets} pieces
              </div>
            </div>
            <div className="w-full py-2">
              <div className="text-xs text-gray-400 font-[Mulish]">
                TOTAL PAYMENT
              </div>
              <div className="border-b border-gray-200 text-blue-700 text-xs font-bold leading-6 font-[Mulish]">
                ${totalPayment}
              </div>
            </div>
          </div>

          {/* personal info */}
          <div className="relative flex flex-col items-start px-8">
            <div className="font-bold text-lg font-[Mulish]">
              Personal Information
            </div>
            <div className="flex flex-col w-full py-2 gap-1">
              <label className="text-xs text-gray-500 font-[Mulish]">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Input Name"
                className="h-10 pl-6 border rounded-md w-full"
                {...register("fullName")}
              />
              {errors.fullName && (
                <p className="text-xs text-red-500">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <div className="flex flex-col w-full py-2 gap-1">
              <label className="text-xs text-gray-500 font-[Mulish]">
                Email
              </label>
              <input
                type="email"
                className="h-10 pl-6 border rounded-md w-full bg-gray-100 cursor-not-allowed"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="flex flex-col w-full py-2 gap-1 relative">
              <label className="text-xs text-gray-500 font-[Mulish]">
                Phone Number
              </label>
              <span className="absolute text-xs text-gray-500 left-6 top-[38px] border-r border-gray-300 pr-2">
                +62
              </span>
              <input
                type="tel"
                placeholder="Input Phone Number"
                className="h-10 pl-16 border rounded-md w-full"
                {...register("phoneNumber")}
              />
              {errors.phoneNumber && (
                <p className="text-xs text-red-500">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>

          {/* payment method */}
          <div className="flex flex-col items-start px-8 py-6">
            <div className="font-bold text-lg py-2 font-[Mulish]">
              Payment Method
            </div>
            <input type="hidden" {...register("paymentMethod")} />
            <div className="grid grid-cols-4 gap-5 w-full py-2">
              {payments.map((pm) => (
                <button
                  key={pm.id}
                  type="button"
                  onClick={() =>
                    setValue("paymentMethod", String(pm.id), {
                      shouldValidate: true,
                    })
                  }
                  className={`h-14 w-full border-2 rounded-md bg-white hover:cursor-pointer flex justify-center items-center p-1 ${
                    selectedMethod === String(pm.id)
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <img src={pm.logo} alt={pm.name} className="h-6" />
                </button>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-xs text-red-500">
                {errors.paymentMethod.message}
              </p>
            )}
            <div className="w-full py-2">
              <button
                type="submit"
                className="h-10 w-full rounded bg-blue-700 text-white font-bold text-sm tracking-wide font-[Mulish]"
              >
                Pay your order
              </button>
            </div>
          </div>
        </section>
      </form>

      {isModal && (
        <div className="w-screen h-full absolute inset-0 z-10 bg-black/40">
          <section className="flex justify-center items-center absolute inset-0">
            <div className="bg-white shadow-md rounded-md w-full max-w-md p-6">
              <div className="text-xl font-semibold mb-4 font-[Mulish]">
                Payment Info
              </div>

              {/* Payment method info */}
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm text-gray-600 font-[Mulish]">
                  Payment Method:
                </div>
                <div className="flex items-center gap-2 text-sm font-medium font-[Mulish]">
                  {(() => {
                    const method = payments.find(
                      (pm) => String(pm.id) === selectedMethod
                    );
                    return method ? (
                      <>
                        <img
                          src={method.logo}
                          alt={method.name}
                          className="h-5"
                        />
                        <span>{method.name}</span>
                      </>
                    ) : (
                      "-"
                    );
                  })()}
                </div>
              </div>

              {/* Total payment */}
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-600 font-[Mulish]">
                  Total Payment:
                </div>
                <div className="text-lg font-bold text-blue-700 font-[Mulish]">
                  ${totalPayment}
                </div>
              </div>

              {/* Due date dinamis */}
              <div className="text-sm text-gray-600 mb-4 font-[Mulish]">
                Pay this payment bill before it is due,{" "}
                <span className="font-semibold font-[Mulish]">
                  {new Date(
                    Date.now() + 24 * 60 * 60 * 1000
                  ).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                . If the bill has not been paid by the specified time, it will
                be forfeited.
              </div>

              {/* Buttons */}
              <div className="flex gap-4 flex-col">
                <button
                  onClick={onCheckPayment}
                  className="bg-blue-700 text-white px-4 py-2 rounded-md font-[Mulish]"
                >
                  Check Payment
                </button>
                <button
                  onClick={closeModal}
                  className="bg-transparent text-[#1D4ED8]"
                >
                  Pay Later
                </button>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};
