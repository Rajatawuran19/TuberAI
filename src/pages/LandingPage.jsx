import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-surface font-body-md text-on-surface selection:bg-primary-container selection:text-on-primary-container min-h-screen">
      {/* TopNavBar */}
      <header className="bg-surface-container-lowest shadow-sm sticky top-0 z-50 border-b border-outline-variant">
        <div className="flex justify-between items-center w-full px-4 md:px-12 h-[72px] max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2">
            {/* Minimal SVG placeholder for Logo */}
            <svg className="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="font-headline-md text-primary">TBDetect AI</span>
          </div>
          <button 
            className="hidden md:flex items-center justify-center px-4 py-2 bg-primary text-on-primary rounded-full hover:bg-primary/90 transition-colors"
            onClick={() => navigate('/quiz')}
          >
            Start Screening
          </button>
        </div>
      </header>

      {/* Main Content Placeholder for Landing Page */}
      <main className="max-w-[1440px] mx-auto px-4 md:px-12 py-12 flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <div className="inline-block px-3 py-1 bg-surface-container-high text-primary rounded-full text-sm font-medium">
            AI-Powered Pre-Screening
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-on-surface">
            Early Detection Saves Lives. <br/>
            <span className="text-primary">Check Your TB Risk Today.</span>
          </h1>
          <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl">
            A fast, private, and AI-driven tool to help you understand your Tuberculosis symptoms and guide you to proper care.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              className="px-8 py-4 bg-primary text-on-primary rounded-full font-semibold text-lg shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              onClick={() => navigate('/quiz')}
            >
              Start Free Screening
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
            <button 
              className="px-8 py-4 bg-surface-container-high text-on-surface rounded-full font-semibold text-lg hover:bg-surface-container-highest transition-colors"
            >
              Learn More
            </button>
          </div>
        </div>
        
        {/* Mockup visual */}
        <div className="flex-1 w-full max-w-lg">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-surface-container-lowest bg-surface-container-low aspect-[4/5] flex flex-col">
            <div className="bg-primary/10 w-full h-48 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-6xl opacity-50">health_and_safety</span>
            </div>
            <div className="p-6 space-y-4">
              <div className="h-4 bg-surface-variant rounded w-3/4"></div>
              <div className="h-4 bg-surface-variant rounded w-1/2"></div>
              <div className="h-4 bg-surface-variant rounded w-5/6"></div>
              <div className="mt-8 p-4 bg-primary text-on-primary rounded-xl flex justify-between items-center">
                <span>Start Questionnaire</span>
                <span className="material-symbols-outlined">chevron_right</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-surface-container-low border-t border-outline-variant mt-24 py-12">
        <div className="max-w-[1440px] mx-auto px-4 md:px-12 text-center text-on-surface-variant">
          <p>This is an Early Warning TB Detector Prototype. Not a medical diagnosis.</p>
          <p className="mt-2 text-sm">© 2026 TBDetect AI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
