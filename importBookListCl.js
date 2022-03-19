const importBookList = () => {
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
          //split each row content
          let rowContent = lines[count].split(",");
          console.log("rowContent: ", rowContent);
          let [title, author, genre, length, publisher] = rowContent;
          let aBook = new Book(
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
    let table = document.getElementById("bookListTable");
    console.log("table: ", table);
    let thead = document.createElement("thead");
    console.log("thead: ", thead);
    let tbody = document.createElement("tbody");
    console.log("tbody: ", tbody);
    for (let rowIndex = 0; rowIndex < bookList.length; rowIndex++) {
      //create a tr element
      let row = document.createElement("tr");
      let book = bookList[rowIndex];
      console.log("book: ", book);
      let tag = "td";
      if (rowIndex == 0) {
        tag = "th";
      } else {
        tag = "td";
      }

      let titleElem = document.createElement(tag);
      let titleCell = document.createTextNode(book.title);
      titleElem.appendChild(titleCell);

      if (rowIndex == 0) {
        titleElem.setAttribute("onclick", "sortTable(0);");
      }
      row.appendChild(titleElem);

      let authorElem = document.createElement(tag);
      let authorCell = document.createTextNode(book.author);
      authorElem.appendChild(authorCell);
      if (rowIndex == 0) {
        authorElem.setAttribute("onclick", "sortTable(1);");
      }
      row.appendChild(authorElem);

      let genreElem = document.createElement(tag);
      let genreCell = document.createTextNode(book.genre);
      genreElem.appendChild(genreCell);
      if (rowIndex == 0) {
        genreElem.setAttribute("onclick", "sortTable(2);");
      }
      row.appendChild(genreElem);

      let publisherElem = document.createElement(tag);
      let publisherCell = document.createTextNode(book.publisher);
      publisherElem.appendChild(publisherCell);
      if (rowIndex == 0) {
        publisherElem.setAttribute("onclick", "sortTable(3);");
      }
      row.appendChild(publisherElem);

      let lengthElem = document.createElement(tag);
      let lengthCell = document.createTextNode(book.length);
      lengthElem.appendChild(lengthCell);
      if (rowIndex == 0) {
        lengthElem.setAttribute("onclick", "sortTable(4);");
      }
      row.appendChild(lengthElem);

      let selectElement = document.createElement(tag);
      let selectCell = document.createTextNode("select");
      selectElement.appendChild(selectCell);
      selectElement.id = "slctElem" + rowIndex;
      selectElement.setAttribute("onclick", "doSetActiveRow(this);");
      row.appendChild(selectElement);

      let deleteElement = document.createElement(tag);
      let deleteCell = document.createTextNode("delete");
      deleteElement.appendChild(deleteCell);
      deleteElement.id = rowIndex;
      deleteElement.setAttribute("onclick", "doDeleteRow(this);");
      row.appendChild(deleteElement);

      row.id = "row" + rowIndex;
      //row.setAttribute("onclick", "doSetRowActive(this);");

      console.log("row: ", row);
      if (rowIndex == 0) {
        //append thead to table contents
        thead.appendChild(row);
        console.log("thead: ", thead);
        //append table contents
        table.appendChild(thead);
      } else {
        //append tbody to table
        tbody.appendChild(row);
        console.log("tbody: ", tbody);
        //append table contents
        table.appendChild(tbody);
      }

      console.log("table: ", table);
    }
  } else {
    alert("The book list is empty");
  }
  document.body.style.cursor = "default";
};
