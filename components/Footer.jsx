import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-base-300 bg-base-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-6 text-center sm:flex-row sm:gap-4 sm:py-8 sm:text-left">
        <Link
          className="flex items-center justify-center gap-2 font-heading text-lg font-normal tracking-wider uppercase text-base-content"
          href="/"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-5 w-5 text-primary"
            aria-hidden="true"
          >
            <path d="M17.596 12.768a2 2 0 1 0 2.829-2.829l-1.768-1.767a2 2 0 0 0 2.828-2.829l-2.828-2.828a2 2 0 0 0-2.829 2.828l-1.767-1.768a2 2 0 1 0-2.829 2.829z" />
            <path d="m2.5 21.5 1.4-1.4" />
            <path d="m20.1 3.9 1.4-1.4" />
            <path d="M5.343 21.485a2 2 0 1 0 2.829-2.828l1.767 1.768a2 2 0 1 0 2.829-2.829l-6.364-6.364a2 2 0 1 0-2.829 2.829l1.768 1.767a2 2 0 0 0-2.828 2.829z" />
            <path d="m9.6 14.4 4.8-4.8" />
          </svg>
          FITLOG
        </Link>
        <p className="text-xs sm:text-sm text-base-content/70 text-center sm:text-right leading-relaxed">
          © 2026 FitLog - Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
