# 19 — Wet Regionale Organen & Decentralisatie

> Dit document operationaliseert het **tweede mandaatspoor van de Werkgroep Grondenrechten en Decentralisatie**: het bestuurlijk-financieel zelfstandig maken van de tien districten van Suriname, op basis van de Wet Regionale Organen (WRO) en aanverwante regelgeving. Het complementeert [docs/15-juridisch-kader.md](15-juridisch-kader.md), dat zich richt op het grondenrechten-spoor.

## 19.1 Doel en afbakening

De Werkgroep Dikan heeft twee onlosmakelijk verbonden opdrachten:

1. **Spoor I — Grondenrechten ITP**: erkenning en demarcatie collectieve rechten (uitgewerkt in [docs/04](04-platform-visie.md), [11](11-fpic-stakeholders.md), [15](15-juridisch-kader.md)).
2. **Spoor II — Decentralisatie**: alle tien districten financieel en bestuurlijk verzelfstandigen zodat zij **eigen middelen kunnen genereren zonder volledige afhankelijkheid van de centrale overheid** (dit document + [20-financien-districtsfonds.md](20-financien-districtsfonds.md) + [21-koppeling-grond-fondsen.md](21-koppeling-grond-fondsen.md)).

Tot nu toe lag de SGDP-documentatie zwaar op spoor I. Dit document corrigeert die onbalans op platform-niveau.

## 19.2 De Wet Regionale Organen — historische lijn

| Staatsblad | Jaar | Inhoud | Relevantie voor SGDP |
|---|---|---|---|
| **S.B. 1989 no. 44** | 1989 | Oorspronkelijke WRO: inrichting districten en ressorten, organen, bevoegdheden | Basis voor entiteit `AdministrativeUnit` en `RegionalBody` ([docs/08](08-data-model.md)) |
| S.B. 2000 no. 93 | 2000 | Schrappen verboden graden bloedverwantschap voor lidmaatschap regionale organen | Verkiesbaarheid-attributen in `RegionalBody.members[]` |
| S.B. 2002 no. 54 | 2002 | Representatietoelage Ressortraadsleden | Vergoedingsveld in `RegionalBody.members[]` |
| **S.B. 2005 no. 28** | 2005 | Wet 24 maart 2005: gelijktijdig functioneren regionale bestuursorganen + waterschappen; taakoverdracht naar andere publiekrechtelijke rechtspersonen | Co-existentie waterschap-laag in datamodel; mandaatscheiding |
| S.B. 2006 no. 134 | 2006 | Inrichting Districtsfonds en Districtsbegroting | Basis voor entiteit `DistrictFund` ([docs/20](20-financien-districtsfonds.md)) |
| S.B. 2015 no. 132 | 2015 | Technische aanpassing i.v.m. Wet Elektronische Uitgifte Staats- en Advertentieblad | Publicatie-attributen |
| **Ontwerp 2026 — A** | 2026 | DC-ontkoppeling: DC niet langer voorzitter Districtsraad | Nieuwe rol-attributen + audit op belangenconflict |
| **Ontwerp 2026 — B** | 2026 | Financiële Autonomie Districten | Inkomsten- en uitgavebevoegdheid in `RevenueSource` + `Competence` |
| Interimregeling | 2003 | Interimregeling Financiële Decentralisatie | Welke heffingen direct naar Districtsfonds vloeien ([docs/20](20-financien-districtsfonds.md)) |
| Comptabiliteitswet | doorlopend | Centrale begrotingsdiscipline | Conflict-/harmonisatieregels in adviesmotor (`BF-04`) |

> **Configuratieregel.** Conform [§15.1.3](15-juridisch-kader.md) worden deze wetregimes **niet hardcoded** in de software. Per zaak en per districtsfonds wordt het regime versioned vastgelegd (`legal_regime.wro_version`, `legal_regime.financiele_autonomie_version`).

## 19.3 Bestuurlijke structuur — drie organen

