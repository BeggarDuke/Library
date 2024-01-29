const myLibrary = [];
const lib = document.querySelector(".library");
const startBtn = document.querySelector(".start");
const dialog = document.querySelector("dialog");
const endBtn = document.querySelector(`dialog input[type="submit"]`)


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
  let newBook = [];
  newBook.push(dialog.querySelector("div:nth-child(1) input").value);
  newBook.push(dialog.querySelector("div:nth-child(2) input").value);
  newBook.push(dialog.querySelector("div:nth-child(3) input").value);
  newBook.push(dialog.querySelector("div:nth-child(4) input").checked);
  myLibrary.push(new Book(...newBook));
  addVisual(true);
}

function addVisual(add) {
  // This "if" statement is needed for this function to know whether to loop over the whole array or just the last added item.
  // Either "text" and "set" variables are needed to choose between books id naming method for whole array or just the last added book.
  let set;
  if (!add && myLibrary.length === 0) {return}
  else if (!add && myLibrary.length > 0) {set = myLibrary.length}
  else {set = 1}
  for (i=0; i < set; i++) {
    let text = !add ? i : myLibrary.length-1;
    let divs = document.createElement("div");
    myLibrary[text].number = `Book${text}`;
    divs.className = `Book${text}`;
    let rmbtn = document.createElement("button");
    let readCheck = document.createElement("input");
    readCheck.type = "checkbox";
    rmbtn.innerText = "Remove";
    for (i=1; i <= 8; i++) {
      divs.appendChild(document.createElement("div"));
      if (i < 8)  {
        divs.querySelector(`div:nth-child(${i})`).appendChild(document.createElement("p"));
      }
      else {
        readCheck.checked = myLibrary[text].read;
      }
    }
    divs.querySelector("div:nth-child(1) > p").innerText = `Title:`;
    divs.querySelector("div:nth-child(2) > p").innerText = `Author:`;
    divs.querySelector("div:nth-child(3) > p").innerText = `Pages:`;
    divs.querySelector("div:nth-child(4) > p").innerText = `Read:`;
    divs.querySelector("div:nth-child(5) > p").innerText = `${myLibrary[text].title}`;
    divs.querySelector("div:nth-child(6) > p").innerText = `${myLibrary[text].author}`;
    divs.querySelector("div:nth-child(7) > p").innerText = `${myLibrary[text].pages}`;
    divs.querySelector("div:nth-child(8)").appendChild(readCheck);
    divs.appendChild(document.createElement("div"));
    divs.querySelector("div:nth-child(9)").appendChild(rmbtn);
    lib.appendChild(divs);
    removeBook(divs, rmbtn);
    updValues(divs);
  }
}

function removeBook(divs, rmbtn){
  rmbtn.addEventListener("click", () => {
    myLibrary.splice(myLibrary.findIndex((item) => item.number === divs.className), 1);
    divs.remove();
  });
}

function updValues(divs) {
  for (i=5; i<8; i++) {
    divs.querySelector(`div:nth-child(${i}) p`).addEventListener("click", (item) => {
      item.target.innerText = prompt();
      myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].title = item.target.innerText;
      item.stopImmediatePropagation();
    });
    divs.querySelector(`div:nth-child(${i})`).addEventListener("click", (item) => {
      item.target.lastChild.innerText = prompt();
      myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].title = item.target.lastChild.innerText;
      item.stopImmediatePropagation();
    });
  }
  divs.querySelector("div:nth-child(8) input[type=checkbox]").addEventListener("click", (event) => {
    //
    // There is some bug, library not always takes right property from checkbox
    //
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].read = event.target.checked;
  });
}

startBtn.addEventListener("click", () => {
  dialog.showModal();
})

endBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addToLibrary();
  dialog.close();
})