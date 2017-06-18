import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import reducer from '../reducer';
// import { loadState, saveState } from '../reducer/localStorage';

// const persistedState = loadState();

const store = createStore(
  reducer,
  // persistedState,
  applyMiddleware(
    thunkMiddleware,
    createLogger({ collapsed: true })
  )
);

// store.subscribe(() => {
//   saveState(store.getState());
// });

export default store;