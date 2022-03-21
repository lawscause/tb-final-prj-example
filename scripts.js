let permissionSet = { add: true, update: true, delete: true, list: true };
var siteUsersKey = "site-Users";
var getSiteUsrs = () => {
  return localStorage.getItem(siteUsersKey)
    ? JSON.parse(localStorage.getItem(siteUsersKey))
    : [];
};
var loggedInUserKey = "logged-in-user";
var getLoggedInUser = () => {
  return JSON.parse(localStorage.getItem(loggedInUserKey));
};

var setLoggedInUser = (user) => {
  localStorage.setItem(loggedInUserKey, JSON.stringify(user));
  return JSON.parse(localStorage.getItem(loggedInUserKey));
};

var bookListKey = "book-list";

var setUpBookList = () => {
  if (!localStorage.getItem(bookListKey)) {
    localStorage.setItem(bookListKey, JSON.stringify([]));
  }
};

var getBookList = () => {
  return JSON.parse(localStorage.getItem(bookListKey));
};

var setBookList = (bookList) => {
  localStorage.setItem(bookListKey, JSON.stringify(bookList));
  return JSON.parse(localStorage.getItem(bookListKey));
};

class SiteUser {
  constructor(userName, password, employee) {
    this.userName = userName;
    this.password = password;
    this.employee = employee;
  }
}

class Employee {
  constructor(name, idNumber, permissions, storeNumber) {
    this.name = name;
    this.idNumber = idNumber;
    this.permissions = permissions;
    this.storeNumber = storeNumber;
    this.employeeType = "Employee";

    console.dir("Employee constructor name: ", name);
    console.dir("Employee constructor idNumber: ", idNumber);
    console.dir("Employee constructor storeNumber: ", storeNumber);
    console.dir("Employee constructor permissions: ", permissions);
    console.dir("Employee constructor this.permissions: ", this.permissions);
  }
}

class Manager extends Employee {
  constructor(name, idNumber, permissions, storeNumber, employees) {
    super(name, idNumber, permissions, storeNumber);
    this.employees = employees;
    this.employeeType = "Manager";
  }
  modifyEmployeePermissions(employee, updatedPermissionSet) {
    let foundEmployee = false;
    for (let i = 0; i < this.employees.length; i++) {
      if (employee.idNumber === this.employees[i].idNumber) {
        employee.permissions = updatedPermissionSet;
        foundEmployee = true;
        break;
      }
    }

    return employee;
  }
}

class BookFull {
  constructor(
    title,
    author,
    format,
    language,
    isbn,
    releaseDate,
    publisher,
    length
  ) {
    this.title = title;
    this.author = author;
    this.format = format;
    this.language = language;
    this.isbn = isbn;
    this.releaseDate = releaseDate;
    this.publisher = publisher;
    this.length = length;
  }
}

class Book {
  constructor(title, author, genre, length, publisher) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.length = length;
    this.publisher = publisher;
  }
}

var login = (usrName, password) => {
  setLoggedInUser(null);
  let loggedIn = false;
  let users = getSiteUsrs();
  for (let i = 0; i < users.length; i++) {
    if (usrName === users[i].userName && password === users[i].password) {
      setLoggedInUser(users[i]);
      loggedIn = true;
      break;
    }
  }

  return loggedIn;
};

var setUpUsersStorage = () => {
  if (!localStorage.getItem(siteUsersKey)) {
    localStorage.setItem(siteUsersKey, JSON.stringify([]));
  }
};

var addSiteUser = (userName, password, employee) => {
  console.log("addSiteUser");
  //if the site Users array exists read it from json otherwise
  //return an empty array
  let users = getSiteUsrs();

  console.dir("addSiteUser users", users);

  //create a new SiteUser with the userName, the password, and employee
  let aUser = new SiteUser(userName, password, employee);
  //push that into the array
  users.push(aUser);

  //save the array by converting it into a json string
  localStorage.setItem(siteUsersKey, JSON.stringify(users));

  console.dir("addSiteUser users: ", users);
};

var createInitialUsers = () => {
  let mainEmployee = new Employee(
    "Anne Employee",
    23,
    { add: true, update: true, delete: false, list: true },
    1
  );

  console.dir(mainEmployee);
  let secEmployee = new Employee(
    "Sec Employee",
    45,
    { add: true, update: false, delete: false, list: true },
    1
  );
  console.dir(secEmployee);
  let mainManager = new Manager(
    "Theo Manager",
    3,
    { add: true, update: true, delete: true, list: true },
    1,
    [mainEmployee, secEmployee]
  );

  console.dir(mainManager);
  addSiteUser("employee1", "testing1234", mainEmployee);
  addSiteUser("manager1", "testing5678", mainManager);
};

