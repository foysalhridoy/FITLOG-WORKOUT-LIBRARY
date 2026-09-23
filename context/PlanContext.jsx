"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  getPlan,
  getSaved,
  addToPlan as storageAddToPlan,
  addToSaved as storageAddToSaved,
  removeFromPlan as storageRemoveFromPlan,
  removeFromSaved as storageRemoveFromSaved,
  logWorkout as storageLogWorkout,
  logMuscleGroups as storageLogMuscleGroups,
} from "../lib/storage";

const PlanContext = createContext(null);

export function PlanProvider({ children }) {
  const [planIds, setPlanIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setPlanIds(getPlan());
    setSavedIds(getSaved());
    setIsMounted(true);
  }, []);

  const addToPlan = useCallback((exerciseId) => {
    const res = storageAddToPlan(exerciseId);
    if (res === "added") {
      setPlanIds(getPlan());
      toast.success("Added to today's plan");
    } else if (res === "duplicate") {
      toast.error("Already in your plan");
    } else if (res === "full") {
      toast.error("Today's plan is full — finish these first!");
    }
  }, []);

  const addToSaved = useCallback((exerciseId) => {
    const res = storageAddToSaved(exerciseId);
    if (res === "added") {
      setSavedIds(getSaved());
      toast.success("Saved for later");
    } else if (res === "duplicate") {
      toast.error("Already in your saved list");
    }
  }, []);

  const removeFromPlan = useCallback((exerciseId) => {
    storageRemoveFromPlan(exerciseId);
    setPlanIds(getPlan());
    toast.success("Removed from today's plan");
  }, []);

  const removeFromSaved = useCallback((exerciseId) => {
    storageRemoveFromSaved(exerciseId);
    setSavedIds(getSaved());
    toast.success("Removed from saved");
  }, []);

  const markAsDone = useCallback((exercise) => {
    storageLogWorkout(exercise.caloriesBurned, exercise.duration);
    storageLogMuscleGroups(exercise.muscleGroups);
    storageRemoveFromPlan(exercise.id);
    setPlanIds(getPlan());
    toast.success("Workout logged — nice work");
  }, []);

  const value = useMemo(
    () => ({
      planIds,
      savedIds,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      markAsDone,
      isMounted,
    }),
    [planIds, savedIds, addToPlan, addToSaved, removeFromPlan, removeFromSaved, markAsDone, isMounted]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1A1D23",
            color: "#E8EAEF",
            border: "1px solid #2A2E38",
          },
        }}
      />
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }
  return context;
}
