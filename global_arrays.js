/**
 * store the login information from the users
 */
let users = [];

/**
 * store the added tasks 
 */
let addedTasks = [
  {
    toDo: [],
    inProgress: [],
    awaitFeedback: [],
    done: []
  },
];

/**
 * store the contacts
 */
let contactArray = [
  {
    name: "Anton",
    lastName: "Meyer",
    mail: "antom@gmail.com",
    phone: "+49 1111 111 11 1",
    initials: "AM",
    color: "var(--user-orange)"
  },
  {
    name: "Anja",
    lastName: "Schulz",
    mail: "schulz@hotmail.com",
    phone: "+49 1234 567890",
    initials: "AS",
    color: "var(--user-lila)"
  },
  {
    name: "Benedikt",
    lastName: "Ziegler",
    mail: "benedikt@gmail.com",
    phone: "+49 1234 567890",
    initials: "BZ",
    color: "var(--user-lila)"
  },
  {
    name: "David",
    lastName: "Eisenberg",
    mail: "davidberg@gmail.com",
    phone: "+49 1234 567890",
    initials: "DE",
    color: "var(--user-rose)"
  },
  {
    name: "Eva",
    lastName: "Fischer",
    mail: "eva@gmail.com",
    phone: "+49 1234 567890",
    initials: "EF",
    color: "var(--user-yellow)"
  },
  {
    name: "Emmanuel",
    lastName: "Mauer",
    mail: "emmanuelma@gmail.com",
    phone: "+49 1234 567890",
    initials: "EM",
    color: "var(--user-green)"
  },
  {
    name: "Marcel",
    lastName: "Bauer",
    mail: "bauer@gmail.com",
    phone: "+49 1234 567890",
    initials: "MB",
    color: "var(--user-turquoise)"
  },
  {
    name: "Tatjana",
    lastName: "Wolf",
    mail: "wolf@gmail.com",
    phone: "+49 1234 567890",
    initials: "TW",
    color: "var(--user-red)"
  }
];

/**
 * store the initals from a contact
 */
let initialGroups = [];

/**
 * store the selectebel colors to add or edit a contact
 */
let userColors = {
  grey: "var(--user-grey)",
  orange: "var(--user-orange)",
  lila: "var(--user-lila)",
  blue: "var(--user-blue)",
  rose: "var(--user-rose)",
  yellow: "var(--user-yellow)",
  green: "var(--user-green)",
  red: "var(--user-red)",
  turquoise: "var(--user-turquoise)"
};