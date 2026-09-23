"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Flame, Star, X } from "lucide-react";
import { usePlan } from "../context/PlanContext";
import { getAllExercises } from "../lib/api";

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
  const [exercises, setExercises] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-heading text-3xl sm:text-4xl font-normal uppercase tracking-wide text-white">My Plan</h1>
        <p className="text-base-content/70">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Metrics Summary Row */}
      <div className="stats stats-vertical w-full rounded-2xl border border-base-300 bg-base-200 shadow-none sm:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Exercises</div>
          <div className="stat-value text-primary">{sortedItems.length}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Minutes</div>
          <div className="stat-value">{totals.minutes}</div>
        </div>
        <div className="stat">
          <div className="stat-title">Calories</div>
          <div className="stat-value">{totals.calories}</div>
        </div>
      </div>

      {/* Tabs and Sort controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div role="tablist" className="tabs tabs-box w-fit bg-base-200">
          <button
            type="button"
            role="tab"
            className={`tab ${activeTab === "plan" ? "tab-active text-accent" : ""}`}
            aria-selected={activeTab === "plan"}
            onClick={() => setActiveTab("plan")}
          >
            Today&apos;s Plan
          </button>
          <button
            type="button"
            role="tab"
            className={`tab ${activeTab === "saved" ? "tab-active text-accent" : ""}`}
            aria-selected={activeTab === "saved"}
            onClick={() => setActiveTab("saved")}
          >
            Saved
          </button>
        </div>

        <label className="form-control w-full max-w-xs">
          <span className="label-text mb-1">Sort By</span>
          <select
            className="select select-bordered rounded-2xl"
            value={sortBy}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "duration" || val === "calories" || val === "rating") {
                setSortBy(val);
              }
            }}
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </label>
      </div>

      {/* Workout list / Loading / Empty states */}
      {isLoading ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200 p-10 text-center">
          <p className="text-lg font-heading">Loading workouts…</p>
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200 p-10 text-center">
          <p className="text-lg font-heading">Nothing here yet</p>
          <p className="mt-2 text-base-content/70">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn btn-accent mt-6 rounded-2xl">
            Go to workouts
          </Link>
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
                <h2 className="font-heading text-xl normal-case">{item.name}</h2>
                <p className="text-sm text-base-content/70">{item.equipment}</p>
                <div className="mt-2 flex flex-wrap gap-3 text-sm">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
                    {item.duration} min
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
                    {item.caloriesBurned} kcal
                  </span>
                  <span className="inline-flex items-center gap-1">
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
                  className="btn btn-sm btn-outline rounded-2xl"
                >
                  View Details
                </Link>
                {activeTab === "plan" && (
                  <button
                    type="button"
                    className="btn btn-sm btn-accent rounded-2xl"
                    onClick={() => markAsDone(item)}
                  >
                    <Check className="h-4 w-4" aria-hidden="true" />
                    Mark as Done
                  </button>
                )}
                <button
                  type="button"
                  className="btn btn-sm btn-ghost btn-square rounded-2xl"
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
