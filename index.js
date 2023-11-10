const myLibrary = (() => {
  const _state = [];

  function getLibraryBooks() {
    const books = [];
    for (let i = 0; i < _state.length; i++) {
      books.push(_state[i]);
    }
    return books;
  }

  function getLibraryBook(bookIdx) {
    return _state[bookIdx];
  }

  function addBook(book) {
    _state.push(book);
  }

  function removeBook(bookIdx) {
    _state.splice(bookIdx, 1);
  }

  return {
    addBook: addBook,
    getLibraryBooks: getLibraryBooks,
    getLibraryBook: getLibraryBook,
    removeBook: removeBook,
  }
})();

class BookBuilder {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.read = true;
  }

  readStatus(read) {
    this.read = read;
    return this;
  }

  build() {
    return new Book(this);
  }
}

class Book {
  constructor(bookBuilder) {
    this.title = bookBuilder.title;
    this.author = bookBuilder.author;
    this.read = bookBuilder.read;
  }
};

document.querySelector('.btn-add-book')
  .addEventListener('click', () => {
    toggleBookForm();
  });

document.querySelector('.form-new-book button')
  .addEventListener('click', () => {
    toggleBookForm();
  });

function toggleBookForm() {
  const formDiv = document.querySelector('.form-div');
  const style = getComputedStyle(formDiv);
  if (style.display === 'none') {
    formDiv.style.display = "grid"
  } else if (validateInputs()) {
    formDiv.style.display = "none";

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const readStatus = document.querySelector('#read').checked;
    const newBookBuild = new BookBuilder(title, author).readStatus(readStatus);
    const newBook = newBookBuild.build();
    myLibrary.addBook(newBook);
    displayLibrary();
    const bookForm = document.querySelector('.form-new-book')
    bookForm.reset();
  }
}

function validateInputs() {
  const bookFormInputs = document.querySelectorAll('.form-input input');
  let valid = true;
  for (let input of bookFormInputs) {
    if (input.type === "text" && input.value === "") {
      valid = false;
      const errorMsg = `*${input.id} is blank`;
      const errorSpan = input.parentNode.children[2];
      errorSpan.textContent = errorMsg;
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
  const books = myLibrary.getLibraryBooks();

  for (let i = 0; i < books.length; i++) {
    const bookElement = createNewBookElement(books[i], i);
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

  const readButton = getReadStatusButton(newBookElement);
  newBookElement.appendChild(readButton);

  const closeButton = document.createElement('img');
  closeButton.setAttribute('src', './assets/close-circle-svgrepo-com.svg');
  closeButton.addEventListener('click', event => {
    const bookIndex = event.target.parentNode.getAttribute('data-library-index');
    myLibrary.removeBook(bookIndex);
    displayLibrary();
  });
  newBookElement.insertBefore(closeButton, newBookElement.children[0]);
}

function getReadStatusButton(newBookElement) {
  const readButton = createTextElement('button', "Already Read");
  readButton.classList.add('btn-read-status');
  readButton.setAttribute('type', 'button');
  readButton.addEventListener('click', event => {
    event.target.parentNode.classList.toggle('unread');
    const bookIndex = event.target.parentNode.getAttribute("data-library-index");

    if (event.target.textContent === "Already Read") {
      event.target.textContent = "Not Read";
      myLibrary.getLibraryBook(bookIndex).read = false;
    } else {
      event.target.textContent = "Already Read";
      myLibrary.getLibraryBook(bookIndex).read = true;
    }
  });
  return readButton;
}

function createTextElement(htmlTag, textContent) {
  const textElement = document.createElement(htmlTag);
  textElement.textContent = textContent;
  return textElement;
}

// Testing
const newBook1 = new BookBuilder("Hello", "me").build();
myLibrary.addBook(newBook1);
displayLibrary();
