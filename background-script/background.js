import { ttsOpenAIGetBlob } from '../ext-lib/TTS.js';
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: "option1",
        title: "Explain with AI",
        contexts: ["all"]
    });

    chrome.contextMenus.create({
        id: "option2",
        title: "Summary with AI",
        contexts: ["all"]
    });
});

chrome.contextMenus.onClicked.addListener(function (info, tab) {
    if (info.menuItemId === "option1") {
        chrome.storage.local.get(['selectedModel', 'selectedTone'], (result) => {
            const selectedModel = result.selectedModel;
            const selectedTone = result.selectedTone;

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (selectedModel, selectedTone) => {
                    let selectionText = window.getSelection().toString();
                    if (selectionText === '') {
                        selectionText = document.body.innerText;
                    }
                    let promptToGPT = "Hãy giải thích một cách chi tiết nhất nội dung sau đây: " + selectionText + "\nVà hãy giải thích theo phong cách " + selectedTone;
                    let modelMap = {
                        "GPT 3.5": "gpt-3.5",
                        "GPT 4": "gpt-4o"
                    };
                    let url = `https://chatgpt.com/?model=${modelMap[selectedModel]}&q=${encodeURIComponent(promptToGPT)}&temporary-chat=true`;
                    return url;
                },
                args: [selectedModel, selectedTone]
            }, (results) => {
                let url = results[0].result;
                chrome.tabs.create({ url: url });
            });
        });
    }
    if (info.menuItemId === "option2") {
        chrome.storage.local.get(['selectedModel', 'selectedTone'], (result) => {
            const selectedModel = result.selectedModel;
            const selectedTone = result.selectedTone;

            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: (selectedModel, selectedTone) => {
                    let selectionText = window.getSelection().toString();
                    if (selectionText === '') {
                        selectionText = document.body.innerText;
                    }
                    let promptToGPT = "Hãy tóm tắt một cách đầy đủ nhất nội dung sau đây: " + selectionText + "\nVà hãy tóm tắt theo phong cách " + selectedTone;
                    let modelMap = {
                        "GPT 3.5": "gpt-3.5",
                        "GPT 4": "gpt-4o"
                    };
                    let url = `https://chatgpt.com/?model=${modelMap[selectedModel]}&q=${promptToGPT}&temporary-chat=true`;
                    return url;
                },
                args: [selectedModel, selectedTone]
            }, (results) => {
                let url = results[0].result;
                chrome.tabs.create({ url: url });
            });
        });
    }
});