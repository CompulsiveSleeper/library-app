let myLibrary = [];

function Book() {
  this.title = title;
  this.author = author;
  this.read = true;
}

function addBookToLibrary() {
  const newBook = new Book();
  newBook.title = document.querySelector('#title').value;
  newBook.author = document.querySelector('#author').value;
  newBook.read = true;
  myLibrary.push(newBook);
  displayLibrary();
}

document.querySelector('.btn-add-book')
  .addEventListener('click', () => {
    toggleBookForm();
  });

document.querySelector('.form-new-book button')
  .addEventListener('click', () => {
    toggleBookForm();
  });

function toggleBookForm() {
  const bookForm = document.querySelector('.form-new-book');
  const formDiv = document.querySelector('.form-div');
  const style = getComputedStyle(bookForm);
  if (style.display === 'none') {
    bookForm.style.display = "grid";
    formDiv.style.display = "grid"
  } else if (validateInputs()) {
    bookForm.style.display = "none";
    formDiv.style.display = "none";

    addBookToLibrary();
    bookForm.reset();
  }
}

function validateInputs() {
  const bookFormInputs = document.querySelectorAll('.form-input input');
  let valid = true;
  for (let input of bookFormInputs) {
    if (input.type === "text" && input.value === "") {
      valid = false;
      const errorMsg = `*${input.id} is blank`
      input.parentNode.children[2].textContent = errorMsg;
    }
  }

  if (!valid) {
    return false;
  }
  return true;
}

function displayLibrary() {
  const libraryDisplay = document.querySelector('.library-display');
  libraryDisplay.innerHTML = "";
  for (let bookIndex in myLibrary) {
    const bookElement = createNewBookElement(myLibrary[bookIndex], bookIndex);
    libraryDisplay.appendChild(bookElement);
  }
}

function createNewBookElement(book, bookIndex) {
  const newBookElement = document.createElement('div');
  newBookElement.classList.add('book');
  if (!book.read) {
    newBookElement.classList.add('unread');
  }
  newBookElement.setAttribute('data-library-index', bookIndex)

  fillBookElement(newBookElement, book);

  return newBookElement;
}

function fillBookElement(newBookElement, book) {
  let textContent;
  newBookElement
  for (let key in book) {
    if (key === "title") {
      textContent = book[key];
      newBookElement.appendChild(createTextElement('h2', textContent));
    } else if (key === "read") {
    } else {
      textContent = `${key}: ${book[key]}`;
      newBookElement.appendChild(createTextElement('span', textContent));
    }
  }

  const readButton = createTextElement('button', "Already Read");
  readButton.classList.add('btn-read-status');
  readButton.setAttribute('type', 'button');
  readButton.addEventListener('click', event => {
    event.target.parentNode.classList.toggle('unread');
    const bookIndex = event.target.parentNode.getAttribute("data-library-index");
    if (event.target.textContent === "Already Read") {
      event.target.textContent = "Not Read";
      myLibrary[bookIndex].read = false;
    } else {
      event.target.textContent = "Already Read";
      myLibrary[bookIndex].read = true;
    }
  });
  newBookElement.appendChild(readButton);

  const closeButton = document.createElement('img');
  closeButton.setAttribute('src', './assets/close-circle-svgrepo-com.svg');
  closeButton.addEventListener('click', event => {
    const bookIndex = event.target.parentNode.getAttribute('data-library-index');
    myLibrary.splice(bookIndex);
    displayLibrary();
  });
  newBookElement.insertBefore(closeButton, newBookElement.children[0]);
}

function createTextElement(htmlTag, textContent) {
  const textElement = document.createElement(htmlTag);
  textElement.textContent = textContent;
  return textElement;
}

// Testing
const newBook1 = new Book();
newBook1.title = "Hello";
newBook1.author = "me";
newBook1.read = true;

myLibrary.push(newBook1);
displayLibrary();
