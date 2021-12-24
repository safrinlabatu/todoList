// selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector(".filter-todo");

// event listener
document.addEventListener("DOMContentLoaded", getTodos)
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener("change", filterTodo);

// function
function addTodo(event) {
    // prevent form from submitting
    event.preventDefault();
    // create DIV
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo"); //used for styling
    // create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item"); //class name used for css/styling
    todoDiv.appendChild(newTodo);


    // ADD TO DO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    // CHECK MARK BUTTON
    const completedButton = document.createElement("button");
    completedButton.innerText = "Completed";
    completedButton.classList.add("completed-button")
    todoDiv.appendChild(completedButton);
    // DELETE BUTTON
    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.classList.add("delete-button");
    todoDiv.appendChild(deleteButton);
    // APPEND TO LIST
    todoList.appendChild(todoDiv);
    //clear todoInput value
    todoInput.value = "";
};

function deleteCheck(event) {
    const item = event.target;
    if (item.classList[0] === "delete-button") {
        const todo = item.parentElement;
        // Animation and delete todo
        todo.classList.add("fall");
        removeLocalTodos(todo)
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    //MARK COMPLETED
    if (item.classList[0] === "completed-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
};

function filterTodo(e) {
    const todos = todoList.childNodes;
    todos.forEach((todo) => {
        switch (e.target.value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}

function saveLocalTodos(todo) {
    // CHECK ---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    // CHECK ---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo){
        // create DIV
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo"); //used for styling
        // create li
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item"); //class name used for css/styling
        todoDiv.appendChild(newTodo);

        // CHECK MARK BUTTON
        const completedButton = document.createElement("button");
        completedButton.innerText = "Completed";
        completedButton.classList.add("completed-button")
        todoDiv.appendChild(completedButton);
        // DELETE BUTTON
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "Delete";
        deleteButton.classList.add("delete-button");
        todoDiv.appendChild(deleteButton);
        // APPEND TO LIST
        todoList.appendChild(todoDiv);
    });    
}

function removeLocalTodos(todo) {
    // CHECK ---HEY Do I already have thing in there?
    let todos;
    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

