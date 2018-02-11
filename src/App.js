import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'

import MyBookshelf from './views/MyBookshelf'
import SearchPage from './views/SearchPage'

class BooksApp extends React.Component {
  state = { books: [] }

  componentDidMount() {
    BooksAPI.getAll().then(books => { this.setState({ books }) })
  }

  shelfChange = (book, newShelf) => {
    BooksAPI
      .update(book, newShelf)
      .then(response => {
        book.shelf = newShelf
        const updatedBooks = this.state.books.filter(b => b.id !== book.id).concat(book)
        this.setState({ books: updatedBooks })
      })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <MyBookshelf onShelfChange={this.shelfChange} books={this.state.books} />
        )} />

        <Route path='/Search' render={() => (
          <SearchPage onShelfChange={this.shelfChange} />
        )} />
      </div>
    )
  }
}

export default BooksApp
