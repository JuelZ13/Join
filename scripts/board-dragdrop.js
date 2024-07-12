/**
 * This function is to start drag and drop functionality.
 * @param {Event} event - The drag event
 * @param {number} id - The ID of the dragged element
 * @param {object} section - The section object
 */
async function startDargging(event, id, section) {
    currentDargedElement = id;
    currenSection = section.id;
}
  
/**
  * This function is to allow drop of a dragged element.
  * @param {Event} event - The drop event
  */
function allowDrop(event) {
    event.preventDefault();
}
  
/**
 * This function is to highlight a container during drag and drop.
 * @param {string} containerId - The ID of the container to highlight
 */  
function highlight(conatinerId) {
  document.getElementById(conatinerId).classList.add("drag-area-highlight");
}

/**
 * This function is to remove the highlight from a container during drag and drop.
 * @param {string} containerId - The ID of the container to remove highlighting from.
 */
function removeHighlight(conatinerId) {
  document.getElementById(conatinerId).classList.remove("drag-area-highlight");
  document.getElementById(currenSection).classList.remove("drag-area-highlight");
}
  
/**
* This function is to moves a dragged element to a different container.
* @param {string} containerId - The ID of the target container
*/
async function moveTo(containerId) {
  document.getElementById(containerId).classList.remove("drag-area-highlight");
  let dragedJson = addedTasks[0][currenSection][currentDargedElement];
  addedTasks[0][containerId].push(dragedJson);
  addedTasks[0][currenSection].splice(currentDargedElement, 1);
  await saveTasks();
  await loadTasks();
  await initBoard();
  await renderTaskList(containerId, addedTasks);
}
  
/**
 * This function moves the task to another area.
 * @param {string} moveToThisSection This is the name of the section or the array, where we want to move our task, based on the button
 * @param {number} taskIndex This is the index of the task
 * @param {string} actualSection This is the name of the sections, where our task is in
 */
async function moveTaskTo(moveToThisSection, taskIndex, actualSection) {
  let task = addedTasks[0][actualSection][taskIndex];
  addedTasks[0][moveToThisSection].push(task);
  addedTasks[0][actualSection].splice(taskIndex, 1);
  await saveTasks();
  initBoard();
  closeTaskContainer();
}