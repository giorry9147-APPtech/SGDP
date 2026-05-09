# SGDP Demo-Script — 10-minuten walkthrough

> Voor stakeholders: leden Werkgroep Grondenrechten & Decentralisatie, kabinet van de President, MI-GLIS, GBB/Domeinkantoor, NMA, VIDS, KAMPOS, traditioneel gezag.
>
> **Doel.** In 10 minuten een tastbaar gevoel geven van wat een Land Rights & Claims Intelligence Platform voor Suriname betekent — kaart, dossiers, conflictdetectie, FPIC, advies, audit.
>
> **Disclaimer vooraf.** Alle data zijn fictief en gelabeld `DEMO_…`. De banner rechtsboven herinnert daaraan in elk scherm. Geen besluitvorming op basis van deze omgeving.

---

## Timing-overzicht (uitgebreid — 12 min)

| # | Minuut | Module | Route | Sleutelboodschap |
|---|---|---|---|---|
| 1 | 0:00 – 1:00 | Executive Dashboard | `/` | Eén view voor de President |
| 2 | 1:00 – 2:30 | GIS-kaart | `/kaart` | Geo-werkelijkheid in één beeld |
| 3 | 2:30 – 4:30 | Aanvraag indienen + advies | `/aanvragen/nieuw` | Live conflictdetectie + advies |
| 4 | 4:30 – 5:30 | Aanvraag-detail + PDF-export | `/aanvragen/[id]` | Uitlegbaar, regelgebaseerd, exporteerbaar |
| 5 | 5:30 – 6:30 | FPIC-traject | `/fpic/[id]` | IACHR-bestendige consultatie |
| 6 | 6:30 – 7:30 | **Grondhuur & Conversie** | `/grondhuur` | Levenscyclus ná uitgifte (doc 18) |
| 7 | 7:30 – 8:30 | **Milieu & NMA** | `/milieu` | MEA/MER hard blocker (doc 17) |
| 8 | 8:30 – 9:15 | Werkgroep-werkruimte | `/werkgroep` | Vergaderingen, besluiten, acties |
| 9 | 9:15 – 9:45 | Stakeholders | `/stakeholders` | ITP-gemeenschappen gelijkwaardig |
| 10 | 9:45 – 10:15 | Audit Trail | `/audit` | Onveranderbaar, IACHR-bestendig |
| 11 | 10:15 – 11:15 | Adviesregels (transparantie) | `/regels` | Geen black-box (22 regels) |
| 12 | 11:15 – 12:00 | Afronding & vragen | — | Roadmap & feedbackloop |

---

## Vooraf

- Browser open op `http://localhost:3000` (of de gedeelde URL).
- Beeld op groot scherm; sidebar links zichtbaar.
- Demo-banner rechtsboven: **"DEMO — niet voor besluitvorming"** — wijs er kort op.
- Rol bovenaan: **Edgar Dikan, Voorzitter werkgroep**.

> 💬 *Opening:* "Wat u nu ziet is een werkende prototype-omgeving. De data is fictief, de werkwijze niet. Alles wat de Werkgroep nodig heeft om in 40 weken een advies aan de President te leveren, vindt u hier in zeven kernmodules."

---

## Stap 1 — Executive Dashboard (1 min)

**Route:** `/`

**Toon:**
- Voortgangstrip met fasen F1-F5 (we zitten in **F2 → F3**).
- 4 KPI-tegels: ITP-gebieden geïnventariseerd · open dossiers · FPIC-trajecten · actiepunten.
- Hoog-risico dossiers (rechtsboven blocker-badge `geblokkeerd`).
- Komende mijlpalen + lopende besluiten.
- Top-3 strategische risico's onderaan.

**Sleutelboodschap:**
> "De President kijkt hier elke maandag naar. Eén scherm, één waarheid: waar staan we, wat blokkeert, wat moet er gebeuren tegen 18 mei."

**Wijs op:**
- Banner "tussentijds rapport — deadline 18 mei 2026 — 10 dagen".
- Rode pulse op dossiers waar de adviesmotor besluit blokkeert.

---

## Stap 2 — GIS-kaart (1,5 min)

**Route:** `/kaart`

