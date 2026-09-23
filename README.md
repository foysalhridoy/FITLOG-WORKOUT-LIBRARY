# 🏋️ FitLog - Workout Library & Routine Planner

> A sleek, dark-themed gym companion and workout library web application designed to help fitness enthusiasts browse exercises, build focused daily routines, and track workout progress seamlessly.

[![Next.js 14](https://img.shields.io/badge/Next.js-14.2-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 18](https://img.shields.io/badge/React-18-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![DaisyUI](https://img.shields.io/badge/DaisyUI-4.12-5AD8E6?style=flat)](https://daisyui.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📌 Project Overview

**FitLog** is a dark, no-nonsense gym companion and workout planner built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **DaisyUI**. Users can explore 12 foundational gym workouts across every major muscle group, inspect detailed execution steps and specifications, curate a daily training routine (capped at 5 lifts), save workouts for later, and track metrics like duration and calories burned with real-time feedback.

- **🌐 Live Deployment**: [https://fitloog.vercel.app/](https://fitloog.vercel.app/)
- **📁 GitHub Repository**: [https://github.com/foysalhridoy/FITLOG-WORKOUT-LIBRARY](https://github.com/foysalhridoy/FITLOG-WORKOUT-LIBRARY)
- **🎯 Course Assignment**: B14-A6-Fit Log

---

## 🛠️ Technologies Used

| Technology | Category | Purpose |
| :--- | :--- | :--- |
| **Next.js 14 (App Router)** | Framework | Server & Client components, dynamic routing (`/exercise/[id]`), SSG, custom 404 handler |
| **React 18** | UI Library | Component-driven architecture, custom hooks, and React Context API for global state |
| **Tailwind CSS** | Styling | Utility-first CSS framework for responsive layout and custom color palettes |
| **DaisyUI 4** | UI Components | Semantic dark-theme components customized to the electric lime (`#c4f000`) theme |
| **Google Fonts (`next/font`)** | Typography | **Oswald** for modern display headings & brand logo; **Inter** for crisp readable body text |
| **Lucide React** | Icons | Crisp, lightweight icons for fitness metrics, actions, and navigation |
| **React Hot Toast** | Notifications | Non-intrusive, theme-matched toast notifications for user interactions |
| **LocalStorage API** | Persistence | Browser storage for Today's Plan, Saved list, and completion history |

---

## ✨ 5 Key Features

### 1. 📚 Foundational Workout Library Grid
- Features **12 comprehensive gym workouts** targeting all major muscle groups (Chest, Arms, Back, Legs, Shoulders, Core, Full Body).
- Displayed in a responsive 3x4 card layout with high-resolution demonstration imagery, muscle group badges, equipment tags, estimated duration, caloric expenditure, and community ratings.
- Smooth anchor scrolling (`Browse Workouts` CTA) connects the hero section directly to the workout library.

### 2. 🔍 Detailed Workout Specifications (`/exercise/[id]`)
- Two-column detail page featuring large demonstration imagery alongside comprehensive exercise specifications.
- Clear data breakdown: **Equipment**, **Difficulty Level**, **Target Sets**, **Repetition Ranges**, **Duration**, **Calories Burned**, and **Rating**.
- Step-by-step **4-stage execution guide** ensuring correct lifting form and injury prevention.
- Quick-action buttons to instantly add the exercise to **Today's Plan** or **Save for Later**.

### 3. 📋 Daily Plan Manager with 5-Lift Cap (`/my-plan`)
- Real-time **Metrics Summary Bar** calculating total planned exercises, cumulative training minutes, and estimated caloric output.
- Dedicated tab switcher between **Today's Plan** and **Saved Workouts**.
- **Overtraining Protection**: Enforces a strict 5-lift cap per daily session, alerting users with warning toasts when the quota is reached.
- Clean, branded empty state prompting users to browse the library when routines are empty.

### 4. ⚡ Dynamic Sorting & Completion Tracking
- **Interactive Sort By Filter**: Organize routines on-the-fly by **Duration**, **Calories Burned**, or **Community Rating**.
- **Mark as Done Action**: Completing an exercise logs duration and calories burned to the weekly tracker, updates muscle group history, removes it from the active plan, and triggers a congratulatory toast.
- One-click removal with confirmation feedback.

### 5. 📱 Fully Responsive & Device-Optimized Design
- Seamlessly adapts across all screen sizes: **Mobile (320px–640px)**, **Tablet (640px–1024px)**, and **Desktop (>1024px)**.
- Mobile-optimized navigation featuring an interactive hamburger menu with instant toggle, outside-click auto-close, and live status pill badges (`Plan` and `Saved` counters).
- Includes a custom branded **404 Page** featuring a gym barbell SVG illustration and direct route back to workouts.

---

## 📡 API Endpoints

The project integrates with the FitLog API backend with local offline fallback resilience:
- **All Exercises**: `https://api.abcz.workers.dev/api/fitlog`
- **Exercise Details**: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 💻 Getting Started Locally

### Prerequisites
- Node.js (v18.17 or higher recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/foysalhridoy/FITLOG-WORKOUT-LIBRARY.git
   cd FITLOG-WORKOUT-LIBRARY
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Navigate to https://fitloog.vercel.app/ to view the application.

4. **Build and run production bundle**:
   ```bash
   npm run build
   npm run start
   ```

---

## 📝 Assignment Requirements Checklist

- [x] **Cross-Device Responsiveness**: Verified on mobile, tablet, and desktop viewports.
- [x] **Git Commit History**: Over 20 meaningful, descriptive git commits on `main`.
- [x] **Error-Free Build**: Clean Next.js 14 production build (17/17 SSG pages pre-rendered).
- [x] **Navbar & Live Badges**: Real-time Plan and Saved counters, active link indicators, and mobile toggle.
- [x] **Workout Library**: 12 exercise cards with muscle tags, duration, calories, and ratings.
- [x] **Workout Detail View**: Image, specifications table, 4 instructions, and action buttons.
- [x] **My Plan Management**: Metrics overview, tab switching, and empty state CTA.
- [x] **Challenge C1 (Sorting)**: Sort routines by Duration, Calories, or Rating.
- [x] **Challenge C3 (Completion Tracking)**: Mark as Done logs stats and removes workout.
- [x] **Custom 404 Experience**: Branded barbell illustration and return CTA.
- [x] **Documentation**: Comprehensive README.md with project name, description, tech stack, and key features.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
