// Book constructor
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}
// UI constrictor
class UI {
  constructor() {}
  addBookToList(book) {
    const list = document.getElementById("book-list");
    const row = document.createElement("tr");
    row.innerHTML = `
  <td>${book.title}</td>
  <td>${book.author}</td>
  <td>${book.isbn}</td>
  <td><a href="#" class="delete">X</a></td>
  `;
    list.appendChild(row);
  }
  // Show Alert method
  showAlert(msg, className) {
    // create div alert
    const div = document.createElement("div");
    // Add classes
    div.className = `alert ${className}`;

    // add text
    const text = document.createTextNode(msg);

    //Append the text
    div.appendChild(text);

    // Append div to the before form
    const container = document.querySelector(".container");

    const form = document.querySelector("#book-form");

    container.insertBefore(div, form);

    // set timeout
    setTimeout(function () {
      const alert = document.querySelector(".alert");
      alert.remove();
    }, 3000);
  }
  // Delete Book
  deleteBook(target) {
    if (target.className === "delete") {
      target.parentElement.parentElement.remove();
    }
  }
  // Clear method
  clearFields() {
    document.getElementById("title").value = "";
    document.getElementById("author").value = "";
    document.getElementById("isbn").value = "";
  }
}

// Local storage
class Store {
  constructor() {}
  static getBooks() {
    let LSbooks;
    if (localStorage.getItem("books") === null) {
      LSbooks = [];
    } else {
      LSbooks = JSON.parse(localStorage.getItem("books"));
    }
    return LSbooks;
  }
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      // instantiate UI
      const ui = new UI();
      ui.addBookToList(book);
    });
  }
  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem("books", JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem("books", JSON.stringify(books));
  }
}
// Dom loaded Event
document.addEventListener("DOMContentLoaded", Store.displayBooks);
// Event listener for books addition
document.getElementById("book-form").addEventListener("submit", function (e) {
  // get input value
  const title = document.getElementById("title").value,
    author = document.getElementById("author").value,
    isbn = document.getElementById("isbn").value;

  // instantiate Book
  const book = new Book(title, author, isbn);

  // instantiate UI
  const ui = new UI();

  // Validate
  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all fields", "error");
  } else {
    // Add book to list
    ui.addBookToList(book);

    // LS
    Store.addBook(book);

    // clear fields
    ui.clearFields();
    // Book add alert
    ui.showAlert("Book added successfully!", "success");
  }
  e.preventDefault();
});

// Event listener for delete books
document.getElementById("book-list").addEventListener("click", function (e) {
  // instantiate UI
  const ui = new UI();
  // Delete book
  ui.deleteBook(e.target);

  // remove book from ls
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show Alert
  ui.showAlert("Book removed successfully", "success");
  e.preventDefault();
});
