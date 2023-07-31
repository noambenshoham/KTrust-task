import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from '../state_management/recoilState';
import axios from 'axios';

const CreateUser: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdminUser, setIsAdminUser] = useState(false);
    const [isCreatingUser, setIsCreatingUser] = useState(false);
    const [isUserCreated, setIsUserCreated] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const accessToken = useRecoilValue(accessTokenState);

    const handleAddUser = () => {

        setIsCreatingUser(true);
        axios
            .post(
                '/create_user',
                {
                    username,
                    password,
                    isAdmin: isAdminUser,
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            )
            .then((response) => {
                setIsCreatingUser(false);
                setIsUserCreated(true);
                // TODO: Handle the user creation success
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
            ) : (
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
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
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
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                            disabled={isCreatingUser || (!password.trim() || !username.trim())}
                        >
                            {isCreatingUser ? 'Creating...' : 'Add User'}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateUser;
