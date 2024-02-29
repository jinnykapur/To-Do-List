const list = document.getElementById("list");

function populateList() {
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  for (let i = 0; i < tasks.length; i++) {
    const newElement = document.createElement("li");
    newElement.textContent = tasks[i].task;
    if (tasks[i].checked) {
      newElement.classList.add("checked");
    }

    const span = document.createElement("SPAN");
    span.className = "close";
    span.textContent = "\u00D7";
    newElement.appendChild(span);

    span.addEventListener("click", () => {
      list.removeChild(newElement);
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    newElement.addEventListener("click", () => {
      newElement.classList.toggle("checked");
      tasks[i].checked = !tasks[i].checked;
      localStorage.setItem("tasks", JSON.stringify(tasks));
    });

    list.appendChild(newElement);
  }
}
populateList();

function newElement() {
  const task = document.getElementById("task").value;
  const toastError = document.getElementById("liveToastError");
  const toastAdd = document.getElementById("liveToastAdd");

  if (task === "") {
    toastError.classList.replace("hide", "show");
    setTimeout(() => toastError.classList.replace("show", "hide"), 2000);
    return;
  }

  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ task: task, checked: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const newElement = document.createElement("li");
  newElement.textContent = task;
  list.appendChild(newElement);

  const span = document.createElement("SPAN");
  span.className = "close";
  span.textContent = "\u00D7";
  newElement.appendChild(span);

  span.addEventListener("click", () => {
    list.removeChild(newElement);
    const index = tasks.findIndex((item) => item.task === task);
    tasks.splice(index, 1);
    localStorage.removeItem("tasks", JSON.stringify(tasks));
  });

  newElement.addEventListener("click", () => {
    newElement.classList.toggle("checked");
    const index = tasks.findIndex((item) => item.task === task);
    tasks[index].checked = !tasks[index].checked;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  });

  toastAdd.classList.replace("hide", "show");
  setTimeout(() => toastAdd.classList.replace("show", "hide"), 2000);

  document.getElementById("task").value = "";
}
