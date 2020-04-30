import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects'
import loginService from '../../services/loginService';
import { push } from 'connected-react-router';
import { createActions, handleActions ,createAction} from 'redux-actions';

const options = {
  prefix: 'books-review/auth'
};
const { loginPending, loginSuccess, loginFail } = createActions(
  {
  LOGIN_SUCCESS: token => ({ token })
},
  'LOGIN_PENDING',
  'LOGIN-FAIL',
  options
)

// export const loginSaga = createAction('START_LOGIN_SAGA');
// export const logoutSaga = createAction('LOGOUT_SAGA');

const START_LOGIN_SAGA = '"book-review/auth/START_LOGIN_SAGA';
const LOGOUT_SAGA = "book-review/auth/LOGOUT_SAGA";

//start saga action
export const loginSaga = (email, password) => ({
  type: START_LOGIN_SAGA,
  payload: {
    email,
    password
  }
});
export const logoutSaga = () => ({
  type: LOGOUT_SAGA,
});


//실제 동작할 사가 함수
export function* login(action) {

  try {
    yield put(loginPending());
    const response = yield call(loginService.login,action.payload);
    //loclStoragedㅔ 알려주고 
    localStorage.setItem('token', response.data.token);
    //reduxdp 알려준다
    yield put(loginSuccess(response.data.token));
    yield put(push('/'));
  } catch (error) {
    yield put(loginFail(error));
  }
}

export function* logout() {
  try {
    const token = yield select(state => state.auth.token);
    yield call(loginService.logout, token);
  } catch (error) {
    yield put(loginFail(error));
  }
  yield put(loginSuccess(null));
  localStorage.removeItem('token');
  yield put(push('/signin'));
}
//두개를 이어준다.
export function* authSaga() {

  yield takeEvery(START_LOGIN_SAGA, login);
  yield takeLatest(LOGOUT_SAGA, logout)
};

const initalState = {
  token: null,
  loading: false,
  error: null
};

const auth = handleActions({
  LOGIN_PENDING: (state, action) => ({
    token: null,
    loading: true,
    error: null
  }),
  LOGIN_SUCCESS: (state, action) => ({
    token: action.payload.token,
    loading: false,
    error: null
  }),
  LOGIN_FAIL: (state, action) => ({
    token:null,
    loading: false,
    error: action.payload
  })
},
  initalState,
  options)

export default auth;