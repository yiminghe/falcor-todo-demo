import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers/index';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas/index';

export default function configure(initialState) {
  const enhancer = compose(
    applyMiddleware(createSagaMiddleware(sagas)),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  );
  const store = createStore(rootReducer, initialState, enhancer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
