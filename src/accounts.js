//return account object that has the matching id
const { partitionBooksByBorrowedStatus } = require("./books");
//find
function findAccountById(accounts, id) {
  return accounts.find(account => {
    return account.id === id;
  });
}

//return array sorted alphabetically by last name
//use toLowerCase so the names are compared in the same character value
function sortAccountsByLastName(accounts) {
  accounts.sort((lastNameA, lastNameB) =>
   lastNameA.name.last.toLowerCase() > lastNameB.name.last.toLowerCase() ? 1 : -1
  );
  return accounts;
 }

//return a number that represents the numebr of times the accounts id appears in ANY books borrows array
//loop through book array then loop through borrow array to check if borrows matchess an account id then add one to 'borrowed' counter
//
function getTotalNumberOfBorrows(account, books) {
  let borrowed = 0; 
  for (let i = 0; i < books.length; i++) {
    let book = books[i];
    for (let j = 0; j < book.borrows.length; j++) {
      if (account.id === book.borrows[j].id) {
        borrowed += 1; 
      }
    }
  }
  return borrowed;
}

//return an array of books. including author information, that represents all books currently checked out by the given account
//is the book checked out true or false
//is the book checked out by this account true or false
function getBooksPossessedByAccount(account, books, authors) {
  //declare 2 arrays: one to store all matches, one to store final result
  const borrowedBooks = [];
  //forEach() allows me to apply a function to each element in an array 
  books.forEach((book) => {
    book.borrows.forEach((borrow) => {
      if (borrow.id === account.id && !borrow.returned) {
        borrowedBooks.push(book);
      }
    });
  });
  //using getAuthor helper function
  let result = borrowedBooks.map((book) => {
    return { ...book, author: getAuthor(book, authors)};
  });
  return result;
}

//helper function
function getAuthor(book, authors) {
  const author = authors.find((author) => author.id === book.authorId);
  return author;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
