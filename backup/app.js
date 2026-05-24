// TB Pre-Screener Prototype (rule-based) — NOT a diagnosis.

const el = (id) => document.getElementById(id);

const screens = {
  form: el("screenForm"),
  result: el("screenResult"),
  next: el("screenNext"),
};

const stepEls = [...document.querySelectorAll(".step")];

const state = {
  lang: "id",
  last: null, // last computed report
};

const i18n = {
  id: {
    formTitle: "TB Pre-Screening",
    formDesc: "Isi gejala & faktor risiko. Sistem akan memberi kategori risiko (Low/Medium/High) dan saran langkah berikutnya.",
    symptomsTitle: "Gejala",
    coughWeeks: "Batuk sudah berapa minggu?",
    fever: "Demam (terutama malam/berulang)",
    nightSweats: "Keringat malam",
    weightLoss: "Berat badan turun tanpa sebab jelas",
    fatigue: "Lemas/cepat lelah",
    riskTitle: "Faktor Risiko",
    closeContact: "Kontak erat dengan penderita TB",
    immuno: "Imunitas lemah (mis. HIV/steroid/kemoterapi)",
    crowded: "Sering di tempat padat/ventilasi buruk",
    diabetes: "Diabetes (faktor risiko)",
    redFlagsTitle: "Red Flags (butuh perhatian segera)",
    hemoptysis: "Batuk berdarah",
    severeBreathing: "Sesak berat / nyeri dada berat",
    checkBtn: "Check Risk",
    resetBtn: "Reset",
    privacyNote: "Privasi: jangan masukkan data pribadi nyata. Gunakan contoh/simulasi untuk demo.",
    resultTitle: "Result",
    summaryTitle: "Ringkasan",
    scoreLabel: "Score",
    coughLabel: "Batuk",
    redFlagLabel: "Red Flag",
    reasonsTitle: "Alasan utama",
    nextBtn: "See Next Steps",
    backBtn: "Back",
    nextTitle: "Next Steps",
    actionsTitle: "Saran tindakan",
    eduTitle: "Edukasi singkat",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "Ini adalah prototype pre-screening dan edukasi. Bukan alat diagnosis. Untuk konfirmasi, konsultasi tenaga kesehatan dan lakukan tes yang direkomendasikan.",
    copyBtn: "Copy Report",
    backResultBtn: "Back",
    newCheckBtn: "New Check",
    tip1: "• Ventilasi ruangan baik",
    tip2: "• Etika batuk & masker bila batuk lama",
    tip3: "• Pemeriksaan dini lebih aman",
  },
  en: {
    formTitle: "TB Pre-Screening",
    formDesc: "Enter symptoms and risk factors. The system returns a risk category (Low/Medium/High) plus recommended next steps.",
    symptomsTitle: "Symptoms",
    coughWeeks: "How many weeks have you been coughing?",
    fever: "Fever (recurrent/night)",
    nightSweats: "Night sweats",
    weightLoss: "Unexplained weight loss",
    fatigue: "Fatigue/weakness",
    riskTitle: "Risk Factors",
    closeContact: "Close contact with a TB patient",
    immuno: "Weakened immunity (e.g., HIV/long-term steroids/chemo)",
    crowded: "Crowded/poor ventilation exposure",
    diabetes: "Diabetes (risk factor)",
    redFlagsTitle: "Red Flags (urgent)",
    hemoptysis: "Coughing blood",
    severeBreathing: "Severe shortness of breath / severe chest pain",
    checkBtn: "Check Risk",
    resetBtn: "Reset",
    privacyNote: "Privacy: do not enter real personal data. Use simulated examples for demo.",
    resultTitle: "Result",
    summaryTitle: "Summary",
    scoreLabel: "Score",
    coughLabel: "Cough",
    redFlagLabel: "Red Flag",
    reasonsTitle: "Key reasons",
    nextBtn: "See Next Steps",
    backBtn: "Back",
    nextTitle: "Next Steps",
    actionsTitle: "Recommended actions",
    eduTitle: "Quick education",
    disclaimerTitle: "Disclaimer",
    disclaimerText: "This is a prototype for pre-screening and education only. Not a diagnostic tool. For confirmation, consult a healthcare professional and take recommended tests.",
    copyBtn: "Copy Report",
    backResultBtn: "Back",
    newCheckBtn: "New Check",
    tip1: "• Improve room ventilation",
    tip2: "• Cough etiquette & mask for persistent cough",
    tip3: "• Early check-up is safer",
  },
};

