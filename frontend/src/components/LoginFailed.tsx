import React from 'react';

interface LoginFailedProps {
    setLoginFailed: (loginFailed: boolean) => void;
}

export const LoginFailed: React.FC<LoginFailedProps> = ({ setLoginFailed }) => {
    return (
        <div className="modal" tabIndex={-1} role="dialog" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Failed</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={() => setLoginFailed(false)}></button>
                    </div>
                    <div className="modal-body">
                        <div className="alert alert-danger" role="alert">
                            Your login attempt was unsuccessful. Please check your username and password and try again.
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setLoginFailed(false)}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
