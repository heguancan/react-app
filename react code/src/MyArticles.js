import React, { Component } from 'react';
import {Link} from 'react-router';


export  class  MyArticlesComponent extends React.Component {
  constructor(props) {
      super(props);
   
   }

   cor=(event)=>{

    event.preventDefault();
    window.location.hash='/correct';
    localStorage.bookid=this.props.malistobj.articleId;

   }


   render() {
    

   

    return(

          <div className="list-block">
            <ul>
              <li className="item-content" onClick={this.cor}>
                <div className="item-media"><i className="icon icon-edit"></i></div>
                <div className="item-inner"  style={{cursor:'pointer'}} >
                  <div  style={{height: '100%', width: '100%', display: 'block'}} className="item-title">{this.props.malistobj.title}</div>
                </div>
              </li>
            </ul>
          </div>


     );
        
    }
}



export class  MyArticlesList extends React.Component {
    constructor(props) {
      super(props);
      
   
   }

   render() {
   
    let myartlist=this.props.myartlist;
    console.log(myartlist);
    let arry=[];
    if(myartlist!=null){
      myartlist.forEach(function(article,i){
        arry.push(<MyArticlesComponent key={i} malistobj={article}/>)
      })
    }
  
    return(
      <div>
      {arry}
      </div>
     );
        
     }
} 


export default class MyArticles extends Component {
   constructor(props) {
      super(props);
      this.state={malist : null};
   
  }

  componentDidMount() {

    let xmlhttp;
    let url='http://182.61.31.37:4545/user/fetchArticle?userId='+localStorage.id;

    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
              json=json.content;
          this.setState({malist:json});
        }
      }
      
     xmlhttp.open("GET",url,true);
     xmlhttp.send();
    
  }

  render() {            

  return (

          <div>
            <header className="bar bar-nav">
              <h1 className='title'>我的文章</h1>
            </header>
          <div className="content">
             <MyArticlesList  myartlist={this.state.malist}/>
          </div>     
          </div>   

    );
  }
}











