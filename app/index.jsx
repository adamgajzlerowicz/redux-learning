import React from 'react';
import ReactDom from 'react-dom';
import {todoApp} from "./reducers";
import {createStore, combineReducers} from 'redux';
const {Component} = React;
let nextTodoId = 0;
const store = createStore(
    todoApp
);


const Todo = ({
    onClick, completed, text
}) => (
    <li style={{
        textDecoration: completed ? 'line-through' : 'none'
    }} onClick={val => {
        onClick()
    } }>
        {text}
    </li>
);

const TodoList = ({
    todos, onClickTodo
}) => (
    <ul>
        {todos.map(todo =>
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => onClickTodo(todo.id)}
            />
        )}
    </ul>
);

const FilterLink = ({filter, children, currentFilter, onClickFilter}) => {
    if (filter === currentFilter) {
        return <span>{children}</span>;
    }
    return (
        <a href="#" onClick={ e => {
            e.preventDefault();
            onClickFilter(filter)
        } }>{children}</a>
    )
};

const AddTodo = ({onClick}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                onClick(input.value)
            } }>Add
            </button>
        </div>
    )
};

const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case 'SHOW_ACTIVE':
            return todos.filter(
                t => t.completed
            );
        case 'SHOW_COMPLETED':
            return todos.filter(t => !t.completed)
        default:
            return todos;
    }
};

const Header = ({visibilityFilter, onClickFilter})=> {
    return (
        <p>
            <FilterLink
                filter='SHOW_ALL'
                currentFilter={visibilityFilter}
                onClickFilter={onClickFilter}
            > All </FilterLink>
            <FilterLink
                filter='SHOW_ACTIVE'
                currentFilter={visibilityFilter}
                onClickFilter={onClickFilter}
            > Active </FilterLink>
            <FilterLink
                filter='SHOW_COMPLETED'
                currentFilter={visibilityFilter}
                onClickFilter={onClickFilter}
            > Completed </FilterLink>
        </p>
    )
};

const App = ({
    visibilityFilter, todos
})=> {
    return (
        <div>
            <Header
                visibilityFilter={visibilityFilter}
                onClickFilter={filter=> {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter
                    })
                }}/>

            <AddTodo onClick={value=> {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: value,
                    id: nextTodoId++
                })
            }}/>

            <TodoList
                todos={getVisibleTodos(
                    todos,
                    visibilityFilter
                )}
                onClickTodo={id => {
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: id
                    })
                }}/>
        </div>
    )

};


var render = () => {
    ReactDom.render(
        <App {...store.getState()} />,
        document.getElementById('app')
    );
};
store.subscribe(render);
render();

window.store = store;