// ****** select HTML elements by IDs **********
var bookTitle = document.getElementById('title'),
  author = document.getElementById('author'),
  bookID = document.getElementById('isbn'),
  bookPrice = document.getElementById('price'),
  bookList = document.getElementById('book-list'),
  addBtn = document.getElementById('addBtn'),
  inputValues = document.getElementsByClassName('form-control');

// initial value
var books;
var currentIndex;

// Alert elements
var alertDanger = document.getElementById('alertDanger');
alertDanger.style.display = 'none';
var alertSuccess = document.getElementById('alertSuccess');
alertSuccess.style.display = 'none';

// Check local storage
if (localStorage.getItem('list') === null) {
  books = [];
} else {
  books = JSON.parse(localStorage.getItem('list'));
  displayItems();
}

// Clicking Add Btn function
addBtn.onclick = function () {
  if (
    bookTitle.value === '' ||
    author.value === '' ||
    bookID.value === '' ||
    bookPrice.value === ''
  ) {
    addBtn.disabled = true;
    alertDanger.style.display = 'block';
    alertDanger.innerHTML = 'please fill all fields';
    alertSuccess.style.display = 'none';
  } else if (addBtn.innerHTML === 'edit book') {
    replaceData();
    displayItems();
    clearItems();
    addBtn.innerHTML = 'add book';
  } else {
    addItems();
    alertSuccess.style.display = 'block';
    alertSuccess.innerHTML = 'saved successfully';
    alertDanger.style.display = 'none';
    displayItems();
    clearItems();
  }
};
//Add items
function addItems() {
  //Input values
  var book = {
    title: bookTitle.value,
    author: author.value,
    id: bookID.value,
    price: bookPrice.value,
  };
  books.push(book);
  localStorage.setItem('list', JSON.stringify(books));
}
// Display items inside the table
function displayItems() {
  var container = '';
  for (var i = 0; i < books.length; i++) {
    container += `<tr>
    <td>${i}</td>
    <td>${books[i].title}</td>
    <td>${books[i].author}</td>
    <td>${books[i].id}</td>
    <td>${books[i].price}</td>
  <td><button onclick="editItem(${i})" class="btn btn-light text-dark"><i class="fas fa-edit"></i> Edit</button></td>
   
  <td><button onclick="deleteItem(${i})" class="btn btn-secondary"><i class="fas fa-trash-alt"></i> Delete</button></td>
    </tr>`;
  }
  bookList.innerHTML = container;
}
// Clear items
function clearItems() {
  for (var i = 0; i < inputValues.length; i++) {
    inputValues[i].value = '';
  }
}
// Delete items
function deleteItem(index) {
  books.splice(index, 1);
  localStorage.setItem('list', JSON.stringify(books));
  displayItems();
}
// Edit function
function editItem(index) {
  bookTitle.value = books[index].title;
  author.value = books[index].author;
  bookID.value = books[index].id;
  bookPrice.value = books[index].price;
  addBtn.innerHTML = 'edit book';
  currentIndex = index;
}

function replaceData() {
  var book = {
    title: bookTitle.value,
    author: author.value,
    id: bookID.value,
    price: bookPrice.value,
  };
  books[currentIndex] = book;
  localStorage.setItem('list', JSON.stringify(books));
}
// Search function
function search(searchValue) {
  var container = '';
  for (var i = 0; i < books.length; i++) {
    if (books[i].title.toLowerCase().includes(searchValue.toLowerCase())) {
      container += `<tr>
    <td>${i}</td>
    <td>${books[i].title}</td>
    <td>${books[i].author}</td>
    <td>${books[i].id}</td>
    <td>${books[i].price}</td>
  <td><button onclick="editItem(${i})" class="btn btn-light">Edit</button></td>
  <td><button onclick="deleteItem(${i})" class="btn btn-secondary" >Delete</button></td>
    </tr>`;
    }
  }
  bookList.innerHTML = container;
}

// REGEX
// Validate title input
function validateTitle() {
  var regexTitle = /^[A-Z][a-z ]{3,}$/;
  if (!regexTitle.test(bookTitle.value)) {
    addBtn.disabled = true;
    bookTitle.classList.add('is-invalid');
    return false;
  } else {
    addBtn.removeAttribute('disabled');
    bookTitle.classList.remove('is-invalid');
    bookTitle.classList.add('is-valid');
    return true;
  }
}

bookTitle.onkeyup = function () {
  validateTitle();
};

// Validate author input
function validateAuthor() {
  var regexAuthor = /^[A-Z][a-z]{2,}$/;
  if (!regexAuthor.test(author.value)) {
    addBtn.disabled = true;
    author.classList.add('is-invalid');
  } else {
    addBtn.removeAttribute('disabled');
    author.classList.remove('is-invalid');
    author.classList.add('is-valid');
  }
}
author.onkeyup = function () {
  validateAuthor();
};
// Validate ID
function validateID() {
  var regexID = /^[0-9]{2,5}$/;
  if (!regexID.test(bookID.value)) {
    addBtn.disabled = true;
    bookID.classList.add('is-invalid');
  } else {
    addBtn.removeAttribute('disabled');
    bookID.classList.remove('is-invalid');
    bookID.classList.add('is-valid');
  }
}
bookID.onkeyup = function () {
  validateID();
};
// Validate price input
function validatePrice() {
  var regexPrice = /^[0-9]{2}$/;
  if (!regexPrice.test(bookPrice.value)) {
    addBtn.disabled = true;
    bookPrice.classList.add('is-invalid');
  } else {
    addBtn.removeAttribute('disabled');
    bookPrice.classList.remove('is-invalid');
    bookPrice.classList.add('is-valid');
  }
}
bookPrice.onkeyup = function () {
  validatePrice();
};