function applyI18n(lang) {
  state.lang = lang;
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    const val = i18n[lang]?.[key];
    if (val) node.textContent = val;
  });
  // If already computed, re-render dynamic sections in new language
  if (state.last) renderReport(state.last);
}

function setStep(stepNum) {
  stepEls.forEach((s) => s.classList.toggle("active", s.dataset.step === String(stepNum)));
}

function showScreen(name) {
  Object.values(screens).forEach((s) => s.classList.remove("active"));
  screens[name].classList.add("active");
  setStep(name === "form" ? 1 : name === "result" ? 2 : 3);
}

function readInputs() {
  return {
    coughWeeks: Number(el("coughWeeks").value),
    fever: el("fever").checked,
    nightSweats: el("nightSweats").checked,
    weightLoss: el("weightLoss").checked,
    fatigue: el("fatigue").checked,
    closeContact: el("closeContact").checked,
    immuno: el("immuno").checked,
    crowded: el("crowded").checked,
    diabetes: el("diabetes").checked,
    hemoptysis: el("hemoptysis").checked,
    severeBreathing: el("severeBreathing").checked,
  };
}

function scoreRisk(d) {
  let score = 0;

  // Symptoms
  if (d.coughWeeks >= 2) score += 2;
  if (d.coughWeeks >= 4) score += 1;
  if (d.fever) score += 1;
  if (d.nightSweats) score += 1;
  if (d.weightLoss) score += 1;
  if (d.fatigue) score += 1;

  // Risk factors
  if (d.closeContact) score += 2;
  if (d.immuno) score += 2;
  if (d.crowded) score += 1;
  if (d.diabetes) score += 1;

  // Red flags (separate, but also increase score)
  const redFlag = d.hemoptysis || d.severeBreathing;
  if (d.hemoptysis) score += 3;
  if (d.severeBreathing) score += 3;

  let level = "LOW";
  if (score >= 7) level = "HIGH";
  else if (score >= 4) level = "MEDIUM";

  return { score, level, redFlag };
}

function tIDEN(idText, enText) {
  return state.lang === "id" ? idText : enText;
}

function buildReasons(d, risk) {
  const reasons = [];

  if (d.coughWeeks >= 2) reasons.push(tIDEN("Batuk ≥ 2 minggu.", "Cough ≥ 2 weeks."));
  if (d.coughWeeks >= 4) reasons.push(tIDEN("Batuk ≥ 4 minggu meningkatkan kecurigaan.", "Cough ≥ 4 weeks increases concern."));
  if (d.fever) reasons.push(tIDEN("Ada demam (terutama malam/berulang).", "Fever present (recurrent/night)."));
  if (d.nightSweats) reasons.push(tIDEN("Ada keringat malam.", "Night sweats present."));
  if (d.weightLoss) reasons.push(tIDEN("Ada penurunan berat badan tanpa sebab jelas.", "Unexplained weight loss."));
  if (d.closeContact) reasons.push(tIDEN("Ada riwayat kontak erat TB.", "History of close TB contact."));
  if (d.immuno) reasons.push(tIDEN("Imunitas lemah meningkatkan risiko infeksi.", "Weakened immunity increases risk."));
  if (d.hemoptysis) reasons.push(tIDEN("Batuk berdarah adalah red flag.", "Coughing blood is a red flag."));
  if (d.severeBreathing) reasons.push(tIDEN("Sesak/nyeri dada berat adalah red flag.", "Severe shortness of breath/chest pain is a red flag."));

  // Ensure at least 2 reasons
  if (reasons.length === 0) {
    reasons.push(tIDEN("Gejala yang dipilih tergolong ringan/non-spesifik.", "Selected symptoms are mild/non-specific."));
    reasons.push(tIDEN("Tetap pantau, terutama jika batuk menetap.", "Continue to monitor, especially if cough persists."));
  }

  // Trim to look clean
  return reasons.slice(0, 6);
}

