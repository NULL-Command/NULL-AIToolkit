import 'sakura.css';
import './NavigationBar.css';
import React from 'react';

export default function NavigationBar({ activeIndex, setActiveIndex }) {
    const options = ["GPT Configuration", "Text To Speech", "ChatFXT Redirect"];

    const handleOnClick = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="navigation">
            {options.map((option, index) => (
                <div
                    key={index}
                    className={`option ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => handleOnClick(index)}
                >
                    {option}
                </div>
            ))}
            <div className="highlight-box" style={{ left: `${activeIndex * 33.33}%` }}></div>
        </div>
    );
}