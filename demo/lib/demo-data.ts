/**
 * SGDP demo-dataset
 *
 * Volledig fictief. Geïnspireerd op Surinaamse geografie maar alle namen,
 * coördinaten, gemeenschappen en aanvragen zijn met opzet "DEMO_..."
 * gelabeld zodat geen verwarring met echte data ontstaat.
 *
 * Geometrieën zijn ruwweg over Suriname-gebied (tussen 54-58°W en 2-6°N)
 * geplaatst — voldoende realistisch voor een kaart-demo.
 */

import type { Feature, Polygon, FeatureCollection } from "geojson";

// ─────────────────────────────────────────────────────────────────
// Districten (3 demo)
// ─────────────────────────────────────────────────────────────────
export const districts = [
  { id: "MAR", name: "DEMO_Marowijne",   color: "#2c6c3c" },
  { id: "SIP", name: "DEMO_Sipaliwini",  color: "#377e3f" },
  { id: "PAR", name: "DEMO_Para",        color: "#4a9152" },
] as const;

export type DistrictId = (typeof districts)[number]["id"];

// ─────────────────────────────────────────────────────────────────
// Helper: bouw een rechthoekig polygoon
// ─────────────────────────────────────────────────────────────────
function rect(west: number, south: number, east: number, north: number): Polygon {
  return {
    type: "Polygon",
    coordinates: [[
      [west, south], [east, south], [east, north], [west, north], [west, south],
    ]],
  };
}

function poly(coords: number[][]): Polygon {
  return { type: "Polygon", coordinates: [[...coords, coords[0]]] };
}

// ─────────────────────────────────────────────────────────────────
// ITP-gemeenschappen + traditionele woon- en leefgebieden
// ─────────────────────────────────────────────────────────────────
export type Community = {
  id: string;
  name: string;
  peopleGroup: "inheems" | "tribaal_marron";
  district: DistrictId;
  traditionalAuthority: { granman?: string; kapiteins: string[]; basjas: string[] };
  populationEstimate: number;
  primaryLanguage: string;
  fpicContactPerson: string;
};

export const communities: Community[] = [
  {
    id: "COM-001",
    name: "DEMO_Inheems_Galibi",
    peopleGroup: "inheems",
    district: "MAR",
    traditionalAuthority: {
      granman: "DEMO_Granman_A. Petrusi",
      kapiteins: ["DEMO_Kapt. M. Aluman", "DEMO_Kapt. R. Kasawya"],
      basjas: ["DEMO_Basja H. Tepu", "DEMO_Basja S. Iyoki"],
    },
    populationEstimate: 1240,
    primaryLanguage: "Kalina",
    fpicContactPerson: "DEMO_Kapt. M. Aluman",
  },
  {
    id: "COM-002",
    name: "DEMO_Tribaal_Brokopondo",
    peopleGroup: "tribaal_marron",
    district: "SIP",
    traditionalAuthority: {
      granman: "DEMO_Granman_C. Adjako",
      kapiteins: ["DEMO_Kapt. J. Pansa", "DEMO_Kapt. T. Adjuba"],
      basjas: ["DEMO_Basja A. Sapali"],
    },
    populationEstimate: 870,
    primaryLanguage: "Saramaccaans",
    fpicContactPerson: "DEMO_Granman_C. Adjako",
  },
  {
    id: "COM-003",
    name: "DEMO_Inheems_Wayana_Apetina",
    peopleGroup: "inheems",
    district: "SIP",
    traditionalAuthority: {
      granman: "DEMO_Granman_J. Aloiké",
      kapiteins: ["DEMO_Kapt. P. Tïlewuyu"],
      basjas: ["DEMO_Basja N. Talawë"],
    },
    populationEstimate: 410,
    primaryLanguage: "Wayana",
    fpicContactPerson: "DEMO_Kapt. P. Tïlewuyu",
  },
  {
    id: "COM-004",
    name: "DEMO_Tribaal_Aukaans_Diitabiki",
    peopleGroup: "tribaal_marron",
    district: "MAR",
    traditionalAuthority: {
      granman: "DEMO_Granman_R. Misiedjan",
      kapiteins: ["DEMO_Kapt. E. Pinas", "DEMO_Kapt. M. Akontu"],
      basjas: ["DEMO_Basja D. Boné", "DEMO_Basja F. Adjako"],
    },
    populationEstimate: 1780,
    primaryLanguage: "Aukaans",
    fpicContactPerson: "DEMO_Kapt. E. Pinas",
  },
  {
    id: "COM-005",
    name: "DEMO_Inheems_Lokono_Cassipora",
    peopleGroup: "inheems",
    district: "PAR",
    traditionalAuthority: {
      kapiteins: ["DEMO_Kapt. L. Sabajo"],
      basjas: ["DEMO_Basja V. Karwafodi"],
    },
    populationEstimate: 320,
    primaryLanguage: "Lokono",
    fpicContactPerson: "DEMO_Kapt. L. Sabajo",
  },
];

// Traditionele woon- en leefgebieden (polygonen)
export const customaryTerritories: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "CT-001",
      properties: { id: "CT-001", communityId: "COM-001", name: "DEMO_Galibi traditioneel gebied", areaHa: 18400 },
      geometry: rect(-54.6, 5.55, -54.0, 5.95),
    },
    {
      type: "Feature",
      id: "CT-002",
      properties: { id: "CT-002", communityId: "COM-002", name: "DEMO_Brokopondo traditioneel gebied", areaHa: 32600 },
      geometry: rect(-55.6, 4.55, -55.0, 5.05),
    },
    {
      type: "Feature",
      id: "CT-003",
      properties: { id: "CT-003", communityId: "COM-003", name: "DEMO_Wayana Apetina gebied", areaHa: 41200 },
      geometry: rect(-55.5, 3.30, -54.8, 3.85),
    },
    {
      type: "Feature",
      id: "CT-004",
      properties: { id: "CT-004", communityId: "COM-004", name: "DEMO_Diitabiki Aukaans gebied", areaHa: 28800 },
      geometry: rect(-54.45, 4.75, -53.85, 5.30),
    },
    {
      type: "Feature",
      id: "CT-005",
      properties: { id: "CT-005", communityId: "COM-005", name: "DEMO_Cassipora Lokono gebied", areaHa: 9200 },
      geometry: rect(-55.30, 5.30, -55.05, 5.50),
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Concessies
// ─────────────────────────────────────────────────────────────────
export type Concession = {
  id: string;
  name: string;
  type: "mijnbouw" | "bosbouw" | "olie_gas" | "landbouw";
  holder: string;
  validFrom: string;
  validTo: string;
  district: DistrictId;
  status: "actief" | "verlopen" | "in_geschil";
};

export const concessions: Concession[] = [
  {
    id: "CON-001", name: "DEMO_Goudconcessie A-12",
    type: "mijnbouw", holder: "DEMO_AurumNoord N.V.",
    validFrom: "2019-03-01", validTo: "2034-03-01",
    district: "MAR", status: "actief",
  },
  {
    id: "CON-002", name: "DEMO_Houtconcessie B-7",
    type: "bosbouw", holder: "DEMO_Tropisch Hout B.V.",
    validFrom: "2020-08-15", validTo: "2030-08-15",
    district: "SIP", status: "actief",
  },
  {
    id: "CON-003", name: "DEMO_Landbouwconcessie C-3",
    type: "landbouw", holder: "DEMO_AgroPara N.V.",
    validFrom: "2022-01-10", validTo: "2042-01-10",
    district: "PAR", status: "actief",
  },
];

export const concessionGeometries: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "CON-001",
      properties: { id: "CON-001", name: "DEMO_Goudconcessie A-12", type: "mijnbouw" },
      // Overlapt met DEMO_Galibi (CT-001) — bewust voor de demo
      geometry: rect(-54.4, 5.65, -53.85, 6.05),
    },
    {
      type: "Feature",
      id: "CON-002",
      properties: { id: "CON-002", name: "DEMO_Houtconcessie B-7", type: "bosbouw" },
      geometry: rect(-55.95, 4.20, -55.40, 4.70),
    },
    {
      type: "Feature",
      id: "CON-003",
      properties: { id: "CON-003", name: "DEMO_Landbouwconcessie C-3", type: "landbouw" },
      geometry: rect(-55.70, 5.55, -55.30, 5.85),
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Beschermde gebieden
// ─────────────────────────────────────────────────────────────────
export const protectedAreas: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "PA-001",
      properties: { id: "PA-001", name: "DEMO_Natuurreservaat Marowijne-Oost", category: "natuurreservaat", areaHa: 52000 },
      geometry: rect(-54.20, 4.10, -53.50, 4.85),
    },
    {
      type: "Feature",
      id: "PA-002",
      properties: { id: "PA-002", name: "DEMO_Beschermd kustgebied", category: "beschermd_kustgebied", areaHa: 14500 },
      geometry: rect(-54.95, 5.85, -54.55, 6.05),
    },
  ],
};

