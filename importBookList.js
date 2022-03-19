

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
      //get table element
      //let table = document.getElementById("myTable");
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
          //create a tr element
          //let row = document.createElement("tr");
          let rowArray = [];
          //split each row content
          let rowContent = lines[count].split(",");
          console.log("rowContent: ", rowContent);
          //loop throw all columns of a row
          for (let i = 0; i < rowContent.length; i++) {
            //create td element
            /*
            let cellElement = document.createElement("td");
            if (count == 0) {
              cellElement = document.createElement("th");
            } else {
              cellElement = document.createElement("td");
            }
            */

            //add a row element as a node for table
            //let cellContent = document.createTextNode(rowContent[i]);

            rowArray.push(rowContent[i]);
            console.log("rowContent[i]: ", rowContent[i]);
            console.log("rowArray: ", rowArray);

            //cellElement.appendChild(cellContent);
            //console.log("cellElement: ", cellElement);
            //append row child
            //row.appendChild(cellElement);
          }
          //append table contents
          //myTable.appendChild(row);
          fileArray.push(rowArray);
          console.log("rowArray: ", rowArray);
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


var readFromArray = () => {
  let bookList = getBookList();

  if (bookList) {
    let table = document.getElementById("bookListTable");
    for (let rowIndex = 0; rowIndex < bookList.length; rowIndex++) {
      //create a tr element
      let row = document.createElement("tr");
      let book = bookList[rowIndex];
      console.log("book: ", book);
      //loop throw all indexes of a book
      for (let i = 0; i < book.length; i++) {
        //create td element
        let cellElement = document.createElement("td");
        if (rowIndex == 0) {
          cellElement = document.createElement("th");
        } else {
          cellElement = document.createElement("td");
        }

        console.log("book[i]: ", i, book[i]);
        //add a row element as a node for table
        let cellContent = document.createTextNode(book[i]);

        console.log("cellContent: ", cellContent);
        console.log("book: ", book);

        cellElement.appendChild(cellContent);
        console.log("cellElement: ", cellElement);
        //append row child
        row.appendChild(cellElement);
      }
      //append table contents
      table.appendChild(row);
      console.log("row: ", row);
    }
  } else {
    alert("The book list is empty");
  }
};