**Toon:**
1. Standaard zoom op Suriname.
2. Layer-toggle rechtsboven — zet aan/uit:
   - **ITP-traditionele woon- en leefgebieden** (CT-001 t/m CT-005)
   - **Concessies** (mijnbouw, bosbouw, landbouw)
   - **Beschermde gebieden**
   - **Aanvragen** (puntenlaag, kleur = risiconiveau)
3. Klik op de overlap **goudconcessie CON-001 ↔ DEMO_Galibi (CT-001)** — popup toont overlap-percentage.

**Sleutelboodschap:**
> "Dit is wat MI-GLIS en het Domeinkantoor vandaag niet samen op één scherm hebben: traditionele woon- en leefgebieden naast concessies en aanvragen. Hier wordt zichtbaar waar conflicten zitten — vóórdat een beschikking wordt afgegeven."

**Wijs op:**
- Open-source basemap (CARTO Light, geen vendor-lock-in).
- LADM/STDM-conform datamodel onder water.

---

## Stap 3 — Nieuwe aanvraag + live advies (2 min)

**Route:** `/aanvragen/nieuw`

**Demo-stappen:**
1. Vul fictieve aanvraag in:
   - Aanvrager: `DEMO_J. Soerodimedjo`
   - Type: **specifiek**
   - Doel: **bebouwing/bewoning**
   - District: **DEMO_Marowijne**
   - Oppervlakte: **2,5 ha**
   - Coördinaten / kies polygoon op kaart **die overlapt met CT-001**.
2. Documenten: laat **"figuratieve kaart"** bewust uit.
3. Klik **"Conflictcheck uitvoeren"**.

**Toon:**
- Binnen 1 sec verschijnt advies:
  - Risicoscore **75-100 → "Zeer hoog"**.
  - 3 hard blockers: `R-ADM-003` (figuratieve kaart), `R-SOC-001` (ITP-overlap), `R-RUM-001` (overlap concessie).
  - Trigger-badges: **→ FPIC**, **→ NMA**.
- Aanbeveling: *"Niet besluitbaar in huidige staat. FPIC-procedure starten met DEMO_Galibi-gemeenschap; NMA-reviewtaak aanmaken."*

**Sleutelboodschap:**
> "Dit is geen AI die beslist. Het zijn 14 expliciet gepubliceerde regels die de wet, IACHR-uitspraken en de Milieu Raamwet operationaliseren. Een ambtenaar van het Domeinkantoor ziet binnen één sec wat er aan de hand is — en kan het uitleggen."

---

## Stap 4 — Aanvraag-detail + PDF-export (1 min)

**Route:** `/aanvragen/[id]` — kies een dossier met `riskLevel = zeer_hoog` (bijv. `DG-2026-0002`).

**Toon:**
- Workflow-strip bovenaan: ontvangen → documentcontrole → onderzoek → … → beschikking.
- **Adviesrapport** met 5 categorieën (administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid).
- Per regel: regel-ID, gewicht, blocker-vlag, bevinding.
- Documenten-card, bezwaartermijn-klok, FPIC-koppeling, juridische basis.
- Klik op knop **"Adviesrapport (PDF)"** rechtsboven → opent print-dialoog → "Save as PDF" geeft direct een schone PDF (sidebar/header verborgen, print-only header met case-nummer + DEMO-disclaimer).

**Sleutelboodschap:**
> "Elke beslissing is herleidbaar naar een regelversie. De PDF-export is geen statisch document maar een momentopname van de levende regels — wijzigingen gaan via een Pull Request met juristen-review."

---

## Stap 5 — FPIC-traject (1 min)

**Route:** `/fpic/[id]` — kies een traject in fase **`consultatie`** of **`reflectieperiode`**.

**Toon:**
- 9 statussen FPIC: `geïnitieerd` → `informatie_gedeeld` → `consultatie` → `reflectieperiode` → `instemming` / `voorwaardelijke_instemming` / `geweigerd` → `monitoring` → `afgesloten`.
- Tijdlijn met consultatie-events: wie, wanneer, in welke taal, met wie van het traditioneel gezag.
- Gekoppelde dossiers (welke aanvragen wachten op deze FPIC).
- Audit-koppeling.

