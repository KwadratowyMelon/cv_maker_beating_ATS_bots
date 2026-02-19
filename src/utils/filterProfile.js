/**
 * Takes a masterProfile and an optional jobDescription string.
 * - Scores highlights by keyword overlap with the job description
 * - Sorts highlights by relevance (best match first)
 * - Auto-selects the most relevant bullets, deselects weak ones
 * - Extracts a Set of matched skill keywords for visual emphasis in the PDF
 */
export function filterProfile(profile, jobDescription) {
  if (!jobDescription || jobDescription.trim().length === 0) {
    return { ...profile, _matchedKeywords: [] };
  }

  const jdLower = jobDescription.toLowerCase();
  const jdWords = new Set(
    jdLower.split(/[\s,;.()\\/\-]+/).filter((w) => w.length > 2),
  );

  // ── Build a set of matched skill names ──
  // Check every individual skill item against the JD text
  const matchedKeywords = [];
  if (profile.skills) {
    for (const group of profile.skills) {
      for (const item of group.items) {
        const name = item.name.toLowerCase();
        // Match if the skill name appears in the JD (as a word or substring)
        if (jdLower.includes(name)) {
          matchedKeywords.push(item.name);
        }
      }
    }
  }

  // ── Score highlights ──
  const scoreHighlight = (highlight) => {
    let score = 0;
    for (const tech of highlight.tech_stack) {
      if (jdLower.includes(tech.toLowerCase())) {
        score += 3; // strong signal
      }
    }
    const words = highlight.full_text
      .toLowerCase()
      .split(/[\s,;.()\\/\-]+/)
      .filter((w) => w.length > 2);
    for (const word of words) {
      if (jdWords.has(word)) {
        score += 1;
      }
    }
    return score;
  };

  // ── Process & reorder highlights ──
  const processHighlights = (highlights, maxSelected = 4) => {
    const scored = highlights.map((h) => ({
      ...h,
      _score: scoreHighlight(h),
    }));

    // Sort by relevance: highest-scoring first
    scored.sort((a, b) => b._score - a._score);

    return scored.map((h, index) => {
      const { _score, ...rest } = h;
      return {
        ...rest,
        // Top N with score > 0 get selected; others get deselected
        is_selected: _score > 0 ? index < maxSelected : false,
      };
    });
  };

  return {
    ...profile,
    _matchedKeywords: matchedKeywords,
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