// ─────────────────────────────────────────────────────────────────
// Percelen (formele rechten)
// ─────────────────────────────────────────────────────────────────
export type Parcel = {
  perceelsid: string;
  district: DistrictId;
  areaHa: number;
  rrrType: "eigendom" | "erfpacht" | "grondhuur";
  holder: string;
  startDate: string;
  endDate?: string;
  status: "actief" | "verlopen" | "in_conversie";
  annualFee?: number;
};

// We genereren ~50 percelen verspreid over de drie districten.
function generateParcels(): { parcels: Parcel[]; geometries: FeatureCollection<Polygon> } {
  const parcels: Parcel[] = [];
  const features: Feature<Polygon>[] = [];

  const config = [
    { district: "PAR" as DistrictId, west: -55.30, south: 5.55, count: 22 },
    { district: "MAR" as DistrictId, west: -54.55, south: 5.30, count: 14 },
    { district: "SIP" as DistrictId, west: -55.50, south: 4.55, count: 14 },
  ];

  let serial = 1;
  for (const c of config) {
    const cols = Math.ceil(Math.sqrt(c.count));
    const cellSize = 0.025;
    for (let i = 0; i < c.count; i++) {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const w = c.west + col * cellSize;
      const s = c.south + row * cellSize;
      const e = w + cellSize * 0.85;
      const n = s + cellSize * 0.85;

      const id = `${c.district}-P-${String(serial).padStart(4, "0")}`;
      const rrrPick = serial % 7;
      const rrrType: Parcel["rrrType"] =
        rrrPick === 0 ? "eigendom" :
        rrrPick % 2 === 0 ? "erfpacht" : "grondhuur";
      const startYear = 2005 + (serial % 18);
      const startDate = `${startYear}-${String((serial % 12) + 1).padStart(2, "0")}-15`;
      const endDate = rrrType === "grondhuur"
        ? `${startYear + 25 + (serial % 16)}-${String((serial % 12) + 1).padStart(2, "0")}-15`
        : rrrType === "erfpacht"
        ? `${startYear + 40}-${String((serial % 12) + 1).padStart(2, "0")}-15`
        : undefined;

      parcels.push({
        perceelsid: id,
        district: c.district,
        areaHa: Math.round((cellSize * cellSize * 12300) * 100) / 100,
        rrrType,
        holder: `DEMO_Houder_${id}`,
        startDate,
        endDate,
        status: "actief",
        annualFee: rrrType === "grondhuur" ? 250 + (serial % 9) * 50 : undefined,
      });

      features.push({
        type: "Feature",
        id,
        properties: {
          perceelsid: id,
          district: c.district,
          rrrType,
          holder: `DEMO_Houder_${id}`,
        },
        geometry: rect(w, s, e, n),
      });

      serial++;
    }
  }

  return {
    parcels,
    geometries: { type: "FeatureCollection", features },
  };
}

const _generated = generateParcels();
export const parcels = _generated.parcels;
export const parcelGeometries = _generated.geometries;

// ─────────────────────────────────────────────────────────────────
// Aanvragen (domeingrond)
// ─────────────────────────────────────────────────────────────────
export type Application = {
  id: string;
  caseNumber: string;
  applicantName: string;
  applicantId: string;
  nationality: string;
  applicationType: "specifiek" | "algemeen";
  purpose: "bebouwing_bewoning" | "landbouw" | "industrie" | "mijnbouw_klein" | "andere";
  district: DistrictId;
  perceelsid?: string;
  geometryRef: string; // verwijst naar appGeometries
  submittedAt: string;
  status:
    | "ontvangen" | "documentcontrole" | "incompleet" | "in_onderzoek"
    | "landmetercontrole" | "bezwaarperiode" | "juridisch_advies"
    | "besluit" | "beschikking" | "afgewezen" | "geblokkeerd";
  riskScore: number;
  riskLevel: "laag" | "middel" | "hoog" | "zeer_hoog";
  blockers: string[];
  documentsProvided: string[];
  documentsMissing: string[];
  fpicRequired: boolean;
  fpicCommunityId?: string;
  envReviewRequired: boolean;
  publishedAt?: string;
  objectionDeadline?: string;
};

