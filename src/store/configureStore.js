import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import listsReducer from '../reducers/lists';
import ListReducer from '../reducers/list';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    combineReducers({
      auth: authReducer,
      lists: listsReducer,
      list: ListReducer
    }),
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
