import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Signin from './pages/Signin';
import NotFound from './pages/NotFound';
import withAuth from './hocs/withAuth';
import ErrorBoundary from 'react-error-boundary'
import myBookList from './pages/myBookList';
import {ConnectedRouter} from 'connected-react-router';
import {history} from './redux/create';

function App() {
const ErrorFallbackComponent = ({error})=><div>{error.message}</div>

  return (
    <ErrorBoundary FallbackComponent={ErrorFallbackComponent} >
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/signin" component={Signin} />
        <Route exact path ="/bookList" component={myBookList}/>
        <Route exact path="/" component={withAuth(Home)}/>
        <Route component={NotFound} />
      </Switch>
    </ConnectedRouter>
    </ErrorBoundary>
  );
}

export default App;
