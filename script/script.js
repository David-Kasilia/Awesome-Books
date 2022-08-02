/* eslint-disable consistent-return */
/* eslint max-classes-per-file: ["error", 5] */
class BookList {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class StoreBooks {
  static getBooks() {
    let books;

    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = StoreBooks.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = StoreBooks.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = StoreBooks.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const bookList = document.querySelector('#bookList');

    const listContainer = document.createElement('div');

    listContainer.innerHTML = `
    <p class="bookDetails">"${book.title}" by ${book.author}  <button class="remove">Remove</button></p>
    `;

    bookList.appendChild(listContainer);
  }

  static deleteBook(el) {
    if (el.classList.contains('remove')) {
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#bookForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;

  if (title === '' || author === '') {
    return false;
  }
  const newBook = new BookList(title, author);

  UI.addBookToList(newBook);

  StoreBooks.addBook(newBook);

  UI.clearFields();
});

document.querySelector('#bookList').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  StoreBooks.removeBook(e.target.parentElement.previousElementSibling.textContent);
});