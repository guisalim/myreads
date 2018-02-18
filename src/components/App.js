import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from '../utils/BooksAPI'
import './App.css'

import MyBookshelf from '../views/MyBookshelf'
import SearchPage from '../views/SearchPage'
import BookDetails from './BookDetails'

export default class BooksApp extends React.Component {
  state = {
    books: [],
    showDetails: false,
    bookDetails: {}
  }

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

  openBookDetails = (book) => {
    this.setState({ showDetails: true, bookDetails: book })
  }
  closeBookDetails = () => this.setState({ showDetails: false })

  render() {
    return (
      <div className="app">

        {this.state.showDetails && <BookDetails open={this.state.showDetails} onClose={this.closeBookDetails} book={this.state.bookDetails} />}

        <Route exact path='/' render={() => (
          <MyBookshelf onShelfChange={this.shelfChange} books={this.state.books} bookDetails={this.openBookDetails} />
        )} />

        <Route path='/Search' render={() => (
          <SearchPage onShelfChange={this.shelfChange} myBooks={this.state.books} bookDetails={this.openBookDetails} />
        )} />
      </div>
    )
  }
}