export const applications: Application[] = [
  {
    id: "APP-2026-001",
    caseNumber: "DG-2026-0001",
    applicantName: "DEMO_Aanvrager R. Pansa",
    applicantId: "1234567",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "bebouwing_bewoning",
    district: "PAR",
    geometryRef: "AG-001",
    submittedAt: "2026-04-22",
    status: "documentcontrole",
    riskScore: 18,
    riskLevel: "laag",
    blockers: [],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
    documentsMissing: [],
    fpicRequired: false,
    envReviewRequired: false,
    publishedAt: "2026-04-23",
    objectionDeadline: "2026-05-23",
  },
  {
    id: "APP-2026-002",
    caseNumber: "DG-2026-0002",
    applicantName: "DEMO_Aanvrager K. Adjako",
    applicantId: "2345678",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "landbouw",
    district: "MAR",
    geometryRef: "AG-002",
    submittedAt: "2026-04-15",
    status: "geblokkeerd",
    riskScore: 78,
    riskLevel: "zeer_hoog",
    blockers: [
      "Aanvraag ligt binnen traditioneel woon- en leefgebied DEMO_Galibi (CT-001)",
      "Aanvraag overlapt voor 64% met DEMO_Goudconcessie A-12",
      "FPIC-procedure niet gestart",
    ],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
    documentsMissing: [],
    fpicRequired: true,
    fpicCommunityId: "COM-001",
    envReviewRequired: false,
    publishedAt: "2026-04-16",
    objectionDeadline: "2026-05-16",
  },
  {
    id: "APP-2026-003",
    caseNumber: "DG-2026-0003",
    applicantName: "DEMO_Aanvrager L. Boné",
    applicantId: "3456789",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "bebouwing_bewoning",
    district: "MAR",
    geometryRef: "AG-003",
    submittedAt: "2026-04-08",
    status: "incompleet",
    riskScore: 42,
    riskLevel: "middel",
    blockers: ["Hypothecair uittreksel ontbreekt"],
    documentsProvided: ["id_kopie", "figuratieve_kaart"],
    documentsMissing: ["nationaliteitsverklaring"],
    fpicRequired: false,
    envReviewRequired: false,
  },
  {
    id: "APP-2026-004",
    caseNumber: "DG-2026-0004",
    applicantName: "DEMO_AgroPara N.V.",
    applicantId: "KVK-50012345",
    nationality: "rechtspersoon_SUR",
    applicationType: "specifiek",
    purpose: "landbouw",
    district: "PAR",
    geometryRef: "AG-004",
    submittedAt: "2026-03-29",
    status: "in_onderzoek",
    riskScore: 28,
    riskLevel: "middel",
    blockers: [],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart", "kvk_uittreksel"],
    documentsMissing: [],
    fpicRequired: false,
    envReviewRequired: false,
    publishedAt: "2026-03-30",
    objectionDeadline: "2026-04-29",
  },
  {
    id: "APP-2026-005",
    caseNumber: "DG-2026-0005",
    applicantName: "DEMO_Aanvrager S. Iyoki",
    applicantId: "4567890",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "bebouwing_bewoning",
    district: "SIP",
    geometryRef: "AG-005",
    submittedAt: "2026-04-30",
    status: "geblokkeerd",
    riskScore: 85,
    riskLevel: "zeer_hoog",
    blockers: [
      "Aanvraag overlapt voor 100% met beschermd gebied DEMO_Natuurreservaat Marowijne-Oost",
      "MEA-plicht gedetecteerd; MER-status ontbreekt",
      "NMA-review verplicht",
    ],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
    documentsMissing: [],
    fpicRequired: false,
    envReviewRequired: true,
  },
  {
    id: "APP-2026-006",
    caseNumber: "DG-2026-0006",
    applicantName: "DEMO_Aanvrager T. Adjuba",
    applicantId: "5678901",
    nationality: "SUR",
    applicationType: "algemeen",
    purpose: "andere",
    district: "SIP",
    geometryRef: "AG-006",
    submittedAt: "2026-04-12",
    status: "bezwaarperiode",
    riskScore: 35,
    riskLevel: "middel",
    blockers: [],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie"],
    documentsMissing: [],
    fpicRequired: false,
    envReviewRequired: false,
    publishedAt: "2026-04-15",
    objectionDeadline: "2026-05-15",
  },
  {
    id: "APP-2026-007",
    caseNumber: "DG-2026-0007",
    applicantName: "DEMO_Aanvrager M. Aluman",
    applicantId: "6789012",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "bebouwing_bewoning",
    district: "MAR",
    geometryRef: "AG-007",
    submittedAt: "2026-03-20",
    status: "juridisch_advies",
    riskScore: 58,
    riskLevel: "hoog",
    blockers: ["Aanvraag overlapt voor 12% met perceel MAR-P-0023 (eigendom)"],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
    documentsMissing: [],
    fpicRequired: false,
    envReviewRequired: false,
    publishedAt: "2026-03-22",
    objectionDeadline: "2026-04-21",
  },
  {
    id: "APP-2026-008",
    caseNumber: "DG-2026-0008",
    applicantName: "DEMO_Aanvrager V. Karwafodi",
    applicantId: "7890123",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "bebouwing_bewoning",
    district: "PAR",
    geometryRef: "AG-008",
    submittedAt: "2026-04-05",
    status: "in_onderzoek",
    riskScore: 48,
    riskLevel: "middel",
    blockers: ["Aanvraag ligt nabij traditioneel gebied DEMO_Cassipora Lokono — consultatie aanbevolen"],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
    documentsMissing: [],
    fpicRequired: false,
    fpicCommunityId: "COM-005",
    envReviewRequired: false,
    publishedAt: "2026-04-07",
    objectionDeadline: "2026-05-07",
  },
  {
    id: "APP-2026-009",
    caseNumber: "DG-2026-0009",
    applicantName: "DEMO_Aanvrager F. Adjako",
    applicantId: "8901234",
    nationality: "SUR",
    applicationType: "specifiek",
    purpose: "landbouw",
    district: "MAR",
    geometryRef: "AG-009",
    submittedAt: "2026-04-26",
    status: "geblokkeerd",
    riskScore: 72,
    riskLevel: "hoog",
    blockers: [
      "Aanvraag ligt binnen traditioneel woon- en leefgebied DEMO_Diitabiki Aukaans (CT-004)",
      "FPIC-procedure niet gestart",
    ],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie", "figuratieve_kaart"],
    documentsMissing: [],
    fpicRequired: true,
    fpicCommunityId: "COM-004",
    envReviewRequired: false,
  },
  {
    id: "APP-2026-010",
    caseNumber: "DG-2026-0010",
    applicantName: "DEMO_Aanvrager E. Pinas",
    applicantId: "9012345",
    nationality: "SUR",
    applicationType: "algemeen",
    purpose: "andere",
    district: "PAR",
    geometryRef: "AG-010",
    submittedAt: "2026-04-18",
    status: "documentcontrole",
    riskScore: 12,
    riskLevel: "laag",
    blockers: [],
    documentsProvided: ["nationaliteitsverklaring", "id_kopie"],
    documentsMissing: [],
    fpicRequired: false,
    envReviewRequired: false,
    publishedAt: "2026-04-19",
    objectionDeadline: "2026-05-19",
  },
];

export const applicationGeometries: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    { type: "Feature", id: "AG-001", properties: { id: "AG-001", caseNumber: "DG-2026-0001", riskLevel: "laag" }, geometry: rect(-55.27, 5.62, -55.255, 5.635) },
    { type: "Feature", id: "AG-002", properties: { id: "AG-002", caseNumber: "DG-2026-0002", riskLevel: "zeer_hoog" }, geometry: rect(-54.30, 5.75, -54.20, 5.85) },
    { type: "Feature", id: "AG-003", properties: { id: "AG-003", caseNumber: "DG-2026-0003", riskLevel: "middel" }, geometry: rect(-54.45, 5.42, -54.43, 5.44) },
    { type: "Feature", id: "AG-004", properties: { id: "AG-004", caseNumber: "DG-2026-0004", riskLevel: "middel" }, geometry: rect(-55.45, 5.62, -55.35, 5.72) },
    { type: "Feature", id: "AG-005", properties: { id: "AG-005", caseNumber: "DG-2026-0005", riskLevel: "zeer_hoog" }, geometry: rect(-54.05, 4.30, -53.85, 4.50) },
    { type: "Feature", id: "AG-006", properties: { id: "AG-006", caseNumber: "DG-2026-0006", riskLevel: "middel" }, geometry: rect(-55.40, 4.65, -55.38, 4.67) },
    { type: "Feature", id: "AG-007", properties: { id: "AG-007", caseNumber: "DG-2026-0007", riskLevel: "hoog" }, geometry: rect(-54.50, 5.32, -54.48, 5.34) },
    { type: "Feature", id: "AG-008", properties: { id: "AG-008", caseNumber: "DG-2026-0008", riskLevel: "middel" }, geometry: rect(-55.05, 5.31, -55.02, 5.34) },
    { type: "Feature", id: "AG-009", properties: { id: "AG-009", caseNumber: "DG-2026-0009", riskLevel: "hoog" }, geometry: rect(-54.20, 4.95, -54.10, 5.05) },
    { type: "Feature", id: "AG-010", properties: { id: "AG-010", caseNumber: "DG-2026-0010", riskLevel: "laag" }, geometry: rect(-55.20, 5.65, -55.19, 5.66) },
  ],
};

// ─────────────────────────────────────────────────────────────────
// FPIC processen
// ─────────────────────────────────────────────────────────────────
export type FpicProcess = {
  id: string;
  caseId: string;
  communityId: string;
  status:
    | "niet_gestart" | "identificatie_gezag" | "informatie_verstrekt"
    | "consultatie_lopend" | "instemming" | "voorwaardelijke_instemming"
    | "bezwaar" | "ingetrokken" | "heropening_vereist";
  startedAt?: string;
  lastEventAt?: string;
  conditions?: string[];
  events: FpicEvent[];
};

export type FpicEvent = {
  id: string;
  date: string;
  type:
    | "info_provided" | "meeting" | "feedback_received"
    | "objection_filed" | "condition_added" | "consent_given" | "consent_withdrawn";
  location?: string;
  attendees: string[];
  notes: string;
  evidence: { type: "audio" | "video" | "foto" | "verslag" | "handtekening"; label: string }[];
};

