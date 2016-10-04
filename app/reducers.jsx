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
            }
        case 'TOGGLE_TODO':
            return state.id !== action.id
                ? state
                : Object.assign({}, state, { completed: !state.completed })
        default:
            return state;
    }
}

export const todos = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                todo(undefined, action)
            ];
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))

        default:
            return state;
    }
}

export const messages = (state = [], action) => {
    return state;
};

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export const todoApp = combineReducers({
    visibilityFilter,
    messages
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////TESTS///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//
//
// const toggleTodoTest = () => {
//     const state = {
//         id: 0,
//         text: 'Foo bar',
//         completed: false
//     };
//     const newState = {
//         id: 0,
//         text: 'Foo bar',
//         completed: true
//     }
//     expect(
//         toggleTodo(state)
//     ).toEqual(newState)
// }
//
//
// const testAddTodos = () => {
//     const stateBefore = [];
//     const action = {
//         type: 'ADD_TODO',
//         id: 0,
//         text: 'lkjsdflj'
//     }
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'lkjsdflj',
//             completed: false
//         }
//     ]
//     deepFreeze(action);
//     deepFreeze(stateBefore);
//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter)
// }
//
// const testToggleTodo = () => {
//     const stateBefore = [
//         {
//             id: 0,
//             text: 'abc',
//             completed: true
//         },
//         {
//             id: 2,
//             text: 'abc',
//             completed: true
//         }
//     ];
//     const action = { type: 'TOGGLE_TODO', id: 0 }
//     const stateAfter = [
//         {
//             id: 0,
//             text: 'abc',
//             completed: false
//         },{
//             id: 2,
//             text: 'abc',
//             completed: true
//         }
//     ]
//     deepFreeze(action);
//     deepFreeze(stateBefore);
//     expect(
//         todos(stateBefore, action)
//     ).toEqual(stateAfter)
// }
//
// toggleTodoTest();
// testAddTodos();
// testToggleTodo();
