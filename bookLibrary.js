let library = [];

//DOM elements
const newBookBtn = document.getElementById('newBookBtn');
const addBookBtn = document.getElementById('addBookBtn');
const clrFormBtn = document.getElementById('clrFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const inputs = document.querySelectorAll('input');
const cards = document.getElementById('cards');

addBookBtn.addEventListener('click', addToLibrary);
newBookBtn.addEventListener('click', openForm);
closeFormBtn.addEventListener('click', closeForm);
clrFormBtn.addEventListener('click', clearForm);

//Form Fields
const bkTitle = document.getElementById('bkTitle');
const bkAuthor = document.getElementById('bkAuthor');
const bkPages = document.getElementById('bkPages');
const bkRead = document.getElementById('bkRead');

//Constructor
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

//to call info on a specific book
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`;
}

//Add a book to the library
function addToLibrary() {
    library.push(new Book(bkTitle.value, bkAuthor.value, bkPages.value, bkRead.checked));
    displayBooks();
}

//Form functions

function openForm() {
    document.getElementById("popupForm").style.display = "flex";
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";
}

window.onclick = function (event) {
    let modal = document.getElementById('popupForm');
    if (event.target == modal) {
      closeForm();
    }
}

function displayBooks() {
    cards.innerHTML = "";
    library.forEach((result, idx) => {
        const card = document.createElement('div');
        card.classlist = 'card-body';

        const content =  `
        <div class="card" id="card${idx}">
          <div class="card-body">
            <h5>${result.title}</h5>
            <p>by: ${result.author}</p>
            <p>${result.pages} pages</p>
            <p>Read: ${result.read}</p>
          </div>
      </div>
      `;
    
      // Append newyly created card element to the container
      cards.innerHTML += content;
    })
}

function clearForm() {
    inputs.forEach(input => input.value = '');
}

closeForm();
displayBooks();

