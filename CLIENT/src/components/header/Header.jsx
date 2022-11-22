import React from 'react';

import './header.css';
import headerImage from '../../assets/pexels-jack-krzysik-7753054.jpg';

export default function Header() {
  return (
    <div className="header">
        <div className="headerTitles">
            <span className="headerTitleSm">React & Node</span>
            <span className="headerTitleLg">Blog</span>
        </div>
        <img src={headerImage} className="headerImg" alt="#HeaderImg"></img>
    </div>
  )
}
