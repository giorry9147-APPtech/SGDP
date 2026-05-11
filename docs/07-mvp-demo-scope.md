# 07 — MVP / Demo Scope

> **Het project bouwt eerst een demo. Dit document is de definitieve, ondubbelzinnige afbakening van wat in de demo zit.**

## 7.1 Doel van de demo

1. Aantonen dat het concept "Land Rights & Claims Intelligence Platform" werkt voor de Surinaamse context.
2. De Werkgroep Grondenrechten en Decentralisatie een werkbare omgeving geven om inventarisatie, conflictdetectie en advies te oefenen.
3. De President en stakeholders een tastbare visualisatie geven van wat een volwaardig systeem oplevert.
4. Een feedbacklus opzetten met VIDS, KAMPOS, traditioneel gezag, MI-GLIS, GBB.

De demo is **niet productie-klaar**, niet gekoppeld aan echte registers, en draait op fictieve of geanonimiseerde testdata.

## 7.2 Wat zit er IN de demo (7 kernmodules)

| # | Module | Demo-inhoud |
|---|---|---|
| 1 | **Digitale grondaanvraag** | Webformulier; 2 aanvraagtypes; document-upload; concept opslaan; indienen |
| 2 | **Dossierupload** | Per zaak een digitaal dossier met versionering, audit trail, statussen |
| 3 | **GIS-kaart** | Interactieve kaart met lagen: percelen, aanvragen, ITP-gebieden, concessies, beschermde gebieden, infrastructuur, **administratieve grenzen (district + ressort)** |
| 4 | **Overlap-check** | Automatische check bij elke aanvraag, lijst overlappingen + percentages, visualisatie |
| 5 | **Conflict-risicoscore** | Laag / middel / hoog op basis van transparante regels, met onderbouwing |
| 6 | **Adviesrapport** | Per dossier rapport met **6 categorieën** (administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid, **bestuurlijk-financieel**), exporteerbaar als PDF |
| 7 | **Admin-dashboard** | Aantal open dossiers, doorlooptijd, hotspots, filtering per district/status/risico |

Daarnaast in de demo aanwezig (lichte versie):

- **FPIC- en consultatiemodule**: gemeenschap, gezag, consultatieverslag, FPIC-status (negen statussen).
- **Werkgroep-werkruimte**: agenda, notulen, besluitenregister, actiepunten.
- **Stakeholderregister**: categorieën en contactmomenten.
- **Audit trail**: wie/wat/wanneer logging, exporteerbaar.
- **Werkgroep-dashboard**: executive view conform [03-werkgroep-dashboard.md](03-werkgroep-dashboard.md).

Toegevoegd aan demo voor het **decentralisatiespoor** (zie [19](19-wro-decentralisatie.md), [20](20-financien-districtsfonds.md), [21](21-koppeling-grond-fondsen.md)):

- **District-portaal (lichte versie)**: 3 demo-districten met `DistrictFund`-pagina, fictieve cijfers, Level-2-status, inkomstenboom.
- **Wet- & bevoegdhedenbibliotheek (`/wetten`)**: publiek leesbare bronnenlijst — WRO 1989 + alle wijzigingen + Interimregeling Financiële Decentralisatie + ontwerpwetten 2026.
- **Conceptwet-tracker** (statisch): twee aanstaande wetten met artikel-niveau status en consultatie-input.
- **Bestuurlijke entiteiten**: 10 districten + 62 ressorten met officiële SR-grenzen, `RegionalBody`-records (DR/RR/DC), `RegionalDecision`-stub.
- **`BenefitShare`-demo-casus**: één concessie op customary territory met scenario-uitwerking, FPIC-status en voorgestelde verdeling centraal/district/ITP.
- **Drie nieuwe adviesregels actief**: `BF-01` (districtsaandeel), `BF-02` (Level-2-blokker), `BF-06` (ITP-royalty-koppeling).

## 7.3 Wat zit er NIET in de demo

