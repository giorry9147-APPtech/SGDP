# 10 — Adviesmotor (regelgebaseerd)

## 10.1 Doel

Per dossier (case) genereert het systeem een **gestructureerd adviesrapport** met onderbouwing. De adviesmotor is **regelgebaseerd**, **transparant** en **uitlegbaar**. Geen black-box.

## 10.2 Vijf adviescategorieën

| Categorie | Vraag die beantwoord wordt | Doelpubliek |
|---|---|---|
| **1. Administratief** | Is het dossier compleet en correct ingediend? | Loket / Domeinkantoor |
| **2. Juridisch** | Welk type recht, welke procedure, welk risico? | Juristen |
| **3. Ruimtelijk** | Overlapt de aanvraag met bestaande objecten of bestemmingen? | Landmeters / planners |
| **4. Sociaal / FPIC** | Welke gemeenschap is betrokken? Is consultatie/FPIC nodig? | Werkgroep / ITP-stakeholders |
| **5. Beleid** | Wat zegt dit over patronen — hotspots, ontbrekende registratie, demarcatieprioriteiten? | President / werkgroep |

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
```

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
