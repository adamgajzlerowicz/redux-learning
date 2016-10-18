import React  from 'react';

export const Message = ({content, onClick}) => {
    //noinspection BadExpressionStatementJS
    return (
        <div onClick={onClick}>
            message is: {content}
        </div>
    )
};