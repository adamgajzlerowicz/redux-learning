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

const Link = ({
    active, onClick, children
}) => {
    if (active) {
        return <span>{children}</span>;
    }
    return (
        <a href="#" onClick={ e => {
            e.preventDefault();
            onClick(onClick)
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

class FilterLink extends Component {
    componentDidMount() {
        this.unsubscribe = store.subscribe(()=>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const state = store.getState();
        return (
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={()=> {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.children
                    })
                }}
                visibilityFilter={this.props.visibilityFilter}
            >
                {props.children}
            </Link>
        )
    }
}

const Header = ()=> {
    return (
        <p>
            <FilterLink filter="SHOW_ALL"> All </FilterLink>
            <FilterLink filter="SHOW_ACTIVE"> Active </FilterLink>
            <FilterLink filter="SHOW_COMPLETED"> Completed </FilterLink>
        </p>
    )
};

class VisibleTodoList extends Component {
    componentDidMount(){
        this.unsubscribe = store.subscribe(()=>this.forceUpdate())
    }
    componentWillUnmount(){
        this.unsubscribe();
    }
    render() {
        // const props = this.props;
        const state = store.getState();
        return (
            <TodoList
                todos={
                    getVisibleTodos(
                        state.todos,
                        state.visibilityFilter
                    )}
                onClickTodo={id => {
                    store.dispatch({
                        type: 'TOGGLE_TODO',
                        id: id
                    })
                }}/>
        )
    }
}

const App = ({

})=> {
    return (
        <div>
            <Header />
            <VisibleTodoList />
            <AddTodo onClick={value=> {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: value,
                    id: nextTodoId++
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