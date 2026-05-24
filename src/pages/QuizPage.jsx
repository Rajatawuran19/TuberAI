import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import { medicalQuestions } from '../utils/scoringEngine';

export default function QuizPage() {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [lang, setLang] = useState('id');

  const handleInputChange = (id, value, type) => {
    setAnswers(prev => ({
      ...prev,
      [id]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to local storage for ResultPage to read
    localStorage.setItem('tb_answers', JSON.stringify(answers));
    localStorage.setItem('tb_lang', lang);
    navigate('/result');
  };

  const renderQuestions = (category) => {
    return medicalQuestions
      .filter(q => q.category === category)
      .map(q => (
        <div key={q.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-surface-container-lowest rounded-lg border border-outline-variant gap-4">
          <label htmlFor={q.id} className="font-medium text-on-surface">
            {lang === 'id' ? q.labelId : q.labelEn}
          </label>
          {q.type === 'number' ? (
            <input 
              type="number" 
              id={q.id} 
              min="0"
              className="w-24 p-2 border border-outline rounded-md focus:ring-2 focus:ring-primary focus:outline-none"
              value={answers[q.id] || ''}
              onChange={(e) => handleInputChange(q.id, e.target.value, q.type)}
            />
          ) : (
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={q.id} 
                  checked={answers[q.id] === true}
                  onChange={() => handleInputChange(q.id, true, q.type)}
                  className="w-5 h-5 text-primary focus:ring-primary"
                />
                <span>Ya</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="radio" 
                  name={q.id} 
                  checked={answers[q.id] === false}
                  onChange={() => handleInputChange(q.id, false, q.type)}
                  className="w-5 h-5 text-primary focus:ring-primary"
                />
                <span>Tidak</span>
              </label>
            </div>
          )}
        </div>
      ));
  };

  return (
    <div className="min-h-screen bg-surface font-body-md text-on-surface pb-12">
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50 border-b border-outline-variant p-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <h1 className="font-headline-md text-primary">Screening Form</h1>
          <select 
            value={lang} 
            onChange={(e) => setLang(e.target.value)}
            className="p-2 border border-outline rounded-md bg-transparent"
          >
            <option value="id">Bahasa Indonesia</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 mt-8">
        <ProgressBar currentStep={1} totalSteps={2} />
        
        <form onSubmit={handleSubmit} className="space-y-8 mt-8">
          <section className="bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/50">
            <h2 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">coronavirus</span>
              {lang === 'id' ? 'Gejala' : 'Symptoms'}
            </h2>
            <div className="space-y-3">
              {renderQuestions('symptom')}
            </div>
          </section>

          <section className="bg-surface-container-low p-6 rounded-2xl shadow-sm border border-outline-variant/50">
            <h2 className="text-xl font-bold text-tertiary mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">warning</span>
              {lang === 'id' ? 'Faktor Risiko' : 'Risk Factors'}
            </h2>
            <div className="space-y-3">
              {renderQuestions('risk')}
            </div>
          </section>

          <section className="bg-error-container/20 p-6 rounded-2xl shadow-sm border border-error/20">
            <h2 className="text-xl font-bold text-error mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined">emergency</span>
              {lang === 'id' ? 'Red Flags (Butuh Perhatian Segera)' : 'Red Flags (Urgent)'}
            </h2>
            <div className="space-y-3">
              {renderQuestions('redFlag')}
            </div>
          </section>

          <div className="flex justify-between items-center pt-4">
            <button 
              type="button"
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-surface-variant text-on-surface rounded-full font-medium hover:bg-outline-variant transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-8 py-3 bg-primary text-on-primary rounded-full font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              {lang === 'id' ? 'Lihat Hasil' : 'See Results'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
