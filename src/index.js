import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import store from './store';
import {Provider} from 'react-redux';
// import initStore,{sagaMiddleware} from './store';
// import mySagas from './sagas';
import create,{sagaMiddleware} from './redux/create';
import rootSaga from './redux/modules/rootSaga';

const token = localStorage.getItem('token');
const store = create(token);

sagaMiddleware.run(rootSaga);

ReactDOM.render(
<Provider store={store}>
  <App />
</Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
