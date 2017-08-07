import React, { Component } from 'react';
import {Link} from 'react-router';

export default class  Tabbar extends Component {


  render() {

    return (
        <div>
            <nav className="bar bar-tab">

                <Link to="/IndexList" className="tab-item external active" href="#">
                    <span className="icon icon-home"></span>
                    <span className="tab-label">主页</span>
                </Link>
                <Link to="/Publications" className="tab-item external" href="#">
                    <span className="icon icon-edit"></span>
                    <span className="tab-label">发表</span>
                </Link>
                <Link to="/i" className="tab-item external" href="#" >
                    <span className="icon icon-me"></span>
                    <span className="tab-label">我</span>
                </Link>
            </nav>
            {this.props.children}
            </div>
    );
  }
}