import React from 'react';
import logoPath from '../assets/logo.png';
import axios from 'axios';
import { userNameState, accessTokenState, backendHostInURL, isAdminState } from '../state_management/recoilState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';


const Header: React.FC = () => {
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
    const username = useRecoilValue(userNameState)

    const handleLogout = () => {
        setAccessToken(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('username');
        localStorage.removeItem('isAdmin');
    };

    return (
        <div className="header d-flex justify-content-between align-items-center">
            <div className="logo">
                <img src={logoPath} alt="Logo" className="logo-image" />
            </div>
            {accessToken && (
                <div className="user-info">
                    <span className="user-text">Logged in as: {username}&nbsp;&nbsp;</span>
                    <span>
                        <button className="btn btn-danger" onClick={handleLogout}>
                            Logout
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
};

export default Header;
