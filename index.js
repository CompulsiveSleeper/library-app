let myLibrary = [];

function Book() {
  this.title = title;
  this.author = author;
  this.read = true;
}

function addBookToLibrary(newBook) {
  if (newBook instanceof Book) {
    myLibrary.push(newBook);
  }
}

// document.querySelector(".btn-add-book").addEventListener('click', () => {
//   toggleBookForm();
  
// });

function displayLibrary() {
  const libraryDisplay = document.querySelector('.library-display');
  for (let bookIndex in myLibrary) {
    const bookElement = createNewBookElement(myLibrary[bookIndex]);
    libraryDisplay.appendChild(bookElement);
  }
}

function createNewBookElement(book) {
  const newBookElement = document.createElement('div');
  newBookElement.classList.add('book');
  const titleElement = createTextElement('span', book.title);
  const authorElement = createTextElement('span', book.author);
  newBookElement.appendChild(titleElement);
  newBookElement.appendChild(authorElement);
  return newBookElement;
}

function createTextElement(htmlTag, textContent) {
  const textElement = document.createElement('span');
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
