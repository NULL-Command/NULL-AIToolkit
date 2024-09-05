chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getSelectedText") {
        const selectedText = window.getSelection().toString();
        sendResponse({ selectedText });
    } else if (request.action === "playAudio") {
        const existingPlayers = document.querySelectorAll('.custom-audio-player');
        existingPlayers.forEach(player => player.remove());
        const audioDataUrl = request.audioDataUrl;
        const audioPlayer = document.createElement('audio');
        audioPlayer.src = audioDataUrl;
        audioPlayer.controls = true;
        audioPlayer.classList.add('custom-audio-player');
        audioPlayer.style = "position: fixed; bottom: 0; left: 0; width: 100vw; z-index: 9999;";
        document.body.appendChild(audioPlayer);
        audioPlayer.play();
    } else if (request.action === "fetchText") {
        const allText = document.body.innerText;
        sendResponse({ text: allText });
    }
});
