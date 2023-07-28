import React from 'react';
import { useRecoilState } from 'recoil';
import { isLoggedInState } from './state_management/recoilState'


const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useRecoilState(isLoggedInState)

    return (
        <div>
            logged in ? - {isLoggedIn ? 'true' : 'false'}
        </div>
    );
};

export default App;
