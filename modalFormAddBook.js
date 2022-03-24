readFromArray();

// Get the modals
var mdlFormAdd = document.getElementById("mdlFormAdd");
var mdlFormUpdate = document.getElementById("mdlFormUpdate");

// When the user clicks anywhere outside of the modals, close them
window.onclick = function (event) {
  if (event.target == mdlFormAdd) {
    mdlFormAdd.style.display = "none";
  }

  if (event.target == mdlFormUpdate) {
    mdlFormUpdate.style.display = "none";
  }
};

//Delete a book from the screen when the Delete button is pushed on
//that row.
var deleteBook = (a) => {
  console.log(a);

  let answer = confirm("Click OK to continue with delete, otherwise cancel.");
  if (true == answer) {
    //get the list of books
    let bookList = getBookList();
    //create a variable to hold which book in the list to delete
    let deleteThis = null;
    //look through all the books in the list until you find the one with
    //the same id number as the number stored in the element id passed in
    //the book in the row has it's id stored so that it can be matched here
    for (let i = 0; i < bookList.length; i++) {
      if (bookList[i].id == getNumberFromID(a.id)) {
        deleteThis = i;
        break;
      }
    }

    //if an id was found then use splice to remove it from the array
    if (deleteThis != null) {
      bookList.splice(deleteThis, 1);
    }

    //sort the books
    bookList.sort(sortByTitleAsc);
    //set the bookList in local storage to the updated sorted list
    setBookList(bookList);
    //use the array to update the table on the screen
    readFromArray();
  }
};

//Add a book when the add button is pushed on the Add button modal
var addBook = (e) => {
  //get the list of books from local storage
  let bookList = getBookList();
  //create variable that stores the values from each of
  //the input controls on the Add modal
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
  //indicate that the book hasn't been found
  let found = false;
  //indicate the current maximum ID number in the array
  let maxIDNum = 0;

  //look through each book in the list
  for (let i = 0; i < bookList.length; i++) {
    //set a variable that represent the current book in the list
    let book = bookList[i];
    //if the current book's id number is greater than the max
    //make it the max
    if (book.id > maxIDNum) {
      maxIDNum = book.id;
    }

    //determine if the title and author are the same
    //as a book that already exists in the list.
    //Do not let a user put in a duplicate based on these criteria.
    if (
      book.title &&
      tbTitle.value &&
      book.title.toUpperCase() == tbTitle.value.toUpperCase() &&
      book.author &&
      tbAuthor.value &&
      book.author.toUpperCase() == tbAuthor.value.toUpperCase()
    ) {
      alert(
        "This book (title & author combination) is already a part of the collection."
      );
      found = true;
    }
  }

  //if the book info isn't in the list
  // create a Book based on the info
  //add it to the bookList
  //sort the booklist
  //store the updated booklist in local storage
  //update the screen with the list from the array

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
  //stop showing the modal
  mdlFormAdd.style.display = "none";
};

//update the book

var updateBook = (e) => {
  debugger;
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

  //look the list to find the book to update by
  //comparing the ID in the hfBookID hidden field
  //with the book.id
  //if they are the same update the book's inforation
  //in the object with the information from the modal
  //sort the list
  //store the list in local storage
  //update the screen table with the inforamtion from the array
  for (let i = 0; i < bookList.length; i++) {
    let book = bookList[i];
    console.log("book.id: ", book.id);
    console.log("bookID.value: ", bookID.value);
    console.log("book.id == bookID.value: ", book.id == bookID.value);
    if (book.id && bookID.value && book.id == bookID.value) {
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

  //warn if the book is no longer in the list.
  if (!found) {
    alert("This book is was not found as a part of the collection.");
  }

  //stop displaying the modal
  mdlFormUpdate.style.display = "none";
};

//set up the book update modal
//use the information from the update button in that row
//place the information from each column in the row into
//the correct input in the update modal
//then show the update modal
var setupBookUpdate = (selectedElemCell) => {
  let selectedCell = document.getElementById(selectedElemCell.id);
  console.log("setupBookUpdate ", selectedCell);

  console.log("setupBookUpdate ", selectedCell.parentElement);
  document.getElementById("hfBookID").value = getNumberFromID(
    selectedCell.parentElement.id
  );
  //selectedCell -> button
  //selectedCell.parentElement -> td of button
  //selectedCell.parentElement.parentElement -> tr of td of button
  let row = selectedCell.parentElement.parentElement;
  debugger;
  let title = row.getElementsByClassName("title")[0];
  console.log("setupBookUpdate title", title);
  let tbUpTitle = document.getElementById("tbUpTitle");
  tbUpTitle.value = title.innerText;
  console.log("tbUpTitle", document.getElementById("tbUpTitle").value);

  let author = row.getElementsByClassName("author")[0];
  console.log("setupBookUpdate author", author);

  document.getElementById("tbUpAuthor").value = author.innerText;
  console.log("tbUpAuthor", document.getElementById("tbUpAuthor").value);

  let genre = row.getElementsByClassName("genre")[0];
  console.log("setupBookUpdate genre", genre);

  //loop through the Genre drop down list options on the modal
  //and select the one that matches the Genre listed in the table row.
  for (let option of document.getElementById("ddlUpGenre").options) {
    if (option.value === genre.innerText) {
      option.selected = true;
    }
  }
  console.log("ddlUpGenre", document.getElementById("ddlUpGenre").value);

  let length = row.getElementsByClassName("length")[0];
  console.log("setupBookUpdate length", length);
  document.getElementById("tbUpLength").value = length.innerText;
  console.log("tbUpLength", document.getElementById("tbUpLength").value);

  let publisher = row.getElementsByClassName("publisher")[0];
  console.log("setupBookUpdate publisher", publisher);
  document.getElementById("tbUpPublisher").value = publisher.innerText;
  console.log("tbUpPublisher", document.getElementById("tbUpPublisher").value);

  //show the update modal
  document.getElementById("mdlFormUpdate").style.display = "block";
};

//functions for the sort method on an array of books
var sortByTitleAsc = (a, b) => {
  if (a.title > b.title) {
    return 1;
  } else {
    return -1;
  }
};

var sortByTitleDesc = (a, b) => {
  if (a.title < b.title) {
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

var sortByAuthorDesc = (a, b) => {
  if (a.author < b.author) {
    return 1;
  } else {
    return -1;
  }
};

var sortByGenreAsc = (a, b) => {
  if (a.genre > b.genre) {
    return 1;
  } else {
    return -1;
  }
};

var sortByGenreDesc = (a, b) => {
  if (a.genre < b.genre) {
    return 1;
  } else {
    return -1;
  }
};

var sortByPublisherAsc = (a, b) => {
  if (a.publisher > b.publisher) {
    return 1;
  } else {
    return -1;
  }
};

var sortByPublisherDesc = (a, b) => {
  if (a.publisher < b.publisher) {
    return 1;
  } else {
    return -1;
  }
};

var sortByLengthAsc = (a, b) => {
  if (a.length > b.length) {
    return 1;
  } else {
    return -1;
  }
};

var sortByLengthDesc = (a, b) => {
  if (a.length < b.length) {
    return 1;
  } else {
    return -1;
  }
};