**Sleutelboodschap:**
> "Dit is wat de Saramaka- en Kaliña-Lokono-uitspraken eisen: effectieve consultatie, vrije keuze, met legitieme vertegenwoordigers. Hier loopbaar te documenteren — IACHR-bestendig."

---

## Stap 6 — Grondhuur & Conversie (1 min)

**Route:** `/grondhuur`

**Toon:**
- 4 KPI-tegels: aflopend &lt;6 mnd, in verlenging/conversie, achterstand totaal (SRD), vervallen/voornemen.
- **Aflopende grondhuur**-tabel: 12/9/6-maandsreminders met kleurcoding (rood = wettelijke deadline 6 mnd Decreet Uitgifte Domeingrond).
- Conversie-aanvragen met blokkades: hypothecair uittreksel ontbreekt (R-CONV-002), of overlap traditioneel gebied → FPIC heropenen (R-CONV-010).
- Vervallenverklaringen met workflow signalering → hoor & wederhoor → voornemen → besluit → schadeloosstelling (Grondwet art. 34).

**Sleutelboodschap:**
> "Grondrechten leven door. Wat gebeurt er ná de eerste uitgifte? Verlenging, conversie naar eigendom (Besluit Grondconversie 2023), of vervallenverklaring bij niet-naleving. Hier loopt die hele levenscyclus geconfigureerd, met automatische reminders en juridische blokkades."

**Wijs op:**
- TEN-007: conversie-aanvraag die FPIC heeft heropend wegens overlap met DEMO_Diitabiki Aukaans.
- TEN-009: voornemen tot vervallenverklaring wegens SRD 4.750 achterstand over 4 jaar.

---

## Stap 7 — Milieu & NMA (1 min)

**Route:** `/milieu`

**Toon:**
- KPIs: open milieu-zaken, beschermde gebieden, verontreinigde gebieden, NMA-reviewers.
- MEA-plicht-matrix (5 activiteitstypes met drempels).
- 7-stappen MEA/SEA/MER-werkflow.
- **EnvCases**: ENV-2026-001 — aanvraag in DEMO_Natuurreservaat Marowijne-Oost — MER in review, NMA-reviewer toegewezen, hard blocker.
- ENV-2025-014 als voorbeeld van **voorwaardelijke goedkeuring** met 4 voorwaarden (Hg-lozing, kwartaalrapportage, rehabilitatieplan, audit jaar 2 en 5).
- Verontreinigd gebied (DEMO_Verlaten goudwasplaats Sipaliwini-Noord, kwik) + rehabilitatieplan met 5 mijlpalen tot 2030.

**Sleutelboodschap:**
> "De NMA is sinds juli 2024 officieel gelanceerd. Milieu is geen optionele bijlage — het is een werkstroom-trigger. Geen activiteit start zonder NMA-goedkeuring waar MEA verplicht is. En IACHR Kaliña-Lokono eist rehabilitatie van aangetast traditioneel gebied — gekoppeld aan een rehabilitatieplan met meetbare mijlpalen."

---

## Stap 8 — Werkgroep-werkruimte (45 sec)

**Route:** `/werkgroep`

**Toon:**
- 6 leden met initialen-avatars (Edgar Dikan voorzitter, Armand Jurel, Theresia Cirino, Mike Nerkust, Martin Misiedjan, Sarwan Ramai).
- Vergaderingen — open een agenda, toon besluiten + actiepunten.
- Fasenbalk F1 → F5 met percentages.
- Recente besluiten met **stemverhoudingen**.
- Actiepunten met deadline-kleurcodering (rood = achterstallig).

**Sleutelboodschap:**
> "De werkgroep beslist niet in een Word-document. Elke stemming, elk actiepunt, elke afspraak met een gemeenschap zit hier — en is onveranderbaar gelogd."

---

## Stap 9 — Stakeholders & gemeenschappen (30 sec)

**Route:** `/stakeholders`

**Toon:**
- Sectie bovenaan: **ITP-gemeenschappen** (gelijkwaardig vermeld, niet onderaan een lijst).
- Per gemeenschap: granman, kapiteins, basja's, FPIC-contact, populatie, taal.
- Categorieën: ITP-koepels (VIDS, KAMPOS), overheid, registers, sector, civil society, internationaal, academisch.

