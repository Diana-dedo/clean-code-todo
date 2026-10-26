const taskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const incompleteTaskHolder = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksHolder = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
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

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
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
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskCompletion);

  taskInput.value = "";
};

//Edit an existing task.

const editTask = function () {

  const listItem = this.parentNode;

  const editInput = listItem.querySelector("input[type=text]");
  const label = listItem.querySelector("label");
  const editBtn = listItem.querySelector(".edit");
  const containsClass = listItem.classList.contains("editMode");
  //If class of the parent is .editmode
  if (containsClass) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  listItem.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {

  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
};

//Mark task completed
const toggleTaskCompletion = function () {
  const listItem = this.parentNode;
  const checkbox = listItem.querySelector("input[type='checkbox']");
  
  const targetHolder = checkbox.checked ? completedTasksHolder : incompleteTaskHolder;
  
  targetHolder.appendChild(listItem);
  bindTaskEvents(listItem, toggleTaskCompletion);
};


//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskListItem, checkBoxEventHandler) {
  //select ListItems children
  const checkBox = taskListItem.querySelector("input[type=checkbox]");
  const editButton = taskListItem.querySelector("button.edit");
  const deleteButton = taskListItem.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to checkBoxEventHandler.
  checkBox.onchange = checkBoxEventHandler;
};

//cycle over incompleteTaskHolder ul list items
//for each list item
[...incompleteTaskHolder.children, ...completedTasksHolder.children].forEach((taskElement) => {
  bindTaskEvents(taskElement, toggleTaskCompletion);
});

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
