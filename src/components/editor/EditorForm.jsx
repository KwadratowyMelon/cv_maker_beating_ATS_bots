import React, { useState } from "react";
import { t } from "../../i18n/translations";

/* ─────────────────────────────────────────────
   Reusable collapsible section wrapper
   ───────────────────────────────────────────── */
function Section({ title, defaultOpen = true, children }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="editor-section">
      <button
        type="button"
        className="section-header"
        onClick={() => setOpen(!open)}
      >
        <span className="section-title">{title}</span>
        <span className={`section-chevron ${open ? "open" : ""}`}>▾</span>
      </button>
      {open && <div className="section-body">{children}</div>}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Inline field helper
   ───────────────────────────────────────────── */
function Field({ label, children }) {
  return (
    <div className="field">
      <label className="field-label">{label}</label>
      {children}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tag input (for skills / tech_stack)
   ───────────────────────────────────────────── */
function TagInput({ tags, onChange, placeholder }) {
  const [input, setInput] = useState("");

  const addTag = () => {
    const val = input.trim();
    if (val && !tags.includes(val)) {
      onChange([...tags, val]);
      setInput("");
    }
  };

  const removeTag = (idx) => {
    onChange(tags.filter((_, i) => i !== idx));
  };

  return (
    <div className="tag-input-wrapper">
      <div className="tags">
        {tags.map((tag, i) => (
          <span key={i} className="tag">
            {tag}
            <button
              type="button"
              className="tag-remove"
              onClick={() => removeTag(i)}
            >
              ×
            </button>
          </span>
        ))}
      </div>
      <div className="tag-add-row">
        <input
          className="input tag-add-input"
          value={input}
          placeholder={placeholder || "Add item…"}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
        />
        <button type="button" className="btn btn-sm" onClick={addTag}>
          +
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main EditorForm component
   ───────────────────────────────────────────── */
export default function EditorForm({
  data,
  onChange,
  jobDescription,
  onJobDescriptionChange,
  lang = "en",
}) {
  /* Helpers to update nested state */
  const set = (path, val) => {
    const next = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let obj = next;
    for (let i = 0; i < keys.length - 1; i++) {
      const key = isNaN(keys[i]) ? keys[i] : Number(keys[i]);
      obj = obj[key];
    }
    const last = isNaN(keys[keys.length - 1])
      ? keys[keys.length - 1]
      : Number(keys[keys.length - 1]);
    obj[last] = val;
    onChange(next);
  };

  const addItem = (path, template) => {
    const next = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let arr = next;
    for (const k of keys) arr = arr[isNaN(k) ? k : Number(k)];
    arr.push(template);
    onChange(next);
  };

  const removeItem = (path, index) => {
    const next = JSON.parse(JSON.stringify(data));
    const keys = path.split(".");
    let arr = next;
    for (const k of keys) arr = arr[isNaN(k) ? k : Number(k)];
    arr.splice(index, 1);
    onChange(next);
  };

  return (
    <form className="editor-form" onSubmit={(e) => e.preventDefault()}>
      {/* ── JOB DESCRIPTION ── */}
      <Section title={t(lang, "sectionJobDesc")} defaultOpen={false}>
        <p className="hint">{t(lang, "jobDescHint")}</p>
        <textarea
          className="input textarea"
          rows={6}
          placeholder={t(lang, "jobDescPlaceholder")}
          value={jobDescription}
          onChange={(e) => onJobDescriptionChange(e.target.value)}
        />
      </Section>

      {/* ── BASICS ── */}
      <Section title={t(lang, "sectionPersonal")}>
        <div className="field-grid">
          <Field label={t(lang, "fullName")}>
            <input
              className="input"
              value={data.basics.name}
              onChange={(e) => set("basics.name", e.target.value)}
            />
          </Field>
          <Field label={t(lang, "title")}>
            <input
              className="input"
              value={data.basics.label}
              onChange={(e) => set("basics.label", e.target.value)}
            />
          </Field>
          <Field label={t(lang, "email")}>
            <input
              className="input"
              type="email"
              value={data.basics.email}
              onChange={(e) => set("basics.email", e.target.value)}
            />
          </Field>
          <Field label={t(lang, "phone")}>
            <input
              className="input"
              value={data.basics.phone || ""}
              onChange={(e) => set("basics.phone", e.target.value)}
            />
          </Field>
          <Field label={t(lang, "portfolioUrl")}>
            <input
              className="input"
              value={data.basics.url}
              onChange={(e) => set("basics.url", e.target.value)}
            />
          </Field>
        </div>
        <Field label={t(lang, "summary")}>
          <textarea
            className="input textarea"
            rows={3}
            value={data.basics.summary}
            onChange={(e) => set("basics.summary", e.target.value)}
          />
        </Field>
        {/* Profiles */}
        <div className="sub-section">
          <h4 className="sub-title">{t(lang, "socialProfiles")}</h4>
          {data.basics.profiles.map((p, i) => (
            <div key={i} className="inline-group">
              <input
                className="input"
                style={{ width: 120 }}
                placeholder={t(lang, "network")}
                value={p.network}
                onChange={(e) =>
                  set(`basics.profiles.${i}.network`, e.target.value)
                }
              />
              <input
                className="input"
                placeholder={t(lang, "url")}
                value={p.url}
                onChange={(e) =>
                  set(`basics.profiles.${i}.url`, e.target.value)
                }
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeItem("basics.profiles", i)}
              >
                ✕
              </button>
            </div>
          ))}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={() => addItem("basics.profiles", { network: "", url: "" })}
          >
            {t(lang, "addProfile")}
          </button>
        </div>
      </Section>

      {/* ── SKILLS ── */}
      <Section title={t(lang, "sectionSkills")}>
        {data.skills.map((group, gi) => (
          <div key={gi} className="card">
            <div className="card-header">
              <input
                className="input"
                value={group.category}
                placeholder={t(lang, "categoryName")}
                onChange={(e) => set(`skills.${gi}.category`, e.target.value)}
              />
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeItem("skills", gi)}
              >
                ✕
              </button>
            </div>
            <TagInput
              tags={group.items.map((it) => it.name)}
              placeholder={t(lang, "addItem")}
              onChange={(tags) =>
                set(
                  `skills.${gi}.items`,
                  tags.map((n) => ({ name: n })),
                )
              }
            />
          </div>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() => addItem("skills", { category: "", items: [] })}
        >
          {t(lang, "addSkillCategory")}
        </button>
      </Section>

      {/* ── EXPERIENCE ── */}
      <Section title={t(lang, "sectionExperience")}>
        {data.work.map((job, ji) => (
          <div key={ji} className="card">
            <div className="card-header">
              <strong className="card-title">
                {job.position || t(lang, "newPosition")}
              </strong>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeItem("work", ji)}
              >
                ✕
              </button>
            </div>
            <div className="field-grid">
              <Field label={t(lang, "position")}>
                <input
                  className="input"
                  value={job.position}
                  onChange={(e) => set(`work.${ji}.position`, e.target.value)}
                />
              </Field>
              <Field label={t(lang, "company")}>
                <input
                  className="input"
                  value={job.company}
                  onChange={(e) => set(`work.${ji}.company`, e.target.value)}
                />
              </Field>
              <Field label={t(lang, "startDate")}>
                <input
                  className="input"
                  type="date"
                  value={job.startDate}
                  onChange={(e) => set(`work.${ji}.startDate`, e.target.value)}
                />
              </Field>
              <Field label={t(lang, "endDate")}>
                <input
                  className="input"
                  value={job.endDate}
                  placeholder={t(lang, "endDatePlaceholder")}
                  onChange={(e) => set(`work.${ji}.endDate`, e.target.value)}
                />
              </Field>
            </div>

            {/* Highlights */}
            <div className="sub-section">
              <h4 className="sub-title">{t(lang, "highlights")}</h4>
              {job.highlights.map((h, hi) => (
                <div key={hi} className="highlight-card">
                  <div className="highlight-top">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={h.is_selected}
                        onChange={(e) =>
                          set(
                            `work.${ji}.highlights.${hi}.is_selected`,
                            e.target.checked,
                          )
                        }
                      />
                      <span>{t(lang, "showOnCV")}</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => removeItem(`work.${ji}.highlights`, hi)}
                    >
                      ✕
                    </button>
                  </div>
                  <textarea
                    className="input textarea"
                    rows={2}
                    value={h.full_text}
                    onChange={(e) =>
                      set(
                        `work.${ji}.highlights.${hi}.full_text`,
                        e.target.value,
                      )
                    }
                  />
                  <div className="tech-stack-row">
                    <span className="tech-label">
                      {t(lang, "boldKeywords")}
                    </span>
                    <TagInput
                      tags={h.tech_stack}
                      onChange={(tags) =>
                        set(`work.${ji}.highlights.${hi}.tech_stack`, tags)
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  addItem(`work.${ji}.highlights`, {
                    full_text: "",
                    tech_stack: [],
                    is_selected: true,
                  })
                }
              >
                {t(lang, "addHighlight")}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            addItem("work", {
              company: "",
              position: "",
              url: "",
              startDate: "",
              endDate: "Present",
              highlights: [],
            })
          }
        >
          {t(lang, "addPosition")}
        </button>
      </Section>

      {/* ── PROJECTS ── */}
      <Section title={t(lang, "sectionProjects")}>
        {data.projects.map((proj, pi) => (
          <div key={pi} className="card">
            <div className="card-header">
              <strong className="card-title">
                {proj.name || t(lang, "newProject")}
              </strong>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeItem("projects", pi)}
              >
                ✕
              </button>
            </div>
            <div className="field-grid">
              <Field label={t(lang, "projectName")}>
                <input
                  className="input"
                  value={proj.name}
                  onChange={(e) => set(`projects.${pi}.name`, e.target.value)}
                />
              </Field>
              <Field label={t(lang, "url")}>
                <input
                  className="input"
                  value={proj.url}
                  onChange={(e) => set(`projects.${pi}.url`, e.target.value)}
                />
              </Field>
            </div>
            <Field label={t(lang, "description")}>
              <textarea
                className="input textarea"
                rows={2}
                value={proj.description}
                onChange={(e) =>
                  set(`projects.${pi}.description`, e.target.value)
                }
              />
            </Field>
            <Field label={t(lang, "keywords")}>
              <TagInput
                tags={proj.keywords || []}
                onChange={(tags) => set(`projects.${pi}.keywords`, tags)}
              />
            </Field>

            {/* Highlights */}
            <div className="sub-section">
              <h4 className="sub-title">{t(lang, "highlights")}</h4>
              {proj.highlights.map((h, hi) => (
                <div key={hi} className="highlight-card">
                  <div className="highlight-top">
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={h.is_selected}
                        onChange={(e) =>
                          set(
                            `projects.${pi}.highlights.${hi}.is_selected`,
                            e.target.checked,
                          )
                        }
                      />
                      <span>{t(lang, "showOnCV")}</span>
                    </label>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        removeItem(`projects.${pi}.highlights`, hi)
                      }
                    >
                      ✕
                    </button>
                  </div>
                  <textarea
                    className="input textarea"
                    rows={2}
                    value={h.full_text}
                    onChange={(e) =>
                      set(
                        `projects.${pi}.highlights.${hi}.full_text`,
                        e.target.value,
                      )
                    }
                  />
                  <div className="tech-stack-row">
                    <span className="tech-label">
                      {t(lang, "boldKeywords")}
                    </span>
                    <TagInput
                      tags={h.tech_stack}
                      onChange={(tags) =>
                        set(`projects.${pi}.highlights.${hi}.tech_stack`, tags)
                      }
                    />
                  </div>
                </div>
              ))}
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() =>
                  addItem(`projects.${pi}.highlights`, {
                    full_text: "",
                    tech_stack: [],
                    is_selected: true,
                  })
                }
              >
                {t(lang, "addHighlight")}
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            addItem("projects", {
              name: "",
              description: "",
              url: "",
              keywords: [],
              highlights: [],
            })
          }
        >
          {t(lang, "addProject")}
        </button>
      </Section>

      {/* ── EDUCATION ── */}
      <Section title={t(lang, "sectionEducation")}>
        {data.education.map((edu, ei) => (
          <div key={ei} className="card">
            <div className="card-header">
              <strong className="card-title">
                {edu.institution || t(lang, "newSchool")}
              </strong>
              <button
                type="button"
                className="btn btn-danger btn-sm"
                onClick={() => removeItem("education", ei)}
              >
                ✕
              </button>
            </div>
            <div className="field-grid">
              <Field label={t(lang, "institution")}>
                <input
                  className="input"
                  value={edu.institution}
                  onChange={(e) =>
                    set(`education.${ei}.institution`, e.target.value)
                  }
                />
              </Field>
              <Field label={t(lang, "degree")}>
                <input
                  className="input"
                  value={edu.studyType}
                  onChange={(e) =>
                    set(`education.${ei}.studyType`, e.target.value)
                  }
                />
              </Field>
              <Field label={t(lang, "fieldOfStudy")}>
                <input
                  className="input"
                  value={edu.area}
                  onChange={(e) => set(`education.${ei}.area`, e.target.value)}
                />
              </Field>
              <Field label={t(lang, "gpa")}>
                <input
                  className="input"
                  value={edu.score || ""}
                  onChange={(e) => set(`education.${ei}.score`, e.target.value)}
                />
              </Field>
              <Field label={t(lang, "startDate")}>
                <input
                  className="input"
                  type="date"
                  value={edu.startDate}
                  onChange={(e) =>
                    set(`education.${ei}.startDate`, e.target.value)
                  }
                />
              </Field>
              <Field label={t(lang, "endDate")}>
                <input
                  className="input"
                  type="date"
                  value={edu.endDate}
                  onChange={(e) =>
                    set(`education.${ei}.endDate`, e.target.value)
                  }
                />
              </Field>
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-ghost"
          onClick={() =>
            addItem("education", {
              institution: "",
              area: "",
              studyType: "",
              startDate: "",
              endDate: "",
              score: "",
            })
          }
        >
          {t(lang, "addEducation")}
        </button>
      </Section>
    </form>
  );
}
