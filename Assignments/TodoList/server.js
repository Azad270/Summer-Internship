console.log("LATEST SERVER");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static("public"));

let todos = [];

app.get("/todos", (req, res) => {
    console.log("GET:", todos);
    res.json(todos);
});

app.post("/todos", (req, res) => {
    console.log("BODY:", req.body);

    const todo = {
        id: Date.now(),
        task: req.body.task
    };

    todos.push(todo);

    console.log("TODOS ARRAY:", todos);

    res.json(todo);
});
app.delete("/todos/:id", (req, res) => {
    todos = todos.filter(todo => todo.id != req.params.id);
    res.send("Deleted!");
});

app.listen(7865, () => {
    console.log("Running on http://localhost:7865");
});