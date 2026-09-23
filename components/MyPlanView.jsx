"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Flame, Star, X, ChevronDown, ChevronUp } from "lucide-react";
import { usePlan } from "../context/PlanContext";
import { getAllExercises } from "../lib/api";

const sortOptions = [
  { value: "duration", label: "Duration" },
  { value: "calories", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function MyPlanView() {
  const {
    planIds,
    savedIds,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sortRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortOpen(false);
      }
    }
    if (isSortOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isSortOpen]);

  useEffect(() => {
    let canceled = false;
    getAllExercises()
      .then((data) => {
        if (!canceled) setExercises(data);
      })
      .finally(() => {
        if (!canceled) setIsLoading(false);
      });
    return () => {
      canceled = true;
    };
  }, []);

  const activeIds = activeTab === "plan" ? planIds : savedIds;

  const sortedItems = useMemo(() => {
    const filtered = exercises.filter((ex) => activeIds.includes(ex.id));
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }
      return b.rating - a.rating;
    });
    return sorted;
  }, [exercises, activeIds, sortBy]);

  const totals = useMemo(() => {
    return sortedItems.reduce(
      (acc, item) => ({
        minutes: acc.minutes + item.duration,
        calories: acc.calories + item.caloriesBurned,
      }),
      { minutes: 0, calories: 0 }
    );
  }, [sortedItems]);

  const currentSortLabel =
    sortOptions.find((opt) => opt.value === sortBy)?.label || "Duration";

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <header className="space-y-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-normal uppercase tracking-wide text-white">
          MY PLAN
        </h1>
        <p className="text-sm sm:text-base font-normal text-base-content/70">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 rounded-2xl border border-base-300 bg-base-200 overflow-hidden shadow-none">
        <div className="flex flex-col gap-1 p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-base-300">
          <span className="text-xs font-normal text-base-content/60">Exercises</span>
          <span className="font-heading text-3xl sm:text-4xl font-normal text-primary">
            {sortedItems.length}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-base-300">
          <span className="text-xs font-normal text-base-content/60">Minutes</span>
          <span className="font-heading text-3xl sm:text-4xl font-normal text-white">
            {totals.minutes}
          </span>
        </div>
        <div className="flex flex-col gap-1 p-5 sm:p-6">
          <span className="text-xs font-normal text-base-content/60">Calories</span>
          <span className="font-heading text-3xl sm:text-4xl font-normal text-white">
            {totals.calories}
          </span>
        </div>
      </div>

      {/* Tabs and Sort controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Pill Tab Switcher */}
        <div className="inline-flex items-center gap-1 rounded-xl border border-base-300 bg-base-200/90 p-1 w-fit">
          <button
            type="button"
            onClick={() => setActiveTab("plan")}
            className={`rounded-lg px-4 py-1.5 text-xs sm:text-sm font-normal transition-colors ${
              activeTab === "plan"
                ? "bg-base-100 text-primary shadow-sm"
                : "text-base-content/60 hover:text-base-content"
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("saved")}
            className={`rounded-lg px-4 py-1.5 text-xs sm:text-sm font-normal transition-colors ${
              activeTab === "saved"
                ? "bg-base-100 text-primary shadow-sm"
                : "text-base-content/60 hover:text-base-content"
            }`}
          >
            Saved
          </button>
        </div>

        {/* Custom Sort By Dropdown */}
        <div className="relative flex flex-col items-start sm:items-end" ref={sortRef}>
          <span className="text-xs sm:text-sm text-base-content/70 font-normal mb-1.5">
            Sort By
          </span>
          <button
            type="button"
            onClick={() => setIsSortOpen((prev) => !prev)}
            className="w-48 sm:w-56 px-4 py-2 rounded-xl border border-base-300 bg-base-200 text-sm text-white flex items-center justify-between cursor-pointer focus:outline-none focus:ring-1 focus:ring-white/40"
            aria-haspopup="listbox"
            aria-expanded={isSortOpen}
          >
            <span>{currentSortLabel}</span>
            <span className="text-[10px] text-base-content/70">
              {isSortOpen ? "▲" : "▼"}
            </span>
          </button>

          {/* Floating Dropdown Menu */}
          {isSortOpen && (
            <div
              role="listbox"
              className="absolute right-0 top-full mt-1.5 w-48 sm:w-56 rounded-xl border border-base-300 bg-base-200 p-1.5 shadow-2xl z-30 space-y-0.5"
            >
              {sortOptions.map((opt) => {
                const isSelected = sortBy === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => {
                      setSortBy(opt.value);
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 text-left text-sm rounded-lg transition-colors ${
                      isSelected
                        ? "text-white font-normal bg-base-300/40"
                        : "text-base-content/70 hover:text-white hover:bg-base-300"
                    }`}
                  >
                    <span className="w-4 text-xs font-semibold text-white">
                      {isSelected ? "✓" : ""}
                    </span>
                    <span>{opt.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Workout list / Loading / Empty states */}
      {isLoading ? (
        <div className="rounded-2xl border border-base-300 bg-base-200 p-10 text-center">
          <p className="text-lg font-heading font-normal uppercase tracking-wide text-white">
            Loading workouts…
          </p>
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="rounded-2xl border border-base-300 bg-base-200 p-12 sm:p-16 flex flex-col items-center justify-center text-center space-y-3">
          <h2 className="font-heading text-lg sm:text-xl font-normal uppercase tracking-wider text-white">
            NOTHING HERE YET
          </h2>
          <p className="text-sm font-normal text-base-content/70">
            Browse the library and add a lift to get today moving.
          </p>
          <div className="pt-2">
            <Link
              href="/"
              className="btn btn-accent rounded-full px-7 py-2.5 font-normal text-sm normal-case text-neutral hover:brightness-110"
            >
              Go to workouts
            </Link>
          </div>
        </div>
      ) : (
        <ul className="space-y-4">
          {sortedItems.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-base-300 bg-base-200 p-4 sm:flex-row sm:items-center"
            >
              <div className="relative h-28 w-full shrink-0 overflow-hidden rounded-2xl sm:h-24 sm:w-36">
                <Image
                  src={item.image}
                  alt={`${item.name} thumbnail`}
                  fill
                  className="object-cover"
                  sizes="144px"
                />
              </div>

              <div className="min-w-0 flex-1">
                <h2 className="font-heading text-lg sm:text-xl font-normal uppercase tracking-wide text-white">
                  {item.name}
                </h2>
                <p className="text-xs sm:text-sm font-normal text-base-content/60 mt-0.5">
                  {item.equipment}
                </p>
                <div className="mt-2 flex flex-wrap gap-4 text-xs sm:text-sm font-normal text-base-content/80">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    {item.duration} min
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
                    {item.caloriesBurned} kcal
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Star className="h-4 w-4 text-primary" aria-hidden="true" />
                    {typeof item.rating === "number"
                      ? item.rating.toFixed(1)
                      : item.rating}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/exercise/${item.id}`}
                  className="btn btn-sm btn-outline rounded-full font-normal normal-case text-xs px-4"
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button
                    type="button"
                    className="btn btn-sm btn-accent rounded-full font-normal normal-case text-neutral text-xs px-4"
                    onClick={() => markAsDone(item)}
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Mark as Done
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-ghost btn-square rounded-full text-base-content/70 hover:text-error"
                  aria-label={`Remove ${item.name}`}
                  onClick={() =>
                    activeTab === "plan"
                      ? removeFromPlan(item.id)
                      : removeFromSaved(item.id)
                  }
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
