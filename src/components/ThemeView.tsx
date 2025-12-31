import { useState } from 'react';
import {
    Book, Scale, FileText, Brain, ChevronDown, ChevronRight, CheckCircle,
    AlertTriangle, Gavel, Info, Key, Layers, ArrowRight, ArrowLeft,
    Baby, GraduationCap, ArrowLeftCircle, Upload, Heart, Shield, Star, Award, Target,
    Lock, Unlock, Users, User, Eye, Flag, Bookmark
} from 'lucide-react';
import type { Theme, Topic, CaseInfo, Flashcard, VocabularyItem, MethodologyStep } from '../types';
import { uiTranslations } from '../translations';
import type { Language } from '../translations';
import { ImportModal } from './ImportModal';
import { saveTheme } from '../storage';
import type { PromptType } from '../prompts';

// Icon mapping
const iconComponents: Record<string, React.ReactNode> = {
    AlertTriangle: <AlertTriangle className="w-5 h-5" />,
    Info: <Info className="w-5 h-5" />,
    FileText: <FileText className="w-5 h-5" />,
    CheckCircle: <CheckCircle className="w-5 h-5" />,
    Scale: <Scale className="w-5 h-5" />,
    Book: <Book className="w-5 h-5" />,
    Brain: <Brain className="w-5 h-5" />,
    Gavel: <Gavel className="w-5 h-5" />,
    Key: <Key className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Heart: <Heart className="w-5 h-5" />,
    Shield: <Shield className="w-5 h-5" />,
    Star: <Star className="w-5 h-5" />,
    Award: <Award className="w-5 h-5" />,
    Target: <Target className="w-5 h-5" />,
    Flag: <Flag className="w-5 h-5" />,
    Bookmark: <Bookmark className="w-5 h-5" />,
    Lock: <Lock className="w-5 h-5" />,
    Unlock: <Unlock className="w-5 h-5" />,
    Users: <Users className="w-5 h-5" />,
    User: <User className="w-5 h-5" />,
    Eye: <Eye className="w-5 h-5" />,
};

interface ThemeViewProps {
    theme: Theme;
    onBack: () => void;
    lang: Language;
    onLanguageChange: (lang: Language) => void;
    onThemeUpdate: (theme: Theme) => void;
}

// --- SUB-COMPONENTS ---

