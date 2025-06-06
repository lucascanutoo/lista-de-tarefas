const API = "http://localhost:3000/api/tasks";

async function fetchTasks(completed = null) {
  let url = API;
  if (completed !== null) {
    url += `?completed=${completed}`;
  }

  const res = await fetch(url);
  const tasks = await res.json();

  const list = document.getElementById("task-list");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    const title = document.createElement("span");
    title.textContent = task.title;
    if (task.completed) title.style.textDecoration = "line-through";

    const toggle = document.createElement("button");
    toggle.textContent = task.completed ? "Desfazer" : "Concluir";
    toggle.onclick = () => updateTask(task._id, { completed: !task.completed });

    const edit = document.createElement("button");
    edit.textContent = "Editar";
    edit.onclick = () => {
      const newTitle = prompt("Novo título:", task.title);
      if (newTitle) updateTask(task._id, { title: newTitle });
    };

    const del = document.createElement("button");
    del.textContent = "Excluir";
    del.onclick = () => deleteTask(task._id);

    li.append(title, toggle, edit, del);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("new-task");
  const title = input.value.trim();
  if (!title) return;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });

  input.value = "";
  fetchTasks();
}

async function updateTask(id, data) {
  await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  fetchTasks();
}

fetchTasks();