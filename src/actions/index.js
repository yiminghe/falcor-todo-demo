import { createAction } from 'redux-actions';
import * as actionTypes from '../constants/actionTypes';

export const fetchAllTodos = createAction(actionTypes.fetchAllTodos);
export const increaseTodoPriority = createAction(actionTypes.increaseTodoPriority);
export const fetchBottomTodos = createAction(actionTypes.fetchBottomTodos);
export const fetchTopTodos = createAction(actionTypes.fetchTopTodos);

export const setTopTodos = createAction(actionTypes.setTopTodos);
export const setAllTodos = createAction(actionTypes.setAllTodos);
export const setTodoPriority = createAction(actionTypes.setTodoPriority);
export const setBottomTodos = createAction(actionTypes.setBottomTodos);


export const fetchingTopTodos = createAction(actionTypes.fetchingTopTodos);
export const fetchingAllTodos = createAction(actionTypes.fetchingAllTodos);
export const increasingTodoPriority = createAction(actionTypes.increasingTodoPriority);
export const fetchingBottomTodos = createAction(actionTypes.fetchingBottomTodos);
