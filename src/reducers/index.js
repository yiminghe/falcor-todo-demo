import { handleActions } from 'redux-actions';
import { combineReducers } from 'redux';
import * as actionTypes from '../constants/actionTypes';

const allTodos = handleActions({
  [actionTypes.fetchingAllTodos]() {
    return {
      data: [],
      loading: true,
    };
  },
  [actionTypes.setAllTodos](state, action) {
    return {
      ...action.payload,
    };
  },
  [actionTypes.increasingTodoPriority](state, action) {
    const { payload } = action;
    const data = state.data.concat();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === payload.id) {
        data[i] = {
          ...data[i],
          loading: true,
        };
      }
    }
    return {
      ...state,
      data,
    };
  },
  [actionTypes.setTodoPriority](state, action) {
    const { payload } = action;
    const data = state.data.concat();
    for (let i = 0; i < data.length; i++) {
      if (data[i].id === payload.id) {
        data[i] = {
          ...data[i],
          priority: payload.priority,
          loading: false,
        };
      }
    }
    return {
      ...state,
      data,
    };
  },
}, {});

const topTodos = handleActions({
  [actionTypes.fetchingTopTodos]() {
    return {
      data: [],
      loading: true,
    };
  },
  [actionTypes.setTopTodos](state, action) {
    return {
      ...action.payload,
    };
  },
}, {});

const bottomTodos = handleActions({
  [actionTypes.fetchingBottomTodos]() {
    return {
      data: [],
      loading: true,
    };
  },
  [actionTypes.setBottomTodos](state, action) {
    return {
      ...action.payload,
    };
  },
}, {});

export default combineReducers({
  allTodos,
  topTodos,
  bottomTodos,
});
