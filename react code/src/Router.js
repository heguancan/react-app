import React, { Component } from 'react';
import { Router,Route,hashHistory,Link,IndexRoute,Redirect,browserHistory} from 'react-router';
import Tabbar from './tabbar';
import Login from './login.js';
import Register from './register.js';
import Publications from './Publications.js';
import IndexList from './IndexList.js';
import I from './i.js';
import Comment from './comment.js';
import MyArticles from './MyArticles.js';
import Correct from './correct.js';

export default class  Myrouter extends Component {
  render() {
    return (
            <Router history={hashHistory}>
                <Route path="/" component={Tabbar}>
                    <IndexRoute  component={IndexList}/>
                    <Route name="Login" path="/login" component={Login}/>
                    <Route name="Register" path="/register" component={Register}/>
                    <Route name="Publications" path="/Publications" component={Publications}/>
                    <Route name="IndexList" path="/IndexList" component={IndexList}/>
                    <Route name="I" path="/i" component={I}/>
                    <Route name="Comment" path="/comment" component={Comment}/>
                    <Route name="MyArticles" path="/MyArticles" component={MyArticles}/>
                    <Route name="Correct" path="/correct" component={Correct}/>
                </Route>
            </Router>
     );
  }
}