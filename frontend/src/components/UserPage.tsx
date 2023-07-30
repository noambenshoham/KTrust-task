import React from 'react';
import userSvg from '../assets/user.svg';
import { Link } from "react-router-dom";
import { useRecoilState } from 'recoil';
import { userNameState } from '../state_management/recoilState';


const UserPage: React.FC = () => {
    const [username, setUsername] = useRecoilState(userNameState);

    return (
        <div className="card d-flex justify-content-center align-items-center flex-column">
            <div className="text-center">
                <img src={userSvg} alt="User Icon" className="user-profile-img" />
                <div>
                    Username:
                </div>
            </div>
            <h2 className="mt-4">{username}</h2>
        </div>
    );
};

export default UserPage;