export const fpicProcesses: FpicProcess[] = [
  {
    id: "FPIC-001",
    caseId: "APP-2026-002",
    communityId: "COM-001",
    status: "niet_gestart",
    events: [],
  },
  {
    id: "FPIC-002",
    caseId: "APP-2026-009",
    communityId: "COM-004",
    status: "consultatie_lopend",
    startedAt: "2026-04-15",
    lastEventAt: "2026-05-02",
    events: [
      {
        id: "FE-001",
        date: "2026-04-15",
        type: "info_provided",
        location: "Diitabiki dorpscentrum",
        attendees: ["DEMO_Granman_R. Misiedjan", "DEMO_Kapt. E. Pinas", "DEMO_Kapt. M. Akontu", "Werkgroep secretariaat"],
        notes: "Informatiepakket overhandigd in Aukaans en Nederlands. Vertaling door dorpsraad-vertaler. Reflectieperiode 3 weken afgesproken op verzoek gezag.",
        evidence: [
          { type: "verslag", label: "Verslag info-sessie 2026-04-15.pdf" },
          { type: "foto", label: "Aanwezigheid groepsfoto.jpg" },
          { type: "audio", label: "Audio-opname info-sessie.m4a" },
        ],
      },
      {
        id: "FE-002",
        date: "2026-05-02",
        type: "meeting",
        location: "Diitabiki dorpscentrum",
        attendees: ["DEMO_Granman_R. Misiedjan", "DEMO_Kapt. E. Pinas", "20 dorpsbewoners", "Werkstroom Consultatie", "VIDS-waarnemer"],
        notes: "Eerste plenaire consultatiesessie. Vragen over impact op jacht- en visgebieden. Verzoek om aanvullende kaart met seizoensgebonden gebruikslagen.",
        evidence: [
          { type: "verslag", label: "Notulen plenaire sessie 2026-05-02.pdf" },
          { type: "video", label: "Video plenaire sessie (deel 1-3).mp4" },
          { type: "handtekening", label: "Aanwezigheidslijst getekend door gezag.pdf" },
        ],
      },
    ],
  },
  {
    id: "FPIC-003",
    caseId: "DEMO_HIST-001",
    communityId: "COM-002",
    status: "voorwaardelijke_instemming",
    startedAt: "2025-11-12",
    lastEventAt: "2026-03-08",
    conditions: [
      "Geen activiteit binnen 500 m van heilige plaats Saramaka-bron",
      "Maandelijkse rapportage aan Granman",
      "Werkgelegenheid voor minimaal 30% lokale gemeenschap",
    ],
    events: [
      { id: "FE-101", date: "2025-11-12", type: "info_provided", attendees: ["DEMO_Granman_C. Adjako"], notes: "Informatiepakket overhandigd.", evidence: [{ type: "verslag", label: "Eerste contact 2025-11-12.pdf" }] },
      { id: "FE-102", date: "2025-12-20", type: "meeting", attendees: ["Volledige dorpsraad", "Werkstroom Consultatie"], notes: "Plenaire bespreking. Voorwaarden besproken.", evidence: [{ type: "verslag", label: "Notulen 2025-12-20.pdf" }] },
      { id: "FE-103", date: "2026-02-14", type: "condition_added", attendees: ["DEMO_Granman_C. Adjako", "Vrouwenraad"], notes: "Drie voorwaarden formeel vastgelegd.", evidence: [{ type: "handtekening", label: "Voorwaarden getekend.pdf" }] },
      { id: "FE-104", date: "2026-03-08", type: "consent_given", attendees: ["DEMO_Granman_C. Adjako"], notes: "Voorwaardelijke instemming bevestigd.", evidence: [{ type: "verslag", label: "Verklaring instemming 2026-03-08.pdf" }] },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────
// Werkgroep
// ─────────────────────────────────────────────────────────────────
export const workgroupMembers = [
  { id: "WG-01", name: "Edgar Dikan",       role: "Voorzitter / Presidentieel adviseur", workstream: "alle" },
  { id: "WG-02", name: "Armand Jurel",      role: "Lid",                               workstream: "decentralisatie" },
  { id: "WG-03", name: "Theresia Cirino",   role: "Lid",                               workstream: "consultatie" },
  { id: "WG-04", name: "Mike Nerkust",      role: "Lid",                               workstream: "inventarisatie_gis" },
  { id: "WG-05", name: "Martin Misiedjan",  role: "Lid (juridisch)",                   workstream: "juridisch" },
  { id: "WG-06", name: "Sarwan Ramai",      role: "Lid",                               workstream: "decentralisatie" },
] as const;

export type Meeting = {
  id: string;
  date: string;
  type: "plenair" | "werkstroom" | "klankbord" | "veldconsultatie" | "stuur_president";
  title: string;
  location: string;
  attendees: string[];
  agenda: string[];
  decisions: string[];
  actionItemsCreated: number;
};

export const meetings: Meeting[] = [
  {
    id: "MTG-2026-W18",
    date: "2026-05-04",
    type: "plenair",
    title: "Plenaire werkgroep — week 18",
    location: "Kabinet van de President, Paramaribo",
    attendees: ["WG-01", "WG-02", "WG-03", "WG-04", "WG-05", "WG-06"],
    agenda: [
      "Vaststelling notulen W17",
      "Voortgang inventarisatie ITP-gebieden (Mike Nerkust)",
      "FPIC-traject Diitabiki — tussentijdse stand (Theresia Cirino)",
      "Juridisch advies overlap CON-001 / CT-001 (Martin Misiedjan)",
      "Concept-tussentijdsrapport President",
      "Communicatieplan persvragen",
    ],
    decisions: [
      "Inventarisatie van CT-002 en CT-003 in mei afronden",
      "Klankbordsessie met VIDS verzetten naar 21 mei",
      "Conceptrapport President gereed voor 18 mei",
    ],
    actionItemsCreated: 7,
  },
  {
    id: "MTG-2026-W17",
    date: "2026-04-27",
    type: "plenair",
    title: "Plenaire werkgroep — week 17",
    location: "Kabinet van de President, Paramaribo",
    attendees: ["WG-01", "WG-02", "WG-04", "WG-05", "WG-06"],
    agenda: [
      "Voortgang werkstromen",
      "Risicoregister update",
      "Eerste platform-demo SGDP",
    ],
    decisions: [
      "Risico RW-03 (gebrekkige basisdata MI-GLIS) bevestigd op middel-impact",
      "Akkoord op SGDP-platform als werkomgeving werkgroep",
    ],
    actionItemsCreated: 4,
  },
  {
    id: "MTG-2026-VLD-DIITABIKI",
    date: "2026-05-02",
    type: "veldconsultatie",
    title: "Veldconsultatie Diitabiki — plenaire sessie",
    location: "Diitabiki dorpscentrum",
    attendees: ["WG-03", "Granman", "Kapiteins", "20 dorpsbewoners", "VIDS-waarnemer"],
    agenda: [
      "Toelichting aanvraag DG-2026-0009",
      "Kaart met traditioneel gebruik",
      "Vragen en zorgen gemeenschap",
    ],
    decisions: [
      "Vervolgsessie 2026-05-23 voor besluitvorming gemeenschap",
      "Aanvullende kaart met seizoensgebonden gebruik wordt aangeleverd door werkgroep",
    ],
    actionItemsCreated: 3,
  },
];

export type Decision = {
  id: string;
  meetingId: string;
  date: string;
  title: string;
  outcome: string;
  vote: { for: number; against: number; abstain: number };
  minorityView?: string;
  status: "open" | "in_uitvoering" | "voltooid" | "ingetrokken";
  linkedCases: string[];
};

export const decisions: Decision[] = [
  {
    id: "BES-2026-018",
    meetingId: "MTG-2026-W18",
    date: "2026-05-04",
    title: "Conceptrapport President gereed voor 18 mei",
    outcome: "Werkgroep stemt unaniem in met voorgestelde indeling van het tussentijds rapport (5 hoofdstukken + bijlagen kaartset, FPIC-status, conflictanalyse).",
    vote: { for: 6, against: 0, abstain: 0 },
    status: "in_uitvoering",
    linkedCases: [],
  },
  {
    id: "BES-2026-017",
    meetingId: "MTG-2026-W18",
    date: "2026-05-04",
    title: "Juridisch advies overlap CON-001 / CT-001",
    outcome: "Werkgroep verzoekt Martin Misiedjan om binnen 14 dagen een juridisch memo op te leveren over de aansprakelijkheid bij voortzetting van DEMO_Goudconcessie A-12 in DEMO_Galibi traditioneel gebied. Aansluiten bij IACHR Saramaka-jurisprudentie.",
    vote: { for: 5, against: 0, abstain: 1 },
    status: "in_uitvoering",
    linkedCases: ["APP-2026-002", "FPIC-001"],
  },
  {
    id: "BES-2026-016",
    meetingId: "MTG-2026-W17",
    date: "2026-04-27",
    title: "SGDP-platform als werkomgeving werkgroep",
    outcome: "Werkgroep accepteert het SGDP-platform als de officiële digitale werkomgeving voor inventarisatie, conflictanalyse en advies. Gebruikersaccounts worden verstrekt aan alle leden en het secretariaat.",
    vote: { for: 5, against: 0, abstain: 0 },
    status: "voltooid",
    linkedCases: [],
  },
];

export type ActionItem = {
  id: string;
  description: string;
  ownerId: string;
  dueDate: string;
  status: "open" | "in_uitvoering" | "voltooid" | "achterstallig";
  meetingId?: string;
  workstream: string;
};

export const actionItems: ActionItem[] = [
  { id: "ACT-2026-101", description: "Concept tussentijds rapport President opstellen — 5 hoofdstukken", ownerId: "WG-01", dueDate: "2026-05-18", status: "in_uitvoering", meetingId: "MTG-2026-W18", workstream: "rapportage" },
  { id: "ACT-2026-102", description: "Juridisch memo overlap CON-001 / CT-001 (IACHR Saramaka-toets)", ownerId: "WG-05", dueDate: "2026-05-18", status: "in_uitvoering", meetingId: "MTG-2026-W18", workstream: "juridisch" },
  { id: "ACT-2026-103", description: "Inventarisatie CT-002 afronden — kaart + bewijsregister", ownerId: "WG-04", dueDate: "2026-05-15", status: "in_uitvoering", meetingId: "MTG-2026-W18", workstream: "inventarisatie_gis" },
  { id: "ACT-2026-104", description: "Inventarisatie CT-003 (Wayana Apetina) — voorbereiding veldbezoek", ownerId: "WG-04", dueDate: "2026-05-25", status: "open", meetingId: "MTG-2026-W18", workstream: "inventarisatie_gis" },
  { id: "ACT-2026-105", description: "Vervolgsessie Diitabiki organiseren (logistiek + agenda)", ownerId: "WG-03", dueDate: "2026-05-23", status: "in_uitvoering", meetingId: "MTG-2026-VLD-DIITABIKI", workstream: "consultatie" },
  { id: "ACT-2026-106", description: "Aanvullende kaart seizoensgebruik Diitabiki opleveren", ownerId: "WG-04", dueDate: "2026-05-20", status: "open", meetingId: "MTG-2026-VLD-DIITABIKI", workstream: "inventarisatie_gis" },
  { id: "ACT-2026-107", description: "Persmoment voorbereiden (samenvatting voor pers)", ownerId: "WG-01", dueDate: "2026-05-12", status: "open", meetingId: "MTG-2026-W18", workstream: "communicatie" },
  { id: "ACT-2026-098", description: "Risico-update RW-03 (basisdata MI-GLIS)", ownerId: "WG-06", dueDate: "2026-05-04", status: "achterstallig", workstream: "rapportage" },
  { id: "ACT-2026-099", description: "Afspraak met VIDS over klankbordsessie 21 mei", ownerId: "WG-03", dueDate: "2026-05-08", status: "in_uitvoering", workstream: "consultatie" },
  { id: "ACT-2026-088", description: "Stakeholderregister bijwerken — KAMPOS contactpersonen", ownerId: "WG-03", dueDate: "2026-04-20", status: "voltooid", workstream: "consultatie" },
];

// ─────────────────────────────────────────────────────────────────
// Mijlpalen
// ─────────────────────────────────────────────────────────────────
export type Milestone = {
  code: string;
  title: string;
  phase: "F1" | "F2" | "F3" | "F4" | "F5";
  targetDate: string;
  status: "voltooid" | "in_uitvoering" | "gepland" | "at_risk";
};

export const milestones: Milestone[] = [
  { code: "M1.1", title: "Constituerende vergadering, mandaat bevestigd", phase: "F1", targetDate: "2026-01-08", status: "voltooid" },
  { code: "M1.2", title: "Plan van aanpak vastgesteld", phase: "F1", targetDate: "2026-01-22", status: "voltooid" },
  { code: "M1.3", title: "RACI + communicatieplan vastgesteld", phase: "F1", targetDate: "2026-01-29", status: "voltooid" },
  { code: "M2.1", title: "Datasources geïdentificeerd, koppelingen besproken", phase: "F2", targetDate: "2026-02-12", status: "voltooid" },
  { code: "M2.2", title: "GIS-baseline operationeel in SGDP", phase: "F2", targetDate: "2026-03-12", status: "voltooid" },
  { code: "M2.3", title: "Concessielaag, MI-GLIS-laag, ITP-laag samengevoegd", phase: "F2", targetDate: "2026-04-09", status: "in_uitvoering" },
  { code: "M2.4", title: "Inventarisatieverslag concept", phase: "F2", targetDate: "2026-04-23", status: "at_risk" },
  { code: "M3.1", title: "Eerste veldconsultatie", phase: "F3", targetDate: "2026-03-26", status: "voltooid" },
  { code: "M3.2", title: "50% gebieden FPIC-traject gestart", phase: "F3", targetDate: "2026-05-21", status: "in_uitvoering" },
  { code: "M3.3", title: "Consultatieverslagen tussentijds", phase: "F3", targetDate: "2026-06-18", status: "gepland" },
  { code: "M3.4", title: "FPIC-status overzicht volledig", phase: "F3", targetDate: "2026-07-16", status: "gepland" },
  { code: "M4.1", title: "Conflictanalyse rapport", phase: "F4", targetDate: "2026-07-02", status: "gepland" },
  { code: "M4.2", title: "Juridische opties uitgewerkt", phase: "F4", targetDate: "2026-07-30", status: "gepland" },
  { code: "M4.3", title: "Conceptadvies ter consultatie", phase: "F4", targetDate: "2026-08-13", status: "gepland" },
  { code: "M4.4", title: "Klankbord-review afgerond", phase: "F4", targetDate: "2026-08-27", status: "gepland" },
  { code: "M5.1", title: "Eindadvies definitief", phase: "F5", targetDate: "2026-09-24", status: "gepland" },
  { code: "M5.2", title: "Aanbieding aan President", phase: "F5", targetDate: "2026-10-01", status: "gepland" },
];

// ─────────────────────────────────────────────────────────────────
// Stakeholders
// ─────────────────────────────────────────────────────────────────
export type Stakeholder = {
  id: string;
  name: string;
  category: "ITP_gemeenschap" | "ITP_koepel" | "overheid" | "register" | "politiek" | "sector" | "civil_society" | "internationaal" | "academisch";
  contactPerson?: string;
  lastContact?: string;
  engagementLevel: "co_creatie" | "consult" | "informeren" | "adviserend";
  notes?: string;
};

export const stakeholders: Stakeholder[] = [
  { id: "ST-001", name: "VIDS (Vereniging van Inheemse Dorpshoofden in Suriname)", category: "ITP_koepel", contactPerson: "DEMO_VIDS-secretaris", lastContact: "2026-04-30", engagementLevel: "co_creatie", notes: "Klankbord; FPIC-protocol mede-opgesteld" },
  { id: "ST-002", name: "KAMPOS (koepel Marrons traditioneel gezag)", category: "ITP_koepel", contactPerson: "DEMO_KAMPOS-coördinator", lastContact: "2026-04-22", engagementLevel: "co_creatie" },
  { id: "ST-003", name: "Ministerie Grond- en Bosbeheer (GBB)", category: "overheid", contactPerson: "DEMO_DG GBB", lastContact: "2026-05-01", engagementLevel: "consult", notes: "Domeinkantoor-koppeling roadmap fase 2" },
  { id: "ST-004", name: "MI-GLIS", category: "register", contactPerson: "DEMO_MI-GLIS directeur", lastContact: "2026-04-28", engagementLevel: "consult" },
  { id: "ST-005", name: "Nationale Milieu Autoriteit (NMA)", category: "register", contactPerson: "DEMO_NMA-directeur", lastContact: "2026-04-15", engagementLevel: "consult" },
  { id: "ST-006", name: "De Nationale Assemblée — vaste cmsie", category: "politiek", lastContact: "2026-03-19", engagementLevel: "informeren" },
  { id: "ST-007", name: "DEMO_Goudconcessiehouder AurumNoord N.V.", category: "sector", lastContact: "2026-04-10", engagementLevel: "consult" },
  { id: "ST-008", name: "UN-Habitat regiokantoor", category: "internationaal", contactPerson: "DEMO_UN-Habitat liaison", lastContact: "2026-03-28", engagementLevel: "adviserend" },
  { id: "ST-009", name: "FAO regional office", category: "internationaal", lastContact: "2026-04-05", engagementLevel: "adviserend" },
  { id: "ST-010", name: "IDB (Inter-American Development Bank)", category: "internationaal", lastContact: "2026-04-12", engagementLevel: "adviserend", notes: "Mogelijk financier pilotfase" },
  { id: "ST-011", name: "AdeKUS — Faculteit Maatschappijwetenschappen", category: "academisch", lastContact: "2026-04-19", engagementLevel: "adviserend" },
  ...communities.map<Stakeholder>(c => ({
    id: `ST-COM-${c.id}`,
    name: c.name,
    category: "ITP_gemeenschap",
    contactPerson: c.fpicContactPerson,
    engagementLevel: "co_creatie",
  })),
];

// ─────────────────────────────────────────────────────────────────
// Audit log
// ─────────────────────────────────────────────────────────────────
export type AuditEvent = {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  action: "create" | "update" | "delete" | "view" | "export" | "login";
  entityType: string;
  entityId: string;
  description: string;
};

export const auditLog: AuditEvent[] = [
  { id: "AUD-1234", timestamp: "2026-05-08T14:32:11Z", userId: "WG-04", userName: "Mike Nerkust",      action: "update", entityType: "spatial_unit", entityId: "CT-002", description: "Polygoon traditioneel gebied DEMO_Brokopondo bijgewerkt — versie 3" },
  { id: "AUD-1233", timestamp: "2026-05-08T11:45:02Z", userId: "WG-03", userName: "Theresia Cirino",   action: "create", entityType: "fpic_event",   entityId: "FE-002", description: "FPIC-event toegevoegd: plenaire consultatiesessie Diitabiki 2026-05-02" },
  { id: "AUD-1232", timestamp: "2026-05-08T09:18:44Z", userId: "WG-01", userName: "Edgar Dikan",       action: "update", entityType: "case",         entityId: "APP-2026-002", description: "Risk score zaak DG-2026-0002 hertest — blijft 78 (zeer hoog)" },
  { id: "AUD-1231", timestamp: "2026-05-07T16:22:31Z", userId: "WG-05", userName: "Martin Misiedjan",  action: "create", entityType: "decision",     entityId: "BES-2026-017", description: "Besluit BES-2026-017 vastgelegd na plenaire stemming (5-0-1)" },
  { id: "AUD-1230", timestamp: "2026-05-07T15:01:09Z", userId: "WG-01", userName: "Edgar Dikan",       action: "create", entityType: "decision",     entityId: "BES-2026-018", description: "Besluit BES-2026-018 vastgelegd (unaniem)" },
  { id: "AUD-1229", timestamp: "2026-05-07T10:14:55Z", userId: "WG-04", userName: "Mike Nerkust",      action: "create", entityType: "overlap_check", entityId: "APP-2026-009", description: "Overlap-check uitgevoerd voor DG-2026-0009 — 100% binnen CT-004" },
  { id: "AUD-1228", timestamp: "2026-05-06T17:48:23Z", userId: "WG-03", userName: "Theresia Cirino",   action: "update", entityType: "fpic_process", entityId: "FPIC-002", description: "FPIC-status DG-2026-0009 → consultatie_lopend" },
  { id: "AUD-1227", timestamp: "2026-05-06T13:30:00Z", userId: "WG-02", userName: "Armand Jurel",      action: "view",   entityType: "case",         entityId: "APP-2026-005", description: "Dossier DG-2026-0005 geraadpleegd (NMA-aspect)" },
  { id: "AUD-1226", timestamp: "2026-05-05T11:12:08Z", userId: "WG-04", userName: "Mike Nerkust",      action: "create", entityType: "spatial_unit", entityId: "CT-005", description: "Polygoon traditioneel gebied DEMO_Cassipora aangemaakt" },
  { id: "AUD-1225", timestamp: "2026-05-04T16:55:42Z", userId: "WG-01", userName: "Edgar Dikan",       action: "export", entityType: "report",       entityId: "RPT-MAY-W1", description: "Wekelijks voortgangsrapport geëxporteerd" },
];

// ─────────────────────────────────────────────────────────────────
// Milieu / NMA (doc 17)
// Milieu Raamwet — NMA reviewer-rol; MEA/SEA/MER; vergunningenregister;
// register verontreinigde gebieden; rehabilitatie.
// ─────────────────────────────────────────────────────────────────

// Statische MEA-plicht-matrix per activiteitstype (5 types — demo §17.9)
export const meaActivityMatrix = [
  { activity: "Mijnbouw — klein/middel",  meaRequired: true,  threshold: ">2 ha verstoring of binnen beschermd gebied" },
  { activity: "Bosbouw — concessie",       meaRequired: true,  threshold: "≥ 1.000 ha of nabij ITP-gebied" },
  { activity: "Landbouw — grootschalig",   meaRequired: true,  threshold: ">50 ha monocultuur" },
  { activity: "Bebouwing/bewoning",        meaRequired: false, threshold: "Geen MEA tenzij in beschermd gebied" },
  { activity: "Industrie",                 meaRequired: true,  threshold: "Alle vergunningplichtige industrie" },
] as const;

export type EnvCase = {
  id: string;
  linkedCaseId?: string;       // koppeling naar Application of Tenure
  linkedTenureId?: string;
  triggerType: "mea" | "sea" | "protected_overlap" | "contaminated_overlap" | "permit_change" | "rehab";
  status:
    | "screening"
    | "mea_required"
    | "mer_in_review"
    | "approved"
    | "conditional"
    | "rejected"
    | "not_required";
  nmaReviewerId?: string;
  startDate: string;
  decisionDate?: string;
  conditions?: string[];
  evidence: string[];
  notes: string;
};

export const envCases: EnvCase[] = [
  {
    id: "ENV-2026-001",
    linkedCaseId: "APP-2026-005",  // overlap met DEMO_Natuurreservaat
    triggerType: "protected_overlap",
    status: "mer_in_review",
    nmaReviewerId: "NMA-REV-001",
    startDate: "2026-04-30",
    notes: "Aanvraag DG-2026-0005 ligt 100% binnen DEMO_Natuurreservaat Marowijne-Oost. NMA-review verplicht; MER-procedure in voorbereiding (Milieu Raamwet). IACHR Kaliña-Lokono-toets vereist (overlap met traditioneel gebruik).",
    evidence: [
      "GIS-overlap rapport.pdf",
      "Concept Scoping Document v0.2.pdf",
      "Briefwisseling beheerder reservaat.pdf",
    ],
  },
  {
    id: "ENV-2026-002",
    linkedCaseId: "APP-2026-002",  // mijnbouw-aanvraag bij Galibi
    triggerType: "mea",
    status: "mea_required",
    nmaReviewerId: "NMA-REV-001",
    startDate: "2026-04-15",
    notes: "Activiteit (landbouw nabij goudconcessie) overlapt met traditioneel gebied. MEA-screening: MEA-plichtig vanwege schaal en interactie met concessie. MER-opdracht uit te schrijven.",
    evidence: ["Screening-memo NMA 2026-04-15.pdf"],
  },
  {
    id: "ENV-2025-014",
    linkedCaseId: "DEMO_HIST-008",
    triggerType: "permit_change",
    status: "conditional",
    nmaReviewerId: "NMA-REV-002",
    startDate: "2025-08-10",
    decisionDate: "2025-12-04",
    conditions: [
      "Lozing oppervlaktewater max. 0,5 mg/L Hg",
      "Kwartaalrapportage NMA",
      "Rehabilitatieplan binnen 24 mnd",
      "Onafhankelijke audit jaar 2 en 5",
    ],
    notes: "Wijziging vergunning bestaande mijnconcessie (uitbreiding scope). Voorwaardelijk goedgekeurd; rehabilitatie verplicht.",
    evidence: ["MER-rapport definitief.pdf", "NMA-besluit 2025-12-04.pdf", "Rehabilitatieplan v1.pdf"],
  },
  {
    id: "ENV-2026-003",
    linkedTenureId: "TEN-007",
    triggerType: "permit_change",
    status: "screening",
    startDate: "2026-04-25",
    notes: "Conversie TEN-007 (DEMO_AgroOost N.V.) raakt traditioneel gebied; agrarische scope-uitbreiding triggert herevaluatie milieu-impact.",
    evidence: ["Conversie-aanvraag CNV-2026-003.pdf"],
  },
];

export type ContaminatedSite = {
  id: string;
  name: string;
  contaminationType: "kwik" | "olie" | "zware_metalen" | "andere";
  severity: "laag" | "middel" | "hoog";
  listedAt: string;
  rehabStatus: "geen" | "gepland" | "in_uitvoering" | "voltooid";
  district: DistrictId;
};

export const contaminatedSites: ContaminatedSite[] = [
  {
    id: "CS-001", name: "DEMO_Verlaten goudwasplaats Sipaliwini-Noord",
    contaminationType: "kwik", severity: "hoog", listedAt: "2024-11-12",
    rehabStatus: "gepland", district: "SIP",
  },
];

export const contaminatedSiteGeometries: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "CS-001",
      properties: { id: "CS-001", name: "DEMO_Verlaten goudwasplaats Sipaliwini-Noord", contaminationType: "kwik" },
      geometry: rect(-55.85, 4.70, -55.78, 4.78),
    },
  ],
};

