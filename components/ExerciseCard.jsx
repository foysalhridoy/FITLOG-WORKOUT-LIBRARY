import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Clock, Flame, Star } from "lucide-react";

export default function ExerciseCard({ exercise }) {
  return (
    <Link
      className="card rounded-2xl border border-base-300 bg-base-200 transition hover:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      href={`/exercise/${exercise.id}`}
    >
      <figure className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <Image
          alt={`${exercise.name} demonstration`}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          src={exercise.image}
        />
      </figure>
      <div className="card-body gap-3 p-5">
        <div className="flex flex-wrap gap-2">
          {exercise.muscleGroups?.map((group) => (
            <span key={group} className="badge badge-primary badge-sm">
              {group}
            </span>
          ))}
        </div>
        <h2 className="card-title font-heading text-xl normal-case tracking-tight">
          {exercise.name}
        </h2>
        <p className="text-sm text-base-content/70">{exercise.equipment}</p>
        <div className="flex flex-wrap items-center gap-4 text-sm">
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4 text-primary" aria-hidden="true" />
            {exercise.duration} min
          </span>
          <span className="inline-flex items-center gap-1">
            <Flame className="h-4 w-4 text-primary" aria-hidden="true" />
            {exercise.caloriesBurned} kcal
          </span>
          <span className="inline-flex items-center gap-1">
            <Star className="h-4 w-4 text-primary" aria-hidden="true" />
            {typeof exercise.rating === "number" ? exercise.rating.toFixed(1) : exercise.rating}
          </span>
        </div>
      </div>
    </Link>
  );
}
