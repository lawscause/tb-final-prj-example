readFromArray();

// Get the modal
var modal = document.getElementById("id01");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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

  for (let i = 0; i < bookList.length; i++) {
    let book = bookList[i];
    if (
      bookList[i].title &&
      tbTitle.value &&
      bookList[i].title.toUpperCase() == tbTitle.value.toUpperCase() &&
      bookList[i].author &&
      tbAuthor.value &&
      bookList[i].author.toUpperCase() == tbAuthor.value.toUpperCase()
    ) {
      alert("This book is already a part of the collection.");
      found = true;
    }
  }

  if (!found) {
    console.log("found: ", found);
    let newBook = new Book(
      tbTitle.value,
      tbAuthor.value,
      ddlGenre.value,
      tbLength.value,
      tbPublisher.value
    );

    console.log("newBook: ", newBook);
    bookList.push(newBook);

    console.log("newList: ", bookList);
    setBookList(bookList);
    console.log("getBookList(): ", getBookList());

    readFromArray();
  }

  modal.style.display = "none";
  e.preventDefault();
};