export type RehabPlan = {
  id: string;
  linkedSiteId?: string;
  linkedSpatialUnitId?: string;
  trigger: "court_order" | "permit_condition" | "voluntary" | "iachr_kalina_obligation";
  responsibleParty: string;
  funding: string;
  milestones: { date: string; description: string; status: "voltooid" | "in_uitvoering" | "gepland" }[];
};

export const rehabPlans: RehabPlan[] = [
  {
    id: "REHAB-2025-001",
    linkedSiteId: "CS-001",
    trigger: "iachr_kalina_obligation",
    responsibleParty: "Staat Suriname (NMA + GBB)",
    funding: "Klimaat- en Bosfonds Suriname (mock)",
    milestones: [
      { date: "2025-11-12", description: "Locatie opgenomen in nationaal register",          status: "voltooid" },
      { date: "2026-06-30", description: "Bodemonderzoek + risico-assessment afgerond",       status: "in_uitvoering" },
      { date: "2026-12-15", description: "Rehabilitatieplan v1 goedgekeurd",                  status: "gepland" },
      { date: "2028-06-30", description: "Sanering eerste zone — 30% afronding",             status: "gepland" },
      { date: "2030-12-31", description: "Eindrapportage onafhankelijke audit",              status: "gepland" },
    ],
  },
];

