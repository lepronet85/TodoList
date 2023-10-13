const fields = document.querySelectorAll(
  "form input[type='text'], form input[type='date'], form textarea, form select"
);
const fieldsLabels = document.querySelectorAll("form label");

fields.forEach((field, i) => {
  field.addEventListener("focus", function () {
    if (this.value === "") {
      fieldsLabels[i].style.animation =
        "animatedLabel 0.3s ease-in-out forwards";

      if (this.id === "date") {
        fieldsLabels[i].classList.remove("hidden");
      }
    }
  });

  field.addEventListener("blur", function () {
    if (this.value !== "") {
      fieldsLabels[i].style.backgroundColor = "#619da1";
      fieldsLabels[i].style.top = "-10px";
      fieldsLabels[i].style.zIndex = 10;
      fieldsLabels[i].style.color = "#fff";
      fieldsLabels[i].style.fontSize = "13px";
      fieldsLabels[i].style.animation = "none";

      if (this.id === "date") {
        fieldsLabels[i].classList.remove("hidden");
      }
    } else {
      fieldsLabels[i].style.animation = "none";
      fieldsLabels[i].style.backgroundColor = "transparent";
      fieldsLabels[i].style.top = "10px";
      fieldsLabels[i].style.zIndex = -10;
      fieldsLabels[i].style.fontSize = "14px";

      if (this.id === "date") {
        fieldsLabels[i].classList.add("hidden");
      }
    }
  });
});

const category = document.getElementById("category");
const title = document.getElementById("title");
const date = document.getElementById("date");
const description = document.getElementById("description");
const statut = document.getElementById("statut");
const addTaskButton = document.getElementById("add-task");

function getTasks() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

function addTask(category, title, date, description, statut) {
  const tasks = getTasks();

  tasks.push({
    id: tasks.length + 1,
    category,
    title,
    date,
    description,
    statut,
  });

  localStorage.setItem("tasks", JSON.stringify(tasks));

  showTasks();
}

function removeTask(e, taskId) {
  e.preventDefault();
  const tasks = getTasks();
  const filtredTasks = tasks.filter((task) => task.id !== taskId);
  console.log(filtredTasks);
  localStorage.setItem("tasks", JSON.stringify(filtredTasks));

  showTasks();
}

function showTasks() {
  const tasks = getTasks();
  const tbody = document.querySelector("tbody");

  tbody.innerHTML = "";

  tasks.forEach((task) => {
    tbody.innerHTML += `
        <tr>
        <td class="text-center text-gray- p-2">${task.id}</td>
        <td class="text-center text-gray-400 p-2">${task.date}</td>
        <td class="text-center text-gray-400 p-2">${task.title}</td>
        <td class="text-center text-gray-400 p-2">${task.category}</td>
        <td class="text-center text-gray-400 p-2">
          <div class="flex items-center justify-center">
            <a
              href=""
              id="view"
              class="w-6 h-6 rounded-md mx-1 shadow-sm"
            >
              <span
                class="material-symbols-outlined text-sm text-black cursor-pointer"
              >
                visibility
              </span>
            </a>
            <a href="" id="edit" class="w-6 h-6 rounded-md mx-1">
              <span
                class="material-symbols-outlined text-sm text-black cursor-pointer"
              >
                edit
              </span>
            </a>
            <a href="" id="delete" class="w-6 h-6 rounded-md mx-1" onclick="removeTask(event, ${task.id})">
              <span
                class="material-symbols-outlined text-sm text-black cursor-pointer"
              >
                delete
              </span>
            </a>
          </div>
        </td>
      </tr>
        `;
  });
}

addTaskButton.addEventListener("click", (e) => {
  e.preventDefault();
  addTask(
    category.value,
    title.value,
    date.value,
    description.value,
    statut.value
  );

  category.value = "";
  title.value = "";
  date.value = "";
  description.value = "";
  statut.value = "";

  fields.forEach((field, i) => {
    fieldsLabels[i].style.animation = "none";
    fieldsLabels[i].style.backgroundColor = "transparent";
    fieldsLabels[i].style.top = "10px";
    fieldsLabels[i].style.zIndex = -10;
    fieldsLabels[i].style.fontSize = "14px";
    fieldsLabels[i].style.color = "#000";
    if (fieldsLabels[i].parentNode.firstElementChild.id === "date") {
      fieldsLabels[i].classList.add("hidden");
    }
  });
});

showTasks();
