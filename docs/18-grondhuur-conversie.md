# 18 — Grondhuur, Verlenging, Conversie en Vervallenverklaring

> Deze module dekt de **levenscyclus van rechten ná uitgifte**: grondhuur, verlenging, conversie naar nieuw recht, vervallenverklaring en compensatie. Dit ontbrak in de eerdere modules en is voor Suriname een dagelijkse praktijk-realiteit.

## 18.1 Wettelijke basis

| Bron | Bepaling |
|---|---|
| **Decreet Uitgifte Domeingrond** | Grondhuur is een **zakelijk recht** met een **jaarlijkse vergoeding**; duur **minimaal 15 en maximaal 40 jaar** |
| **Decreet Uitgifte Domeingrond** | Verlengingsverzoek **uiterlijk 6 maanden voor afloop** |
| **Besluit Grondconversie 2023** (S.B. 2023 nr. 159) | Conversiekaart met PERCEELSID, hypothecair uittreksel, betalingsbewijs |
| **Besluit GLIS 2025** | Verplichte velden bij inschrijving van conversie/verlenging-stukken |
| **Grondwet art. 34** | Schadeloosstelling bij vervallen of onteigening |

## 18.2 Grondhuur — basismodel

| Veld | Toelichting |
|---|---|
| `tenure_id` | Unieke ID |
| `holder_party_id` | Houder van het recht |
| `parcel_id` / `perceelsid` | Verplicht (zie [15 §15.1](15-juridisch-kader.md)) |
| `start_date`, `end_date` | Looptijd (15–40 jaar) |
| `annual_fee_amount`, `annual_fee_currency` | Jaarlijkse vergoeding |
| `purpose` | Doelbinding (bebouwing/bewoning, landbouw, industrie, etc.) |
| `payment_status` | Lopend / achterstand / voldaan |
| `last_paid_at`, `arrears_amount` | Voor blokkades |
| `restrictions` | Beperkingen / voorwaarden |
| `linked_decision_id` | Beschikking |
| `status` | `active`, `expiring`, `in_renewal`, `in_conversion`, `expired`, `forfeited` |

## 18.3 Levenscyclus en automatische reminders

```
   uitgifte ──► active ──► expiring ──► verlenging? ──► in_renewal ──► active (verlengd)
                                          │                                  │
                                          │ nee                              │ nee/afgewezen
                                          ▼                                  ▼
                                       expired                          expiring/expired
                                                                            │
                                                                            ▼
                                                                 vervallenverklaring?
                                                                            │
                                                                            ▼
                                                                       forfeited
```

| Tijdstip | Actie systeem |
|---|---|
| `end_date - 12 mnd` | Reminder aan houder, GBB-officer en MI-GLIS |
| `end_date - 9 mnd` | Tweede reminder; status → `expiring` |
| `end_date - 6 mnd` | **Wettelijke deadline** — laatste moment verlengingsverzoek; rode flag op dashboard |
| `end_date` | Indien geen verlenging: status → `expired` |
| Bij achterstand of ontbrekend hypothecair uittreksel | **Blokkade** verlenging tot opgelost |

## 18.4 Verlenging (workflow)

| Stap | Validatie |
|---|---|
| 1. Verzoek tot verlenging | Verzoek ingediend ≥ 6 maanden voor `end_date`? |
| 2. Document-check | Hypothecair uittreksel, betalingsbewijs, uitmetingskaart met PERCEELSID |
| 3. Achterstanden-check | `arrears_amount = 0` |
| 4. Overlap-/conflictanalyse | Conform [10-adviesmotor.md](10-adviesmotor.md) |
| 5. FPIC-check | Indien overlap met traditioneel gebied: heropen FPIC ([11 §11.3](11-fpic-stakeholders.md)) |
| 6. Milieu-check | Indien activiteit gewijzigd: NMA-review ([17](17-milieu-nma.md)) |
| 7. Beschikking | Verleng; nieuwe `end_date`; nieuw `tenure_id` of versie |
| 8. MI-GLIS-inschrijving | Stuk inschrijven conform Besluit GLIS 2025 |

## 18.5 Conversie (Besluit Grondconversie 2023)

Conversie zet een bestaand recht (bv. grondhuur) om in een nieuw recht (bv. eigendom) onder voorwaarden.

### 18.5.1 Verplichte stukken
- Kaart met **PERCEELSID** (uitmetingskaart actueel).
- **Hypothecair uittreksel** (recent).
- **Betalingsbewijs** (leges, achterstand voldaan).
- Identiteits- en partijgegevens conform Besluit GLIS 2025.

