import { useState, useEffect } from 'react';
import { Plus, Book, Scale, Brain, Heart, Shield, Star, Award, Target, X, Trash2 } from 'lucide-react';
import type { Theme } from '../types';
import { uiTranslations } from '../translations';
import type { Language } from '../translations';
import { getThemes, saveTheme, deleteTheme, createEmptyTheme } from '../storage';

interface DashboardProps {
    onSelectTheme: (themeId: string) => void;
    lang: Language;
    onLanguageChange: (lang: Language) => void;
}

const iconMap: Record<string, React.ReactNode> = {
    Book: <Book className="w-8 h-8" />,
    Scale: <Scale className="w-8 h-8" />,
    Brain: <Brain className="w-8 h-8" />,
    Heart: <Heart className="w-8 h-8" />,
    Shield: <Shield className="w-8 h-8" />,
    Star: <Star className="w-8 h-8" />,
    Award: <Award className="w-8 h-8" />,
    Target: <Target className="w-8 h-8" />,
};

const availableIcons = ['Book', 'Scale', 'Brain', 'Heart', 'Shield', 'Star', 'Award', 'Target'];
const availableColors = ['#8B4513', '#1e3a5f', '#2d4a3e', '#4a2d5f', '#5f2d2d', '#3d3d3d', '#2d4a5f', '#5f4a2d'];

