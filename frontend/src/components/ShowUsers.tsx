import React, { useEffect } from 'react';
import userSvg from '../assets/user.svg';
import { useRecoilState, useRecoilValue } from 'recoil';
import { accessTokenState, backendHostInURL, isAdminState, allUsersState } from '../state_management/recoilState';
import axios from 'axios';
import DeleteUser from './admin_components/DeleteUser';

export interface getUsersResponse {
    usernames: string[] | []
}

export async function getUsers(accessToken: string | null, username: string): Promise<getUsersResponse> {
    try {
        const response = await axios.get<getUsersResponse>(`${backendHostInURL}/get_users`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            params: {
                username: username,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Get usernames failed:', error);
        throw error;
    }
}

const ShowUsers: React.FC = () => {
    const accessToken = useRecoilValue(accessTokenState)
    const isAdmin = useRecoilValue(isAdminState)
    const [usernames, setUsernames] = useRecoilState(allUsersState)

    useEffect(() => {

        if (accessToken) {
            getUsers(accessToken, '')
                .then((response: getUsersResponse) => {
                    console.log(response);
                    setUsernames(response.usernames);
                })
                .catch((error) => {
                    console.log(error);

                });
        }
    }, []);
    return (
        <div className='users-container'>
            {usernames.map((username, index) =>
                <div key={index} className="showed-user card d-flex justify-content-center align-items-center flex-column user-card">
                    <div className="text-center" >
                        <img src={userSvg} alt="User Icon" className="user-profile-img" />
                        <div>
                            {username}
                        </div>
                        {isAdmin ? <DeleteUser username={username} /> : null}
                    </div>
                </div>)
            }
        </div >
    );
};

export default ShowUsers;
