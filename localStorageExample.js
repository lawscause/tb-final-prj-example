debugger;
const userKey = "user-key";

var setUpUser = () => {
  if (!localStorage.getItem(userKey)) {
    localStorage.setItem(userKey, "");
  }
};

var getUser = () => {
  return JSON.parse(localStorage.getItem(userKey));
};

var setUser = (aUser) => {
  localStorage.setItem(userKey, JSON.stringify(aUser));
  return JSON.parse(localStorage.getItem(userKey));
};

var usr = {
  username: "myusername",
  password: "mypassword",
  somethingElse: "stuff",
};

const userArr = [usr];

userArr[1].password

var setUpSite = (mainUser) => {
  setUser(mainUser);
};
var login = (user) => {
  setUpUser();
  let myUser = getUser();
  if (user.password == myUser.password && user.username == myUser.username) {
    alert("You are logged in");
  } else {
    alert("nope");
  }
};

setUpSite(usr);

login({
  username: "myusername",
  password: "mypassword",
});

login({
  username: "alakjdlf",
  password: "mypassword",
});
