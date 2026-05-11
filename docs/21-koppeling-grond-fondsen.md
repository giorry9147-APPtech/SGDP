# 21 — Koppeling Grondenrechten ↔ Districtsfondsen ↔ ITP-Royalties

> Dit document beschrijft het **kernpunt van het werkgroep-mandaat van Dikan**: het rechtvaardig koppelen van de exploitatie van natuurlijke hulpbronnen op een stuk grond aan de financiële stromen die daaruit voortvloeien — naar de centrale staat, naar het district, en naar de ITP-gemeenschap wier traditionele woon- en leefgebied het betreft.

Dit document combineert het grondenrechten-spoor ([docs/15](15-juridisch-kader.md), [11](11-fpic-stakeholders.md)) en het decentralisatie-spoor ([docs/19](19-wro-decentralisatie.md), [20](20-financien-districtsfonds.md)).

## 21.1 Het probleem in één zin

> *Een houtkapconcessie levert vandaag inkomsten op aan de centrale staat. Het district waar de concessie ligt en de ITP-gemeenschap wier traditioneel leefgebied wordt aangetast, zien daar nauwelijks iets van terug. Dat is politiek, juridisch (IACHR Saramaka) en bestuurlijk (decentralisatie-mandaat) onhoudbaar.*

SGDP corrigeert dit niet door zelf geld te verdelen, maar door **traceerbaarheid en regelgebaseerde voorstellen** te leveren die de werkgroep, het ministerie van Financiën en de ITP-koepels een gemeenschappelijk feitenbeeld geven.

## 21.2 De drie geldstromen

```
                     CONCESSIE / GRONDHUUR / VERGUNNING
                     in spatial_unit S, gelegen in district D,
                     overlappend met customary_territory T
                                       │
                                       │ opbrengst totaal
                                       ▼
                     ┌─────────────────────────────────────┐
                     │   Revenue-allocatie (regelmotor)    │
                     │   BF-01 (district) + BF-06 (ITP)    │
                     └────────┬──────────┬─────────┬───────┘
                              │          │         │
                       ┌──────▼───┐  ┌───▼─────┐ ┌─▼──────────────┐
                       │ Centrale │  │ District│ │ ITP-gemeenschap │
                       │  Staat   │  │  Fonds  │ │   Royalty        │
                       │  (rest)  │  │  van D  │ │   (gemeenschap T)│
                       └──────────┘  └─────────┘ └─────────────────┘
```

## 21.3 Verdeelmodel — vier scenario's

Verdeelpercentages zijn **regelgedreven en wettelijk te onderbouwen**, niet hardcoded. SGDP biedt vier scenario's als rekenmodel; finale percentages worden bij wet vastgesteld.

| Scenario | Spatial unit ligt in | Aandeel centraal | Aandeel district | Aandeel ITP | Bron-regel |
|---|---|---|---|---|---|
| **A. Geen ITP-overlap, geen beschermd gebied** | Regulier district, geen `customary_territory` | Hoog (bv. 70%) | Beperkt (bv. 30%) | 0 | `BF-01` |
| **B. ITP-overlap, lage intensiteit** | Buffer rond customary territory of beperkt gebruik | Midden (bv. 50%) | Midden (bv. 30%) | Laag (bv. 20%) | `BF-01` + `BF-06` |
| **C. Volledig in customary_territory** | Volledig in ITP-leefgebied | Laag (bv. 20%) | Midden (bv. 30%) | Hoog (bv. 50%) | `BF-01` + `BF-06` + IACHR Saramaka |
| **D. Beschermd gebied + ITP** | Overlap met `protected_area` én `customary_territory` | Beperkt (NMA-aandeel) | Beperkt | Hoog | `BF-01` + `BF-06` + Milieu Raamwet |

> **Belangrijk.** Percentages in tabel zijn **illustratief voor demo**. Politieke vaststelling gebeurt via de twee aanstaande conceptwetten (DC-ontkoppeling en Financiële Autonomie) en de ontwerpwet Collectieve Rechten ITP.

## 21.4 Regel `BF-06` — ITP-royalty-koppeling (volledige uitwerking)

```yaml
- id: BF-06
  category: bestuurlijk-financieel
  description: Opbrengstaandeel naar ITP-gemeenschap bij exploitatie op customary_territory
  when:
    rrr_type_in: ["concession_mining", "concession_forestry", "concession_agriculture", "lease_grondhuur"]
    overlap_with: "customary_territory"
    overlap_pct: ">0"
  evaluate:
    - resolve_community_from: customary_territory.community_id
    - apply_scenario:
        A: overlap_pct == 0
        B: overlap_pct > 0  and overlap_pct <= 25
        C: overlap_pct > 25 and overlap_pct <= 100
        D: also_inside protected_area
  finding: >
    Aanvraag {case_id} overlapt voor {pct}% met traditioneel woon- en leefgebied
    van gemeenschap {community_name}. Volgens scenario {scenario} geldt het volgende
    voorgestelde verdeelmodel: centraal {pct_centraal}%, district {district_name}
    {pct_district}%, gemeenschap {pct_itp}%. Definitieve verdeling vereist FPIC-traject
    en wettelijke bekrachtiging.
  weight: high
  triggers: ["fpic_required", "benefit_sharing_register"]
  legal_basis:
    - IACHR_Saramaka_2007
    - WRO_Interimregeling_2003
    - Ontwerpwet_Collectieve_Rechten_ITP
```

