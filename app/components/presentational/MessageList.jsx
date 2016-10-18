import React from 'react';
import {Message} from './Message';

export const MessageList = ({messages, onClick}) => {
    return (
        <div>
            <ul>
                {messages.map((message) => <Message
                        id={message.id}
                        content={message.content  }
                        key={message.id}
                        onClick={() => {
                            onClick(message.content)
                        } }
                        {...message}
                    />
                ) }
            </ul>
        </div>
    )

};