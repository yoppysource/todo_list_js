const toDoList = document.querySelector(".todo-list");
const add = document.querySelector(".add");
const btn = document.querySelector(".btn");
const inputTodo = document.querySelector(".input");
const todoElementList = document.querySelectorAll(".todo");

const TODO_LS = "toDos";

let toDos = [];

function markDoneToDo(event) {
  const li = event.target.parentNode;
  console.log(li.classList);
  if (li.classList.value === "todo") {
    li.classList.add("done");
  } else {
    const cleanToDos = toDos.filter(
      function (toDo) {
        return toDo.id !== parseInt(li.id);
      },
    );
    toDos = cleanToDos;
    saveToDos();
    toDoList.removeChild(li);
  }
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODO_LS);

  if (loadedToDos !== null) {
    const parsedToDos = JSON.parse(loadedToDos);
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text);
    });
  }
}

function saveToDos() {
  localStorage.setItem(TODO_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  const li = document.createElement("li");
  li.classList.add("todo");

  const span = document.createElement("span");
  span.classList.add("radio");
  const p = document.createElement("p");
  const newId = toDos.length + 1;
  p.innerText = text;
  li.appendChild(span);
  li.appendChild(p);
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId,
  };
  toDos.push(toDoObj);
  li.addEventListener("click", markDoneToDo);
  saveToDos();
}

function init() {
  loadToDos();
  const todoElementList = document.querySelectorAll(".todo");
  btn.addEventListener("click", () => {
    add.classList.toggle("active");
    inputTodo.focus();
  });

  inputTodo.addEventListener("keyup", (event) => {
    if (event.keyCode === 13 && event.target.value !== "") {
      event.preventDefault();
      const todoText = event.target.value;
      console.log(todoText);
      event.target.value = "";
      paintToDo(todoText);
    }
  });
  console.log(todoElementList);

  todoElementList.forEach((e) => {
    e.addEventListener("click", markDoneToDo);
  });
}

init();