// NMA reviewers (voor RBAC-demonstratie)
export const nmaReviewers = [
  { id: "NMA-REV-001", name: "DEMO_Drs. P. Sahdew",   specialism: "Mijnbouw + bescherming" },
  { id: "NMA-REV-002", name: "DEMO_Ir. M. Karwafodi", specialism: "Vergunningen + rehabilitatie" },
] as const;

// ─────────────────────────────────────────────────────────────────
// Grondhuur — levenscyclus (doc 18)
// Decreet Uitgifte Domeingrond: 15-40 jaar; verlenging ≥ 6 mnd voor afloop;
// jaarlijkse vergoeding; achterstanden → blokkade; vervallenverklaring; conversie.
// ─────────────────────────────────────────────────────────────────
export type Tenure = {
  id: string;
  perceelsid: string;
  district: DistrictId;
  holderName: string;
  holderId: string;
  startDate: string;
  endDate: string;
  durationYears: number;
  purpose: "bebouwing_bewoning" | "landbouw" | "industrie" | "andere";
  annualFee: number;            // SRD per jaar
  arrearsAmount: number;        // openstaand bedrag SRD
  lastPaidAt?: string;
  hypothecaryExtractDate?: string;  // datum laatst uitgereikt hypothecair uittreksel
  perceelsidMapDate?: string;       // datum laatste uitmetingskaart
  overlapsCustomary?: string;       // CT-id als overlap
  status:
    | "active"
    | "expiring"          // <12 mnd voor end_date
    | "in_renewal"
    | "in_conversion"
    | "expired"
    | "notice_of_intent"  // vervallenverklaring voornemen
    | "forfeited";
  linkedDecisionId?: string;
};

