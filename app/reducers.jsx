import {VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO} from "./actions";
import {combineReducers} from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze-node';

const todo = (state, action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return {
                id: action.id,
                text: action.text,
                completed: false
            };
        case 'TOGGLE_TODO':
            return state.id !== action.id
                ? state
                : Object.assign({}, state, { completed: !state.completed })
        default:
            return state;
    }
};

export const messages = (state = [], action) => {
    return state;
};

export const visibilityFilter = (state = 'ALL', action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
};

export const todoApp = combineReducers({
    visibilityFilter,
    messages
});
