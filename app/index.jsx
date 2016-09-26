import React from 'react';
import ReactDom from 'react-dom';
import { World, Foo } from "./World";
import expect from 'expect';
import {counter, newCounter, todoApp} from "./reducers";
import {createStore, combineReducers} from 'redux';
const { Component } = React;
let nextTodoId = 0;
const store = createStore(
    todoApp
);

var Counter = ({ state, onIncrement, onDecrement }) => {
    return (
        <div>
            {state.counter} <br/>
            <button onClick={ onIncrement } > + </button>
            <button onClick={onDecrement} > - </button>
        </div>
    )
}

const FilterLink = ({ filter, children, currentFilter }) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    }
    return (
        <a href="#" onClick={ e => {
            e.preventDefault();
            store.dispatch({
                type: 'SET_VISIBILITY_FILTER',
                filter
            })
        } }>{children}</a>
    )
}

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => t.completed 
            );
        case 'SHOW_COMPLETED':
            return todos.filter(t => ! t.completed)
        default: return todos;
    }
}

class App extends Component {
    render() {
        const {
            todos, visibilityFilter
        } = this.props;
        const visibleTodos = getVisibleTodos(
            todos,
            visibilityFilter
        );
        return (
            <div>
                <p>
                    <FilterLink
                        filter='SHOW_ALL'
                        currentFilter={visibilityFilter}
                        > All </FilterLink>
                    <FilterLink
                        filter='SHOW_ACTIVE'
                        currentFilter={visibilityFilter}
                        > Active </FilterLink>
                    <FilterLink
                        filter='SHOW_COMPLETED'
                        currentFilter={visibilityFilter}
                        > Completed </FilterLink>
                </p>
                <input ref={node => {
                    this.input = node;
                } }/>
                <button onClick={() => {
                    store.dispatch({
                        type: 'ADD_TODO',
                        text: this.input.value,
                        id: nextTodoId++
                    });
                } }>Add</button>

                <ul>
                    {visibleTodos.map(todo =>
                        <li style={{
                            textDecoration: todo.completed ? 'line-through' : 'none'
                        }} key={todo.id} onClick={val => {
                            store.dispatch({
                                type: 'TOGGLE_TODO',
                                id: todo.id
                            })
                            console.log(store.getState())
                        } }>
                            {todo.text}
                        </li>
                    ) }
                </ul>

            </div>
        )

    }
}

const onIncrement = () => {
    store.dispatch({ type: 'INCREMENT' });
}
const onDecrement = () => {
    store.dispatch({ type: 'DECREMENT' });
}
var render = () => {
    ReactDom.render(
        <App {...store.getState()}/>,
        document.getElementById('app')
    );
}
store.subscribe(render);
render();

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_ALL'
})
window.store = store;