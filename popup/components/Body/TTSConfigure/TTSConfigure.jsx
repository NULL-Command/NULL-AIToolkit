import React, { useState, useEffect } from 'react';
import 'sakura.css';
import './TTSConfigure.css';
import { ttsOpenAIGetBlob } from '../../../../ext-lib/TTS.js'

export default function TTSConfigure() {
    const voices = ["Alloy", "Echo", "Fable", "Onyx", "Nova", "Shimmer"];
    const [selectedVoice, setSelectedVoice] = useState(localStorage.getItem('selectedVoice') || voices[0]);
    const [animation, setAnimation] = useState('fadeInLeft');

    const durations = [100, 200, 300, 400];
    const [selectedDuration, setSelectedDuration] = useState(localStorage.getItem('selectedDuration') || durations[0]);
    const [durationAnimation, setDurationAnimation] = useState('fadeInLeft');

    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const [selectedSpeed, setSelectedSpeed] = useState(localStorage.getItem('selectedSpeed') || speeds[0]);
    const [speedAnimation, setSpeedAnimation] = useState('fadeInLeft');

    const [isTextSelected, setIsTextSelected] = useState(false);
    const [selectedText, setSelectedText] = useState('');

    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            chrome.tabs.sendMessage(tabs[0].id, { action: "getSelectedText" }, (response) => {
                if (response && response.selectedText) {
                    setIsTextSelected(response.selectedText.trim() !== '');
                    setSelectedText(response.selectedText);
                } else {
                    setIsTextSelected(false);
                    setSelectedText('');
                }
            });
        });
    }, []);

    useEffect(() => {
        const voice = localStorage.getItem('selectedVoice');
        const duration = localStorage.getItem('selectedDuration');
        const speed = localStorage.getItem('selectedSpeed');

        if (voice) setSelectedVoice(voice);
        if (duration) setSelectedDuration(parseInt(duration, 10));
        if (speed) setSelectedSpeed(parseFloat(speed));
    }, []);

    useEffect(() => {
        localStorage.setItem('selectedVoice', selectedVoice);
        localStorage.setItem('selectedDuration', selectedDuration.toString());
        localStorage.setItem('selectedSpeed', selectedSpeed.toString());
    }, [selectedVoice, selectedDuration, selectedSpeed]);

    const handleConvertText = async () => {
        setIsConverting(true);
        if (selectedText) {
            const data = {
                text: selectedText,
                voiceId: voices.indexOf(selectedVoice) + 1,
                voiceSpeed: selectedSpeed,
                voiceModel: 'tts-1',
                duration: selectedDuration,
            };
            try {
                const blob = await ttsOpenAIGetBlob(data);
                const reader = new FileReader();
                reader.onloadend = () => {
                    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, { action: "playAudio", audioDataUrl: reader.result });
                    });
                };
                reader.readAsDataURL(blob);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        setIsConverting(false);
    };

    const handlePreviousVoice = () => {
        setAnimation('fadeOutRight');
        const index = voices.indexOf(selectedVoice);
        const newIndex = index === 0 ? voices.length - 1 : index - 1;
        setTimeout(() => {
            setSelectedVoice(voices[newIndex]);
            setAnimation('fadeInLeft');
        }, 300);
    };

    const handleNextVoice = () => {
        setAnimation('fadeOutLeft');
        const index = voices.indexOf(selectedVoice);
        const newIndex = index === voices.length - 1 ? 0 : index + 1;
        setTimeout(() => {
            setSelectedVoice(voices[newIndex]);
            setAnimation('fadeInRight');
        }, 300);
    };

    const handlePreviousDuration = () => {
        setDurationAnimation('fadeOutRight');
        const index = durations.indexOf(selectedDuration);
        const newIndex = index === 0 ? durations.length - 1 : index - 1;
        setTimeout(() => {
            setSelectedDuration(durations[newIndex]);
            setDurationAnimation('fadeInLeft');
        }, 300);
    };

    const handleNextDuration = () => {
        setDurationAnimation('fadeOutLeft');
        const index = durations.indexOf(selectedDuration);
        const newIndex = index === durations.length - 1 ? 0 : index + 1;
        setTimeout(() => {
            setSelectedDuration(durations[newIndex]);
            setDurationAnimation('fadeInRight');
        }, 300);
    };

    const handlePreviousSpeed = () => {
        setSpeedAnimation('fadeOutRight');
        const index = speeds.indexOf(selectedSpeed);
        const newIndex = index === 0 ? speeds.length - 1 : index - 1;
        setTimeout(() => {
            setSelectedSpeed(speeds[newIndex]);
            setSpeedAnimation('fadeInLeft');
        }, 300);
    };

    const handleNextSpeed = () => {
        setSpeedAnimation('fadeOutLeft');
        const index = speeds.indexOf(selectedSpeed);
        const newIndex = index === speeds.length - 1 ? 0 : index + 1;
        setTimeout(() => {
            setSelectedSpeed(speeds[newIndex]);
            setSpeedAnimation('fadeInRight');
        }, 300);
    };

    const handleConvertTextFull = async () => {
        setIsConverting(true);
        chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
            try {
                const response = await chrome.tabs.sendMessage(tabs[0].id, { action: "fetchText" });
                if (response && response.text) {
                    const data = {
                        text: response.text,
                        voiceId: voices.indexOf(selectedVoice) + 1,
                        voiceSpeed: selectedSpeed,
                        voiceModel: 'tts-1',
                        duration: selectedDuration,
                    };
                    try {
                        const blob = await ttsOpenAIGetBlob(data);
                        const reader = new FileReader();
                        reader.onloadend = () => {
                            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                                chrome.tabs.sendMessage(tabs[0].id, { action: "playAudio", audioDataUrl: reader.result });
                            });
                        };
                        reader.readAsDataURL(blob);
                    } catch (error) {
                        console.error('Error:', error);
                    }
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsConverting(false);
            }
        });
    };


    const [isConverting, setIsConverting] = useState(false);
    const [isInMaintenance, setIsInMaintenance] = useState(true);

    return (
        <div className="tts-configure">
            <div className="tts-choose-voice-title">SELECT VOICE:</div>
            <div className="tts-choose-voice">
                <button className="arrow left-arrow" onClick={handlePreviousVoice}>⮜</button>
                <div className={`voice-option ${animation}`}>{selectedVoice}</div>
                <button className="arrow right-arrow" onClick={handleNextVoice}>⮞</button>
            </div>
            <div className="tts-choose-duration-title">SELECT DURATION:</div>
            <div className="tts-choose-duration">
                <button className="arrow left-arrow" onClick={handlePreviousDuration}>⮜</button>
                <div className={`duration-option ${durationAnimation}`}>{selectedDuration}</div>
                <button className="arrow right-arrow" onClick={handleNextDuration}>⮞</button>
            </div>
            <div className="tts-choose-speed-title">SELECT SPEED:</div>
            <div className="tts-choose-speed">
                <button className="arrow left-arrow" onClick={handlePreviousSpeed}>⮜</button>
                <div className={`speed-option ${speedAnimation}`}>{selectedSpeed}</div>
                <button className="arrow right-arrow" onClick={handleNextSpeed}>⮞</button>
            </div>
            <div className="button-tts">
                <button
                    className={`convert-btn only-selected-text ${isTextSelected ? '' : 'disabled'} ${isConverting ? 'disabled' : ''} ${isInMaintenance ? 'disabled' : ''}`}
                    onClick={handleConvertText}
                    disabled={(isConverting || !isTextSelected) && isInMaintenance}
                >
                    {isInMaintenance ? 'Maintenance...' : 'Convert Only Selected Text'}
                </button>
                <button
                    className={`convert-btn full-page-content ${isConverting ? 'disabled' : ''} ${isInMaintenance ? 'disabled' : ''}`}
                    onClick={handleConvertTextFull}
                    disabled={isConverting && isInMaintenance}
                >
                    {isInMaintenance ? 'Maintenance...' : 'Convert Full Page Content'}
                </button>
            </div>
        </div>
    );
}