function buildNextSteps(risk) {
  const actions = [];
  const { level, redFlag } = risk;

  if (redFlag) {
    actions.push(tIDEN(
      "Jika batuk berdarah atau sesak berat/nyeri dada berat: segera cari pertolongan medis (IGD/klinik terdekat).",
      "If coughing blood or severe shortness of breath/severe chest pain: seek urgent medical care."
    ));
  }

  if (level === "HIGH") {
    actions.push(tIDEN(
      "Disarankan konsultasi tenaga kesehatan untuk evaluasi TB dan pemeriksaan konfirmasi (mis. tes dahak/sputum, rontgen dada sesuai indikasi).",
      "Consult a healthcare professional for TB evaluation and confirmatory tests (e.g., sputum test, chest X-ray if indicated)."
    ));
    actions.push(tIDEN(
      "Kurangi kontak dekat jika batuk menetap; gunakan etika batuk/masker saat di sekitar orang lain.",
      "Reduce close contact if cough persists; practice cough etiquette/wear a mask around others."
    ));
  } else if (level === "MEDIUM") {
    actions.push(tIDEN(
      "Pertimbangkan periksa ke klinik jika gejala menetap atau memburuk, terutama bila batuk ≥ 2 minggu.",
      "Consider visiting a clinic if symptoms persist or worsen, especially if cough ≥ 2 weeks."
    ));
    actions.push(tIDEN(
      "Pantau gejala 3–7 hari dan catat perubahan (demam, batuk makin lama, berat badan turun).",
      "Monitor symptoms for 3–7 days and note changes (fever, longer cough, weight loss)."
    ));
  } else {
    actions.push(tIDEN(
      "Risiko rendah: pantau gejala. Jika batuk mendekati 2 minggu atau muncul gejala tambahan, pertimbangkan konsultasi.",
      "Low risk: monitor symptoms. If cough approaches 2 weeks or new symptoms appear, consider medical advice."
    ));
    actions.push(tIDEN(
      "Istirahat cukup, hidrasi, dan perhatikan ventilasi ruangan.",
      "Get enough rest, stay hydrated, and improve ventilation."
    ));
  }

  actions.push(tIDEN(
    "Catatan: output ini bukan diagnosis. Konfirmasi hanya lewat pemeriksaan medis.",
    "Note: this output is not a diagnosis. Confirmation requires medical evaluation."
  ));

  return actions.slice(0, 6);
}

function buildEducation(risk) {
  if (risk.level === "HIGH") {
    return tIDEN(
      "TB biasanya memerlukan pemeriksaan konfirmasi (mis. dahak/sputum dan/atau rontgen sesuai indikasi). Semakin cepat diperiksa, semakin baik untuk mencegah penularan dan komplikasi.",
      "TB typically needs confirmatory testing (e.g., sputum and/or chest X-ray if indicated). Earlier evaluation is safer to reduce transmission and complications."
    );
  }
  if (risk.level === "MEDIUM") {
    return tIDEN(
      "Gejala TB bisa mirip flu. Kuncinya adalah durasi batuk dan kombinasi gejala (demam malam, keringat malam, berat turun), terutama bila ada faktor risiko.",
      "TB symptoms can overlap with flu. Key signals are cough duration and combined symptoms (night fever/sweats, weight loss), especially with risk factors."
    );
  }
  return tIDEN(
    "Banyak batuk disebabkan infeksi ringan. Namun, batuk yang menetap (mendekati/lebih dari 2 minggu) sebaiknya dievaluasi lebih lanjut.",
    "Many coughs come from mild infections. However, a persistent cough (approaching/over 2 weeks) should be evaluated."
  );
}

