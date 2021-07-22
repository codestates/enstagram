import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUpload } from '@fortawesome/free-solid-svg-icons'
import "./Header.css";
import { placeHolderImage } from '../dummyData';

const Header = ({ profilePhoto = placeHolderImage }) => {
    return (
        <div id="header-body">
            <Link to="/">
                <span id="logo">Enstagram</span>
            </Link>
            <input className="search" type="search" placeholder="Search"/>
            <div id="nav">
                <div id="upload">
                    <Link to="/upload">
                        <FontAwesomeIcon 
                            className="nav-icon"
                            icon={faUpload}
                        />
                    </Link>
                </div>
                <div>
                    <Link to="/">
                        <FontAwesomeIcon 
                                className="nav-icon"
                                icon={faHome}
                            />
                    </Link>
                </div>
                <div>
                    <Link to="/mypage">
                        <img className="user-picture" alt="profile on header" src={profilePhoto} />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Header;
