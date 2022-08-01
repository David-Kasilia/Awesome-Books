let addButton = document.getElementById('button')
let bookList = document.getElementById('bookList')
let title = document.getElementById('title')
let author = document.getElementById('author')
const form = document.querySelector('form');

let books = [];

function storeBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function createBook(title, author) {
  const newBook = {
    title: title,
    author: author,
  };
  books.push(newBook);

  const singleBook = document.createElement('div');
  books.forEach((book, index) => {
    singleBook.innerHTML = `
            <p>${book.title}</p>
            <br>
            <p>${book.author}</p>
            <br>
            <button id="remove">Remove</button>
            <hr>
        `;

    const removeBtn = singleBook.querySelector('#remove');
    removeBtn.addEventListener('click', () => {
      books.splice(index, 1);
      singleBook.remove();
      storeBooks();
    });
  });

  storeBooks();

  bookList.appendChild(singleBook);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (title.value !== '' && author.value !== '') {
    createBook(title.value, author.value);

    title.value = '';
    author.value = '';
  }
});


function retrieveBooks() {
  const books = JSON.parse(localStorage.getItem('books'));
  if (books) {
    books.forEach((book) => {
      createBook(book.title, book.author);
    });
  }
}
retrieveBooks();
