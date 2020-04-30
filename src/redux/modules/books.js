import { takeLatest, delay, put, call, select } from 'redux-saga/effects';
import bookService from '../../services/bookService';
import { createAction, createActions, handleActions } from 'redux-actions';


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

//saga
export const requestBooksSaga = createAction('START_REQUEST_BOOKS_SAGA ');
export const removeBooksSaga = createAction('REMOVE_BOOKS_SAGA');
export const addBookSaga = createAction('ADD_BOOK_SAGA');
export const editBookSaga = createAction('EDIT_BOOK_SAGA');


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
    yield delay(500);
      yield put(
        getBooksSuccess(
          books.payload.books.filter(
            book => book.bookId !== books.payload.bookId)));
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
    yield delay(500);  
    yield put(
      getBooksSuccess(
        books.payload.books.map(
          book => book.bookId === books.payload.bookId ?
            { ...book, ...books.payload.book } : book
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
