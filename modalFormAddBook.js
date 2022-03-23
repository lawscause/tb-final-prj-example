readFromArray();

// Get the modal
var mdlFormAdd = document.getElementById("mdlFormAdd");
var mdlFormUpdate = document.getElementById("mdlFormUpdate");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == mdlFormAdd) {
    mdlFormAdd.style.display = "none";
  }

  if (event.target == mdlFormUpdate) {
    mdlFormUpdate.style.display = "none";
  }
};

var deleteBook = (a) => {
  debugger;
  console.log(a);
  let cell = document.getElementById(a.id);

  let bookList = getBookList();
  let deleteThis = null;
  for (let i = 0; i < bookList.length; i++) {
    if (bookList[i].id == cell.parentElement.id) {
      deleteThis = i;
      break;
    }
  }

  if (deleteThis != null) {
    bookList.splice(deleteThis, 1);
  }

  bookList.sort(sortByTitleAsc);
  setBookList(bookList);
  readFromArray();
};

var addBook = (e) => {
  let bookList = getBookList();
  let tbTitle = document.getElementById("tbTitle");
  console.log(tbTitle);
  let tbAuthor = document.getElementById("tbAuthor");
  console.log(tbAuthor);
  let ddlGenre = document.getElementById("ddlGenre");
  console.log(ddlGenre);
  let tbPublisher = document.getElementById("tbPublisher");
  console.log(tbPublisher);
  let tbLength = document.getElementById("tbLength");
  console.log(tbLength);
  let found = false;
  let maxIDNum = 0;

  for (let i = 0; i < bookList.length; i++) {
    let book = bookList[i];
    if (book.id > maxIDNum) {
      maxIDNum = book.id;
    }

    if (
      book.title &&
      tbTitle.value &&
      book.title.toUpperCase() == tbTitle.value.toUpperCase() &&
      book.author &&
      tbAuthor.value &&
      book.author.toUpperCase() == tbAuthor.value.toUpperCase()
    ) {
      alert("This book is already a part of the collection.");
      found = true;
    }
  }

  if (!found) {
    console.log("found: ", found);
    let newBook = new Book(
      maxIDNum + 10,
      tbTitle.value,
      tbAuthor.value,
      ddlGenre.value,
      tbLength.value,
      tbPublisher.value
    );

    console.log("newBook: ", newBook);
    bookList.push(newBook);
    bookList.sort(sortByTitleAsc);

    console.log("newList: ", bookList);
    setBookList(bookList);
    console.log("getBookList(): ", getBookList());

    readFromArray();
  }

  mdlFormAdd.style.display = "none";
};

var updateBook = (e) => {
  let bookList = getBookList();
  let bookID = document.getElementById("hfBookID");
  let tbTitle = document.getElementById("tbUpTitle");
  console.log(tbTitle);
  let tbAuthor = document.getElementById("tbUpAuthor");
  console.log(tbAuthor);
  let ddlGenre = document.getElementById("ddlUpGenre");
  console.log(ddlGenre);
  let tbPublisher = document.getElementById("tbUpPublisher");
  console.log(tbPublisher);
  let tbLength = document.getElementById("tbUpLength");
  console.log(tbLength);
  let found = false;

  for (let i = 0; i < bookList.length; i++) {
    let book = bookList[i];
    if (book.id && bookID.value && book.id === bookID.value) {
      found = true;
      console.log("found: ", found);
      (book.title = tbTitle.value),
        (book.author = tbAuthor.value),
        (book.genre = ddlGenre.value),
        (book.length = tbLength.value),
        (book.publisher = tbPublisher.value);

      console.log("updated: ", book);
      bookList.sort(sortByTitleAsc);

      console.log("updatedList: ", bookList);
      setBookList(bookList);
      console.log("getBookList(): ", getBookList());

      readFromArray();
      break;
    }
  }

  if (!found) {
    alert("This book is was not found as a part of the collection.");
  }

  mdlFormUpdate.style.display = "none";
};

var setupBookUpdate = (selectedElemCell) => {
  alert("setupBookUpdate selectedElemCell", selectedElemCell);
  let selectedCell = document.getElementById(selectedElemCell.id);
  console.log("setupBookUpdate ", selectedCell);

  console.log("setupBookUpdate ", selectedCell.parentElement);
  debugger;
  document.getElementById("hfBookID").value = selectedCell.parentElement.id;
  let title = selectedCell.parentElement.getElementsByClassName("title")[0];
  console.log("setupBookUpdate title", title);
  let tbUpTitle = document.getElementById("tbUpTitle");
  tbUpTitle.value = title.innerText;
  console.log("tbUpTitle", document.getElementById("tbUpTitle").value);

  let author = selectedCell.parentElement.getElementsByClassName("author")[0];
  console.log("setupBookUpdate author", author);

  document.getElementById("tbUpAuthor").value = author.innerText;
  console.log("tbUpAuthor", document.getElementById("tbUpAuthor").value);

  let genre = selectedCell.parentElement.getElementsByClassName("genre")[0];
  console.log("setupBookUpdate genre", genre);

  for (let option of document.getElementById("ddlUpGenre").options) {
    if (option.value === genre.innerText) {
      option.selected = true;
    }
  }
  console.log("ddlUpGenre", document.getElementById("ddlUpGenre").value);

  let length = selectedCell.parentElement.getElementsByClassName("length")[0];
  console.log("setupBookUpdate length", length);
  document.getElementById("tbUpLength").value = length.innerText;
  console.log("tbUpLength", document.getElementById("tbUpLength").value);

  let publisher =
    selectedCell.parentElement.getElementsByClassName("publisher")[0];
  console.log("setupBookUpdate publisher", publisher);
  document.getElementById("tbUpPublisher").value = publisher.innerText;
  console.log("tbUpPublisher", document.getElementById("tbUpPublisher").value);

  document.getElementById("mdlFormUpdate").style.display = "block";
};

var sortByTitleAsc = (a, b) => {
  if (a.title > b.title) {
    return 1;
  } else {
    return -1;
  }
};

var sortByAuthorAsc = (a, b) => {
  if (a.author > b.author) {
    return 1;
  } else {
    return -1;
  }
};
