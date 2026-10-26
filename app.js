const taskInput = document.getElementById("new-task"); 
const addButton = document.getElementsByTagName("button")[0]; 
const incompleteTaskHolder = document.getElementById("incompleteTasks"); 
const completedTasksHolder = document.getElementById("completed-tasks");

const createTaskElement = function (taskString) {
  const listItem = document.createElement("li");

  const checkBox = document.createElement("input"); 
  const label = document.createElement("label"); 
  const editInput = document.createElement("input"); 
  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button"); 
  const deleteButtonImg = document.createElement("img"); 

  label.innerText = taskString;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit";
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskCompletion);

  taskInput.value = "";
};

const editTask = function () {

  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");

  if (containsClass) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }
  listItem.classList.toggle("editMode");
};

const deleteTask = function () {

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTaskCompletion = function () {
  const listItem = this.parentNode;
  const checkbox = listItem.querySelector("input[type='checkbox']");
  
  const targetHolder = checkbox.checked ? completedTasksHolder : incompleteTaskHolder;
  
  targetHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskCompletion);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
};

[...incompleteTaskHolder.children, ...completedTasksHolder.children].forEach((taskElement) => {
  bindTaskEvents(taskElement, toggleTaskCompletion);
});

