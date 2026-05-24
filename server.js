import express from "express";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(express.json({ limit: "1mb" }));

// Serve your static files (index.html, styles.css, app.js) from this folder
app.use(express.static("."));

// Gemini client reads GEMINI_API_KEY from env automatically
const ai = new GoogleGenAI({});

app.post("/api/explain", async (req, res) => {
  try {
    const { lang, report } = req.body || {};
    if (!report?.input) return res.status(400).json({ error: "Missing report.input" });

    const locale = lang === "en" ? "English" : "Bahasa Indonesia";

    const prompt = `
You are a health education assistant. OUTPUT MUST BE IN ${locale}.
The app is a TB pre-screening PROTOTYPE. DO NOT diagnose TB.
Goal: explain the risk result in simple terms, list educational next steps, and remind this is NOT a diagnosis.

User inputs:
- coughWeeks: ${report.input.coughWeeks}
- fever: ${!!report.input.fever}
- nightSweats: ${!!report.input.nightSweats}
- weightLoss: ${!!report.input.weightLoss}
- fatigue: ${!!report.input.fatigue}
- closeContact: ${!!report.input.closeContact}
- immuno: ${!!report.input.immuno}
- crowded: ${!!report.input.crowded}
- diabetes: ${!!report.input.diabetes}
- hemoptysis: ${!!report.input.hemoptysis}
- severeBreathing: ${!!report.input.severeBreathing}

Risk result:
- level: ${report.level}
- score: ${report.score}
- redFlag: ${!!report.redFlag}
- reasons: ${Array.isArray(report.reasons) ? report.reasons.join(" | ") : ""}

Write:
1) 2–3 sentences explanation (friendly, calm, clear)
2) Bullet list: "What to do next" (max 5 bullets)
3) Bullet list: "Why this matters" (max 3 bullets)
4) One-line disclaimer: not diagnosis + seek professional care for confirmation
No treatment instructions, no medication.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    res.json({ text: response.text ?? "" });
  } catch (err) {
    res.status(500).json({ error: err?.message || "Server error" });
  }
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => {
  console.log(`Server running: http://localhost:${port}`);
});
