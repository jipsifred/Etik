// AI Prompts for generating content in the correct JSON format

export const aiPrompts = {
    topics: {
        title: "Themen & Artikel / Topics & Articles",
        prompt: `Du bist ein KI-Assistent, der Lernmaterialien im JSON-Format erstellt. Erstelle Themen und zugehörige Gesetzesartikel für ein juristisches Lernmodul.

WICHTIG: Gib NUR das JSON aus, ohne Erklärungen oder Markdown-Code-Blocks.

Das JSON muss ein Array von Objekten mit folgender Struktur sein:

[
  {
    "id": "eindeutige-id-lowercase-mit-bindestrichen",
    "title": {
      "pt": "Titel auf Portugiesisch",
      "de": "Titel auf Deutsch"
    },
    "icon": "IconName",
    "description": {
      "pt": "Kurze Beschreibung auf Portugiesisch",
      "de": "Kurze Beschreibung auf Deutsch"
    },
    "articles": [
      {
        "code": "CP",
        "art": "143-145",
        "desc": {
          "pt": "Beschreibung des Artikels auf Portugiesisch",
          "de": "Beschreibung des Artikels auf Deutsch"
        }
      }
    ]
  }
]

REGELN:
1. "id" muss einzigartig, lowercase mit Bindestrichen sein (z.B. "resp-disc", "consentimento")
2. "icon" muss ein gültiger Lucide-Icon-Name sein: AlertTriangle, Info, FileText, CheckCircle, Scale, Book, Brain, Gavel, Key, Layers, Shield, Heart, Eye, Lock, Unlock, Users, User, Star, Award, Target, Flag, Bookmark
3. "code" sind Abkürzungen für Gesetze: CD (Standesrecht), CP (Strafrecht), CC (Zivilrecht), CPP (Strafprozess), CR (Verfassung)
4. "art" ist die Artikelnummer oder ein Bereich (z.B. "4.9", "143-145")
5. Alle Texte müssen in BEIDEN Sprachen (pt UND de) vorhanden sein

Erstelle jetzt Themen und Artikel für das folgende Rechtsgebiet: [THEMA HIER EINFÜGEN]`,
        example: `[
  {
    "id": "resp-disc",
    "title": { "pt": "Responsabilidade Disciplinar", "de": "Disziplinarrechtliche Verantwortung" },
    "icon": "AlertTriangle",
    "description": { 
      "pt": "Negligência, erro médico e consequências disciplinares.",
      "de": "Fahrlässigkeit, ärztliche Kunstfehler und disziplinarische Folgen."
    },
    "articles": [
      { "code": "CD", "art": "4.9, 63.1, 44", "desc": { "pt": "Dever de competência, respeito pela vida.", "de": "Kompetenzpflicht, Respekt vor dem Leben." } },
      { "code": "CP", "art": "143-145", "desc": { "pt": "Ofensa à integridade física. Negligência.", "de": "Körperverletzung. Fahrlässigkeit." } }
    ]
  }
]`
    },

    flashcards: {
        title: "Flashcards",
        prompt: `Du bist ein KI-Assistent, der Lernkarten (Flashcards) im JSON-Format erstellt.

WICHTIG: Gib NUR das JSON aus, ohne Erklärungen oder Markdown-Code-Blocks.

Das JSON muss ein Array von Objekten mit folgender Struktur sein:

[
  {
    "id": 1,
    "question": {
      "pt": "Frage auf Portugiesisch",
      "de": "Frage auf Deutsch"
    },
    "answer": {
      "pt": "Antwort auf Portugiesisch. Kann mehrzeilig sein mit \\n für Zeilenumbrüche.",
      "de": "Antwort auf Deutsch. Kann mehrzeilig sein mit \\n für Zeilenumbrüche."
    },
    "keyPoint": {
      "pt": "Kurze Zusammenfassung / Kernpunkt auf Portugiesisch",
      "de": "Kurze Zusammenfassung / Kernpunkt auf Deutsch"
    }
  }
]

REGELN:
1. "id" muss eine einzigartige Zahl sein (1, 2, 3, ...)
2. "question" sollte kurz und prägnant sein
3. "answer" kann detaillierter sein, nutze \\n für Absätze
4. "keyPoint" ist die wichtigste Erkenntnis in einem kurzen Satz
5. Alle Texte MÜSSEN in BEIDEN Sprachen (pt UND de) vorhanden sein

FLASHCARD-TYPEN:
- PRO: Detaillierte, examenstaugliche Fragen mit vollständigen Antworten
- BASIC (Baby): Einfache Erklärungen für Anfänger, alltagsnahe Sprache
- EXAM: Kurze, präzise Antworten wie in einer Prüfung erwartet

Erstelle jetzt Flashcards ([PRO/BASIC/EXAM]) für das folgende Thema: [THEMA HIER EINFÜGEN]`,
        example: `[
  {
    "id": 1,
    "question": { "pt": "Distinga Atestado de Relatório.", "de": "Unterscheiden Sie Attest und Gutachten." },
    "answer": { "pt": "Atestado: Documento simples, declara um facto.\\nRelatório: Documento completo, descreve perícia.", "de": "Attest: Einfaches Dokument.\\nGutachten: Detailliertes Dokument." },
    "keyPoint": { "pt": "Atestado = Simples. Relatório = Detalhado.", "de": "Attest = Einfach. Gutachten = Detailliert." }
  }
]`
    },

    cases: {
        title: "Fallstudien / Casos Práticos",
        prompt: `Du bist ein KI-Assistent, der juristische Fallstudien im JSON-Format erstellt.

WICHTIG: Gib NUR das JSON aus, ohne Erklärungen oder Markdown-Code-Blocks.

Das JSON muss ein Array von Objekten mit folgender Struktur sein:

[
  {
    "id": "eindeutige-id-lowercase",
    "title": "Kurzer Fallname (kann einsprachig sein)",
    "subtitle": "Untertitel mit Schlüsselthemen",
    "summary": {
      "pt": "Zusammenfassung des Falls auf Portugiesisch. Wer, was, wann, Konsequenzen.",
      "de": "Zusammenfassung des Falls auf Deutsch. Wer, was, wann, Konsequenzen."
    },
    "verdict": {
      "pt": "Das Urteil/Ergebnis auf Portugiesisch.",
      "de": "Das Urteil/Ergebnis auf Deutsch."
    },
    "articles": ["CC 483", "CP 142", "CD 22"],
    "issues": ["Hauptproblem 1", "Hauptproblem 2"]
  }
]

REGELN:
1. "id" muss einzigartig und lowercase sein (z.B. "perruche", "ectopica")
2. "title" und "subtitle" können einsprachig sein (meist Latein/Fachbegriffe)
3. "summary" und "verdict" MÜSSEN in BEIDEN Sprachen sein
4. "articles" ist ein Array von Gesetzesartikeln als Strings
5. "issues" sind die rechtlichen Kernfragen/Probleme

Erstelle jetzt Fallstudien für das folgende Rechtsgebiet: [THEMA HIER EINFÜGEN]`,
        example: `[
  {
    "id": "perruche",
    "title": "Caso Perruche",
    "subtitle": "Erro Diagnóstico / Wrongful Life",
    "summary": {
      "pt": "Dr. X não diagnosticou rubéola numa grávida. Nicolas nasceu com deficiência grave.",
      "de": "Dr. X hat Röteln nicht diagnostiziert. Nicolas wurde behindert geboren."
    },
    "verdict": {
      "pt": "Indemnização aos pais (Sim). Indemnização à criança (Não).",
      "de": "Schadenersatz Eltern (Ja). Schadenersatz Kind (Nein)."
    },
    "articles": ["CC 483", "CC 485", "CP 142"],
    "issues": ["Wrongful Birth", "Wrongful Life"]
  }
]`
    },

    methodology: {
        title: "Methodik / Metodologia",
        prompt: `Du bist ein KI-Assistent, der eine Lösungsmethodik für juristische Fälle im JSON-Format erstellt.

WICHTIG: Gib NUR das JSON aus, ohne Erklärungen oder Markdown-Code-Blocks.

Das JSON muss ein Array von Schritten sein. Jeder Schritt hat einen Titel, eine allgemeine Beschreibung und fallspezifische Anwendungen:

[
  {
    "title": {
      "pt": "1. Factos Clínicos",
      "de": "1. Sachverhalt & Fakten"
    },
    "desc": {
      "pt": "Allgemeine Anweisung auf Portugiesisch",
      "de": "Allgemeine Anweisung auf Deutsch"
    },
    "fall-id-1": {
      "pt": "Anwendung auf Fall 1 auf Portugiesisch",
      "de": "Anwendung auf Fall 1 auf Deutsch"
    },
    "fall-id-2": {
      "pt": "Anwendung auf Fall 2 auf Portugiesisch",
      "de": "Anwendung auf Fall 2 auf Deutsch"
    }
  }
]

REGELN:
1. Die Methodik sollte 4-6 Schritte haben
2. "title" enthält die Schrittnummer und einen kurzen Titel
3. "desc" ist die allgemeine Anweisung, was in diesem Schritt zu tun ist
4. Für jeden Fall (identifiziert durch seine "id" aus den Fallstudien) gibt es eine spezifische Anwendung
5. Alle Texte MÜSSEN in BEIDEN Sprachen (pt UND de) vorhanden sein

TYPISCHE SCHRITTE:
1. Fakten / Sachverhalt
2. Rechtliches Problem identifizieren
3. Gesetzliche Grundlagen
4. Analyse / Diskussion
5. Fazit / Urteil

Erstelle jetzt eine Lösungsmethodik für die folgenden Fälle: [FALL-IDS HIER EINFÜGEN]`,
        example: `[
  {
    "title": { "pt": "1. Factos Clínicos", "de": "1. Sachverhalt & Fakten" },
    "desc": { "pt": "Identificar cronologia e atos médicos.", "de": "Zeitablauf und ärztliche Handlungen identifizieren." },
    "perruche": { "pt": "Médico não diagnosticou rubéola.", "de": "Arzt hat Röteln nicht diagnostiziert." },
    "ectopica": { "pt": "Menor apresenta-se sozinha.", "de": "Minderjährige kommt allein." }
  }
]`
    },

    vocabulary: {
        title: "Vokabular / Vocabulário",
        prompt: `Du bist ein KI-Assistent, der juristisches Fachvokabular im JSON-Format erstellt.

WICHTIG: Gib NUR das JSON aus, ohne Erklärungen oder Markdown-Code-Blocks.

Das JSON muss ein Array von Objekten mit folgender Struktur sein:

[
  {
    "pt": "Portugiesischer Begriff",
    "de": "Deutscher Begriff",
    "usage": "Kurze Erklärung/Kontext (kann einsprachig Englisch/Deutsch sein)"
  }
]

REGELN:
1. "pt" ist der portugiesische Fachbegriff
2. "de" ist die deutsche Übersetzung/Entsprechung
3. "usage" erklärt kurz, wann/wie der Begriff verwendet wird
4. Fokus auf Fachvokabular, das in Prüfungen relevant ist

Erstelle jetzt Vokabular für das folgende Rechtsgebiet: [THEMA HIER EINFÜGEN]`,
        example: `[
  { "pt": "Atestado vs Relatório", "de": "Attest vs Gutachten", "usage": "Simple vs Detailed" },
  { "pt": "Inimputabilidade", "de": "Schuldunfähigkeit", "usage": "<16 years or Mental Disorder" },
  { "pt": "Consentimento Presumido", "de": "Mutmaßliche Einwilligung", "usage": "Unconscious patients/Emergency" }
]`
    }
};

export type PromptType = keyof typeof aiPrompts;
