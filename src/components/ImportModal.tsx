import { useState } from 'react';
import { Copy, Check, Upload, X, FileText } from 'lucide-react';
import { aiPrompts } from '../prompts';
import type { PromptType } from '../prompts';
import { uiTranslations } from '../translations';
import type { Language } from '../translations';

interface ImportModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImport: (data: unknown[]) => void;
    promptType: PromptType;
    lang: Language;
}

export const ImportModal = ({ isOpen, onClose, onImport, promptType, lang }: ImportModalProps) => {
    const [jsonInput, setJsonInput] = useState('');
    const [error, setError] = useState('');
    const [promptCopied, setPromptCopied] = useState(false);
    const [showFormat, setShowFormat] = useState(false);

    const t = uiTranslations[lang];
    const promptData = aiPrompts[promptType];

    const handleImport = () => {
        try {
            const parsed = JSON.parse(jsonInput);
            if (!Array.isArray(parsed)) {
                setError(t.importError + ' (Erwartet: Array)');
                return;
            }
            onImport(parsed);
            setJsonInput('');
            setError('');
            onClose();
        } catch {
            setError(t.importError);
        }
    };

    const copyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(promptData.prompt);
            setPromptCopied(true);
            setTimeout(() => setPromptCopied(false), 2000);
        } catch {
            console.error('Failed to copy');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-[#fffefb] rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border-2 border-stone-300">
                {/* Header */}
                <div className="bg-[#2c241b] text-amber-50 p-5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Upload className="w-5 h-5 text-amber-400" />
                        <h2 className="text-xl font-serif font-bold">{promptData.title}</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-stone-700 rounded-lg transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                    {/* Copy Prompt Section */}
                    <div className="mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                            <h3 className="font-serif font-bold text-amber-900 flex items-center gap-2">
                                <FileText className="w-4 h-4" />
                                {t.copyPrompt}
                            </h3>
                            <button
                                onClick={copyPrompt}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${promptCopied
                                    ? 'bg-green-600 text-white'
                                    : 'bg-amber-700 text-white hover:bg-amber-800'
                                    }`}
                            >
                                {promptCopied ? (
                                    <>
                                        <Check className="w-4 h-4" />
                                        {t.promptCopied}
                                    </>
                                ) : (
                                    <>
                                        <Copy className="w-4 h-4" />
                                        {t.copyPrompt}
                                    </>
                                )}
                            </button>
                        </div>
                        <p className="text-sm text-amber-800 mb-3">
                            {lang === 'de'
                                ? 'Kopieren Sie diesen Prompt und fügen Sie ihn in eine KI (ChatGPT, Claude, etc.) ein. Die KI wird das JSON im korrekten Format generieren.'
                                : 'Copie este prompt e cole-o numa IA (ChatGPT, Claude, etc.). A IA irá gerar o JSON no formato correto.'}
                        </p>

                        {/* Toggle Format Example */}
                        <button
                            onClick={() => setShowFormat(!showFormat)}
                            className="text-sm text-amber-700 underline hover:text-amber-900"
                        >
                            {showFormat ? 'Format ausblenden' : `${t.jsonFormat} anzeigen`}
                        </button>

                        {showFormat && (
                            <pre className="mt-3 bg-stone-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto font-mono">
                                {promptData.example}
                            </pre>
                        )}
                    </div>

                    {/* JSON Input */}
                    <div className="mb-4">
                        <label className="block font-serif font-bold text-stone-700 mb-2">
                            {t.pasteJson}
                        </label>
                        <textarea
                            value={jsonInput}
                            onChange={(e) => {
                                setJsonInput(e.target.value);
                                setError('');
                            }}
                            className="w-full h-64 p-4 border-2 border-stone-300 rounded-lg font-mono text-sm focus:border-amber-500 focus:outline-none bg-white"
                            placeholder={`[\n  {\n    ...\n  }\n]`}
                        />
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                            {error}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="border-t border-stone-200 p-4 bg-stone-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 border border-stone-300 rounded-lg font-medium text-stone-600 hover:bg-stone-100 transition-colors"
                    >
                        {t.cancel}
                    </button>
                    <button
                        onClick={handleImport}
                        disabled={!jsonInput.trim()}
                        className="px-5 py-2.5 bg-stone-900 text-white rounded-lg font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                        <Upload className="w-4 h-4" />
                        {t.import}
                    </button>
                </div>
            </div>
        </div>
    );
};