const TopicCard = ({ topic, lang }: { topic: Topic; lang: Language }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="bg-[#fffefb] border border-stone-200 rounded-sm shadow-md mb-4 overflow-hidden hover:shadow-lg transition-shadow duration-300">
            <div
                className="p-5 flex items-center justify-between cursor-pointer bg-[#f9f7f2] border-b border-stone-200 hover:bg-[#f2efe8] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-4">
                    <div className="text-amber-700 p-2 border border-amber-700/20 rounded-full bg-amber-50">
                        {iconComponents[topic.icon] || <Book className="w-5 h-5" />}
                    </div>
                    <h3 className="font-serif text-lg text-stone-900 tracking-wide font-medium">{topic.title[lang]}</h3>
                </div>
                {isOpen ? <ChevronDown className="text-amber-800" /> : <ChevronRight className="text-stone-400" />}
            </div>

            {isOpen && (
                <div className="p-5 bg-[#fffefb]">
                    <p className="text-sm text-stone-600 mb-5 italic border-l-4 border-amber-600 pl-4 font-serif leading-relaxed">
                        {topic.description[lang]}
                    </p>
                    <div className="space-y-4">
                        {topic.articles.map((item, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:items-baseline gap-3 text-sm border-b border-stone-100 pb-3 last:border-0">
                                <span className="font-bold text-amber-900 font-serif min-w-[100px] whitespace-nowrap">{item.code} {item.art}</span>
                                <span className="text-stone-700 leading-relaxed">{item.desc[lang]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

const VocabularySection = ({ vocabulary, lang }: { vocabulary: VocabularyItem[]; lang: Language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const t = uiTranslations[lang];
    const primaryKey = lang === 'pt' ? 'pt' : 'de';
    const secondaryKey = lang === 'pt' ? 'de' : 'pt';

    if (vocabulary.length === 0) return null;

    return (
        <div className="mb-8 border border-amber-200 rounded-sm bg-[#fffdf5] shadow-sm">
            <div
                className="p-4 flex items-center justify-between cursor-pointer hover:bg-[#fdf8e6] transition-colors"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-3 text-amber-900 font-serif font-bold tracking-wide">
                    <Key className="w-5 h-5" />
                    {t.vocabTitle}
                </div>
                {isOpen ? <ChevronDown className="text-amber-800" /> : <ChevronRight className="text-amber-700/50" />}
            </div>

            {isOpen && (
                <div className="p-6 bg-[#fffdf5] border-t border-amber-100 grid gap-4 md:grid-cols-2">
                    <div className="col-span-full text-xs text-amber-800/70 mb-2 italic font-serif text-center uppercase tracking-widest">{t.vocabDesc}</div>
                    {vocabulary.map((item, idx) => (
                        <div key={idx} className="flex flex-col border-b border-amber-100 pb-2">
                            <span className="font-serif font-bold text-stone-900">{item[primaryKey]}</span>
                            <span className="text-stone-600 text-sm font-medium">{item[secondaryKey]}</span>
                            {item.usage && <span className="text-xs text-amber-700/60 mt-1 italic font-serif">{item.usage}</span>}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const FlashcardSection = ({ data, lang }: { data: Flashcard[]; lang: Language }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const t = uiTranslations[lang];

    if (!data || data.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-lg border border-stone-200">
                <Layers className="w-12 h-12 mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500 font-serif">{t.noData}</p>
            </div>
        );
    }

    const safeIndex = currentIndex >= data.length ? 0 : currentIndex;
    const currentCard = data[safeIndex];

    const nextCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev + 1) % data.length), 200);
    };

    const prevCard = () => {
        setIsFlipped(false);
        setTimeout(() => setCurrentIndex((prev) => (prev - 1 + data.length) % data.length), 200);
    };

    return (
        <div className="max-w-3xl mx-auto">
            <div className="flex justify-between items-center mb-6 text-sm text-stone-500 font-serif">
                <span className="tracking-widest uppercase text-xs font-bold">{t.cardCounter} {safeIndex + 1} / {data.length}</span>
                <div className="flex gap-3">
                    <button onClick={prevCard} className="p-2 border border-stone-300 rounded-sm hover:bg-stone-200 text-stone-600 transition disabled:opacity-30" disabled={data.length <= 1}>
                        <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button onClick={nextCard} className="p-2 border border-stone-300 rounded-sm hover:bg-stone-200 text-stone-600 transition disabled:opacity-30" disabled={data.length <= 1}>
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <div className="relative h-96 w-full perspective-1000 cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
                <div className={`relative w-full h-full transition-all duration-700 transform-style-3d shadow-2xl rounded-sm ${isFlipped ? 'rotate-y-180' : ''}`}>

                    {/* FRONT */}
                    <div className="absolute w-full h-full bg-[#fdfbf7] border-4 border-double border-stone-300 rounded-sm p-10 flex flex-col items-center justify-center backface-hidden">
                        <div className="absolute top-4 left-4 w-16 h-16 border-t border-l border-stone-300" />
                        <div className="absolute bottom-4 right-4 w-16 h-16 border-b border-r border-stone-300" />
                        <div className="bg-stone-100 p-4 rounded-full mb-6 border border-stone-200 shadow-inner">
                            <Scale className="w-10 h-10 text-stone-700" />
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-center text-stone-900 leading-relaxed max-w-lg">
                            {currentCard.question[lang]}
                        </h3>
                        <div className="mt-auto pt-6">
                            <span className="text-xs font-bold text-amber-700 uppercase tracking-[0.2em] border-b border-amber-700 pb-1">
                                {t.flipCard}
                            </span>
                        </div>
                    </div>

                    {/* BACK */}
                    <div className="absolute w-full h-full bg-[#2c241b] text-amber-50 rounded-sm p-10 flex flex-col items-center justify-center rotate-y-180 backface-hidden overflow-y-auto border-4 border-double border-amber-900">
                        <div className="text-center w-full max-w-lg">
                            <p className="text-lg leading-loose font-serif whitespace-pre-line mb-8 text-amber-50/90">
                                {currentCard.answer[lang]}
                            </p>
                            <div className="mt-4 pt-6 border-t border-amber-800/50 w-full">
                                <span className="text-xs text-amber-500 uppercase font-bold block mb-2 tracking-widest">
                                    {t.compareTitle}
                                </span>
                                <p className="text-white font-medium italic font-serif text-xl">
                                    "{currentCard.keyPoint[lang]}"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-8 text-center text-stone-400 text-xs italic font-serif">
                (Clique no cartão para virar / Karte zum Wenden anklicken)
            </div>
        </div>
    );
};

const SummaryTable = ({ caseInfo, lang }: { caseInfo: CaseInfo; lang: Language }) => {
    const t = uiTranslations[lang];

    return (
        <div className="mt-12 overflow-hidden bg-white rounded-sm border-2 border-stone-800 shadow-md">
            <div className="p-5 border-b-2 border-stone-800 bg-[#e8e6e1] flex items-center gap-3">
                <Scale className="w-6 h-6 text-stone-800" />
                <h4 className="text-xl font-serif font-bold text-stone-900 uppercase tracking-wide">
                    {t.summaryTitle}
                </h4>
            </div>
            <table className="min-w-full text-left">
                <tbody className="divide-y divide-stone-200">
                    <tr className="bg-[#fcfbf9]">
                        <td className="p-5 font-serif font-bold text-stone-600 w-1/3 uppercase text-xs tracking-widest">Problema Central</td>
                        <td className="p-5 text-stone-900 font-serif text-lg">{caseInfo.issues.join(', ')}</td>
                    </tr>
                    <tr>
                        <td className="p-5 font-serif font-bold text-stone-600 w-1/3 uppercase text-xs tracking-widest">Artigos</td>
                        <td className="p-5 text-red-800 font-mono font-bold text-base bg-red-50/30">
                            {caseInfo.articles.join(', ')}
                        </td>
                    </tr>
                    <tr className="bg-[#f3f9f4]">
                        <td className="p-5 font-serif font-bold text-green-800 w-1/3 uppercase text-xs tracking-widest">Veredicto</td>
                        <td className="p-5 font-serif font-medium text-green-900 text-xl leading-relaxed">{caseInfo.verdict[lang]}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const CaseStudySolver = ({ cases, methodology, lang }: { cases: CaseInfo[]; methodology: MethodologyStep[]; lang: Language }) => {
    const [showSolution, setShowSolution] = useState(false);
    const [activeCase, setActiveCase] = useState(cases[0]?.id || '');
    const t = uiTranslations[lang];

    const currentCase = cases.find(c => c.id === activeCase);

    if (cases.length === 0) {
        return (
            <div className="text-center p-10 bg-white rounded-lg border border-stone-200">
                <Gavel className="w-12 h-12 mx-auto text-stone-300 mb-4" />
                <p className="text-stone-500 font-serif">{t.noData}</p>
            </div>
        );
    }

    if (!currentCase) return null;

    return (
        <div className="bg-[#fffefb] rounded-sm shadow-md p-8 border border-stone-200">
            <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-6 border-b border-stone-100 pb-6">
                <div className="flex items-center gap-3">
                    <div className="bg-red-50 text-red-900 px-4 py-1.5 rounded-sm text-xs font-bold uppercase tracking-widest border border-red-100">
                        Caso Prático
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-stone-900">{t.selectCase}</h2>
                </div>
                <div className="flex flex-wrap gap-3 bg-stone-100 p-1.5 rounded-sm">
                    {cases.map((c) => (
                        <button
                            key={c.id}
                            onClick={() => setActiveCase(c.id)}
                            className={`px-4 py-2 rounded-sm text-sm font-serif font-medium transition-all ${activeCase === c.id ? 'bg-white text-stone-900 shadow-sm border border-stone-200' : 'text-stone-500 hover:text-stone-700'}`}
                        >
                            {c.title}
                        </button>
                    ))}
                </div>
            </div>

            <div className="bg-[#fcfbf9] p-6 rounded-sm mb-8 border-l-4 border-stone-800 shadow-sm">
                <h3 className="font-serif text-xl font-bold mb-1 text-stone-900">{currentCase.title}</h3>
                <h4 className="text-xs text-amber-700 font-bold uppercase tracking-widest mb-4">{currentCase.subtitle}</h4>
                <p className="text-stone-700 leading-relaxed font-serif text-lg">{currentCase.summary[lang]}</p>
            </div>

            <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full py-4 px-6 bg-stone-900 text-amber-50 rounded-sm font-serif text-lg hover:bg-stone-800 transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg border border-stone-900 group"
            >
                {showSolution ? <ChevronDown className="w-5 h-5" /> : <Gavel className="w-5 h-5 text-amber-200" />}
                {showSolution ? t.hideAnalysis : t.showAnalysis}
            </button>

            {showSolution && methodology.length > 0 && (
                <div className="mt-10 animate-fadeIn">
                    <div className="flex items-center justify-center mb-8">
                        <h3 className="font-serif font-bold text-2xl text-stone-900 flex items-center gap-3 pb-2 border-b-2 border-amber-600">
                            <Brain className="w-6 h-6 text-stone-500" />
                            {t.analysisTitle}
                        </h3>
                    </div>

                    <div className="space-y-8">
                        {methodology.map((step, index) => (
                            <div key={index} className="flex flex-col md:flex-row shadow-sm border border-stone-200 rounded-sm overflow-hidden">
                                <div className="md:w-1/3 bg-[#f5f4f0] p-6 border-b md:border-b-0 md:border-r border-stone-200 flex flex-col">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="bg-stone-900 text-amber-50 w-8 h-8 rounded-sm flex items-center justify-center font-serif font-bold shadow-sm">
                                            {index + 1}
                                        </span>
                                        <h4 className="font-serif font-bold text-stone-800 text-lg leading-tight">{step.title[lang]}</h4>
                                    </div>
                                    <p className="text-[10px] text-stone-400 uppercase font-bold mt-auto pt-4 tracking-widest border-t border-stone-300/50">{t.generalRule}</p>
                                    <p className="text-sm text-stone-600 mt-2 font-medium">{step.desc[lang]}</p>
                                </div>

                                <div className="md:w-2/3 p-6 bg-white relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-amber-600/20" />
                                    <p className="text-[10px] text-amber-700 uppercase font-bold mb-3 tracking-widest">{t.caseApplication}</p>
                                    <p className="text-stone-800 text-lg leading-relaxed font-serif">
                                        {(step[activeCase] as { pt: string; de: string })?.[lang] || '-'}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <SummaryTable lang={lang} caseInfo={currentCase} />
                </div>
            )}
        </div>
    );
};

// --- MAIN COMPONENT ---

export const ThemeView = ({ theme, onBack, lang, onLanguageChange, onThemeUpdate }: ThemeViewProps) => {
    const [activeTab, setActiveTab] = useState('quiz');
    const [importModal, setImportModal] = useState<{ open: boolean; type: PromptType } | null>(null);

    const t = uiTranslations[lang];

    const handleImport = async (type: PromptType, data: unknown[]) => {
        const updatedTheme = { ...theme };

        switch (type) {
            case 'topics':
                updatedTheme.topics = [...updatedTheme.topics, ...(data as Topic[])];
                break;
            case 'flashcards':
                if (activeTab === 'simple') {
                    updatedTheme.flashcardsSimple = [...updatedTheme.flashcardsSimple, ...(data as Flashcard[])];
                } else if (activeTab === 'exam') {
                    updatedTheme.flashcardsExam = [...updatedTheme.flashcardsExam, ...(data as Flashcard[])];
                } else {
                    updatedTheme.flashcardsPro = [...updatedTheme.flashcardsPro, ...(data as Flashcard[])];
                }
                break;
            case 'cases':
                updatedTheme.cases = [...updatedTheme.cases, ...(data as CaseInfo[])];
                break;
            case 'methodology':
                updatedTheme.methodology = [...updatedTheme.methodology, ...(data as MethodologyStep[])];
                break;
            case 'vocabulary':
                updatedTheme.vocabulary = [...updatedTheme.vocabulary, ...(data as VocabularyItem[])];
                break;
        }

        const saved = await saveTheme(updatedTheme);
        if (saved) {
            onThemeUpdate(saved);
        }
    };

    const ImportButton = ({ type, label }: { type: PromptType; label: string }) => (
        <button
            onClick={() => setImportModal({ open: true, type })}
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors text-sm font-medium"
        >
            <Upload className="w-4 h-4" />
            {label}
        </button>
    );

    return (
        <div className="min-h-screen bg-[#f4f1ea] text-stone-800 font-sans selection:bg-amber-200 selection:text-stone-900">
            {/* Header */}
            <header className="bg-[#2c241b] text-amber-50 shadow-xl border-b-4 border-amber-700 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>

                <div className="max-w-5xl mx-auto px-6 py-10 pr-24 relative z-10">
                    {/* Back Button */}
                    <button
                        onClick={onBack}
                        className="flex items-center gap-2 text-amber-400 hover:text-amber-200 transition-colors mb-4 text-sm font-medium"
                    >
                        <ArrowLeftCircle className="w-5 h-5" />
                        {t.backToDashboard}
                    </button>

                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-stone-800 border border-stone-600 rounded-sm shadow-lg" style={{ backgroundColor: theme.color }}>
                            {iconComponents[theme.icon] ?
                                <div className="text-white">{iconComponents[theme.icon]}</div> :
                                <Scale className="w-8 h-8 text-amber-500" />
                            }
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-4xl font-serif font-bold tracking-tight text-amber-50">
                                {theme.name[lang] || theme.name.de || theme.name.pt}
                            </h1>
                            <div className="h-1 w-24 bg-amber-600 mt-2"></div>
                        </div>
                    </div>
                    <p className="text-stone-400 mt-3 text-sm md:text-base font-serif italic ml-16">
                        {theme.description[lang] || theme.description.de || theme.description.pt}
                    </p>
                </div>

                {/* Language Switcher */}
                <div className="absolute top-6 right-6 flex bg-stone-900 rounded-sm p-1 border border-stone-700 shadow-lg z-50">
                    <button
                        onClick={() => onLanguageChange('pt')}
                        className={`px-4 py-1.5 rounded-sm text-xs font-bold font-serif tracking-widest transition-all ${lang === 'pt' ? 'bg-amber-800 text-white shadow-md' : 'text-stone-400 hover:text-amber-100'}`}
                    >
                        PT
                    </button>
                    <button
                        onClick={() => onLanguageChange('de')}
                        className={`px-4 py-1.5 rounded-sm text-xs font-bold font-serif tracking-widest transition-all ${lang === 'de' ? 'bg-amber-800 text-white shadow-md' : 'text-stone-400 hover:text-amber-100'}`}
                    >
                        DE
                    </button>
                </div>
            </header>

            {/* Navigation */}
            <div className="sticky top-0 z-20 bg-[#fffefb] shadow-md border-b border-stone-200">
                <div className="max-w-5xl mx-auto px-6 flex overflow-x-auto">
                    {[
                        { id: 'topics', label: t.tabs.topics, icon: Book },
                        { id: 'methodology', label: t.tabs.method, icon: Brain },
                        { id: 'cases', label: t.tabs.cases, icon: Gavel },
                        { id: 'quiz', label: t.tabs.quiz, icon: Layers },
                        { id: 'simple', label: t.tabs.simple, icon: Baby },
                        { id: 'exam', label: t.tabs.exam, icon: GraduationCap },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                group relative px-6 py-5 font-serif font-bold text-sm uppercase tracking-wider transition-colors
                ${activeTab === tab.id ? 'text-amber-800 bg-[#f9f7f2]' : 'text-stone-500 hover:text-stone-800 hover:bg-stone-50'}
              `}
                        >
                            <span className="flex items-center gap-2 relative z-10">
                                <tab.icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-amber-700' : 'text-stone-400 group-hover:text-stone-600'}`} />
                                {tab.label}
                            </span>
                            {activeTab === tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-700"></span>
                            )}
                            {activeTab !== tab.id && (
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-stone-200 group-hover:bg-stone-300 transition-all"></span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-5xl mx-auto px-6 py-12">

                {/* VIEW: TOPICS */}
                {activeTab === 'topics' && (
                    <div className="animate-fadeIn space-y-6">
                        <div className="flex justify-between items-center mb-6">
                            <div className="bg-[#2c241b] text-amber-50 rounded-sm p-5 shadow-lg flex gap-4 items-start border-l-4 border-amber-600 flex-1">
                                <Info className="text-amber-500 flex-shrink-0 mt-1" />
                                <div>
                                    <h3 className="font-serif font-bold text-lg mb-1">Guia de Siglas Jurídicas</h3>
                                    <p className="text-sm text-stone-300 leading-relaxed opacity-90">
                                        {t.legend}
                                    </p>
                                </div>
                            </div>
                            <div className="ml-4">
                                <ImportButton type="topics" label={t.importTopics} />
                            </div>
                        </div>

                        {theme.topics.length === 0 ? (
                            <div className="text-center p-10 bg-white rounded-lg border border-stone-200">
                                <Book className="w-12 h-12 mx-auto text-stone-300 mb-4" />
                                <p className="text-stone-500 font-serif">{t.noData}</p>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {theme.topics.map(topic => (
                                    <TopicCard key={topic.id} topic={topic} lang={lang} />
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* VIEW: METHODOLOGY */}
                {activeTab === 'methodology' && (
                    <div className="space-y-10 animate-fadeIn">
                        <div className="flex justify-between items-center">
                            <div className="bg-white p-10 rounded-sm shadow-sm border border-stone-200 text-center relative overflow-hidden flex-1">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-stone-900"></div>
                                <h2 className="text-3xl font-serif font-bold mb-4 text-stone-900">{t.analysisTitle}</h2>
                                <p className="text-stone-600 italic font-serif text-lg">{lang === 'pt' ? 'O "Algoritmo de Ouro" para exames jurídicos' : 'Der "Goldene Algorithmus" für juristische Prüfungen'}</p>
                            </div>
                            <div className="ml-4">
                                <ImportButton type="methodology" label={t.importMethodology} />
                            </div>
                        </div>

                        {theme.methodology.length === 0 ? (
                            <div className="text-center p-10 bg-white rounded-lg border border-stone-200">
                                <Brain className="w-12 h-12 mx-auto text-stone-300 mb-4" />
                                <p className="text-stone-500 font-serif">{t.noData}</p>
                            </div>
                        ) : (
                            <div className="relative border-l-2 border-stone-300 ml-6 space-y-8 py-2">
                                {theme.methodology.map((step, idx) => (
                                    <div key={idx} className="relative pl-10 group">
                                        <div className="absolute -left-[17px] top-0 w-9 h-9 bg-stone-100 border-2 border-stone-400 text-stone-700 rounded-full flex items-center justify-center font-bold font-serif shadow-sm group-hover:bg-amber-700 group-hover:text-white group-hover:border-amber-700 transition-colors z-10">
                                            {idx + 1}
                                        </div>

                                        <div className="bg-white p-6 rounded-sm border border-stone-200 shadow-sm hover:shadow-md transition-all hover:border-amber-300 relative">
                                            <div className="absolute top-4 -left-10 w-10 h-0.5 bg-stone-300 group-hover:bg-amber-300 transition-colors"></div>

                                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                <div>
                                                    <h4 className="font-serif font-bold text-xl text-stone-900">{step.title[lang]}</h4>
                                                    <p className="text-stone-600 mt-2 font-serif leading-relaxed">{step.desc[lang]}</p>
                                                </div>
                                                <div className="flex-shrink-0">
                                                    <span className="text-xs font-bold text-stone-400 uppercase tracking-widest border border-stone-200 px-2 py-1 rounded-sm bg-stone-50">
                                                        Etapa Obrigatória
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* VIEW: CASES */}
                {activeTab === 'cases' && (
                    <div className="space-y-10 animate-fadeIn">
                        <div className="flex justify-end gap-3">
                            <ImportButton type="cases" label={t.importCases} />
                            <ImportButton type="vocabulary" label={t.importVocabulary} />
                        </div>
                        <VocabularySection vocabulary={theme.vocabulary} lang={lang} />
                        <CaseStudySolver cases={theme.cases} methodology={theme.methodology} lang={lang} />
                    </div>
                )}

                {/* VIEW: QUIZ/FLASHCARDS (PRO) */}
                {activeTab === 'quiz' && (
                    <div className="space-y-10 animate-fadeIn">
                        <div className="flex justify-between items-start">
                            <div className="bg-[#2c241b] text-amber-50 p-8 rounded-sm shadow-md border-b-4 border-amber-800 text-center flex-1">
                                <Layers className="w-10 h-10 mx-auto text-amber-500 mb-4" />
                                <h2 className="text-3xl font-serif font-bold mb-3">{t.tabs.quiz}</h2>
                                <p className="text-stone-300 font-serif italic max-w-2xl mx-auto">
                                    {lang === 'pt'
                                        ? "O domínio das definições é a base da argumentação jurídica. Teste o seu conhecimento abaixo."
                                        : "Die Beherrschung der Definitionen ist die Grundlage der juristischen Argumentation. Testen Sie Ihr Wissen unten."}
                                </p>
                            </div>
                            <div className="ml-4">
                                <ImportButton type="flashcards" label={t.importFlashcardsPro} />
                            </div>
                        </div>

                        <FlashcardSection lang={lang} data={theme.flashcardsPro} />

                        <div className="mt-16 pt-10 border-t border-stone-200">
                            <VocabularySection vocabulary={theme.vocabulary} lang={lang} />
                        </div>
                    </div>
                )}

                {/* VIEW: FLASHCARDS (SIMPLE) */}
                {activeTab === 'simple' && (
                    <div className="space-y-10 animate-fadeIn">
                        <div className="flex justify-between items-start">
                            <div className="bg-[#e8f5e9] text-green-900 p-8 rounded-sm shadow-md border-b-4 border-green-600 text-center flex-1">
                                <Baby className="w-10 h-10 mx-auto text-green-600 mb-4" />
                                <h2 className="text-3xl font-serif font-bold mb-3">{t.tabs.simple}</h2>
                                <p className="text-green-800 font-serif italic max-w-2xl mx-auto">
                                    {lang === 'pt'
                                        ? "Conceitos explicados de forma simples para quem está a começar."
                                        : "Konzepte einfach erklärt für Anfänger."}
                                </p>
                            </div>
                            <div className="ml-4">
                                <ImportButton type="flashcards" label={t.importFlashcardsSimple} />
                            </div>
                        </div>

                        <FlashcardSection lang={lang} data={theme.flashcardsSimple} />
                    </div>
                )}

                {/* VIEW: FLASHCARDS (EXAM) */}
                {activeTab === 'exam' && (
                    <div className="space-y-10 animate-fadeIn">
                        <div className="flex justify-between items-start">
                            <div className="bg-[#fff3e0] text-orange-900 p-8 rounded-sm shadow-md border-b-4 border-orange-600 text-center flex-1">
                                <GraduationCap className="w-10 h-10 mx-auto text-orange-600 mb-4" />
                                <h2 className="text-3xl font-serif font-bold mb-3">{t.tabs.exam}</h2>
                                <p className="text-orange-800 font-serif italic max-w-2xl mx-auto">
                                    {lang === 'pt'
                                        ? "Respostas curtas e diretas, como exigido em exame."
                                        : "Kurze und direkte Antworten, wie in der Prüfung gefordert."}
                                </p>
                            </div>
                            <div className="ml-4">
                                <ImportButton type="flashcards" label={t.importFlashcardsExam} />
                            </div>
                        </div>

                        <FlashcardSection lang={lang} data={theme.flashcardsExam} />
                    </div>
                )}
            </main>

            {/* Import Modal */}
            {importModal?.open && (
                <ImportModal
                    isOpen={importModal.open}
                    onClose={() => setImportModal(null)}
                    onImport={(data) => handleImport(importModal.type, data)}
                    promptType={importModal.type}
                    lang={lang}
                />
            )}

            <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </div>
    );
};