**Sleutelboodschap:**
> "Co-creatie, niet consultatie achteraf. Traditioneel gezag staat hier op gelijke hoogte met de DNA-fractie en de Wereldbank."

---

## Stap 10 — Audit Trail (30 sec)

**Route:** `/audit`

**Toon:**
- Tabel met 10+ events: tijdstip, gebruiker, actie, object, beschrijving, hash.
- KPI bovenaan: **"Hash-keten integer: 100%"**.

**Sleutelboodschap:**
> "Append-only, cryptografische hash per record. Een rechter, een rekenkamer of een onafhankelijke auditor kan elke wijziging reconstrueren — inclusief wie wat wanneer veranderde."

---

## Stap 11 — Adviesregels (transparantie) (1 min)

**Route:** `/regels`

**Toon:**
- Risicoscore-formule + drempels (0-24 laag, 25-49 middel, 50-74 hoog, 75+ zeer hoog).
- Hard blockers — opgesomd per regel-ID.
- Regels per categorie (administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid, **levenscyclus**).
- **Ruleset 1.0.0 · 22 regels in 6 categorieën** (incl. R-CONV-* voor conversie en R-ENV-* voor milieu).

**Sleutelboodschap:**
> "Geen black-box. Geen AI-bias-discussie. Wat het systeem 'denkt' is hier publiek leesbaar. Wijziging gaat via Pull Request met juridische review."

---

## Stap 12 — Afronding & vragen (45 sec)

**Sluitboodschap:**
> "Wat u zag is een **demo**. Geen productie. De roadmap (doc 13) beschrijft hoe deze omgeving stap voor stap een echt platform wordt — gekoppeld aan MI-GLIS, GBB, NMA, met digitale identiteit en mobiele veld-app voor landmeters. De volgende stap voor de werkgroep is **vier weken praktijk-gebruik op deze demo**, gevolgd door evaluatie en bijsturing."

**Verwachte vragen + antwoorden:**

| Vraag | Antwoord |
|---|---|
| "Is dit AI?" | Nee. Regelgebaseerd. Elke regel staat op `/regels`. AI komt eventueel pas in fase 3 als aanvulling, met expliciete explainability. |
| "Wat met privacy van indieners?" | Doelbinding + RBAC/ABAC; PII gemaskeerd in publieke kaartlaag; datacategorisatie public/internal/confidential/fpic_restricted. Zie doc 15 §15.6. |
| "Hoe komen ITP-gemeenschappen erin?" | Alleen na FPIC met die gemeenschap zelf. In de demo zijn alle ITP-data fictief. |
| "Wat kost het?" | Demo-fase: minimaal (open-source stack, single-tenant). Productie: zie doc 13 — afhankelijk van scope, vermoedelijk fase 2 binnen reguliere ICT-budgetlijnen Suriname. |
| "Vervangt dit MI-GLIS?" | Nee. SGDP is **federatief**: MI-GLIS blijft authoritative source voor het register; GBB voor domeingrond; NMA voor milieu. SGDP koppelt en orchestreert. |
| "Wat als de wet verandert?" | Adviesregels zijn versioneerd en geconfigureerd, niet hardcoded. Zaken lopen onder hun **wetregime** (zie doc 15 §15.8). |

---

## Bijlagen

- **Productdocumentatie**: `docs/01-...` t/m `docs/18-...` in de projectroot
- **Scope-document**: [`docs/07-mvp-demo-scope.md`](../docs/07-mvp-demo-scope.md)
- **Adviesmotor-spec**: [`docs/10-adviesmotor.md`](../docs/10-adviesmotor.md)
- **FPIC-spec**: [`docs/11-fpic-stakeholders.md`](../docs/11-fpic-stakeholders.md)
- **Juridisch kader**: [`docs/15-juridisch-kader.md`](../docs/15-juridisch-kader.md)
- **Roadmap**: [`docs/13-roadmap.md`](../docs/13-roadmap.md)

**Versie demo-script:** 1.0 · Republiek Suriname · Werkarm van het Staatshoofd
