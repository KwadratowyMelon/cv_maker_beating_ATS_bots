/**
 * i18n translation dictionaries for English and Polish.
 * Covers both the website UI labels and the PDF section headings.
 */

const translations = {
  en: {
    // Top bar
    subtitle: "ATS-Safe CV Builder",
    downloadBtn: "⬇ Download PDF",
    generating: "Generating…",
    livePreview: "📄 Live Preview",

    // Download modal
    downloadTitle: "Download CV",
    downloadEN: "🇬🇧 English PDF",
    downloadPL: "🇵🇱 Polish PDF",
    downloadBoth: "📦 Both (EN + PL)",
    cancel: "Cancel",

    // Language toggle
    langLabel: "UI Language",

    // Editor sections
    sectionJobDesc: "🎯 Target Job Description",
    jobDescHint:
      "Paste a job description here and the system will auto-highlight the most relevant experience bullets.",
    jobDescPlaceholder: "Paste the job description here…",

    sectionPersonal: "👤 Personal Info",
    fullName: "Full Name",
    title: "Title",
    email: "Email",
    phone: "Phone",
    portfolioUrl: "Portfolio URL",
    summary: "Summary",
    socialProfiles: "Social Profiles",
    network: "Network",
    url: "URL",
    addProfile: "+ Add Profile",

    sectionSkills: "🛠 Skills",
    categoryName: "Category name",
    addSkillCategory: "+ Add Skill Category",
    addItem: "Add item…",

    sectionExperience: "💼 Experience",
    position: "Position",
    company: "Company",
    startDate: "Start Date",
    endDate: "End Date",
    endDatePlaceholder: "YYYY-MM-DD or Present",
    highlights: "Highlights",
    showOnCV: "Show on CV",
    boldKeywords: "Bold keywords:",
    addHighlight: "+ Add Highlight",
    addPosition: "+ Add Position",
    newPosition: "New Position",

    sectionProjects: "🚀 Projects",
    projectName: "Project Name",
    description: "Description",
    keywords: "Keywords",
    addProject: "+ Add Project",
    newProject: "New Project",

    sectionEducation: "🎓 Education",
    institution: "Institution",
    degree: "Degree",
    fieldOfStudy: "Field of Study",
    gpa: "GPA / Score",
    addEducation: "+ Add Education",
    newSchool: "New School",

    // PDF section titles
    pdfSkills: "Technical Skills",
    pdfExperience: "Experience",
    pdfProjects: "Projects",
    pdfEducation: "Education",
    pdfPortfolio: "Portfolio",
    pdfGpa: "GPA",
    pdfPresent: "Present",
  },

  pl: {
    // Top bar
    subtitle: "Kreator CV bezpieczny dla ATS",
    downloadBtn: "⬇ Pobierz PDF",
    generating: "Generowanie…",
    livePreview: "📄 Podgląd na żywo",

    // Download modal
    downloadTitle: "Pobierz CV",
    downloadEN: "🇬🇧 PDF po angielsku",
    downloadPL: "🇵🇱 PDF po polsku",
    downloadBoth: "📦 Oba (EN + PL)",
    cancel: "Anuluj",

    // Language toggle
    langLabel: "Język interfejsu",

    // Editor sections
    sectionJobDesc: "🎯 Opis stanowiska",
    jobDescHint:
      "Wklej opis stanowiska, a system automatycznie podświetli najbardziej trafne punkty doświadczenia.",
    jobDescPlaceholder: "Wklej tutaj opis stanowiska…",

    sectionPersonal: "👤 Dane osobowe",
    fullName: "Imię i nazwisko",
    title: "Tytuł",
    email: "Email",
    phone: "Telefon",
    portfolioUrl: "URL portfolio",
    summary: "Podsumowanie",
    socialProfiles: "Profile społecznościowe",
    network: "Sieć",
    url: "URL",
    addProfile: "+ Dodaj profil",

    sectionSkills: "🛠 Umiejętności",
    categoryName: "Nazwa kategorii",
    addSkillCategory: "+ Dodaj kategorię",
    addItem: "Dodaj element…",

    sectionExperience: "💼 Doświadczenie",
    position: "Stanowisko",
    company: "Firma",
    startDate: "Data rozpoczęcia",
    endDate: "Data zakończenia",
    endDatePlaceholder: "RRRR-MM-DD lub Obecnie",
    highlights: "Osiągnięcia",
    showOnCV: "Pokaż w CV",
    boldKeywords: "Pogrubione słowa:",
    addHighlight: "+ Dodaj osiągnięcie",
    addPosition: "+ Dodaj stanowisko",
    newPosition: "Nowe stanowisko",

    sectionProjects: "🚀 Projekty",
    projectName: "Nazwa projektu",
    description: "Opis",
    keywords: "Słowa kluczowe",
    addProject: "+ Dodaj projekt",
    newProject: "Nowy projekt",

    sectionEducation: "🎓 Wykształcenie",
    institution: "Uczelnia",
    degree: "Stopień",
    fieldOfStudy: "Kierunek studiów",
    gpa: "Średnia ocen",
    addEducation: "+ Dodaj wykształcenie",
    newSchool: "Nowa uczelnia",

    // PDF section titles
    pdfSkills: "Umiejętności techniczne",
    pdfExperience: "Doświadczenie",
    pdfProjects: "Projekty",
    pdfEducation: "Wykształcenie",
    pdfPortfolio: "Portfolio",
    pdfGpa: "Średnia",
    pdfPresent: "Obecnie",
  },
};

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.en[key] ?? key;
}

export default translations;
