// Final cleaned-up Translator.js using Google Translate API and UI of previous project
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "AIzaSyCkXhNwcj1HU37xvOn_j4WaxCwdU1FI22w"; // 🔑 Replace with your actual API key
const DETECT_URL = "https://translation.googleapis.com/language/translate/v2/detect";
const TRANSLATE_URL = "https://translation.googleapis.com/language/translate/v2";
const LANGUAGES_URL = `https://translation.googleapis.com/language/translate/v2/languages?key=${API_KEY}&target=en`;

const Translator = () => {
  const [text, setText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [sourceLang, setSourceLang] = useState("auto");
  const [targetLang, setTargetLang] = useState("en");
  const [languages, setLanguages] = useState([]);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [loading, setLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [recognitionActive, setRecognitionActive] = useState(false);

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await axios.get(LANGUAGES_URL);
        setLanguages(response.data.data.languages);
      } catch (error) {
        console.error("Error fetching languages:", error);
      }
    };
    fetchLanguages();
  }, []);

  const detectLanguage = async (inputText) => {
    try {
      const response = await axios.post(
        `${DETECT_URL}?key=${API_KEY}`,
        {
          q: inputText
        }
      );
      return response.data.data.detections[0][0].language;
    } catch (error) {
      console.error("Language detection failed:", error);
      return "en";
    }
  };

  const translateText = async () => {
    if (!text.trim()) {
      setTranslatedText("");
      return;
    }

    setLoading(true);
    let detectedLang = sourceLang;
    if (sourceLang === "auto") {
      detectedLang = await detectLanguage(text);
      setSourceLang(detectedLang);
    }

    try {
      const response = await axios.post(
        `${TRANSLATE_URL}?key=${API_KEY}`,
        {
          q: text,
          source: detectedLang,
          target: targetLang,
          format: "text"
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      setTranslatedText("Translation failed. Check your API key or network.");
    }

    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(translatedText);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const swapLanguages = () => {
    const tempLang = sourceLang;
    setSourceLang(targetLang);
    setTargetLang(tempLang);
    const tempText = text;
    setText(translatedText);
    setTranslatedText(tempText);
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const handleTextToSpeech = () => {
    if (!translatedText) return;
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(translatedText);
    utterance.lang = targetLang;
    synth.speak(utterance);
  };

  const handleSpeechToText = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech recognition not supported in this browser.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setRecognitionActive(true);
    recognition.onresult = (event) => setText((prev) => prev + " " + event.results[0][0].transcript);
    recognition.onend = () => setRecognitionActive(false);
    recognition.onerror = () => setRecognitionActive(false);
    recognition.start();
  };

  return (
    <div className={`container mt-5 ${theme}`}>
      <div className={`p-4 rounded shadow ${theme === "dark" ? "bg-dark text-white" : "bg-white text-dark"}`}>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>🌐 Language Translator</h2>
          <span
            style={{ cursor: "pointer", fontSize: "1.5rem" }}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {theme === "light" ? "🌙" : "🌞"}
          </span>
        </div>

        <div className="mb-3">
          <label htmlFor="textInput" className="form-label">Enter Text:</label>
          <textarea
            id="textInput"
            className="form-control"
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type or speak something to translate..."
          ></textarea>
          <button
            className="btn btn-sm btn-outline-secondary mt-2"
            onClick={handleSpeechToText}
            disabled={recognitionActive}
          >
            🎙️ {recognitionActive ? "Listening..." : "Speak"}
          </button>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-md-5 mb-3 mb-md-0">
            <label htmlFor="sourceLang" className="form-label">From:</label>
            <select
              id="sourceLang"
              className="form-select"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
            >
              <option value="auto">Auto Detect</option>
              {languages.map((lang) => (
                <option key={lang.language} value={lang.language}>{lang.name || lang.language}</option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-2 d-flex align-items-center justify-content-center">
            <button className="btn btn-outline-secondary w-100 mt-2 mt-md-4" onClick={swapLanguages}>🔄 Swap</button>
          </div>

          <div className="col-12 col-md-5">
            <label htmlFor="targetLang" className="form-label">To:</label>
            <select
              id="targetLang"
              className="form-select"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.language} value={lang.language}>{lang.name || lang.language}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="d-grid mb-4">
          <button className="btn btn-primary" onClick={translateText} disabled={loading}>
            {loading ? "Translating..." : "🔁 Translate"}
          </button>
        </div>

        {translatedText && (
          <div className="mb-3">
            <label className="form-label">Translated Text:</label>
            <div className={`p-3 border rounded d-flex justify-content-between align-items-center ${theme === "dark" ? "bg-secondary text-white" : "bg-light text-dark"}`}>
              <span className="me-2">{translatedText}</span>
              <div className="btn-group">
                <button
                  className={`btn btn-sm ${theme === "dark" ? "btn-outline-light" : "btn-outline-success"}`}
                  onClick={copyToClipboard}
                >📋</button>
                <button
                  className={`btn btn-sm ${theme === "dark" ? "btn-outline-light" : "btn-outline-primary"}`}
                  onClick={handleTextToSpeech}
                >🔊</button>
              </div>
            </div>
            {copySuccess && <small className="text-success">Copied!</small>}
          </div>
        )}
      </div>
    </div>
  );
};

export default Translator;