import React, { Component } from 'react';
import { Router, Route, hashHistory,IndexRoute,browserHistory,Link} from 'react-router';

export default class  Publications extends Component {

  constructor(props) {
      super(props);
   
   
   }

 componentDidMount() {
  

  }
   

  out=(event)=>{
    event.preventDefault();
    window.location.hash='/IndexList';
  }
  
  public=(event)=>{

    event.preventDefault();
    let title = this.refs.title.value;
    let content = this.refs.content.value;
    let data={ 
      title: title,
      content: content,
      token: localStorage.id,
      article: '' 
    }


    if (title == '') {
      alert('标题不能为空');
      return;
    }
    if (content == '') {
      alert('内容不能为空');
      return;
    }


    let xmlhttp;
    if (window.XMLHttpRequest)
      {
        xmlhttp=new XMLHttpRequest();
      }
    xmlhttp.open("POST","http://182.61.31.37:4545/article/pulish",true);
    xmlhttp.send(JSON.stringify(data));
    xmlhttp.onreadystatechange=()=>{

      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
             if(json.content=='发表成功'){
                alert('发表成功');
                window.location.hash='/IndexList';
             }
            
          }

        }
      }


   
  

  render() { 
      
      if(localStorage.id==''){
        alert('你还没有登录，请登录')
        window.location.hash='/login';
      }

    
  return (  

          <div>
          <header className="bar bar-nav">
          <h1 className='title'>发表文章</h1>
          </header>
          <div className="content">
          <div className="list-block">
            <ul>
              <li >
                <div className="item-content">
                  <div className="item-inner" style={{borderBottom: "2px solid #eee"}}>
                    <div className="item-input">
                      <input type="text" ref="title" placeholder="请输入标题" />
                    </div>
                  </div>
                </div>
              </li>
              <li className="align-top">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-input">
                      <textarea placeholder="请输入内容" ref="content" style={{height: "13rem"}}  />
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <div className="content-block">
            <div className="row">
              <div className="col-50"><a className="button button-big button-fill button-danger" onClick={this.out}>取消</a></div>
              <div className="col-50"><a className="button button-big button-fill button-success" onClick={this.public}>发表</a></div>
            </div>
          </div>
        </div>
          </div>

       );
  }
}