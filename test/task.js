let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();
chai.use(chaiHttp);

describe("TASK api", () => {
  /* Test GET route*/
  describe("GET /api/tasks", () => {
    it("It should GET all the tasks", (done) => {
      chai
        .request(server)
        .get("/api/tasks")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });
    it("It should GET not get the tasks", (done) => {
      chai
        .request(server)
        .get("/api/task")
        .end((err, response) => {
          response.should.have.status(404);

          done();
        });
    });
  });

  /* Test GET(BY ID) route*/
  describe("GET /api/tasks/:id", () => {
    it("It should GET one the task by id", (done) => {
      const taskId = 1;
      chai
        .request(server)
        .get("/api/tasks/" + taskId)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("Object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("completed");
          response.body.should.have.property("id").eq(1);

          done();
        });
    });
    it("It should NOT GET one the task by id", (done) => {
      const taskId = 123;
      chai
        .request(server)
        .get("/api/tasks/" + taskId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq("The task with this id do  not exist");
          done();
        });
    });
  });
  /* Test POST route*/
  describe("POST /api/tasks", () => {
    it("It should POST a new task", (done) => {
      const task = {
        name: "task Test",
        completed: false,
      };
      chai
        .request(server)
        .post("/api/tasks")
        .send(task)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("Object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("completed");
          response.body.should.have.property("id").eq(4);
          response.body.should.have.property("name").eq("task Test");
          response.body.should.have.property("completed").eq(false);

          done();
        });
    });
    it("It should NOT POST a new task with out name key", (done) => {
      const task = {
        completed: false,
      };
      chai
        .request(server)
        .post("/api/tasks")
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The name should be at least 3 chars long!"
          );
          done();
        });
    });
  });
  /* Test PUT route*/
  describe("PUT /api/tasks/:id", () => {
    it("It should PUT an existing task", (done) => {
      const taskId = 1;
      const task = {
        name: "task 1 change",
        completed: true,
      };
      chai
        .request(server)
        .put("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("Object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("completed");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("name").eq("task 1 change");
          response.body.should.have.property("completed").eq(true);

          done();
        });
    });
    it("It should NOT PUT an existing task with name less than 3 chars", (done) => {
      const taskId = 1;
      const task = {
        name: "ta",
        completed: true,
      };
      chai
        .request(server)
        .put("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The name should be at least 3 chars long!"
          );

          done();
        });
    });
  });
  /* Test PATCH route*/
  describe("PATCH /api/tasks/:id", () => {
    it("It should PATCH a task", (done) => {
      const taskId = 1;
      const task = {
        name: "Task 1 patch",
      };
      chai
        .request(server)
        .patch("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("Object");
          response.body.should.have.property("id");
          response.body.should.have.property("name");
          response.body.should.have.property("completed");
          response.body.should.have.property("id").eq(1);
          response.body.should.have.property("name").eq("Task 1 patch");
          response.body.should.have.property("completed").eq(true);

          done();
        });
    });
    it("It should NOT PATCH a exicting task with a name less than 3 chars ", (done) => {
      const taskId = 1;
      const task = {
        name: "ta",
      };
      chai
        .request(server)
        .put("/api/tasks/" + taskId)
        .send(task)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "The name should be at least 3 chars long!"
          );

          done();
        });
    });
  });
  /* Test DELETE route*/
  describe("DELETE /api/tasks/:id", () => {
    it("It should Delete an existing task", (done) => {
      const taskId = 1;

      chai
        .request(server)
        .delete("/api/tasks/" + taskId)

        .end((err, response) => {
          response.should.have.status(200);

          done();
        });
    });
    it("It should NOT DELETE an exicting task that id is not in database ", (done) => {
      const taskId = 145;
      chai
        .request(server)
        .put("/api/tasks/" + taskId)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq(
            "The task with the provided ID does not exist."
          );

          done();
        });
    });
  });
});
