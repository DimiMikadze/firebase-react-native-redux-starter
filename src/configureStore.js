import { combineReducers, createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';
import auth from './modules/auth';
import post from './modules/post';

const reducers = combineReducers({
  auth,
  post,
  form: formReducer,
});

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

export default store;
