window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "it-IT"; // Italian speech recognition
recognition.interimResults = false;
recognition.maxAlternatives = 1;

document.getElementById("start-recording").addEventListener("click", () => {
    console.log("Start recording clicked...");
    recognition.start();
});

recognition.onstart = function () {
    console.log("Speech recognition started...");
};

recognition.onspeechend = function () {
    console.log("Speech ended...");
    recognition.stop();
};

recognition.onresult = function (event) {
    console.log("Speech result event:", event);
    let transcript = event.results[0][0].transcript;
    console.log("Recognized speech:", transcript);

    document.getElementById("textInput").value = transcript;
    translateText();
};

recognition.onerror = function (event) {
    console.error("Speech recognition error:", event.error);
};
