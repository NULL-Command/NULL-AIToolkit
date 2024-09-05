import 'sakura.css'
import './Body.css'
import React, { useState } from 'react';
import NavigationBar from './NavigationBar/NavigationBar';
import GPTConfigure from './GPTConfigure/GPTConfigure';
import TTSConfigure from './TTSConfigure/TTSConfigure';
import ChatFXTRedirect from './ChatFXTRedirect/ChatFXTRedirect';

export default function Body() {
    const [activeIndex, setActiveIndex] = useState(0);

    return (<>
        <NavigationBar activeIndex={activeIndex} setActiveIndex={setActiveIndex}></NavigationBar>
        {activeIndex === 0 && <GPTConfigure />}
        {activeIndex === 1 && <TTSConfigure />}
        {activeIndex === 2 && <ChatFXTRedirect />}
    </>);
}
