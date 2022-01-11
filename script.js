getBanco = () => JSON.parse(localStorage.getItem("list")) ?? [];
setBanco = (banco) => localStorage.setItem("list", JSON.stringify(banco));

const todoList = document.getElementById("list-tasks");

const createCard = (
  task,
  type = "sports",
  description = "Nenhuma descrição",
  status = "not-completed",
  index
) => {
  const card = document.createElement("div");
  card.classList.add("card");
  card.classList.add(`${type}-filter`);
  card.classList.add(status);

  card.innerHTML = `
    <div class="card-task" data-index="${index}">
        <div class="icon-card-container ${type}" data-index="${index}">
            <img src="./img/icons/${type}.svg" alt="" class="icon-card ${type}">
        </div>
        <p class="text-card" data-index="${index}">${task}</p>
        <img src="./img/icons/confirm.svg" alt="" class="confirm-task" data-index="${index}">
    </div>
    <div class="card-description ${type}">
        <p class="description-content" data-index="${index}">${description}</p>
        <img src="./img/icons/edit.svg" alt="" class="edit-icon" data-index="${index}">
        <img src="./img/icons/trash.svg" alt="" class="trash-icon" data-index="${index}">
    </div>
                            `;

  card.dataset.index = index;
  todoList.appendChild(card);
};

const clearList = () => {
  const listTasks = document.getElementById("list-tasks");
  while (listTasks.firstChild) {
    listTasks.removeChild(listTasks.lastChild);
  }
};

const renderList = () => {
  clearList();
  const banco = getBanco();
  let cont = banco.length;
  document.getElementById("contador").innerHTML = `[${cont}]`;

  banco.forEach((card, index) =>
    createCard(card.task, card.type, card.description, card.status, index)
  );
  setBanco(banco);
};

function openFilter() {
  document.getElementById("filter-modal").classList.remove("hide-filter-modal");
  document.getElementById("filter-modal").classList.add("show-filter-modal");
}

function closeFilter() {
  document.getElementById("filter-modal").classList.remove("show-filter-modal");
  document.getElementById("filter-modal").classList.add("hide-filter-modal");
}

function openNewTask() {
  document.getElementById("task-input").focus();
  document.getElementById("filter-sports").checked = true;
  document.getElementById("new-task-modal").classList.remove("hide-new-modal");
  document.getElementById("new-task-modal").classList.add("show-new-modal");
}

function createNewTask() {
  const value = document.getElementById("task-input").value;
  const input = document.getElementById("task-input");

  const flag = verifyInputs(value, input);
  if (flag) {
    const task = document.getElementById("task-input").value;
    const desc = document.getElementById("desc-input").value;
    const type = selectType();
    const banco = getBanco();

    banco.push({
      task: `${task}`,
      type: `${type}`,
      description: `${desc}`,
      status: "not-completed",
    });

    setBanco(banco);
    clearInput();
    renderList();
    filterType();

    document
      .getElementById("new-task-modal")
      .classList.remove("show-new-modal");
    document.getElementById("new-task-modal").classList.add("hide-new-modal");
  }
}

function closeNewTask() {
  clearInput();
  inputWrite();
  document.getElementById("new-task-modal").classList.remove("show-new-modal");
  document.getElementById("new-task-modal").classList.add("hide-new-modal");
}

function openEditModal() {
  document.getElementById("edit-task-input").focus();
  document.getElementById("edit-modal").classList.remove("hide-edit-modal");
  document.getElementById("edit-modal").classList.add("show-edit-modal");
}

function closeEditModal() {
  document.getElementById("edit-modal").classList.remove("show-edit-modal");
  document.getElementById("edit-modal").classList.add("hide-edit-modal");
}

let savedIndex;

const takeTaskAndDesc = (index) => {
  const banco = getBanco();
  const check = document.getElementsByName("type-filter-edit");
  let typeEdit;
  banco.forEach((banco, indexArray) => {
    if (index == indexArray) {
      document.getElementById("edit-task-input").value = banco.task;
      document.getElementById("edit-desc-input").value = banco.description;
      typeEdit = banco.type;
      check.forEach((check) => {
        if (check.value == typeEdit) {
          check.checked = true;
        }
      });
    }
  });
};

