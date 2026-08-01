async function loadTodos() {
    const res = await fetch("/todos");
    const todos = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    todos.forEach((todo) => {
        list.innerHTML += `
            <li>
                ${todo.task}
                <button onclick="deleteTodo(${todo.id})">
                    Delete
                </button>
            </li>
        `;
    });
}

async function addTodo() {
    const task = document.getElementById("task").value;

    await fetch("/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ task: task })
    });

    document.getElementById("task").value = "";

    loadTodos();
}

async function deleteTodo(id) {
    await fetch(`/todos/${id}`, {
        method: "DELETE"
    });

    loadTodos();
}

loadTodos();