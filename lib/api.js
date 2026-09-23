import { initialExercises } from "./data";

const API_BASE = "https://api.abcz.workers.dev/api/fitlog";

export async function getAllExercises() {
  try {
    const res = await fetch(API_BASE, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      throw new Error(`API returned status ${res.status}`);
    }
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : initialExercises;
  } catch (err) {
    console.warn("Falling back to local exercises data:", err.message);
    return initialExercises;
  }
}

export async function getExerciseById(id) {
  const numericId = Number(id);
  try {
    const res = await fetch(`${API_BASE}/${numericId}`, {
      next: { revalidate: 3600 },
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.id) return data;
    }
  } catch (err) {
    console.warn(`Falling back for exercise ${id}:`, err.message);
  }
  return initialExercises.find((ex) => ex.id === numericId) || null;
}
