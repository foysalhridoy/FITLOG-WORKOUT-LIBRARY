import React from "react";

export function HomeSkeleton() {
  return (
    <div className="space-y-8">
      <div className="skeleton h-64 w-full rounded-2xl"></div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="space-y-3 rounded-2xl border border-base-300 p-4">
            <div className="skeleton h-40 w-full rounded-2xl"></div>
            <div className="skeleton h-4 w-1/3"></div>
            <div className="skeleton h-6 w-2/3"></div>
            <div className="skeleton h-4 w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ExerciseDetailSkeleton() {
  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <div className="skeleton min-h-72 w-full rounded-2xl"></div>
      <div className="space-y-4">
        <div className="skeleton h-10 w-2/3"></div>
        <div className="skeleton h-24 w-full"></div>
        <div className="skeleton h-48 w-full"></div>
      </div>
    </div>
  );
}

export function PlanSkeleton() {
  return (
    <div className="space-y-6">
      <div className="skeleton h-10 w-48"></div>
      <div className="skeleton h-24 w-full rounded-2xl"></div>
      <div className="skeleton h-28 w-full rounded-2xl"></div>
      <div className="skeleton h-28 w-full rounded-2xl"></div>
    </div>
  );
}