function renderReport(report) {
  // Badge
  const badge = el("riskBadge");
  badge.classList.remove("low", "medium", "high");
  badge.textContent = report.level;
  badge.classList.add(report.level.toLowerCase());

  // Summary
  el("scoreValue").textContent = String(report.score);
  el("coughValueOut").textContent = tIDEN(`${report.input.coughWeeks} minggu`, `${report.input.coughWeeks} weeks`);
  el("redFlagOut").textContent = report.redFlag ? tIDEN("YA", "YES") : tIDEN("TIDAK", "NO");

  // Reasons
  const reasonsList = el("reasonsList");
  reasonsList.innerHTML = "";
  report.reasons.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = r;
    reasonsList.appendChild(li);
  });

  // Next steps
  const actionsList = el("actionsList");
  actionsList.innerHTML = "";
  report.actions.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a;
    actionsList.appendChild(li);
  });

  // Education
  el("eduText").textContent = report.education;

  // Copy report buffer
  const copyText =
    `TB Pre-Screener Prototype (${state.lang.toUpperCase()})
Risk Level: ${report.level}
Score: ${report.score}
Red Flag: ${report.redFlag ? "YES" : "NO"}
Cough: ${report.input.coughWeeks} ${state.lang === "id" ? "minggu" : "weeks"}

Key Reasons:
- ${report.reasons.join("\n- ")}

Recommended Actions:
- ${report.actions.join("\n- ")}

Disclaimer:
NOT a diagnosis. Seek professional care for confirmation.`;

  el("copyBuffer").value = copyText;
}

function computeReport() {
  const input = readInputs();
  const risk = scoreRisk(input);
  const reasons = buildReasons(input, risk);
  const actions = buildNextSteps(risk);
  const education = buildEducation(risk);

  return {
    input,
    score: risk.score,
    level: risk.level,
    redFlag: risk.redFlag,
    reasons,
    actions,
    education,
  };
}

function resetAll() {
  el("coughWeeks").value = 2;
  el("coughWeeksValue").textContent = "2";

  [
    "fever", "nightSweats", "weightLoss", "fatigue",
    "closeContact", "immuno", "crowded", "diabetes",
    "hemoptysis", "severeBreathing"
  ].forEach((id) => (el(id).checked = false));

  state.last = null;
  showScreen("form");
}

function wireEvents() {
  el("langSelect").addEventListener("change", (e) => applyI18n(e.target.value));

  el("coughWeeks").addEventListener("input", (e) => {
    el("coughWeeksValue").textContent = e.target.value;
  });

  el("btnCheck").addEventListener("click", () => {
    const report = computeReport();
    state.last = report;
    renderReport(report);
    showScreen("result");
  });

  el("btnToNext").addEventListener("click", () => showScreen("next"));
  el("btnBackToForm").addEventListener("click", () => showScreen("form"));
  el("btnBackToResult").addEventListener("click", () => showScreen("result"));

  el("btnCopy").addEventListener("click", async () => {
    const text = el("copyBuffer").value;
    try {
      await navigator.clipboard.writeText(text);
      el("btnCopy").textContent = tIDEN("Copied ✅", "Copied ✅");
      setTimeout(() => (el("btnCopy").textContent = i18n[state.lang].copyBtn), 1200);
    } catch {
      // fallback: show textarea so user can copy manually
      el("copyBuffer").style.display = "block";
      el("copyBuffer").focus();
      el("copyBuffer").select();
    }
  });

  el("btnReset").addEventListener("click", resetAll);
  el("btnResetTop").addEventListener("click", resetAll);
  el("btnResetEnd").addEventListener("click", resetAll);
}

applyI18n("id");
wireEvents();
resetAll();
