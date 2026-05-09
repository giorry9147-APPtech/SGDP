# Hoe werkt SGDP — Aanvraagproces, conflictdetectie, integraties en besluitvorming

> **Voor:** stakeholders die willen begrijpen *hoe* het systeem werkt — niet welke knoppen er zijn (zie [WALKTHROUGH-VOORBEELD.md](./WALKTHROUGH-VOORBEELD.md) voor knoppen) — maar **wat er gebeurt** als een aanvraag binnenkomt, hoe SGDP issues vindt, hoe wetten worden gecontroleerd, en wat MI-GLIS- en GBB-integratie precies oplossen.

---

## Inhoud

1. [Hoe komt een aanvraag binnen?](#1-hoe-komt-een-aanvraag-binnen)
2. [Wat gebeurt er direct na intake? (validatie + conflictdetectie)](#2-wat-gebeurt-er-direct-na-intake)
3. [Hoe wordt conflictanalyse op de kaart toegevoegd? (geometrie en coördinaten)](#3-hoe-wordt-conflictanalyse-op-de-kaart-toegevoegd)
4. [Het volledige stappenplan — 9 statussen, wie doet wat](#4-het-volledige-stappenplan)
5. [Wanneer is een aanvraag "goed"?](#5-wanneer-is-een-aanvraag-goed)
6. [Wie controleert regels en wetten?](#6-wie-controleert-regels-en-wetten)
7. [Wat lossen MI-GLIS, GBB en NMA-integratie precies op?](#7-wat-lossen-mi-glis-gbb-en-nma-integratie-op)
8. [De aanpak — hoe komen ze gezamenlijk tot een besluit](#8-de-aanpak--hoe-komen-ze-tot-een-besluit)
9. [Twee verhalen — happy path en blocked path](#9-twee-verhalen--happy-path-en-blocked-path)
10. [Wat in de demo wel werkt vs roadmap](#10-wat-in-de-demo-wel-werkt-vs-roadmap)

---

## 1. Hoe komt een aanvraag binnen?

### 1.1 De drie kanalen (productie)

| Kanaal | Wie | Status |
|---|---|---|
| **Loket** — ambtenaar typt voor de burger | Domeinkantoor / GBB-loket | Demo: scenario-picker · Productie: vrij formulier |
| **Burgerportaal** — online zelf | Burger of rechtspersoon | Roadmap fase 3 (FR-10) |
| **Mobiele veldapp** — landmeter trekt GPS-track | Beëdigd landmeter, GBB-veldambtenaar | Roadmap fase 3 (FR-1.9, NFR-5b) |

In **alle drie** komt de aanvraag binnen via dezelfde API-endpoint:

```
POST /api/v1/cases
```

Met dezelfde JSON-payload (zie [doc 16 §16.6](../docs/16-integraties-api.md#166-voorbeeldrequest--domeingrondaanvraag)):

```json
{
  "caseType": "DOMEINGROND_AANVRAAG",
  "applicant": {
    "partyType": "NATURAL_PERSON",
    "name": "...",
    "idNumber": "1234567",
    "nationality": "SUR"
  },
  "purposeType": "BEBOUWING_BEWONING",
  "parcelRef": { "perceelsid": "PMB-AB-12345" },
  "documents": [
    {"type": "NATIONALITEITSVERKLARING", "documentId": "doc_001"},
    {"type": "ID_KOPIE",                 "documentId": "doc_002"},
    {"type": "FIGURATIEVE_KAART",        "documentId": "doc_003"}
  ]
}
```

### 1.2 Twee aanvraagtypes (Decreet Uitgifte Domeingrond)

| Type | Wanneer | Kenmerken |
|---|---|---|
| **Specifiek** | Indiener weet welk perceel hij wil | **Figuratieve kaart of kaart van uitmeting verplicht** met polygoon. PERCEELSID-validatie. |
| **Algemeen** | Indiener vraagt grond zonder vooraf gekozen perceel | Geen kaart vereist; aanvraag wordt later gekoppeld na toewijzing |

In de demo: bij scenario "**A — Schone aanvraag**" en "**B/C/D**" zie je dit verschil. Scenario D ("Onvolledig dossier") faalt expliciet op de kaart-eis bij specifiek type.

### 1.3 Verplichte velden bij intake (FR-1.3, Besluit GLIS 2025)

- Identiteit indiener (natuurlijk persoon of rechtspersoon)
- Nationaliteit / KvK-nummer
- Doel (bebouwing/bewoning, landbouw, industrie, mijnbouw_klein, andere)
- Oppervlakte
- Locatie (PERCEELSID of polygoon-coördinaten)
- Contactgegevens

Worden deze velden niet ingevuld? → API geeft een **HTTP 422** met `errors[]` terug. Geen zaak aangemaakt.

### 1.4 Wat krijgt de indiener terug?

- **Zaaknummer** automatisch gegenereerd (formaat `DG-{jaar}-{volgnummer}` — bv. `DG-2026-0011`)
- **Audit-event `create`** in onveranderbaar log
- **Status:** `ontvangen`
- **Bevestigingsmail/SMS** met zaaknummer en eerste tijdslijn — *(roadmap fase 3 FR-1.8)*

---

## 2. Wat gebeurt er direct na intake?

Tussen de seconde dat de zaak wordt aangemaakt en het scherm dat de ambtenaar/aanvrager terugkrijgt, draaien **vier checks parallel**:

```
                  ┌────────────────────────────────┐
                  │   POST /api/v1/cases            │
                  │   (zaak ontvangen, status:      │
                  │    "ontvangen")                  │
                  └──────────┬─────────────────────┘
                             │
       ┌──────────────────────┼──────────────────────┐
       ▼                      ▼                      ▼
 ┌─────────────┐    ┌─────────────────┐    ┌──────────────────┐
 │ Schema-     │    │ Document-       │    │ Geometrie-       │
 │ validatie   │    │ check           │    │ validatie        │
 │ (GLIS 2025) │    │ (verplichte     │    │ (overlap-engine) │
 │             │    │  stukken)       │    │                  │
 └─────────────┘    └─────────────────┘    └──────────────────┘
       │                      │                      │
       └──────────────────────┼──────────────────────┘
                              ▼
                  ┌────────────────────────┐
                  │  Adviesmotor           │
                  │  (22 regels →          │
                  │   risicoscore +        │
                  │   blockers)            │
                  └──────────┬─────────────┘
                             ▼
                  ┌────────────────────────┐
                  │  Status-update:        │
                  │   ontvangen →          │
                  │    documentcontrole    │
                  │    of geblokkeerd      │
                  └────────────────────────┘
```

### 2.1 Schemavalidatie (Besluit GLIS 2025)

Conform [doc 15 C7](../docs/15-juridisch-kader.md#153-compliance-checklist):
- **Identiteitsgegevens** consistent met DBZ/CBA-formaat
- **Partijgegevens** (natuurlijk vs rechtspersoon)
- **PERCEELSID** in geldig formaat
- **Bronstuktype** correct gelabeld

Bij fout: zaak gaat naar status `incompleet` met regel **R-ADM-001/002/003** als blocker.

### 2.2 Document-check

Per type aanvraag wordt een eis-set opgehaald:

| Type | Verplichte documenten |
|---|---|
| Specifiek | nationaliteitsverklaring, ID-kopie, figuratieve kaart |
| Algemeen | nationaliteitsverklaring, ID-kopie |
| + rechtspersoon | + KvK-uittreksel |
| + bij conversie | + PERCEELSID-kaart, hypothecair uittreksel, betalingsbewijs |

Ontbreekt iets? → Adviesmotor zet R-ADM-002, R-ADM-003 en/of R-CONV-002 als blocker.

### 2.3 Geometrie-validatie + overlap-engine

Dit is **de kern**. Zie sectie [§3](#3-hoe-wordt-conflictanalyse-op-de-kaart-toegevoegd).

### 2.4 De adviesmotor draait

Alle 22 regels worden geëvalueerd op de zaak. Output:
- **Risicoscore 0-100** = som van gewichten van actieve regels
- **Hard blockers**: 1 actieve blocker = zaak = `niet besluitbaar`
- **Triggers**: → FPIC, → NMA
- **Aanbeveling-tekst**

Resultaat tijd: **< 1 sec**. Op een dossier in deze demo zie je dit live in `/aanvragen/[id]`.

---

## 3. Hoe wordt conflictanalyse op de kaart toegevoegd?

Je vroeg specifiek: *"hoe worden conflictanalyse op de kaart toegevoegd met coördinaten of wat?"* — hier de volledige technische uitleg.

### 3.1 Hoe komt geometrie het systeem in?

**Drie manieren:**

#### Manier 1 — PERCEELSID (verwijzing)
Indiener typt `PMB-AB-12345`. Systeem haalt geometrie op uit MI-GLIS (in demo: lokale `parcelGeometries` mock).

#### Manier 2 — Coördinaten (lon/lat)
Indiener tekent een polygoon op de kaart of importeert een bestand. Het systeem accepteert:

| Formaat | Wanneer | Status demo |
|---|---|---|
| **GeoJSON** | Web/app, lichtgewicht | ✅ datamodel |
| **Shapefile (.zip)** | Landmeter-deliverable | 🛣 import-UI roadmap |
| **KML** | Google Earth-export | 🛣 |
| **GeoPackage** | Officiële landmeter-pakketten | 🛣 |
| **GML** | Inter-overheid (INSPIRE-profiel) | 🛣 |

**Coördinatenstelsel:**
- Demo: **WGS84** (longitude/latitude) — bv. `[-54.20, 4.95]` voor Marowijne-Zuid
- Productie: **RD-equivalent** voor Suriname (lokale projectie, mogelijk **UTM zone 21N**) — pas omgerekend naar WGS84 voor weergave

#### Manier 3 — GPS-track in het veld
Roadmap fase 3 (mobiele app). Landmeter loopt om het perceel, app slaat punten op met tijdstempel. Bij sync wordt het een polygoon.

### 3.2 Wat slaat het systeem op?

In het datamodel ([doc 8 §8.2.3](../docs/08-data-model.md)):

```sql
LA_SpatialUnit
├── spatial_unit_id   UUID
├── unit_type         enum (parcel_2d, customary_territory, concession_area, ...)
├── geometry          GEOMETRY(POLYGON, 4326)   ← PostGIS
├── precision_class   enum (survey_cm, gps_m, sketch, satellite_estimate)
├── area_ha           numeric (auto-berekend uit geometry)
├── version           int
└── valid_from/to     date
```

De `precision_class` is cruciaal: een dorpsgrens met `sketch`-precisie wordt anders behandeld dan een perceel met `survey_cm`.

> **FFP-LA-principe (Fit-for-Purpose):** liever vandaag een `sketch`-polygoon van een dorp die voldoende-nauwkeurig is, dan over 10 jaar wachten op cm-precisie. Zie doc 12 + doc 04 §4.5.

### 3.3 De overlap-engine — hoe vindt SGDP conflicten?

In productie: **PostGIS spatial query** in Postgres.

```sql
-- Pseudocode: vind alle objecten die de aanvraag-polygoon raken
SELECT
  spatial_unit_id,
  unit_type,
  ST_Area(ST_Intersection(aanvraag.geom, kaart.geom)) /
    ST_Area(aanvraag.geom) * 100  AS overlap_pct
FROM la_spatial_unit kaart
WHERE ST_Intersects(aanvraag.geom, kaart.geom)
ORDER BY overlap_pct DESC;
```

Dit levert per overlap een **`overlap_result`-record** op (doc 8 §8.7.3):

| Veld | Voorbeeld |
|---|---|
| `case_id` | APP-2026-009 |
| `spatial_unit_id` | CT-004 |
| `constraint_type` | `customary_territory` |
| `overlap_pct` | 87.3 |
| `severity` | `blocker` |
| `explanation` | "Aanvraag overlapt voor 87% met DEMO_Diitabiki Aukaans gebied" |

### 3.4 Welke lagen worden gecheckt?

In één query worden alle lagen tegelijk vergeleken:

| Laag | Bron | Constraint type |
|---|---|---|
| Bestaande percelen | MI-GLIS | `existing_right` |
| Andere lopende aanvragen | GBB | `pending_application` |
| Concessies | NH/GMD/SBB-registers | `concession` |
| ITP traditionele woon- en leefgebieden | STDM-laag, VIDS-data | `customary_territory` |
| Beschermde gebieden | NMA + natuurbeheer | `protected_area` |
| Verontreinigde gebieden | NMA-register | `contaminated_site` |
| WRO-bestemmingen | RO (toekomstig) | `wro_zoning` |

Elke overlap → een regel uit de adviesmotor (R-RUM-001 / R-SOC-001 / R-ENV-010 / etc.) + visualisatie op de kaart.

### 3.5 Waarom werkt dit in de demo zonder PostGIS?

De demo gebruikt **gehardcodeerde overlap-resultaten** in `lib/demo-data.ts` (`applications[].blockers[]`). Geen echte spatial query. Maar:
- De **geometrieën zijn echt** (GeoJSON polygonen) — je kunt ze op de kaart zien
- De **adviesmotor reageert echt** op de blocker-strings via regex-matching
- Het is voldoende om te demonstreren *hoe* het werkt

In productie wordt `lib/demo-data.ts` vervangen door PostGIS-queries via `pg_tileserv` of `Tegola` voor vector tiles.

### 3.6 Visualisatie op de kaart

Eenmaal de overlap-resultaten zijn berekend, kleurt de kaart automatisch:

| Severity | Kleur | Wat het betekent |
|---|---|---|
| `info` | Geel-rand | Buffer-overlap, consultatie aanbevolen |
| `warning` | Oranje | Senior review nodig |
| `blocker` | Rood | Niet besluitbaar tot opgelost |

Op `/aanvragen/[id]` zie je dit visueel: de aanvraag-polygoon kleur = risicoscore, en de overlapping object (concessie/customary/protected) wordt gehighlighted.

---

## 4. Het volledige stappenplan

Conform [FR-2.3](../docs/05-requirements.md):

```
   ┌─────────────┐
   │ 1. ontvangen│
   └──────┬──────┘
          │ schemavalidatie OK
          ▼
   ┌─────────────┐
   │ 2. document │ ──[onvolledig]──► incompleet ──► aanvuller-mail
   │   controle  │ ──[blocker]────► geblokkeerd ──► ambtenaar handmatig
   └──────┬──────┘
          │ alle docs OK
          ▼
   ┌─────────────┐
   │ 3. in       │ ──[FPIC-trigger]─► FPIC-traject (parallel)
   │   onderzoek │ ──[NMA-trigger]──► NMA-reviewtaak (parallel)
   └──────┬──────┘
          │ overlap-check + adviesmotor
          ▼
   ┌─────────────┐
   │ 4. landmeter│ verifieert geometrie en uitmetingskaart
   │   controle  │ (alleen specifiek-type)
   └──────┬──────┘
          ▼
   ┌─────────────┐
   │ 5. publi-   │ start 30-daagse bezwaartermijn (Decreet UD)
   │   catie     │ → klok op detail-page
   └──────┬──────┘
          ▼
   ┌─────────────┐
   │ 6. bezwaar- │ ──[bezwaar]──► bezwaar afhandelen + rejudicatie
   │   periode   │
   └──────┬──────┘
          │ 30 dagen + alle blockers opgelost?
          ▼
   ┌─────────────┐
   │ 7. juridisch│ jurist accepteert / wijst af / vraagt extra
   │   advies    │
   └──────┬──────┘
          ▼
   ┌─────────────┐
   │ 8. besluit  │ ministerieel beslisser tekent (GBB)
   └──────┬──────┘
          ▼
   ┌─────────────┐
   │ 9. beschikt-│ inschrijving bij MI-GLIS;
   │   king      │ aanvrager krijgt PDF/A met PKI/QR
   └─────────────┘
```

### 4.1 Wie doet wat in elke stap (federatief)

Conform [doc 15 §15.4](../docs/15-juridisch-kader.md#154-federatief-autorisatie--en-mandaatmodel):

| Stap | Wie kan handelen |
|---|---|
| 1-2 (ontvangen, doc-check) | GBB-loket (rol `ambtenaar`) |
| 3 (in onderzoek + parallel FPIC/NMA) | GBB-onderzoeker + werkstroom Consultatie + NMA-reviewer |
| 4 (landmetercontrole) | Beëdigd landmeter |
| 5 (publicatie) | GBB |
| 6 (bezwaarperiode) | GBB-bezwaaroffice |
| 7 (juridisch advies) | Jurist (intern of extern) |
| 8 (besluit) | Ministerieel beslisser GBB |
| 9 (beschikking + inschrijving) | GBB → MI-GLIS |

Geen enkel orgaan kan over de bevoegdheid van een ander beslissen. SGDP **orchestreert**, het **vervangt geen authority**.

---

## 5. Wanneer is een aanvraag "goed"?

### 5.1 Drie niveaus van "goed"

#### Niveau 1 — Niet blokkerend (groen licht voor administratie)
- Risicoscore **< 25** (laag)
- Geen hard blockers
- Alle documenten compleet
- Geen overlap met FPIC-gebieden, beschermd gebied, of MEA-plichtige zone

→ Aanvraag gaat via reguliere workflow naar publicatie + 30-dagen bezwaartermijn.

#### Niveau 2 — Senior review nodig
- Risicoscore **25-49** (middel)
- Mogelijk warnings maar geen blockers (bv. nabij customary territory, niet erin)
- Lopend bezwaar of gerelateerd geschil

→ Senior ambtenaar leest mee, kan extra documenten of consultatie eisen.

#### Niveau 3 — Juridische + GIS review verplicht
- Risicoscore **50-74** (hoog) of **75+** (zeer hoog)
- Hoge weging-regels actief

→ Jurist + landmeter samen; soms NMA-reviewer; soms FPIC vereist.

### 5.2 De acceptatiecriteria (controle-checklist)

Een ambtenaar mag pas naar status **`besluit`** als:

| Check | Hoe gecontroleerd |
|---|---|
| Documenten compleet | R-ADM-001/002/003 = niet-actief |
| Geen overlap met bestaand recht | R-JUR-001 = niet-actief |
| FPIC voltooid (indien getriggerd) | FPIC_Process.status ∈ {`instemming`, `voorwaardelijke_instemming`} |
| MEA-status (indien getriggerd) | EnvCase.status ∈ {`approved`, `conditional`, `not_required`} |
| Bezwaartermijn verstreken zonder bezwaar | publishedAt + 30 dgn ≤ vandaag, geen open `objection` |
| Lopende rechtszaken opgelost | `related_litigation_open = false` |

**Pas dan** kan een ministerieel beslisser tekenen. SGDP blokkeert het besluit-knop tot al deze condities groen zijn.

### 5.3 Het allerlaatste woord: de mens

> *"Adviezen zijn adviserend, niet bindend. Een ambtenaar of werkgroeplid moet expliciet accepteren / aanpassen / verwerpen met motivatie."* — doc 10 §10.8

Een ambtenaar kan dus de adviesmotor **overrulen** (bv. een blocker negeren) — maar:
- Override moet **gemotiveerd** zijn
- Override wordt **gelogd** met actor, tijdstip, motivatie
- Override zichtbaar in **audit trail** voor toezichthouder
- Bij IACHR-relevante zaken: override bijna nooit verstandig

---

## 6. Wie controleert regels en wetten?

### 6.1 Drie lagen van controle

```
   ┌──────────────────────────────────────────────┐
   │ Laag 1 — Geautomatiseerd (adviesmotor)       │
   │ - 22 regels = 16 compliance-controles (C1-C16)│
   │ - Loopt bij elke status-overgang              │
   │ - 0 menselijk werk                            │
   └────────────────┬─────────────────────────────┘
                    │
   ┌────────────────┴─────────────────────────────┐
   │ Laag 2 — Menselijke jurist (werkstroom)      │
   │ - Reviewt zaken met risico ≥ 50              │
   │ - Schrijft juridisch memo                     │
   │ - Kan adviesmotor-output overrulen mits      │
   │   gemotiveerd                                 │
   └────────────────┬─────────────────────────────┘
                    │
   ┌────────────────┴─────────────────────────────┐
   │ Laag 3 — Bestuursrecht (rechter / IACHR)     │
   │ - Bezwaar/beroep door indiener of derde      │
   │ - Audit-trail levert bewijs                   │
   │ - SGDP zelf is geen rechter                   │
   └──────────────────────────────────────────────┘
```

### 6.2 Welke wetten dekt de adviesmotor af?

[Doc 15 §15.3](../docs/15-juridisch-kader.md#153-compliance-checklist) mapt 16 wetten/normbronnen naar platformcontroles. Hier de top:

| Compliance-check | Norm | Adviesregel(s) |
|---|---|---|
| C1 — Eigendom + onteigening | Grondwet art. 34 | Beslislog + compensatiemodule |
| C2 — Natuurlijke rijkdommen | Grondwet art. 41 | R-BEL-002 |
| C3 — Openbare registers + perceelsadm. | Wet GLIS 2009 | Datamodel + R-ADM-* |
| C4 — Customary territory | Wet GLIS-toelichting | R-SOC-001/002, STDM-laag |
| C5 — Aanvraag-procedure + bezwaartermijn | Decreet Uitgifte Domeingrond | Workflow §4 + bezwaarklok |
| C6 — Grondhuur 15-40 jr + verlenging | Decreet UD | R-LIFE-001/002 |
| C7 — Inschrijvingsvelden | Besluit GLIS 2025 | Schema + R-ADM-* |
| C8 — Conversie-stukken | Besluit Grondconversie 2023 | R-CONV-001/002/003 |
| C9 — MEA / MER / SEA | Milieu Raamwet | R-ENV-010/020/030/040 |
| C10 — FPIC / IACHR Saramaka | Saramaka 2007 | R-SOC-001/002/003 + FPIC-engine |
| C11 — IACHR Kaliña-Lokono | Kaliña-Lokono 2015 | R-ENV-040 + rehabilitatie |
| C12-C15 — LADM/STDM/VGGT/FPIC | Internationale standaarden | Datamodel + processen |
| C16 — Toekomstige wetgeving | Ontwerpwetten | `case_legal_regime` per zaak |

### 6.3 Wat als de wet verandert?

Conform [doc 15 §15.8](../docs/15-juridisch-kader.md#158-configuratie-van-wetregimes), elke zaak registreert zijn **wetregime**:

```yaml
case_legal_regime:
  domeingrond_decreet_version: "1981"
  glis_inschrijvingsbesluit_version: "2025"
  collectieve_rechten_status: "ontwerp_dna_2019"
  privacy_regime: "ontwerp_2024"
  wro_regime: "ontwerp_2024"
```

Verandert de wet morgen? Dan worden **nieuwe zaken** automatisch onder het nieuwe regime opgepakt. **Lopende zaken** blijven onder hun oude regime — geen rechtsonzekerheid, geen retroactiviteit.

### 6.4 Wijziging van regels zelf

Conform [doc 10 §10.9](../docs/10-adviesmotor.md#109-beheer-en-versionering-van-regels):
1. Iemand stelt een wijziging voor → **Pull Request op Git**
2. **Minstens één jurist + één werkgroeplid** moeten reviewen
3. **Replay-test** met eerdere zaken (zou de uitkomst nog hetzelfde zijn?)
4. Productieversie wordt per omgeving **gepind** (semver)
5. Elke run logt de regelversie

Dit is wezenlijk: je kunt later altijd terugkijken **welke regelversie op een zaak werd toegepast**.

---

## 7. Wat lossen MI-GLIS, GBB en NMA-integratie op?

Vandaag zijn deze sporen **niet gekoppeld**. Wat is daar concreet het probleem mee?

### 7.1 Zonder integratie — wat gaat mis (echte praktijk)

**Probleem 1: dubbele toekenning.**
Een ambtenaar kent een domeingrondaanvraag toe op een perceel waar al **eigendom is ingeschreven** bij MI-GLIS. Niemand zag dat omdat de twee registers gescheiden zijn. → Rechtszaak.

**Probleem 2: concessie-overlap met dorpsgebied.**
Een mijnbouwconcessie wordt verleend door NH/GMD over een gebied dat traditioneel in gebruik is door een Inheemse gemeenschap. → IACHR-klacht (Saramaka).

**Probleem 3: dubbele aanvraag.**
Twee burgers vragen tegelijk hetzelfde perceel aan via twee verschillende loketten. Beide worden ontvankelijk verklaard. → Bestuursrechtelijk geschil.

**Probleem 4: late ontdekking milieu-impact.**
Beschikking wordt afgegeven, daarna pas blijkt dat het binnen een natuurreservaat valt. → MEA achteraf, schorsingsverzoek.

**Probleem 5: identiteitsverificatie ontbreekt.**
Aanvrager geeft fictief ID-nummer op. Geen koppeling met DBZ/CBA. → Fraude.

### 7.2 Wat MI-GLIS-koppeling oplost

MI-GLIS = **authoritative source voor registergoederen** (eigendom, hypotheken, erfpacht).

| Probleem | Oplossing met integratie |
|---|---|
| Dubbele toekenning op bestaand recht | Bij intake: real-time call naar MI-GLIS → direct rood scherm |
| Onjuiste hypothecaire info | Conversie-aanvraag haalt hypothecair uittreksel automatisch op (Besluit Grondconversie 2023) |
| PERCEELSID inconsistent | Validatie tegen MI-GLIS-master |
| Rechtsonzekerheid | Beschikking wordt **bidirectioneel** ingeschreven — MI-GLIS weet ervan binnen seconden |

**Concreet:** in de adviesmotor zou regel **R-JUR-001** ("Overlap met bestaand recht") niet meer afhankelijk zijn van een handmatig ingevoerde blocker-string, maar van een live spatial query op MI-GLIS-data.

### 7.3 Wat GBB / Domeinkantoor-koppeling oplost

GBB = **authoritative source voor domeingrond, beschikkingen, conversie, vervallenverklaring**.

| Probleem | Oplossing |
|---|---|
| Dubbele aanvraag (zelfde polygoon) | Real-time check op alle GBB-aanvragen → R-JUR-002 |
| Status van een eerdere aanvraag onduidelijk | API geeft live `caseStatus`, niet jaarlijkse spreadsheet |
| Beschikking onbekend bij MI-GLIS | GBB → SGDP → MI-GLIS, één flow |
| Achterstanden grondhuur niet gezien | Live `arrears_amount` voor R-LIFE-002 |

### 7.4 Wat NMA-koppeling oplost

NMA = **authoritative source voor milieubesluiten, MEA/SEA/MER, vergunningen, verontreinigde gebieden, rehabilitatie**.

| Probleem | Oplossing |
|---|---|
| MEA-plicht over het hoofd gezien | Intake-trigger via activiteit + locatie → automatisch EnvCase aangemaakt |
| Beschermd gebied niet bekend | Real-time spatial query → R-ENV-010 |
| Vergunningen-info niet beschikbaar | Live API call → laat eerdere vergunningen zien |
| Rehabilitatieverplichting wordt niet opgevolgd | NMA-monitor zichtbaar in SGDP-dashboard |

### 7.5 Wat concessieregister-koppeling (NH/GMD/SBB) oplost

| Probleem | Oplossing |
|---|---|
| Concessie-overlap met dorp niet gezien | Real-time check → R-RUM-002 |
| Concessie-status onbekend (actief/verlopen) | Live status |
| Houder-info onbekend | Live houder + KvK |

### 7.6 Wat identiteitsregister-koppeling (DBZ/CBA/e-ID) oplost

| Probleem | Oplossing |
|---|---|
| Fraude met fictieve ID's | Real-time verificatie tegen DBZ |
| Authenticiteit nationaliteitsverklaring | PKI-handtekening van DBZ |
| Vertegenwoordigingsbevoegdheid | Mandaatregister-check |

### 7.7 Het federatieve principe

> **SGDP wijzigt alleen wat onder eigen mandaat valt** (eigen werkprocesentiteiten, FPIC-data, conflictanalyse). Voor master-data van een ander orgaan: lezen, refereren, verifiëren — niet stilzwijgend overschrijven. ([doc 16 §16.3](../docs/16-integraties-api.md#163-authoritative-source-principe-in-praktijk))

Dit betekent: als MI-GLIS een fout heeft, **fixt SGDP dat niet stiekem**. SGDP signaleert het, GBB/MI-GLIS lossen het op via hun eigen procedures.

---

## 8. De aanpak — hoe komen ze tot een besluit?

### 8.1 Het besluit is collectief én getrapt

```
   GBB-loket (intake)              ← formele kant
        │
        ▼
   GBB-onderzoeker (analyse)       ← inhoudelijke beoordeling
        │
        ▼
   Werkstroom Consultatie / FPIC   ← als ITP betrokken
        │
        ▼
   NMA-reviewer                     ← als milieu betrokken
        │
        ▼
   Beëdigd landmeter                ← bij specifieke aanvraag
        │
        ▼
   Jurist (intern of werkgroep)    ← wetstoetsing
        │
        ▼
   Ministerieel beslisser GBB      ← FORMEEL BESLUIT
        │
        ▼
   MI-GLIS                          ← inschrijving
```

### 8.2 De "raad-van-toezicht"-rol

In productie kan ook de **Werkgroep Grondenrechten en Decentralisatie** zelf adviseren — niet beslissen, wel adviseren over:
- IACHR-relevante zaken (bv. concessie in customary territory)
- Beleidsbreuken (bv. demarcatie-prioriteit)
- Patronen (bv. district-hotspot)

De werkgroep heeft **geen beschikkingsbevoegdheid** maar wel **adviesrecht aan de President**. Hun input zit in:
- `decisions` (besluiten met stemverhouding)
- Tussentijds rapport President

### 8.3 Hoor en wederhoor (bij negatief voornemen)

Voordat een aanvraag wordt **afgewezen** (of bij vervallenverklaring/conversie-afwijzing):
1. **Voornemen** wordt opgesteld (motivatie + verwijzing regelversie)
2. **Houder/aanvrager** krijgt termijn om te reageren
3. **30-daagse bezwaartermijn** open
4. Bezwaar wordt **inhoudelijk gewogen** (jurist)
5. **Definitief besluit** (afwijzen / aanpassen / honoreren)
6. Bij afwijzing: aanvrager kan naar **rechter**

### 8.4 Wat als een hard blocker overruled moet worden?

Soms is dat nodig (bv. spoed-publiekbelang). Procedure (toekomstig productie):
1. Override-aanvraag door bevoegde ambtenaar
2. Motivatie verplicht
3. **Hogerop tekent**: ministerieel beslisser of werkgroep-voorzitter
4. Audit-event `override` met motivatie
5. **Zichtbaar voor toezichthouder** voor altijd

In de demo: niet bewerkbaar, alleen zichtbaar als concept.

---

## 9. Twee verhalen — happy path en blocked path

### 9.1 Happy path — schone aanvraag

**Scenario:** Aanvrager L. Pansa wil 1.500 m² in Para voor bebouwing/bewoning. Geen overlap, alle docs compleet.

```
T+0      Intake via GBB-loket. Status: ontvangen.
T+5min   Schemavalidatie OK. Document-check OK. Geometrie: geen overlap.
         Adviesmotor: risicoscore 12 (laag), 0 blockers.
         Status → documentcontrole → in_onderzoek.

T+1d     Senior ambtenaar reviewt. Geen extra acties nodig.
         Status → landmetercontrole.

T+3d     Beëdigd landmeter verifieert uitmetingskaart. OK.
         Status → publicatie.

T+3d     Bezwaartermijn start (30 dagen klok zichtbaar in dossier).
         Status → bezwaarperiode.

T+33d    Geen bezwaar binnengekomen. Status → juridisch_advies.

T+35d    Jurist controleert wetregime + IACHR-toets (n.v.t.). OK.
         Status → besluit.

T+36d    Ministerieel beslisser tekent. Beschikking gegenereerd
         (PDF/A met PKI/QR).
         Status → beschikking.

T+37d    MI-GLIS-mutatie ingeschreven. Audit-trail compleet.
         Aanvrager ontvangt PDF + zaak afgesloten.

Totaal: ~37 dagen.
```

### 9.2 Blocked path — onze Diitabiki-zaak (DG-2026-0009)

```
T+0      Intake. Status: ontvangen.
T+5min   Geometrie: 87% overlap met CT-004 (DEMO_Diitabiki Aukaans).
         Adviesmotor: risicoscore 72 (hoog), R-SOC-001 BLOCKER.
         Status → geblokkeerd. Trigger: FPIC vereist.

T+1d     Werkstroom Consultatie krijgt taak: identificatie traditioneel
         gezag. → granman R. Misiedjan, kapiteins E. Pinas + M. Akontu.
         FPIC_Process aangemaakt, status: identificatie_gezag.

T+5d     Eerste contact. Verzoek tot kennismaking. Status:
         informatie_verstrekt. Pakket overhandigd in Aukaans + NL.
         Reflectieperiode: gemeenschap vraagt 3 weken.

T+26d    Plenaire consultatiesessie. Status: consultatie_lopend.
         Vragen over jacht- en visgebieden. Verzoek aanvullende kaart
         seizoensgebruik.

T+50d    Vervolgsessie. Voorwaarden besproken: geen activiteit binnen
         buffer X, lokale werkgelegenheid 30%.

T+60d    Gemeenschap geeft voorwaardelijke instemming via gezag.
         Status: voorwaardelijke_instemming.

T+62d    Voorwaarden opgenomen in dossier. R-SOC-001 niet langer blocker.
         Status zaak: in_onderzoek.

T+63d    Adviesmotor herrun: risicoscore 25 (middel), geen blockers.
         Senior review nodig.

T+65d    Senior + jurist: alles in orde. → landmetercontrole → publicatie.

T+95d    Bezwaartermijn voorbij zonder bezwaar.

T+97d    Beschikking met voorwaarden uit FPIC.
         Audit-trail toont volledig spoor: zaak + FPIC + besluiten.

Totaal: ~97 dagen (FPIC zit in de tijdlijn, niet ernaast).
```

### 9.3 Wat als FPIC-status `bezwaar` was geworden?

Dan zou de aanvraag waarschijnlijk worden **afgewezen** (of aangepast naar een lokatie buiten CT-004). De adviesmotor zou R-SOC-001 actief houden, geen pad voorwaarts mogelijk zonder andere geometrie.

Dit is **wat doc 11 §11.2 "consent" betekent**: de gemeenschap kan ja, nee, of voorwaardelijk-ja zeggen. Geen besluit zonder consent op major-impact.

---

## 10. Wat in de demo wel werkt vs roadmap

### 10.1 Wat de demo aantoont (✅)

- Hoe het volledige proces eruit ziet
- Welke statussen er zijn en hoe ze koppelen
- Hoe de adviesmotor regelgebaseerd reageert
- Hoe FPIC-events met evidence opgebouwd worden
- Hoe overlap visueel zichtbaar wordt op de kaart
- Hoe de werkgroep binnen het systeem werkt
- Hoe audit-trail werkt (hash-keten)
- Hoe regels publiek leesbaar zijn

### 10.2 Wat nog niet werkt (🛣)

- **Echte API-integraties** (MI-GLIS / GBB / NMA / NH-GMD-SBB / DBZ-CBA) — alle data is mock, in `lib/demo-data.ts`
- **PostGIS spatial queries** — overlap is hardcoded
- **File-upload + geometrie-import** (Shapefile, KML) — alleen scenario-picker
- **Bewerkbare formulieren** — alle UI is read-only
- **PKI/QR document-verificatie**
- **Mobiele veld-app**
- **Burgerportaal**
- **Push-notificaties**
- **Echte authenticatie** (alleen 6 mock-accounts)

### 10.3 Wat dit voor de demo betekent

De demo is een **bewijs-van-concept**, niet een productie-systeem. Hij laat zien:
- *Werkt het idee?* — ja
- *Past het binnen de Surinaamse wettelijke en institutionele realiteit?* — ja, doc 15 mapt het uit
- *Kan een werkgroep-lid ermee werken zonder ICT-bril?* — ja
- *Is het IACHR-bestendig in opzet?* — ja, in datamodel + audit + FPIC-engine

Wat de demo **niet** kan:
- Echt een aanvraag tot beschikking afhandelen
- Echte data verwerken
- Schaalbaar zijn voor 100k+ dossiers (komt in roadmap fase 2-3)

Voor de evaluatie van de demo is dat genoeg. Voor productie: zie [doc 13 — Roadmap](../docs/13-roadmap.md).

---

## Conclusie — het hele proces in één alinea

Een aanvraag komt binnen via loket, web of veld-app. Schemavalidatie (Besluit GLIS 2025), document-check en een **PostGIS spatial overlap-query** tegen alle relevante lagen draaien parallel; de **regelgebaseerde adviesmotor (22 regels)** geeft binnen 1 sec een risicoscore + hard blockers + triggers naar FPIC of NMA. De zaak doorloopt 9 statussen waarin **MI-GLIS, GBB, NMA, beëdigd landmeter, jurist en — bij ITP-overlap — traditioneel gezag** elk binnen hun **federatieve mandaat** handelen. SGDP **orchestreert** zonder authority te grijpen. Een aanvraag is "goed" als alle blockers weg zijn, FPIC eventueel met (voorwaardelijke) instemming is afgesloten, MEA met goedkeuring of voorwaarden, bezwaartermijn verstreken zonder bezwaar, en een ministerieel beslisser tekent. **Real-time integraties** met MI-GLIS, GBB, NMA en concessieregisters lossen vandaag bestaande problemen op — dubbele toekenning, dubbele aanvraag, IACHR-overtredingen, late milieuontdekkingen, identiteitsfraude — door de relevante data **in seconden** beschikbaar te maken in plaats van in maanden. De **conflictanalyse op de kaart** is geen mens-in-een-kantoor maar een PostGIS-`ST_Intersects`-query die geometrieën (WGS84-coördinaten van polygonen, GeoJSON/Shapefile/GeoPackage-bronnen) automatisch tegen elkaar legt en overlap-percentages berekent — het resultaat wordt visueel op MapLibre weergegeven met severity-kleurcoding.

---

**Versie:** 1.0 · 11 mei 2026 · Republiek Suriname · Werkarm van het Staatshoofd

**Onderliggende docs:** docs/05 (requirements), docs/08 (datamodel), docs/09 (architectuur), docs/10 (adviesmotor), docs/15 (juridisch kader), docs/16 (integraties), docs/17 (milieu), docs/18 (grondhuur).