```
                    ┌────────────────────────┐
                    │    Centrale Overheid   │
                    │   (President · DNA)    │
                    └───────────┬────────────┘
                                │
              ┌─────────────────┴─────────────────┐
              │                                   │
              ▼                                   ▼
     ┌──────────────────┐               ┌──────────────────┐
     │ Districtscom-    │               │  Districtsraad   │
     │ missaris (DC)    │◄── tot 2026 ──│       (DR)       │
     │ "werkarm Pres."  │   voorzit.    │ volksvertegen-   │
     │ dagelijks best.  │               │ woordiging       │
     └────────┬─────────┘               └────────┬─────────┘
              │                                  │
              │            ┌─────────────────────┘
              │            │
              ▼            ▼
     ┌──────────────────────────────┐
     │   Ressortraad (RR) × 62      │
     │   directe bewonersbelangen   │
     │   toezicht uitvoering        │
     └──────────────────────────────┘
```

| Orgaan | Functie | SGDP-rol |
|---|---|---|
| **Districtscommissaris (DC)** | Werkarm van de President; voert dagelijks bestuur in district uit; vertegenwoordigt centraal beleid | Bestuurder + (tot wetswijziging) DR-voorzitter — dubbelfunctie wordt geflagd door regel `BF-03` |
| **Districtsraad (DR)** | Hoogste politiek-bestuurlijke orgaan district; volksvertegenwoordiging; bevoegd tot districtsverordeningen en goedkeuring begroting | Eigen voorzitter na DC-ontkoppelingswet; aparte werkruimte met agenda, notulen, besluiten — vergelijkbaar met werkgroep-werkruimte ([docs/02](02-werkgroep-werkwijze.md)) |
| **Ressortraad (RR)** | Hoogste orgaan ressort; toezicht op dagelijks bestuur ressort | Bewonersbelangen-kanaal; consultatiepartij voor lokale FPIC en grondzaken |

## 19.4 Datamodel-inpassing

Toegevoegd aan [docs/08-data-model.md §8.8](08-data-model.md) — bestuurlijke entiteiten:

| Entiteit | Sleutelvelden | Doel |
|---|---|---|
| `AdministrativeUnit` | `admin_id`, `admin_type` (`district`/`ressort`), `name`, `parent_admin_id`, `geometry`, `population`, `level2_certified`, `level2_date` | De 10 districten + 62 ressorten als geometrische én bestuurlijke entiteit. Elke `LA_SpatialUnit` "ligt in" een ressort, dat in een district |
| `RegionalBody` | `body_id`, `body_type` (`DR`/`RR`/`DC`), `admin_id`, `chairperson_party_id`, `members[]`, `term_start`, `term_end`, `wro_version_applicable` | Districtsraad, Ressortraad, DC als organen met samenstelling en zittingsperiode |
| `Competence` | `comp_id`, `body_type`, `competence_type` (`belastingheffing`/`vergunning`/`verordening`/`begroting`), `legal_basis_provision_id`, `valid_from`, `valid_to` | Wie mag wat onder welk wetregime |
| `LegalProvision` | `prov_id`, `wet` (`WRO`/`Interimregeling`/`Comptabiliteitswet`/`Decreet`), `staatsblad`, `artikel`, `tekst`, `valid_from`, `superseded_by` | Bronartikel waar elke bevoegdheid, regel en advies aan opgehangen wordt |
| `RegionalDecision` | `regional_decision_id`, `body_id`, `meeting_id`, `subject`, `outcome`, `vote_for`, `vote_against`, `minority_view`, `competence_id`, `linked_case_ids` | DR- of RR-besluiten met juridische bevoegdheidstoets |

Zie volledig schema in [docs/08-data-model.md §8.8](08-data-model.md).

## 19.5 Federatief mandaatmodel — uitbreiding

In aanvulling op het bestaande mandaatmodel ([§15.4](15-juridisch-kader.md)):

