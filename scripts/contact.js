/**
 * This function is to init the contact page.
 * 
 */
function initContacts(){
     getContactsFromServer();
} 

/**
 * This function ist to get the contacts from the login user.
 * 
 */
async function getContactsFromServer() {
  let userId = localStorage.getItem('userId');
  try {
    contactArray = await JSON.parse(await getItem('contacts' + userId));
  } catch (e) {
    console.info('could not find contacts')
  }
  await sortContacts();
  showContacts();
}

/**
 * This function is to sort the existing contacts and save to remotestorage.
 * 
 */
async function sortContacts() {      
    contactArray.sort((a, b) => {
      let nameA = a.lastName;
      let nameB = b.lastName;
  
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
    await setItem('contacts', JSON.stringify(contactArray));
}

/**
 * This function is to show the contacts on the contact page.
 * 
 */
function showContacts() {
  createInitalGroup();
  showNameGroup();
}

/**
 * This function is to show the contacts on the contact page.
 * 
 */
function showNameGroup() {
  let content = document.getElementById("nameGroup");
  let sortedInitials = Object.keys(initialGroups).sort();

  content.innerHTML = "";
  for (let i = 0; i < sortedInitials.length; i++) {
    let initial = sortedInitials[i];
    content.innerHTML += GroupName(initial);
    content.innerHTML += personDatas(initial);
  }
}

/**
 * This function is to show the contacts on the contact page.
 * 
 */
function personDatas(initial) {
  let htmlContent = '';
  for (let i = 0; i < contactArray.length; i++) {
    let thisPerson = contactArray[i];
    if (initialGroups[initial].includes(thisPerson)) {
      let person = thisPerson;
      htmlContent += showPersonDatas(person, i);
    }
  }
  return htmlContent;
}

/**
 * This function is to delete a contact.
 * 
 * @param {int} index - index of the contact to be delete
 */
async function deleteContact(index) {
  contactArray.splice(index, 1);
  let userId = localStorage.getItem('userId');
  await setItem('contacts' + userId, JSON.stringify(contactArray));
  closeInfo();
  closePopup();
  showContacts();
}

let lastHighlightContact;
/**
 * This function is to show the contact info of an selected contact.
 * 
 * @param {int} index - id of the selected contact
 */
function showInfo(index) {
  let person = contactArray[index];
  let infoBox = document.getElementById("infoBox");
  let mainFrame = document.getElementById('mainFrame');
  let highlightContact = document.getElementById('contact' + index);
  infoBox.innerHTML = showInfoText(person, index);
  mainFrame.classList.add('d-none');
  infoBox.classList.remove('d-none');
  highlightContact.classList.add('highlightContact');
  if (lastHighlightContact){
    lastHighlightContact.classList.remove('highlightContact');
  }
  lastHighlightContact = highlightContact;
}

/**
 * This function is to close the info of an selected contact.
 * 
 */
function closeInfo() {
  let infoBox = document.getElementById('infoBox');
  let mainFrame = document.getElementById('mainFrame');
  infoBox.classList.add('d-none');  
  mainFrame.classList.remove('d-none');
}

/**
 * This function is to open the submenu for edit and delete on the mobile view.
 * 
 * @param {event} event - browser event
 */
function openDrawer(event) {
  event.stopPropagation();
  let drawer = document.getElementById("drawer");    
  drawer.classList.remove('d-none');
}

/**
 * This function is to close the submenu for edit and delete on the mobile view.
 * 
 * @param {event} event - browser event
 */
function closeDrawer(event) {
  event.stopPropagation();
  let drawer = document.getElementById("drawer");    
  drawer.classList.add('d-none');
}

/**
 * This function is to open the edit page of the selected contact.
 * 
 * @param {int} index -id of the selected contact
 */
async function openEdit(index) {
  let popup = document.getElementById('popupBox');
  changeAddContactToEditContact(index);
  showEditContact(index);
  popup.classList.remove('popup-box-add');
  popup.classList.add('popup-box-edit');
  popup.classList.remove('popupCloseEdit');
  popup.classList.remove('popupCloseAdd');
}

/**
 * This function is to change the content of the add contact page to the edit content page.
 * 
 * @param {int} index -id of the contact to edit
 */
function changeAddContactToEditContact(index){
  let contactPopupHeadline = document.getElementById('contactPopupHeadline');
  let btnContactDelete = document.getElementById('btnContactDelete');
  let btnContactCreate = document.getElementById('btnContactCreate');
  let popSubtitle = document.getElementById('pop-subtitle');
  popSubtitle.classList.add('d-nonePop-subtitle');
  btnContactDelete.classList.remove('d-noneAddContact');
  btnContactDelete.setAttribute("onclick",`deleteContact(${index})`);
  btnContactDelete.innerHTML = 'Delete';
  btnContactCreate.innerHTML = 'Save <img src="../assets/img/check_small.png">';
  contactPopupHeadline.innerHTML = 'Edit contact';
}

/**
 * This function is to edit the contact in array.
 * 
 * @param {int} index - index to edit in array.
 */
function editContactInArray(index) {
  let name = document.getElementById("fullName").value; //.split(' ') in splitName()
  let mail = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let color = document.getElementById("colorBox").style.backgroundColor;
  let {preName, lastName} = splitName(name);
  let initials = preName[0] + lastName[0];
  contactArray[index].name = preName;
  contactArray[index].lastName = lastName;
  contactArray[index].mail = mail;
  contactArray[index].phone = phone;
  contactArray[index].initials = initials;
  contactArray[index].color = color;
  completeEdition(index);
}

/**
 * This function is to complete the edit of a contact. Show message, save remote and close the edit page.
 * 
 * @param {int} index - Index of the contact to edit.
 */
async function completeEdition(index) {
  document.getElementById("userForm").reset();
  closePopup();
  await saveContactsRemote();
  showContacts();
  showInfo(index);
}

/**
 * This function is to save the contacts array on remote storage
 * 
 */
async function saveContactsRemote(){
  let userId = localStorage.getItem('userId');
  await setItem('contacts' + userId, JSON.stringify(contactArray));
}

/**
 * This function is to get the values for create a new contact.
 * 
 */
async function createContact() {
  setCreateBtnDisable();
  let fullName = document.getElementById("fullName").value;
  let mail = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let color = document.getElementById("colorBox").style.backgroundColor;
  if (color == '') {
    color = 'var(--user-grey)';
  }
  let { preName, lastName } = splitName(fullName);
  let initials = preName[0] + lastName[0];

  pushContactArray(preName,lastName,mail,phone,initials,color);

  await completeCreation();
}

/**
 * This function is to push the values for a new contact to contactarray.
 * 
 * @param {string} preName -first name for creating new contact
 * @param {string} lastName -last name for creating new contact
 * @param {string} mail -mail adress for creating new contact
 * @param {string} phone -phone number for creating new contact
 * @param {string} initials - initials for creating new contact
 * @param {color} color -choosen color for the new contact
 */
function pushContactArray(preName,lastName,mail,phone,initials,color){
  contactArray.push({
    name: preName,
    lastName: lastName,
    mail: mail,
    phone: phone,
    initials: initials,
    color: color,
  });
}

/**
 * This function is to disable the create button for the new contact form.
 * 
 */
function setCreateBtnDisable(){
  let createBtn = document.getElementById('btnContactCreate');
  createBtn.disabled = true;
}

/**
 * This function is to complete the contact creation process by re-enabling the create button, resetting 
 * the form, and saving the new contact to storage. Also, triggers a visual feedback for 
 * a successful operation.
 */
async function completeCreation() {
  document.getElementById("userForm").reset();
  let createBtn = document.getElementById('btnContactCreate');
  createBtn.disabled = false;
  closePopup();
  let userId = localStorage.getItem('userId');
  await setItem('contacts' + userId, JSON.stringify(contactArray));
  let index = contactArray.length - 1;  
  showContacts();
  showInfo(index);  
  showMessageContact('Contact successfully created');
}


/**
 * This function is to split the entry from the user into pre- and lastname
 * 
 * @param {string} fullName 
 * @returns 
 */
function splitName(fullName) {
  let nameParts = fullName.split(" ");
  let preName = upperCaseFirstLetter(nameParts[0]);
  let lastName = upperCaseFirstLetter(nameParts[1]);
  return { preName, lastName };
}

/**
 * This function is to set first character big and slice the 'old' first letter
 * 
 * @param {string} str-string to first uppercase 
 * @returns 
 */

function upperCaseFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
 * This function is to generate the array of initials for show all contacts.
 * 
 */
function createInitalGroup() {
  initialGroups = contactArray.reduce((acc, current) => {
    let initial = current.name[0].toUpperCase();
    // if key not exist as a letter in the accumulator, push it
    if (!acc[initial]) {
      acc[initial] = [];
    }
    // push current name to acc
    acc[initial].push(current);
    return acc;
  }, {});
}

/**
 *This function is to close the popup for create or edit contact.
 * 
 */
function closePopup() {
  let colorPicker = document.getElementById("colorPicker");
  if (colorPicker.style.display === "flex") {
    openColorPicker();
  }
  if (document.getElementById('contactPopupHeadline').innerHTML == 'Edit contact') {
    document.getElementById('popupBox').classList.add('popupCloseEdit');      
  }else{
    document.getElementById('popupBox').classList.add('popupCloseAdd');
  }
}

/**
 * This function is to open the popup for add a contact.
 * 
 */
function AddContact(){
  let popup = document.getElementById('popupBox');
  changeContentToAddContact();
  changeOptionsToAddContact();
  popup.classList.remove('popup-box-edit');
  popup.classList.add('popup-box-add');
  popup.classList.remove('popupCloseEdit');
  popup.classList.remove('popupCloseAdd');
}

/**
 * This function is to change the content of the popup to show the add contact page.
 * 
 */
function changeContentToAddContact(){
  let contactPopupHeadline = document.getElementById('contactPopupHeadline');
  let btnContactDelete = document.getElementById('btnContactDelete');
  let btnContactCreate = document.getElementById('btnContactCreate');
  let popSubtitle = document.getElementById('pop-subtitle');
  popSubtitle.classList.remove('d-nonePop-subtitle');
  btnContactDelete.classList.add('d-noneAddContact');
  btnContactDelete.setAttribute("onclick",`closePopup()`);
  btnContactCreate.innerHTML = 'Create contact <img src="../assets/img/check_small.png">';
  btnContactDelete.innerHTML = 'Cancel <img src="../assets/img/x.svg">'
  contactPopupHeadline.innerHTML = 'Add contact';
}

/**
 * This function is to change the content of the popup to show the add contact page.
 *
 *
 */
function changeOptionsToAddContact() {  
  let userForm = document.getElementById("userForm");
  let popupcicle = document.getElementById("popup-circle");
  userForm.reset();
  userForm.setAttribute("onsubmit",`createContact(); return false;`);
  popupcicle.style ="";
  popupcicle.innerHTML =`<img src="../assets/img/person_initial.png" alt="">`;
  document.getElementById("colorBox").style = "";
}

/**
 * This function is to open the edit contact page.
 * 
 * @param {int} index - The index of the contact in the contactArray to be edited.
 */
function showEditContact(index) {
  let person = contactArray[index];
  let userForm = document.getElementById("userForm");
  userForm.reset();
  let popupcicle = document.getElementById("popup-circle");
  popupcicle.style =`background-color: ${person.color}`;
  document.getElementById("colorBox").style = `background-color: ${person.color}`;
  popupcicle.innerHTML = person.initials;
  userForm.setAttribute("onsubmit",`editContactInArray(${index}); return false;`);
  document.getElementById("fullName").value = `${person.name} ${person.lastName}`;
  document.getElementById("email").value = person.mail;
  document.getElementById("phone").value = person.phone;        
}  

/**
 * This function is to show a message when the contact was added.
 * 
 * @param {html-code} html - this is html-code to show in the message after a task is added
 */
async function showMessageContact(html) {
  let msg = document.getElementById("message");
  msg.innerHTML = html;
  msg.classList.remove("d-none");
  await setTimeout(function () {
    msg.classList.add("d-none");
  }, 3000);
}