class MyBook {
  constructor(title, author, genre, imageSrc) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.imageSrc = imageSrc;
  }
}

var bookArray = [];

var DeleteBook = () => {
  debugger;

  const fruits = ["Apple", "Orange", "Cherry", "Mango", "Banana"];

  const removed = fruits.splice(2, 1);

  console.log(fruits); // ['Apple', 'Orange', 'Mango', 'Banana']
  console.log(removed); // ['Cherry']

  let toDelete = document.getElementById("toDelete");
  let deleteThis = null;
  for (let i = 0; i < bookArray.length; i++) {
    console.log("bookArray: ", bookArray);
    if (bookArray[i].title == toDelete.value) {
      deleteThis = i;

      console.log("deleteThis: ", deleteThis);
      break;
    }
  }

  if (deleteThis != null) {
    let x = bookArray.splice(deleteThis, 1);
    console.log(x);
    console.log("bookArray: ", bookArray);
  }
};

var AddBook = () => {
  debugger;

  let tbTitle = document.getElementById("title-inp");

  let aBook = new MyBook(
    tbTitle.value,
    "author",
    "genre",
    "https://www.w3schools.com/html/img_girl.jpg"
  );

  bookArray.push(aBook);
};

var makeFlex = () => {
  //find the bookList
  let bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  debugger;

  for (let i = 0; i < bookArray.length; i++) {
    let aBook = bookArray[i];
    //create element for the new row div
    let newRow = document.createElement("div");
    newRow.classList.add("flex-container");

    //create an element for each div that represents a portion of a book
    let divTitle = document.createElement("div");
    divTitle.innerText = aBook.title;
    let divAuthor = document.createElement("div");
    divAuthor.innerText = aBook.author;
    let divGenre = document.createElement("div");
    divGenre.innerText = aBook.genre;
    //create div for image and add html that represents the image
    let image = document.createElement("div");
    image.innerHTML = "<img src=" + aBook.imageSrc + ' alt="Girl in a jacket">';

    //add the inner divs for each of the portions of the book that were created
    newRow.appendChild(divTitle);
    newRow.appendChild(divAuthor);
    newRow.appendChild(divGenre);
    newRow.appendChild(image);

    //add the row to the booklist
    bookList.appendChild(newRow);
  }
};
