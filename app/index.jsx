import {render} from 'react-dom'
import {Router, Route, Link, hashHistory} from 'react-router';
import React from 'react';
import {todoApp} from "./reducers";
import {createStore, combineReducers} from 'redux';
import {Provider, connect} from 'react-redux';
import {Message} from './components/presentational/Message';

import {VisibleMessagesList} from './components/container/VisibleMessagesList';


const App = ({})=> {
    return (
        <div>
            <VisibleMessagesList />
        </div>
    )
};

const About = () => {
    return (
        <div>
            about
        </div>
    )
};

let initalState = {messages: [
        {
            content: 'jeden',
            id: 1,
            status: 'read'
        },
        {
            content: 'dwa',
            id: 2,
            status: 'read'
        },
        {
            content: 'trzy',
            id: 3,
            status: 'unread'
        }
    ]};

let store = createStore(todoApp, initalState);
window.store = store;
render((
    <Provider store={store}>
        <Router history={hashHistory}>
            <Route path="/" component={App}/>
            <Route path="/about" component={About}/>
        </Router>
    </Provider>
), document.getElementById('app'));