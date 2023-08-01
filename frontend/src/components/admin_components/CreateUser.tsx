import React, { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { accessTokenState, allUsersState, backendHostInURL } from '../../state_management/recoilState';
import axios from 'axios';
import { getUsers, getUsersResponse } from '../ShowUsers';

const CreateUser: React.FC = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [isAdminUser, setIsAdminUser] = useState<undefined | boolean>(undefined);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isUserCreated, setIsUserCreated] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const accessToken = useRecoilValue(accessTokenState);
    const setUsernames = useSetRecoilState(allUsersState)

    const handleAddUser = () => {

        setIsCreatingUser(true);
        const api = axios.create({ baseURL: backendHostInURL });

        api.post(
            '/create_user',
            {
                newUsername,
                newPassword,
                isAdmin: isAdminUser,
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        )
            .then((_response) => {
                setIsFormOpen(false)
                setIsCreatingUser(false);
                setIsUserCreated(true);

                // Reset form after successful creation
                setNewUsername('');
                setNewPassword('');
                setIsAdminUser(undefined);

                // Hide the "User created successfully!" message after 10 seconds
                setTimeout(() => {
                    setIsUserCreated(false);
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
                setIsCreatingUser(false);
                console.error('User creation failed:', error);
                // TODO: Handle the user creation error
            });
    };

    return (
        <div className="create-user-container">
            {isUserCreated ? (
                <div className="alert alert-success" role="alert">
                    User created successfully!
                </div>
            ) : null}
            <div className="user-form">
                <button
                    type="button"
                    className="btn btn-primary mb-4"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                    aria-expanded={isFormOpen}
                    aria-controls="userForm"
                >
                    {isFormOpen ? 'Hide Form' : 'Add User'}
                </button>

                <div className={`collapse${isFormOpen ? ' show' : ''}`} id="userForm">
                    <h2 className="mb-4">Add User</h2>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={newUsername}
                            onChange={(e) => setNewUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
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
                                id="isAdminUser"
                                checked={isAdminUser}
                                onChange={(e) => setIsAdminUser(e.target.checked)}
                            />
                            <label className="form-check-label" htmlFor="isAdminUser">
                                Is Admin User
                            </label>
                        </div>
                    </div>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleAddUser}
                        disabled={isCreatingUser || (!newPassword.trim() || !newUsername.trim())}
                    >
                        {isCreatingUser ? 'Creating...' : 'Add User'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateUser;
