import { connect } from 'react-redux';
import { addBookSaga,requestBooksSaga } from '../redux/modules/books';
import {BookAddForm} from '../components/BookAddForm';

const mapStateToProps = state => ({
  books: state.books.books,
});

const mapDispatchToProps = dispatch => ({
  requestBooks: () => {
    dispatch(requestBooksSaga());
  },
  addBook: (books, book) => {
    dispatch(addBookSaga({ books, book }));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BookAddForm);