/**
 * SGDP regelgebaseerde adviesmotor
 *
 * Doel: per dossier/aanvraag een gestructureerd advies genereren met:
 *  - vijf categorieën (administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid)
 *  - risicoscore 0-100 (gewogen som van factoren)
 *  - hard blockers
 *  - traceerbare regelreferenties
 */

import type { Application } from "./demo-data";

// Regelmodel
export type RuleCategory =
  | "administratief"
  | "juridisch"
  | "ruimtelijk"
  | "sociaal"
  | "beleid"
  | "lifecycle";

export type Finding = {
  ruleId: string;
  category: RuleCategory;
  finding: string;
  weight: number;
  blocksDecision?: boolean;
  triggers?: ("fpic_required" | "nma_review_required")[];
};

export type AdviceReport = {
  caseId: string;
  caseNumber: string;
  generatedAt: string;
  ruleSetVersion: string;
  riskScore: number;
  riskLevel: "laag" | "middel" | "hoog" | "zeer_hoog";
  blockers: string[];
  findings: Finding[];
  byCategory: Record<RuleCategory, Finding[]>;
  summary: string;
  recommendation: string;
};

const RULE_SET_VERSION = "1.0.0";

// ─────────────────────────────────────────────────────────────────
// Regels (gepubliceerd voorbeeldset — uitbreidbaar zonder code)
// ─────────────────────────────────────────────────────────────────
type RuleDef = {
  id: string;
  category: RuleCategory;
  description: string;
  weight: number;
  blocksDecision?: boolean;
  triggers?: Finding["triggers"];
  evaluate: (app: Application) => string | null; // null = niet van toepassing, string = bevinding
};