| Item | Reden | Spoor |
|---|---|---|
| Realtime koppeling MI-GLIS | Vereist contract en API-werk | Roadmap fase 2 |
| Realtime koppeling concessieregisters | Idem | Roadmap fase 2 |
| Identiteitsverificatie (eIDAS-achtig) | Buiten scope demo | Roadmap fase 3 |
| Productie-burgerportaal (uploads, login) | Demo toont read-only stub | Roadmap fase 2 |
| Mobiele veld-app (GPS, offline) | Demo werkt met handmatige import | Roadmap fase 3 |
| Blockchain-verankering | Nog geen vereiste | Roadmap fase 4 |
| AI-OCR documentanalyse | Demo gebruikt handmatige metadata | Roadmap fase 3 |
| Smart contracts | Nog geen vereiste | Roadmap fase 4 |
| Online Dispute Resolution-module | Buiten scope demo | Roadmap fase 3 |
| ML-gebaseerde adviesmotor | Demo is regel-gebaseerd | Roadmap fase 3 |
| Volledige meertaligheid | Demo Nederlands; i18n voorbereid | Roadmap fase 2 |
| Massale CAMA-waardering | Niet primair voor mandaat werkgroep | Roadmap fase 4 |
| 3D-cadaster | Niet primair | Roadmap fase 4 |
| Public records search portal | Niet primair | Roadmap fase 3 |
| **Echte begrotingsdata DistrictFund** | Demo gebruikt fictieve `DEMO_…`-cijfers | Roadmap fase 1 (pilot) |
| **Koppeling Ministerie van Financiën / CBvS-grootboek** | Vereist contract en interface | Roadmap fase 2 |
| **DR-/RR-werkruimte productie-klaar** | Demo toont basis-stub | Roadmap fase 1 |
| **Goedkeuringsworkflow districtsbegroting** | Politieke en bestuurlijke randvoorwaarden | Roadmap fase 1 |
| **Fiscaal-simulator** | Vereist betrouwbare opbrengstdata | Roadmap fase 4 |
| **Periodieke royalty-monitoring** | Vereist financiële koppelingen | Roadmap fase 3 |
| **Hash-verankerde benefit-keten + IACHR-rapportage** | Vereist productie-volwassenheid | Roadmap fase 4 |
| **Conceptwet-tracker als levend document** | Politieke gevoeligheid; demo is statisch | Roadmap fase 1 |

## 7.4 Demo-dataset

De demo wordt geleverd met een **fictieve maar realistische dataset**:

- **Districten**: alle 10, met officiële SR-grenzen als kaartlaag. **Drie** daarvan (bv. Marowijne, Sipaliwini, Para) hebben een uitgewerkt `DistrictFund` met fictieve cijfers (`DEMO_Districtsfonds_…`).
- **Ressorten**: alle 62 als kaartlaag, 6 ressorten met meer detail in demo-districten.
- **Percelen**: ≥ 50 met variatie in oppervlakte en status, geografisch toegewezen aan ressorten/districten.
- **Eigendomsrechten en erfpacht**: ≥ 20.
- **Domeingrondaanvragen**: ≥ 10, waarvan ≥ 3 met conflict.
- **ITP-dorpen**: ≥ 5, met traditionele woon- en leefgebieden ingetekend.
- **Concessies**: ≥ 3 (mijnbouw, hout, landbouw), waarvan ≥ 1 overlapt met ITP en een uitgewerkte **`BenefitShare`** met scenario, FPIC-status en verdeelvoorstel heeft.
- **Beschermde gebieden**: ≥ 2.
- **Bezwaren/voorbeeldconsultaties**: ≥ 3.
- **Documenten**: voorbeeld-PDF's (anoniem, watermerk "DEMO").
- **`RegionalBody`-records**: DR/RR/DC voor de 3 demo-districten met fictieve samenstelling.
- **`LegalProvision`-records**: WRO 1989 + S.B. 2000/2002/2005/2015 + Interimregeling 2003 + S.B. 2006 no. 134 + Comptabiliteitswet-artikelen + 2 ontwerpwetten 2026.

