let items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");
const templateElement = document.getElementById("to-do__item-template");

function loadTasks() {
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return items;
}

function createItem(item) {
  const clone = templateElement.content.querySelector(".to-do__item").cloneNode(true);
  const textElement = clone.querySelector(".to-do__item-text");
  const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  const editButton = clone.querySelector(".to-do__item-button_type_edit");

  textElement.textContent = item;

  deleteButton.addEventListener("click", () => {
    clone.remove();
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  duplicateButton.addEventListener("click", () => {
    const newItem = createItem(textElement.textContent);
    listElement.prepend(newItem);
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  editButton.addEventListener("click", () => {
    textElement.contentEditable = "true";
    textElement.focus();
  });

  textElement.addEventListener("blur", () => {
    textElement.contentEditable = "false";
    const currentItems = getTasksFromDOM();
    saveTasks(currentItems);
  });

  return clone;
}

function getTasksFromDOM() {
  const itemsNamesElements = document.querySelectorAll(".to-do__item-text");
  const tasks = [];
  itemsNamesElements.forEach((item) => {
    tasks.push(item.textContent);
  });
  return tasks;
}

function saveTasks(tasks) {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

items = loadTasks();
items.forEach((item) => {
  listElement.append(createItem(item));
});

formElement.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const text = inputElement.value;
  listElement.prepend(createItem(text));
  const currentItems = getTasksFromDOM();
  saveTasks(currentItems);
  inputElement.value = "";
});
