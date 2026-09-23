"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Dumbbell, Menu } from "lucide-react";
import { usePlan } from "../context/PlanContext";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="navbar mx-auto max-w-6xl px-4">
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-square"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-50 mt-3 w-52 rounded-2xl border border-base-300 bg-base-200 p-2 shadow-lg"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={pathname === link.href ? "bg-base-300 font-semibold text-accent" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            className="flex items-center gap-2 font-heading text-xl font-bold tracking-wider uppercase text-base-content"
            href="/"
          >
            <Dumbbell className="h-6 w-6 text-primary" aria-hidden="true" />
            FITLOG
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={isActive ? "bg-base-200 font-semibold text-accent" : ""}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-2">
          <Link
            className="btn btn-ghost btn-sm gap-2"
            aria-label="Today's plan"
            href="/my-plan"
          >
            Plan
            <span className="badge badge-primary badge-sm">{planIds.length}</span>
          </Link>
          <Link
            className="btn btn-ghost btn-sm gap-2"
            aria-label="Saved workouts"
            href="/my-plan"
          >
            Saved
            <span className="badge badge-outline badge-sm">{savedIds.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
