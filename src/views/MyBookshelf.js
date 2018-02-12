import React from 'react'
import { Link } from 'react-router-dom'

import Bookshelf from '../components/Bookshelf'


const MyBookshelf = (props) => {
    const { books, onShelfChange } = props
    return (
        <div className="list-books">
            <div className="list-books-title">
                <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf
                        header='Currently Reading'
                        list={books.filter(book => book.shelf === 'currentlyReading')}
                        onShelfChange={onShelfChange} />
                    <Bookshelf
                        header='Want to Read'
                        list={books.filter(book => book.shelf === 'wantToRead')}
                        onShelfChange={onShelfChange} />
                    <Bookshelf
                        header='Read'
                        list={books.filter(book => book.shelf === 'read')}
                        onShelfChange={onShelfChange} />
                </div>
            </div>
            <div className="open-search">
                <Link to="/Search">Add a book</Link>
            </div>
        </div >
    )
}

export default MyBookshelf