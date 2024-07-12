
/**
 * This function is to show the popuppage of a task on the board page.
 * @param {string} section - section where the seleced task is stored
 * @param {int} index - id of an existing task
 */
function popUpTask(section, index) {
    let transperant = document.getElementById('transperant');
    transperant.classList.remove('d-none')
    const selectedTask = addedTasks[0][section.id][index];
    let showTaskContainer = document.getElementById("show-task-container");
    showTaskContainer.classList.remove('d-none');
    let taskpopUp = document.getElementById("taskpoUp");
    taskpopUp.innerHTML = taskPopUpTemplate(selectedTask, index, section);
}


/**
 * This function is to open the AddTask section on the board page.
 * 
 */
async function openAddTaskBoard(){
  if(getWidth() < 800){
    openAddTask();
  }else{
    await loadAddTask();
    initAddTask();
    let addTask = document.getElementById('addTask');
    let transperant = document.getElementById('transperant');
    addTask.classList.add('pos-absolute');
    transperant.classList.remove('d-none')
    addTask.classList.remove('d-none'); 
  }
}

/**
 * This function is to get the browser width.
 * 
 * @returns browser width 
 */
function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

/**
 * This function is to close the addTask section on the board page.
 * 
 */
function closeAddTaskBoard(){
  let addTask = document.getElementById('addTask');
  let transperant = document.getElementById('transperant');
  addTask.classList.remove('pos-absolute');
  transperant.classList.add('d-none');
  addTask.classList.add('d-none');
  addTask.innerHTML="";
  clearForm(); 
}

/**
 * This function is to prevent a propagation of an event.
 * @param {Event} event - The event object
 */  
function taskPopUp(event) {
  event.stopPropagation();
}

/**
 * This function is to close the task container.
 * @param {Event} event - The event object
 */  
function closeTaskContainer(event) {
  let showTaskContainer = document.getElementById("show-task-container");
  let transperant = document.getElementById('transperant');
  let taskPopUp = document.getElementById('taskpoUp');
  showTaskContainer.classList.add("d-none");    
  taskPopUp.innerHTML = '';
  transperant.classList.add('d-none')
  clearForm(event); 
}

/**
 * This function is to generate the HTML code for a task pop-up.
 * 
 * @param {object} selectedTask - The selected task object.
 * @param {number} taskIndex - The index of the task.
 * @param {object} section - The section object.
 * @returns {string} - HTML representation of the task pop-up.
 */  
function taskPopUpTemplate(selectedTask, taskIndex, section) {
  let date = selectedTask.date;
  const availableSections = ["toDo", "inProgress", "awaitFeedback", "done"];
  let categoryColor
  if(selectedTask.category == 'User Story'){
    categoryColor = 'User';
  }else{
    categoryColor = 'Technical';
  }
  return getHTMLForTaskPopup(categoryColor, selectedTask, date, taskIndex, section, availableSections);
}

/**
 * This function is to show the editing page for the task.
 * 
 * @param {object} task - The task object
 */
async function showToEdditInner(task, section, taskIndex) {
    await loadEditTask();
    await initAddTask();
    selectedContact(task);
    changeAddTaskToEditTask(task, section, taskIndex);  
    priority = undefined;
    if(task.priority != null){
      setPrio(task.priority);
    }
    ShowaddedTasks(task);
    renderAddedSubTask();
  }

/**
 * This function is to change the AddTask page to EditTask page.
 * 
 */
function changeAddTaskToEditTask(task, section, taskIndex){
    document.getElementById('addTaskCreateBtn').setAttribute( "onclick", `addTask(event,'${section}',${taskIndex})`)
    document.getElementById("title").value = task.title;
    document.getElementById("addTaskDescription").innerHTML = task.description;
    document.getElementById("addTaskDate").value = new Date(task.date).toISOString().substring(0,10);
    document.getElementById("selected-category").innerHTML = task.category;
    document.getElementById("addTaskHeadline").classList.add('d-none');
    document.getElementById("addTaskClearBtn").classList.add('d-none');
    document.getElementById("addTaskCreateBtn").innerHTML = `
      <span>Ok</span>
      <img class="btn_check" src="../assets/img/check_small.png" alt="">
    ` 
  }

/**
 * This function is to load the AddTaskpage for editing the page.
 * 
 */
async function loadEditTask(){
    let element = document.getElementById('taskpoUp');
    let resp = await fetch("../templates/addTask.html");
    if (resp.ok) {
        element.innerHTML = await resp.text();
    } else {
        element.innerHTML = 'Page not found';
    }
}

/**
 * This function is to load the selected users for the task.
 * 
 * @param {object} task - The task object.
 */
function selectedContact(task) {
    for (let i in task.selectedContacts) {
      const contactIndex = findContactIndex(task.selectedContacts[i]);
      if (contactIndex !== -1) {
        document.getElementById(`checkbox${contactIndex}`).checked = true;
        assignedContacts.push(task.selectedContacts[i]);
        selectedContacts.push(task.selectedContacts[i]);
        showAssignedContactsInContainer();
      } else {
        console.log("no assigned contacts");
      }
    }
  }

  
/**
 * This function is to show editing of a subtask.
 * 
 * @param {object} task - The task object
 */
function ShowaddedTasks(task) {
    for (let i in task.subTask) {
      tasksForSubtasks.push(task.subTask[i]);
    }
}

  
/**
 * This function is to generate the HTML code for the popup.
 * 
 * @param {string} categoryColor - color for the selected category
 * @param {object} selectedTask - task
 * @param {date} date - date from selected task
 * @param {int} taskIndex - id of selected task
 * @param {string} section - section where the task is stored
 * @param {array} availableSections - avalible options to move the task
 * @returns 
 */
function getHTMLForTaskPopup(categoryColor, selectedTask, date, taskIndex, section, availableSections){
    return `          
      <div class="topic-div" id="topic-div">
        <span class="topic1 ${categoryColor}"> ${selectedTask.category} </span>
        <img class="closePopUp" src="../assets/img/close.svg" onclick="closeTaskContainer(event)">
      </div>
      
      <span class="title">${selectedTask.title}</span>
  
      <span class="description">${selectedTask.description}</span>
        
      <div class="date-div info-div">
        <span>Due date:</span>
        <span>${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}</span>
      </div>
  
      ${prioTemplate(selectedTask, taskIndex)}
  
      <div class="assign-to info-div">
        <span>Assigned To:</span>
        <div class="profiles-div">
          ${assignToTemplate(selectedTask, taskIndex)}
        </div>
      </div>
  
      <div class="subtasks-div">
        <span>Subtasks:</span>
        <div class="subasks-profiles">
          ${subtasksTemplates(selectedTask, taskIndex, section)}
        </div>
      </div>    
  
      <div class="edit-div">
        <span onclick="deleteTask(${taskIndex},'${section.id}')">
          <img src="./assets/img/delete.png">                
          <p>Delete</p>
        </span>
  
        <span onclick="edittask(${taskIndex}, '${section.id}')">
          <img src="./assets/img/edit.png">
          <p>Edit</p>
        </span>
      </div>
  
      <div class="move-buttons">
        <span>Move To</span>
        <div id = "moveToBtns">
          ${availableSections
            .filter((targetSection) => targetSection !== section.id)
            .map(
            (targetSection) => `
              <button class = "create-task" onclick="moveTaskTo('${targetSection}', ${taskIndex}, '${section.id}', '${section}')">${targetSection}</button>
            `
          )
          .join("")}
        </div>
      </div>          
    `;
}  