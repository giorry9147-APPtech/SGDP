# 17 — Milieu, NMA en MEA/SEA/MER

> Milieu- en ruimtelijke sensitiviteit zijn **geen optionele bijlage** bij grondzaken in Suriname; ze zijn een **workflowtrigger**. Dit document beschrijft de Milieu Raamwet-aansluiting van het SGDP en hoe de NMA-rol ingebed wordt.

## 17.1 Wettelijke basis

De **Milieu Raamwet** vestigt de **Nationale Milieu Autoriteit (NMA)** en geeft haar onder meer:

- bevoegdheid voor milieubeleid en informatie-uitwisseling;
- een **milieueffectanalysesysteem (MEA)**;
- de regel dat activiteiten met MEA-plicht **niet mogen starten** vóór het MER door de NMA is goedgekeurd;
- **SEA** voor overheidsplannen en -programma's;
- een **publiek register van milieuvergunningen en ontheffingen**;
- een **nationaal register van verontreinigde gebieden**;
- procedurele bevoegdheden bij **rehabilitatie en rampenbestrijdingsplannen**.

De NMA is **sinds juli 2024 officieel gelanceerd**.

Daarnaast eist het **IACHR — Kaliña en Lokono-arrest (2015)** participatie in natuurreservaten en rehabilitatie van aangetast traditioneel gebied.

## 17.2 Plaats in het platform

De milieumotor is een **eersterangs werkstroom** in de adviesmotor en een eersterangs reviewer-rol in de workflow. Hij staat naast de juridische, ruimtelijke en sociaal/FPIC-werkstromen.

```
   Aanvraag / activiteit
            │
            ▼
   ┌─────────────────────┐
   │ Trigger-evaluatie   │   (regelgebaseerd)
   └─────┬───────────────┘
         │
   ┌─────┴───────────────────────────────────┐
   │ MEA-plicht?  SEA-plicht?  Reservaat?    │
   │ Verontreinigd gebied?  Rehabilitatie?   │
   └─────┬───────────────────────────────────┘
         │ ja
         ▼
   ┌─────────────────────┐
   │ NMA-reviewtaak      │
   │ (rol: NMA reviewer) │
   └─────┬───────────────┘
         │
         ▼
   ┌─────────────────────┐
   │ Hard blocker tot    │
   │ MER-goedkeuring     │
   └─────────────────────┘
```

## 17.3 Triggers (samenvatting)

| Trigger | Bron | Systeemactie |
|---|---|---|
| Aanvraag binnen of nabij **beschermd gebied** | Beschermde-gebiedlaag | NMA-reviewtaak; **hard blocker** finale beschikking |
| Activiteit met **MEA-plicht** | Activiteitscategorie + Milieu Raamwet | Vereist `MER_status = goedgekeurd` voor besluit |
| **SEA**-plichtig overheidsplan | Plantype | Aparte SEA-werkstroom; verbinden aan plandossier |
| Aanvraag in **verontreinigd gebied** | Nationaal register verontreinigde gebieden | Aanvullende voorwaarden; mogelijke rehabilitatie-eis |
| Wijziging van bestaande vergunning met milieugevolgen | Vergunningenregister | Heropen MEA / aanpassing voorwaarden |
| Ramp- of incidentmelding raakt grondzaak | Rampenplan | Spoedoverleg-flag op zaak |

## 17.4 Datamodel-uitbreidingen