// vandaag (gefixeerd voor demo) — 2026-05-09
const _DEMO_TODAY = new Date("2026-05-09");
function dateOffsetMonths(months: number, day = 15): string {
  const d = new Date(_DEMO_TODAY);
  d.setMonth(d.getMonth() + months);
  d.setDate(day);
  return d.toISOString().slice(0, 10);
}

export const tenures: Tenure[] = [
  // 1. Actief, geen issues — referentie-case
  {
    id: "TEN-001", perceelsid: "PAR-P-0007", district: "PAR",
    holderName: "DEMO_Houder R. Adipi", holderId: "1122334",
    startDate: "2018-06-15", endDate: "2033-06-15", durationYears: 15,
    purpose: "bebouwing_bewoning", annualFee: 450, arrearsAmount: 0,
    lastPaidAt: "2026-01-12", hypothecaryExtractDate: "2025-11-04", perceelsidMapDate: "2018-05-22",
    status: "active", linkedDecisionId: "BES-DG-2018-0987",
  },
  // 2. Aflopend binnen 6 maanden + geen verlengingsverzoek + kleine achterstand → ROOD
  {
    id: "TEN-002", perceelsid: "MAR-P-0019", district: "MAR",
    holderName: "DEMO_Houder T. Wongsoredjo", holderId: "2233445",
    startDate: "2007-09-15", endDate: dateOffsetMonths(5, 22), durationYears: 19,
    purpose: "landbouw", annualFee: 380, arrearsAmount: 760,
    lastPaidAt: "2024-09-02", hypothecaryExtractDate: "2023-04-10", perceelsidMapDate: "2007-08-12",
    status: "expiring", linkedDecisionId: "BES-DG-2007-0312",
  },
  // 3. Aflopend binnen 12 maanden, op orde → AMBER
  {
    id: "TEN-003", perceelsid: "PAR-P-0021", district: "PAR",
    holderName: "DEMO_Houder J. Kasipo", holderId: "3344556",
    startDate: "2007-04-15", endDate: dateOffsetMonths(11, 5), durationYears: 19,
    purpose: "bebouwing_bewoning", annualFee: 320, arrearsAmount: 0,
    lastPaidAt: "2025-12-15", hypothecaryExtractDate: "2026-02-18", perceelsidMapDate: "2007-03-09",
    status: "expiring", linkedDecisionId: "BES-DG-2007-0145",
  },
  // 4. In renewal — proces lopend
  {
    id: "TEN-004", perceelsid: "SIP-P-0008", district: "SIP",
    holderName: "DEMO_Houder M. Pinas", holderId: "4455667",
    startDate: "2006-02-15", endDate: dateOffsetMonths(-2, 15), durationYears: 20,
    purpose: "landbouw", annualFee: 410, arrearsAmount: 0,
    lastPaidAt: "2026-01-30", hypothecaryExtractDate: "2026-01-22", perceelsidMapDate: "2025-12-08",
    status: "in_renewal", linkedDecisionId: "BES-DG-2006-0078",
  },
  // 5. In conversion — alle stukken op orde
  {
    id: "TEN-005", perceelsid: "PAR-P-0011", district: "PAR",
    holderName: "DEMO_Houder L. Ramai", holderId: "5566778",
    startDate: "2003-08-15", endDate: "2028-08-15", durationYears: 25,
    purpose: "bebouwing_bewoning", annualFee: 520, arrearsAmount: 0,
    lastPaidAt: "2026-04-02", hypothecaryExtractDate: "2026-04-15", perceelsidMapDate: "2026-04-20",
    status: "in_conversion", linkedDecisionId: "BES-DG-2003-0455",
  },
  // 6. In conversion — hypothecair uittreksel ontbreekt → R-CONV-002
  {
    id: "TEN-006", perceelsid: "MAR-P-0007", district: "MAR",
    holderName: "DEMO_Houder S. Adjako", holderId: "6677889",
    startDate: "2008-11-15", endDate: "2033-11-15", durationYears: 25,
    purpose: "bebouwing_bewoning", annualFee: 360, arrearsAmount: 0,
    lastPaidAt: "2026-03-18",
    perceelsidMapDate: "2026-03-20",
    status: "in_conversion",
  },
  // 7. In conversion — overlapt met traditioneel gebied (CT-004) → R-CONV-010 → FPIC heropenen
  {
    id: "TEN-007", perceelsid: "MAR-P-0013", district: "MAR",
    holderName: "DEMO_AgroOost N.V.", holderId: "KVK-50098765",
    startDate: "2006-05-15", endDate: "2031-05-15", durationYears: 25,
    purpose: "landbouw", annualFee: 1200, arrearsAmount: 0,
    lastPaidAt: "2026-02-10", hypothecaryExtractDate: "2026-04-01", perceelsidMapDate: "2025-12-12",
    overlapsCustomary: "CT-004",
    status: "in_conversion",
  },
  // 8. Verlopen, geen actie ondernomen
  {
    id: "TEN-008", perceelsid: "SIP-P-0014", district: "SIP",
    holderName: "DEMO_Houder K. Tolomaikoe", holderId: "7788990",
    startDate: "2001-03-15", endDate: "2025-03-15", durationYears: 24,
    purpose: "andere", annualFee: 280, arrearsAmount: 1120,
    lastPaidAt: "2024-04-10",
    status: "expired",
  },
  // 9. Vervallenverklaring — voornemen wegens niet-naleving
  {
    id: "TEN-009", perceelsid: "MAR-P-0026", district: "MAR",
    holderName: "DEMO_Houder N. Tjon", holderId: "8899001",
    startDate: "2014-07-15", endDate: "2034-07-15", durationYears: 20,
    purpose: "industrie", annualFee: 950, arrearsAmount: 4750,
    lastPaidAt: "2021-08-15",
    status: "notice_of_intent",
  },
  // 10. Forfeited — vervallen
  {
    id: "TEN-010", perceelsid: "SIP-P-0003", district: "SIP",
    holderName: "DEMO_Houder R. Bouterse", holderId: "9900112",
    startDate: "2002-11-15", endDate: "2024-11-15", durationYears: 22,
    purpose: "landbouw", annualFee: 240, arrearsAmount: 0,
    lastPaidAt: "2024-10-18",
    status: "forfeited",
  },
];

