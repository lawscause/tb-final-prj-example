
//log out by remove the items from local storage
//send the user to the index page
var doLogOut = () => {
  localStorage.removeItem(siteUsersKey);
  localStorage.removeItem(loggedInUserKey);
  localStorage.removeItem(bookListKey);

  console.dir(JSON.parse(localStorage.getItem(siteUsersKey)));
  console.dir(JSON.parse(localStorage.getItem(loggedInUserKey)));
  console.dir(JSON.parse(localStorage.getItem(bookListKey)));
  window.location.href = "index.html";
};


//show the user information in a user div on
//the screen.  The userDiv has to be added to the page 
//for this to work
var doUserInfo = () => {
  let loggedInUser = getLoggedInUser();
  let userDiv = document.getElementById("userDiv");
  console.dir(loggedInUser);
  let name = document.createElement("div");
  console.dir(loggedInUser);
  name.innerText = "Name: " + loggedInUser.employee.name;
  let idNumber = document.createElement("div");
  idNumber.innerText = "ID: " + loggedInUser.employee.idNumber;
  let type = document.createElement("div");
  type.innerText = "Type: " + loggedInUser.employee.employeeType;

  userDiv.appendChild(name);
  userDiv.appendChild(idNumber);
  userDiv.appendChild(type);
};


//check to see if the user is on the login page otherwise it will go to the login page.
doLoggedInCheck();