import React, { Component } from 'react';
import Toploginregister from './top-login-register.js'
import { Router, Route, hashHistory,IndexRoute,browserHistory,Link} from 'react-router';
var md5 = require('js-md5');

export default class  Login extends Component {

  constructor(props) {
      super(props);
   
   
   }

  componentDidMount() {
  

  }
   
  login=(event)=>{

    event.preventDefault();
    let username =this.refs.user_name.value;
    let password =md5(this.refs.user_pass.value);
    let xmlhttp;

    if (window.XMLHttpRequest)
      {
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{

      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);

          if(json.id===1&&json.type===1){

            alert('登录成功');

            localStorage.id=json.content;
            localStorage.username=username;

            window.location.hash='/IndexList';

          }else{
            alert('登录信息不正确');
          }
          console.log(json);
          

        }
      }
     xmlhttp.open("POST","http://182.61.31.37:4545/user/login",true);
     xmlhttp.send(JSON.stringify({
      'username':username,
      'password':password
     }));

  }







  render() {            
  
  return ( 

   <div> 
        <header className="bar bar-nav">
                <Link to="/login" id="login">
                <button className="button button-link button-nav pull-left">登录</button>
                </Link>
                <Link to="/register" id="register">
                <button className="button button-link button-nav pull-right">注册</button>
                </Link>
        </header>
        <div className="content">
                <div className="list-block">
      <ul>
      <li>
        <div className="item-content">
          <div className="item-media"><i className="icon icon-form-name"></i></div>
          <div className="item-inner">
            <div className="item-title label">用户名</div>
            <div className="item-input">
              <input type="text" placeholder="Your name"  ref="user_name"/>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="item-content">
          <div className="item-media"><i className="icon icon-form-password"></i></div>
          <div className="item-inner">
            <div className="item-title label">密码</div>
            <div className="item-input">
              <input type="password" placeholder="Password" className="" ref="user_pass"/>
            </div>
          </div>
        </div>
      </li>
      </ul>
       <div className="content-block">
       <p><Link to="/i" href="#" className="button  button-big button-fill button-success" onClick={this.login}>登录</Link></p>
      </div>
      </div>
      </div>
      </div>
    );
  }
}













        