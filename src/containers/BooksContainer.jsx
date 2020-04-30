import {requestBooksSaga, removeBooksSaga } from '../redux/modules/books';
import Books from '../components/Books';
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