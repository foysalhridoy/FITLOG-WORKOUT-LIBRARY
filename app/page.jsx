import React from "react";
import Image from "next/image";
import ExerciseCard from "../components/ExerciseCard";
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
          <p className="font-heading text-sm tracking-[0.2em] text-primary">
            Workout Library
          </p>
          <h1 className="text-4xl leading-tight sm:text-5xl">
            Train with intent. Log every set.
          </h1>
          <p className="max-w-md text-base-content/75">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
            today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <a className="btn btn-accent rounded-2xl" href="#library">
            Browse Workouts
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

      {/* The Library Section */}
      <section id="library" className="space-y-6">
        <div>
          <h2 className="text-3xl">The Library</h2>
          <p className="mt-2 text-base-content/70">
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
