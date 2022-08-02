const bookList = document.getElementById('bookList');
const title = document.getElementById('title');
const author = document.getElementById('author');
const form = document.querySelector('form');

const books = [];

function storeBooks() {
  localStorage.setItem('books', JSON.stringify(books));
}

function createBook(title, author) {
  const newBook = {
    title,
    author,
  };
  books.push(newBook);

  const singleBook = document.createElement('div');
  books.forEach((book, index) => {
    singleBook.innerHTML = `
            <p>${book.title}</p>
            <p>${book.author}</p>
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
