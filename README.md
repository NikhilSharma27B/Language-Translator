# 🌐 Language Translator – Industrial Practice Project<br>

This project is a **Language Translator Web Application** built using **React.js** and integrated with the **Google Translate API**. It was developed as part of the **Industrial Practice Project (Semester IV)**.<br><br>

The translator supports **100+ languages**, provides **real-time translation**, and features **speech-to-text**, **text-to-speech**, **dark/light theme switching**, and more.<br><br>

📁 For full source code and setup, refer to the [`language-translator`](https://github.com/NikhilSharma27B/Language-Translator/tree/main) directory.<br><br>

---

## 📌 Note for Reviewers / Faculty<br>

If the translation functionality does not work due to API issues, **please generate your own API key** from the [Google Cloud Console](https://console.cloud.google.com/) and replace the placeholder in the code at:<br>

```javascript
const API_KEY = "YOUR-API-KEY-HERE"; // 🔑 Replace with your actual API key
```

This is necessary because free-tier API keys have usage limits or may expire.<br><br>

---

## 📁 Table of Contents<br>

1. [Technologies Used](#technology-used)<br>
2. [Preview](#preview)<br>
3. [Installation](#installation)<br>
4. [Usage](#usage)<br>
5. [Features](#features)<br>
6. [Contributing](#contributing)<br>
7. [Acknowledgements](#acknowledgements)<br>
8. [Contact Information](#contact-information)<br>

---

## 🔧 Technologies Used<br>

- React JS<br>
- Google Translate API<br>
- Web Speech API<br>
- Bootstrap 5 (for UI)<br>
- Axios<br>

---

## 📷 Preview<br>

>![Screenshot 2025-04-18 204938](https://github.com/user-attachments/assets/da2265a2-3cad-4fd1-8e8c-4e39ca55648d)
<br>

---

## ⚙️ Installation<br>

To run this project locally:<br><br>

1. **Clone the repository**:<br>
   ```bash
   git clone https://github.com/your-username/language-translator.git
   cd language-translator
   ```

2. **Install dependencies**:<br>
   ```bash
   npm install
   ```

3. **Set up the API key**:<br>
   Replace the placeholder in `Translator.js`:<br>
   ```javascript
   const API_KEY = "YOUR-API-KEY-HERE"; // Replace with your Google Cloud API Key
   ```

   > If the API doesn’t work, you may need to generate your **own API key** at [console.cloud.google.com](https://console.cloud.google.com/) and enable the **Cloud Translation API**.<br>

4. **Start the app**:<br>
   ```bash
   npm start
   ```

---

## 🚀 Usage<br>

1. Enter the text to be translated.<br>
2. Select the source and target languages.<br>
3. Use the **Translate** button to get real-time translations.<br>
4. Use the **🎙 Speak** button for speech input.<br>
5. Use the **🔊 Listen** button for text-to-speech.<br>
6. Toggle between **🌞 light** and **🌙 dark** themes as preferred.<br>

---

## ✨ Features<br>

- 🌐 Translate text between 100+ languages<br>
- 🎙️ Speech-to-text input<br>
- 🔊 Text-to-speech output<br>
- 🌙 Light/Dark theme toggle<br>
- 🔄 Language swap functionality<br>
- 🗌 Copy translated text to clipboard<br>

---

## 🤝 Contributors<br>

[25_AI&DS_B_Sahidul_Shaikh]

[26_AI&DS_B_Kaushal_Sharma]

[27_AI&DS_B_Nikhil_Sharma]

---

## 🙌 Acknowledgements<br>

- [Google Translate API](https://cloud.google.com/translate)<br>
- [Bootstrap](https://getbootstrap.com/)<br>
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)<br>

---

## 📢 Contact Information<br>

For issues or inquiries, feel free to reach out at [nikhilsharma8369@gmail.com] or connect on [LinkedIn](https://www.linkedin.com/in/nikhil-sharma-b1819328a/).<br>


