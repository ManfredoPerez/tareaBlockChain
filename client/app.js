App = {
    contracts: {},
    init: async () => {
      await App.loadWeb3();
      await App.loadAccount();
      await App.loadContract();
      await App.render();
      await App.renderTasks();
    },
    loadWeb3: async () => {
      if (window.ethereum) {
        App.web3Provider = window.ethereum;
        await window.ethereum.request({ method: "eth_requestAccounts" });
      } else if (web3) {
        web3 = new Web3(window.web3.currentProvider);
      } else {
        console.log(
          "No hay ningún navegador ethereum instalado. Pruébalo instalando MetaMask "
        );
      }
    },
    loadAccount: async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      App.account = accounts[0];
    },
    loadContract: async () => {
      try {
        const res = await fetch("TasksContract.json");
        const tasksContractJSON = await res.json();
        App.contracts.TasksContract = TruffleContract(tasksContractJSON);
        App.contracts.TasksContract.setProvider(App.web3Provider);
  
        App.tasksContract = await App.contracts.TasksContract.deployed();
      } catch (error) {
        console.error(error);
      }
    },
    render: async () => {
      document.getElementById("account").innerText = App.account;
    },
    renderTasks: async () => {
      const tasksCounter = await App.tasksContract.tasksCounter();
      const taskCounterNumber = tasksCounter.toNumber();
  
      let html = "";
  
      for (let i = 1; i <= taskCounterNumber; i++) {
        const task = await App.tasksContract.tasks(i);
        const taskId = task[0].toNumber();
        const taskNombre = task[1];
        const taskApellido = task[2];
        const taskCarrera = task[3];
        const taskFecha = task[4];
        const taskPromedio = task[5];
        const taskDone = task[6];
        const taskCreatedAt = task[7];
  
        // Creating a task Card
        let taskElement = `<div class="card bg-dark rounded-0 mb-2">
          <div class="card-header d-flex justify-content-between align-items-center">
            <span>${taskNombre}</span>
            <div class="form-check form-switch">
              <input class="form-check-input" data-id="${taskId}" type="checkbox" onchange="App.toggleDone(this)" ${
                taskDone === true && "checked"
              }>
            </div>
          </div>
          <div class="card-body">
            <span>${taskApellido}</span>
            <span>${taskCarrera}</span>
            <span>${taskFecha}</span>
            <span>${taskPromedio}</span>
            <span>${taskDone}</span>
            <p class="text-muted">Task was created ${new Date(
              taskCreatedAt * 1000
            ).toLocaleString()}</p>
            </label>
          </div>
        </div>`;
        html += taskElement;
      }
  
      document.querySelector("#tasksList").innerHTML = html;
    },
    createTask: async (nombre, apellido,carrera, fecha, promedio) => {
      try {
        const result = await App.tasksContract.createTask(nombre, apellido,carrera, fecha, promedio, {
          from: App.account,
        });
        console.log(result.logs[0].args);
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },
    toggleDone: async (element) => {
      const taskId = element.dataset.id;
      await App.tasksContract.toggleDone(taskId, {
        from: App.account,
      });
      window.location.reload();
    },
  };