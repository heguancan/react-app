import React, { Component } from 'react';
import { Router, Route, hashHistory,IndexRoute,browserHistory,Link} from 'react-router';

export default class  Correct extends Component {

  constructor(props) {
      super(props);
      this.state={title:localStorage.title,
                  content:localStorage.content
                      }

      
   
   
   }

 componentDidMount() {
    let xmlhttp;
    let url="http://182.61.31.37:4545/article/fetchArticle/"+localStorage.bookid;

    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
              localStorage.title=json.content.title;
              localStorage.content=json.content.content;
              this.setState({
                  title:localStorage.title,
                  content:localStorage.content
                });


          
          
        }
      }
      
     xmlhttp.open("GET",url,true);
     xmlhttp.send();
    
  

  }
   

  out=(event)=>{
    event.preventDefault();
    window.location.hash='/IndexList';
  }
  
  public=(event)=>{

    event.preventDefault();
    let title1=localStorage.title;
    let content1=localStorage.content;
    let title = this.refs.title.value;
    let content = this.refs.content.value;
    if(title==''){
      title=title1;
    }
    if(content==''){
      content = content1;
    }

    let data={ 
      title: title,
      content: content,
      token: localStorage.id,
      article: localStorage.bookid
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
             if(json.content=='修改成功'){
                alert('修改成功');
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
          <h1 className='title'>修改文章</h1>
          </header>
          <div className="content">
          <div className="list-block">
            <ul>
              <li >
                <div className="item-content">
                  <div className="item-inner" style={{borderBottom: "2px solid #eee"}}>
                    <div className="item-input">
                      <input type="text" ref="title" placeholder={this.state.title} />
                    </div>
                  </div>
                </div>
              </li>
              <li className="align-top">
                <div className="item-content">
                  <div className="item-inner">
                    <div className="item-input">
                      <textarea placeholder={this.state.content} ref="content" style={{height: "13rem"}}  />
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



