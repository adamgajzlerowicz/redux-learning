import {render} from 'react-dom'
import {Router, Route, Link, hashHistory} from 'react-router';
import React from 'react';
import {todoApp} from "./reducers";
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {VisibleMessagesList} from './components/container/VisibleMessagesList';
import {Filter} from './components/container/Filter';
import {AppBar, Checkbox, IconButton} from 'react-toolbox';
import {Layout, NavDrawer, Panel, Sidebar, Dropdown} from 'react-toolbox';
import 'react-toolbox/lib/commons.scss';

const App = () => {
    return (
        <Layout>
            <Panel>
                <Filter />
                <VisibleMessagesList />
            </Panel>
        </Layout>
    )
};

const About = () => {
    return (
        <div>
            about
        </div>
    )
};

let initalState = {
    messages: [
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
    ]
};

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