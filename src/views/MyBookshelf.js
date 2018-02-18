import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import Bookshelf from '../components/Bookshelf'


const MyBookshelf = (props) => {
    const { books, onShelfChange, bookDetails } = props
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf
                        header='Currently Reading'
                        books={books.filter(book => book.shelf === 'currentlyReading')}
                        onShelfChange={onShelfChange}
                        bookDetails={bookDetails} />
                    <Bookshelf
                        header='Want to Read'
                        books={books.filter(book => book.shelf === 'wantToRead')}
                        onShelfChange={onShelfChange}
                        bookDetails={bookDetails} />
                    <Bookshelf
                        header='Read'
                        books={books.filter(book => book.shelf === 'read')}
                        onShelfChange={onShelfChange}
                        bookDetails={bookDetails} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/Search">Add a book</Link>
            </div>

        </div >
    )
}

MyBookshelf.propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    books: PropTypes.array.isRequired
}

export default MyBookshelf