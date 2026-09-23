import React from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getExerciseById, getAllExercises } from "../../../lib/api";
import ExerciseActions from "../../../components/ExerciseActions";

export async function generateMetadata({ params }) {
  const exercise = await getExerciseById(params.id);
  if (!exercise) {
    return {
      title: "Exercise Not Found | FitLog",
    };
  }
  return {
    title: `${exercise.name} | FitLog`,
    description: exercise.description,
  };
}

export async function generateStaticParams() {
  const exercises = await getAllExercises();
  return exercises.map((ex) => ({
    id: String(ex.id),
  }));
}

export default async function ExerciseDetailPage({ params }) {
  const exercise = await getExerciseById(params.id);

  if (!exercise) {
    notFound();
  }

  return (
    <article className="grid gap-10 lg:grid-cols-2">
      <div className="relative min-h-72 overflow-hidden rounded-2xl border border-base-300">
        <Image
          alt={`${exercise.name} demonstration`}
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          src={exercise.image}
        />
      </div>

      <div>
        <h1 className="text-4xl font-heading">{exercise.name}</h1>
        <p className="mt-4 text-base-content/75">{exercise.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {exercise.muscleGroups?.map((group) => (
            <span key={group} className="badge badge-primary">
              {group}
            </span>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-base-300 overflow-hidden rounded-2xl border border-base-300">
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Equipment</dt>
            <dd>{exercise.equipment}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Difficulty</dt>
            <dd>{exercise.difficulty}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Sets</dt>
            <dd>{exercise.sets}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Reps</dt>
            <dd>{exercise.reps}</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Duration</dt>
            <dd>{exercise.duration} min</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Calories</dt>
            <dd>{exercise.caloriesBurned} kcal</dd>
          </div>
          <div className="grid grid-cols-1 gap-1 bg-base-200 px-4 py-3 sm:grid-cols-2 sm:items-center">
            <dt className="font-heading text-sm">Rating</dt>
            <dd>{exercise.rating}</dd>
          </div>
        </dl>

        <h2 className="mt-8 text-2xl font-heading">Instructions</h2>
        <ol className="mt-4 list-decimal space-y-3 pl-5">
          {exercise.instructions?.map((inst, index) => (
            <li key={index}>{inst}</li>
          ))}
        </ol>

        <ExerciseActions exerciseId={exercise.id} />
      </div>
    </article>
  );
}
