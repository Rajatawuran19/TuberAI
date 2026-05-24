export const medicalQuestions = [
  { id: 'coughWeeks', type: 'number', labelId: 'Batuk sudah berapa minggu?', labelEn: 'How many weeks have you been coughing?', category: 'symptom' },
  { id: 'fever', type: 'boolean', labelId: 'Demam (terutama malam/berulang)', labelEn: 'Fever (recurrent/night)', category: 'symptom' },
  { id: 'nightSweats', type: 'boolean', labelId: 'Keringat malam', labelEn: 'Night sweats', category: 'symptom' },
  { id: 'weightLoss', type: 'boolean', labelId: 'Berat badan turun tanpa sebab jelas', labelEn: 'Unexplained weight loss', category: 'symptom' },
  { id: 'fatigue', type: 'boolean', labelId: 'Lemas/cepat lelah', labelEn: 'Fatigue/weakness', category: 'symptom' },
  { id: 'closeContact', type: 'boolean', labelId: 'Kontak erat dengan penderita TB', labelEn: 'Close contact with a TB patient', category: 'risk' },
  { id: 'immuno', type: 'boolean', labelId: 'Imunitas lemah (mis. HIV/steroid/kemoterapi)', labelEn: 'Weakened immunity (e.g., HIV/long-term steroids/chemo)', category: 'risk' },
  { id: 'crowded', type: 'boolean', labelId: 'Sering di tempat padat/ventilasi buruk', labelEn: 'Crowded/poor ventilation exposure', category: 'risk' },
  { id: 'diabetes', type: 'boolean', labelId: 'Diabetes (faktor risiko)', labelEn: 'Diabetes (risk factor)', category: 'risk' },
  { id: 'hemoptysis', type: 'boolean', labelId: 'Batuk berdarah', labelEn: 'Coughing blood', category: 'redFlag' },
  { id: 'severeBreathing', type: 'boolean', labelId: 'Sesak berat / nyeri dada berat', labelEn: 'Severe shortness of breath / severe chest pain', category: 'redFlag' }
];

export function calculateRisk(d) {
  let score = 0;

  // Symptoms
  const coughWeeks = Number(d.coughWeeks || 0);
  if (coughWeeks >= 2) score += 2;
  if (coughWeeks >= 4) score += 1;
  if (d.fever) score += 1;
  if (d.nightSweats) score += 1;
  if (d.weightLoss) score += 1;
  if (d.fatigue) score += 1;

  // Risk factors
  if (d.closeContact) score += 2;
  if (d.immuno) score += 2;
  if (d.crowded) score += 1;
  if (d.diabetes) score += 1;

  // Red flags
  const redFlag = d.hemoptysis || d.severeBreathing;
  if (d.hemoptysis) score += 3;
  if (d.severeBreathing) score += 3;

  let level = "LOW";
  if (score >= 7) level = "HIGH";
  else if (score >= 4) level = "MEDIUM";

  let percentage = (score / 15) * 100;
  if (percentage > 100) percentage = 100;

  return { score, level, redFlag, percentage };
}

export function buildReasons(d, lang = 'id') {
  const reasons = [];
  const t = (idText, enText) => lang === 'id' ? idText : enText;

  const coughWeeks = Number(d.coughWeeks || 0);
  if (coughWeeks >= 2) reasons.push(t("Batuk ≥ 2 minggu.", "Cough ≥ 2 weeks."));
  if (coughWeeks >= 4) reasons.push(t("Batuk ≥ 4 minggu meningkatkan kecurigaan.", "Cough ≥ 4 weeks increases concern."));
  if (d.fever) reasons.push(t("Ada demam (terutama malam/berulang).", "Fever present (recurrent/night)."));
  if (d.nightSweats) reasons.push(t("Ada keringat malam.", "Night sweats present."));
  if (d.weightLoss) reasons.push(t("Ada penurunan berat badan tanpa sebab jelas.", "Unexplained weight loss."));
  if (d.closeContact) reasons.push(t("Ada riwayat kontak erat TB.", "History of close TB contact."));
  if (d.immuno) reasons.push(t("Imunitas lemah meningkatkan risiko infeksi.", "Weakened immunity increases risk."));
  if (d.hemoptysis) reasons.push(t("Batuk berdarah adalah red flag.", "Coughing blood is a red flag."));
  if (d.severeBreathing) reasons.push(t("Sesak/nyeri dada berat adalah red flag.", "Severe shortness of breath/chest pain is a red flag."));

  if (reasons.length === 0) {
    reasons.push(t("Gejala yang dipilih tergolong ringan/non-spesifik.", "Selected symptoms are mild/non-specific."));
    reasons.push(t("Tetap pantau, terutama jika batuk menetap.", "Continue to monitor, especially if cough persists."));
  }

  return reasons.slice(0, 6);
}
