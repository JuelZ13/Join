let tasksForSubtasks = []; 
let selectedContacts = []; 
let assignedContacts = []; 
let priority = undefined;

/**
 * This function is to init the add task page
 * 
 */
async function initAddTask(){
  await getContactsFromServer();
  await loadTasks();
  await loadContacts();
  setPrio('medium');
}

/**
 *  This function is to load the selecteble contacts to the addTask page.
 */
async function loadContacts() {
  let dropdown = document.getElementById("contact-options");
  dropdown.innerHTML = "";
  contactArray.forEach((user, index) => {
    const userHtml = getHTMLContactsAddtask(user, index);
    dropdown.innerHTML += userHtml;
    setBackgroundColor(user, index);
  });
}

/**
 * This function return the html code for the selecteble contacts on addTask page.
 * 
 * @param {string} user -contactArray.user
 * @param {number} index -contactArray.index
 * @returns 
 */
function getHTMLContactsAddtask(user, index){
  return `
    <div class="contact-selection">
      <div class="contact-selection">
        <span class="profile" id="profile${index}">${user.initials}</span>
        <label for="checkbox${index}">${user.name} ${user.lastName}</label>
      </div>
      <input type="checkbox" id="checkbox${index}" onclick="checkUser('${user.initials}','${user.name}','${user.lastName}','${user.color}', ${index})">
    </div>
  `;
}

/**
 * This function is to set a  background color for a profile for the selecteble contacts on addTask page.
 * @param {string} user -contactArray.user
 * @param {number} index -contactArray.index
 */
function setBackgroundColor(user, index) {
  let userBackground = document.getElementById(`profile${index}`);
  userBackground.style.backgroundColor = user.color;
}

/**
 * This function is to switch the dropdownmenu for selecteble contacts on addTask page.
 * 
 */
function switchContactDropdown() {
  if(document.getElementById("contact-img").style.transform == "rotate(180deg)"){
    document.getElementById("contact-img").style.transform = "rotate(0deg)";
    document.getElementById("contact-options").classList.add('d-none');

  }else{
    document.getElementById("contact-img").style.transform = "rotate(180deg)";
    document.getElementById("contact-options").classList.remove('d-none');
  }
}

/**
 * This function is to show the selected prio on addtaskpage.
 * 
 * @param {string} prio -id of the selected prio 
 */
function setPrio(prio){
  let select = document.getElementById(prio);
  let urgent = document.getElementById("urgent");
  let medium = document.getElementById("medium");
  let low = document.getElementById("low");  
  urgent.classList.remove('selectedPrio');
  medium.classList.remove('selectedPrio');
  low.classList.remove('selectedPrio');
  select.classList.add('selectedPrio');
  priority = prio;
}


/**
 * This function is to switch the dropdownmenu for the selecteble categories on addTask page.
 */
function switchCategoryOptions() {
  if(document.getElementById("category-img").style.transform == "rotate(180deg)"){
    document.getElementById("category-img").style.transform = "rotate(0deg)";
    document.getElementById("dropdown-category").classList.add('d-none');
  }else{
    document.getElementById("category-img").style.transform = "rotate(180deg)";
    document.getElementById("dropdown-category").classList.remove('d-none');
  }
}


/**
 * This function is to show the selected category on addTask page.
 * 
 * @param {string} select - selectedcategory
 */
function setCategory(select) {
  let selectedCategory = document.getElementById("selected-category");
  selectedCategory.innerHTML = select;  
  switchCategoryOptions();
}

/**
 * This function is to define the assigned user and push the name to the "assignedontacts"-Array to show them in the "selected-user" container and push also the selected contacts to the 'selectedContacts'
 * @param {string} userInitials - this is the shortcut of the checked-users full-name
 * @param {string} userName  - This is the first name of the checked-user
 * @param {string} userLastName - This is the second name of the checked-user
 * @param {string} bColor - This the background-color of each options from the 'assign contact'
 * @param {number} index - This is the index of each user
 */
function checkUser(userInitials, userName, userLastName, bColor, index) {
  const checkbox = document.getElementById(`checkbox${index}`);
  if (checkbox.checked) {   
      pushCheckUser(userInitials, bColor, userName, userLastName);
  } else {
    const indexToRemove = assignedContacts.findIndex(
      (contact) => contact.shortName === userInitials
    );
    if (indexToRemove !== -1) {      
      selectedContacts.splice(indexToRemove, 1);
    }
  }
  assignUser();
}

