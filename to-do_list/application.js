//SELECTORS
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//EVENT LISTENERS
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTODO);

document.addEventListener("DOMContentLoaded", getTODOS);

//FUNCTIONS
function addTodo(event)
{
    //PREVENT FORM FROM SUBMITTING
    event.preventDefault();

    //TO-DO DIV
    const todoDIV = document.createElement("div");
    todoDIV.classList.add("todo");

    //CREATE LI
    const newTODO = document.createElement('li');

    newTODO.innerText = todoInput.value;
    newTODO.classList.add('todo-item');

    todoDIV.appendChild(newTODO);

    //ADD TO-DO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);

    //COMPLETED BUTTON
    const completedButton = document.createElement('button');
    
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");

    todoDIV.appendChild(completedButton);

    //DELETED BUTTON
    const trashButton = document.createElement('button');
    
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");

    todoDIV.appendChild(trashButton);

    //APPEND TO LIST
    todoList.appendChild(todoDIV);

    //CLEAR TO-DO INPUT VALUE
    todoInput.value = "";
}

function deleteCheck(e)
{
    const item = e.target;

    //DELETE TO-DO ITEM
    if(item.classList[0] === "trash-btn")
    {
        const todo = item.parentElement;
        //ANIMATION
        todo.classList.add("fall");
        removeLocalTODOS(todo);
        todo.addEventListener("transitionend", function()
        {
            todo.remove();
        }
        );
    }

    //COMPLETE TO-DO ITEM
    if(item.classList[0] === "complete-btn")
    {
        const todo = item.parentElement;

        todo.classList.toggle("completed");
    }
}

function filterTODO(e)
{
    const todos = todoList.childNodes;

    todos.forEach(function(todo)
    {
        switch(e.target.value)
        {
            case "all":
                todo.style.display = 'flex';
                break;
            case "completed":
                if(todo.classList.contains('completed'))
                {
                    todo.style.display = 'flex';
                } else
                {
                    todo.style.display = 'none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed'))
                {
                    todo.style.display = 'flex';
                } else
                {
                    todo.style.display = 'none';
                }
                break;
        }
    }
    )
}

function saveLocalTodos(todo)
{
    let todos;

    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    } else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTODOS()
{
    let todos;

    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    } else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo)
    {
        //TO-DO DIV
        const todoDIV = document.createElement("div");
        todoDIV.classList.add("todo");

        //CREATE LI
        const newTODO = document.createElement('li');

        newTODO.innerText = todo;
        newTODO.classList.add('todo-item');

        todoDIV.appendChild(newTODO);

        //COMPLETED BUTTON
        const completedButton = document.createElement('button');
        
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("complete-btn");

        todoDIV.appendChild(completedButton);

        //DELETED BUTTON
        const trashButton = document.createElement('button');
        
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");

        todoDIV.appendChild(trashButton);

        //APPEND TO LIST
        todoList.appendChild(todoDIV);
    }
    );
}

function removeLocalTODOS(todo)
{
    let todos;

    if(localStorage.getItem('todos') === null)
    {
        todos = [];
    } else
    {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;

    todos.splice(todos.indexOf(todoIndex), 1);
    
    localStorage.setItem("todos", JSON.stringify(todos));
}