const inputEdits = () => {
  const value = document.getElementById("edit-task-input").value;
  const input = document.getElementById("edit-task-input");
  const flag = verifyInputs(value, input);
  if (flag) {
    const banco = getBanco();
    const task = document.getElementById("edit-task-input").value;
    const desc = document.getElementById("edit-desc-input").value;
    const type = selectTypeEdit();
    banco.splice(savedIndex, 1, {
      task: `${task}`,
      type: `${type}`,
      description: `${desc}`,
      status: "not-completed",
    });

    setBanco(banco);
    renderList();
    document.getElementById("edit-modal").classList.remove("show-edit-modal");
    document.getElementById("edit-modal").classList.add("hide-edit-modal");
  }
};

const clearInput = () => {
  document.getElementById("task-input").value = "";
  document.getElementById("desc-input").value = "";
};

const selectType = () => {
  let radios = document.getElementsByName("type-filter");
  let value;

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      value = radios[i].value;
    }
  }
  return value;
};

const selectTypeEdit = () => {
  let radios = document.getElementsByName("type-filter-edit");
  let value;

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      value = radios[i].value;
    }
  }
  return value;
};

const removeItem = (index) => {
  const banco = getBanco();
  banco.splice(index, 1);
  setBanco(banco);

  renderList();
};

let type;
const filterType = () => {
  const radios = document.querySelectorAll(".input-filter");
  let filter_icon = document.getElementById("filter-icon");
  filter_icon.classList.remove(`${type}-filter`);

  for (var i = 0; i < radios.length; i++) {
    if (radios[i].type === "radio" && radios[i].checked) {
      type = radios[i].value;
    }
  }
  const todos = todoList.childNodes;
  filter_icon.classList.add(`${type}-filter`);

  todos.forEach((todo) => {
    if (todo.classList.contains(`${type}-filter`) || type == "all") {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
};

const clickItem = (evento) => {
  const card = document.querySelectorAll(".card");
  const element = evento.target;
  const index = element.dataset.index;
  const parent = element.parentNode;

  if (
    parent.classList.contains("card") ||
    parent.classList.contains("card-description") ||
    element.classList.contains("card-description") ||
    element.classList.contains("description-content") ||
    element.classList.contains("text-card")
  ) {
    description(index);
  }

  if (element.classList == "confirm-task") {
    card[index].classList.toggle("not-completed");
    card[index].classList.toggle("completed-task");
    updateItem(index);
  }

  if (element.classList == "trash-icon") {
    removeItem(index);
  }

  if (element.classList == "edit-icon") {
    savedIndex = index;
    openEditModal();
    takeTaskAndDesc(index);
  }
};

const description = (index) => {
  const desc = document.querySelectorAll(".card-description");

  if (desc[index].classList.contains("active")) {
    desc[index].classList.remove("active");
  } else {
    for (let i = 0; i < desc.length; i++) {
      desc[i].classList.remove("active");
    }
    desc[index].classList.add("active");
  }
};

const updateItem = (index) => {
  const banco = getBanco();
  banco[index].status =
    banco[index].status === "completed-task"
      ? "not-completed"
      : "completed-task";
  setBanco(banco);
  renderList();
};

function verifyInputs(value, input) {
  if (value == null || value == "") {
    inputNull(input);
    return false;
  } else {
    createCard();
    return true;
  }
}

function inputNull(input) {
  input.style.border = "6px solid var(--red-color)";
  input.focus();
}

function inputWrite() {
  let task = document.getElementById("task-input");
  let taskEdit = document.getElementById("edit-task-input");

  task.style.border = "none";
  task.style.borderLeft = "20px solid var(--gray-color)";

  taskEdit.style.border = "none";
  taskEdit.style.borderLeft = "20px solid var(--gray-color)";
}

document.getElementById("list-tasks").addEventListener("click", clickItem);

renderList();
