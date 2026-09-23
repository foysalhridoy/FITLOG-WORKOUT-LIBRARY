import React from "react";
import Image from "next/image";
import ExerciseCard from "../components/ExerciseCard";
import { getAllExercises } from "../lib/api";

export const metadata = {
  title: "FitLog - Workout Library",
  description:
    "Browse gym workouts, build today's plan, and track weekly calories with FitLog.",
};

export default async function HomePage() {
  const exercises = await getAllExercises();

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="grid items-center gap-8 sm:gap-10 rounded-2xl border border-base-300 bg-base-200 p-5 sm:p-8 lg:grid-cols-2 lg:p-12">
        <div className="space-y-6">
          <p className="font-heading text-xs font-normal tracking-[0.2em] text-primary uppercase sm:text-sm">
            WORKOUT LIBRARY
          </p>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-normal uppercase leading-[1.08] tracking-wide text-white">
            TRAIN WITH INTENT. LOG EVERY SET.
          </h1>
          <p className="max-w-md text-sm sm:text-base font-normal leading-relaxed text-base-content/70">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div>
            <a
              className="btn btn-accent rounded-full px-6 py-2.5 font-normal text-sm normal-case text-neutral hover:brightness-110"
              href="#library"
            >
              Browse Workouts
            </a>
          </div>
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

      {/* The Library Section */}
      <section id="library" className="space-y-4">
        <div>
          <h2 className="font-heading text-2xl sm:text-3xl font-normal uppercase tracking-wide text-white">
            THE LIBRARY
          </h2>
          <p className="mt-1 text-sm font-normal text-base-content/70">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {exercises.map((exercise) => (
            <ExerciseCard key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </section>
    </div>
  );
}
