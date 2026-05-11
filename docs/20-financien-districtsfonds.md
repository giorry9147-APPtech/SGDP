# 20 — Financiën, Districtsfonds en Eigen Middelen

> Dit document beschrijft hoe SGDP de **financiële verzelfstandiging** van de tien districten ondersteunt: welke inkomsten- en uitgavestromen worden vastgelegd, hoe het Districtsfonds gemodelleerd wordt, hoe Level-2-certificering wordt getrackt en hoe de Algemene Afdracht geleidelijk wordt afgebouwd. Het is de financiële tegenhanger van [docs/19-wro-decentralisatie.md](19-wro-decentralisatie.md).

## 20.1 Probleem

De WRO 1989 voorziet bepalingen voor regionale belastingen, maar deze zijn in de praktijk niet uitvoerbaar gebleken door:

- Tegenstrijdigheden met de **Comptabiliteitswet** (centrale begrotingsdiscipline);
- Het niet volledig overdragen van inkomstenbronnen uit de **Interimregeling Financiële Decentralisatie (2003)** naar de Districtsfondsen;
- Ontbreken van administratieve en technische capaciteit in districten (Level-2-vereiste);
- Geen geïntegreerd zicht op wat een district *zou* moeten ontvangen versus wat het *daadwerkelijk* ontvangt.

SGDP lost dit niet op door zelf geld te verdelen, maar door **transparantie en regelgebaseerde simulatie** te bieden waarmee de werkgroep, de DR's en het Ministerie van Financiën gefundeerde beslissingen kunnen voorbereiden.

## 20.2 Het Districtsfonds — kernconcept

Per district één `DistrictFund`, per begrotingsjaar. Bestaat uit drie pijlers:

```
           ┌─────────────────────────────────────┐
           │       DistrictsFonds District X     │
           │           Begrotingsjaar Y          │
           └──────────────┬──────────────────────┘
                          │
        ┌─────────────────┼─────────────────────────┐
        ▼                 ▼                         ▼
 ┌────────────┐    ┌──────────────┐         ┌───────────────┐
 │  Eigen     │    │  Algemene    │         │  Doelafdracht │
 │  Middelen  │    │  Afdracht    │         │  / projecten  │
 │            │    │  (centraal)  │         │  (centraal)   │
 └─────┬──────┘    └──────┬───────┘         └───────┬───────┘
       │                  │                         │
       ▼                  ▼                         ▼
 - huurwaarde-     - afnemend naar             - specifieke
   belasting          mate eigen                  projecten,
 - vermakelijk-       middelen stijgen            geoormerkt
   heidsbelasting
 - leges
 - marktgelden
 - parkeergelden
 - concessie-royalty
 - grondhuur
```

## 20.3 Inkomstencategorieën — `RevenueSource.revenue_type`

Conform Interimregeling Financiële Decentralisatie en WRO-wijzigingen:

### 20.3.1 Belastingmiddelen (rechtstreeks naar DistrictsFonds)
| Type | Grondslag | Bron |
|---|---|---|
| `huurwaardebelasting` | Belasting op gebouwen | Interimregeling 2003 |
| `vermakelijkheidsbelasting` | Publieke evenementen | Interimregeling 2003 |

### 20.3.2 Leges en rechten
| Type | Grondslag | Bron |
|---|---|---|
| `leges_vergunning` | Lokale vergunningen | Districtsverordening (WRO) |
| `leges_uittreksel` | Uittreksels, afschriften | Districtsverordening (WRO) |
| `leges_grondaanvraag_administratief` | Districtsdeel bij grondaanvraagverwerking | Decreet Domeingrond + districtsverordening |

### 20.3.3 Niet-belastingmiddelen
| Type | Grondslag |
|---|---|
| `marktgeld` | Lokale markten |
| `parkeergeld` | Openbare parkeervoorzieningen |
| `staatslogeergebouw` | Verhuur districtsgebouwen |

### 20.3.4 Natuurlijke hulpbronnen — *werkgroep-kernpunt*
| Type | Grondslag |
|---|---|
| `concessie_royalty_mijnbouw` | Aandeel mijnbouwopbrengst |
| `concessie_royalty_hout` | Aandeel houtkapopbrengst |
| `concessie_royalty_landbouw` | Aandeel landbouwconcessie |
| `grondhuur_aandeel` | Districtsaandeel in grondhuurinkomsten |
| `itp_royalty_aandeel` | Aandeel dat naar ITP-gemeenschap binnen district vloeit (zie [21](21-koppeling-grond-fondsen.md)) |

