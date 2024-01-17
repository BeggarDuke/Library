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
  this.number = undefined;
}

function addToLibrary() {
  let newBook = prompt("Title, author, pages, read").split(", ");
  myLibrary.push(new Book(...newBook));
  addVisual(true);
}

function addVisual(add) {
  // This "if" statement is needed for this function to know whether to loop over the whole array or just the last added item.
  // Either "text" and "set" variables are needed to choose between books id naming method for whole array or just last added book.
  let set;
  if (!add && myLibrary.length === 0) {return}
  else if (!add && myLibrary.length > 0) {set = myLibrary.length}
  else {set = 1}
  for (i=0; i < set; i++) {
    console.log(set);
    let text = !add ? i : myLibrary.length-1;
    console.log(text);
    let divs = document.createElement("div");
    myLibrary[text].number = `Book${text}`;
    divs.className = `Book${text}`;
    let rmbtn = document.createElement("button");
    rmbtn.innerText = "Remove";
    for (i=0; i < 8; i++) {
      divs.appendChild(document.createElement("div"));
    }
    divs.querySelector("div:nth-child(1)").innerText = `Title:`;
    divs.querySelector("div:nth-child(2)").innerText = `Author:`;
    divs.querySelector("div:nth-child(3)").innerText = `Pages:`;
    divs.querySelector("div:nth-child(4)").innerText = `Read:`;
    divs.querySelector("div:nth-child(5)").innerText = `${myLibrary[text].title}`;
    divs.querySelector("div:nth-child(6)").innerText = `${myLibrary[text].author}`;
    divs.querySelector("div:nth-child(7)").innerText = `${myLibrary[text].pages}`;
    divs.querySelector("div:nth-child(8)").innerText = `${myLibrary[text].read}`;
    divs.appendChild(rmbtn);
    lib.appendChild(divs);
    removeBook(divs, rmbtn);
  }
}

function removeBook(divs, rmbtn){
  rmbtn.addEventListener("click", () => {
    console.log(divs.className);
    myLibrary.splice(myLibrary.findIndex((item) => item.number === divs.className), 1);
    divs.remove();
  });
}

startBtn.addEventListener("click", () => {
  addToLibrary();
})
