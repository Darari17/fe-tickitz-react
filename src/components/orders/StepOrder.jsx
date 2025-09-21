import React from "react";

export const StepOrder = ({ currentStep = 2 }) => {
  const steps = [
    { id: 1, label: "Dates & Time" },
    { id: 2, label: "Seat" },
    { id: 3, label: "Payment" },
  ];

  return (
    <section className="flex flex-row justify-center items-center gap-4 mx-8 mb-4">
      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep;
        const isActive = step.id === currentStep;

        const bgColor = isCompleted
          ? "bg-green-700 text-white"
          : isActive
          ? "bg-blue-700 text-white"
          : "bg-gray-300 text-gray-700";

        const content = isCompleted ? "✓" : step.id;

        return (
          <>
            <div key={step.id} className="flex items-center">
              <div className="flex flex-col items-center justify-between gap-1 w-14 h-16">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${bgColor}`}
                >
                  {content}
                </div>
                <div className="text-xs text-center w-max font-[Mulish]">
                  {step.label}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className="border-b border-dashed border-gray-400 h-min w-10"></div>
              )}
            </div>
          </>
        );
      })}
    </section>
  );
};
