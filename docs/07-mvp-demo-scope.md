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
| 3 | **GIS-kaart** | Interactieve kaart met lagen: percelen, aanvragen, ITP-gebieden, concessies, beschermde gebieden, infrastructuur |
| 4 | **Overlap-check** | Automatische check bij elke aanvraag, lijst overlappingen + percentages, visualisatie |
| 5 | **Conflict-risicoscore** | Laag / middel / hoog op basis van transparante regels, met onderbouwing |
| 6 | **Adviesrapport** | Per dossier rapport met 5 categorieën (administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid), exporteerbaar als PDF |
| 7 | **Admin-dashboard** | Aantal open dossiers, doorlooptijd, hotspots, filtering per district/status/risico |

Daarnaast in de demo aanwezig (lichte versie):

- **FPIC- en consultatiemodule**: gemeenschap, gezag, consultatieverslag, FPIC-status (negen statussen).
- **Werkgroep-werkruimte**: agenda, notulen, besluitenregister, actiepunten.
- **Stakeholderregister**: categorieën en contactmomenten.
- **Audit trail**: wie/wat/wanneer logging, exporteerbaar.
- **Werkgroep-dashboard**: executive view conform [03-werkgroep-dashboard.md](03-werkgroep-dashboard.md).

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

## 7.4 Demo-dataset

De demo wordt geleverd met een **fictieve maar realistische dataset**:

- **Districten**: 3 (gefingeerd, geïnspireerd op echte: bv. Marowijne, Sipaliwini, Para — labels in de demo zijn duidelijk "DEMO_…").
- **Percelen**: ≥ 50 met variatie in oppervlakte en status.
- **Eigendomsrechten en erfpacht**: ≥ 20.
- **Domeingrondaanvragen**: ≥ 10, waarvan ≥ 3 met conflict.
- **ITP-dorpen**: ≥ 5, met traditionele woon- en leefgebieden ingetekend.
- **Concessies**: ≥ 3 (mijnbouw, hout, landbouw), waarvan ≥ 1 overlapt met ITP.
- **Beschermde gebieden**: ≥ 2.
- **Bezwaren/voorbeeldconsultaties**: ≥ 3.
- **Documenten**: voorbeeld-PDF's (anoniem, watermerk "DEMO").

**Geen echte persoonsgegevens.** Geen echte concessiehoudernamen. Geen echte ITP-gemeenschapsdata zonder voorafgaande FPIC met die gemeenschap.

## 7.5 Demo-omgeving en deployment

- **Hosting demo**: lokaal of single-tenant cloud (Azure / AWS / on-prem keuze open).
- **Toegang**: uitnodiging-only, fixed credentials voor werkgroepleden + adviespool.
- **TLS**: ja.
- **Backup**: dagelijks tijdens demo-periode.
- **Performance-eis**: redelijk gebruik, niet schaal-bewezen.

## 7.6 Demo-acceptatiecriteria

De demo wordt **opgeleverd** wanneer:

1. Alle MUST-items uit [05-requirements.md](05-requirements.md) functioneren op de testdataset.
2. Een nieuwe testaanvraag kan worden ingediend, geëvalueerd, en levert binnen 5 sec een conflict-risicoscore + adviesrapport.
3. Een werkgroep-lid kan zonder hulp:
   - een dossier vinden,
   - een notulen-besluit registreren,
   - een actiepunt toewijzen,
   - het rapport van de week exporteren.
4. Audit trail toont wijzigingen herleidbaar.
5. Er is een gebruikershandleiding (NL) voor demo-deelnemers.
6. Er is een korte demo-script (10 min) waarmee de zeven kernmodules getoond worden.

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
