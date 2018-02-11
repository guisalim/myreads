import React from 'react';
import { Link } from 'react-router-dom';
import sortBy from 'sort-by';

import * as BooksAPI from '../BooksAPI';
import Bookshelf from '../Bookshelf';

export default class SearchPage extends React.Component {
    state = {
        books: [],
        query: ''
    }

    handleChange(query) {
        this.setState({ query: query.trim() })
        query === '' ? 
            this.setState({ books: [] }) :
            BooksAPI
                .search(this.state.query)
                .then(books => {
                    (!books || books.error) ?
                        this.setState({ books: [] }) :
                        this.setState({ books: books.sort(sortBy('title')) })
                })
    }

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
                        <Bookshelf list={books} onShelfChange={onShelfChange} />
                    </ol>
                </div>
            </div>
        )
    }
}