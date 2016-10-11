import {render} from 'react-dom'
import {Router, Route, hashHistory} from 'react-router';
import React from 'react';
import {todoApp} from "./reducers";
import {createStore} from 'redux';
import {Provider} from 'react-redux';
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


if (process.env.NODE_ENV === 'development') {
    import {username, password) from './creds';
}
const url = ((username && password) ? (username + ':' + password + '@') : '') + document.location.host;
console.log(url);

export const conn = {
    get: (url) => {
        return new Promise((res) => {
            fetch(url)
                .then(function (response) {
                    res(response.text());
                })
        });
    },
    post: (url, payload) => {
        const data = [];
        return data;
    }
};

conn.get('http://localhost:8081').then(result=> {
    console.info(result);
});

