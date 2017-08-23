import React,{Component} from "react";
import {render} from "react-dom";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'

import List from './components/List';
import Authorization from './components/Authorization'

const history = createHistory();

const middleware = routerMiddleware(history);

function reducer(state={}, action) {
    switch (action.type) {
        case "FETCH_REQUEST":
            return state;
        case "FETCH_SUCCESS":
            return {...state, posts: action.payload};
        default:
            return state;
    }
}

export const store = createStore(
    reducer,
    applyMiddleware(middleware)
);

class App extends Component {
    render(){
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <div>
                        <Route exact path="/" component={Authorization}/>
                        <Route path="/list" component={List}/>
                    </div>
                </ConnectedRouter>
            </Provider>
        );
    }
}
render(<App/>, window.document.getElementById("app"));