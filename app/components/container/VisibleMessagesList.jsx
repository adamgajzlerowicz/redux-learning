import {connect} from 'react-redux';
import {MessageList} from '../presentational/MessageList';

const getVisibleMessages = (messages, filter) => {
    switch (filter) {
        case 'SHOW_ALL':
            return messages;
        case 'SHOW_READ':
            return messages.filter(t => t.status == 'read');
        case 'SHOW_UNREAD':
            return messages.filter(t => !t.completed == 'unread')
    }
};

const mapStateToProps = (state) => {
    return {
        messages: getVisibleMessages(state.messages, state.visibilityFilter)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onClick: (content) => {
            alert(content);
            // dispatch(toggleTodo(id))
        }
    }
};

export const VisibleMessagesList = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessageList);