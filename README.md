# 💪 FitLog — Workout Library & Routine Planner

> **Live Reference Replication**: [FitLog Live Site](https://workout-library-nine.vercel.app/)  
> **Course Assignment**: B14-A6-Fit Log

FitLog is a modern, dark-themed gym companion web application built with **Next.js 14 (App Router)**, **Tailwind CSS**, and **DaisyUI**. It empowers users to browse 12 foundational gym workouts across every major muscle group, build a focused daily workout plan (capped at 5 lifts), save workouts for later, track active session metrics, and log sets with real-time feedback.

---

## 🚀 Live Demo & Repository
- **Live Deployment**: https://workout-library-nine.vercel.app/
- **GitHub Repository**: https://github.com/your-username/B14-A6-Fit-Log

---

## 🛠️ Technologies Used
- **Next.js 14 (App Router)**: Hybrid Server & Client Components, Dynamic Routing (`/exercise/[id]`), Static Site Generation (SSG), and custom 404 handler.
- **React 18**: State hooks, Context API for persistent global workout logging, and memoized metrics.
- **Tailwind CSS & DaisyUI**: Precision custom `fitlog` theme matching the Figma design system (`#0f1115` base, `#c4f000` electric lime accent).
- **Google Fonts (`next/font`)**: Display font **Oswald** for bold display headings and **Inter** for crisp body typography.
- **Lucide React**: Clean, modern icons for fitness metrics, actions, and navigation.
- **React Hot Toast**: Polished, theme-matched toast notification system.
- **Local Storage API**: Persistent state management for Today's Plan, Saved list, Weekly calorie logs, and Muscle group tracking.

---

## 🌟 Key Features (Minimum 5 Requirements)
1. **Interactive Workout Library**:
   - 12 comprehensive lifts covering all primary muscle groups (Chest, Arms, Back, Legs, Shoulders, Core, Full Body).
   - Displayed in a responsive 3x4 card grid with tags, equipment, duration, calorie burn, and community ratings.
   - Smooth anchor scrolling from the Hero section directly to `#library`.

2. **Detailed Workout Specifications (`/exercise/[id]`)**:
   - Comprehensive two-column layout with high-resolution demonstration imagery.
   - Key specifications table: Equipment, Difficulty, Target Sets, Rep Ranges, Duration, Calorie Output, and Ratings.
   - 4-step structured execution instructions for flawless form.
   - One-click actions to add directly to Today's Plan or Save for Later with toast feedback.

3. **Live Navbar Counters & Sticky Navigation**:
   - Real-time badges for **Plan** (filled electric lime pill) and **Saved** (outline pill) updating synchronously across all pages.
   - Active route highlighting and fully collapsible mobile hamburger menu.

4. **Dynamic Daily Plan Manager (`/my-plan`)**:
   - Live **Metrics Summary Row** displaying active exercise count, total training minutes, and projected caloric expenditure.
   - Tab switcher between **Today's Plan** and **Saved** workouts.
   - 5-lift cap validation preventing overtraining with helpful warning notifications.
   - Empty state illustrations and prompts when lists are cleared.

5. **Sorting & Completion Tracking (Challenge C1 & C3)**:
   - Dynamic sorting dropdown to organize routines by **Duration**, **Calories**, or **Rating**.
   - **Mark as Done** action with checkmark icon: logs burned calories and duration to the weekly tracker, updates muscle group tallies, removes the exercise from the active list, and triggers a confirmation toast.
   - Instant **Remove (X)** action with undo capability.

6. **Custom 404 Error Experience**:
   - Branded 404 page featuring a custom SVG gym barbell illustration, error copy ("404 — Missed that lift"), and a direct call to action to return to the library.

---

## 📅 Deadlines & Marks Distribution
- **60 Marks**: 26 September | ⏱️ 11:59 PM
- **50 Marks**: 27 September | ⏱️ 11:59 PM
- **30 Marks**: Any time after 27 September 2026

---

## 📡 API Endpoints
- **All Data**: `https://api.abcz.workers.dev/api/fitlog`
- **Single Item**: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 💻 Local Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/B14-A6-Fit-Log.git
   cd B14-A6-Fit-Log
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm run start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📬 Submission Checklist
- [x] Responsive layout tested on Mobile, Tablet, and Desktop
- [x] Minimum 8 Git commits with descriptive messages
- [x] Production build passes without errors
- [x] All 50 Marks main requirements implemented
- [x] All 10 Marks challenge requirements implemented (Sort dropdown, Mark as Done, Remove, README)
- [x] Optional localStorage persistence and 5-lift cap implemented
- [x] Custom 404 page with barbell illustration