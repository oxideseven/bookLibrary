function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pages} pages, read: ${this.read}`;
}

const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);

const cavesOfSteel = Object.create(Book.prototype);
cavesOfSteel.title = 'Caves of Steel';
cavesOfSteel.author = 'Isaac Asimov';
cavesOfSteel.pages = 224;
cavesOfSteel.read = true;

