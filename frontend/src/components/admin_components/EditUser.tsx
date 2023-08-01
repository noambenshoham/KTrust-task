import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, allUsersState, backendHostInURL } from '../../state_management/recoilState';
import axios from 'axios';
import { getUsers, getUsersResponse } from '../ShowUsers';

interface EditUserProps {
    username: string;
}

const EditUser: React.FC<EditUserProps> = ({ username }) => {
    const [newUsername, setNewUsername] = useState(username);
    const [newPassword, setNewPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdatingUser, setIsUpdatingUser] = useState(false);
    const [isUserUpdated, setIsUserUpdated] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const accessToken = useRecoilValue(accessTokenState);
    const setUsernames = useSetRecoilState(allUsersState);

    const handleUpdateUser = () => {
        setIsUpdatingUser(true);
        const api = axios.create({ baseURL: backendHostInURL });

        api.put(
            '/update_user',
            {
                oldUsername: username,
                newUsername,
                newPassword,
                isAdmin,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            .then((_response) => {
                setIsFormOpen(false);
                setIsUpdatingUser(false);
                setIsUserUpdated(true);

                // Reset form after successful update
                setNewUsername(username);
                setNewPassword('');
                setIsAdmin(false);

                // Hide the "User updated successfully!"
                setTimeout(() => {
                    setIsUserUpdated(false);
                }, 5000);

                // Refresh show users
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
                setIsUpdatingUser(false);
                console.error('User update failed:', error);
                // TODO: Handle the user update error
            });
    };

    return (
        <div className="edit-user-container">
            {isUserUpdated ? (
                <div className="alert alert-success" role="alert">
                    User updated successfully!
                </div>
            ) : null}
            <div className="user-form">
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    aria-expanded={isFormOpen}
                    aria-controls="userForm"
                >
                    {isFormOpen ? 'Hide Form' : 'Edit User'}
                </button>

                <div className={`collapse${isFormOpen ? ' show' : ''}`} id="userForm">
                    <div className="mb-3">
                        <label htmlFor="newUsername" className="form-label">
                            New Username:
                        </label>
                        <input
                            type="text"
                            id="newUsername"
                            className="form-control"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">
                            New Password:
                        </label>
                        <input
                            type="password"
                            id="newPassword"
                            className="form-control"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <div className="form-check">
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id="isAdmin"
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="isAdmin">
                                Is Admin User
                            </label>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleUpdateUser}
                        disabled={isUpdatingUser || (!newPassword.trim() || !newUsername.trim())}
                    >
                        {isUpdatingUser ? 'Updating...' : 'Save Changes'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditUser;
