import React from 'react'
import PropTypes from 'prop-types'

const Books = (props) => {
    const { onShelfChange, book, myBooks, bookDetails } = props
    const { imageLinks, title, subtitle, shelf, authors, averageRating, ratingsCount } = props.book

    const shelfValue = (book, myBooks) => {
        const bookFound = myBooks.find(b => b.id === book.id);
        if (bookFound) {
            return bookFound.shelf;
        } else {
            return 'none'
        }
    }

    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" onClick={(e) => bookDetails(book)}
                        style={{ width: 128, height: 193, backgroundImage: `url(${imageLinks.thumbnail})` }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select
                            defaultValue={shelf ? shelf : shelfValue(book, myBooks)}
                            onChange={(e) => onShelfChange(book, e.target.value)}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead"> Want to Read</option>
                            <option value="read"> Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}{subtitle && ` - ${subtitle}`}</div>
                {
                    authors && authors.map((author, index) => <div key={index} className="book-authors">* {author}</div>)
                }
                {
                    ratingsCount && <div className="book-rating">Rating: {averageRating} ({ratingsCount})</div>
                }
            </div>
        </li>
    )
}

Books.propTypes = {
    onShelfChange: PropTypes.func.isRequired,
    book: PropTypes.object.isRequired,
    myBooks: PropTypes.array
}

export default Books