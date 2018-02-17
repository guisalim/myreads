import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { debounce } from 'lodash'
import sortBy from 'sort-by'

import * as BooksAPI from '../utils/BooksAPI'
import Bookshelf from '../components/Bookshelf'

export default class SearchPage extends React.Component {
    static propTypes = {
        onShelfChange: PropTypes.func.isRequired,
        myBooks: PropTypes.array.isRequired
    }

    state = {
        books: [],
        isLoading: false,
        query: ''
    }

    handleChange(query) {
        this.setState({ query: query})
        query === '' ?
            this.setState({ books: [] }) :
            this.searchBooks(query)

    }

    searchBooks = debounce((query) => {
        this.setState({ isLoading: true })
        BooksAPI
            .search(query)
            .then(books => {
                (!books || books.error) ?
                    this.setState({ books: [] }) :
                    this.setState({ books: books.sort(sortBy('title')) })
            })
        this.setState({ isLoading: false })
    }, 300)

    render() {
        const { query, books, isLoading } = this.state
        const { onShelfChange, myBooks } = this.props
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link
                        className="close-search"
                        to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text" value={query}
                            placeholder="Search by title or author"
                            onChange={(e) => this.handleChange(e.target.value)} />

                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            isLoading
                                ? <p>Searching...</p>
                                : <Bookshelf books={books} onShelfChange={onShelfChange} myBooks={myBooks} />
                        }
                    </ol>
                </div>
            </div>
        )
    }
}