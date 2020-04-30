import {connect} from 'react-redux';
import { EditModal } from '../components/EditModal';
import { editBookSaga } from '../redux/modules/books';

const mapStateToProps =(state)=>({
  books:state.books.books
});

const mapDispatchToProps =(dispatch)=>({
  editBook:(books,bookId,book)=>{
    dispatch(editBookSaga({ books , bookId , book }));
  }
});

export default connect(mapStateToProps,mapDispatchToProps)(EditModal);