import React from 'react';


import {Link} from 'react-router'

export default class I extends React.Component{

constructor(props){
        super(props);
        this.state={my : null};
    }

    componentDidMount() {

  }

  out=(event)=>{
    localStorage.id='';
    localStorage.username='';

  }
  goMyArticles=(event)=>{
    window.location.hash='/MyArticles';

  }


    render(){
      


      if(localStorage.id==''){
        alert('你还没有登录，请登录')
        window.location.hash='/login';
      }
        return(
            <div>  
            <header className="bar bar-nav">
            <h1 className='title'>我</h1>
            </header>
             <div className="content" style={{top: '1.2rem'}}>
            <div className="list-block">
              <ul>
                <li className="item-content item-link">
                  <div className="item-inner">
                    <form id="avatarForm" ref="avatarForm" style={{display: 'none'}}>
                      <input type="file" id="avatar" ref="avatar" name="avatar" style={{display: 'none'}}/>
                    </form>
                    <div className="item-title">
                      <img src="http://www.qdaily.com/images/missing_face.png" style={{height: '2.5rem'}} onClick={(e)=> {
                        this.openUpload(e)
                      }}/>
                    </div>
                    <div className="item-after">{localStorage.username}</div>
                  </div>
                </li>
              </ul>
            </div>
            <div className="list-block">
            <ul>
              <li className="item-content">
                <div className="item-media"><i className="icon icon-edit"></i></div>
                <div className="item-inner" onClick={this.goMyArticles} style={{cursor:'pointer'}}>
                  <div  style={{height: '100%', width: '100%', display: 'block'}} className="item-title">我的文章</div>
                </div>
              </li>
            </ul>
            </div>
            <div className="content-block">
            <p><Link to="/login"  className="button button-danger button-fill button-big" onClick={this.out}>退出登录</Link></p>
            </div>
            </div>
        </div>
        )
    }

}

