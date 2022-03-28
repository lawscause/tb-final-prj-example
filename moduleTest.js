//create function and export it
export const doTest = (e) => {
  console.log(e);
  if (e) {
    e.preventDefault();
  }

  let tbUserName = document.getElementById("userName");
  let tbPassword = document.getElementById("password");
  console.log(tbUserName);
  console.log(tbPassword);

  alert(
    `The username is \"${tbUserName.value}\" and the password is \"${tbPassword.value}\"`
  );
};
