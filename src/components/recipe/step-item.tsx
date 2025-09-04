"use client";

import Image from "next/image";

interface Step {
  id: number;
  stepNumber: number;
  content: string;
  imageUrl?: string;
}

interface StepItemProps {
  step: Step;
}

export function StepItem({ step }: StepItemProps) {
  return (
    <div className="flex gap-4">
      <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
        <span className="font-bold text-lg">{step.stepNumber}</span>
      </div>
      <div className="flex-1 pt-0.5">
        <p className="text-base leading-relaxed">{step.content}</p>
        {step.imageUrl && (
          <div className="mt-3">
            <Image
              src={step.imageUrl}
              alt={`Step ${step.stepNumber}`}
              width={300}
              height={200}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}