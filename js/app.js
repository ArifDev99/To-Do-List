document.getElementById('submit-btn').addEventListener('click', saveTask);
let DelBtn=document.getElementById("del-btn");
let Edit=false
let ind=0
 
// Save new To-Do
function saveTask(e) {
 
  let title = document.getElementById('title').value;
  let description = document.getElementById('description').value;
 
  if(Edit){
    let tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks[ind].title=title
    tasks[ind].description=description
    localStorage.setItem('tasks',JSON.stringify(tasks))
    Edit=false
    ind=0
  }
  else{

    let task = {
      title,
      description
    };
   
    if (localStorage.getItem('tasks') === null) {
      let tasks = [];
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    } else {
      let tasks = JSON.parse(localStorage.getItem('tasks'));
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
 
  getTasks();
 
  // Reset form-Task
  document.getElementById('form-Task').reset();
  e.preventDefault();
 
}
 
// Delete To-Do 
function deleteTask(title) {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  if(tasks.length===1){
    localStorage.clear();
  }
  else{
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].title == title) {
        tasks.splice(i, 1);
      }
    }
   
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
  getTasks();
}
// Delete All Element to-do
DelBtn.addEventListener("click",function(){
  localStorage.clear();
  getTasks();
})

// Edit To-do List Element
function EditTask(title){
  let tasks=JSON.parse(localStorage.getItem("tasks"));
  for(let i=0;i<tasks.length;i++){
    if(tasks[i].title===title){
      ind=i
      Edit=true
      document.getElementById('title').value=tasks[i].title;
      document.getElementById('description').value=tasks[i].description;
      break;
    }
  }
  
}
 
// Show To-Do List
function getTasks() {
 
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  let tasksView = document.getElementById('tasks');
  tasksView.innerHTML = '';
  if (tasks){
    for (let i = 0; i < tasks.length; i++) {
      let title = tasks[i].title;
      let description = tasks[i].description;
   
      tasksView.innerHTML +=
        `<div class="card mb-3">
          <div class="card-body">
          <div class="row">
            <div class="col-sm-3 text-left">
              <p>${title}</p>
            </div>
            <div class="col-sm-7 text-left">
              <p>${description}</p>
            </div>
            <div class="col-sm-2 text-right">
              <span class="badge badge-pill badge-success"><a onclick="EditTask('${title}')"><i class="fa fa-edit"></i></a></span>
              <span class="badge badge-pill badge-danger"><a onclick="deleteTask('${title}')"><i class="fa fa-trash"></i></a></span>
            </div>
          </div>  
         </div>
        </div>`;
    }
    DelBtn.disabled=false;
  }
  else{
    DelBtn.disabled=true;
  }
 
}
//  <a href="#" onclick="deleteTask('${title}')" class="btn btn-danger ml-5">X</a>
getTasks();