import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userNameState, backendHostInURL, accessTokenState, getUsername } from '../state_management/recoilState';
import { LoginFailed } from './LoginFailed';

interface LoginResponse {
    accessToken: string;
}


const LoginPage: React.FC = () => {
    const [username, setUsername] = useRecoilState(userNameState);
    const setAccessToken = useSetRecoilState(accessTokenState)
    const [loginFailed, setLoginFailed] = useState(false)
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        const storedUsername = getUsername();
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);
    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true); // Disable the submit button

        const api = axios.create({ baseURL: backendHostInURL });

        api.post<LoginResponse>(`/login`, {
            username,
            password
        })
            .then((response) => {
                if (!response.data.accessToken) {
                    console.log('Login failed: Access token not found');
                    return;
                }
                setAccessToken(response.data.accessToken);
                localStorage.setItem('accessToken', response.data.accessToken);
                setUsername(username)
                localStorage.setItem('username', username as string);

            })
            .catch((error) => {
                console.error('Login failed:', error);
                setLoginFailed(true)
            })
            .finally(() => {
                setIsSubmitting(false); // Enable the submit button after the login process
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <h2 className="mb-4">Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                        <div>
                            <Link to="/" className="btn btn-secondary">
                                Back to Homepage
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            {loginFailed ? <LoginFailed setLoginFailed={setLoginFailed} /> : null}
        </div>
    );
};

export default LoginPage;
