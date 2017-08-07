import React, { Component } from 'react';

export default class  Toploginregister extends Component {
  render() {
    return (   
            <header className="bar bar-nav">
                <a id="login">
                <button className="button button-link button-nav pull-left">登录</button>
                </a>
                <a id="register">
                <button className="button button-link button-nav pull-right">注册</button>
                </a>
            </header>
    );
  }
}