# 10 — Adviesmotor (regelgebaseerd)

## 10.1 Doel

Per dossier (case) genereert het systeem een **gestructureerd adviesrapport** met onderbouwing. De adviesmotor is **regelgebaseerd**, **transparant** en **uitlegbaar**. Geen black-box.

## 10.2 Zes adviescategorieën

| Categorie | Vraag die beantwoord wordt | Doelpubliek |
|---|---|---|
| **1. Administratief** | Is het dossier compleet en correct ingediend? | Loket / Domeinkantoor |
| **2. Juridisch** | Welk type recht, welke procedure, welk risico? | Juristen |
| **3. Ruimtelijk** | Overlapt de aanvraag met bestaande objecten of bestemmingen? | Landmeters / planners |
| **4. Sociaal / FPIC** | Welke gemeenschap is betrokken? Is consultatie/FPIC nodig? | Werkgroep / ITP-stakeholders |
| **5. Beleid** | Wat zegt dit over patronen — hotspots, ontbrekende registratie, demarcatieprioriteiten? | President / werkgroep |
| **6. Bestuurlijk-financieel** | Welk district/ressort krijgt welke opbrengst? Welke WRO-bevoegdheid is van toepassing? Bestaat conflict met centrale wetgeving? Hoort er een ITP-royalty bij? | Werkgroep / Min. Fin. / DR-leden / ITP-koepels |

> Categorie 6 is toegevoegd voor het tweede mandaatspoor van de werkgroep (decentralisatie). Volledige context in [docs/19](19-wro-decentralisatie.md), [20](20-financien-districtsfonds.md), [21](21-koppeling-grond-fondsen.md).

## 10.3 Werking van de motor

```
                       ┌────────────────────────┐
   Case data ─────►    │   Feature extractor    │
   (party, RRR,        │  (vragen verzamelen    │
    spatial, FPIC,     │   uit datamodel)       │
    documents)         └───────────┬────────────┘
                                   │
                                   ▼
                       ┌────────────────────────┐
                       │  Rule engine (YAML)    │
                       │  evalueert N regels    │
                       └───────────┬────────────┘
                                   │
                                   ▼
                       ┌────────────────────────┐
                       │  Findings (per regel)  │
                       │  + evidence references │
                       └───────────┬────────────┘
                                   │
                                   ▼
                       ┌────────────────────────┐
                       │ Aggregator             │
                       │ - groepeert per categ. │
                       │ - berekent risk score  │
                       └───────────┬────────────┘
                                   │
                                   ▼
                       ┌────────────────────────┐
                       │ Rapportgenerator       │
                       │ Markdown → PDF         │
                       └────────────────────────┘
```

## 10.4 Risk score (formule en drempels)

### 10.4.1 Formule

$$\text{Risico} = \sum (\text{weging} \times \text{waargenomen factor})$$

Score-bereik **0–100**. Eén of meer **hard blockers** zetten de zaak ongeacht de score op `niet besluitbaar`.

### 10.4.2 Factoren en gewichten

| Factor | Indicatie | Weegpunt |
|---|---|---|
| Overlap met bestaand formeel perceel of ingeschreven recht | > 0% | 20 |
| Overlap met geclaimd / geregistreerd traditioneel woon- en leefgebied | > 0% | 20 |
| Overlap met concessie (mijnbouw / bosbouw / olie–gas) | > 0% | 15 |
| Overlap met beschermd gebied / milieubeperking | > 0% | 15 |
| FPIC-trigger actief maar geen consultatie gestart | ja | 10 |
| MEA / SEA / MER vereist maar status ontbreekt | ja | 10 |
| Verplichte documenten ontbreken | ja | 5–15 |
| Identiteits- / partij-inconsistentie | mismatch | 5 |
| Grondhuurachterstanden of vervalrisico | ja | 5 |
| Actieve bezwaren of lopend geschil | ja | 5 |

### 10.4.3 Hard blockers

