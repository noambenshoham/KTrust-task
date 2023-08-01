import React, { useEffect } from 'react';

interface TokenExpiredModalProps {
    onClose: () => void;
}

const TokenExpiredModal: React.FC<TokenExpiredModalProps> = ({ onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(); // Automatically close the modal after 10 seconds
        }, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, [onClose]);

    return (
        <div className="modal show">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Token Expired</h5>
                        <button type="button" className="btn-close" onClick={onClose}></button>
                    </div>
                    <div className="modal-body">
                        Your session has expired. Please log in again.
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={onClose}>
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TokenExpiredModal;
