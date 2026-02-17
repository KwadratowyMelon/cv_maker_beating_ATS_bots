import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import SmartBullet from "./SmartBullet";
import { formatDate } from "../../utils/formatDate";
import { t } from "../../i18n/translations";
import "../../utils/fontSetup";

const ACCENT = "#2563eb";
const DARK = "#111827";
const GRAY = "#4b5563";
const LIGHT_GRAY = "#9ca3af";
const DIVIDER = "#e5e7eb";

const styles = StyleSheet.create({
  page: {
    padding: 32,
    paddingTop: 36,
    paddingBottom: 36,
    fontFamily: "Roboto",
    color: DARK,
    fontSize: 10,
  },

  // Header
  header: {
    marginBottom: 14,
    paddingBottom: 10,
    borderBottomWidth: 1.5,
    borderBottomColor: ACCENT,
    borderBottomStyle: "solid",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    letterSpacing: 0.5,
    textTransform: "uppercase",
    color: DARK,
  },
  title: {
    fontSize: 11,
    color: ACCENT,
    marginTop: 2,
    fontWeight: "bold",
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 6,
    gap: 4,
    fontSize: 9,
    color: GRAY,
  },
  contactLink: {
    color: ACCENT,
    textDecoration: "none",
  },
  contactSeparator: {
    color: LIGHT_GRAY,
    marginHorizontal: 2,
  },

  // Summary
  summary: {
    fontSize: 9.5,
    lineHeight: 1.5,
    color: GRAY,
    marginBottom: 12,
  },

  // Sections
  sectionTitle: {
    fontSize: 11,
    fontWeight: "bold",
    textTransform: "uppercase",
    color: DARK,
    letterSpacing: 0.8,
    marginTop: 12,
    marginBottom: 6,
    paddingBottom: 3,
    borderBottomWidth: 0.75,
    borderBottomColor: DIVIDER,
    borderBottomStyle: "solid",
  },

  // Skills
  skillRow: {
    fontSize: 9.5,
    marginBottom: 2,
    lineHeight: 1.5,
  },
  skillCategory: {
    fontWeight: "bold",
    color: DARK,
  },
  skillItems: {
    color: GRAY,
  },

  // Experience / Projects
  entryBlock: {
    marginBottom: 8,
  },
  entryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 1,
  },
  entryTitle: {
    fontWeight: "bold",
    fontSize: 10.5,
    color: DARK,
  },
  entryDate: {
    fontSize: 9,
    color: LIGHT_GRAY,
  },
  entrySubtitle: {
    fontSize: 9.5,
    color: GRAY,
    fontStyle: "italic",
    marginBottom: 3,
  },

  // Project specific
  projectKeywords: {
    fontSize: 8.5,
    color: ACCENT,
    marginBottom: 3,
  },

  // Education
  eduRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  eduScore: {
    fontSize: 9,
    color: GRAY,
    marginTop: 1,
  },
});

const CVDocument = ({ profile, lang = "en" }) => {
  const { basics, skills, work, projects, education } = profile;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* ── HEADER ── */}
        <View style={styles.header}>
          <Text style={styles.name}>{basics.name}</Text>
          <Text style={styles.title}>{basics.label}</Text>
          <View style={styles.contactRow}>
            {basics.email && (
              <Link src={`mailto:${basics.email}`} style={styles.contactLink}>
                {basics.email}
              </Link>
            )}
            {basics.phone && (
              <>
                <Text style={styles.contactSeparator}>|</Text>
                <Text>{basics.phone}</Text>
              </>
            )}
            {basics.url && (
              <>
                <Text style={styles.contactSeparator}>|</Text>
                <Link src={basics.url} style={styles.contactLink}>
                  {t(lang, "pdfPortfolio")}
                </Link>
              </>
            )}
            {basics.profiles?.map((p, i) => (
              <React.Fragment key={i}>
                <Text style={styles.contactSeparator}>|</Text>
                <Link src={p.url} style={styles.contactLink}>
                  {p.network}
                </Link>
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* ── SUMMARY ── */}
        {basics.summary && <Text style={styles.summary}>{basics.summary}</Text>}

        {/* ── SKILLS ── */}
        {skills && skills.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{t(lang, "pdfSkills")}</Text>
            {skills.map((group, i) => (
              <Text key={i} style={styles.skillRow}>
                <Text style={styles.skillCategory}>{group.category}: </Text>
                <Text style={styles.skillItems}>
                  {group.items.map((item) => item.name).join(", ")}
                </Text>
              </Text>
            ))}
          </View>
        )}

        {/* ── EXPERIENCE ── */}
        {work && work.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{t(lang, "pdfExperience")}</Text>
            {work.map((job, i) => (
              <View key={i} style={styles.entryBlock}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>{job.position}</Text>
                  <Text style={styles.entryDate}>
                    {formatDate(job.startDate)} — {formatDate(job.endDate)}
                  </Text>
                </View>
                <Text style={styles.entrySubtitle}>{job.company}</Text>
                {job.highlights
                  .filter((h) => h.is_selected)
                  .map((h, j) => (
                    <SmartBullet key={j} highlight={h} />
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* ── PROJECTS ── */}
        {projects && projects.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{t(lang, "pdfProjects")}</Text>
            {projects.map((project, i) => (
              <View key={i} style={styles.entryBlock}>
                <View style={styles.entryHeader}>
                  <Text style={styles.entryTitle}>
                    {project.name}
                    {project.url && (
                      <Text style={{ fontWeight: "normal", color: GRAY }}>
                        {" — "}
                      </Text>
                    )}
                    {project.url && (
                      <Link src={project.url} style={styles.contactLink}>
                        {project.url.replace(/https?:\/\/(www\.)?/, "")}
                      </Link>
                    )}
                  </Text>
                </View>
                {project.keywords && project.keywords.length > 0 && (
                  <Text style={styles.projectKeywords}>
                    {project.keywords.join(" · ")}
                  </Text>
                )}
                {project.description && (
                  <Text
                    style={{
                      fontSize: 9.5,
                      color: GRAY,
                      marginBottom: 3,
                      lineHeight: 1.4,
                    }}
                  >
                    {project.description}
                  </Text>
                )}
                {project.highlights
                  .filter((h) => h.is_selected)
                  .map((h, j) => (
                    <SmartBullet key={j} highlight={h} />
                  ))}
              </View>
            ))}
          </View>
        )}

        {/* ── EDUCATION ── */}
        {education && education.length > 0 && (
          <View>
            <Text style={styles.sectionTitle}>{t(lang, "pdfEducation")}</Text>
            {education.map((edu, i) => (
              <View key={i} style={styles.entryBlock}>
                <View style={styles.eduRow}>
                  <View>
                    <Text style={styles.entryTitle}>
                      {edu.studyType} in {edu.area}
                    </Text>
                    <Text style={styles.entrySubtitle}>{edu.institution}</Text>
                  </View>
                  <Text style={styles.entryDate}>
                    {formatDate(edu.startDate)} — {formatDate(edu.endDate)}
                  </Text>
                </View>
                {edu.score && (
                  <Text style={styles.eduScore}>
                    {t(lang, "pdfGpa")}: {edu.score}
                  </Text>
                )}
              </View>
            ))}
          </View>
        )}
      </Page>
    </Document>
  );
};

export default CVDocument;
