// Types for the Learning Platform

export interface BilingualText {
  pt: string;
  de: string;
}

// Topics & Articles
export interface Article {
  code: string;
  art: string;
  desc: BilingualText;
}

export interface Topic {
  id: string;
  title: BilingualText;
  icon: string; // Icon name from lucide-react
  description: BilingualText;
  articles: Article[];
}

// Methodology Steps
export interface MethodologyStep {
  title: BilingualText;
  desc: BilingualText;
  [key: string]: BilingualText; // For case-specific applications
}

// Case Studies
export interface CaseInfo {
  id: string;
  title: string;
  subtitle: string;
  summary: BilingualText;
  verdict: BilingualText;
  articles: string[];
  issues: string[];
}

// Flashcards
export interface Flashcard {
  id: number;
  question: BilingualText;
  answer: BilingualText;
  keyPoint: BilingualText;
}

// Vocabulary
export interface VocabularyItem {
  pt: string;
  de: string;
  usage: string;
}

// Theme (A complete study topic)
export interface Theme {
  id: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  color: string;
  topics: Topic[];
  methodology: MethodologyStep[];
  cases: CaseInfo[];
  flashcardsPro: Flashcard[];
  flashcardsSimple: Flashcard[];
  flashcardsExam: Flashcard[];
  vocabulary: VocabularyItem[];
  createdAt: string;
  updatedAt: string;
}

// JSON Import Formats (for validation)
export interface TopicImport {
  id: string;
  title: BilingualText;
  icon: string;
  description: BilingualText;
  articles: Article[];
}

export interface FlashcardImport {
  id: number;
  question: BilingualText;
  answer: BilingualText;
  keyPoint: BilingualText;
}

export interface CaseImport {
  id: string;
  title: string;
  subtitle: string;
  summary: BilingualText;
  verdict: BilingualText;
  articles: string[];
  issues: string[];
}

export interface VocabularyImport {
  pt: string;
  de: string;
  usage: string;
}

export interface MethodologyStepImport {
  title: BilingualText;
  desc: BilingualText;
  [caseId: string]: BilingualText;
}