export const rules: RuleDef[] = [
  // Administratief
  {
    id: "R-ADM-001",
    category: "administratief",
    description: "Verplicht identiteitsbewijs ontbreekt",
    weight: 10,
    blocksDecision: true,
    evaluate: (app) =>
      app.documentsMissing.includes("id_kopie")
        ? "Dossier incompleet: identiteitsbewijs (ID-kopie) ontbreekt."
        : null,
  },
  {
    id: "R-ADM-002",
    category: "administratief",
    description: "Nationaliteitsverklaring ontbreekt",
    weight: 10,
    blocksDecision: true,
    evaluate: (app) =>
      app.documentsMissing.includes("nationaliteitsverklaring")
        ? "Dossier incompleet: nationaliteitsverklaring ontbreekt (verplicht conform huidige domeingrond-praktijk)."
        : null,
  },
  {
    id: "R-ADM-003",
    category: "administratief",
    description: "Figuratieve kaart ontbreekt bij specifieke aanvraag",
    weight: 15,
    blocksDecision: true,
    evaluate: (app) => {
      if (app.applicationType !== "specifiek") return null;
      return app.documentsMissing.includes("figuratieve_kaart")
        ? "Dossier incompleet: figuratieve kaart of kaart van uitmeting ontbreekt (Decreet Uitgifte Domeingrond)."
        : null;
    },
  },
  // Juridisch
  {
    id: "R-JUR-001",
    category: "juridisch",
    description: "Aanvraag overlapt met bestaand recht",
    weight: 20,
    blocksDecision: true,
    evaluate: (app) => {
      const m = app.blockers.find(b => /overlap.*perceel|overlap.*eigend/i.test(b));
      return m ? `Overlap met bestaand recht — ${m}` : null;
    },
  },
  {
    id: "R-JUR-002",
    category: "juridisch",
    description: "Aanvraag overlapt met actieve concessie",
    weight: 15,
    evaluate: (app) => {
      const m = app.blockers.find(b => /concessie/i.test(b));
      return m ? `Overlap met actieve concessie — ${m}` : null;
    },
  },
  {
    id: "R-JUR-003",
    category: "juridisch",
    description: "Onopgelost bezwaar of rechtsgeding",
    weight: 5,
    evaluate: (app) =>
      app.status === "juridisch_advies"
        ? "Zaak heeft openstaand juridisch traject. Beslissing aanhouden tot juridisch advies opgeleverd."
        : null,
  },
  // Ruimtelijk
  {
    id: "R-RUM-001",
    category: "ruimtelijk",
    description: "Aanvraag ligt binnen beschermd gebied",
    weight: 15,
    blocksDecision: true,
    triggers: ["nma_review_required"],
    evaluate: (app) => {
      const m = app.blockers.find(b => /beschermd gebied/i.test(b));
      return m ? `Aanvraag in beschermd gebied — ${m}. NMA-review verplicht.` : null;
    },
  },
  {
    id: "R-RUM-002",
    category: "ruimtelijk",
    description: "MEA-plicht zonder MER-status",
    weight: 10,
    blocksDecision: true,
    triggers: ["nma_review_required"],
    evaluate: (app) => {
      const m = app.blockers.find(b => /MEA|MER/i.test(b));
      return m ? `MEA-plicht gedetecteerd; geen besluit zonder NMA-goedkeuring (Milieu Raamwet).` : null;
    },
  },
  {
    id: "R-RUM-003",
    category: "ruimtelijk",
    description: "Inconsistentie kaart en oppervlakte",
    weight: 5,
    evaluate: () => null,
  },
  // Sociaal / FPIC
  {
    id: "R-SOC-001",
    category: "sociaal",
    description: "Aanvraag in traditioneel woon- en leefgebied (ITP)",
    weight: 20,
    blocksDecision: true,
    triggers: ["fpic_required"],
    evaluate: (app) => {
      const m = app.blockers.find(b => /traditioneel woon- en leefgebied/i.test(b));
      return m ? `${m}. FPIC-procedure vereist voordat verdere besluitvorming plaatsvindt (UNDRIP, IACHR Saramaka).` : null;
    },
  },
  {
    id: "R-SOC-002",
    category: "sociaal",
    description: "Aanvraag nabij traditioneel gebied",
    weight: 8,
    evaluate: (app) => {
      const m = app.blockers.find(b => /nabij traditioneel/i.test(b));
      return m ? `${m}` : null;
    },
  },
  {
    id: "R-SOC-003",
    category: "sociaal",
    description: "FPIC vereist maar niet gestart",
    weight: 10,
    evaluate: (app) =>
      app.fpicRequired && app.status === "geblokkeerd"
        ? "FPIC is vereist maar nog niet gestart. Werkstroom Consultatie & FPIC moet identificatie traditioneel gezag opstarten."
        : null,
  },
  // Beleid
  {
    id: "R-BEL-001",
    category: "beleid",
    description: "Conflict-hotspot in district",
    weight: 3,
    evaluate: (app) =>
      app.district === "MAR"
        ? `District DEMO_Marowijne vertoont een verhoogde conflictdichtheid (overlap concessies × ITP-gebieden). Overweeg gebiedsgerichte demarcatieaanpak in plaats van case-by-case afhandeling.`
        : null,
  },
  {
    id: "R-BEL-002",
    category: "beleid",
    description: "Doelstelling raakt nationaal belang",
    weight: 2,
    evaluate: (app) =>
      app.purpose === "mijnbouw_klein" || app.purpose === "industrie"
        ? "Doelstelling raakt natuurlijke hulpbronnen (Grondwet art. 41). Publieke belangenafweging expliciet vastleggen."
        : null,
  },
  // Milieu / NMA-uitbreiding (doc 17) — documentair vermeld, evaluatie via EnvCase elders
  {
    id: "R-ENV-010",
    category: "ruimtelijk",
    description: "Aanvraag binnen beschermd gebied — NMA-review + MER-eis",
    weight: 18,
    blocksDecision: true,
    triggers: ["nma_review_required"],
    evaluate: () => null,
  },
  {
    id: "R-ENV-020",
    category: "juridisch",
    description: "MEA-plicht zonder MER-status — geen besluit zonder NMA-goedkeuring",
    weight: 14,
    blocksDecision: true,
    triggers: ["nma_review_required"],
    evaluate: () => null,
  },
  {
    id: "R-ENV-030",
    category: "juridisch",
    description: "Locatie in nationaal register verontreinigde gebieden",
    weight: 8,
    triggers: ["nma_review_required"],
    evaluate: () => null,
  },
  {
    id: "R-ENV-040",
    category: "sociaal",
    description: "Reservaat overlapt traditioneel gebied (Kaliña-Lokono) — FPIC + participatie",
    weight: 18,
    triggers: ["fpic_required", "nma_review_required"],
    evaluate: () => null,
  },
  // Lifecycle (doc 18 — grondhuur, conversie, vervallenverklaring)
  // Worden in deze module documentair vermeld; evaluatie loopt apart op Tenure-objecten.
  {
    id: "R-CONV-001",
    category: "lifecycle",
    description: "Conversie zonder PERCEELSID-kaart",
    weight: 15,
    blocksDecision: true,
    evaluate: () => null,
  },
  {
    id: "R-CONV-002",
    category: "lifecycle",
    description: "Conversie zonder hypothecair uittreksel",
    weight: 15,
    blocksDecision: true,
    evaluate: () => null,
  },
  {
    id: "R-CONV-003",
    category: "lifecycle",
    description: "Conversie met openstaande achterstanden",
    weight: 15,
    blocksDecision: true,
    evaluate: () => null,
  },
  {
    id: "R-CONV-010",
    category: "lifecycle",
    description: "Conversie raakt traditioneel woon- en leefgebied → FPIC heropenen",
    weight: 20,
    triggers: ["fpic_required"],
    evaluate: () => null,
  },
  {
    id: "R-LIFE-001",
    category: "lifecycle",
    description: "Grondhuur loopt af binnen 6 maanden zonder verlengingsverzoek",
    weight: 12,
    blocksDecision: true,
    evaluate: () => null,
  },
  {
    id: "R-LIFE-002",
    category: "lifecycle",
    description: "Achterstand jaarlijkse vergoeding — risico op vervallenverklaring",
    weight: 10,
    evaluate: () => null,
  },
];

