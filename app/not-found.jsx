import React from "react";
import Link from "next/link";

export const metadata = {
  title: "404 - Missed that lift | FitLog",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-6 py-16 text-center">
      <svg
        viewBox="0 0 320 240"
        className="w-full max-w-sm"
        role="img"
        aria-label="Stylized gym illustration with a barbell"
      >
        <rect width="320" height="240" rx="24" fill="#1A1D23" />
        <rect
          x="24"
          y="24"
          width="272"
          height="192"
          rx="16"
          fill="#0F1115"
          stroke="#2A2E38"
        />
        <circle
          cx="86"
          cy="120"
          r="34"
          fill="#252830"
          stroke="#C4F000"
          strokeWidth="4"
        />
        <circle
          cx="234"
          cy="120"
          r="34"
          fill="#252830"
          stroke="#C4F000"
          strokeWidth="4"
        />
        <rect
          x="112"
          y="112"
          width="96"
          height="16"
          rx="4"
          fill="#C4F000"
        />
        <rect
          x="48"
          y="104"
          width="14"
          height="32"
          rx="3"
          fill="#E8EAEF"
        />
        <rect
          x="258"
          y="104"
          width="14"
          height="32"
          rx="3"
          fill="#E8EAEF"
        />
      </svg>
      <h1 className="text-4xl font-heading">404 - Missed that lift</h1>
      <p className="max-w-md text-base-content/70">
        The page you wanted is not in the library. Head back to the floor and
        pick a workout that exists.
      </p>
      <Link href="/" className="btn btn-accent rounded-2xl">
        Back to workouts
      </Link>
    </div>
  );
}