export const Dashboard = ({ onSelectTheme, lang, onLanguageChange }: DashboardProps) => {
    const [themes, setThemes] = useState<Theme[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
    const [newThemeName, setNewThemeName] = useState({ pt: '', de: '' });
    const [newThemeIcon, setNewThemeIcon] = useState('Book');
    const [newThemeColor, setNewThemeColor] = useState('#4a5568');

    const t = uiTranslations[lang];

    useEffect(() => {
        getThemes().then(setThemes);
    }, []);

    const handleAddTheme = async () => {
        if (!newThemeName.pt && !newThemeName.de) return;

        const id = (newThemeName.de || newThemeName.pt)
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9-]/g, '');

        const newTheme = createEmptyTheme(id + '-' + Date.now().toString(), newThemeName);
        newTheme.icon = newThemeIcon;
        newTheme.color = newThemeColor;

        await saveTheme(newTheme);
        const updatedThemes = await getThemes();
        setThemes(updatedThemes);
        setShowAddModal(false);
        setNewThemeName({ pt: '', de: '' });
        setNewThemeIcon('Book');
        setNewThemeColor('#4a5568');
    };

    const handleDeleteTheme = async (id: string) => {
        await deleteTheme(id);
        const updatedThemes = await getThemes();
        setThemes(updatedThemes);

        setShowDeleteConfirm(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#f4f1ea] via-[#e8e4db] to-[#ddd8ce]">
            {/* Header */}
            <header className="bg-[#2c241b] text-amber-50 shadow-xl border-b-4 border-amber-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-3">
                                <div className="p-3 bg-stone-800 border border-stone-600 rounded-lg shadow-lg">
                                    <Book className="w-10 h-10 text-amber-500" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-serif font-bold tracking-tight text-amber-50">
                                        {t.dashboard}
                                    </h1>
                                    <div className="h-1 w-32 bg-amber-600 mt-2"></div>
                                </div>
                            </div>
                            <p className="text-stone-400 mt-2 text-lg font-serif italic ml-16">{t.dashboardSubtitle}</p>
                        </div>

                        {/* Language Switcher */}
                        <div className="flex bg-stone-900 rounded-lg p-1.5 border border-stone-700 shadow-lg">
                            <button
                                onClick={() => onLanguageChange('pt')}
                                className={`px-5 py-2 rounded-md text-sm font-bold font-serif tracking-widest transition-all ${lang === 'pt' ? 'bg-amber-800 text-white shadow-md' : 'text-stone-400 hover:text-amber-100'}`}
                            >
                                PT
                            </button>
                            <button
                                onClick={() => onLanguageChange('de')}
                                className={`px-5 py-2 rounded-md text-sm font-bold font-serif tracking-widest transition-all ${lang === 'de' ? 'bg-amber-800 text-white shadow-md' : 'text-stone-400 hover:text-amber-100'}`}
                            >
                                DE
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Theme Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {themes.map((theme) => (
                        <div
                            key={theme.id}
                            className="group relative bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-stone-200 hover:border-amber-300"
                        >
                            {/* Delete Button */}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowDeleteConfirm(theme.id);
                                }}
                                className="absolute top-3 right-3 p-2 bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-100 z-10"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>

                            <div
                                onClick={() => onSelectTheme(theme.id)}
                                className="cursor-pointer"
                            >
                                {/* Color Banner */}
                                <div
                                    className="h-3"
                                    style={{ backgroundColor: theme.color }}
                                />

                                {/* Content */}
                                <div className="p-6">
                                    <div className="flex items-start gap-4">
                                        <div
                                            className="p-3 rounded-xl text-white shadow-lg"
                                            style={{ backgroundColor: theme.color }}
                                        >
                                            {iconMap[theme.icon] || <Book className="w-8 h-8" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-xl font-serif font-bold text-stone-900 truncate">
                                                {theme.name[lang] || theme.name.de || theme.name.pt}
                                            </h3>
                                            <p className="text-sm text-stone-500 mt-1 line-clamp-2">
                                                {theme.description[lang] || theme.description.de || theme.description.pt || '...'}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="mt-5 pt-4 border-t border-stone-100 flex gap-4 text-xs text-stone-500">
                                        <span>{theme.topics.length} {lang === 'de' ? 'Themen' : 'Temas'}</span>
                                        <span>{theme.cases.length} {lang === 'de' ? 'Fälle' : 'Casos'}</span>
                                        <span>{theme.flashcardsPro.length + theme.flashcardsSimple.length + theme.flashcardsExam.length} Flashcards</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Add Theme Card */}
                    <button
                        onClick={() => setShowAddModal(true)}
                        className="group bg-white/50 backdrop-blur-sm rounded-xl border-2 border-dashed border-stone-300 hover:border-amber-500 transition-all duration-300 p-6 flex flex-col items-center justify-center min-h-[200px] hover:bg-white/80"
                    >
                        <div className="p-4 bg-stone-100 rounded-full group-hover:bg-amber-100 transition-colors mb-4">
                            <Plus className="w-8 h-8 text-stone-400 group-hover:text-amber-600 transition-colors" />
                        </div>
                        <span className="font-serif font-bold text-stone-500 group-hover:text-amber-700 transition-colors">
                            {t.addTheme}
                        </span>
                    </button>
                </div>

                {/* Empty State */}
                {themes.length === 0 && (
                    <div className="text-center py-16 text-stone-500">
                        <Book className="w-16 h-16 mx-auto mb-4 opacity-30" />
                        <p className="text-lg font-serif">{t.noThemes}</p>
                    </div>
                )}
            </main>

            {/* Add Theme Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden">
                        <div className="bg-[#2c241b] text-amber-50 p-5 flex items-center justify-between">
                            <h2 className="text-xl font-serif font-bold">{t.addTheme}</h2>
                            <button onClick={() => setShowAddModal(false)} className="p-2 hover:bg-stone-700 rounded-lg">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-6 space-y-5">
                            <div>
                                <label className="block font-serif font-bold text-stone-700 mb-2">
                                    {t.themeName} (DE)
                                </label>
                                <input
                                    type="text"
                                    value={newThemeName.de}
                                    onChange={(e) => setNewThemeName(prev => ({ ...prev, de: e.target.value }))}
                                    className="w-full p-3 border-2 border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                    placeholder="z.B. Strafrecht"
                                />
                            </div>

                            <div>
                                <label className="block font-serif font-bold text-stone-700 mb-2">
                                    {t.themeName} (PT)
                                </label>
                                <input
                                    type="text"
                                    value={newThemeName.pt}
                                    onChange={(e) => setNewThemeName(prev => ({ ...prev, pt: e.target.value }))}
                                    className="w-full p-3 border-2 border-stone-300 rounded-lg focus:border-amber-500 focus:outline-none"
                                    placeholder="z.B. Direito Penal"
                                />
                            </div>

                            <div>
                                <label className="block font-serif font-bold text-stone-700 mb-2">
                                    {t.themeIcon}
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {availableIcons.map((icon) => (
                                        <button
                                            key={icon}
                                            onClick={() => setNewThemeIcon(icon)}
                                            className={`p-3 rounded-lg border-2 transition-all ${newThemeIcon === icon
                                                ? 'border-amber-500 bg-amber-50'
                                                : 'border-stone-200 hover:border-stone-300'
                                                }`}
                                        >
                                            {iconMap[icon]}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block font-serif font-bold text-stone-700 mb-2">
                                    {t.themeColor}
                                </label>
                                <div className="flex gap-2 flex-wrap">
                                    {availableColors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setNewThemeColor(color)}
                                            className={`w-10 h-10 rounded-lg border-2 transition-all ${newThemeColor === color
                                                ? 'border-stone-900 scale-110 shadow-lg'
                                                : 'border-transparent hover:scale-105'
                                                }`}
                                            style={{ backgroundColor: color }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-stone-200 p-4 bg-stone-50 flex justify-end gap-3">
                            <button
                                onClick={() => setShowAddModal(false)}
                                className="px-5 py-2.5 border border-stone-300 rounded-lg font-medium text-stone-600 hover:bg-stone-100"
                            >
                                {t.cancel}
                            </button>
                            <button
                                onClick={handleAddTheme}
                                disabled={!newThemeName.pt && !newThemeName.de}
                                className="px-5 py-2.5 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {t.save}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm overflow-hidden">
                        <div className="p-6 text-center">
                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Trash2 className="w-8 h-8 text-red-600" />
                            </div>
                            <h3 className="text-lg font-serif font-bold text-stone-900 mb-2">
                                {t.deleteTheme}
                            </h3>
                            <p className="text-stone-600">{t.confirmDelete}</p>
                        </div>
                        <div className="border-t border-stone-200 p-4 bg-stone-50 flex justify-center gap-3">
                            <button
                                onClick={() => setShowDeleteConfirm(null)}
                                className="px-5 py-2.5 border border-stone-300 rounded-lg font-medium text-stone-600 hover:bg-stone-100"
                            >
                                {t.cancel}
                            </button>
                            <button
                                onClick={() => handleDeleteTheme(showDeleteConfirm)}
                                className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700"
                            >
                                {t.deleteTheme}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
