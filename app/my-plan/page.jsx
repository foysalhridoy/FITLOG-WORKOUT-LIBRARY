"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, Clock, Flame, Star, X, Search } from "lucide-react";
import { usePlan } from "../../context/PlanContext";
import { getAllExercises } from "../../lib/api";

export default function MyPlanPage() {
  const {
    planIds,
    savedIds,
    markAsDone,
    removeFromPlan,
    removeFromSaved,
    isMounted,
  } = usePlan();

  const [activeTab, setActiveTab] = useState("plan");
  const [sortBy, setSortBy] = useState("duration");
  const [searchTerm, setSearchTerm] = useState("");
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

  const tabExercises = useMemo(() => {
    return exercises.filter((ex) => activeIds.includes(ex.id));
  }, [exercises, activeIds]);

  const sortedItems = useMemo(() => {
    let list = [...tabExercises];
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase().trim();
      list = list.filter(
        (ex) =>
          ex.name.toLowerCase().includes(q) ||
          ex.equipment.toLowerCase().includes(q) ||
          ex.muscleGroups.some((mg) => mg.toLowerCase().includes(q))
      );
    }
    list.sort((a, b) => {
      if (sortBy === "duration") {
        return a.duration - b.duration;
      }
      if (sortBy === "calories") {
        return a.caloriesBurned - b.caloriesBurned;
      }
      return b.rating - a.rating;
    });
    return list;
  }, [tabExercises, searchTerm, sortBy]);

  const totals = useMemo(() => {
    return tabExercises.reduce(
      (acc, item) => ({
        minutes: acc.minutes + (item.duration || 0),
        calories: acc.calories + (item.caloriesBurned || 0),
      }),
      { minutes: 0, calories: 0 }
    );
  }, [tabExercises]);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-4xl font-heading">My Plan</h1>
        <p className="text-base-content/70">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      {/* Metrics Summary Row */}
      <div className="stats stats-vertical w-full rounded-2xl border border-base-300 bg-base-200 shadow-none sm:stats-horizontal">
        <div className="stat">
          <div className="stat-title">Exercises</div>
          <div className="stat-value text-primary">{tabExercises.length}</div>
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

      {/* Tabs, Search, and Sort controls */}
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

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {tabExercises.length > 0 && (
            <div className="relative">
              <input
                type="text"
                placeholder="Filter lifts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered input-sm rounded-2xl pl-8 bg-base-200 w-full sm:w-44"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-base-content/50" />
            </div>
          )}

          <label className="form-control w-full sm:w-auto">
            <span className="sr-only">Sort By</span>
            <select
              className="select select-bordered select-sm rounded-2xl bg-base-200"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="duration">Sort by: Duration</option>
              <option value="calories">Sort by: Calories</option>
              <option value="rating">Sort by: Rating</option>
            </select>
          </label>
        </div>
      </div>

      {/* Workout list / Loading / Empty states */}
      {isLoading || !isMounted ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200 p-10 text-center">
          <p className="text-lg font-heading">Loading workouts…</p>
        </div>
      ) : tabExercises.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200 p-10 text-center">
          <p className="text-lg font-heading uppercase tracking-wide">NOTHING HERE YET</p>
          <p className="mt-2 text-base-content/70">
            Browse the library and add a lift to get today moving.
          </p>
          <Link href="/" className="btn btn-accent mt-6 rounded-2xl">
            Go to workouts
          </Link>
        </div>
      ) : sortedItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200 p-8 text-center text-base-content/70">
          No workouts found matching &quot;{searchTerm}&quot;.
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
