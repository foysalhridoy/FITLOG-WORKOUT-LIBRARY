"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { usePlan } from "../context/PlanContext";

const navLinks = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { planIds, savedIds } = usePlan();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-base-300 bg-base-100/95 backdrop-blur">
      <nav className="navbar mx-auto max-w-6xl px-3 sm:px-4">
        <div className="navbar-start gap-1 sm:gap-2">
          {/* Mobile hamburger menu with toggle */}
          <div className="relative lg:hidden" ref={menuRef}>
            <button
              type="button"
              className="btn btn-ghost btn-square btn-sm sm:btn-md"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
            >
              {isOpen ? (
                <X className="h-5 w-5 text-accent" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>

            {isOpen && (
              <ul className="menu menu-sm absolute left-0 top-full mt-2 w-52 rounded-2xl border border-base-300 bg-base-200 p-2 shadow-xl z-50">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`font-normal text-sm ${
                          isActive
                            ? "bg-base-300 text-accent"
                            : "text-base-content/80 hover:text-base-content"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>

          <Link
            className="flex items-center gap-1.5 sm:gap-2 font-heading text-lg sm:text-xl font-normal tracking-wider uppercase text-base-content"
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
              className="h-5 w-5 sm:h-6 sm:w-6 text-primary"
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
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`font-normal text-sm ${
                      isActive
                        ? "bg-base-200 text-accent"
                        : "text-base-content/80 hover:text-base-content"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="navbar-end gap-1.5 sm:gap-2">
          <Link
            className="btn btn-ghost btn-xs sm:btn-sm gap-1.5 sm:gap-2 font-normal normal-case px-2 sm:px-3"
            aria-label="Today's plan"
            href="/my-plan"
          >
            Plan
            <span className="badge badge-primary badge-sm font-normal">{planIds.length}</span>
          </Link>
          <Link
            className="btn btn-ghost btn-xs sm:btn-sm gap-1.5 sm:gap-2 font-normal normal-case px-2 sm:px-3"
            aria-label="Saved workouts"
            href="/my-plan"
          >
            Saved
            <span className="badge badge-outline badge-sm font-normal">{savedIds.length}</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
