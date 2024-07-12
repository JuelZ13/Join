let currentDargedElement;
let currenSection;
let topicColor;

/**
 * This function is to init the board page
 * 
 */
async function initBoard() {
    await loadTasks();
    renderTaskList("toDo", addedTasks);
    renderTaskList("inProgress", addedTasks);
    renderTaskList("awaitFeedback", addedTasks);
    renderTaskList("done", addedTasks);
}

/**
 * This function is to load the addedtasks for the login user from remote storage.
 */
async function loadTasks() {
    try {
        let userId = localStorage.getItem("userId");
        const loadedTasks = await getItem("storedTasks" + userId);
        if (loadedTasks) {
            addedTasks = JSON.parse(loadedTasks);
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * This function is to save the added tasks on remote storage.
 * 
 */
async function saveTasks() {
    let userId = localStorage.getItem("userId");
    await setItem("storedTasks" + userId, JSON.stringify(addedTasks));
}
  
/**
 * This function is to render a list of tasks in the specified container.
 * @param {string} containerId - The ID of the container where tasks should be render
 * @param {Array} tasks - an array of tasks to render
 */
async function renderTaskList(containerId, tasks) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    for (let i = 0; i < tasks.length; i++) {
        const taskList = tasks[i][containerId];
        if (taskList && taskList.length > 0) {
            for (let j = 0; j < taskList.length; j++) {
                const task = taskList[j];
                container.innerHTML += createTaskElement(task, j, containerId);
            }
        } else {
            container.innerHTML = emptyTaskArea();
        }
    }
}

/**
   * Creates an HTML element representing a task.
   * @param {object} task - The task object to create an element for.
   * @param {number} index - The index of the task.
   * @param {object} section - The section object.
   * @returns {string} - HTML representation of the task element.
   */  
function createTaskElement(task, index, section) {
    let categoryColor = checkCategory(task);
    return /*html */ `
        <div class="cards draggable" id="card${index}" onclick="popUpTask(${section}, ${index})" draggable="true" ondragstart="startDargging(event, ${index}, ${section})">
        <span class="topic ${categoryColor}">${task.category}</span>
        <div class="frame">
            <h4 class="title">${task.title}</h4>
            <p class="content">${task.description}</p>
        </div>
        ${createProgressBar(task)}
        ${createSelectedContacts(task, index)}
      </div>
    `;
}

/**
 * This function is to check the selected category of the task to render.
 * @returns the class for the selected category
 */
function checkCategory(task){
  if(task.category == 'User Story'){
    categoryColor = 'User';
  }else{
    categoryColor = 'Technical';
  }
  return categoryColor;  
}

/**
   * This function is to render an HTML progress bar element based on task subtasks.
   * @param {object} task - The task object.
   * @param {number} index - The index of the task.
   * @returns {string} - HTML representation of the progress bar.
   */
function createProgressBar(task) {
    const checkedSubTasks = task.subTask ? task.subTask.filter((subtask) => subtask.checked == true) : [];
    const finishedSubTasks = checkedSubTasks.length;
    let lengthOfSubs = task.subTask && task.subTask.length ? task.subTask.length : 0;
    if (task.subTask.length > 0){
    return getHTMLProgressbar(finishedSubTasks, lengthOfSubs);
    }else{
      return ''
    }
}

/**
 * This function is to generate the html code for the progressbar of subtasks
 * 
 * @param {int} finishedSubTasks - number of finished subtasks
 * @param {int} lengthOfSubs - number of subtasks
 * @returns 
 */
function getHTMLProgressbar(finishedSubTasks, lengthOfSubs){
  return `
    <div class="progress-bar">
      <progress max="100" value="${(finishedSubTasks / lengthOfSubs) * 100}"></progress>
        <div class="subtask-amount"><span>${finishedSubTasks}/${lengthOfSubs}</span> Subtasks</div>
      </div>
    `;
}

/**
   * This function is to generate HTML elements for selected contacts in a task.
   * @param {object} task - The task object
   * @param {number} index - The index of the task
   * @returns {string} - HTML representation of selected contacts
   */  
function createSelectedContacts(task, index) {
    const profile = getBoardContactHTML(task);      
      return `
      <div class="assign-conatiner" id="assign-container${index}">
        <div class="assigned-person">
          ${profile}
        </div>
        ${createPriorityIcon(task)}
      </div>
    `;
}

/**
 * This function is to generate the html code for the profile icon on board page.
 * 
 * @param {*} task - The task object
 */
function getBoardContactHTML(task){
  return  task.selectedContacts.map((contact, subIndex) => {
            topicColor = contact.bColor;
            return `
              <span style="background-color: ${contact.bColor}" class="profile" style="z-index:${subIndex}">
                ${contact.shortName}
              </span>
            `;
          })
        .join("");
}

/**
 * This function is to generate the priority icon based on task priority.
 * @param {object} task - The task object
 * @returns {string} - HTML representation of the priority icon
 */
function createPriorityIcon(task) {
  let icon = '';
  const prio = task.priority;
  if (prio === "urgent") {
      icon = `<img src="../assets/img/urgent.svg">`;
  } else if (prio === "medium") {
      icon = `<img src="../assets/img/medium.svg">`;
  } else if (prio === "low"){
      icon = `<img src="../assets/img/low.svg">`;
  }
  return icon;
}

/**
 * This function is to generate the HTML for an empty task area.
 * @returns {string} - HTML representing an empty task area.
 */
function emptyTaskArea() {
    return `
        <div class="empty-todo">
        <p>No tasks To do</p>
        </div>
    `;
}

/**
 * This function is to generate the HTML code for task priority.
 * @param {object} task - The task object
 * @param {number} taskIndex - The index of the task
 * @returns {string} - HTML representation of the task priority
 */  
function prioTemplate(task) {
  let prio = task.priority;
  let icon;
  let prioName;
  if (prio === "urgent") {
    icon = `<span> <img src="../assets/img/urgent.svg"></span>`;
    prioName = prio;
  } else if (prio === "medium") {
    icon = `<span> <img src="../assets/img/medium.svg"</span>`;
    prioName = prio;
  } else {
    icon = `<span> <img src="../assets/img/low.svg"</span>`;
    prioName = prio;
  }
  return getHTMLForPrio(prioName, icon);
}

/**
 * This function is to generate the HTML code for task priority.
 * 
 * @param {string} prioName - priority as string
 * @param {img} icon - img for the prority
 * @returns 
 */
function getHTMLForPrio(prioName, icon){
  return `
    <div class="prio-div info-div">
      <span>Priority:</span>
      <div class="prio-sign">
        <span>${prioName}</span>
        ${icon}
      </div>
    </div>
  `;
}

/**
 * This function is to generate the HTML code for assigned contacts in a task.
 * @param {object} task - The task object.
 * @param {number} taskIndex - The index of the task.
 * @returns {string} - HTML representation of assigned contacts.
 */
function assignToTemplate(task) {
  let names = [];
  let lastNames = [];
  let bColors = [];
  let shortNames = [];

  task.selectedContacts.forEach((contact) => {
    names.push(contact.name);
    lastNames.push(contact.lastName);
    bColors.push(contact.bColor);
    shortNames.push(contact.shortName);
  });
  let profilesHTML = getHTMLForContacts(names, lastNames, bColors, shortNames);
  return profilesHTML     
}


function getHTMLForContacts(names, lastNames, bColors, shortNames){
  let profilesHTML = "";
  for (let i = 0; i < names.length; i++) {
    profilesHTML += `
      <div class="profiles">
        <span style="background-color: ${bColors[i]}" class="profile">${shortNames[i]}</span>
        <p>${names[i]} ${lastNames[i]}</p>
      </div>
    `;
  }
  return profilesHTML;
}


/**
 * This function is to genered the HTML code for the subtasks.
 * 
 * @param {object} task - The task object
 * @param {number} taskIndex - The index of the task
 * @param {object} section - The section object
 * @returns {string} - HTML representation of subtasks
 */

function subtasksTemplates(task, taskIndex, section) {
  let subNames = [];
  sectionId = section.id;
  task.subTask.forEach((sub, index) => {
    subNames.push(sub.name);
  });
  let subHtml = getHTMLForSubtask(subNames, task, sectionId, taskIndex);
  return subHtml;
}

/**
 * This function is to genered the HTML code for the subtasks.
 * 
 * @param {string} subNames - name of the subtask
 * @param {array} task - task
 * @param {string} sectionId - id of the section where the task is stored
 * @param {int} taskIndex - index of the task
 * @returns 
 */
function getHTMLForSubtask(subNames, task, sectionId, taskIndex){
  let subHtml = "";
  for (let i = 0; i < subNames.length; i++) {
    const subtaskID = `subtask${i}`;
    const checkedValue = task.subTask[i].checked;
    if (subNames.length >= 0) {
      subHtml += `
      <div class="subtask">
        <label for="${subtaskID}">
          <input type="checkbox" ${
            checkedValue ? "checked" : ""
          } name="${sectionId}" id="${subtaskID}" onclick="updateSubtask(${taskIndex}, ${i}, '${sectionId}')"/>
          <span style="border-radius: 5px" class="costum-checkbox"></span>
        </label>
        <p class="subtask-text">${subNames[i]}</p>
      </div>
    `;
    } else {
      subHtml = "No Subtasks added.";
    }
  }
  return subHtml;
}

/**
 * This function is to update the state of the sutask bar.
 * 
 * @param {number} taskIndex - The index of the task
 * @param {number} subtaskIndex - The index of the subtask
 * @param {string} sectionId - The ID of the section
 */
async function updateSubtask(taskIndex, subtaskIndex, sectionId) {
  let task = addedTasks[0][sectionId][taskIndex];
  let subtask = task.subTask[subtaskIndex];
  subtask.checked = !subtask.checked;
  await saveTasks();
  renderTaskList(sectionId, addedTasks);
}

/**
 * This function is to delete a task from board.
 * 
 * @param {number} taskIndex - The index of the task
 * @param {string} section - The section ID
 */
async function deleteTask(taskIndex, section) {
  addedTasks[0][section].splice(taskIndex, 1);
  await saveTasks();
  closeTaskContainer();
  renderTaskList(section, addedTasks);
}

/**
 * This function is to edit a task.
 * 
 * @param {number} taskIndex - The index of the task
 * @param {string} sectiondId - The ID of the section
 */
  function edittask(taskIndex, section) {
  currentTask = addedTasks[0][section][taskIndex];
  showToEdditInner(currentTask, section, taskIndex);
}

/**
 * This function is to find the index of a contact.
 * @param {object} task - The contact object
 * @returns {number} - The index of the contact, or -1 if not found
 */
function findContactIndex(task) {
  for (let i = 0; i < contactArray.length; i++) {
    if (contactArray[i].name === task.name) {
      return i; 
    }
  }
  return -1;
}  

/**
* This function is to search the board for tasks on user input.
*/
function searchTask() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const allstsks = document.getElementsByClassName("allsTsks");
  for (let i = 0; i < allstsks.length; i++) {
    const tasks = allstsks[i].getElementsByClassName("cards");
    for (let j = 0; j < tasks.length; j++) {
      const task = tasks[j];
      const title = task.querySelector(".title").textContent.toLowerCase();
      const description = task
        .querySelector(".content")
        .textContent.toLowerCase();
      const isVisible =
        title.includes(searchInput) || description.includes(searchInput);
      task.style.display = isVisible ? "flex" : "none";
    }
  }
}