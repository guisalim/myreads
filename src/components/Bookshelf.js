import React from 'react'
import PropTypes from 'prop-types'
import sortBy from 'sort-by'

import Books from './Books'

const Bookshelf = (props) => {
  const { books, header, onShelfChange, myBooks, bookDetails } = props
  const bookList = books.sort(sortBy('title'))
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{header}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && bookList.map(book => (
            <Books
              key={book.id}
              book={book}
              onShelfChange={onShelfChange}
              myBooks={myBooks}
              bookDetails={bookDetails} />
          ))}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.propTypes = {
  header: PropTypes.string,
  books: PropTypes.array.isRequired,
  onShelfChange: PropTypes.func.isRequired,
  myBooks: PropTypes.array
}

export default Bookshelf