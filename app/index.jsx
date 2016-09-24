import React from 'react';
import ReactDom from 'react-dom';
import { World, Foo } from "./World";
import expect from 'expect';
import {counter, newCounter, todoApp} from "./reducers";
import {createStore} from 'redux';

const store = createStore(counter);
const todoStore = createStore(todoApp);

var Counter = ({ state, onIncrement, onDecrement }) => {
    return (
        <div>
            {state} <br/>
            <button onClick={onIncrement} >+</button>
            <button onClick={onDecrement} >-</button>
        </div>
    )
}

var TodoList = ({state}) => {
    return (
        <div>
            list
        </div>
    )
}

var App = ({}) => {
    return(<div>
        <Counter
            state={store.getState() }
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            />
        <br/>
        <TodoList state={todoStore} />
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
todoStore.subscribe(render);
render();

store.dispatch({ type: 'INCREMENT' })
store.dispatch({ type: 'INCREMENT' })
console.log(todoStore.getState());
todoStore.dispatch(
    {
        type: 'ADD_TODO',
        text: 'foo bar',
        id: 1
    }
)
console.log(todoStore.getState());