## 21.5 Datamodel — `BenefitShare` (nieuwe entiteit)

Per concessie/grondhuur waarbij `BF-06` triggert, wordt een `BenefitShare`-record aangemaakt:

| Veld | Type | Toelichting |
|---|---|---|
| `share_id` | UUID | |
| `linked_rrr_id` | FK | Concessie of grondhuur |
| `spatial_unit_id` | FK | Onderliggende spatial unit |
| `scenario` | enum (`A`, `B`, `C`, `D`) | Verdeelscenario |
| `pct_central` | numeric | |
| `pct_district` | numeric | |
| `pct_itp` | numeric | |
| `district_admin_id` | FK | District dat aandeel ontvangt |
| `community_id` | FK | ITP-gemeenschap die aandeel ontvangt |
| `fpic_id` | FK | Verbonden FPIC-traject |
| `proposed_at` | timestamp | |
| `ratified_by` | json | Bv. `["dna_resolution", "min_fin_decree", "community_consent"]` |
| `ratified_at` | timestamp | |
| `status` | enum (`proposed`, `under_fpic`, `agreed`, `ratified`, `disputed`, `withdrawn`) | |

Linkt aan:
- `FPIC_Process` — verdeling vereist FPIC-instemming;
- `DistrictFund.revenue_sources` — districtsaandeel landt hier;
- `LA_Source` — onderliggende besluiten en consultatieverslagen.

## 21.6 FPIC-toets voor royalty-verdeling

Conform IACHR Saramaka (2007) en FAO FPIC-toolkit ([§15.3 C10/C15](15-juridisch-kader.md)) is **benefit sharing een eersterangs FPIC-onderwerp**. SGDP vereist daarom:

| Stap | Verplichting | Platform-controle |
|---|---|---|
| 1. Voorstel verdeling | `BenefitShare.status = proposed` | Regelmotor genereert voorstel |
| 2. Informatie aan gemeenschap | Toegankelijke disclosure | `FPIC_Event` met `event_type = info_provided` en `evidence_set` |
| 3. Vertegenwoordiging verifiëren | Legitieme `representation_mandate` | Mandaattabel-check |
| 4. Consultatie | Minstens N sessies, lokaal | `FPIC_Event` met `meeting` |
| 5. Instemming, voorwaarden of bezwaar | `FPIC_Process.outcome` | State machine |
| 6. Bekrachtiging | Politiek + juridisch | `BenefitShare.ratified_by` json |
| 7. Vastlegging in fonds | Royalty naar gemeenschap én district | `RevenueSource` automatisch aangemaakt |
| 8. Periodieke audit | Wordt afspraak nageleefd? | Audit log + `RehabPlan`-achtige tracking |

Geen stap mag worden overgeslagen. Status van elke stap is transparant in het zaakdossier.

## 21.7 Voorbeeld — fictief, ter illustratie

**Casus.** Houtkapconcessie `DEMO_Concessie_07` van 12.000 ha in district Sipaliwini. Overlap-check rapporteert: 68% in `DEMO_CustomaryTerritory_Trio_03` (Trio-gemeenschap, vertegenwoordigd door `DEMO_RepMandate_044`).

**Regelmotor (10-adviesmotor.md):**

- `R-SOC-001` triggert: FPIC vereist;
- `BF-01` triggert: districtsaandeel verplicht;
- `BF-06` triggert: scenario **C** (>25% overlap met customary territory);
- Geen `protected_area`-overlap → niet scenario D.

**Voorstel `BenefitShare`:**

```yaml
share_id: BS_DEMO_07
linked_rrr_id: RRR_DEMO_Concessie_07
spatial_unit_id: SU_DEMO_Concessie_07
scenario: C
pct_central: 20
pct_district: 30   # → DistrictFund Sipaliwini
pct_itp: 50        # → community DEMO_Trio_03
district_admin_id: ADM_DEMO_Sipaliwini
community_id: COM_DEMO_Trio_03
fpic_id: FPIC_DEMO_07
status: proposed
```

**Adviesrapport categorie 6 (Bestuurlijk-financieel):**

