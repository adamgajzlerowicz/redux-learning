import {VisibilityFilters, SET_VISIBILITY_FILTER, ADD_TODO, TOGGLE_TODO} from "./actions";
import {combineReducers} from 'redux';
import expect from 'expect';
import deepFreeze from 'deep-freeze-node';

export const counter = (state = 0, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return ++state;
        case 'DECREMENT':
            return state == 0 ? 0 : --state;
    }
    return state;
}

export const newCounter = (state = 0, action) => {
    return state.concat([0]);
}

export const RemoveCounter = (state, index) => {
    return [
        ...state.slice(0, index),
        ...state.slice(index + 1)
    ]
}

export const incrementCounter = (state, index) => {
    return [
        ...state.slice(0, index),
        state[index] + 1,
        ...state.slice(index + 1)
    ]
}

export const toggleTodo = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    })
}

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
            ]
        case 'TOGGLE_TODO':
            return state.map(t => todo(t, action))

        default:
            return state;
    }
}

export const visibilityFilter = (state = 'SHOW_ALL', action) => {
    switch (action.type) {
        case SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export const todoApp = combineReducers({
    todos,
    visibilityFilter,
    counter
})


//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////TESTS///////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

expect(
    counter(0, { type: 'INCREMENT' })
).toEqual(1)

expect(
    counter(4, { type: 'LKJDFLKJ' })
).toEqual(4)

expect(
    counter(undefined, { type: 'LKJDFLKJ' })
).toEqual(0)

expect(
    counter(0, { type: 'DECREMENT' })
).toEqual(0);

const toggleTodoTest = () => {
    const state = {
        id: 0,
        text: 'Foo bar',
        completed: false
    };
    const newState = {
        id: 0,
        text: 'Foo bar',
        completed: true
    }
    expect(
        toggleTodo(state)
    ).toEqual(newState)
}


const testAddTodos = () => {
    const stateBefore = [];
    const action = {
        type: 'ADD_TODO',
        id: 0,
        text: 'lkjsdflj'
    }
    const stateAfter = [
        {
            id: 0,
            text: 'lkjsdflj',
            completed: false
        }
    ]
    deepFreeze(action);
    deepFreeze(stateBefore);
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)
}

const testToggleTodo = () => {
    const stateBefore = [
        {
            id: 0,
            text: 'abc',
            completed: true
        },
        {
            id: 2,
            text: 'abc',
            completed: true
        }
    ];
    const action = { type: 'TOGGLE_TODO', id: 0 }
    const stateAfter = [
        {
            id: 0,
            text: 'abc',
            completed: false
        },{
            id: 2,
            text: 'abc',
            completed: true
        }
    ]
    deepFreeze(action);
    deepFreeze(stateBefore);
    expect(
        todos(stateBefore, action)
    ).toEqual(stateAfter)
}

const testIncrementCounter = () => {
    let state = [20, 12, 3];
    let newState = [20, 12, 4];
    deepFreeze(state);
    expect(
        incrementCounter(state, 2)
    ).toEqual(newState);
}

const testAddCounter = () => {
    let state = [];
    let newState = [0];
    deepFreeze(state);
    expect(
        newCounter(state)
    ).toEqual(newState);
}

const testRemoveCounter = () => {
    let state = [20, 10, 3, 8];
    let newState = [20, 10, 8];
    deepFreeze(state);
    expect(
        RemoveCounter(state, 2)
    ).toEqual(newState);
}

testAddCounter();
testIncrementCounter();
toggleTodoTest();
testAddTodos();
testToggleTodo();
testRemoveCounter();
