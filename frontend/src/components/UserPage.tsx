import React, { useEffect, useState } from 'react';
import userSvg from '../assets/user.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState, accessTokenState, backendHostInURL, isAdminState } from '../state_management/recoilState';
import axios from 'axios';
import ShowUsers from './ShowUsers';
import CreateUser from './admin_components/CreateUser';
import TokenExpired from './TokenExpired';

interface isAdminResponse {
    isAdmin: Boolean
}

const UserPage: React.FC = () => {
    const username = useRecoilValue(userNameState)
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState)
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState)
    const [showTokenExpired, setShowTokenExpired] = useState(true);

    const handleTokenExpired = () => {
        setShowTokenExpired(true);
        // Automatically log out after 10 seconds
        setTimeout(() => {
            setAccessToken(null);
        }, 10000);
    };

    useEffect(() => {
        if (accessToken) {
            const api = axios.create({ baseURL: backendHostInURL });

            api.get<isAdminResponse>(`/is_user_admin`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            })
                .then((response) => {
                    if (response.data.isAdmin !== undefined) {
                        setIsAdmin(response.data.isAdmin);
                        localStorage.setItem('isAdmin', isAdmin.toString());
                    } else {
                        console.log('isAdmin response:', response.data);
                    }
                })
                .catch((error) => {
                    if (error.response.data.error === 'Token expired') {
                        handleTokenExpired()
                    }
                })
        }
    },);
    return (
        <>
            {showTokenExpired && <TokenExpired onClose={() => setShowTokenExpired(false)} />}

            <div className="profile card d-flex justify-content-center align-items-center flex-column user-card">
                <div className="text-center">
                    <img src={userSvg} alt="User Icon" className="user-profile-img" />
                    <div>
                        Hello {username}
                    </div>
                </div>
                {isAdmin ? <CreateUser /> : null}

            </div>
            <ShowUsers />
        </>
    );
};

export default UserPage;
