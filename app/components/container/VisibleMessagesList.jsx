import {connect} from 'react-redux';
import {MessageList} from '../presentational/MessageList';

const getVisibleMessages = (messages, filter) => {
    switch (filter) {
        case 'ALL':
            return messages;
        case 'READ':
            return messages.filter(t => t.status == 'read');
        case 'UNREAD':
            return messages.filter(t => t.status == 'unread')
    }
};

const mapStateToProps = (state) => {
    return {
        messages: getVisibleMessages(state.messages, state.visibilityFilter),
        customerStyles: state.customerStyles
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