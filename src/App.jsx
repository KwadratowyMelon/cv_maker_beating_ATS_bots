import React, { useState, useMemo, useCallback } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import CVDocument from "./components/pdf/CVDocument";
import EditorForm from "./components/editor/EditorForm";
import { sampleProfile } from "./data/sampleData";
import { filterProfile } from "./utils/filterProfile";
import { t } from "./i18n/translations";

export default function App() {
  const [profile, setProfile] = useState(sampleProfile);
  const [jobDescription, setJobDescription] = useState("");
  const [lang, setLang] = useState("en");
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [downloading, setDownloading] = useState(false);

  // Filter the profile based on job description
  const targetedProfile = useMemo(
    () => filterProfile(profile, jobDescription),
    [profile, jobDescription],
  );

  const baseName = profile.basics.name.replace(/\s+/g, "_");

  // Download helper: render a PDF blob and trigger save
  const downloadPdf = useCallback(
    async (pdfLang) => {
      const blob = await pdf(
        <CVDocument
          profile={targetedProfile}
          lang={pdfLang}
          matchedKeywords={targetedProfile._matchedKeywords || []}
        />,
      ).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${baseName}_CV_${pdfLang.toUpperCase()}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [targetedProfile, baseName],
  );

  const handleDownload = useCallback(
    async (option) => {
      setDownloading(true);
      try {
        if (option === "en") {
          await downloadPdf("en");
        } else if (option === "pl") {
          await downloadPdf("pl");
        } else {
          // both
          await downloadPdf("en");
          await downloadPdf("pl");
        }
      } finally {
        setDownloading(false);
        setShowDownloadModal(false);
      }
    },
    [downloadPdf],
  );

  return (
    <div className="app">
      {/* ── TOP BAR ── */}
      <header className="topbar">
        <div className="topbar-brand">
          <span className="topbar-logo">⚡</span>
          <h1 className="topbar-title">
            Dev<span className="accent">CV</span>
          </h1>
          <span className="topbar-subtitle">{t(lang, "subtitle")}</span>
        </div>
        <div className="topbar-actions">
          {/* Language toggle */}
          <div className="lang-toggle">
            <button
              type="button"
              className={`lang-btn ${lang === "en" ? "active" : ""}`}
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={`lang-btn ${lang === "pl" ? "active" : ""}`}
              onClick={() => setLang("pl")}
            >
              PL
            </button>
          </div>

          {/* Download button */}
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setShowDownloadModal(true)}
          >
            {t(lang, "downloadBtn")}
          </button>
        </div>
      </header>

      {/* ── DOWNLOAD MODAL ── */}
      {showDownloadModal && (
        <div
          className="modal-overlay"
          onClick={() => !downloading && setShowDownloadModal(false)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{t(lang, "downloadTitle")}</h2>
            <div className="modal-buttons">
              <button
                className="btn btn-download"
                disabled={downloading}
                onClick={() => handleDownload("en")}
              >
                {t(lang, "downloadEN")}
              </button>
              <button
                className="btn btn-download"
                disabled={downloading}
                onClick={() => handleDownload("pl")}
              >
                {t(lang, "downloadPL")}
              </button>
              <button
                className="btn btn-download btn-download-both"
                disabled={downloading}
                onClick={() => handleDownload("both")}
              >
                {t(lang, "downloadBoth")}
              </button>
            </div>
            {downloading && (
              <p className="modal-status">{t(lang, "generating")}</p>
            )}
            <button
              className="btn btn-ghost modal-cancel"
              disabled={downloading}
              onClick={() => setShowDownloadModal(false)}
            >
              {t(lang, "cancel")}
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN LAYOUT ── */}
      <main className="main-layout">
        {/* Left: Editor */}
        <div className="editor-pane">
          <EditorForm
            data={profile}
            onChange={setProfile}
            jobDescription={jobDescription}
            onJobDescriptionChange={setJobDescription}
            lang={lang}
            matchedKeywords={targetedProfile._matchedKeywords || []}
          />
        </div>

        {/* Right: PDF Preview */}
        <div className="preview-pane">
          <div className="preview-header">
            <span className="preview-label">{t(lang, "livePreview")}</span>
          </div>
          <div className="preview-viewer">
            <PDFViewer width="100%" height="100%" showToolbar={false}>
              <CVDocument
                profile={targetedProfile}
                lang={lang}
                matchedKeywords={targetedProfile._matchedKeywords || []}
              />
            </PDFViewer>
          </div>
        </div>
      </main>
    </div>
  );
}
