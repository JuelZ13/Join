let login = false;
let urgentdate = new Date();

/**
 * This function is to init the summary page.
 * 
 */
async function initSummary(){
    await loadTasks();
    setUrgentDate();
    setTaskUrgent();
    setTasksInBoard();
    setTasksToDo();
    setTasksInProgress();
    setTasksAwaitingFeedback();
    setTasksDone();   
    removeMobileAnimation();     
}

/**
 * This function is to set the first urgent date to HTML.
 * 
 */
function setUrgentDate(){
    let urgentDate = document.getElementById('urgentDate');
    urgentDate.innerHTML = getUrgentDate();
}


/**
 * This function is to set count of urgent tasks to HTML.
 * 
 */
function setTaskUrgent(){
    let tasksUrgent = document.getElementById('tasksUrgent');
    tasksUrgent.innerHTML = getUrgentTasks();
}

/**
 * This function is to set count of tasks to HTML.
 * 
 */
function setTasksInBoard(){
    let taskInBoardDiv = document.getElementById('taskInBoardDiv');
    taskInBoardDiv.innerHTML = addedTasks[0]['inProgress'].length + addedTasks[0]['awaitFeedback'].length + addedTasks[0]['toDo'].length + addedTasks[0]['done'].length;
}

/**
 * This function is to set count of ToDo tasks to HTML.
 * 
 */
function setTasksToDo(){
    let tasksToDoDivNr = document.getElementById('taskTodo');
    tasksToDoDivNr.innerHTML = addedTasks[0]['toDo'].length;
}

/**
 * This function is to set count of in progress tasks to HTML.
 * 
 */
function setTasksInProgress(){
    let taskInProgressDiv = document.getElementById('taskInProgressDiv');
    taskInProgressDiv.innerHTML = addedTasks[0]['inProgress'].length;
}

/**
 * This function is to set count of awaiting feedback tasks to HTML.
 * 
 */
function setTasksAwaitingFeedback(){
    let taskAwaitingFeedback = document.getElementById('taskAwaitingFeedback');
    taskAwaitingFeedback.innerHTML = addedTasks[0]['awaitFeedback'].length;
}

/**
 * This function is to set count of done tasks to HTML.
 * 
 */
function setTasksDone(){
    let tasksDone = document.getElementById('taskDone');
    tasksDone.innerHTML = addedTasks[0]['done'].length; 
}

/**
 * This function is to write all tasks to one array.
 * @returns the array of all tasks
 */
function getAllOpenTasks(){
    let allOpenTasks = [];
    for (let i = 0; i < addedTasks[0]['toDo'].length; i++) {
        const task = addedTasks[0]['toDo'][i];
        allOpenTasks.push(task);        
    }
    for (let i = 0; i < addedTasks[0]['inProgress'].length; i++) {
        const task = addedTasks[0]['inProgress'][i];
        allOpenTasks.push(task);        
    }
    for (let i = 0; i < addedTasks[0]['awaitFeedback'].length; i++) {
        const task = addedTasks[0]['awaitFeedback'][i];
        allOpenTasks.push(task);        
    }
    return allOpenTasks;
}

/**
 * This function is to get the count of urgent tasks.
 * @returns 
 */
function getUrgentTasks(){
    let allOpenTasks = getAllOpenTasks();
    let urgentTask = 0; 
    for (let i = 0; i < allOpenTasks.length; i++) {
        const task = allOpenTasks[i];
        if (task['priority'] == 'urgent') {
            urgentTask++            
        }
    }
    return urgentTask;
}

/**
 * This function is to get the first urgent date on board.
 * 
 * @returns the urgent date
 */
function getUrgentDate(){
    let allOpenTasks = getAllOpenTasks();
    let urgentdate = new Date();
    if (allOpenTasks.length > 0){
        urgentdate = new Date(allOpenTasks[0]['date'])            
        for (let i = 1; i < allOpenTasks.length; i++) {
            const task = allOpenTasks[i];
            let urgentdatetemp = new Date(task['date']);
            if (task['priority'] == 'urgent') {
                if (urgentdatetemp.getTime() < urgentdate.getTime()){
                    urgentdate = urgentdatetemp;
                }        
            }
        }
    }
    return getDate(urgentdate)    
}

/**
 * This function is to get the name of month of a specified date.
 * 
 * @param {date} date -date to get the name of month
 * @returns 
 */
function getDate(date){
    let returnValue;
    switch(date.getMonth() + 1){
    case 1:
        returnValue = 'Januar';
        break;  
    case 2:
        returnValue = 'Feburay';
        break; 
    case 3:
        returnValue = 'March';
        break;  
    case 4:
        returnValue = 'April';
        break;        
    case 5:
        returnValue = 'May';
        break;
    case 6:
        returnValue = 'June';
        break;
    case 7:
        returnValue = 'July';
        break;
    case 8:
        returnValue = 'August';
        break;
    case 9:
        returnValue = 'September';
        break;
    case 10:
        returnValue = 'October';
        break;
    case 11:
        returnValue = 'November';
        break;
    case 12:
        returnValue = 'December';
        break;
    }
    returnValue += ' ' + date.getDate().toString() +  ', ' + date.getFullYear().toString();

    return returnValue
}

/**
 * This function is to generate the welcome message for the user. 
 * 
 */
async function displayWelcomeMsg() {
    const date = new Date();
    const currentHour = date.getHours();
    let welcomeMessage;
    if (currentHour < 12){
        welcomeMessage = "Good Morning";
        icon = "coffee";
    }
    else if (currentHour < 20){
        welcomeMessage = 'Good afternoon';
        icon = "sun-o";
    }
    else if (currentHour < 24){
        welcomeMessage = "Good evening"
        icon = "moon-o";
    }
    else {
        welcomeMessage = "Welcome";
    }
    document.getElementById("welcomeText").innerHTML = welcomeMessage + ',' ;
    await setWelcomeUser();    
}

/**
 * This function is to set the username for the welcome message.
 * 
 */
async function setWelcomeUser(){
    let userid = localStorage.getItem('userId')
    if (userid == ''){
        document.getElementById("welcomeTextuserName").innerHTML = `Guest` ;
    }else{
        let username = await setUserNameWelcome(userid);
        const lastName = username.split(" ");
        document.getElementById("welcomeTextuserName").innerHTML = username;
        document.getElementById("userNameDivInnerId").innerHTML = username.substring(0,1).toUpperCase() + lastName[1].substring(0,1).toUpperCase();
    }
}

/**
 * This function is to get the name to welcome the login user.
 * 
 * @param {*} userid -ID for the login user. 
 * @returns name for welcome message
 */
async function setUserNameWelcome(userid){
    await loadUsers();
    let username = users[userid].name;
    users = '';
    return username;
}
 
/**
 * This function is to remove the animation for mobile welcome message after login.
 * 
 */
function removeMobileAnimation(){
    let summaryContainer = document.getElementById('summaryContainer');
    let welcomeMsgDiv = document.getElementById('welcomeMsgDiv');
    setTimeout(() => {
        summaryContainer.classList.remove('summaryContainer1');
        welcomeMsgDiv.classList.remove('welcomeMsgDiv1');
    },1900);
}

/**
 * This function is to load the users from remote storage.
 * 
 */
async function loadUsers() {
    try {
    users = JSON.parse(await getItem("users"));
    } catch (e) {
    console.error("Loading error:", e);
    }
}