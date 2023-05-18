// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract TasksContract {
    uint256 public tasksCounter = 0;

    struct Task {
        uint256 id;
        string nombre;
        string apellido;
        string carrera;
        uint256 fecha_nacimiento;
        uint256 promedio;
        bool done;
        uint256 createdAt;
    }

     event TaskCreated(
        uint256 id,
        string nombre,
        string apellido,
        string carrera,
        uint256 fecha_nacimiento,
        uint256 promedio,
        bool done,
        uint256 createdAt
    );
    event TaskToggledDone(uint256 id, bool done);

    mapping(uint256 => Task) public tasks;

    constructor() {
        createTask("Mi primer nombre", "Mi primer apellido","Mi primera carrera", 2000, 7);
    }

    function createTask (string memory _nombre, string memory _apellido, string memory _carrera, uint256 _fecha_nacimiento, uint256 _promedio) public {
        tasksCounter++;
        tasks[tasksCounter] = Task(
            tasksCounter,
            _nombre,
            _apellido,
            _carrera,
            _fecha_nacimiento,
            _promedio,
            false,
            block.timestamp
        );

        emit TaskCreated(
            tasksCounter,
            _nombre,
            _apellido,
            _carrera,
            _fecha_nacimiento,
            _promedio,
            false,
            block.timestamp
        );
     }

    function toggleDone(uint256 _id) public {
        Task memory _task = tasks[_id];
        _task.done = !_task.done;
        tasks[_id] = _task;
        emit TaskToggledDone(_id, _task.done);
    }
}