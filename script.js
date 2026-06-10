let habits = JSON.parse(localStorage.getItem("habits")) || [];

function saveData() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function addHabit() {
  const input = document.getElementById("habitInput");
  const text = input.value.trim();

  if (!text) return;

  habits.push({
    id: Date.now(),
    name: text,
    done: false,
    progress: 0
  });

  input.value = "";
  saveData();
  render();
}

function toggleHabit(id) {
  habits = habits.map(h => {
    if (h.id === id) {
      h.done = !h.done;
      h.progress = h.done ? 100 : 0;
    }
    return h;
  });

  saveData();
  render();
}

function render() {
  const list = document.getElementById("habitList");
  list.innerHTML = "";

  habits.forEach(habit => {
    list.innerHTML += `
      <div class="habit ${habit.done ? "done" : ""}">
        <div>
          <strong>${habit.name}</strong>

          <div class="progress">
            <div class="progress-bar" style="width:${habit.progress}%"></div>
          </div>
        </div>

        <button onclick="toggleHabit(${habit.id})">
          ${habit.done ? "Undo" : "Done"}
        </button>
      </div>
    `;
  });
}

render();