let section = "Summary";

/**
 * This function is to open the summary page.
 * 
 */
async function openSummary(){
    let summary = document.getElementById('summary');  
    let imgSummaryFooterMenu = document.getElementById('imgSummaryFooterMenu');
    closeBoard();
    closeAddTask();
    closeContacts();
    closeHelp();
    await displayWelcomeMsg();
    summary.classList.remove('d-none');
    imgSummaryFooterMenu.src = "../assets/img/summary_button_clicked.png"
    document.getElementById('btn_summary_FooterMenuDesktopVersion').classList.add('selectedBtn');
    initSummary();  
}

/**
 * This function ist to close the summary page.
 * 
 */
function closeSummary(){
    let summary = document.getElementById('summary');
    let imgSummaryFooterMenu = document.getElementById('imgSummaryFooterMenu');
    summary.classList.add('d-none');
    imgSummaryFooterMenu.src = "../assets/img/summary_button_default.png"
    document.getElementById('btn_summary_FooterMenuDesktopVersion').classList.remove('selectedBtn');
}

/**
 * This function is to open the board page.
 * 
 */
function openBoard(){
    section = "Board";
    let board = document.getElementById('board');  
    let imgBoardFooterMenu = document.getElementById('imgBoardFooterMenu');
    closeSummary();
    closeAddTask();
    closeContacts();
    closeHelp();
    imgBoardFooterMenu.src = "../assets/img/board_button_clicked.png";
    document.getElementById('btn_board_FooterMenuDesktopVersion').classList.add('selectedBtn');
    initBoard();
    board.classList.remove('d-none'); 
}

/**
 * This function is to close the board page.
 * 
 */
function closeBoard(){
    let board = document.getElementById('board');  
    let imgBoardFooterMenu = document.getElementById('imgBoardFooterMenu');
    board.classList.add('d-none'); 
    imgBoardFooterMenu.src = "../assets/img/board_button_default.png";
    document.getElementById('btn_board_FooterMenuDesktopVersion').classList.remove('selectedBtn'); 
}

/**
 * This function is to open the add Task page.
 * 
 */
async function openAddTask(){
    section = "AddTask";
    await loadAddTask();
    await initAddTask();  
    let addTask = document.getElementById('addTask');
    let imgAddFooterMenu = document.getElementById('imgAddFooterMenu');
    closeSummary();
    closeBoard();
    closeContacts();
    closeHelp();
    imgAddFooterMenu.src = "../assets/img/add_button_clicked.png"
    document.getElementById('btn_add_FooterMenuDesktopVersion').classList.add('selectedBtn');
    addTask.classList.remove('pos-absolute');
    addTask.classList.remove('d-none'); 
}

/**
 * This function is to load the addTask page to inner HTML.
 * 
 */
async function loadAddTask(){
    let addTask = document.getElementById('addTask');
    let resp = await fetch("../templates/addTask.html");
    if (resp.ok) {
        addTask.innerHTML = await resp.text();
    } else {
        addTask.innerHTML = 'Page not found';
    }
}

/**
 * This function is to close the add Task page.
 * 
 */
function closeAddTask(){
    let addTask = document.getElementById('addTask');
    let imgAddFooterMenu = document.getElementById('imgAddFooterMenu');  
    addTask.classList.add('d-none'); 
    addTask.innerHTML = ''; 
    imgAddFooterMenu.src = "../assets/img/add_button_default.png"
    document.getElementById('btn_add_FooterMenuDesktopVersion').classList.remove('selectedBtn');
}

/**
 * This function ist to open the contact page.
 * 
 */
function openContacts(){
    section = "Contacts";
    let contacts = document.getElementById('contacts');
    let imgContactsFooterMenu = document.getElementById('imgContactsFooterMenu');  
    closeSummary();
    closeBoard();
    closeAddTask();
    closeHelp();
    imgContactsFooterMenu.src="../assets/img/contacts_button_clicked.png"
    document.getElementById('btn_contacts_FooterMenuDesktopVersion').classList.add('selectedBtn');
    contacts.classList.remove('d-none'); 
    initContacts();
}

/**
 * This function ist to close the contact page.
 * 
 */
function closeContacts(){
    let contacts = document.getElementById('contacts');
    let imgContactsFooterMenu = document.getElementById('imgContactsFooterMenu');   
    contacts.classList.add('d-none');
    imgContactsFooterMenu.src="../assets/img/contacts_button_default.png"
    document.getElementById('btn_contacts_FooterMenuDesktopVersion').classList.remove('selectedBtn');  
}

/**
 * This function is to open the help page.
 * 
 */
function openHelp(){
    closeSubmenu();
    closeHelp();
    let help = document.getElementById('help');
    closeSummary();
    closeAddTask();
    closeBoard();
    closeContacts();
    help.classList.remove('d-none');
}

/**
 * This function is to open the privacy policy page.
 * 
 */
function openPrivacy(){
    let privacypolicy = document.getElementById('privacypolicy');
    let btnPrivacy = document.getElementById('btnPrivacy');
    closeSubmenu();
    closeHelp();    
    closeSummary();
    closeAddTask();
    closeBoard();
    closeContacts();
    privacypolicy.classList.remove('d-none');
    btnPrivacy.classList.add('footerPolicyAnchorSelect');
}

/**
 * This function is to open the legal notice page.
 * 
 */
function openLegal(){
    closeSubmenu();
    closeHelp();
    let legalnotice = document.getElementById('legalnotice');
    let btnLegal = document.getElementById('btnLegal');
    closeSummary();
    closeAddTask();
    closeBoard();
    closeContacts();
    legalnotice.classList.remove('d-none');
    btnLegal.classList.add('footerPolicyAnchorSelect');
}

/**
 * This function is to close the help, legal notice or privacypolicy page.
 * 
 */
function closeHelp(){
    let help = document.getElementById('help');
    let privacypolicy = document.getElementById('privacypolicy');
    let legalnotice = document.getElementById('legalnotice');
    let btnLegal = document.getElementById('btnLegal');
    let btnPrivacy = document.getElementById('btnPrivacy');
    help.classList.add('d-none');
    privacypolicy.classList.add('d-none');
    legalnotice.classList.add('d-none');
    btnPrivacy.classList.remove('footerPolicyAnchorSelect');
    btnLegal.classList.remove('footerPolicyAnchorSelect');
}

/**
 * This function is to open the last when you click on back from the help, legal notice or privacy policy page.
 * 
 */
function backHelp(){
    closeHelp();
    switch(section){
    case "Summary":
        openSummary();
        break;
    case "AddTask":
        openAddTask();
        break;
    case "Board":
        openBoard();
        break;
    case "Contacts":
        openContacts();
        break;
    }
}