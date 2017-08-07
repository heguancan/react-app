import React, { Component } from 'react';
import {dateDiff} from './tool.js'
import { Router, Route, hashHistory,IndexRoute,browserHistory,Link} from 'react-router';

export class  ItemComponent extends React.Component {
  constructor(props) {
      super(props);
   
   }
   
  componentDidMount() {
    
  }

 

   render() {
 

    return(
            <li className="row" key="{index}">
              <div className="col-15" style={{padding: '0.3rem 0'}}>
              <img className="commentAvatar" src={this.props.comobj.avatar} alt=""/>
              </div>
              <div className="col-85 commentList">
              <div style={{fontWeight: 'bold', fontSize: '15px'}}>{this.props.comobj.username}</div>
              <p style={{margin: '0.2rem 0', fontSize: '14px'}}>{this.props.comobj.comment}</p>
              <div style={{fontSize: '12px'}}><span className="icon icon-clock"> </span> {dateDiff(this.props.comobj.createAt)}</div>
              </div>
            </li>
     );
        
     }
}

export class  ListComponent extends React.Component {
    constructor(props) {
      super(props);
   
   }

   render() {
    let commentlist=this.props.commentlist;
    let arry=[];
    if(commentlist!=null){
      console.log(commentlist);
      commentlist.forEach(function(article,i){

        arry.push(<ItemComponent key={i} comobj={article}/>)
        arry=arry.reverse();
      })
    }
  
    return(
      <div>
      {arry}
      </div>
     );
        
     }
} 

export default class  Comment extends Component {



constructor(props) {
      super(props);
      this.state={title:localStorage.title,
                  content:localStorage.content,
                  username_:localStorage.username_,
                  createAt:localStorage.createAt,
                  comments:null,
                  refresh:null
                      }

      
   
   
   }

 componentDidMount() {
    let xmlhttp;
    let url="http://182.61.31.37:4545/article/fetchArticle/"+localStorage.combookid;
    let data={'id':localStorage.combookid}

    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
          console.log(json);
              localStorage.title=json.content.title;
              localStorage.content=json.content.content;
              localStorage.createAt=json.content.createAt;
              localStorage.username_=json.content.author.username;
              this.setState({
                  title:localStorage.title,
                  content:localStorage.content,
                  username_:localStorage.username_,
                  createAt:localStorage.createAt,
                  comments:json.content.comments
                });


          
          
        }
      }
      
     xmlhttp.open("GET",url,true);
     xmlhttp.send(JSON.stringify(data));
  
  }


  handleComment=(event)=>{
      event.preventDefault();
    let xmlhttp;
    let url="http://182.61.31.37:4545/article/comment";
    let commentText=this.refs.commentText.value;
    if(commentText==''){
      alert('评论不能为空');
      return
    }
    let data={
      "userId": localStorage.id,
  "articleId": localStorage.combookid,
  "comment": commentText
  }

    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
          console.log(json);
          if(json.content = '评论成功'){
            this.refs.commentText.value='';
            this.componentDidMount();
            alert('评论成功');
          }
        }
      }
      
     xmlhttp.open("post",url,true);
     xmlhttp.send(JSON.stringify(data));

    }





  render() {
        if(localStorage.id==''){
        alert('你还没有登录，请登录')
        window.location.hash='/login';
      }
    return (
         <div>
         <main className="detailContent">
          <Link to="/IndexList" className="clearPt"><h2>{this.state.title}</h2></Link>
          <div>
            <span className="font12 marR">{this.state.username_}</span>
            <span className="font12">发表于:{dateDiff(this.state.createAt)}</span>
          </div>
          <hr/>
          <div className="article">
            {this.state.content}
          </div>
          <hr/>
          <h3 className="clearPL">评论:</h3>
          <ListComponent commentlist={this.state.comments}/>
        </main>
        <div className="comment row no-gutter" style={{margin: 'none', zIndex: '2002'}}>
          <input type="text" style={{border: 'none'}} ref="commentText" className="col-75 commentInput"
                 placeholder="说点什么吧" onChange={this.checkLogin}/>
          <Link onClick={this.handleComment} className="button col-25 button-fill button-big">评论</Link>
        </div>
        </div>
    );
  }
}

