import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { userNameState, backendHostInURL, accessTokenState } from '../state_management/recoilState';
import { LoginFailed } from './LoginFailed';
interface LoginResponse {
    accessToken: string;
}


const LoginPage: React.FC = () => {
    const [username, setUsername] = useRecoilState(userNameState);
    const [accessToken, setAccessToken] = useRecoilState(accessTokenState)

    const [loginFailed, setLoginFailed] = useState(false)
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [healthCheckResult, setHealthCheckResult] = useState<string>('');
    const navigate = useNavigate();

    useEffect(() => {
        if (accessToken) {
            console.log("logged in!");
        }
        performHealthCheck();
    }, [accessToken, navigate]);

    const handleLogin = (event: React.FormEvent) => {
        event.preventDefault();

        setIsSubmitting(true); // Disable the submit button

        const api = axios.create({ baseURL: `${backendHostInURL}` });

        api.post<LoginResponse>(`/login`, {
            username: username,
            password: password
        })
            .then((response) => {
                console.log(response.data);

                if (response.data.accessToken) {
                    console.log('Login successful:', response.data);
                    setAccessToken(response.data.accessToken);
                    localStorage.setItem('accessToken', response.data.accessToken);
                    localStorage.setItem('username', username);
                } else {
                    console.log('Login failed: Access token not found');
                }
            })
            .catch((error) => {
                console.error('Login failed:', error);
                setLoginFailed(true)
            })
            .finally(() => {
                setIsSubmitting(false); // Enable the submit button after the login process
            });
    };


    const performHealthCheck = () => {

        axios.get<string>(`${backendHostInURL}/health_check`)
            .then((response) => {
                console.log('Health check successful:', response.data);
                setHealthCheckResult(response.data);
            })
            .catch((error) => {
                console.error('Health check failed:', error);
                setHealthCheckResult('Health check failed');
            });
    };

    return (
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-4">
                    <div className="mb-3">
                        <strong>Health Check Result:</strong> {healthCheckResult}
                    </div>
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
