import React, { Component } from 'react';
import {Link} from 'react-router';
var md5 = require('js-md5');

export default class  Register extends Component {
  constructor(props) {
      super(props);
      this.state={reg : null};


   
   }

  componentDidMount() {
  

  }
   

  user_name=(event)=>{
    
    
    let username =this.refs.username.value;
    if(username==''){
      return;
    }
    let data = {'username':username};
    let xmlhttp;
    if (window.XMLHttpRequest)
      {
        xmlhttp=new XMLHttpRequest();
      }
    xmlhttp.open("POST","http://182.61.31.37:4545/user/register",true);
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange=()=>{

      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
          if(json.id==2){
            alert('用户名已存在，请重新输入');
            return;
            

          }

        }
      }

  }
   reregister=(event)=>{

    event.preventDefault();
    this.setState({reg:'1'});

  }
   
  register=(event)=>{

    event.preventDefault();

    let text = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ ;
    let username =this.refs.username.value;
    if(username==''){
      alert('请输入用户名');
      return;
    }

    let mail     =text.test(this.refs.mail.value)?this.refs.mail.value:alert('邮箱格式不正确');
    let password = this.refs.password.value;
    let repassword =this.refs.repassword.value;
     if(password==''){
       alert('密码不能为空');
       return;
     }else if(password == repassword ){
       password=md5(password)
     }else {
       alert('密码不一致');
       return;
     }
     
     let data={
      'username':username,
      'mail':mail,
      'password':password
     }

      let xmlhttp;
    if (window.XMLHttpRequest)
      {
        xmlhttp=new XMLHttpRequest();
      }
    xmlhttp.open("POST","http://182.61.31.37:4545/user/register",true);
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange=()=>{

      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
          if(json.id==1){
            alert('注册成功');
            localStorage.id=json.content;
            localStorage.username=username;
            window.location.hash='/IndexList';
          }else{
            alert('注册失败');
            return;
          }

        }
      }


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
            <div className="item-title label">姓名</div>
            <div className="item-input">
              <input type="text" placeholder="Your name" ref="username" onChange={this.user_name}/>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="item-content">
          <div className="item-media"><i className="icon icon-form-email"></i></div>
          <div className="item-inner">
            <div className="item-title label">邮箱</div>
            <div className="item-input">
              <input type="email" placeholder="E-mail" ref="mail" />
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
              <input type="password" placeholder="Password" className="" ref="password"/>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div className="item-content">
          <div className="item-media"><i className="icon icon-form-password" ></i></div>
          <div className="item-inner">
            <div className="item-title label">确认密码</div>
            <div className="item-input">
              <input type="password" placeholder="Re-password" className="" ref="repassword"/>
            </div>
          </div>
        </div>
      </li>
      </ul>
      <div className="content-block">
      	<div className="row">
      		<div className="col-50"><Link to="/register" href="#" className="button button-big button-fill button-danger" onClick={this.reregister}>重置</Link></div>
      		<div className="col-50"><Link to="/register" href="#" className="button button-big button-fill button-success" onClick={this.register}>注册</Link></div>
      	</div>
      </div>
      </div>
    </div>
    </div>
    );
  }
}











