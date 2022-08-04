/* eslint-disable consistent-return */
/* eslint max-classes-per-file: ["error", 5] */

function onNavItemClick(event) {
  let activePage = document.querySelectorAll('.active')

  for(var i = 0; i < activePage.length; i++){
    activePage[i].className = activePage[i].className.replace('active', '')

  }

  // activePage.forEach(function(page){
  //   page.className = page.className.replace('active', '')
  // })

  event.target.parentElement.className += ' active'
  document.getElementById(event.target.href.split('#')[1]).className += ' active'

}
const nav = document.getElementById('nav-bar');

nav.addEventListener('click', onNavItemClick, false);


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
    const bookList = document.getElementById('bookList');

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

document.getElementById('bookForm').addEventListener('submit', (e) => {
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

document.getElementById('bookList').addEventListener('click', (e) => {
  UI.deleteBook(e.target);

  StoreBooks.removeBook(e.target.parentElement.previousElementSibling.textContent);
});