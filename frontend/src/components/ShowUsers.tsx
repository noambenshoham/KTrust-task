


import React, { useEffect, useState } from 'react';
import userSvg from '../assets/user.svg';
// import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userNameState, accessTokenState, backendHostInURL, isAdminState } from '../state_management/recoilState';
import axios from 'axios';

interface getUsersResponse {
    usernames: string[] | []
}

const ShowUsers: React.FC = () => {
    const username = useRecoilValue(userNameState)
    const accessToken = useRecoilValue(accessTokenState)
    const [isAdmin, setIsAdmin] = useRecoilState(isAdminState)
    const [usernames, setUsernames] = useState<string[] | []>([])


    useEffect(() => {
        if (accessToken) {
            const api = axios.create({ baseURL: `${backendHostInURL}` });

            api.get<getUsersResponse>(`/get_users`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                params: {
                    username: username,
                },
            })
                .then((response) => {
                    console.log(response.data);

                    // use error guards
                    if (response.data.usernames) {
                        setUsernames(response.data.usernames);
                    } else {
                        console.log('data.usernames is empty');
                    }
                })
                .catch((error) => {
                    console.error('Get users failed:', error);
                })
        }
    }, []);
    return (
        <div className='users-container'>
            {usernames.map((username, index) => <div className="card d-flex justify-content-center align-items-center flex-column user-card">
                <div className="text-center" key={index}>
                    <img src={userSvg} alt="User Icon" className="user-profile-img" />
                    <div>
                        {username}
                    </div>
                    {/* {isAdmin ? <EditUser /> : null} */}
                </div>
            </div>)}

        </div>
    );
};

export default ShowUsers;