| Orgaan | Authoritative source voor | Mag wijzigen | Mag beslissen |
|---|---|---|---|
| **Districtsraad (DR)** | Districtsverordeningen, districtsbegroting, opbrengstenbestemming binnen district | Verordeningen, begrotingsposten, bestemming Districtsfonds | Districtsbegroting, lokale heffingen binnen WRO-bevoegdheid |
| **Ressortraad (RR)** | Ressortbelangen, lokale prioriteiten | Adviezen, lokale prioriteitenlijst | Niet bindend op centraal niveau; wel intern op ressortprioriteiten |
| **Districtscommissaris (DC)** | Uitvoeringsbesluiten dagelijks bestuur | Operationele dossiers; (tot wetswijziging) ook DR-agenda | Dagelijks bestuur; namens President in district |
| **Ministerie van Financiën** | Centrale begrotingsdiscipline, Algemene Afdrachten | Afdrachten-tarieven, richtlijnen | Vrijgave centrale middelen, goedkeuring districtsbegroting voorlopig |
| **Ministerie BiZa / Regionale Ontwikkeling** | WRO-uitvoering, Level 2-certificering | Certificeringsbesluit | Level 2-status |

## 19.6 Geplande wetswijzigingen 2026 — platform-impact

### 19.6.1 DC-ontkoppeling

> **Voorgenomen wijziging:** schrappen van de bepaling dat de DC voorzitter is van de Districtsraad. De DR krijgt een eigen voorzitter.

Platform-impact:

- `RegionalBody.chairperson_party_id` wordt **verplicht apart** van `dc_party_id`.
- Adviesregel `BF-03` (belangenconflict-vlag) detecteert dubbelrol zolang de wet niet in werking is, en zet die uit zodra `legal_regime.wro_version >= "ontwerp_2026_a"`.
- DR-vergaderingen verlopen via aparte werkruimte (analoog aan werkgroep-werkruimte) met eigen agendabevoegdheid.

### 19.6.2 Financiële Autonomie Districten

> **Voorgenomen wijziging:** twee conceptwetten die districten directer over eigen middelen laten beschikken.

Platform-impact:

- Volledig uitgewerkt in [docs/20-financien-districtsfonds.md](20-financien-districtsfonds.md).
- Conceptwet-tracker (zie §19.8) houdt artikel-niveau status, consultatie-input en IACHR-toetsing bij.

### 19.6.3 Consultatiefase maart 2026

> **In gang gezet:** consultaties met lokale gemeenschappen door werkgroep Dikan om breed gedragen wetsvoorstel te formuleren dat decentralisatie aan collectieve rechten koppelt.

Platform-impact:

- Consultatieronde geregistreerd als reeks `Meeting` met `meeting_type = "consultatie_district"` of `consultatie_ressort`.
- Per artikel van het concept een **consultatie-spoor**: welke gemeenschap heeft wat gezegd, welke wijzigingen zijn doorgevoerd.
- Hoorzittings-stukken in `LA_Source` met `source_type = "consultation_minutes"`.

## 19.7 Adviesmotor — uitbreiding met categorie 6

Toegevoegd aan [docs/10-adviesmotor.md §10.2](10-adviesmotor.md):

| Categorie | Vraag die beantwoord wordt | Doelpubliek |
|---|---|---|
| **6. Bestuurlijk-financieel** | Welk district/ressort krijgt welke opbrengst? Welke bevoegdheid is van toepassing? Bestaat conflict met centrale wetgeving? | Werkgroep / Ministerie Fin / DR-leden |

Bijbehorende regelfamilies (`BF-01` t/m `BF-06`) — volledige YAML in [docs/10-adviesmotor.md §10.5](10-adviesmotor.md):

| Regel-ID | Trigger | Bron |
|---|---|---|
| `BF-01` | Concessie/grondhuur in district X → ten minste *Y%* naar `DistrictFund` X | Interimregeling Fin. Decentralisatie |
| `BF-02` | Eigen tarieven vóór Level-2-certificering = niet toegestaan | Level 2-eis |
| `BF-03` | DC-pet-conflict (DR-voorzitterschap) | DC-ontkoppelingswet |
| `BF-04` | Districtsverordening conflicteert met Comptabiliteitswet | Comptabiliteitswet vs. WRO |
| `BF-05` | RR/DR-besluit overschrijdt bevoegdheid in WRO-artikel | WRO + wijzigingen |
| `BF-06` | Concessie in `customary_territory` → opbrengstaandeel ook naar gemeenschap | Werkgroep-kernpunt grond ↔ decentralisatie ([21](21-koppeling-grond-fondsen.md)) |

## 19.8 Nieuwe modules

