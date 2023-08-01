import React from 'react';
import { useRecoilValue } from 'recoil';
import { accessTokenState } from './state_management/recoilState'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';
import Header from './components/Header';

const App: React.FC = () => {
    const accessToken = useRecoilValue(accessTokenState)

    return (
        <>
            <Header />
            <div className="app-container">
                <Routes>
                    {/* If the user is not logged in, show the LoginPage */}
                    {!accessToken && <Route path="/" element={<LoginPage />} />}
                    {accessToken && <Route path="/" element={<UserPage />} />}

                    {/* Add a default route to redirect to the main page (LoginPage or UserPage) */}
                    <Route path="/*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </>
    );
};

export default App;
