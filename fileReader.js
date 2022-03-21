//Example not used in project
function processFile() {
  let fileSize = 0;
  //get file
  let theFile = document.getElementById("myFile");

  let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  //check if file is CSV
  if (regex.test(theFile.value.toLowerCase())) {
    //check if browser support FileReader
    if (typeof FileReader != "undefined") {
      //get table element
      let table = document.getElementById("myTable");
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
          let row = document.createElement("tr");
          //split each row content
          let rowContent = lines[count].split(",");
          //loop throw all columns of a row
          for (let i = 0; i < rowContent.length; i++) {
            //create td element
            let cellElement = document.createElement("td");
            if (count == 0) {
              cellElement = document.createElement("th");
            } else {
              cellElement = document.createElement("td");
            }
            //add a row element as a node for table
            let cellContent = document.createTextNode(rowContent[i]);

            cellElement.appendChild(cellContent);
            //append row child
            row.appendChild(cellElement);
          }
          //append table contents
          table.appendChild(row);
        }
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
}
