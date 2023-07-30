import React from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './state_management/recoilState'
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import UserPage from './components/UserPage';


const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)

    return (
        <div className="container">
            <Routes>
                {/* If the user is not logged in, show the LoginPage */}
                {!isLoggedIn && <Route path="/" element={<LoginPage />} />}
                {isLoggedIn && <Route path="/" element={<UserPage />} />}

                {/* Add a default route to redirect to the main page (LoginPage or UserPage) */}
                <Route path="/*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default App;