| Hard blocker | Output |
|---|---|
| Geen PERCEELSID waar juridisch vereist | Zaak gaat niet door naar besluit |
| Perceel raakt beschermd gebied + geen NMA-review | Blokkeer en routeer naar NMA |
| Major-impact project + FPIC-status ontbreekt | Blokkeer finale beslissing |
| Onopgeloste overlap met ingeschreven recht | Blokkeer tot conflict opgelost |
| Rechterlijke / bestuurlijke schorsing aanwezig | Blokkeer tot opheffing |
| MEA-plicht maar `MER_status = absent` | Blokkeer tot NMA-goedkeuring |
| Conversie zonder hypothecair uittreksel of betalingsbewijs | Blokkeer tot opgeleverd |

### 10.4.4 Drempels

| Score | Niveau | Verplichte actie |
|---|---|---|
| 0–24 | **laag** | Normale workflow |
| 25–49 | **middel** | Senior review verplicht |
| 50–74 | **hoog** | Juridische + GIS review verplicht |
| 75–100 | **zeer hoog** | Besluitblokkade tenzij gemotiveerde override door bevoegd orgaan |

Gewichten en drempels zijn **configureerbaar** in YAML; wijziging via PR met review (zie §10.9).

## 10.5 Voorbeeld-regelset (50+ regels in productie; ~15 in demo)

Regels in **YAML**:

