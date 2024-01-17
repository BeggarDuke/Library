const myLibrary = [];
const lib = document.querySelector(".library");
const startBtn = document.querySelector(".start");


function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.info = function() {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}.`;
  }
}

function addToLibrary() {
  let newBook = prompt("Title, author, pages, read").split(", ");
  myLibrary.push(new Book(...newBook));
  addVisual();
}

function addVisual() {
  let divs = document.createElement("div");
  divs.className = `Book${myLibrary.length-1}`
  let rmbtn = document.createElement("button");
  rmbtn.innerText = "Remove";
  for (i=0; i < 8; i++) {
    divs.appendChild(document.createElement("div"));
  }
  divs.querySelector("div:nth-child(1)").innerText = `Title:`;
  divs.querySelector("div:nth-child(2)").innerText = `Author:`;
  divs.querySelector("div:nth-child(3)").innerText = `Pages:`;
  divs.querySelector("div:nth-child(4)").innerText = `Read:`;
  divs.querySelector("div:nth-child(5)").innerText = `${myLibrary[myLibrary.length-1].title}`;
  divs.querySelector("div:nth-child(6)").innerText = `${myLibrary[myLibrary.length-1].author}`;
  divs.querySelector("div:nth-child(7)").innerText = `${myLibrary[myLibrary.length-1].pages}`;
  divs.querySelector("div:nth-child(8)").innerText = `${myLibrary[myLibrary.length-1].read}`;
  divs.appendChild(rmbtn);
  lib.appendChild(divs);
  removeBook(divs, rmbtn);
}

function removeBook(divs, rmbtn){
  rmbtn.addEventListener("click", () => {
    myLibrary.splice(+divs.className.replace("Book", ""), 1);
    divs.remove();
  });
}

startBtn.addEventListener("click", () => {
  addToLibrary();
})
