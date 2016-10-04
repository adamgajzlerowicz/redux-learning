import {render} from 'react-dom'
import {Router, Route, Link, hashHistory} from 'react-router';
import React from 'react';
import {todoApp} from "./reducers";
import {createStore} from 'redux';
import {Provider, connect} from 'react-redux';
import {SelectedFilterList} from './components/container/SelectedFilterList';
import {VisibleMessagesList} from './components/container/VisibleMessagesList';
import {Option} from './components/presentational/Option';
import {AppBar, Checkbox, IconButton} from 'react-toolbox';
import {Layout, NavDrawer, Panel, Sidebar} from 'react-toolbox';
import {Switch} from 'react-toolbox/lib/switch';
import Dropdown from 'react-toolbox/lib/dropdown';
import 'react-toolbox/lib/commons.scss';

// const countries = [
//     {value: 'EN-gb', label: 'England'},
//     {value: 'ES-es', label: 'Spain'},
//     {value: 'TH-th', label: 'Thailand'},
//     {value: 'EN-en', label: 'USA'}
// ];

const App = ()=> {
    return (
        <Layout>
            <Panel>
                {/*<Dropdown*/}
                    {/*source={countries}*/}
                    {/*value="EN-gb"*/}
                {/*/>*/}
                <select>
                    <Option filter="ALL">all</Option>
                    <Option filter="READ">read</Option>
                    <Option filter="UNREAD">unread</Option>
                </select>
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