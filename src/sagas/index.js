import { fork, take, call, put, cancel, race } from 'redux-saga/effects';
import { isCancelError } from 'redux-saga';
import { fetch, forceFetch, increasePriority } from '../api/index';
import * as actionTypes from '../constants/actionTypes';

function* handleFetchAllTodos(force, pageNum, pageSize, type, doingActionType, actionType) {
  try {
    yield put({
      type: doingActionType,
    });
    const payload = yield call(force ? forceFetch : fetch, pageNum, pageSize, type);
    yield put({
      type: actionType,
      payload,
    });
  } catch (e) {
    if (!isCancelError(e)) {
      console.error(e);
    }
  }
}

function* fetchBottomTodos() {
  let task;
  while (true) {
    const { setTodoPriority } = yield race({
      fetchBottomTodosAction: take(actionTypes.fetchBottomTodos),
      setTodoPriority: take(actionTypes.setTodoPriority),
    });
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleFetchAllTodos, !!setTodoPriority,
      1, 2, 'bottom', actionTypes.fetchingBottomTodos, actionTypes.setBottomTodos);
  }
}

function* fetchTopTodos() {
  let task;
  while (true) {
    const { setTodoPriority } = yield race({
      fetchTopTodosAction: take(actionTypes.fetchTopTodos),
      setTodoPriority: take(actionTypes.setTodoPriority),
    });
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleFetchAllTodos, !!setTodoPriority,
      1, 2, 'top', actionTypes.fetchingTopTodos, actionTypes.setTopTodos);
  }
}

function* fetchAllTodos() {
  let task;
  while (true) {
    const { payload: { pageSize = 4, pageNum, force } = {} } = yield take('fetchAllTodos');
    if (task) {
      yield cancel(task);
    }
    task = yield fork(handleFetchAllTodos, force,
      pageNum, pageSize, 'default', actionTypes.fetchingAllTodos, actionTypes.setAllTodos);
  }
}

function* increaseTodoPriority() {
  while (true) {
    const { payload: { id } } = yield take(actionTypes.increaseTodoPriority);
    yield put({
      type: actionTypes.increasingTodoPriority,
      payload: {
        id,
      },
    });
    const payload = yield call(increasePriority, id);
    yield put({
      type: actionTypes.setTodoPriority,
      payload,
    });
  }
}

export default function* root() {
  yield fork(fetchAllTodos);
  yield fork(fetchBottomTodos);
  yield fork(fetchTopTodos);
  yield fork(increaseTodoPriority);
}
