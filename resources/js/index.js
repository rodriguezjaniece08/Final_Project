import { TaskManager } from "./taskManager.js";
//form elements
const form = document.getElementById("form_section")
const dueDate = document.getElementById("cal_datepicker");
const assignTo = document.getElementById("AssignTo");
const taskRole = document.getElementById("TaskRole");
const taskName = document.getElementById("TaskName");
const description = document.getElementById("Description");
const notes = document.getElementById("Notes");
const status = document.getElementsByName("inlineRadioOptions");
const selectedStatus = () =>{
//get the checked status
  for (let i = 0; i < status.length; i++) {
    
    if (status[i].checked) {
      return status[i].value;
    }
    
  }
}

const newTaskManager = new TaskManager();
newTaskManager.addTask(
  "Take dog out", 
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur consequuntur ducimus explicabo, minima rerum nam eius inventore recusandae aliquam odit quae deserunt perferendis? Id quibusdam quod, praesentium natus pariatur a.",
  "Ivan R.",
  "");
newTaskManager.addTask(
  "feed the fish", 
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur consequuntur ducimus explicabo, minima rerum nam eius inventore recusandae aliquam odit quae deserunt perferendis? Id quibusdam quod, praesentium natus pariatur a.",
  "Juan",""
  );
newTaskManager.addTask(
  "Clean the bed", 
  "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur consequuntur ducimus explicabo, minima rerum nam eius inventore recusandae aliquam odit quae deserunt perferendis? Id quibusdam quod, praesentium natus pariatur a.",
  "Pedro",
  "");
//tasks template

const ul = document.getElementById("tasks_group");
const taskCounter = document.getElementById("task_counter");

//create HTML task template
const createTaskTemplate = (task) => {
  const htmlLi = `
    <li id="${task.id}" class="row border-bottom pb-2 border-secondary mb-3 align-items-center" >
      <span class="col-2 d-block">${(task.id < 10) ? "0" + task.id : task.id}</span> <h4 class="col-8 fw-lighter">${task.name}</h4><a type="button" class="text-white col-2"><i class="bi bi-eye-fill"></i></a>
    </li>`;
  ul.insertAdjacentHTML("beforeend", htmlLi);
  taskCounter.innerHTML = newTaskManager.tasks.length;
}

newTaskManager.tasks.forEach(task => {
  createTaskTemplate(task);
} );

//getting the form inputs
const addNewTask=(event)=>{
  event.preventDefault()
  //validate before submitting
  if(taskName.value !== "" && taskRole.value !== "" && description.value !== "" && assignTo.value !== "" ){
   newTaskManager.addTask( taskName.value, description.value, assignTo.value, dueDate.value, selectedStatus() )
   createTaskTemplate(newTaskManager.tasks[newTaskManager.tasks.length-1]);
    //clear the input fields
     taskName.value = "";
     taskRole.value = "";
     description.value = "";
     assignTo.value = "";
     notes.value = "";
     status[0].checked;
     form.classList.remove('was-validated')
    } else if(!form.checkValidity()) {
      event.stopPropagation()
      form.classList.add('was-validated')
  }
}

form.onsubmit = addNewTask;