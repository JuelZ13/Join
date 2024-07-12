let submenushow = false;

/**
 * This function is to switch the header submenu.
 * 
 */
function switchSubmenu() {
    if(submenushow){
        closeSubmenu();
        submenushow = false;
    }else{
        showSubmenu();
        submenushow = true;
    }
}

/**
 * This function is to show the header submenu.
 * 
 */
function showSubmenu() {
    let subMenu = document.getElementById('submenuMobile');
    subMenu.classList.remove('d-none');
}
/**
 * This function is to close the header submenu.
 * 
 */
function closeSubmenu() {
    let subMenu = document.getElementById('submenuMobile');
    subMenu.classList.add('d-none');
    submenushow = false;
}

/**
 * This function is to switch the location to the login page.
 * 
 */
function openLogin(){
    window.location = `../index.html`;
}