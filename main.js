const myLibrary = [];
const lib = document.querySelector(".library");
const startBtn = document.querySelector(".start");
const dialog = document.querySelector("dialog");
const endBtn = document.querySelector(`dialog input[type="submit"]`);
const cancelBtn = document.querySelector(`dialog input[type="submit"]:last-child`);


class Book {
  number = undefined;
  constructor(title, author, pages, tags, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.tags = tags;
    this.read = read;
  }
  info() {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}.`;
  }
}

function addToLibrary() {
  let newBook = [];
  newBook.push(dialog.querySelector("div:nth-child(1) input").value);
  newBook.push(dialog.querySelector("div:nth-child(2) input").value);
  newBook.push(dialog.querySelector("div:nth-child(3) input").value);
  newBook.push(dialog.querySelector("div:nth-child(4) input").value);
  newBook[3] = newBook[3].split(",");
  newBook[3] = newBook[3].map(element => element.trim());
  newBook.push(dialog.querySelector("div:nth-child(5) input").checked);
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
    let rmbtn = document.createElement("button");
    let readCheck = document.createElement("input");
    myLibrary[text].number = `Book${text}`;
    divs.className = `Book${text}`;
    rmbtn.innerText = "Remove";
    readCheck.type = "checkbox";
    readCheck.id = "read";
    for (i=1; i <= 11; i++) {
      divs.appendChild(document.createElement("div"));
      if (i < 10)  {
        divs.querySelector(`div:nth-child(${i})`).appendChild(document.createElement("p"));
      }
      else {
        readCheck.checked = myLibrary[text].read;
      }
    }
    divs.querySelector("div:nth-child(1) > p").innerText = `Title:`;
    divs.querySelector("div:nth-child(2) > p").innerText = `Author:`;
    divs.querySelector("div:nth-child(3) > p").innerText = `Pages:`;
    divs.querySelector("div:nth-child(4) > p").innerText = `Tags:`;
    divs.querySelector("div:nth-child(5) > p").innerText = `Read:`;
    divs.querySelector("div:nth-child(6) > p").innerText = `${myLibrary[text].title}`;
    divs.querySelector("div:nth-child(7) > p").innerText = `${myLibrary[text].author}`;
    divs.querySelector("div:nth-child(8) > p").innerText = `${myLibrary[text].pages}`;
    divs.querySelector("div:nth-child(9) > p").innerText = `${myLibrary[text].tags}`;
    divs.querySelector("div:nth-child(10)").appendChild(readCheck);
    divs.appendChild(document.createElement("div"));
    divs.querySelector("div:nth-child(11)").appendChild(rmbtn);
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
  divs.querySelector("div:nth-child(6)").addEventListener("click", (item) => {
    item.target.lastChild.innerText = prompt();
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].title = item.target.innerText;
    item.stopImmediatePropagation();
  });
  divs.querySelector("div:nth-child(6) p").addEventListener("click", (item) => {
    item.target.innerText = prompt();
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].title = item.target.innerText;
    item.stopImmediatePropagation();
  });

  divs.querySelector("div:nth-child(7)").addEventListener("click", (item) => {
    item.target.lastChild.innerText = prompt();
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].author = item.target.innerText;
    item.stopImmediatePropagation();
  });
  divs.querySelector("div:nth-child(7) p").addEventListener("click", (item) => {
    item.target.innerText = prompt();
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].author = item.target.innerText;
    item.stopImmediatePropagation();
  });

  divs.querySelector("div:nth-child(8)").addEventListener("click", (item) => {
    item.target.lastChild.innerText = prompt();
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].pages = item.target.innerText;
    item.stopImmediatePropagation();
  });
  divs.querySelector("div:nth-child(8) p").addEventListener("click", (item) => {
    item.target.innerText = prompt();
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].pages = item.target.innerText;
    item.stopImmediatePropagation();
  });

  divs.querySelector("div:nth-child(9)").addEventListener("click", (item) => {
    const arr = myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].tags;
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].tags = prompt("", arr).split(",").map((item) => item.trim());
    item.target.lastChild.innerText = myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].tags;
    item.stopImmediatePropagation();
  });
  divs.querySelector("div:nth-child(9) p").addEventListener("click", (item) => {
    const arr = myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].tags;
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].tags = prompt("", arr).split(",").map((item) => item.trim());
    item.target.innerText = myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].tags;
    item.stopImmediatePropagation();
  });

  divs.querySelector("div:nth-child(10) input[type=checkbox]").addEventListener("change", (event) => {
    myLibrary[myLibrary.findIndex((item) => item.number === divs.className)].read = event.target.checked;
  });
}

startBtn.addEventListener("click", () => {
  dialog.showModal();
});

endBtn.addEventListener("click", (event) => {
  event.preventDefault();
  addToLibrary();
  dialog.querySelector("form").reset();
  dialog.close();
});

cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.querySelector("form").reset();
  dialog.close();
});