### 18.5.2 Conversie-case
| Veld | Toelichting |
|---|---|
| `conversion_id` | |
| `from_tenure_id` | Bron-recht |
| `to_rrr_type` | Nieuw rechttype |
| `motivation` | |
| `decision_status` | aangevraagd / in onderzoek / goedgekeurd / afgewezen / voorwaardelijk |
| `conditions` | Bijvoorbeeld: nazorgperiode, beperkingen, betaling restschuld |
| `linked_documents` | Kaart, uittreksel, betalingsbewijs, beschikking |

### 18.5.3 Validatieregels (samenvatting)
```yaml
- id: R-CONV-001
  description: Conversie zonder PERCEELSID-kaart
  when: { conversion_request: true, missing: ["perceelsid_map"] }
  finding: "Conversie kan niet doorgaan: PERCEELSID-kaart ontbreekt."
  weight: high
  blocks_decision: true

- id: R-CONV-002
  description: Conversie zonder hypothecair uittreksel
  when: { conversion_request: true, missing: ["mortgage_extract"] }
  finding: "Hypothecair uittreksel ontbreekt."
  weight: high
  blocks_decision: true

- id: R-CONV-003
  description: Achterstanden niet voldaan
  when: { conversion_request: true, arrears_amount: ">0" }
  finding: "Openstaande achterstanden moeten worden voldaan vóór conversie."
  weight: high
  blocks_decision: true

- id: R-CONV-010
  description: Conversie van recht in traditioneel gebied
  when: { conversion_request: true, overlaps_with: "customary_territory" }
  finding: "Conversie raakt traditioneel woon- en leefgebied. FPIC-procedure heropenen."
  weight: high
  triggers: "fpic_required"
```

## 18.6 Vervallenverklaring (forfeiture)

Een recht kan vervallen door (onder andere):

| Grond | Bron |
|---|---|
| Niet-voldoen aan voorwaarden of doelbinding | Decreet + beschikkingsvoorwaarden |
| Achterstanden in jaarlijkse vergoeding | Decreet |
| Gebruik in strijd met milieuwetgeving | Milieu Raamwet |
| Ernstige inbreuk op rechten van derden / collectieve rechten | IACHR-arresten |

### 18.6.1 Workflow
1. **Signalering** door systeem (achterstand, niet-naleving) of melding (klacht/derden).
2. **Hoor en wederhoor** van de houder; termijn herstel.
3. **Voornemen tot vervallen** met motivatie.
4. **Bezwaarperiode** + eventuele rechtsbeschermingsroute.
5. **Beschikking vervallenverklaring**.
6. **Schadeloosstelling-spoor** (Grondwet art. 34) waar toepasselijk.
7. **Inschrijving** mutatie bij MI-GLIS; perceel weer beschikbaar voor uitgifte na vrijgave.

### 18.6.2 Statussen
`active` → `notice_of_intent` → `objection_window` → `decision_pending` → `forfeited` of `restored`.

## 18.7 Compensatie en schadeloosstelling

| Trigger | Module-actie |
|---|---|
| Vervallenverklaring | Compensatieberekening; betalingsspoor |
| Onteigening (algemeen belang) | Aparte case-type met taxatie en uitbetaling |
| IACHR-rehabilitatieplicht | Linked aan `RehabPlan` ([17 §17.4.4](17-milieu-nma.md#1744-rehabplan)) |
| Schade door overheidshandelen | Klacht/grievance ([11](11-fpic-stakeholders.md)) |

Compensatiecase houdt bij: berekeningsmethode, taxatie, betalingsstatus, geschillen.

## 18.8 Dashboard-indicatoren

Voor GBB / Domeinkantoor:

- Aantal grondhuur-rechten dat in de **komende 12 / 9 / 6 maanden** afloopt.
- Achterstandsbedrag totaal.
- Conversie-cases per status.
- Vervallenverklaringen per kwartaal.
- Compensatie uitstaand vs. uitbetaald.

Voor de werkgroep:
- Hoeveel verlengingen zijn potentieel **FPIC-relevant** (overlap met traditioneel gebied)?
- Hoeveel conversies hebben milieu-implicaties?

## 18.9 Demo-omvang

- Levenscyclusvelden in datamodel + reminders 12/9/6.
- 1 conversie-voorbeeld in dataset.
- 1 vervallenverklaring-voorbeeld.
- Adviesregels R-CONV-001/002/003/010 actief.
- Compensatieworkflow als stub (zonder echte uitbetaling).

Roadmap:
- Geautomatiseerde betaalkoppeling.
- Geïntegreerde taxatie/CAMA voor compensatie.
- Volledige sjablonenbibliotheek voor beschikkingen en kennisgevingen.
