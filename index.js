
let arr = [];

function addBook(bookName, issuedTo) {
 let newBook = {
    id: arr.length + 1,
    book_name: bookName,
    issued_to: issuedTo,
    issued_time: new Date().toLocaleString(),
    status: "not returned"
  };
  arr.push(newBook);
}

function displayBooks() {
 let bookTable = document.getElementById("booktable").getElementsByTagName("tbody")[0];
  bookTable.innerHTML = "";
  arr.forEach((book, index) => {
   let row = bookTable.insertRow();
   let idCell = row.insertCell(0);
   let nameCell = row.insertCell(1);
   let issuedToCell = row.insertCell(2);
   let issuedTimeCell = row.insertCell(3);
   let statusCell = row.insertCell(4);
    idCell.innerHTML = book.id;
    nameCell.innerHTML = book.book_name;
    issuedToCell.innerHTML = book.issued_to;
    issuedTimeCell.innerHTML = book.issued_time;
    statusCell.innerHTML = `
      <select onchange="updateStatus(${index}, this.value)" style="color: ${book.status === "returned" ? "green" : "red"}">
        <option value="not returned" ${book.status === "not returned" ? "selected" : ""}>Not returned</option>
        <option value="returned" ${book.status === "returned" ? "selected" : ""}>Returned</option>
      </select>
      <i class="fa fa-edit" onclick="bookSelf(${index})"></i>
    `;
    statusCell.style.backgroundColor = book.status === "returned" ? "green" : "black";
    statusCell.style.color = book.status === "returned" ? "white" : "black";
  });
}

function updateStatus(index, status) {
  arr[index].status = status;
  displayBooks();
}


document.getElementById("formbooks").addEventListener("submit", function(event) {
  event.preventDefault();
 let bookName = document.getElementById("book-name").value.trim();
 let issuedTo = document.getElementById("issued-to").value.trim();
  if (bookName === "" || issuedTo === "") {
    return;
  }
  addBook(bookName, issuedTo);
  displayBooks();
  document.getElementById("book-name").value = "";
  document.getElementById("issued-to").value = "";
});
