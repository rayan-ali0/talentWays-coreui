import React, { useRef, useEffect, useState } from "react";
import checkIcon from "../../assets/images/checked-icon.svg";


interface IStepItem {
  title: string;
  content: React.ReactNode;
}

interface IStepperProps {
  steps: IStepItem[];
  currentStep: number;
  maxAllowedStep?: number;
  onStepClick?: (stepIndex: number) => void;
}

export const Stepper: React.FC<IStepperProps> = ({ 
  steps, 
  currentStep, 
  maxAllowedStep,
  onStepClick 
}) => {
  const previousStep = useRef(currentStep);
  const [progressWidths, setProgressWidths] = useState<number[]>([]);

  let allowedStep = maxAllowedStep ? maxAllowedStep : currentStep;
  
  useEffect(() => {
    const newWidths = steps.map((_, index) => {
      if (index < currentStep - 1) return 100;
      if (index === currentStep - 1 && previousStep.current > currentStep) return 0;
      return 0;
    });
    
    setProgressWidths(newWidths);
    previousStep.current = currentStep;
  }, [currentStep, steps]);

  const handleStepClick = (index: number) => {
    if (onStepClick && index < allowedStep) {
      onStepClick(index + 1);
    }
  };
  
  return (
    <>
      <ol className="flex items-start justify-center gap-5 md:gap-4 w-full text-sm text-center sm:text-base sm:px-4 max-lg:flex-wrap">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep - 1;
          const isActive = index === currentStep - 1;
          const isLastStep = index === steps.length - 1;
          const isClickable = index < allowedStep;
          
          return (
            <li
              key={index}
              className={`relative flex items-start ${!isLastStep ? "lg:w-[16.67%]" : ""}`}
            >
              <span className="flex items-center gap-1 lg:flex-col">
                <div
                  className={`flex items-center justify-center w-9 h-9 rounded-full border-2 transition-all duration-500
                    ${
                      isCompleted || isActive
                        ? "bg-aegold-500 text-whitely-50 border-aegold-500"
                        : "bg-whitely-100 text-aeblack-400 border-aeblack-100"
                    }
                    ${isActive ? "ring-aegold-100 ring-4" : ""}
                    ${isClickable ? "cursor-pointer hover:opacity-80" : "opacity-50 cursor-not-allowed"}`}
                  aria-current={isActive ? "step" : undefined}
                  onClick={() => handleStepClick(index)}
                  role={isClickable ? "button" : undefined}
                  tabIndex={isClickable ? 0 : -1}
                >
                  {isCompleted ? (
                    <img src={checkIcon} alt="Completed" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span
                  className={`text-sm font-medium w-24  md:text-wrap block ${
                    isActive
                      ? "text-aegold-500"
                      : isCompleted
                      ? "text-aegold-500"
                      : isClickable
                      ? "text-aeblack-800"
                      : "text-aeblack-800"
                  }`}
                >
                  {step.title}
                </span>
              </span>
              {!isLastStep && (
                <div className="w-full h-[2px] bg-slate-300 mt-6 rounded-full overflow-hidden">
                  <div
                    className="h-full transition-all duration-500"
                    style={{
                      width: `${progressWidths[index]}%`,
                      backgroundColor: isCompleted ? "#a68d5e" : "bg-slate-300",
                    }}
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
      {steps[currentStep - 1]?.content && (
        <div className="mt-6 text-xs sm:text-sm">
          {steps[currentStep - 1].content}
        </div>
      )}
    </>
  );
};
