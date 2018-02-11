import React from 'react';
import './App.css';

import Books from './Books';

export default class Bookshelf extends React.Component {
  render() {
    const { list, header, onShelfChange } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{header}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {list && list.map(book => (
              <Books
                key={book.id}
                book={book}
                onShelfChange={onShelfChange} />
            ))}
          </ol>
        </div>
      </div>
    )
  }
}