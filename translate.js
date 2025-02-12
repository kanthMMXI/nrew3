async function translateText() {
    let text = document.getElementById('textInput').value;
    let targetLang = document.getElementById('languageSelect').value;

    if (!text.trim()) {
        alert("Please enter text to translate!");
        return;
    }

    let url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=it&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;

    try {
        let response = await fetch(url);
        let result = await response.json();
        let translatedText = result[0].map(item => item[0]).join(' ');

        document.getElementById('outputText').innerText = translatedText;
    } catch (error) {
        console.error("Translation failed:", error);
        alert("Translation error. Please try again.");
    }
}

function speakTranslation() {
    let translatedText = document.getElementById('outputText').innerText.trim();

    if (!translatedText) {
        alert("No translated text to speak!");
        console.error("No translated text found in #outputText");
        return;
    }

    let utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = "it-IT"; // Change this to match the translated language if needed
    utterance.rate = 1; // Adjust speed if necessary

    console.log("Speaking:", translatedText);

    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
}
