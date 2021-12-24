//return number 
function getTotalBooksCount(books) {
  return books.length;
}

//Returns the number of accounts in the array
function getTotalAccountsCount(accounts) {
  const list = accounts.reduce((account) => {
  account = accounts.map((account) => account);
  return account.length;
  }, 0);
  return list; 
}


//It returns a number that represents the number of books that are currently checked out of the library. 
//This number can be found by looking at the first transaction object in the `borrows` array of each book. 
//If the transaction says the book has not been returned (i.e. `returned: false`), the book is currently being borrowed.
function getBooksBorrowedCount(books) {
let booksCheckedOut = books.filter((book) =>
   book.borrows.filter((record) => record.returned === false).length > 0
 );
 return booksCheckedOut.length;
}

function getMostCommonGenres(books) {
  let map = {};
  books.forEach((num) => {
   if (map[num.genre]) {
    map[num.genre]++;
   } else {
    map[num.genre] = 1;
   }
  });
  return Object.entries(map)
   .map(([name, count]) => {
    return {
     name,
     count
    };
   })
   .sort((a, b) => b.count - a.count).slice(0, 5);
 }

//return an array containing 5 objects or fewer that represent the most popular books
//represented by number of times a book has been borrowed
//return name and count in the array
function getMostPopularBooks(books) {
  return books.map((book) => {
   return { name: book.title, count: book.borrows.length };
  })
  .sort((a, b) => (a.count < b.count ? 1 : -1))
  .slice(0, 5);
}

//return an array containing 5 or fewer objects representing the most popular objects (checked out the most)
//return name and count in the array
function getMostPopularAuthors(books, authors) {
  let result = [];
  authors.forEach((author) => {
   let theAuthor = {
    name: `${author.name.first} ${author.name.last}`,
    count: 0
   };
   books.forEach((book) => {
    if (book.authorId === author.id) {
     theAuthor.count += book.borrows.length;
    }
   });
   result.push(theAuthor);
  });
  return result.sort((a, b) => b.count - a.count).slice(0, 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
