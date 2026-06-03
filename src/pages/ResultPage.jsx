import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import GaugeChart from '../components/GaugeChart';
import ActionCard from '../components/ActionCard';
import { calculateRisk, buildReasons } from '../utils/scoringEngine';

export default function ResultPage() {
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [reasons, setReasons] = useState([]);
  const [aiExplanation, setAiExplanation] = useState('');
  const [loadingAi, setLoadingAi] = useState(false);
  const [lang, setLang] = useState('id');

  useEffect(() => {
    const savedAnswers = localStorage.getItem('tb_answers');
    const savedLang = localStorage.getItem('tb_lang') || 'id';
    setLang(savedLang);

    if (!savedAnswers) {
      navigate('/quiz');
      return;
    }

    const parsedAnswers = JSON.parse(savedAnswers);
    const risk = calculateRisk(parsedAnswers);
    const generatedReasons = buildReasons(parsedAnswers, savedLang);

    setResult(risk);
    setReasons(generatedReasons);
    fetchAiExplanation(parsedAnswers, risk, generatedReasons, savedLang);
  }, [navigate]);

  const fetchAiExplanation = async (answers, risk, reasons, language) => {
    setLoadingAi(true);
    try {
      const response = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          lang: language,
          report: {
            input: answers,
            level: risk.level,
            score: risk.score,
            redFlag: risk.redFlag,
            reasons: reasons
          }
        })
      });
      const data = await response.json();
      if (data.text) {
        setAiExplanation(data.text);
      } else {
        setAiExplanation(language === 'id' ? 'Gagal memuat penjelasan AI.' : 'Failed to load AI explanation.');
      }
    } catch (error) {
      console.error("AI fetch error:", error);
      setAiExplanation(language === 'id' ? 'Terjadi kesalahan jaringan.' : 'Network error occurred.');
    } finally {
      setLoadingAi(false);
    }
  };

  if (!result) return <div className="p-12 text-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface pb-12">
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50 border-b border-outline-variant p-4">
        <div className="max-w-3xl mx-auto flex items-center">
          <h1 className="font-headline-md text-primary">Result Dashboard</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        <ProgressBar currentStep={2} totalSteps={2} />

        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/3">
            <GaugeChart percentage={result.percentage} category={result.level} />
            
            {result.redFlag && (
              <div className="mt-4 p-4 bg-error text-on-error rounded-xl shadow-sm text-center font-bold">
                <span className="material-symbols-outlined block text-4xl mb-2">emergency</span>
                RED FLAG DETECTED
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 space-y-6">
            <section className="bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/50">
              <h2 className="text-xl font-bold mb-4">{lang === 'id' ? 'Alasan Utama' : 'Key Reasons'}</h2>
              <ul className="list-disc pl-5 space-y-2 text-on-surface-variant">
                {reasons.map((r, i) => <li key={i}>{r}</li>)}
              </ul>
            </section>

            <section className="bg-primary-container/10 p-6 rounded-2xl shadow-sm border border-primary/20">
              <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">smart_toy</span>
                AI Explanation & Next Steps
              </h2>
              {loadingAi ? (
                <div className="flex flex-col items-center justify-center py-8 space-y-4 bg-surface-container-lowest rounded-xl border border-outline-variant/30">
                  <div className="relative flex items-center justify-center w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-primary/20"></div>
                    <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
                    <span className="material-symbols-outlined text-primary text-2xl animate-pulse">smart_toy</span>
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-on-surface">
                      {lang === 'id' ? 'Menganalisis Gejala Anda...' : 'Analyzing Your Symptoms...'}
                    </h3>
                    <p className="text-sm text-on-surface-variant mt-1">
                      {lang === 'id' ? 'AI sedang menyusun rekomendasi personal untuk Anda.' : 'AI is generating personalized recommendations for you.'}
                    </p>
                  </div>
                  <div className="w-full max-w-sm mt-4 animate-pulse space-y-2 opacity-50">
                    <div className="h-2 bg-surface-variant rounded w-full"></div>
                    <div className="h-2 bg-surface-variant rounded w-5/6 mx-auto"></div>
                    <div className="h-2 bg-surface-variant rounded w-4/6 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <div className="prose prose-sm max-w-none text-on-surface-variant">
                  {/* The AI response often contains markdown. In a real app we'd use react-markdown. For now, simple pre-wrap */}
                  <div style={{ whiteSpace: 'pre-wrap' }}>{aiExplanation}</div>
                </div>
              )}
            </section>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button 
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-surface-container-high text-on-surface rounded-full font-medium hover:bg-surface-container-highest transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined">restart_alt</span>
            {lang === 'id' ? 'Cek Ulang' : 'New Check'}
          </button>
        </div>
      </main>
    </div>
  );
}