### 17.4.1 `EnvCase` (milieu-zaak)
| Veld | Type |
|---|---|
| env_case_id | UUID |
| linked_case_id | UUID (FK naar `application_case`) |
| trigger_type | enum (`mea`, `sea`, `protected_overlap`, `contaminated_overlap`, `permit_change`, `rehab`) |
| status | enum (`screening`, `mea_required`, `mer_in_review`, `approved`, `rejected`, `conditional`, `not_required`) |
| nma_reviewer_id | UUID |
| start_date, decision_date | date |
| conditions | text |
| evidence_set | json (source_id's) |

### 17.4.2 `EnvPermit` (vergunning)
| Veld | Type |
|---|---|
| permit_id | UUID |
| permit_type | enum |
| holder_party_id | UUID |
| spatial_unit_id | UUID |
| valid_from, valid_to | date |
| conditions | text |
| public_register_ref | string |

### 17.4.3 `ContaminatedSite`
| Veld | Type |
|---|---|
| site_id | UUID |
| geometry | geometry |
| contamination_type | enum |
| severity | enum |
| listed_in_register_at | date |
| rehabilitation_status | enum (`none`, `planned`, `in_progress`, `completed`) |

### 17.4.4 `RehabPlan`
| Veld | Type |
|---|---|
| rehab_id | UUID |
| linked_site_id of linked_spatial_unit_id | UUID |
| trigger | enum (`court_order`, `permit_condition`, `voluntary`, `iachr_kaliña_obligation`) |
| milestones | json |
| funding | text |
| responsible_party | UUID |

## 17.5 NMA-reviewer rol (RBAC + ABAC)

| Recht | Toegang |
|---|---|
| Lezen | Geometrie, MEA/SEA/MER-info, beschermde gebieden, vergunningenregister, gekoppelde dossiers |
| Schrijven | Milieu-advies, voorwaarden, status `EnvCase` |
| Beslissen | Goedkeuring / afwijzing / voorwaarden op milieutoets |
| Niet zichtbaar | FPIC-restricted documenten (tenzij expliciet gedeeld) |

## 17.6 Adviesmotor-regels (samenvatting)

Aanvulling op [10-adviesmotor.md](10-adviesmotor.md):

```yaml
- id: R-ENV-010
  category: ruimtelijk
  description: Aanvraag in beschermd gebied
  when:
    inside: "protected_area"
  finding: "Aanvraag ligt binnen beschermd gebied {area_name}. NMA-review verplicht."
  weight: high
  blocks_decision: true

- id: R-ENV-020
  category: juridisch
  description: MEA-plicht maar geen MER-status
  when:
    mea_required: true
    mer_status: "absent"
  finding: "Activiteit MEA-plichtig; MER ontbreekt. Geen besluit zonder NMA-goedkeuring."
  weight: high
  blocks_decision: true

- id: R-ENV-030
  category: juridisch
  description: Locatie in nationaal register verontreinigde gebieden
  when:
    inside: "contaminated_site"
  finding: "Locatie staat in register verontreinigde gebieden. Aanvullende voorwaarden + mogelijk rehabilitatieplan vereist."
  weight: medium

- id: R-ENV-040
  category: sociaal
  description: Reservaat overlapt traditioneel gebruikt gebied (Kaliña-Lokono)
  when:
    inside: "protected_area"
    overlaps_with: "customary_territory"
  finding: "Reservaat overlapt traditioneel gebied. Toegang/gebruik en effectieve participatie waarborgen."
  weight: high
  triggers: "fpic_required"
```

## 17.7 Workflow MEA / SEA / MER

```
 1. Screening              → bepaal MEA-plicht (regelmatrix)
 2. Indien MEA-plichtig    → ScopingDocument vereist
 3. MER opstellen          → opdrachtnemer levert; NMA review
 4. NMA-besluit            → goedgekeurd / voorwaardelijk / afgewezen
 5. Voorwaarden in zaak    → opgenomen als beschikkingsvoorwaarden
 6. Monitoring             → periodieke compliance-checks
 7. Bij wijziging scope    → heropen MEA-spoor (vergelijkbaar met FPIC §11.3 stap 9)
```

## 17.8 Rehabilitatie en rampenbestrijding

- **Rehabilitatieplan** koppelt aan een vervuilde locatie of aan een uitspraak (bv. IACHR Kaliña-Lokono).
- **Mijlpalen** met deadlines en verantwoordelijke partij; voortgang zichtbaar op admin-dashboard ([03](03-werkgroep-dashboard.md)).
- **Rampenmelding** zet de zaak in `spoed`-status; escalatie naar voorzitter werkgroep en NMA.

## 17.9 Demo-omvang

In de demo aanwezig:

- Mock-laag van **2 beschermde gebieden** en **1 verontreinigd gebied**.
- Statische MEA-plichtmatrix voor 5 activiteitstypes.
- Adviesregels R-ENV-010, R-ENV-020 actief als hard blockers.
- NMA-reviewer rol met read/write op gemockt `EnvCase`.

Roadmap (later):
- Echte koppeling NMA-vergunningenregister.
- Rehabilitatiemonitor met dashboard.
- SEA-werkstroom voor overheidsplannen.
- Integratie met rampenmeldingen.
