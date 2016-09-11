import {VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO} from "./../actions/actions";
import { combineReducers } from 'redux';

const initialState = {
    visibilityFilter: VisibilityFilters.SHOW_ALL,
    todos: []
};

function todos(state = initialState.todos, action) {
    switch (action.type) {
        case ADD_TODO:
            return Object.assign({}, state, {
                todos: [
                    ...todos,
                    {
                        text: action.text,
                        complited: false
                    }
                ]
            });
        case TOGGLE_TODO:
            return Object.assign({}, state, {
                todos: state.todos.map(function (todo, index) {
                    if (index == todo.index) {
                        return Object.assign({}, todo, {
                            completed: !todo.completed
                        })
                    }
                    return todo;
                })
            });
        default:
            return state;
    }
}

function visibility(state = initialState.visibilityFilter, action){
    switch(action){
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export const todoApp = combineReducers(
    todos,
    visibility
);

