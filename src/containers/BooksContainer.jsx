// import {  useSelector, useDispatch } from 'react-redux';
// // import { setBooks,setBooksThunk,setBookPromsie, setBooksSaga } from '../actions';
// import {requestBooksSaga, removeBooksSaga } from '../redux/modules/books';
// // import axios from 'axios';
// import {useCallback} from 'react'
// import Books from '../components/Books';
// import React from 'react';

// const BooksContainer = (props) => {
//   const books = useSelector(state => state.books.books);
//   const loading = useSelector(state => state.books.loaindg);
//   const error = useSelector(state => state.books.error);
//   const dispatch = useDispatch();

//   const requestBooks = useCallback(()=>{
//     dispatch(requestBooksSaga())
//   },[dispatch]);

//   const removeBook = useCallback((books,bookId)=>{
//     dispatch(removeBooksSaga({books,bookId}));
//   },[dispatch]);

//   return (
//     <Books
//     {...props}
//     books={books}
//     loading={loading}
//     error={error}
//     requestBooks={requestBooks}
//     removeBook={removeBook}
//     />
//   )
// }
// export default BooksContainer;

import {  useSelector, useDispatch } from 'react-redux';
// import { setBooks,setBooksThunk,setBookPromsie, setBooksSaga } from '../actions';
import {requestBooksSaga, removeBooksSaga } from '../redux/modules/books';
// import axios from 'axios';
import {useCallback} from 'react'
import Books from '../components/Books';
import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
  books: state.books.books,
  loading: state.books.loading,
  error: state.books.error,
});

const mapDispatchToProps = dispatch => ({
  requestBooks: () => {
    dispatch(requestBooksSaga());
  },
  removeBook: (books, bookId) => {
    dispatch(removeBooksSaga({ books, bookId }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);