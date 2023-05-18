const TasksContract = artifacts.require("TasksContract");

contract("TasksContract", (accounts) => {
  before(async () => {
    this.tasksContract = await TasksContract.deployed();
  });

  it("migrate deployed successfully", async () => {
    const address = await this.tasksContract.address;

    assert.notEqual(address, null);
    assert.notEqual(address, undefined);
    assert.notEqual(address, 0x0);
    assert.notEqual(address, "");
  });

  it("get Tasks List", async () => {
    const tasksCounter = await this.tasksContract.tasksCounter();
    const task = await this.tasksContract.tasks(tasksCounter);

    assert.equal(task.id.toNumber(), tasksCounter.toNumber());
    assert.equal(task.nombre, "Mi primer nombre");
    assert.equal(task.apellido, "Mi primer apellido");
    assert.equal(task.carrera, "Mi primera carrera");
    assert.equal(task.fecha_nacimiento, 2000);
    assert.equal(task.promedio, 7);
    assert.equal(task.done, false);
    assert.equal(tasksCounter, 1);
  });

  it("Alumno creado con exito", async () => {
    const result = await this.tasksContract.createTask("Nombre dos", "Apellido dos", "Carrera dos", 2001, 8);
    const taskEvent = result.logs[0].args;
    const tasksCounter = await this.tasksContract.tasksCounter();

    assert.equal(tasksCounter, 2);
    assert.equal(taskEvent.id.toNumber(), 2);
    assert.equal(taskEvent.nombre, "Nombre dos");
    assert.equal(taskEvent.apellido, "Apellido dos");
    assert.equal(taskEvent.carrera, "Carrera dos");
    assert.equal(taskEvent.fecha_nacimiento, 2001);
    assert.equal(taskEvent.promedio, 8);
    assert.equal(taskEvent.done, false);
  });

  it("task toggled done", async () => {
    const result = await this.tasksContract.toggleDone(1);
    const taskEvent = result.logs[0].args;
    const task = await this.tasksContract.tasks(1);

    assert.equal(task.done, true);
    assert.equal(taskEvent.id.toNumber(), 1);
    assert.equal(taskEvent.done, true);
  });
});