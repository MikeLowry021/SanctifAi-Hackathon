export interface Rule {
  id: string;
  title: string;
  description: string;
  category: string;
  weight: number;
  anchors: string[];
}

export interface Signals {
  themes: string[];
  explicit: {
    language?: string[];
    sexual?: string[];
    violence?: string[];
    occult?: string[];
  };
  claims: string[];
  bibleRefs: string[];
}

export interface ScoreResult {
  total: number;
  subscores: Record<string, number>;
  hits: Array<{
    ruleId: string;
    refs: string[];
    reason?: string;
  }>;
}

export function scoreFromSignals(signals: Signals, rules: Rule[]): ScoreResult {
  const subscores: Record<string, number> = {};
  const hits: Array<{ ruleId: string; refs: string[]; reason?: string }> = [];

  let total = 50;

  for (const rule of rules) {
    let ruleScore = 0;
    let matched = false;
    let reason = "";

    if (rule.id === "occult-practices") {
      const occultKeywords = signals.explicit.occult || [];
      if (occultKeywords.length > 0) {
        ruleScore = -rule.weight;
        matched = true;
        reason = `Occult elements: ${occultKeywords.join(", ")}`;
      }
    }

    if (rule.id === "sexual-purity") {
      const sexualContent = signals.explicit.sexual || [];
      if (sexualContent.length > 0) {
        ruleScore = -rule.weight;
        matched = true;
        reason = `Sexual content: ${sexualContent.join(", ")}`;
      }
    }

    if (rule.id === "violence-glorification") {
      const violence = signals.explicit.violence || [];
      if (
        violence.length > 0 &&
        violence.some((v) => v.includes("graphic") || v.includes("extreme"))
      ) {
        ruleScore = -rule.weight;
        matched = true;
        reason = `Extreme violence detected`;
      }
    }

    if (rule.id === "love-and-compassion") {
      const positiveThemes = signals.themes.filter(
        (t) =>
          t.toLowerCase().includes("love") ||
          t.toLowerCase().includes("compassion") ||
          t.toLowerCase().includes("redemption") ||
          t.toLowerCase().includes("forgiveness"),
      );
      if (positiveThemes.length > 0) {
        ruleScore = rule.weight;
        matched = true;
        reason = `Positive themes: ${positiveThemes.join(", ")}`;
      }
    }

    if (rule.id === "false-gospel" || rule.id === "deity-of-christ") {
      const problematicClaims = signals.claims.filter(
        (c) =>
          c.toLowerCase().includes("all paths lead to god") ||
          c.toLowerCase().includes("works-based salvation") ||
          c.toLowerCase().includes("jesus is just a teacher"),
      );
      if (problematicClaims.length > 0) {
        ruleScore = -rule.weight;
        matched = true;
        reason = `Theological concern: ${problematicClaims[0]}`;
      }
    }

    if (matched) {
      hits.push({
        ruleId: rule.id,
        refs: rule.anchors,
        reason,
      });
      subscores[rule.id] = ruleScore;
      total += ruleScore;
    }
  }

  total = Math.max(0, Math.min(100, total));

  return { total, subscores, hits };
}
