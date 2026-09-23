"use client";

import React from "react";
import { CalendarPlus, Bookmark } from "lucide-react";
import { usePlan } from "../context/PlanContext";

export default function ExerciseActions({ exerciseId }) {
  const { addToPlan, addToSaved, planIds } = usePlan();
  const isFull = planIds.length >= 5;
  const isPlanned = planIds.includes(exerciseId);

  return (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row">
      <button
        type="button"
        className="btn btn-accent rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isFull && !isPlanned}
        title={isFull && !isPlanned ? "Today's plan is full (max 5 lifts)" : ""}
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
