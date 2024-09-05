import React, { useState } from 'react';
import 'sakura.css';
import './ChatFXTRedirect.css';

export default function ChatFXTRedirect() {
    const [isClicked, setIsClicked] = useState(false);

    const handleButtonClick = () => {
        setIsClicked(!isClicked);
    };

    return (
        <div className="chatfxt-redirect">
            <a className={`chatfxt-redirect-btn ${isClicked ? 'is-clicked' : ''}`}
                href="https://chatfxt.vercel.app"
                target="blank"
                onClick={handleButtonClick}
            >
                Redirect
            </a>
        </div>
    );
}