| Module | Demo / Roadmap | Inhoud |
|---|---|---|
| **Administratieve kaartlaag** | Demo | District- en ressortgrenzen op de GIS-kaart, filter per district/ressort |
| **District-portaal** | Demo (lichte versie) | Per district: kaart, fondsstand, opbrengstenboom, Level-2-status, samenstelling DR/RR, lopende dossiers |
| **Wet- & bevoegdhedenbibliotheek** (`/wetten`) | Demo | Publiek leesbare bronnenlijst: WRO 1989 + alle wijzigingen + Interimregeling + ontwerpwetten. Versionering via Git, wijziging via PR met juridische review (analoog aan `/regels`) |
| **Conceptwet-tracker** | Demo (statisch) | Twee aanstaande wetten als levende documenten: artikel-niveau status, consultatie-input, IACHR-toets |
| **DR/RR-werkruimte** | Roadmap fase 1 | Per district/ressort eigen agenda, notulen, besluiten en actiepunten — analoog aan werkgroep-werkruimte |
| **Fiscaal-simulator** | Roadmap fase 4 | "Wat als alle in WRO genoemde belastingen daadwerkelijk naar Districtsfonds vloeien — wat krijgt elk district?" |

## 19.9 Demo-afbakening (Fase 0)

In de demo ([docs/07](07-mvp-demo-scope.md)) komt:

- 10 districten + 62 ressorten als geometrische én bestuurlijke entiteiten met SR-grenzen (uitbreiding op huidige kaartlaag);
- 3 demo-districten met fictieve fondsenpagina (`DEMO_Districtsfonds_…`);
- `/wetten`-pagina met de zeven WRO-bronnen + Interimregeling als leesbare bibliotheek;
- Drie adviesregels (`BF-01`, `BF-02`, `BF-06`) actief;
- Conceptwet-tracker als statische demo met de twee aanstaande wetten.

Niet in de demo (verplaatst naar [docs/13-roadmap.md](13-roadmap.md)):

- Echte begrotingsdata, echte belastingaanslagen;
- Bidirectionele koppeling met Ministerie van Financiën / CBvS;
- DR- en RR-werkruimte productie-klaar;
- Fiscaal-simulator;
- Automatische opbrengstverdeling.

## 19.10 Risico's specifiek voor decentralisatiespoor

| Risico | Mitigatie |
|---|---|
| Demo wordt gelezen als positiebepaling over verdeelsleutel | Banner "DEMO — alle bedragen fictief"; expliciete disclaimer onder elke fondspagina |
| Aanstaande wetten verschuiven scope tijdens bouw | Conceptwet-tracker is bewust **statisch** in demo; wijzigingen worden voorgesteld aan werkgroep, niet rechtstreeks gepubliceerd |
| Spanning tussen DR-bevoegdheid en centrale Comptabiliteitswet | Regel `BF-04` maakt conflict expliciet, niet impliciet; menselijke beoordeling vereist |
| Verkeerde indruk dat platform beslist over opbrengstverdeling | Adviesmotor blijft **adviserend**, regelgebaseerd, uitlegbaar — zie [§10.8](10-adviesmotor.md) |
| ITP-aandeel in opbrengsten politiek gevoelig | Koppeling via `BF-06` is voorstel; finale verdeling vereist FPIC en politieke goedkeuring ([21](21-koppeling-grond-fondsen.md)) |

## 19.11 Relatie met andere docs

| Verbinding | Naar |
|---|---|
| Juridisch kader grondenrechten-spoor | [docs/15-juridisch-kader.md](15-juridisch-kader.md) |
| Financiële uitwerking | [docs/20-financien-districtsfonds.md](20-financien-districtsfonds.md) |
| Koppeling grond ↔ districtsopbrengsten | [docs/21-koppeling-grond-fondsen.md](21-koppeling-grond-fondsen.md) |
| Datamodel-entiteiten | [docs/08-data-model.md §8.8](08-data-model.md) |
| Nieuwe adviescategorie | [docs/10-adviesmotor.md §10.2 en §10.5](10-adviesmotor.md) |
| Roadmap | [docs/13-roadmap.md](13-roadmap.md) |
