import { takeEvery, takeLatest, put, call, select } from 'redux-saga/effects'
import loginService from '../../services/loginService';
import { push } from 'connected-react-router';
import { createActions, handleActions } from 'redux-actions';

const options = {
  prefix: 'books-review/auth'
};
const { loginFail, loginPending, loginSuccess } = createActions(
  {
    LOGIN_SUCCESS: token => ({ token })
  },
  'LOGIN_PENDING',
  'LOGIN-FAIL',
  options
)

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

export const logoutSaga = (token) => ({
  type: LOGOUT_SAGA,
  token
});

//실제 동작할 사가 함수
 function* login(action) {
  try {
    yield put(loginPending());
    const res = yield call(loginService.login, action.payload);
    // console.log(res.data.token)
    localStorage.setItem('token', res.data.token);
    yield put(loginSuccess(res.data.token));
    yield put(push('/'));
  } catch (error) {
    yield put(loginFail(error));
  }
}

 function* logout() {
   const token = yield select(state => state.auth.token);
   try {
    yield call(loginService.logout, token);
  } catch (error) {
    yield put(loginFail(error));
  }
  localStorage.removeItem('token');
  yield put(loginSuccess(null));
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
    token: null,
    loading: false,
    error: action.payload
  })
},
  initalState,
  options
);

export default auth;