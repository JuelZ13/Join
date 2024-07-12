/**
 * This function is to generate and returns the HTML string for a name group based on the given initial.
 * The returned structure contains a letter box displaying the initial and a line box.
 *
 * @param {string} initial -The initial letter for the name group.
 * @returns {string} -The HTML string representing the name group.
 */
function GroupName(initial) {
    return `
      <div class="letter-box">
          <span class="letterBox">${initial}</span>
      </div>
      <div class="line-box">
          <div class="line"> </div>
      </div>
  `;
  }
  
  /**
   * This function is to return the HTML content for displaying the data of contacts.
   * @param {string} person-person to show 
   * @param {int} i-index of person to show 
   * @returns 
   */
  function showPersonDatas(person, i) {
    return `
    <div class="name-frame">
        <div class="name-box" id="contact${i}" onclick="showInfo(${i})">
            <div class="side-circle initials" style="background-color: ${person.color};">
                ${person.initials}
            </div>
            <div class="name-mail-frame">
                <div class="full-name">
                    ${person.name} ${person.lastName}
                </div>
                <div class="mail">
                    ${person.mail}
                </div>
            </div>
        </div>
    </div>
    `;
  }
  
  /**
   * This function is to generate and return the HTML content for displaying detailed information
   * of a given person. The function renders the person's name, initials, email, and phone
   * along with options to edit or delete the contact. Additional UI elements like a drawer 
   * with edit and delete options are also included.
   *
   * @param {Object} person - The object representing the person's data. The object should have properties: name, lastName, mail, phone, initials, and color.
   * @param {int} indexNr - The index number of the person in the contactArray or a similar array.
   * @returns {string} -The HTML content representing the detailed information of the specified person.
   */
  function showInfoText(person, indexNr) {
    return `      
      <div class="detail-header">
          <div class="detail-headline">
              <div>Contact Informations</div>
              <button class="close-detail" id="closeInfo" onclick="closeInfo()"><img src="../assets/img/arrow-left-line.svg" alt="back"></button>   
          </div>
          <div class="detail-name-box">
              <div class="detail-circle" style="background-color: ${person.color}">
                  ${person.initials}
              </div>
              <div>                      
                  <div class="detail-name">
                      ${person.name} ${person.lastName}
                  </div>
                  <div class="detail-buttons" id="moreRow">
                      <div class="more-row-box" onclick="openEdit(${indexNr})">
                          <img src="../assets/img/edit.png" alt="Edit">
                          <span>Edit</span>
                      </div>
                      <div class="more-row-box" onclick="deleteContact(${indexNr})">
                          <img src="../assets/img/delete.png" alt="Delete">
                          <span>Delete</span>
                      </div>
                  </div>
              </div>    
          </div>
      </div>
  
      <div>
        <div class="detail-description">
          Email
        </div>
        <div class="detail-info">
          <a class="mail" href="mailto:${person.mail}">${person.mail}</a>
        </div>
        <div class="detail-description">
          Phone
        </div>
        <div class="detail-info">
          <a href="tel:${person.phone}">${person.phone}</a>
        </div>
      </div>
            
      <button class="detail-more-btn" id="moreBtn" onclick="openDrawer(event);">
          <img src="../assets/img/more_btn.svg" alt="">
      </button>
      <div id="drawer" class="d-none">
          <div class="drawer-item" onclick="openEdit(${indexNr})">
              <img src="../assets/img/edit.png" alt="Edit">
              <span>Edit</span>
          </div>
          <div class="drawer-item" onclick="deleteContact(${indexNr})">
              <img src="../assets/img/delete.png" alt="Delete">
              <span>Delete</span>
          </div>
      </div> 
    `
  }