"use client";

import React, { useState, useMemo } from "react";
import { Search } from "lucide-react";
import ExerciseCard from "./ExerciseCard";

export default function LibrarySection({ exercises = [] }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredExercises = useMemo(() => {
    if (!searchTerm.trim()) return exercises;
    const q = searchTerm.toLowerCase().trim();
    return exercises.filter(
      (ex) =>
        ex.name.toLowerCase().includes(q) ||
        ex.equipment.toLowerCase().includes(q) ||
        ex.muscleGroups.some((mg) => mg.toLowerCase().includes(q))
    );
  }, [exercises, searchTerm]);

  return (
    <section id="library" className="space-y-6 scroll-mt-24">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-3xl font-heading">The Library</h2>
          <p className="mt-2 text-base-content/70">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name or muscle..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered input-sm w-full rounded-2xl pl-9 bg-base-200"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-base-content/50" />
        </div>
      </div>

      {filteredExercises.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-200 p-8 text-center text-base-content/70">
          No workouts found matching &quot;{searchTerm}&quot;.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredExercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      )}
    </section>
  );
}