export type Conversion = {
  id: string;
  fromTenureId: string;
  toRrrType: "eigendom" | "erfpacht";
  motivation: string;
  decisionStatus: "aangevraagd" | "in_onderzoek" | "goedgekeurd" | "afgewezen" | "voorwaardelijk";
  conditions?: string[];
  blockers: string[];
  fpicReopened?: boolean;
  submittedAt: string;
  decidedAt?: string;
};

export const conversions: Conversion[] = [
  {
    id: "CNV-2026-001", fromTenureId: "TEN-005", toRrrType: "eigendom",
    motivation: "Conversie naar eigendom op grond van Besluit Grondconversie 2023; bewoningsdoel; volledige stukken aanwezig.",
    decisionStatus: "in_onderzoek", blockers: [],
    submittedAt: "2026-04-22",
  },
  {
    id: "CNV-2026-002", fromTenureId: "TEN-006", toRrrType: "eigendom",
    motivation: "Conversie naar eigendom; aanvrager verzoekt voortgang.",
    decisionStatus: "aangevraagd",
    blockers: [
      "Hypothecair uittreksel ontbreekt (Besluit Grondconversie 2023 — verplicht stuk)",
    ],
    submittedAt: "2026-04-29",
  },
  {
    id: "CNV-2026-003", fromTenureId: "TEN-007", toRrrType: "eigendom",
    motivation: "Conversie naar eigendom voor uitbreiding agrarische activiteiten.",
    decisionStatus: "voorwaardelijk",
    blockers: [
      "Conversie raakt traditioneel woon- en leefgebied DEMO_Diitabiki Aukaans (CT-004)",
      "FPIC-procedure heropenen vereist",
    ],
    fpicReopened: true,
    submittedAt: "2026-03-30",
  },
];

export type Forfeiture = {
  id: string;
  tenureId: string;
  reason:
    | "achterstanden"
    | "doelbinding_geschonden"
    | "milieu_inbreuk"
    | "rechten_derden"
    | "rechten_collectief";
  status:
    | "signalering"
    | "hoor_wederhoor"
    | "notice_of_intent"
    | "objection_window"
    | "decision_pending"
    | "forfeited"
    | "restored";
  signaledAt: string;
  noticeAt?: string;
  decidedAt?: string;
  compensationAmount?: number;
  notes: string;
};

export const forfeitures: Forfeiture[] = [
  {
    id: "FRF-2026-001", tenureId: "TEN-009", reason: "achterstanden",
    status: "notice_of_intent",
    signaledAt: "2026-02-10", noticeAt: "2026-04-18",
    notes: "Achterstand SRD 4.750 over 4 jaren. Houder driemaal aangeschreven. Voornemen tot vervallenverklaring uitgevaardigd; bezwaartermijn 30 dagen.",
  },
  {
    id: "FRF-2025-014", tenureId: "TEN-010", reason: "doelbinding_geschonden",
    status: "forfeited",
    signaledAt: "2024-08-12", noticeAt: "2024-09-22", decidedAt: "2025-02-04",
    compensationAmount: 0,
    notes: "Recht ingetrokken: doelbinding (landbouw) niet nageleefd; perceel ongebruikt sinds 2018. Geen schadeloosstelling van toepassing wegens ernstige niet-naleving.",
  },
];

// Helper: maanden tot end_date (negatief = al verlopen)
export function monthsUntilExpiry(tenure: Tenure): number {
  const end = new Date(tenure.endDate);
  const months = (end.getFullYear() - _DEMO_TODAY.getFullYear()) * 12
    + (end.getMonth() - _DEMO_TODAY.getMonth());
  return months;
}

export type ExpiryFlag = "ok" | "watch_12m" | "warning_9m" | "critical_6m" | "expired";

export function expiryFlag(tenure: Tenure): ExpiryFlag {
  const m = monthsUntilExpiry(tenure);
  if (m < 0) return "expired";
  if (m < 6)  return "critical_6m";
  if (m < 9)  return "warning_9m";
  if (m < 12) return "watch_12m";
  return "ok";
}

// ─────────────────────────────────────────────────────────────────
// Suriname grenslaag — officiële Surinaamse positie
// Inclusief Tigri/New River Triangle (zuidwest-claim t.o.v. Guyana)
// en Marowijne/Litani-grens met Frans-Guyana.
// Vereenvoudigde polygoon — niet kadastrale precisie.
// ─────────────────────────────────────────────────────────────────
export const surinameOutline: FeatureCollection<Polygon> = {
  type: "FeatureCollection",
  features: [{
    type: "Feature",
    id: "SR",
    properties: { id: "SR", name: "Suriname (officiële grenzen)" },
    geometry: poly([
      // ── Noordkust (Atlantische Oceaan, west → oost) ──
      [-58.07, 6.00], [-57.55, 5.97], [-57.05, 6.02], [-56.50, 5.98],
      [-55.95, 5.95], [-55.40, 5.94], [-54.85, 5.98], [-54.40, 6.02],
      [-54.05, 5.85],
      // ── Oostgrens (Marowijne / Maroni-rivier, met Frans-Guyana) ──
      [-54.00, 5.45], [-54.20, 5.05], [-54.40, 4.65],
      [-54.20, 4.20], [-54.05, 3.85], [-54.00, 3.45],
      [-54.05, 3.10], [-54.20, 2.75],
      // ── Zuidoost (Litani-rivier richting Tumuc-Humac) ──
      [-54.50, 2.50], [-54.95, 2.30], [-55.50, 2.10],
      // ── Zuidgrens (Tumuc-Humac-bergen) ──
      [-56.10, 2.00], [-56.65, 1.95], [-57.10, 2.00],
      // ── Tigri / New River Triangle (zuidwest, officiële SR-claim) ──
      [-57.40, 2.20], [-57.65, 2.55], [-57.85, 2.95],
      // ── Westgrens (Corantijn-rivier) ──
      [-58.00, 3.45], [-58.05, 3.95], [-58.10, 4.45],
      [-58.10, 5.00], [-58.07, 5.55], [-58.07, 6.00],
    ]),
  }],
};
