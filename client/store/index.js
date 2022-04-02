import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import todosReducer from './todos';
import users from './users';

const rootReducer = combineReducers({
  todos: todosReducer,
  users
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk, loggingMiddleware)
);

export * from './todos';
export * from './users';
