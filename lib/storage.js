const PLAN_KEY = "fitlog-plan";
const SAVED_KEY = "fitlog-saved";
const WEEKLY_KEY = "fitlog-weekly";
const MUSCLES_KEY = "fitlog-muscles";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const DAY_INDEX_MAP = {
  0: "Sun",
  1: "Mon",
  2: "Tue",
  3: "Wed",
  4: "Thu",
  5: "Fri",
  6: "Sat",
};

function defaultWeekly() {
  return DAYS.map((d) => ({ day: d, calories: 0, minutes: 0 }));
}

function getItem(key, defaultValue) {
  if (typeof window === "undefined") return defaultValue;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

function setItem(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

export function getPlan() {
  const data = getItem(PLAN_KEY, []);
  return Array.isArray(data) && data.every((x) => typeof x === "number") ? data : [];
}

export function getSaved() {
  const data = getItem(SAVED_KEY, []);
  return Array.isArray(data) && data.every((x) => typeof x === "number") ? data : [];
}

export function addToPlan(id) {
  const current = getPlan();
  if (current.includes(id)) {
    return "duplicate";
  }
  if (current.length >= 5) {
    return "full";
  }
  const next = [...current, id];
  setItem(PLAN_KEY, next);
  return "added";
}

export function addToSaved(id) {
  const current = getSaved();
  if (current.includes(id)) {
    return "duplicate";
  }
  const next = [...current, id];
  setItem(SAVED_KEY, next);
  return "added";
}

export function removeFromPlan(id) {
  const current = getPlan();
  const next = current.filter((x) => x !== id);
  setItem(PLAN_KEY, next);
  return next;
}

export function removeFromSaved(id) {
  const current = getSaved();
  const next = current.filter((x) => x !== id);
  setItem(SAVED_KEY, next);
  return next;
}

export function getWeeklyLog() {
  const data = getItem(WEEKLY_KEY, defaultWeekly());
  if (Array.isArray(data) && data.length === 7) {
    return data;
  }
  return defaultWeekly();
}

export function logWorkout(calories, minutes) {
  const todayDay = DAY_INDEX_MAP[new Date().getDay()];
  if (!todayDay) return;
  const current = getWeeklyLog();
  const next = current.map((item) =>
    item.day === todayDay
      ? {
          ...item,
          calories: item.calories + calories,
          minutes: item.minutes + minutes,
        }
      : item
  );
  setItem(WEEKLY_KEY, next);
}

export function logMuscleGroups(muscleGroups = []) {
  const current = getItem(MUSCLES_KEY, {});
  const next = typeof current === "object" && current !== null ? { ...current } : {};
  for (const muscle of muscleGroups) {
    next[muscle] = (typeof next[muscle] === "number" ? next[muscle] : 0) + 1;
  }
  setItem(MUSCLES_KEY, next);
}
