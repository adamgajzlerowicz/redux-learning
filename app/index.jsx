import React from 'react';
import ReactDom from 'react-dom';
import { World, Foo } from "./World";
import expect from 'expect';
import {counter, newCounter, todoApp} from "./reducers";
import {createStore, combineReducers} from 'redux';

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

var TodoList = ({state}) => {
    return (
        <div>
            list blah
        </div>
    )
}

var App = ({}) => {
    return (<div>
        <Counter
            state={store.getState() }
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            />
        <br/>
        <TodoList state={store} />
    </div>
    )
}

const onIncrement = () => {
    store.dispatch({ type: 'INCREMENT' });
}
const onDecrement = () => {
    store.dispatch({ type: 'DECREMENT' });
}
var render = () => {
    ReactDom.render(
        <App />,
        document.getElementById('app')
    );
}
store.subscribe(render);
render();

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
store.dispatch(
    {
        type: 'ADD_TODO',
        text: 'foo bar',
        id: 1
    }
)
store.dispatch({
    type: 'SET_VISIBILITY_FILTER',
    filter: 'SHOW_ALL'
})
console.log(store.getState());
