const express = require("express");
const app = express();
app.use(express.json());

const tasks = [
  {
    id: 1,
    name: "Task 1",
    completed: false,
  },
  {
    id: 2,
    name: "Task 2",
    completed: false,
  },
  {
    id: 3,
    name: "Task 3",
    completed: false,
  },
];

//GET
app.get("/api/tasks", (req, res) => {
  res.send(tasks);
});
//GET BY ID
app.get("/api/tasks/:id", (req, res) => {
  const tasksId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(tasksId));
  if (!task) {
    return res.status(404).send("The task with this id do  not exist");
  }
  res.send(task);
});

//POST
app.post("/api/tasks", (req, res) => {
  if (req.body.hasOwnProperty("name") === false || req.body.name.length < 4)
    return res.status(400).send("The name should be at least 3 chars long!");

  const task = {
    id: tasks.length + 1,
    name: req.body.name,
    completed: req.body.completed,
  };

  tasks.push(task);
  res.status(201).send(task);
});

//PUT
app.put("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task)
    return res
      .status(404)
      .send("The task with the provided ID does not exist.");

  if (req.body.hasOwnProperty("name") === false || req.body.name.length < 4)
    return res.status(400).send("The name should be at least 3 chars long!");

  task.name = req.body.name;
  task.completed = req.body.completed;

  res.send(task);
});

//PATCH
app.patch("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task)
    return response
      .status(404)
      .send("The task with the provided ID does not exist.");

  if (req.body.hasOwnProperty("name") === false || req.body.name.length < 4)
    return res.status(400).send("The name should be at least 3 chars long!");

  task.name = req.body.name;

  if (req.body.completed) {
    task.completed = req.body.completed;
  }
  res.send(task);
});

//DELETE
app.delete("/api/tasks/:id", (req, res) => {
  const taskId = req.params.id;
  const task = tasks.find((task) => task.id === parseInt(taskId));
  if (!task)
    return res
      .status(404)
      .send("The task with the provided ID does not exist.");

  const index = tasks.indexOf(task);
  tasks.splice(index, 1);
  res.send(task);
});

//STRATING SERVER
const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`listening ${port}`));