**Geen echte persoonsgegevens.** Geen echte concessiehoudernamen. Geen echte ITP-gemeenschapsdata zonder voorafgaande FPIC met die gemeenschap. **Geen echte financiële cijfers** — alle bedragen in `DistrictFund` en `RevenueSource` zijn fictief en gelabeld `DEMO_…`.

## 7.5 Demo-omgeving en deployment

- **Hosting demo**: lokaal of single-tenant cloud (Azure / AWS / on-prem keuze open).
- **Toegang**: uitnodiging-only, fixed credentials voor werkgroepleden + adviespool.
- **TLS**: ja.
- **Backup**: dagelijks tijdens demo-periode.
- **Performance-eis**: redelijk gebruik, niet schaal-bewezen.

## 7.6 Demo-acceptatiecriteria

De demo wordt **opgeleverd** wanneer:

1. Alle MUST-items uit [05-requirements.md](05-requirements.md) functioneren op de testdataset (inclusief demo-subset van FR-20 t/m FR-23 voor decentralisatiespoor).
2. Een nieuwe testaanvraag kan worden ingediend, geëvalueerd, en levert binnen 5 sec een conflict-risicoscore + adviesrapport (6 categorieën).
3. Een werkgroep-lid kan zonder hulp:
   - een dossier vinden,
   - een notulen-besluit registreren,
   - een actiepunt toewijzen,
   - het rapport van de week exporteren,
   - **een demo-district openen en de fondspagina + DR/RR-samenstelling bekijken**,
   - **de `/wetten`-pagina raadplegen en een wetsartikel terugvinden dat in een advies wordt gebruikt**.
4. Audit trail toont wijzigingen herleidbaar.
5. Er is een gebruikershandleiding (NL) voor demo-deelnemers.
6. Er is een korte demo-script (10 min) waarmee de zeven kernmodules getoond worden — uitgebreid met een vignet over de `BenefitShare`-casus dat het werkgroep-snijvlak grondenrechten ↔ decentralisatie illustreert.

## 7.7 Demo-evaluatie

Na ten minste 4 weken gebruik door de werkgroep:

| Vraag | Methode |
|---|---|
| Werken de 7 kernmodules naar tevredenheid? | Survey + interviews leden |
| Levert de adviesmotor relevante output? | Steekproef van 20 dossiers, beoordeling door juristen |
| Worden conflicten daadwerkelijk vroegtijdig gedetecteerd? | Vergelijken met handmatige analyse |
| Geven ITP-stakeholders vertrouwen in de FPIC-module? | Focusgroep VIDS / KAMPOS / traditioneel gezag |
| Hoe scoort het op transparantie en uitlegbaarheid? | Audit door extern reviewer |

Resultaten gaan naar de roadmap-prioritering ([13-roadmap.md](13-roadmap.md)).

## 7.8 Risico's specifiek voor de demo

| Risico | Mitigatie |
|---|---|
| Demo wordt gezien als productie en gebruikt voor echte besluiten | Banner "DEMO — niet voor besluitvorming" op elk scherm |
| Datalek van fictieve maar als-echt-ervaren data | Geen PII, alleen "DEMO_..." labels |
| Verwachtingenmanagement: stakeholders verwachten direct integratie MI-GLIS | Communiceren scope duidelijk; roadmap tonen |
| Verkeerde indruk dat AI beslist | Adviesmotor is regelgebaseerd, mens beslist altijd |
| FPIC-data van echte gemeenschap belandt in demo | Strikt protocol: alleen synthetische gemeenschapsdata in demo |
| Demo `DistrictFund`-cijfers worden gelezen als positiebepaling over verdeelsleutel | Banner "DEMO — alle bedragen fictief"; expliciete disclaimer onder elke fondspagina |
| `BenefitShare`-verdeelpercentages worden als beleidsvoorstel gezien | Demo toont scenario's `A/B/C/D` als rekenmodel; definitieve percentages vergen FPIC, DNA-besluit en wettelijke bekrachtiging — zie [21](21-koppeling-grond-fondsen.md) |
| Conceptwet-tracker wekt indruk van vastgesteld beleid | Demo-versie is bewust **statisch** en toont expliciet status "voor inwerkingtreding" |
