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
Follow these steps to run the TBC Detection App locally.

1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo.git
cd your-repo
```

2. Install Dependencies

Make sure you have **Node.js** installed, then run:

```bash
npm install
```

3. Configure Environment Variables

Create a `.env` file in the root directory and configure the required variables.

Example:

```env
PORT=3000
```

> Add other environment variables if required by your `server.js`.

4. Project Structure (Relevant Files)

Make sure these core files are present:

* `.env` → Environment configuration
* `server.js` → Backend server
* `app.js` → Main frontend logic
* `index.html` → UI entry point
* `styles.css` → Styling

5. Run the Server

Start the backend server:

```bash
node server.js
```

Or (if configured):

```bash
npm run dev
```

6. Open the Application

* If using a dev server (e.g., Vite):

```bash
npm run dev
```

Then open the provided local URL (usually `http://localhost:5173`)

* If running manually:
  Open `index.html` in your browser or serve it using a local server.

7. Build / Deploy (Optional)

To compile the project for production:

```bash
npm run build
```

You can then host the built files using any static hosting service (e.g., Netlify, Vercel) or serve via your backend.

---

Notes
* Ensure `.env` is properly configured before running the server
* This app requires both frontend (`index.html`, `app.js`) and backend (`server.js`) to function correctly
