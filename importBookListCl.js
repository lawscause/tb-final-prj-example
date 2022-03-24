var importBookList = () => {
  let fileSize = 0;
  //get file
  let theFile = document.getElementById("myFile");
  let fileArray = [];

  let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  //check if file is CSV
  if (regex.test(theFile.value.toLowerCase())) {
    //check if browser support FileReader
    if (typeof FileReader != "undefined") {
      let headerLine = "";
      //create html5 file reader object
      let myReader = new FileReader();
      // call filereader. onload function
      myReader.onload = (e) => {
        let content = myReader.result;
        //split csv file using "\n" for new line ( each row)
        let lines = content.split("\r");
        //loop all rows
        for (let count = 0; count < lines.length; count++) {
          if (0 == count) {
            //skip import of first row with column names
            continue;
          }
          debugger;
          //split each row content
          let rowContent = lines[count].split(",");
          console.log("rowContent: ", rowContent);
          let [title, author, genre, length, publisher] = rowContent;
          let aBook = new Book(
            count,
            replaceChars(title),
            replaceChars(author),
            replaceChars(genre),
            replaceChars(length),
            replaceChars(publisher)
          );
          fileArray.push(aBook);
          console.log("aBook: ", aBook);
          console.log("fileArray: ", fileArray);
        }
        setBookList(fileArray);
        readFromArray();
      };
      //call file reader onload
      myReader.readAsText(theFile.files[0]);
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }

  return false;
};

var replaceChars = (myString) => {
  console.log("replaceChars myString: ", myString);
  let result = myString;
  if (myString) {
    //let regex1 = /\\n/g;
    let result1 = myString.replace("\n", "");
    console.log("replaceChars result1: ", result1);
    //let regex = /\!#!/g;
    result = result1.replace("!#!", ",");
    console.log("replaceChars result: ", result);
  }
  return result;
};

var readFromArray = () => {
  document.body.style.cursor = "wait";
  let bookList = getBookList();

  if (bookList) {
    let tbody = document.getElementById("bookListTableBody");
    //tbody.innerHTML = "";
    removeAllChildrenOfElementByElement(tbody);
    console.log("tbody: ", tbody);
    for (let rowIndex = 0; rowIndex < bookList.length; rowIndex++) {
      //create a tr element
      let row = document.createElement("tr");
      let book = bookList[rowIndex];
      console.log("book: ", book);
      let tag = "td";

      let titleElem = document.createElement(tag);
      let titleCell = document.createTextNode(book.title);
      titleElem.appendChild(titleCell);
      titleElem.classList.add("title");
      row.appendChild(titleElem);

      let authorElem = document.createElement(tag);
      let authorCell = document.createTextNode(book.author);
      authorElem.appendChild(authorCell);
      authorElem.classList.add("author");
      row.appendChild(authorElem);

      let genreElem = document.createElement(tag);
      let genreCell = document.createTextNode(book.genre);
      genreElem.appendChild(genreCell);
      genreElem.classList.add("genre");
      row.appendChild(genreElem);

      let publisherElem = document.createElement(tag);
      let publisherCell = document.createTextNode(book.publisher);
      publisherElem.appendChild(publisherCell);
      publisherElem.classList.add("publisher");
      row.appendChild(publisherElem);

      let lengthElem = document.createElement(tag);
      let lengthCell = document.createTextNode(book.length);
      lengthElem.appendChild(lengthCell);
      lengthElem.classList.add("length");
      row.appendChild(lengthElem);

      let selectElement = document.createElement(tag);
      let selectButton = document.createElement("button");
      selectButton.innerText = "Update";
      selectButton.id = `btnUpdate_${book.id}`;
      selectButton.setAttribute("onclick", "setupBookUpdate(this)");
      selectButton.setAttribute("style", "width:auto");
      selectElement.appendChild(selectButton);
      selectElement.id = `slctElem_${book.id}`;
      //selectElement.setAttribute("onclick", "setupBookUpdate(this);");
      selectElement.classList.add("selectable");
      row.appendChild(selectElement);

      let deleteElement = document.createElement(tag);
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete";

      deleteButton.id = `btnDelete_${book.id}`;
      deleteButton.setAttribute("onclick", "deleteBook(this)");
      deleteButton.setAttribute("style", "width:auto");
      deleteElement.appendChild(deleteButton);
      deleteElement.id = `delete_${book.id}`;
      //deleteElement.setAttribute("onclick", "deleteBook(this);");
      deleteElement.classList.add("selectable");
      row.appendChild(deleteElement);

      row.setAttribute("name", "row_" + rowIndex);
      row.id = book.id;

      console.log("row: ", row);

      //append tbody to table
      tbody.appendChild(row);
      console.log("tbody: ", tbody);
    }
  } else {
    alert("The book list is empty");
  }
  document.body.style.cursor = "default";
};
