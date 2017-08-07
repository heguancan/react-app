import React, { Component } from 'react';
import {Link} from 'react-router';
import {dateDiff} from './tool.js'


export class  ItemComponent extends React.Component {
  constructor(props) {
      super(props);
       this.getstar = this.getstar.bind(this);
       this.state={tostar: 0,star: null};
   
   }
   
 


    
 

  com_=(event)=>{

    event.preventDefault();
    localStorage.combookid=this.props.artileobj._id;
    localStorage.comment=this.props.artileobj.commentNum;
    window.location.hash="/comment";
  }

componentDidMount() {

   
}
  getstar=(event)=>{
        if(localStorage.id==''){
        alert('你还没有登录，请登录')
         return
      }
    event.preventDefault();
    let xmlhttp;
    let data={ 
      'userId': localStorage.id,
      'articleId': this.props.artileobj._id }

    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
          console.log(json);
          if(json.content=='点赞成功'){
             this.setState({star:this.props.artileobj.star.length+1});
             this.setState({tostar:1});
             
             
          }else{
             this.setState({star:this.props.artileobj.star.length+0});
             this.setState({tostar:1});
             
          }
 
 
        }
      }
      
     xmlhttp.open("POST","http://182.61.31.37:4545/article/giveStar",true);
     xmlhttp.send(JSON.stringify(data));

  }





   



   render() {



   let blue={
       color:'#0894ec',
       fontSize:'20',
       fontWeight:'bold',
       marginLeft:'20'
   }

   let mar = {
       marginLeft:'5'
   }
   let top = {
      top: '25'
   }
   let mar20 = {
       marginLeft:'20'
   }

   let qh ={
     justifyContent:'flex-start'
   }



    return(
        <div className="card facebook-card" style={top}>
          <div className="card-header no-border">
            <div className="facebook-avatar"><img src={this.props.artileobj.user.avatar} width="34" height="34"/></div>
            <div className="facebook-name">{this.props.artileobj.user.username}</div>
            <div className="facebook-date "><span className="icon icon-clock"></span><span style={mar}>{dateDiff(this.props.artileobj.createAt)}</span></div>
          </div>
          <p className="color-blue" style={blue}>{this.props.artileobj.title}</p>
          <p style={mar20}>{this.props.artileobj.content}</p>
          <div className="card-footer no-border " style={qh}> 
            <a href="#" className="link icon icon-star" onClick={this.getstar}><p style={mar}>{this.state.tostar?this.state.star:this.props.artileobj.star.length}</p></a>
            <Link to="/comment" href="#" className="link icon icon-message" style={mar}  onClick={this.com_} ><p style={mar}>{this.props.artileobj.commentNum}</p></Link>
          </div>
        </div>
     );
        
     }
}




export class  ListComponent extends React.Component {
    constructor(props) {
      super(props);
   
   }

   render() {
    let articlelist=this.props.articlelist;
    let arry=[];
    if(articlelist!=null){
      console.log(articlelist);
      articlelist.forEach(function(article,i){

        arry.push(<ItemComponent key={i} artileobj={article}/>)
      })
    }
  
    return(
      <div>
      {arry}
      </div>
     );
        
     }
} 


export default class IndexList extends Component {
   constructor(props) {
      super(props);
      this.state={aticlelist : null,
                  changestar : null
                };
   
  }

  componentDidMount() {

    let xmlhttp;

    if (window.XMLHttpRequest)
      {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
      }

      xmlhttp.onreadystatechange=()=>{
      if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
          let json=JSON.parse(xmlhttp.responseText);
          console.log(json);
          this.setState({aticlelist:json});
          console.log(this.state.aticlelist);
        }
      }
      
     xmlhttp.open("GET","http://182.61.31.37:4545/article/fetchList",true);
     xmlhttp.send();
    
  }

  render() { 



  return (
  <div className="content">
     <ListComponent  articlelist={this.state.aticlelist}/>
  </div>           
  	);
  }
}