Volledige verdelingslogica in [docs/21-koppeling-grond-fondsen.md](21-koppeling-grond-fondsen.md).

## 20.4 Datamodel — `DistrictFund` en `RevenueSource`

Toegevoegd aan [docs/08-data-model.md §8.8](08-data-model.md):

### 20.4.1 `DistrictFund`
| Veld | Type | Toelichting |
|---|---|---|
| `fund_id` | UUID | |
| `district_admin_id` | FK → `AdministrativeUnit` | Eén district |
| `fiscal_year` | int | Bv. 2026 |
| `algemene_afdracht_amount` | numeric | Centrale toewijzing |
| `eigen_inkomsten_amount` | numeric | Som van `RevenueSource.amount` |
| `uitgaven_amount` | numeric | Som van `Expenditure.amount` |
| `saldo` | numeric | Berekend |
| `status` | enum (`concept`, `goedgekeurd_dr`, `goedgekeurd_minfin`, `definitief`, `afgesloten`) | Begrotingsstatus |
| `audit_ready` | bool | Voldoet aan IACHR/rekenkamer-eisen |

### 20.4.2 `RevenueSource`
| Veld | Type | Toelichting |
|---|---|---|
| `revenue_id` | UUID | |
| `fund_id` | FK | |
| `revenue_type` | enum | Zie §20.3 |
| `period_start`, `period_end` | date | |
| `amount` | numeric | |
| `currency` | string | Default SRD |
| `linked_rrr_id` | FK (optioneel) | Recht waaruit opbrengst voortvloeit (concessie, grondhuur) |
| `linked_spatial_unit_id` | FK (optioneel) | Spatial unit waaruit opbrengst voortvloeit |
| `linked_case_id` | FK (optioneel) | Dossier dat de bron is |
| `source_document_id` | FK → `LA_Source` | Onderliggend brondocument (aanslag, beschikking) |
| `derived_by_rule` | string | Welke regel uit `BF-01..06` deze verdeling gegenereerd heeft |

### 20.4.3 `Expenditure`
| Veld | Type | Toelichting |
|---|---|---|
| `exp_id` | UUID | |
| `fund_id` | FK | |
| `category` | enum (`infrastructuur`, `onderhoud`, `salarissen`, `consultatie`, `civieltechnisch`, `sociaal`, `overig`) | |
| `amount` | numeric | |
| `dr_decision_id` | FK → `RegionalDecision` (optioneel) | DR-besluit dat uitgave goedkeurt |
| `competence_id` | FK → `Competence` | Welke bevoegdheid dekt de uitgave |

## 20.5 Level-2-certificering

Een district mag eigen begrotingsverantwoordelijkheid voeren zodra het Level-2 is gecertificeerd. SGDP registreert dit per district:

```yaml
administrative_unit:
  admin_type: district
  level2_certified: true|false
  level2_date: 2024-09-12
  level2_assessment_uri: source_id_NNN
  level2_capabilities:
    - own_budget_management
    - own_project_execution
    - own_civil_engineering_service
    - own_tax_collection            # afhankelijk van wetsregime
```

Regel `BF-02` blokkeert het vaststellen van eigen tarieven door districten zonder Level-2-status.

## 20.6 Algemene Afdracht — overgangsfase

Tijdens de overgang naar volledige financiële autonomie blijft de centrale overheid bijdragen via Algemene Afdracht. SGDP modelleert dit als **afnemende reeks**:

```
amount_afdracht(district, jaar) =
    baseline(district)
    × (1 - voortgang_eigen_inkomsten(district, jaar))
    × overgangsfactor(jaar)
```

Waarbij `voortgang_eigen_inkomsten` = `eigen_inkomsten_amount` / `target_eigen_inkomsten`.

Beleidsdoel: na X jaar nadert de Algemene Afdracht 0 voor districten die hun targets halen. Voor demo: **alle cijfers fictief**, formule is uitlegbaar.

## 20.7 Conflict met de Comptabiliteitswet

> Centrale begrotingsdiscipline (Comptabiliteitswet) versus districts-eigen begrotingsbevoegdheid (WRO + financiële autonomie-wetten) is een **bekend juridisch knelpunt**.

SGDP-aanpak:

