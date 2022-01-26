let library = [
    {
        title: 'Caves of Steel',
        author: 'Isaac Asimov',
        pages: 224,
        read: true,
    },
];

//DOM elements
const newBookBtn = document.getElementById('newBookBtn');
const addBookBtn = document.getElementById('addBookBtn');
const clrFormBtn = document.getElementById('clrFormBtn');
const closeFormBtn = document.getElementById('closeFormBtn');
const inputs = document.querySelectorAll('input');
const cards = document.getElementById('cards');
let rmvBookBtns = [];
let cardSwitches = [];

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
    closeForm();
}

//Remove book from library
function removeBook(id) {
    library.splice(id, 1);
    displayBooks();
}

//Form functions

function openForm() {
    document.getElementById("popupForm").style.display = "flex";
    clearForm();
}

function closeForm() {
    document.getElementById("popupForm").style.display = "none";

}

window.onclick = function (event) {
    if (event.target.className === "popupForm") {
        closeForm();
        console.log(event.target.className)
    }
    console.log(event.target.className)
}

//Creates and displays the cards
function displayBooks() {
    while (cards.firstChild) cards.removeChild(cards.firstChild);
    library.forEach((book, idx) => {
        const card = document.createElement('div');
        
        const cardTitle = document.createElement("h3");
        const cardAuthor = document.createElement("p");
        const cardPages = document.createElement("p");
        const cardRead = document.createElement("span")
        const readBox = document.createElement("input");
        const rmvBtn = document.createElement("button");
        const readItems = document.createElement("div")
        
        card.classList = "card";
        rmvBtn.classList = "rmvBookBtn";
        readItems.classList = "readItems";
        readBox.classList = "cardReadBox";
        readBox.id = idx;
        rmvBtn.id = idx;
        
        readBox.setAttribute("type", "checkbox");
        book.read ? readBox.setAttribute("checked","") : readBox.setAttribute("unchecked","");
        
        rmvBtn.textContent = "X";
        cardTitle.textContent = `${book.title}`;
        cardAuthor.textContent = `by: ${book.author}`;
        cardPages.textContent = `${book.pages} pages`;
        cardRead.textContent = "Read: ";
        
        card.appendChild(rmvBtn);
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        readItems.appendChild(cardRead);
        readItems.appendChild(readBox);
        card.appendChild(readItems)
        cards.appendChild(card);
    })
    updateButtons();
}

//My likely dumb workaround to updating the delete buttons
function updateButtons() {
    rmvBookBtns = document.querySelectorAll('.rmvBookBtn');
    cardReadBoxes = document.querySelectorAll('.cardReadBox')
    rmvBookBtns.forEach((button) => {
        button.addEventListener('click', () => {
            removeBook(button.id);
        });
    });
    cardReadBoxes.forEach((cardReadBox) => {
        cardReadBox.addEventListener('change', () => {
            changeRead(cardReadBox.id, cardReadBox.checked);
        });
    });
}

//Updates slider
function changeRead(id, checked) {
    library[id].read = checked;
    cardReadBoxes[id].checked = library[id].read;
    displayBooks();
}

function clearForm() {
    inputs.forEach(input => input.value = '');
}

closeForm();
displayBooks();