var doSetup = () => {
  setUpUsersStorage();
  setUpBookList();
  let siteUserArr = getSiteUsrs();
  if (siteUserArr.length < 1) {
    createInitialUsers();
  }
};

var doLoggedInCheck = () => {
  //if not on the login page
  if (!window.location.href.toLowerCase().includes("login.html")) {
    console.log("doLoggedInCheck - Not login.html or formLogin.html");
    //grab the loggedInUser from localStorage
    let loggedInUser = getLoggedInUser();
    console.log("doLoggedInCheck - ", loggedInUser);
    //if the loggedInUser is null this means you aren't logged in
    //send them to the login page
    if (loggedInUser == null) {
      console.log("doLoggedInCheck - transfering to login.html");
      window.location.href = "login.html";
    }
  } else {
    //if you are on the login page
    //do the setup for the site.
    console.log("doLoggedInCheck - login.html");
    doSetup();
  }
};

var doLogin = () => {
  let tbUserName = document.getElementById("userName");
  let tbPassword = document.getElementById("password");

  console.log(tbUserName, tbPassword);

  if (login(tbUserName.value, tbPassword.value)) {
    window.location.href = "index.html";
  } else {
    alert("Incorrect username and/or password");
  }
};

var goToList = () => {
  let loggedInUser = getLoggedInUser();
  console.dir(loggedInUser.employee);
  console.dir(loggedInUser.employee.permissions);
  if (loggedInUser.employee.permissions.list) {
    window.location.href = "list.html";
  } else {
    alert("This user does not have permission to access the list.");
  }
};

var goToAdd = () => {
  let loggedInUser = getLoggedInUser();
  console.dir(loggedInUser.employee);
  console.dir(loggedInUser.employee.permissions);
  if (loggedInUser.employee.permissions.list) {
    window.location.href = "add.html";
  } else {
    alert("This user does not have permission to access the add page.");
  }
};

var goToUpdate = () => {
  let loggedInUser = getLoggedInUser();
  console.dir(loggedInUser.employee);
  console.dir(loggedInUser.employee.permissions);
  if (loggedInUser.employee.permissions.update) {
    window.location.href = "update.html";
  } else {
    alert("This user does not have permission to access the update page.");
  }
};

var goToDelete = () => {
  let loggedInUser = getLoggedInUser();
  console.dir(loggedInUser.employee);
  console.dir(loggedInUser.employee.permissions);
  if (loggedInUser.employee.permissions.delete) {
    window.location.href = "delete.html";
  } else {
    alert("This user does not have permission to access the delete page.");
  }
};

/*
Set the active row by looping through all
the rows of the table bookListTable
if the row is equal to the row clicked then
set it's class to active-row otherwise
remove active-row from it's classList
*/
const doSetRowActive = (rowElement) => {
  console.log("rowElement: ", rowElement);
  const table = document.getElementById("bookListTable");
  console.log("table: ", table);

  for (const row of table.rows) {
    console.log("row: ", row);
    if (row.id == rowElement.id) {
      row.classList.add("active-row");
    } else {
      row.classList.remove("active-row");
    }
  }
};

//https://www.w3schools.com/howto/howto_js_sort_table.asp
var sortTable = (n) => {
  document.body.style.cursor = "wait";
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  table = document.getElementById("bookListTable");
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  /* Make a loop that will continue until
    no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
      first, which contains table headers): */
    for (i = 1; i < rows.length - 1; i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
        one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
        based on the direction, asc or desc: */
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
        and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /* If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  document.body.style.cursor = "default";
};

var doSetActiveRow = (selectedElemCell) => {
  alert("doSetActiveRow ");
  let selectedCell = document.getElementById(selectedElemCell.id);

  console.log("doSetActiveRow ", selectedCell.parentElement);
};

var doDeleteRow = (selectedElemCell) => {
  alert("doDeleteRow ");
  let selectedCell = document.getElementById(selectedElemCell.id);
  console.log("doDeleteRow ", selectedCell.parentElement);
  let booksList = getBookList();
  console.log(booksList);
  //const index = booksList.indexOf('x');
  const index = selectedElemCell.id - 1;

  console.log(booksList[index]);
  if (index > -1) {
    booksList.splice(index, 1);
  }
  console.log(booksList);
  setBookList(booksList);
};
