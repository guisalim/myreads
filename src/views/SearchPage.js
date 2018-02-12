import React from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';
import { debounce } from 'lodash';

import * as BooksAPI from '../utils/BooksAPI';
import Bookshelf from '../components/Bookshelf';

export default class SearchPage extends React.Component {
    state = {
        books: [],
        isLoading: false,
        query: ''
    }

    handleChange(query) {
        this.setState({ query: query.trim() })
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
                    this.setState({ 
                        books: books.sort(sortBy('title')),
                        isLoading: false
                    })
            })
    }, 300)

    render() {
        const { query, books } = this.state
        const { onShelfChange } = this.props
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
                            this.state.isLoading ? 
                                <p>MyReads is looking for results</p> :
                                <Bookshelf list={books} onShelfChange={onShelfChange} />
                        }
                    </ol>
                </div>
            </div>
        )
    }
}