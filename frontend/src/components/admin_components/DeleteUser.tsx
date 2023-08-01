import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, allUsersState, backendHostInURL } from '../../state_management/recoilState';
import { getUsers, getUsersResponse } from '../ShowUsers';

interface DeleteUserProps {
    username: string;
}

const DeleteUser: React.FC<DeleteUserProps> = ({ username }) => {
    const accessToken = useRecoilValue(accessTokenState);
    const [isDeleting, setIsDeleting] = useState(false);
    const setUsernames = useSetRecoilState(allUsersState)

    const handleDeleteUser = () => {
        setIsDeleting(true);

        const api = axios.create({ baseURL: backendHostInURL });

        api.delete(`/delete_user/${username}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
            .then((_response) => {
                setIsDeleting(false);
                getUsers(accessToken)
                    .then((response: getUsersResponse) => {
                        console.log(response);
                        setUsernames(response.usernames);
                    })
                    .catch((error) => {
                        console.log(error);

                    });
            })
            .catch((error) => {
                setIsDeleting(false);
                console.error('User deletion failed:', error);
                // TODO: Handle the user deletion error
            });
    };

    return (
        <button
            type="button"
            className="btn btn-danger"
            onClick={handleDeleteUser}
            disabled={isDeleting}
        >
            {isDeleting ? 'Deleting...' : 'Delete User'}
        </button>
    );
};

export default DeleteUser;