> "De concessie `DEMO_Concessie_07` overlapt voor 68% met traditioneel woon- en leefgebied van DEMO_Trio_03. Volgens scenario C wordt het volgende verdeelmodel voorgesteld: centraal 20%, district Sipaliwini 30%, gemeenschap DEMO_Trio_03 50%. Definitieve verdeling vereist FPIC-traject (FPIC_DEMO_07, status: pending), DNA-bekrachtiging en consensus met traditioneel gezag van DEMO_Trio_03. (regels BF-01, BF-06, R-SOC-001 — bron IACHR Saramaka 2007, Interimregeling 2003)"

## 21.8 Anti-misbruik en transparantie

Risico's bij benefit sharing zijn bekend (capture door elite, intern conflict gemeenschap, achterkamertjesdeals). SGDP-mitigaties:

| Risico | Mitigatie |
|---|---|
| Eén persoon claimt namens hele gemeenschap | `representation_mandate` met einddatum + brondocument; FPIC-toolkit-controle |
| Verdeling wordt buiten audit gewijzigd | `BenefitShare.audit_trail` append-only, hash-keten |
| Onevenredige verdeling tussen gemeenschap en district zonder onderbouwing | Verdeling moet matchen met scenario uit `BF-06`; afwijking vereist motivatie + werkgroepbesluit |
| Belofte zonder uitvoering | Periodieke status `RevenueSource` per kwartaal; rode markering bij achterstand |
| Sacred sites worden ingezet als drukmiddel | `sensitivity_level = sacred` blokkeert publicatie locatie; consultatie via traditioneel gezag |
| Eenmalige uitkering in plaats van structureel | Verdeelmodel is **periodieke royalty**, geen lump sum (tenzij gemeenschap dit kiest) |

## 21.9 Demo-afbakening

In demo ([docs/07](07-mvp-demo-scope.md)):

- Eén concessie-demo-casus (`DEMO_Concessie_07`) met expliciete `BenefitShare`-uitwerking;
- Regels `BF-01` en `BF-06` actief in adviesmotor;
- Adviesrapport categorie 6 op één demo-zaak getoond;
- FPIC-traject vereist (status `pending`).

Niet in demo (roadmap):

- Daadwerkelijke uitbetaling of grootboekkoppeling;
- Periodieke royalty-monitoring met afwijkingssignalering;
- Geconsolideerde benefit-sharing rapportage nationaal;
- Internationale rapportage IACHR / VN-Habitat.

## 21.10 Roadmap-koppeling

| Fase | Onderdeel | Doel |
|---|---|---|
| **Fase 0 — Demo** | Eén casus met `BenefitShare` + verdeelvoorstel + FPIC-status | Aantonen dat koppeling werkt; werkgroep krijgt rekenmodel |
| **Fase 1 — Pilot** | Echte casus in pilot-district met daadwerkelijk FPIC-traject | Politieke en juridische lessen voor wetsvoorstel |
| **Fase 2 — Integraties** | Koppeling Min. Fin. en CBvS voor royalty-afdrachten | Geld stroomt traceerbaar |
| **Fase 3 — Burgerdiensten** | ITP-gemeenschap kan eigen royalty-stand zien | Transparantie tegen elite capture |
| **Fase 4 — Maturity** | Hash-verankerde benefit-keten + automatische periodieke rapportage IACHR | IACHR-bestendigheid |

## 21.11 Politiek-strategische winst

Dit document is bewust **politiek expliciet**:

- Voor **ITP-gemeenschappen**: zij krijgen een verifieerbaar mechanisme voor benefit sharing dat boven de tafel ligt, niet eronder.
- Voor **districten**: zij zien aantoonbaar dat exploitatie op hun grondgebied terugvloeit naar hun fonds.
- Voor de **centrale staat**: het verdeelmodel is regelgebaseerd, IACHR-toetsbaar en politiek verdedigbaar.
- Voor de **werkgroep Dikan**: dit document is een concrete invulling van de werkgroep-opdracht "grondenrechten + decentralisatie geïntegreerd adviseren aan de President".

## 21.12 Relatie met andere docs

| Verbinding | Naar |
|---|---|
| Grondenrechten juridisch kader | [docs/15-juridisch-kader.md](15-juridisch-kader.md) |
| FPIC-procedure | [docs/11-fpic-stakeholders.md](11-fpic-stakeholders.md) |
| Bestuurlijke structuur | [docs/19-wro-decentralisatie.md](19-wro-decentralisatie.md) |
| Financieel datamodel | [docs/20-financien-districtsfonds.md](20-financien-districtsfonds.md) |
| Adviesregels | [docs/10-adviesmotor.md §10.5](10-adviesmotor.md) |
| Datamodel | [docs/08-data-model.md §8.8](08-data-model.md) |
| Roadmap | [docs/13-roadmap.md](13-roadmap.md) |
