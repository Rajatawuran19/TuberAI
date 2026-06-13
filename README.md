# TuberAI
an AI based website to detect wether you have TBC or not.

Tuberculosis remains a critical global health issue, especially in regions where access to immediate medical consultation is limited. This project introduces a lightweight, intelligent screening platform designed to bridge that gap enabling users to perform a quick preliminary check anytime, anywhere. Our goal is to reduce delays in diagnosis and empowering individuals to take proactive steps toward their health. This platform can serve as a scalable foundation for broader digital health solutions, especially in underserved communities.

# Our Idea
We built a rule based diagnostic system powered by a decision tree model that translates medical screening logic into an intuitive digital experience. Users complete a short, guided questionnaire, and within seconds, the system evaluates their responses to estimate the likelihood of TBC.

# How It Works
Users answer a concise set of symptom and risk-factor questions
A decision-tree engine processes inputs using predefined medical rules
The system outputs a risk assessment + actionable guidance

# Key Value Propositions
Instant Screening** — Get results in seconds, no appointment needed
Remote-First** — Designed for accessibility in low-resource or remote environments
Actionable Insights** — Not just results, but clear next steps for prevention and care
Doctor-Ready Output** — Easily share results with healthcare professionals for follow-up

# Note
This is a **screening tool, not a medical diagnosis**. Always consult a licensed healthcare professional for confirmation and treatment.

# Installation and Setup
This project is designed to be simple to run locally. Follow the steps below:

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

---

### 2. Install Dependencies

Install all required packages (even if not strictly needed for the demo):

```bash
npm install
```

---

### 3. Run the App

Open the prototype directly in your browser:

```
backup/index.html
```

You can do this by:

* Double-clicking the file
* Or right-click → **Open with browser**
* Or using VS Code Live Server

---

### That’s It

No build step required. No server required.

The app will run entirely in the browser using the preconfigured frontend logic.

---

### Notes

* Make sure `styles.css` and `app.js` are in the correct relative paths
* Backend (`server.js`) is optional and not required for this prototype
* `.env` is not needed for basic local usage

---

### Optional (Advanced)

If you want to run the full development environment:

```bash
npm run dev
```

Or start the backend server:

```bash
node server.js
```

---
