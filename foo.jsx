import React from 'react';
import ReactDom from 'react-dom';
import {todoApp} from "./reducers";
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
const {Component} = React;

let nextTodoId = 0;


const Todo = ({
    onClick, completed, text
}) => (
    <li style={{
        textDecoration: completed ? 'line-through' : 'none'
    }} onClick={() => {
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

const AddTodo = (props, {store}) => {
    let input;
    return (
        <div>
            <input ref={node => {
                input = node;
            }}/>
            <button onClick={() => {
                store.dispatch({
                    type: 'ADD_TODO',
                    text: input.value,
                    id: nextTodoId++
                })
            } }>Add
            </button>
        </div>
    )
};

AddTodo.contextTypes = {
    store: React.PropTypes.object
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
        const {store} = this.context;
        this.unsubscribe = store.subscribe(()=>
            this.forceUpdate()
        )
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();
        return (
            <Link
                active={
                    props.filter === state.visibilityFilter
                }
                onClick={()=> {
                    store.dispatch({
                        type: 'SET_VISIBILITY_FILTER',
                        filter: props.filter
                    })
                }}
                visibilityFilter={this.props.visibilityFilter}
            >
                {props.children}
            </Link>
        )
    }
}

FilterLink.contextTypes = {
    store: React.PropTypes.object
};

const Header = ({})=> {
    return (
        <p>
            <FilterLink filter="SHOW_ALL"> All </FilterLink>
            <FilterLink filter="SHOW_ACTIVE"> Active </FilterLink>
            <FilterLink filter="SHOW_COMPLETED"> Completed </FilterLink>
        </p>
    )
};

const mapStateToProps = (state) => {
    return {
        todos: getVisibleTodos(
            state.todos,
            state.visibilityFilter
        )
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onTodoClick: (id) => {
            store.dispatch({
                type: 'TOGGLE_TODO',
                id: id
            })
        }
    }
};

class VisibleTodoList extends Component {
    componentDidMount() {
        const {store} = this.context;
        this.unsubscribe = store.subscribe(()=>this.forceUpdate())
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        const props = this.props;
        const {store} = this.context;
        const state = store.getState();
        return (
            <TodoList
                todos={
                }
                onClickTodo={

                }/>
        )
    }
}

Provider.childContextTypes = {
    store: React.PropTypes.object
};
VisibleTodoList.contextTypes = {
    store: React.PropTypes.object
};
const App = ({})=> {
    return (
        <div>
            <Header/>
            <AddTodo/>
            <VisibleTodoList/>
        </div>
    )
};

ReactDom.render(
    <Provider store={createStore(todoApp)}>
        <App/>
    </Provider>,
    document.getElementById('app')
);
