/**
 * Takes a masterProfile and an optional jobDescription string.
 * Scores highlights by keyword overlap with the job description,
 * and auto-selects the most relevant bullets.
 */
export function filterProfile(profile, jobDescription) {
  if (!jobDescription || jobDescription.trim().length === 0) {
    return profile;
  }

  const jdLower = jobDescription.toLowerCase();
  const jdWords = new Set(
    jdLower.split(/[\s,;.()\/\-]+/).filter((w) => w.length > 2),
  );

  const scoreHighlight = (highlight) => {
    let score = 0;
    // Score based on tech_stack matches in job description
    for (const tech of highlight.tech_stack) {
      if (jdLower.includes(tech.toLowerCase())) {
        score += 3; // strong signal
      }
    }
    // Score based on word overlap in full_text
    const words = highlight.full_text
      .toLowerCase()
      .split(/[\s,;.()\/\-]+/)
      .filter((w) => w.length > 2);
    for (const word of words) {
      if (jdWords.has(word)) {
        score += 1;
      }
    }
    return score;
  };

  const processHighlights = (highlights, maxSelected = 3) => {
    const scored = highlights.map((h) => ({
      ...h,
      _score: scoreHighlight(h),
    }));
    scored.sort((a, b) => b._score - a._score);

    return scored.map((h, index) => {
      const { _score, ...rest } = h;
      return {
        ...rest,
        is_selected: index < maxSelected && _score > 0 ? true : h.is_selected,
      };
    });
  };

  return {
    ...profile,
    work: profile.work.map((job) => ({
      ...job,
      highlights: processHighlights(job.highlights),
    })),
    projects: profile.projects.map((project) => ({
      ...project,
      highlights: processHighlights(project.highlights, 2),
    })),
  };
}
