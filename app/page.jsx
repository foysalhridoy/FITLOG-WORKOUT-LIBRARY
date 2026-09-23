import React from "react";
import Image from "next/image";
import { Dumbbell } from "lucide-react";
import LibrarySection from "../components/LibrarySection";
import { getAllExercises } from "../lib/api";

export const metadata = {
  title: "FitLog — Workout Library",
  description:
    "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

export default async function HomePage() {
  const exercises = await getAllExercises();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid items-center gap-10 rounded-2xl border border-base-300 bg-base-200 p-8 lg:grid-cols-2 lg:p-12">
        <div className="space-y-5">
          <p className="font-heading text-sm tracking-[0.2em] text-primary uppercase">
            WORKOUT LIBRARY
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl font-heading font-bold uppercase tracking-tight">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="max-w-md text-base-content/75">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a
            className="btn btn-accent rounded-2xl gap-2 font-heading tracking-wide uppercase"
            href="#library"
          >
            <Dumbbell className="h-4 w-4" aria-hidden="true" />
            BROWSE WORKOUTS
          </a>
        </div>
        <div className="flex justify-center">
          <Image
            alt="Gym Illustration"
            width={500}
            height={400}
            priority
            className="w-full max-w-md object-contain"
            src="/banner.png"
          />
        </div>
      </section>

      {/* The Library Section with Search */}
      <LibrarySection exercises={exercises} />
    </div>
  );
}