/**
 * This function is to push the checkedContact from addTask page to the selectedContacts array.
 * 
 * @param {string} userInitials - this is the shortcut of the checked-users full-name
 * @param {string} bColor - This the background-color of each options from the 'assign contact' 
 * @param {string} userName  - This is the first name of the checked-user
 * @param {string} userLastName - This is the second name of the checked-user
 */

function pushCheckUser(userInitials, bColor, userName, userLastName){
    selectedContacts.push({
    shortName: userInitials,
    bColor: bColor,
    name: userName,
    lastName: userLastName,
  });
}

/**
 * This function is to push the selectedcontacts array to the assignedContacts array for show on the addTask page.
 * 
 */
function assignUser(){
  assignedContacts = [];
  selectedContacts.forEach((contact) => {  
    assignedContacts.push({
      shortName: contact['shortName'],
      bColor: contact['bColor'],
      name: contact['name'],
      lastName: contact['lastName'],
    });
  })
  showAssignedContactsInContainer();
}

/**
 * This function is to show the assigned contacts on the addtask page.
 */
function showAssignedContactsInContainer() {
  selectedContainer = document.getElementById("selected-contact");
  selectedContainer.innerHTML = "";

  for (let i in assignedContacts) {
    profile = assignedContacts[i]["shortName"];

    bColor = assignedContacts[i]["bColor"];
    selectedContainer.innerHTML += `
      <span style="background-color:${bColor}; z-index:${i}" class="profile" id="selected-profile${i}">
      ${profile}
      </span>
    `;
  }
}

/**
 * Function is to add a subtasks;
 */
function addSubtask(editingIndex) {
  let taskValue = document.getElementById("addSubtaskInput").value.trim(); 

  if (taskValue !== "") {
    if (editingIndex !== -1) {
      tasksForSubtasks[editingIndex]['name'] = taskValue
    }else {     
      addSubtasktoArray(taskValue);
    }
    renderAddedSubTask();
    document.getElementById("addSubtaskInput").value = "";
  }
}

/**
 * This function is to push a new subtask to the subtask array.
 * 
 */
function addSubtasktoArray(taskValue){
    tasksForSubtasks.push({
    name: taskValue,
    checked: false,
  });
}

/**
 * This function is to render the added subtasks
 */
function renderAddedSubTask() {
  let tasksArea = document.getElementById("subtask-area");
  tasksArea.innerHTML = "";

  tasksForSubtasks.forEach((task, i) => {
    tasksArea.innerHTML += `
      <li>
        <p contenteditable="false" id="subtask${i}">${task.name}</p>
        <span id="subtaskSpan${i}">
        <img id="subtaskedit${i}" src="../assets/img/edit.png" onclick="editSubTask(${i})"> |
        <img src="../assets/img/delete.png" onclick="deleteSubTask(${i})">
        </span>
      </li>
    `;
  });
}

/**
 * This function is deleting the added subtasks
 * @param {number} i - this is the index of each the added subTasks, to recognize which task should be deleted
 */
function deleteSubTask(i) {
  tasksForSubtasks.splice(i, 1);
  renderAddedSubTask();
}

/**
 * This function allows to edit the added tasks in the subtask
 * @param {*} i - this is the index of each the added subTasks, to recognize which task should be edited
 */
function editSubTask(i) {
  let subtask = document.getElementById('subtask' + i);    
  let subtaskEdit = document.getElementById('subtaskedit' + i);  
  subtaskEdit.setAttribute( "onclick", `edit1SubTask(${i})`);  
  editingIndex = i;
  subtask.contentEditable = "true";
  subtask.setAttribute("contenteditable", "true");
}


/**
 * This function is to clear the input with that we adding a Subask
 */
function clearAddTask() {
  document.getElementById("subtask-value").value = "";
}


/**
 * This function is to save a new addedTask or existing addedTask.
 * 
 * @param {event} event -event from browser
 * @param {string} containerId -containerid where the addedtask has to be stored.
 * @param {*} editIndex -id for a existing addedtask
 */
