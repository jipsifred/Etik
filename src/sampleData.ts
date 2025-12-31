// Sample data for the Bioethics theme

import type { Theme } from './types';

export const sampleBioethicsTheme: Theme = {
    id: 'bioethics-medical-law',
    name: {
        pt: 'Bioética e Direito Médico',
        de: 'Bioethik und Medizinrecht'
    },
    description: {
        pt: 'Preparação para Exame - Legislação Portuguesa',
        de: 'Prüfungsvorbereitung - Portugiesisches Recht'
    },
    icon: 'Scale',
    color: '#8B4513',
    topics: [
        {
            id: 'resp-disc',
            title: { pt: 'Responsabilidade Disciplinar', de: 'Disziplinarrechtliche Verantwortung' },
            icon: 'AlertTriangle',
            description: {
                pt: 'Negligência, erro médico e consequências disciplinares.',
                de: 'Fahrlässigkeit, ärztliche Kunstfehler und disziplinarische Folgen.'
            },
            articles: [
                { code: 'CD', art: '4.9, 63.1, 44', desc: { pt: 'Dever de competência, respeito pela vida.', de: 'Kompetenzpflicht, Respekt vor dem Leben.' } },
                { code: 'CP', art: '143-145', desc: { pt: 'Ofensa à integridade física. Negligência.', de: 'Körperverletzung (einfach/schwer). Fahrlässigkeit.' } },
                { code: 'CC', art: '483, 485', desc: { pt: 'Responsabilidade civil. Obrigação de indemnizar.', de: 'Zivilrechtliche Haftung. Schadenersatzpflicht.' } }
            ]
        },
        {
            id: 'verdade',
            title: { pt: 'Revelação da Verdade', de: 'Wahrheitsfindung / Aufklärung' },
            icon: 'Info',
            description: {
                pt: 'O dever de informar o doente vs. privilégio terapêutico.',
                de: 'Aufklärungspflicht vs. Therapeutisches Privileg.'
            },
            articles: [
                { code: 'CD', art: '33, 25', desc: { pt: 'Informação ao doente. Direito a não saber.', de: 'Patienteninformation. Recht auf Nichtwissen.' } },
                { code: 'CP', art: '157', desc: { pt: 'Intervenções sem consentimento (arbitrárias).', de: 'Eigenmächtige Heilbehandlung (ohne Einwilligung).' } }
            ]
        },
        {
            id: 'sigilo',
            title: { pt: 'Segredo Profissional', de: 'Schweigepflicht / Berufsgeheimnis' },
            icon: 'FileText',
            description: {
                pt: 'Confidencialidade e justa causa para quebra de sigilo.',
                de: 'Vertraulichkeit und rechtfertigender Grund für den Bruch.'
            },
            articles: [
                { code: 'CD', art: '16, 24', desc: { pt: 'Sigilo abrange tudo o que o médico viu/ouviu.', de: 'Schweigepflicht umfasst alles Gesehene/Gehörte.' } },
                { code: 'CP', art: '195', desc: { pt: 'Crime de violação de segredo.', de: 'Straftatbestand der Verletzung des Berufsgeheimnisses.' } }
            ]
        },
        {
            id: 'consentimento',
            title: { pt: 'Consentimento', de: 'Einwilligung' },
            icon: 'CheckCircle',
            description: {
                pt: 'Consentimento Informado, Esclarecido e Livre.',
                de: 'Informierte, aufgeklärte und freie Einwilligung.'
            },
            articles: [
                { code: 'CD', art: '20, 21', desc: { pt: 'Consentimento presumido, expresso e menores.', de: 'Mutmaßliche, ausdrückliche Einwilligung; Minderjährige.' } },
                { code: 'CC', art: '340', desc: { pt: 'Exclusão da ilicitude pelo consentimento.', de: 'Rechtfertigungsgrund durch Einwilligung.' } },
                { code: 'CP', art: '38, 39, 156', desc: { pt: 'Consentimento presumido e extensão da intervenção.', de: 'Mutmaßliche Einwilligung und Erweiterung des Eingriffs.' } }
            ]
        },
        {
            id: 'ivg',
            title: { pt: 'IVG (Aborto)', de: 'Schwangerschaftsabbruch' },
            icon: 'Scale',
            description: {
                pt: 'Prazos legais, objeção de consciência.',
                de: 'Gesetzliche Fristen, Gewissensvorbehalt.'
            },
            articles: [
                { code: 'CP', art: '140, 142', desc: { pt: 'Punível vs. Não punível (ex: risco de vida).', de: 'Strafbar vs. Straffrei (z.B. Lebensgefahr).' } },
                { code: 'CD', art: '12, 63', desc: { pt: 'Respeito pela vida e Objeção de Consciência.', de: 'Respekt vor dem Leben und Gewissensverweigerung.' } }
            ]
        }
    ],
    methodology: [
        {
            title: { pt: "1. Factos Clínicos", de: "1. Sachverhalt & Fakten" },
            desc: {
                pt: "Identificar cronologia, atos médicos e dano. Quem fez o quê?",
                de: "Zeitablauf, ärztliche Handlungen und Schaden identifizieren. Wer hat was getan?"
            },
            perruche: {
                pt: "Médico não diagnosticou rubéola. Laboratório errou na análise. Criança nasceu com deficiência grave. Mãe queria abortar se houvesse doença.",
                de: "Arzt hat Röteln nicht diagnostiziert. Labor hat falsch analysiert. Kind wurde schwerbehindert geboren. Mutter wollte im Krankheitsfall abtreiben."
            },
            ectopica: {
                pt: "Menor (15) apresenta-se sozinha com dor. Diagnóstico apendicite -> Bloco. Cirurgia revela gravidez ectópica com risco de vida. Doente anestesiada. Pais chegam depois.",
                de: "Minderjährige (15) kommt allein mit Schmerzen. Diagnose Blinddarm -> OP. OP enthüllt Eileiterschwangerschaft mit Lebensgefahr. Patientin narkotisiert. Eltern kommen später."
            },
            perita: {
                pt: "Dra. Margarida observa Sr. Rui para seguro. Deteta doença grave não medicada. Diz 'fale com seu médico'. Doente só consegue consulta 3 meses depois e morre.",
                de: "Dr. Margarida untersucht Herrn Rui für Versicherung. Entdeckt unbehandelte schwere Krankheit. Sagt 'Sprechen Sie mit Ihrem Arzt'. Patient kriegt Termin erst in 3 Monaten und stirbt."
            },
            bebeMedicamento: {
                pt: "Izal nasceu via Fertilização in Vitro (FIV) + seleção genética (HLA) para ser dador compatível para a irmã (Leucemia). Processo feito nos EUA.",
                de: "Izal wurde per IVF + genetischer Selektion (HLA) geboren, um kompatibler Spender für die Schwester (Leukämie) zu sein. Prozess in den USA durchgeführt."
            }
        },
        {
            title: { pt: "2. Problema Ético-Jurídico", de: "2. Ethisch-Rechtliches Problem" },
            desc: {
                pt: "Qual é o conflito? Há nexo de causalidade?",
                de: "Was ist der Konflikt? Gibt es einen Kausalzusammenhang?"
            },
            perruche: {
                pt: "O erro impediu a mãe de exercer o direito ao aborto (autodeterminação). Questão: O médico causou a deficiência ou apenas o nascimento?",
                de: "Der Fehler verhinderte das Recht der Mutter auf Abtreibung (Selbstbestimmung). Frage: Hat der Arzt die Behinderung verursacht oder nur die Geburt?"
            },
            ectopica: {
                pt: "Doente é menor e chegou sozinha. Situação de emergência (risco vida). IVG necessária, mas doente anestesiada não pode consentir. Pais ausentes no momento crítico.",
                de: "Patientin ist minderjährig und allein. Notfall (Lebensgefahr). Abbruch nötig, aber narkotisierte Patientin kann nicht einwilligen. Eltern im kritischen Moment nicht da."
            },
            perita: {
                pt: "Conflito de papéis: Perita (interesses da seguradora) vs Médica (proteger a vida). Dever de sigilo vs Dever de informar médico assistente sobre risco iminente.",
                de: "Rollenkonflikt: Gutachterin (Versicherungsinteressen) vs Ärztin (Lebensschutz). Schweigepflicht vs Pflicht, den Hausarzt über drohende Gefahr zu informieren."
            },
            bebeMedicamento: {
                pt: "'Bebé Medicamento'. Ética de escolher embriões. O bebé é usado como um meio (instrumento) ou é um fim em si mesmo?",
                de: "'Rettungsbaby'. Ethik der Embryonenselektion. Wird das Baby als Mittel (Instrument) oder als Selbstzweck benutzt?"
            }
        },
        {
            title: { pt: "3. Enquadramento Legal", de: "3. Gesetzliche Grundlagen" },
            desc: {
                pt: "Selecionar artigos (CP, CC, CD).",
                de: "Relevante Artikel auswählen (Straf-, Zivil-, Standesrecht)."
            },
            perruche: {
                pt: "CC 483 (Responsabilidade Civil), CC 485 (Dever de Informação), CP 142 (IVG Legal), CR 24 (Inviolabilidade da Vida).",
                de: "CC 483 (Zivilhaftung), CC 485 (Informationspflicht), CP 142 (Legaler Abbruch), CR 24 (Unverletzlichkeit des Lebens)."
            },
            ectopica: {
                pt: "CD: Cuidado com menores. Respeito pela vida vs salvar a grávida. CP 142: IVG não punível (perigo morte). CP 156 / CD 22: Consentimento Presumido em urgência.",
                de: "CD: Sorgfalt bei Minderjährigen. Lebensschutz vs Rettung der Schwangeren. CP 142: Abbruch straffrei (Lebensgefahr). CP 156 / CD 22: Mutmaßliche Einwilligung im Notfall."
            },
            perita: {
                pt: "CD: Perito deve informar doente da função. Se detetar risco grave, deve comunicar ao médico assistente (exceção ao sigilo). Lei Proteção Dados.",
                de: "CD: Gutachter muss Patienten aufklären. Bei schwerem Risiko muss Hausarzt informiert werden (Ausnahme Schweigepflicht). Datenschutzgesetz."
            },
            bebeMedicamento: {
                pt: "Lei 32/2006 (PMA): Permite para infertilidade, proíbe eugenia. Lei 22/2007: Doação entre irmãos menores permitida se risco de vida e sem alternativa.",
                de: "Gesetz 32/2006 (PMA): Erlaubt bei Unfruchtbarkeit, verbietet Eugenik. Gesetz 22/2007: Spende unter Geschwistern erlaubt bei Lebensgefahr & Alternativlosigkeit."
            }
        },
        {
            title: { pt: "4. Análise (Discussão)", de: "4. Analyse & Diskussion" },
            desc: {
                pt: "Aplicar princípios bioéticos e jurisprudência.",
                de: "Bioethische Prinzipien und Rechtsprechung anwenden."
            },
            perruche: {
                pt: "Wrongful Birth (Pais): Aceite, pois perderam chance de escolha. Wrongful Life (Criança): Rejeitado, pois 'não nascer' não é preferível a 'nascer com deficiência'.",
                de: "Wrongful Birth (Eltern): Akzeptiert, da Wahlmöglichkeit genommen. Wrongful Life (Kind): Abgelehnt, da 'Nicht-Existenz' nicht vorzuziehen ist."
            },
            ectopica: {
                pt: "Emergência fatal. Esperar consentimento dos pais traz risco grave (atraso). Presume-se que representantes consentiriam se soubessem da gravidade. Médico agiu bem.",
                de: "Tödlicher Notfall. Warten auf Eltern bringt schweres Risiko (Verzögerung). Es wird vermutet, dass Vertreter zustimmen würden. Arzt handelte richtig."
            },
            perita: {
                pt: "A médica falhou ao não explicar papel e não contactar médico assistente perante risco de vida. O aviso verbal ao doente foi insuficiente para garantir a segurança.",
                de: "Die Ärztin versagte, indem sie ihre Rolle nicht erklärte und bei Lebensgefahr den Hausarzt nicht kontaktierte. Mündlicher Hinweis reichte nicht."
            },
            bebeMedicamento: {
                pt: "Conflito: Direito à vida (Erine) vs. Dignidade (Izal). Legalmente: Transplante é OK. PMA para 'criar dador' não é explícita na lei PT (zona cinzenta).",
                de: "Konflikt: Recht auf Leben (Erine) vs. Würde (Izal). Legal: Transplantation OK. PMA zur 'Erzeugung eines Spenders' im PT-Gesetz nicht explizit (Grauzone)."
            }
        },
        {
            title: { pt: "5. Conclusão", de: "5. Fazit / Urteil" },
            desc: {
                pt: "Veredicto final.",
                de: "Endgültiges Urteil."
            },
            perruche: {
                pt: "Médico paga indemnização aos pais (danos patrimoniais/morais). Não paga à criança pelo facto de estar viva.",
                de: "Arzt zahlt Schadenersatz an Eltern (Vermögens-/Immaterialschaden). Keine Zahlung an das Kind für die Tatsache, dass es lebt."
            },
            ectopica: {
                pt: "IVG necessária para salvar a vida. Consentimento expresso não exigido (urgência). Atuação da equipa foi ética, legal e deontologicamente correta.",
                de: "Abbruch notwendig zur Lebensrettung. Ausdrückliche Einwilligung nicht gefordert (Notfall). Handeln des Teams war ethisch, legal und korrekt."
            },
            perita: {
                pt: "Atuação incorreta. Violou dever de informação e proteção da vida. Devia ter assegurado que a informação chegava ao médico assistente.",
                de: "Unkorrektes Handeln. Verletzung der Informationspflicht und des Lebensschutzes. Hätte sicherstellen müssen, dass die Info den Hausarzt erreicht."
            },
            bebeMedicamento: {
                pt: "Doação de sangue do cordão é legal (salvar vida). Uso de PMA para criar o bebé é juridicamente duvidoso em Portugal.",
                de: "Nabelschnurblutspende ist legal (Lebensrettung). Nutzung von PMA zur Erzeugung des Babys ist in Portugal rechtlich zweifelhaft."
            }
        }
    ],
    cases: [
        {
            id: "perruche",
            title: "Caso Perruche",
            subtitle: "Erro Diagnóstico / Wrongful Life",
            summary: {
                pt: "Dr. X não diagnosticou rubéola numa grávida. Nicolas nasceu com deficiência grave. A mãe teria abortado se soubesse.",
                de: "Dr. X hat Röteln bei einer Schwangeren nicht diagnostiziert. Nicolas wurde behindert geboren. Mutter hätte abgetrieben."
            },
            verdict: {
                pt: "Indemnização aos pais (Sim). Indemnização à criança (Não).",
                de: "Schadenersatz Eltern (Ja). Schadenersatz Kind (Nein)."
            },
            articles: ["CC 483", "CC 485", "CP 142"],
            issues: ["Wrongful Birth", "Wrongful Life"]
        },
        {
            id: "ectopica",
            title: "Caso 3: Gravidez Ectópica",
            subtitle: "Menor / Urgência / Consentimento",
            summary: {
                pt: "Jovem (15 anos) sozinha com abdómen agudo. Diagnóstico inicial apendicite. Cirurgia revela gravidez ectópica (risco vida). Doente anestesiada.",
                de: "15-Jährige allein, akutes Abdomen. Erstdiagnose Blinddarm. OP zeigt Eileiterschwangerschaft (Lebensgefahr). Patientin narkotisiert."
            },
            verdict: {
                pt: "Interrupção necessária. Consentimento presumido (urgência). Atuação médica lícita.",
                de: "Abbruch notwendig. Mutmaßliche Einwilligung (Notfall). Ärztliches Handeln rechtmäßig."
            },
            articles: ["CD (Menores)", "CP 142 (IVG)", "CP 156 (Consentimento)", "CD 22 (Presunção)"],
            issues: ["Consentimento Presumido", "Estado de Necessidade", "Menor de Idade"]
        },
        {
            id: "perita",
            title: "Caso 4: Dra. Margarida (Perita)",
            subtitle: "Dever de Informação / Sigilo / Peritagem",
            summary: {
                pt: "Dra. Margarida (Perita) deteta doença cardíaca grave em Sr. Rui. Não prescreve nem contacta o médico assistente. Sr. Rui morre de enfarte.",
                de: "Dr. Margarida (Gutachterin) entdeckt schwere Herzkrankheit bei Herrn Rui. Verschreibt nichts, kontaktiert Hausarzt nicht. Herr Rui stirbt an Infarkt."
            },
            verdict: {
                pt: "Atuação incorreta. Devia ter contactado médico assistente (Risco de Vida).",
                de: "Unkorrektes Handeln. Hätte Hausarzt kontaktieren müssen (Lebensgefahr)."
            },
            articles: ["CD (Peritagem)", "Lei 12/2005 (Dados)", "CP (Sigilo)"],
            issues: ["Médico Perito", "Dever de Informação", "Conflito de Deveres"]
        },
        {
            id: "bebeMedicamento",
            title: "Caso 5: Bebé Medicamento",
            subtitle: "PMA / Seleção de Embriões / Ética",
            summary: {
                pt: "Izal nasceu para salvar a irmã Erine (Leucemia) através de transplante de medula. Pais usaram fertilização in vitro e seleção de embrião compatível nos EUA.",
                de: "Izal wurde geboren, um Schwester Erine (Leukämie) durch Knochenmarkspende zu retten. Eltern nutzten IVF und Embryonenselektion in den USA."
            },
            verdict: {
                pt: "Transplante permitido (Lei 22/2007). Criação do bebé via PMA é zona cinzenta/discutível na Lei 32/2006.",
                de: "Transplantation erlaubt (Gesetz 22/2007). Erzeugung via PMA rechtlich unklar/umstritten (Gesetz 32/2006)."
            },
            articles: ["Lei 32/2006 (PMA)", "Lei 22/2007 (Transplantação)"],
            issues: ["Bebé Medicamento", "Dignidade Humana", "Instrumentalização"]
        }
    ],
    flashcardsPro: [
        { id: 1, question: { pt: "Distinga Atestado de Relatório.", de: "Unterscheiden Sie Ärztliches Attest und Gutachten (Bericht)." }, answer: { pt: "Atestado: Documento simples, declara um facto e consequências.\nRelatório: Documento completo/detalhado, descreve perícia, método e conclusões.", de: "Attest: Einfaches Dokument, bestätigt Fakt und Folge.\nGutachten: Detailliertes Dokument, beschreibt Untersuchung, Methode und Schlussfolgerungen." }, keyPoint: { pt: "Atestado = Simples/Curto. Relatório = Detalhado/Completo.", de: "Attest = Einfach/Kurz. Gutachten = Detailliert/Vollständig." } },
        { id: 2, question: { pt: "O que é um Perito Médico Ocasional e qual o seu papel?", de: "Was ist ein 'Gelegenheitsgutachter' und welche Rolle hat er?" }, answer: { pt: "Médico nomeado pelo juiz quando não há peritos do quadro. Pode ser qualquer médico (mesmo sem especialidade legal).", de: "Vom Richter ernannter Arzt, wenn kein Amtsarzt verfügbar ist. Kann jeder Arzt sein (auch ohne Rechtsmedizin-Spezialität)." }, keyPoint: { pt: "Papel: Assegurar a perícia na falta de profissionais.", de: "Rolle: Sicherstellung der Begutachtung bei Mangel an Experten." } },
        { id: 3, question: { pt: "Distinga Interdição de Inabilitação.", de: "Unterscheiden Sie Interdição (Entmündigung) und Inabilitação." }, answer: { pt: "Interdição: Incapacidade TOTAL. Nomeado TUTOR.\nInabilitação: Incapacidade PARCIAL. Pode agir com autorização do CURADOR.", de: "Interdição: VOLLE Handlungsunfähigkeit. VORMUND (Tutor).\nInabilitação: TEILWEISE Unfähigkeit. Handelt mit Zustimmung des BEISTANDS (Curador)." }, keyPoint: { pt: "Interdição = Total (Tutor). Inabilitação = Parcial (Curador).", de: "Interdição = Total (Vormund). Inabilitação = Partiell (Beistand)." } },
        { id: 4, question: { pt: "O que entende por Inimputabilidade? Critérios?", de: "Was verstehen Sie unter Schuldunfähigkeit (Inimputabilidade)? Kriterien?" }, answer: { pt: "Incapacidade de reconhecer a ilicitude ou controlar impulsos no momento do crime (anomalia psíquica).", de: "Unfähigkeit, das Unrecht der Tat einzusehen oder Impulse zu kontrollieren (psychische Störung)." }, keyPoint: { pt: "Critérios: <16 anos ou Anomalia Psíquica grave.", de: "Kriterien: <16 Jahre oder schwere psychische Störung." } },
        { id: 5, question: { pt: "Distinga Simulação de Dissimulação.", de: "Unterscheiden Sie Simulation und Dissimulation." }, answer: { pt: "Simulação: Finge/Exagera doença inexistente (para ter vantagem).\nDissimulação: Esconde doença real (para ter benefício, ex: emprego).", de: "Simulation: Täuscht Krankheit vor/übertreibt (für Vorteil).\nDissimulation: Verbirgt echte Krankheit (für Vorteil, z.B. Job)." }, keyPoint: { pt: "Simular = Inventar. Dissimular = Esconder.", de: "Simulieren = Erfinden. Dissimulieren = Verstecken." } }
    ],
    flashcardsSimple: [
        { id: 101, question: { pt: "Atestado vs. Relatório", de: "Attest vs. Gutachten" }, answer: { pt: "Atestado = Papel simples. Relatório = Livro detalhado para o Juiz ler.", de: "Attest = Einfacher Zettel. Gutachten = Detailliertes Buch für den Richter." }, keyPoint: { pt: "Simples vs. Detalhado", de: "Einfach vs. Detailliert" } },
        { id: 102, question: { pt: "Perito Médico Ocasional", de: "Gelegenheitsgutachter" }, answer: { pt: "Médico 'tapa-buracos'. O Juiz escolhe-o porque não há peritos oficiais disponíveis.", de: "Ein 'Lückenfüller-Arzt'. Der Richter wählt ihn, weil keine offiziellen Experten da sind." }, keyPoint: { pt: "Escolhido pelo Juiz", de: "Vom Richter gewählt" } },
        { id: 103, question: { pt: "Interdição vs. Inabilitação", de: "Entmündigung vs. Teilentmündigung" }, answer: { pt: "Interdição: Não pode fazer NADA sozinho (precisa de Tutor). Inabilitação: Pode fazer algumas coisas (precisa de Curador).", de: "Interdição: Darf NICHTS allein (braucht Vormund). Inabilitação: Darf manches (braucht Beistand)." }, keyPoint: { pt: "Tutor vs. Curador", de: "Vormund vs. Beistand" } },
        { id: 104, question: { pt: "Inimputável", de: "Schuldunfähig" }, answer: { pt: "Alguém que não pode ir preso porque não percebe o que faz (ex: crianças ou doentes mentais graves).", de: "Jemand, der nicht in den Knast kann, weil er es nicht kapiert (z.B. Kinder, psychisch Kranke)." }, keyPoint: { pt: "Não tem culpa", de: "Keine Schuld" } },
        { id: 105, question: { pt: "Simulação vs. Dissimulação", de: "Simulation vs. Dissimulation" }, answer: { pt: "Simular = Fingir doença. Dissimular = Esconder doença.", de: "Simulieren = Krankheit vortäuschen. Dissimulieren = Verstecken." }, keyPoint: { pt: "Inventar vs. Esconder", de: "Erfinden vs. Verstecken" } }
    ],
    flashcardsExam: [
        { id: 201, question: { pt: "Distinga Atestado de Relatório.", de: "Unterschied Attest vs. Gutachten." }, answer: { pt: "Atestado: certifica facto simples. Relatório: descreve perícia e fundamenta conclusões.", de: "Attest: bescheinigt einfachen Fakt. Gutachten: beschreibt Untersuchung und begründet." }, keyPoint: { pt: "Simples vs. Fundamentado", de: "Einfach vs. Begründet" } },
        { id: 202, question: { pt: "Perito Médico Ocasional.", de: "Gelegenheitsgutachter." }, answer: { pt: "Nomeado pelo juiz para caso específico na falta de peritos do quadro. Não exige especialidade.", de: "Vom Richter für Einzelfall ernannt bei Mangel an Amtsärzten. Keine Spezialisierung nötig." }, keyPoint: { pt: "Nomeação Judicial / Falta Peritos", de: "Gerichtliche Ernennung / Mangel" } },
        { id: 203, question: { pt: "Interdição vs. Inabilitação.", de: "Entmündigung vs. Teilentmündigung." }, answer: { pt: "Interdição: Incapacidade total (Tutor). Inabilitação: Incapacidade parcial (Curador).", de: "Interdição: Total (Vormund). Inabilitação: Teilweise (Beistand)." }, keyPoint: { pt: "Total vs. Parcial", de: "Total vs. Teilweise" } },
        { id: 204, question: { pt: "Critérios Inimputabilidade.", de: "Kriterien Schuldunfähigkeit." }, answer: { pt: "Incapacidade de avaliar ilicitude. Causas: <16 anos ou anomalia psíquica grave.", de: "Unfähigkeit Unrecht einzusehen. Ursachen: <16 Jahre oder schwere psychische Störung." }, keyPoint: { pt: "<16 Anos / Anomalia", de: "<16 Jahre / Störung" } },
        { id: 205, question: { pt: "Simulação vs. Dissimulação.", de: "Simulation vs. Dissimulation." }, answer: { pt: "Simulação: Fingir doença inexistente. Dissimulação: Esconder doença existente.", de: "Simulation: Krankheit vortäuschen. Dissimulation: Krankheit verbergen." }, keyPoint: { pt: "Inventar vs. Esconder", de: "Erfinden vs. Verstecken" } }
    ],
    vocabulary: [
        { pt: "Atestado vs Relatório", de: "Attest vs Gutachten", usage: "Simple vs Detailed" },
        { pt: "Simulação vs Dissimulação", de: "Simulation vs Dissimulation", usage: "Faking vs Hiding" },
        { pt: "Inimputabilidade", de: "Schuldunfähigkeit", usage: "<16 years or Mental Disorder" },
        { pt: "Interdição", de: "Entmündigung (Voll)", usage: "Total incapacity -> Tutor" },
        { pt: "Inabilitação", de: "Teilweise Entmündigung", usage: "Partial incapacity -> Curador" },
        { pt: "Agir com diligência e zelo", de: "Mit Sorgfalt und Eifer handeln", usage: "Standard: Bon pater familias" },
        { pt: "Nexo de causalidade", de: "Kausalzusammenhang", usage: "Essential for liability" },
        { pt: "Consentimento Presumido", de: "Mutmaßliche Einwilligung", usage: "Unconscious patients/Emergency" },
        { pt: "Estado de Necessidade", de: "Rechtfertigender Notstand", usage: "Breaking a rule to save a higher value" },
        { pt: "Representante legal", de: "Gesetzlicher Vertreter", usage: "Parents for minors" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
};
