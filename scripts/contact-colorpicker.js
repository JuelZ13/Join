/**
 * This function is to open the color picker for choose a contact color.
 * 
 */
function openColorPicker() {
    let colorPicker = document.getElementById("colorPicker");
  
    if (colorPicker.style.display === "none") {
      colorPicker.style.display = "flex";
    } else {
      colorPicker.style.display = "none";
    }
    updateColors();
  }
  
  /**
  * This function is to updates the content of the color picker with available user colors.
  */
  function updateColors() {
    let colorPicker = document.getElementById("colorPicker");
    colorPicker.innerHTML = colorsInPicker();
  }
  
  /**
  * This function is to generate the HTML code for the color picker.
  *
  * @returns {string} The HTML string representing color options for the picker.
  */
  function colorsInPicker() {
    let pickerBox = "";
    for (let color in userColors) {
      pickerBox += `
          <div class="color-option" 
          style="background-color: ${userColors[color]};" 
          onclick="setColor('${color}', event)"></div>
          `;
    }
    return pickerBox;
  }
  
  /**
  * This function is to set the background color of the specified element based on the selected user color.
  * Hides the color picker and updates the background color of the editor's detail ellipse if it exists.
  *
  * @param {string} color - The key representing the user color.
  * @param {Event} event - The click event triggering this function.
  */
  function setColor(color, event) {
    event.stopPropagation();
    document.getElementById("colorBox").style.backgroundColor = userColors[color];
    let colorPicker = document.getElementById("colorPicker");
    colorPicker.style.display = "none";
    if (document.querySelector(".editor")) {
      let detailEllipse = document.getElementById("popup-circle");
      detailEllipse.style.backgroundColor = userColors[color];
    }
  }