import React, { useState, useEffect } from 'react';
import 'sakura.css';
import './GPTConfigure.css';

export default function GPTConfigure() {
    const [selectedModel, setSelectedModel] = useState('');
    const [selectedTone, setSelectedTone] = useState('');

    useEffect(() => {
        chrome.storage.local.get(['selectedModel', 'selectedTone'], (result) => {
            const savedModel = result.selectedModel;
            const savedTone = result.selectedTone;
            if (savedModel) {
                setSelectedModel(savedModel);
            }
            else {
                setSelectedModel('GPT 3.5');
            };
            if (savedTone) {
                setSelectedTone(savedTone);
            }
            else {
                setSelectedTone("Instructional");
            };
        });
    }, []);

    const handleModelChange = (model) => {
        setSelectedModel(model);
        chrome.storage.local.set({ selectedModel: model });
    };

    const handleToneChange = (tone) => {
        setSelectedTone(tone);
        chrome.storage.local.set({ selectedTone: tone });
    };

    return (
        <div className="gpt-configure">
            <div className="gpt-config-title">SELECT MODEL:</div>
            <div className="model-radio-option">
                <label className="model-custom-radio-style">
                    <input
                        type="radio"
                        name="model"
                        value="GPT 3.5"
                        checked={selectedModel === 'GPT 3.5'}
                        onChange={() => handleModelChange('GPT 3.5')}
                    />
                    <span className="model-btn">
                        <i className="las la-check"></i>
                        <div className="model-icon">
                            <i className="las la-radiation-alt"></i>
                            <h3>GPT 3.5</h3>
                        </div>
                    </span>
                </label>
                <label className="model-custom-radio-style">
                    <input
                        type="radio"
                        name="model"
                        value="GPT 4"
                        checked={selectedModel === 'GPT 4'}
                        onChange={() => handleModelChange('GPT 4')}
                    />
                    <span className="model-btn">
                        <i className="las la-check"></i>
                        <div className="model-icon">
                            <i class="las la-skull-crossbones"></i>
                            <h3>GPT 4</h3>
                        </div>
                    </span>
                </label>
            </div>
            <div className="gpt-config-title">SELECT TONE:</div>
            <div className="model-radio-option">
                <label className="model-custom-radio-style">
                    <input
                        type="radio"
                        name="tone"
                        value="Instructional"
                        checked={selectedTone === 'Instructional'}
                        onChange={() => handleToneChange('Instructional')}
                    />
                    <span className="model-btn">
                        <i className="las la-check"></i>
                        <div className="model-icon">
                            <i className="las la-shapes"></i>
                            <h3 style={{ fontSize: '7px' }}>Instructional</h3>
                        </div>
                    </span>
                </label>
                <label className="model-custom-radio-style">
                    <input
                        type="radio"
                        name="tone"
                        value="Creative"
                        checked={selectedTone === 'Creative'}
                        onChange={() => handleToneChange('Creative')}
                    />
                    <span className="model-btn">
                        <i className="las la-check"></i>
                        <div className="model-icon">
                            <i class="lab la-ethereum"></i>
                            <h3 style={{ fontSize: '7px' }}>Creative</h3>
                        </div>
                    </span>
                </label>
                <label className="model-custom-radio-style">
                    <input
                        type="radio"
                        name="tone"
                        value="Technical"
                        checked={selectedTone === 'Technical'}
                        onChange={() => handleToneChange('Technical')}
                    />
                    <span className="model-btn">
                        <i className="las la-check"></i>
                        <div className="model-icon">
                            <i class="las la-drafting-compass"></i>
                            <h3 style={{ fontSize: '7px' }}>Technical</h3>
                        </div>
                    </span>
                </label>
            </div>
        </div>
    );
}
