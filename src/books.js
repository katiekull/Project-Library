//return author object that has the matching id
function findAuthorById(authors, id) {
  //use find 
  let found = authors.find(author => author.id === id);
  return found;
}

//return book object that has the matching id
//similar to the code above
function findBookById(books, id) {
  let foundBook = books.find(book => book.id === id);
  return foundBook;
}

//return an array with two arrays inside it
//use filter to create new datasets then use some and every to continue to manipulate that data
function partitionBooksByBorrowedStatus(books) {
  let returned = books.filter((book) => 
    book.borrows.every((borrow) => borrow.returned === true));
    /*The .filter() method looks through the books array and compiles a new array that only contains books that have been checked out.
  Use a helper function with the every method that will check if our condition is true within the borrow array.  If it is true */
  let checkedOut = books.filter((book) => 
    book.borrows.some((borrow) => borrow.returned === false));
     /*The .filter() method looks through the books array and compiles a new array that contains books that have not been returned.
  Use a helper function with the .some() method that will check if our condition
  is true within the borrow array.  If it is true */
 let finalArray = [[...checkedOut], [...returned]];
 return finalArray;
}

//return an array with 10 or less objects that represents the accounts in the books borrows array
//each object should inclide the returned entry
function getBorrowersForBook(book, accounts) {
  return book.borrows.map((borrow) => {
    let account = accounts.find((account) => account.id === borrow.id);
    return {...borrow, ...account};
  })
  .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