// ─────────────────────────────────────────────────────────────────
// Adviesgenerator
// ─────────────────────────────────────────────────────────────────
export function generateAdvice(app: Application): AdviceReport {
  const findings: Finding[] = [];

  for (const rule of rules) {
    const f = rule.evaluate(app);
    if (f) {
      findings.push({
        ruleId: rule.id,
        category: rule.category,
        finding: f,
        weight: rule.weight,
        blocksDecision: rule.blocksDecision,
        triggers: rule.triggers,
      });
    }
  }

  // Risicoscore = som van gewichten van actieve regels (gemaximeerd op 100)
  const rawScore = findings.reduce((s, f) => s + f.weight, 0);
  const riskScore = Math.min(100, rawScore);

  const riskLevel: AdviceReport["riskLevel"] =
    riskScore >= 75 ? "zeer_hoog" :
    riskScore >= 50 ? "hoog" :
    riskScore >= 25 ? "middel" : "laag";

  const blockers = findings.filter(f => f.blocksDecision).map(f => f.finding);

  const byCategory: Record<RuleCategory, Finding[]> = {
    administratief: [],
    juridisch: [],
    ruimtelijk: [],
    sociaal: [],
    beleid: [],
    lifecycle: [],
  };
  for (const f of findings) byCategory[f.category].push(f);

  const summary = generateSummary(app, findings, riskLevel);
  const recommendation = generateRecommendation(app, findings, riskLevel, blockers);

  return {
    caseId: app.id,
    caseNumber: app.caseNumber,
    generatedAt: new Date().toISOString(),
    ruleSetVersion: RULE_SET_VERSION,
    riskScore,
    riskLevel,
    blockers,
    findings,
    byCategory,
    summary,
    recommendation,
  };
}

function generateSummary(
  app: Application,
  findings: Finding[],
  riskLevel: AdviceReport["riskLevel"],
): string {
  if (findings.length === 0) {
    return `Aanvraag ${app.caseNumber} vertoont geen risicofactoren. Documenten lijken compleet en er is geen overlap met bestaande rechten of beschermde gebieden gedetecteerd.`;
  }
  const cats = new Set(findings.map(f => f.category));
  const cat = Array.from(cats).join(", ");
  return `Aanvraag ${app.caseNumber} (${app.district}) vertoont ${findings.length} bevinding${findings.length === 1 ? "" : "en"} in ${cats.size} categorie${cats.size === 1 ? "" : "ën"} (${cat}). Risiconiveau: **${riskLevelLabel(riskLevel)}**.`;
}

function generateRecommendation(
  app: Application,
  findings: Finding[],
  riskLevel: AdviceReport["riskLevel"],
  blockers: string[],
): string {
  if (blockers.length > 0) {
    const fpic = findings.some(f => f.triggers?.includes("fpic_required"));
    const nma = findings.some(f => f.triggers?.includes("nma_review_required"));
    const triggers = [
      fpic && "FPIC-procedure starten met betrokken gemeenschap",
      nma && "NMA-reviewtaak aanmaken en MER-status afwachten",
    ].filter(Boolean).join("; ");
    return `**Niet besluitbaar** in huidige staat: ${blockers.length} hard blocker${blockers.length === 1 ? "" : "s"} actief. Vereiste acties: ${triggers || "blokkades opheffen"}. Beschikking aanhouden tot blokkades zijn weggenomen.`;
  }
  if (riskLevel === "hoog" || riskLevel === "zeer_hoog") {
    return `Juridische én GIS-review verplicht voordat besluitvorming plaatsvindt. Overweeg overleg met betrokken stakeholders.`;
  }
  if (riskLevel === "middel") {
    return `Senior review aanbevolen. Aanvullende documentatie of consultatie kan benodigd zijn.`;
  }
  return `Geschikt voor administratieve afhandeling. Standaard workflow voortzetten met publicatie en bezwaartermijn (30 dagen, Decreet Uitgifte Domeingrond).`;
}

export function riskLevelLabel(level: AdviceReport["riskLevel"]): string {
  switch (level) {
    case "laag": return "Laag";
    case "middel": return "Middel";
    case "hoog": return "Hoog";
    case "zeer_hoog": return "Zeer hoog";
  }
}

export function categoryLabel(cat: RuleCategory): string {
  switch (cat) {
    case "administratief": return "Administratief";
    case "juridisch": return "Juridisch";
    case "ruimtelijk": return "Ruimtelijk";
    case "sociaal": return "Sociaal / FPIC";
    case "beleid": return "Beleid";
    case "lifecycle": return "Levenscyclus (grondhuur, conversie, vervallen)";
  }
}