- Regel `BF-04` detecteert tegenstrijdigheden tussen een voorgestelde districtsverordening en centrale begrotingsdiscipline op basis van expliciete artikelverwijzingen (`LegalProvision`).
- Output is **bevinding**, geen beslissing — een jurist toetst.
- Conflictmelding wordt opgenomen in adviesrapport categorie 6 (Bestuurlijk-financieel) en in audit log.

Configuratie:

```yaml
conflict_check:
  comptabiliteitswet:
    block_central_budget_overrun: true
    require_minfin_review_above: 5_000_000_SRD
  wro:
    allow_local_tarif_if: ["level2_certified", "dr_resolution", "no_central_conflict"]
```

## 20.8 Adviesregels — financieel

Volledige YAML in [docs/10-adviesmotor.md §10.5](10-adviesmotor.md). Hier de operationele kern:

| Regel-ID | Trigger | Output |
|---|---|---|
| `BF-01` Districtsopbrengst-verplicht | Concessie of grondhuur geregistreerd in spatial unit gelegen in district X | Bevinding: "Y% van opbrengst dient naar `DistrictFund` district X volgens Interimregeling art. Z" |
| `BF-02` Level-2-blokker | Districtsverordening met eigen tarief, district niet Level-2 | Hard blocker: tarief niet rechtsgeldig tot certificering |
| `BF-04` Comptabiliteitswet-conflict | Begrotingspost overschrijdt centrale richtlijn of mist Min. Fin.-akkoord boven drempel | Bevinding: review Min. Fin. vereist |
| `BF-05` Bevoegdheidsoverschrijding | DR-/RR-besluit zonder dekkende `Competence` | Hard blocker tot competentie geverifieerd |

## 20.9 District-portaal (UI-blok in demo)

Per district:

```
┌─ District Sipaliwini ───────────────────────────────────┐
│  Level-2 status: ✓ Gecertificeerd sinds 2024-09-12      │
│                                                         │
│  Fonds 2026  (DEMO-cijfers)                             │
│  ├─ Eigen inkomsten        SRD 12.450.000  ▲ 18%        │
│  ├─ Algemene afdracht      SRD 28.000.000  ▼  9%        │
│  ├─ Doelafdrachten         SRD  4.200.000                │
│  └─ Saldo                  SRD  +1.840.000               │
│                                                         │
│  Inkomstenboom — top 5 bronnen                          │
│   1. Concessie-royalty mijnbouw    SRD 6.100.000        │
│   2. Grondhuur-aandeel             SRD 2.800.000        │
│   3. Huurwaardebelasting           SRD 1.450.000        │
│   4. Leges vergunningen            SRD   980.000        │
│   5. Marktgelden                   SRD   620.000        │
│                                                         │
│  Openstaande DR-besluiten: 3                            │
│  Lopende grond-/concessie-zaken: 17                     │
│  ITP-gemeenschappen in district: 12                     │
└─────────────────────────────────────────────────────────┘
```

Voor de demo: alle bedragen **fictief en als `DEMO_…` gelabeld**.

## 20.10 Demo-afbakening

In demo ([docs/07](07-mvp-demo-scope.md)):

- District-portaal met 3 demo-districten en fictieve fondsdata;
- Inkomstencategorieën zichtbaar in dropdowns/filters;
- Adviesregels `BF-01`, `BF-02` actief (zonder echte fiscale data);
- Level-2-attribuut zichtbaar per district.

Niet in demo (roadmap):

- Daadwerkelijke koppeling met fiscale systemen of grootboek;
- Goedkeuringsworkflow districtsbegroting;
- Geconsolideerde rapportage Min. Fin.;
- Burgerportaal "wat doet mijn districtsfonds";
- Fiscaal-simulator.

## 20.11 Relatie met andere docs

| Verbinding | Naar |
|---|---|
| Juridische en bestuurlijke basis | [docs/19-wro-decentralisatie.md](19-wro-decentralisatie.md) |
| Koppeling grond → fondsen (verdeelregels) | [docs/21-koppeling-grond-fondsen.md](21-koppeling-grond-fondsen.md) |
| Datamodel-entiteiten | [docs/08-data-model.md §8.8](08-data-model.md) |
| Adviesregels BF-01…06 | [docs/10-adviesmotor.md §10.5](10-adviesmotor.md) |
| Roadmap | [docs/13-roadmap.md](13-roadmap.md) |
