import { createStore, applyMiddleware, combineReducers } from 'redux';
import loggingMiddleware from 'redux-logger';
import thunk from 'redux-thunk';
import todosReducer from './todos';
import users from './users';

const errorReducer = (state = '', action) => {
  if(action.type === 'ERROR'){
    return action.message;
  }
  return '';
}

const rootReducer = combineReducers({
  todos: todosReducer,
  users,
  errorMessage: errorReducer
});

export default createStore(
  rootReducer,
  applyMiddleware(thunk, loggingMiddleware)
);

export * from './todos';
export * from './users';