async function addTask(event, containerId, editIndex) {
  event.preventDefault();
  let check = checkRequiredAddTaskForm();
  if (check == 1){
    const task = collectTaskData();
    await pushTask(task, containerId, editIndex);
    clearForm(event);
    showAddedTask(editIndex);  
  }
}


/**
 * This function is to check if all required fields filled.
 * 
 * @returns 1 or 0 if an required field is empty it return 0
 * 
 */
function checkRequiredAddTaskForm(){
  let title = document.getElementById("title");
  let description = document.getElementById("addTaskDescription");
  let date = document.getElementById("addTaskDate");
  let category = document.getElementById("selected-category");
  let check = 1;

  if (title.value == ""){
    let requiredTitle = document.getElementById('requiredTitle');
    requiredTitle.classList.remove('d-none');
    title.classList.add('redBorder');
    check = 0;
  }
  if (description.innerHTML == ""){
    let requiredDescription = document.getElementById('requiredDescription');
    requiredDescription.classList.remove('d-none');
    description.classList.add('redOutline');
    check = 0;
  }
  if (date.value == ""){
    let requiredDate = document.getElementById('requiredDate');
    requiredDate.classList.remove('d-none');
    date.classList.add('redBorder');
    check = 0;
  }
  if (category.innerHTML == "Select task Category"){
    let requiredCategory = document.getElementById('requiredCategory');
    let selectedCategoryDiv = document.getElementById('selectedCategoryDiv');
    requiredCategory.classList.remove('d-none');
    selectedCategoryDiv.classList.add('redBorder');
    check = 0;
  }
  return check;
}

/**
 * This function is collecting all the information from the form and returns to the function addTask()
 * @returns addedTaskJSON
 */
function collectTaskData() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("addTaskDescription").innerHTML;
  const date = document.getElementById("addTaskDate").value;
  const selectedCategory = document.getElementById("selected-category").innerHTML;
  const subtasks = tasksForSubtasks;
  const selectedContact = selectedContacts;
  const progressWidth = 0;
  return {
    title: title,
    description: description,
    date: new Date(date).getTime(),
    selectedContacts: selectedContact,
    category: selectedCategory,
    priority: priority,
    progressWidth: progressWidth,
    subTask: subtasks    
  };
}

/**
 * This function is push the task to add it to the addedTask
 * @param {object} task This is the generated Json-object which has to be added
 * @param {number} containerId The name of each section for exaple 'toDo, inProgress etc...'
 * @param {*} editIndex
 */
async function pushTask(task, containerId, editIndex) {
  if (editIndex === -1) {
    addedTasks[0][containerId].push(task);
  } else if (editIndex > -1) {
    addedTasks[0][containerId][editIndex] = task;
  }
  await saveTasks();
}

/**
 * This function clear the form
 * @param {event object} event wer are stopping the this function from its function, to not trigger our from
 */
function clearForm() {
  let title = document.getElementById('title');
  let description = document.getElementById('addTaskDescription');
  let date = document.getElementById('addTaskDate');
  let selectedCategory = document.getElementById('selected-category');
  selectedContacts = [];
  assignedContacts = [];
  tasksForSubtasks = [];
  description.innerHTML = "";
  title.value ="";
  date.value="";
  selectedCategory.innerHTML = 'Select task Category'
  setPrio('medium');
  renderAddedSubTask();
  showAssignedContactsInContainer();
}

/**
 * This function is to show a message when the task was added.
 * 
 * @param {html-code} html - this is html-code to show in the message after a task is added
 */
async function showMessageAddTask(html) {
  let msg = document.getElementById("message");
  msg.innerHTML = html;
  msg.classList.remove("d-none");
  await setTimeout(function () {
    msg.classList.add("d-none");
  }, 3000);
  setTimeout(() => {
    closeAddTaskBoard();
    closeTaskContainer();
    openBoard();
  }, 3500);
}

/**
 * This function is to generate the right message if an task was added or edit.
 * 
 */
function showAddedTask(editIndex) {
  let newTask = `<p>Task added.</p>`;
  let editedTask = `Task edited.`;
  let message;
  if (editIndex === -1) {
    message = newTask;
  } else {
    message = editedTask;
  }
  showMessageAddTask(message);
}