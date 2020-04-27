import { takeLatest, takeEvery, delay, put, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import bookService from '../../services/bookService';
import { createAction, createActions, handleActions } from 'redux-actions';

//액션 타입
// const GET_BOOKS_PENDING = 'books-review/books/GET_BOOKS_PENDING';
// const GET_BOOKS_SUCCESS = 'books-review/books/GET_BOOKS_SUCCESS';
// const GET_BOOKS_FAIL = 'books-review/books/GET_BOOKS_FAIL';

//액션 생성자 함수
// export const getBooksPending = () => ({ type: GET_BOOKS_PENDING });
// export const getBooksSuccess = (books) => ({ type: GET_BOOKS_SUCCESS, books });
// export const getBooksFail = error => ({ type: GET_BOOKS_FAIL, error });

const options = { prefix: 'books-review/books' };

const { getBooksFail, getBooksPending, getBooksSuccess } = createActions(
  {
    GET_BOOKS_SUCCESS: books => ({ books })
  },
  'GET_BOOKS_PENDING',
  'GET_BOOKS_FAIL',
  options
);


const initalState = {
  books: [],
  loading: false,
  error: null
}

//리듀서
// const books = (state = initalState, action) => {
//   switch (action.type) {
//     case GET_BOOKS_PENDING:
//       return {
//         books: [],
//         loading: true,
//         error: null
//       }
//     case GET_BOOKS_SUCCESS:
//       return {
//         books: action.books,
//         loading: false,
//         error: null
//       }
//     case GET_BOOKS_FAIL:
//       return {
//         books: [],
//         loading: false,
//         error: action.error,
//       }
//     default:
//       return state;
//   }
// }
//saga
export const requestBooksSaga = createAction('START_REQUEST_BOOKS_SAGA ');
export const removeBooksSaga = createAction('REMOVE_BOOKS_SAGA');
export const addBookSaga = createAction('ADD_BOOK_SAGA');
export const editBookSaga = createAction('EDIT_BOOK_SAGA');

// const START_REQUEST_BOOKS_SAGA = 'book-review/books/START_REQUEST_BOOKS_SAGA';
// const REMOVE_BOOKS_SAGA ='book-review/books/REMOVE_BOOKS_SAGA';

//start saga action
// export const requestBooksSaga = () => ({
//   type: START_REQUEST_BOOKS_SAGA
// });

// export const removeBooksSaga =(books)=>({
//   type:REMOVE_BOOKS_SAGA,
//  books
// });

export function* requestBooks() {
  const token = yield select(state => state.auth.token);
  try {
    yield put(getBooksPending());
    const response = yield call(bookService.getBooks, token);
    yield delay(1000);
    const books = response.data;
    yield put(getBooksSuccess(books));
  } catch (error) {
    yield put(getBooksFail(error));
  }
}

export function* removeBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(getBooksPending());
   yield call(bookService.deleteBook, token, books.payload.bookId);
    // if (res.data.getBooksSuccess) {
      // dispatch(setBooks(books.filter(book => book.bookId !== bookId)));
      yield delay(500);
      yield put(
        getBooksSuccess(
          books.payload.books.filter(
            book => book.bookId !== books.payload.bookId)));
    // }
  } catch (error) {
    yield put(getBooksFail(error));
  }
}

function* addBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(getBooksPending());
    const res = yield call(bookService.addBook, token, books.payload.book);
    yield delay(500);
    yield put(
      getBooksSuccess([...books.payload.books, { ...res.data }]),
    );
    
  } catch (error) {
    yield put(getBooksFail(error));
  }
}

function* editBook(books) {
  const token = yield select(state => state.auth.token);
  try {
    yield put(getBooksPending());
    yield call(bookService.editBook,
      token,
      books.payload.bookId,
      books.payload.book);
    yield put( 
      getBooksSuccess(
      books.payload.books.map(
        book => book.bookId === books.payload.bookId ?
          {...book,...books.payload.book} : book
      )
    ))
  } catch (error) {
    yield put(getBooksFail(error));
  }
}


export function* booksSaga() {
  yield takeLatest(requestBooksSaga, requestBooks);
  yield takeLatest(removeBooksSaga, removeBook);
  yield takeLatest(addBookSaga, addBook);
  yield takeLatest(editBookSaga, editBook);
}

//리듀서
const books = handleActions({
  GET_BOOKS_PENDING: (state, action) => ({
    ...state,
    books: [],
    loading: true,
    error: null
  }),
  GET_BOOKS_SUCCESS: (state, action) => ({
    books: action.payload.books,
    loading: false,
    error: null
  }),
  GET_BOOKS_FAIL: (state, action) => ({
    ...state,
    loading: false,
    error: action.payload
  }),
},
  initalState,
  options
);
export default books;