```yaml
- id: R-ADM-001
  category: administratief
  description: Verplichte identiteitsdocument ontbreekt
  when:
    documents_required_missing: ["ID_card_or_nationality_proof"]
  finding: "Dossier incompleet: identiteitsbewijs ontbreekt."
  weight: medium
  blocks_decision: true

- id: R-ADM-002
  category: administratief
  description: Figuratieve kaart ontbreekt bij specifieke aanvraag
  when:
    application_type: "specific"
    documents_required_missing: ["figurative_map_or_survey_plan"]
  finding: "Dossier incompleet: figuratieve kaart of kaart van uitmeting ontbreekt."
  weight: high
  blocks_decision: true

- id: R-RUM-010
  category: ruimtelijk
  description: Overlap met bestaand perceel
  when:
    overlap_with: "existing_parcel_with_RRR"
    overlap_pct: ">5"
  finding: "Aanvraag overlapt voor {pct}% met bestaand recht ({rrr_id}). Landmetercontrole vereist."
  weight: high

- id: R-RUM-020
  category: ruimtelijk
  description: Overlap met concessie
  when:
    overlap_with: "concession"
  finding: "Aanvraag overlapt met concessie {concession_id}. Beoordeling sectoraal beleid nodig."
  weight: high

- id: R-RUM-030
  category: ruimtelijk
  description: Aanvraag in beschermd gebied
  when:
    inside: "protected_area"
  finding: "Aanvraag ligt binnen beschermd gebied {area_name}. Uitgifte vermoedelijk niet toegestaan."
  weight: high
  blocks_decision: true

- id: R-SOC-001
  category: sociaal
  description: Aanvraag ligt in traditioneel woon- en leefgebied (ITP)
  when:
    inside: "customary_territory"
  finding: "De aanvraag ligt binnen een traditioneel woon- en leefgebied van gemeenschap {community_name}. FPIC-procedure vereist voordat verdere besluitvorming plaatsvindt."
  weight: high
  triggers: "fpic_required"

- id: R-SOC-002
  category: sociaal
  description: Aanvraag ligt nabij traditioneel gebied (buffer 500 m)
  when:
    near: "customary_territory"
    distance_m: "<=500"
  finding: "Aanvraag ligt nabij traditioneel woon- en leefgebied. Consultatie aanbevolen."
  weight: medium

- id: R-JUR-001
  category: juridisch
  description: Dubbele aanvraag (zelfde indiener, zelfde polygoon)
  when:
    duplicate_application: true
  finding: "Dubbele aanvraag gedetecteerd ({other_case_id})."
  weight: high
  blocks_decision: true

- id: R-JUR-010
  category: juridisch
  description: Lopende rechtszaak op gerelateerd object
  when:
    related_litigation_open: true
  finding: "Er loopt een rechtszaak op een gerelateerd recht / gebied. Juridisch advies inwinnen."
  weight: high

- id: R-BEL-001
  category: beleid
  description: District is conflict-hotspot
  when:
    district_conflict_density: ">threshold"
  finding: "Dit district vertoont een verhoogde conflictdichtheid. Overweeg gebiedsgerichte demarcatieaanpak."
  weight: low
  scope: policy_aggregate

# ────────────────────────────────────────────────────────
# Categorie 6 — Bestuurlijk-financieel (WRO-spoor)
# Volledige context: docs/19, docs/20, docs/21
# ────────────────────────────────────────────────────────

- id: BF-01
  category: bestuurlijk-financieel
  description: Concessie of grondhuur → opbrengstaandeel naar DistrictFund
  when:
    rrr_type_in: ["concession_mining", "concession_forestry", "concession_agriculture", "lease_grondhuur"]
    spatial_unit.in_administrative_unit: "district"
  finding: "Aanvraag {case_id} ligt in district {district_name}. Volgens Interimregeling Financiële Decentralisatie dient een aandeel van de opbrengst naar DistrictFund {district_name}."
  weight: medium
  legal_basis: ["Interimregeling_2003", "WRO_2006_134"]
  triggers: ["create_revenue_source_proposal"]

- id: BF-02
  category: bestuurlijk-financieel
  description: Eigen tarief vóór Level-2-certificering = niet toegestaan
  when:
    regional_decision.competence_type: "belastingheffing"
    administrative_unit.level2_certified: false
  finding: "District {district_name} stelt een eigen tarief vast zonder Level-2-certificering. Niet rechtsgeldig tot certificering door Ministerie BiZa."
  weight: high
  blocks_decision: true
  legal_basis: ["Level2_certificeringskader"]

- id: BF-03
  category: bestuurlijk-financieel
  description: DC-pet-conflict (DC als voorzitter DR)
  when:
    regional_body.body_type: "DR"
    regional_body.chairperson_party_id: "== regional_body.dc_party_id"
    legal_regime.wro_version: "< ontwerp_2026_a"
  finding: "Districtscommissaris {dc_name} is tevens voorzitter van Districtsraad {district_name}. Belangenconflict; te schrappen onder aanstaande DC-ontkoppelingswet."
  weight: medium
  legal_basis: ["Ontwerpwet_DC_Ontkoppeling_2026"]

- id: BF-04
  category: bestuurlijk-financieel
  description: Districtsverordening conflicteert met Comptabiliteitswet
  when:
    regional_decision.competence_type: "verordening"
    central_budget_conflict: true
  finding: "Districtsbesluit {regional_decision_id} botst met centrale begrotingsdiscipline ({comptabiliteit_artikel}). Min. Fin.-review vereist."
  weight: medium
  legal_basis: ["Comptabiliteitswet", "WRO_S.B._1989_44"]
  triggers: ["min_fin_review_required"]

- id: BF-05
  category: bestuurlijk-financieel
  description: RR-/DR-besluit overschrijdt bevoegdheid
  when:
    regional_decision.competence_id: null
  finding: "Besluit {regional_decision_id} mist een dekkende Competence-verwijzing in WRO of bijbehorende wetgeving."
  weight: high
  blocks_decision: true

- id: BF-06
  category: bestuurlijk-financieel
  description: Concessie in customary_territory → opbrengstaandeel naar ITP-gemeenschap
  when:
    rrr_type_in: ["concession_mining", "concession_forestry", "concession_agriculture", "lease_grondhuur"]
    overlap_with: "customary_territory"
    overlap_pct: ">0"
  finding: "Aanvraag {case_id} overlapt voor {pct}% met traditioneel woon- en leefgebied van gemeenschap {community_name}. Voorgesteld verdeelmodel (scenario {scenario}): centraal {pct_central}%, district {pct_district}%, gemeenschap {pct_itp}%. Definitieve verdeling vereist FPIC + DNA-bekrachtiging."
  weight: high
  triggers: ["fpic_required", "benefit_share_proposal"]
  legal_basis: ["IACHR_Saramaka_2007", "WRO_Interimregeling_2003", "Ontwerpwet_Collectieve_Rechten_ITP"]
```

