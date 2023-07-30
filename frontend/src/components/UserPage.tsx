import React, { useEffect } from 'react';
import userSvg from '../assets/user.svg';
// import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState, accessTokenState, backendHostInURL, isAdminState } from '../state_management/recoilState';
import axios from 'axios';

interface isAdminResponse {
    isAdmin: Boolean
}

const UserPage: React.FC = () => {
    const username = useRecoilValue(userNameState)
    const accessToken = useRecoilValue(accessTokenState)
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState)

    useEffect(() => {
        if (accessToken) {
            const api = axios.create({ baseURL: `${backendHostInURL}` });

            api.get<isAdminResponse>(`/is_user_admin`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    username: username,
                },
            })
                .then((response) => {
                    if (response.data.isAdmin !== undefined) {
                        setIsAdmin(response.data.isAdmin);
                        localStorage.setItem('isAdmin', isAdmin.toString());
                    } else {
                        console.log('Login failed: Access token not found');
                    }
                })
                .catch((error) => {
                    console.error('Login failed:', error);
                })
        }
    },);
    return (
        <div className="card d-flex justify-content-center align-items-center flex-column">
            <div className="text-center">
                <img src={userSvg} alt="User Icon" className="user-profile-img" />
                <div>
                    {isAdmin ? <div>Hello admin</div> : null}
                    Username:
                </div>
            </div>
            <h2 className="mt-4">{username}</h2>
        </div>
    );
};

export default UserPage;
