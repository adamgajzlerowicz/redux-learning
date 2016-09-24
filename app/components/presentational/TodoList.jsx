import React, {PropTypes} from 'react';
import {Todo} from './Todo';

var TodoList = ({todos, onTodoClick}) => {
    //noinspection BadExpressionStatementJS
    <ul>
        {todos.map((todo) => <Todo
            id={todo.id}
            onClick={() => { onTodoClick(todo.id) } }
            {...todo}
            />
        ) }
    </ul>
};

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        completed: PropTypes.bool.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired,
    onTodoClick: PropTypes.func.isRequired
};
export default TodoList;