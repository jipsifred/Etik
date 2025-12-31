import { useState, useEffect } from 'react';
import { Dashboard } from './components/Dashboard';
import { ThemeView } from './components/ThemeView';
import type { Theme } from './types';
import { getThemeById } from './storage';
import type { Language } from './translations';

function App() {
  const [currentView, setCurrentView] = useState<'dashboard' | 'theme'>('dashboard');
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme | null>(null);
  const [lang, setLang] = useState<Language>('de');

  useEffect(() => {
    // Initialize themes on first load - No longer needed here as Dashboard handles it
    // But if we wanted to preload...
  }, []);

  useEffect(() => {
    const fetchTheme = async () => {
      if (selectedThemeId) {
        const theme = await getThemeById(selectedThemeId);
        if (theme) {
          setCurrentTheme(theme);
          setCurrentView('theme');
        }
      }
    };
    fetchTheme();
  }, [selectedThemeId]);

  const handleSelectTheme = (themeId: string) => {
    setSelectedThemeId(themeId);
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedThemeId(null);
    setCurrentTheme(null);
  };

  const handleThemeUpdate = (updatedTheme: Theme) => {
    setCurrentTheme(updatedTheme);
  };

  if (currentView === 'theme' && currentTheme) {
    return (
      <ThemeView
        theme={currentTheme}
        onBack={handleBackToDashboard}
        lang={lang}
        onLanguageChange={setLang}
        onThemeUpdate={handleThemeUpdate}
      />
    );
  }

  return (
    <Dashboard
      onSelectTheme={handleSelectTheme}
      lang={lang}
      onLanguageChange={setLang}
    />
  );
}

export default App;
