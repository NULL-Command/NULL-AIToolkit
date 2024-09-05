import 'sakura.css'
import './MyHeader.css'
import React, { useState } from 'react';

export default function MyHeader() {
    const [isActive, setIsActive] = useState(false);

    const urls = {
        openFXT: "https://openfxt.vercel.app",
        github: "https://github.com/NULL-Command?tab=repositories",
        tiktok: "https://www.tiktok.com/@nullcommand.lasthope?lang=vi-VN"
    };

    const dropLink = () => {
        setIsActive(prevState => !prevState);
    };

    return (
        <div className='header'>
            <div className="company">
                <img src="https://openfxt.vercel.app/images/brand.png" alt="" className="logo" />
                <div className="company-text">AI Toolkit</div>
            </div>
            <div className={`link-box ${isActive ? 'active' : ''}`}>
                <div className={`link-dropdown ${isActive ? 'active' : ''}`}
                    onClick={dropLink} >
                    References
                    <span className="left-icon"></span>
                    <span className="right-icon"></span>
                    <div className="items">
                        <a style={{ '--i': 1 }} href={urls.openFXT} target="_blank" rel="noopener noreferrer"><span></span>OpenFXT Platform</a>
                        <a style={{ '--i': 2 }} href={urls.github} target="_blank" rel="noopener noreferrer"><span></span>Github</a>
                        <a style={{ '--i': 3 }} href={urls.tiktok} target="_blank" rel="noopener noreferrer"><span></span>Tiktok</a>
                    </div>
                </div>
            </div>
        </div >
    );
}
