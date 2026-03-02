const STORAGE_KEY = "happiness_arcade_entries";

const moodEl = document.getElementById("mood");
const gratitudeEl = document.getElementById("gratitude");
const questEl = document.getElementById("quest");
const saveBtn = document.getElementById("saveBtn");
const timelineEl = document.getElementById("timeline");
const streakEl = document.getElementById("streak");

function loadEntries() {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
}

function saveEntries(entries) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function upsertTodayEntry(entries, entry) {
  const idx = entries.findIndex((e) => e.date === entry.date);
  if (idx >= 0) entries[idx] = entry;
  else entries.push(entry);
  return entries.sort((a, b) => a.date.localeCompare(b.date));
}

function computeStreak(entries) {
  const dates = new Set(entries.map((e) => e.date));
  let streak = 0;
  const date = new Date();

  while (true) {
    const key = date.toISOString().slice(0, 10);
    if (!dates.has(key)) break;
    streak += 1;
    date.setDate(date.getDate() - 1);
  }

  return streak;
}

function render() {
  const entries = loadEntries();
  const latestSeven = entries.slice(-7).reverse();

  timelineEl.innerHTML = "";
  latestSeven.forEach((e) => {
    const li = document.createElement("li");
    const questMark = e.questDone ? "✅" : "⬜";
    li.textContent = `${e.date} | Mood: ${e.mood} | ${questMark} | ${e.gratitude}`;
    timelineEl.appendChild(li);
  });

  streakEl.textContent = `Streak: ${computeStreak(entries)} days`;
}

saveBtn.addEventListener("click", () => {
  const mood = Number(moodEl.value);
  const gratitude = gratitudeEl.value.trim();

  if (!Number.isInteger(mood) || mood < 1 || mood > 5) {
    alert("Mood must be between 1 and 5.");
    return;
  }

  if (!gratitude) {
    alert("Please add one gratitude line.");
    return;
  }

  const entry = {
    date: todayKey(),
    mood,
    gratitude,
    questDone: questEl.checked,
  };

  const entries = upsertTodayEntry(loadEntries(), entry);
  saveEntries(entries);
  render();
});

render();