Volledige uitwerking en verdeelscenario's: [docs/21 §21.3–§21.4](21-koppeling-grond-fondsen.md).

## 10.6 Voorbeeldadviezen (gegenereerde tekst)

**Advies 1 — Administratief**
> "Dossier is incompleet. De figuratieve kaart en nationaliteitsverklaring ontbreken. (regels R-ADM-001, R-ADM-002)"

**Advies 2 — Ruimtelijk**
> "De aanvraag overlapt voor 18% met perceelindicatie DEMO_Perceel_034. Nadere landmetercontrole nodig. (regel R-RUM-010)"

**Advies 3 — Sociaal / Grondenrechten**
> "De aanvraag ligt binnen een mogelijk traditioneel woon- en leefgebied van DEMO_Gemeenschap_Marowijne_03. Consultatie en FPIC-procedure zijn vereist voordat verdere besluitvorming plaatsvindt. (regel R-SOC-001)"

**Advies 4 — Bestuurlijk / Juridisch**
> "Niet uitgeven totdat overlap met bestaande concessie en dorpsgebied juridisch is beoordeeld. (regels R-RUM-020, R-SOC-001)"

**Advies 5 — Beleid**
> "In dit district is de conflictdichtheid verhoogd. Overweeg gebiedsgerichte demarcatieaanpak in plaats van case-by-case afhandeling. (regel R-BEL-001)"

## 10.7 Rapportstructuur

```markdown
# Adviesrapport — Zaak {case_number}

**Locatie:** {district}, {coords}
**Indiener:** {party_name (geanonimiseerd in publieke versie)}
**Aanvraagtype:** {application_type}
**Risk-score:** **HOOG**

## 1. Administratief
- Bevinding: ...
- Bevinding: ...

## 2. Juridisch
...

## 3. Ruimtelijk
...

## 4. Sociaal / FPIC
...

## 5. Beleid
...

## Onderbouwing
- Toegepaste regels: R-ADM-002, R-RUM-010, R-SOC-001
- Bewijs: source_id 12, 17, 25
- Datum analyse: {date}
- Adviesmotor versie: {version}
```

Elk advies is **traceerbaar** naar:
- de regel (id, versie),
- de feiten in het dossier (source_id, geometrie, datum),
- de gebruiker die de motor draaide.

## 10.8 Menselijke toetsing

- Adviezen zijn **adviserend**, niet bindend.
- Een ambtenaar of werkgroeplid moet expliciet **accepteren / aanpassen / verwerpen** met motivatie.
- Aanpassingen worden in audit log opgenomen.
- Op termijn (roadmap): kwaliteitsmeting — hoe vaak wordt advies gevolgd, en met welke uitkomst.

## 10.9 Beheer en versionering van regels

- Regels in Git, semver-versionering (`rules/v1.0.0.yaml`).
- Wijzigingen via PR met review door minstens één jurist en één werkgroeplid.
- Productieve regelversie wordt gepind per omgeving.
- Elke run logt de regelversie die gebruikt is.

## 10.10 Toekomst (roadmap)

- ML-laag voor patroonherkenning (bv. fraudesignalen) **bovenop** regels, niet in plaats van.
- Explainability (SHAP / LIME) verplicht voor elke ML-output die advies beïnvloedt.
- Beleidsadvies aggregeren over het hele dossierbestand → automatische beleidsbriefings.
