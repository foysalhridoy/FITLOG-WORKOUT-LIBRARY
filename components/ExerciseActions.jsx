"use client";

import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "../context/PlanContext";

export default function ExerciseActions({ exerciseId }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="btn btn-accent rounded-2xl"
        onClick={() => addToPlan(exerciseId)}
      >
        <CalendarPlus className="h-4 w-4" aria-hidden="true" />
        Add to today&apos;s plan
      </button>
      <button
        type="button"
        className="btn btn-outline rounded-2xl"
        onClick={() => addToSaved(exerciseId)}
      >
        <Bookmark className="h-4 w-4" aria-hidden="true" />
        Save for later
      </button>
    </div>
  );
}
