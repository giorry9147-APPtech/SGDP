# SGDP Demo — Volledige Gebruikershandleiding

> **Voor:** leden Werkgroep Grondenrechten & Decentralisatie, secretariaat, ambtenaren GBB/Domeinkantoor, MI-GLIS-medewerkers, NMA-reviewers, vertegenwoordigers VIDS/KAMPOS en traditioneel gezag — én iedereen die deze demo evalueert.
>
> **Wat deze handleiding doet:** elke feature die de docs (01-18) beschrijven wordt hier afgelopen, met statuslabel:
> - ✅ **Gebouwd** — werkt in deze demo
> - ⚠️ **Basis** — aanwezig maar minimaal/read-only
> - 🛣 **Roadmap** — niet in demo, gepland voor pilot/integratie/burgerportaal
>
> **Demo, geen productie.** Mutaties zijn **niet persistent** — een refresh herstelt seeddata. Geen besluitvorming op basis van deze omgeving.

---

## Inhoud

1. [Oriëntatie](#1-oriëntatie)
2. [Module 1 — Executive Dashboard](#2-module-1--executive-dashboard)
3. [Module 2 — GIS-kaart](#3-module-2--gis-kaart)
4. [Module 3 — Aanvragen & Adviesmotor](#4-module-3--aanvragen--adviesmotor)
5. [Module 4 — FPIC & Consultatie](#5-module-4--fpic--consultatie)
6. [Module 5 — Dossiers](#6-module-5--dossiers)
7. [Module 6 — Grondhuur, Conversie & Vervallenverklaring](#7-module-6--grondhuur-conversie--vervallenverklaring)
8. [Module 7 — Milieu & NMA](#8-module-7--milieu--nma)
9. [Module 8 — Werkgroep-werkruimte](#9-module-8--werkgroep-werkruimte)
10. [Module 9 — Stakeholders & Communities](#10-module-9--stakeholders--communities)
11. [Module 10 — Audit Trail](#11-module-10--audit-trail)
12. [Module 11 — Adviesregels (transparantie)](#12-module-11--adviesregels-transparantie)
13. [Cross-cutting features](#13-cross-cutting-features)
14. [End-to-end workflows](#14-end-to-end-workflows)
15. [Rollen en autorisatie](#15-rollen-en-autorisatie)
16. [Wat zit er WEL in (volledig)](#16-wat-zit-er-wel-in-volledig)
17. [Wat zit er NIET in (roadmap)](#17-wat-zit-er-niet-in-roadmap)
18. [Veelgestelde vragen](#18-veelgestelde-vragen)
19. [Begrippenlijst](#19-begrippenlijst)

---

## 1. Oriëntatie

### 1.1 Wat is SGDP?

Het **Suriname Grondenrechten & Decentralisatie Platform** is een *Land Rights & Claims Intelligence Platform*: kaart + dossier + workflow + conflictdetectie + adviesmotor + FPIC + audit.

Het ondersteunt twee sporen tegelijk:
- **Spoor A — Werkgroep & werkwijze**: de in december 2025 benoemde Werkgroep (6 leden, voorzitter Edgar Dikan) levert in 40 weken advies aan de President.
- **Spoor B — Software-platform**: de werkomgeving waarin die werkgroep én later GBB/MI-GLIS/NMA dagelijks werken.

Visie (doc 04 §4.3): in **één omgeving** voor een gegeven stuk grond zien wat er bekend is — formeel én customary, aanvragen, concessies, beschermd, FPIC-status — met regelgebaseerd advies en risicoscore.

### 1.2 Demo versus productie

| Aspect | Demo (deze omgeving) | Productie (later) |
|---|---|---|
| Data | Volledig fictief, gelabeld `DEMO_…` | Echte (geanonimiseerde) data, fasegewijs |
| Persistentie | Geen — refresh herstelt | PostgreSQL + PostGIS, volledige audit |
| Authenticatie | Statische rol "Edgar Dikan" | Keycloak + Surinaamse Digitale-ID (SSO/OIDC) |
| Hosting | `localhost` of single-tenant cloud | Cloud single-tenant of on-prem (FPIC-data) |
| Mutaties | Tonen alleen in browser | Append-only, gehasht, traceerbaar |

### 1.3 Eerste indruk

- **URL:** `http://localhost:3000` of de gedeelde URL.
- **Header bovenaan:** Surinaamse vlag-strook + wapen-look + "Republiek Suriname · Kabinet van de President".
- **Demo-banner rechtsboven:** *"DEMO — niet voor besluitvorming"*. Staat op elk scherm, conform doc 07 §7.8 / 14.3 RP-01.
- **Rolswitcher rechtsboven:** in deze demo statisch "Edgar Dikan, Voorzitter werkgroep".
- **Sidebar links:** 11 menu-items.

### 1.4 Sidebar — wat staat waar

| Item | Route | Module-doc |
|---|---|---|
| Executive Dashboard | `/` | doc 03 §3.2.1 |
| GIS-kaart | `/kaart` | doc 06 Module 1 + doc 09 §9.3.5 |
| Aanvragen & Advies | `/aanvragen` | FR-1, FR-4, FR-5, FR-6 (doc 05) |
| FPIC & Consultatie | `/fpic` | doc 11 + FR-8 |
| Dossiers | `/dossiers` | FR-2 |
| Grondhuur & Conversie | `/grondhuur` | doc 18 + FR-15 |
| Milieu & NMA | `/milieu` | doc 17 + FR-16 |
| Werkgroep | `/werkgroep` | doc 02 + doc 03 §3.2.2 |
| Stakeholders | `/stakeholders` | doc 11 §11.6 + FR-12 |
| Audit Trail | `/audit` | FR-11 + doc 14 §14.5 |
| Adviesregels | `/regels` | doc 10 + FR-12.3 |

Een rode pulse-stip op een item = "hier loopt iets, kijk eens". De gele "PRESIDENT"-badge naast Executive Dashboard markeert de view voor het staatshoofd.

---

## 2. Module 1 — Executive Dashboard

**Route:** `/`
**Brondoc:** doc 03 §3.2.1 (President / voorzitter view)
**Status:** ✅ **Gebouwd**

### 2.1 Doel

Eén scherm voor de President en de voorzitter waarop in real-time zichtbaar is: waar staan we, wat blokkeert, wat is de eerstvolgende deadline?

### 2.2 Wat je ziet

- **Header met deadline-klok:** "Tussentijds rapport — deadline 18 mei 2026 — over X dagen". ✅
- **Voortgangstrip F1-F5:** percentages mijlpalen voltooid, met pulse op de actieve fase. ✅
- **4 KPI-tegels:** ✅
  - ITP-gebieden geïnventariseerd
  - Open dossiers / geblokkeerd / afgehandeld
  - FPIC-trajecten met (voorwaardelijke) instemming
  - Actiepunten open + achterstallig
- **Hoog-risico dossiers (top 4):** met risicoscore-bolletje, blocker-tekst, FPIC-/NMA-badges, klikbaar naar dossier. ✅
- **Komende mijlpalen:** met deadline-kleur (rood = over deadline, oranje = ≤7 dagen). ✅
- **Lopende besluiten:** uit `/werkgroep`, met stemverhouding. ✅
- **Top-3 strategische risico's:** drie tegels met severity, beschrijving en eerstvolgende actie. ✅

### 2.3 Hoe je 't gebruikt

- Open elke maandagochtend voor je eigen overview.
- Klik op een hoog-risico dossier om direct naar de detail-page te gaan.
- Klik in "Lopende besluiten" op "Werkgroep-werkruimte →" om naar `/werkgroep` te gaan.

### 2.4 Beperkingen demo

- KPI-cijfers komen uit `lib/demo-data.ts` — niet gekoppeld aan echte feeds.
- Top-3 strategische risico's zijn hardcoded voorbeelden (in productie: uit risicoregister, doc 14).
- Geen filtering of personalisatie per rol.

### 2.5 Roadmap

- 🛣 **Persoonlijke werkbak per ambtenaar** (FR-7.5).
- 🛣 **Geautomatiseerde beleidsbriefings** uit aggregaten naar President (doc 13 Fase 4).
- 🛣 **Real-time data uit MI-GLIS, GBB, NMA** (doc 13 Fase 2 integraties).

---

## 3. Module 2 — GIS-kaart

**Route:** `/kaart`
**Brondoc:** doc 06 Module 1, doc 09 §9.3.5, FR-3
**Status:** ✅ **Gebouwd** (kernfunctionaliteit) · ⚠️ **Tekenen/teken-export**: nog niet · 🛣 **4D/3D**: roadmap

### 3.1 Doel

Geografische werkelijkheid van Suriname in één scherm: waar liggen welke rechten, claims, concessies, beschermde gebieden, aanvragen en gemeenschappen — en waar overlappen ze?

### 3.2 De 7 lagen

| Laag | Inhoud | Status |
|---|---|---|
| `outline` | Suriname-grens (vereenvoudigd) | ✅ |
| `customary` | Traditionele woon- en leefgebieden ITP (5 polygonen, CT-001 t/m CT-005) | ✅ |
| `concessions` | Mijnbouw / bosbouw / landbouw (3 stuks, kleurgecodeerd op type) | ✅ |
| `protected` | Beschermde gebieden (2: natuurreservaat + kustgebied) | ✅ |
| `parcels` | 50 percelen (eigendom / erfpacht / grondhuur — kleurgecodeerd op rrrType) | ✅ |
| `applications` | 10 lopende aanvragen (kleurgecodeerd op risiconiveau) | ✅ |
| `communities` | Marker per dorp met label | ✅ |

Basemap: **CARTO Light** raster tiles (open-source, geen access token nodig).

### 3.3 Hoe je 't gebruikt

1. **Pannen & zoomen:** muis + scrollwheel, of de `+ / −` knoppen rechtsboven.
2. **Hover over polygoon → popup:** toont objectnaam, type, oppervlakte, houder.
3. **Klik op object:** zelfde popup-info; in productie zou dit doorlinken naar het bijbehorende dossier (⚠️ basis in demo).
4. **Schaal-control linksonder** voor metrische schaal.
5. **Layer-toggle:** *(in detail-pages zoals `/aanvragen/[id]` is een vaste lagenset gekozen; standalone `/kaart` toont alle 7 lagen — toggle-UI komt in pilotfase, ⚠️)*.

### 3.4 Wat je in de praktijk doet

- **Conflict zien:** zoom in op DEMO_Marowijne — zie de overlap tussen `DEMO_Goudconcessie A-12` (rood) en `DEMO_Galibi traditioneel gebied` (geel). Klassieke IACHR Saramaka-situatie.
- **Aanvragen visualiseren:** rode dots = zeer hoge risicoscore; groene dots = laag.
- **Beschermde gebieden:** lichtgroen met streepjes-rand.

### 3.5 Beperkingen demo

- Geen tekenfunctie voor nieuwe polygonen (FR-3.4 = SHOULD; in demo nog niet ingebouwd).
- Geen import van Shapefile/KML/GeoJSON via UI (FR-3.3) — data wordt nu vanuit `lib/demo-data.ts` geladen.
- Geen export naar PDF van een specifiek kaartbeeld (FR-3.5).
- Layer-toggle UI op standalone `/kaart`: roadmap.

### 3.6 Roadmap

- 🛣 **Tekenfunctie** voor nieuwe perceelpolygoon (FR-3.4)
- 🛣 **Import GeoJSON / Shapefile / KML / GeoPackage** via upload (FR-3.3, NFR-5.4)
- 🛣 **Tijdslider 4D** voor historische lagen (FR-3.6, doc 12 §12.3.1 PDOK Topotijdreis)
- 🛣 **3D-viewer** voor stedelijke gebouwen + mijnbouwlagen (doc 13 Fase 4)
- 🛣 **Heatmap conflictdichtheid** (doc 06)
- 🛣 **Achtergrondlaag satellietbeelden** (FR-3.7)
- 🛣 **OGC API – Features endpoint** voor externe consumptie (NFR-5.3, doc 16)

---

## 4. Module 3 — Aanvragen & Adviesmotor

**Routes:** `/aanvragen` (lijst) · `/aanvragen/nieuw` (nieuwe aanvraag) · `/aanvragen/[id]` (detail + advies + PDF)
**Brondocs:** FR-1, FR-4, FR-5, FR-6, doc 10 (adviesmotor), doc 16 §16.6
**Status:** ✅ **Gebouwd** met scenario-picker · 🛣 **Volledig burgerportaal**: roadmap

### 4.1 Doel

Domeingrond-intake **mét** live conflictdetectie en regelgebaseerd advies: in 1 seconde zie je risicoscore, blokkades en aanbeveling.

### 4.2 Lijstweergave (`/aanvragen`)

✅ Tabel met alle 10 voorbeeld-aanvragen, kolommen:
- Zaaknummer · indiener · district · doel · status · risicoscore · risicokleur · FPIC-/NMA-badges · ingediend op
- Filterbaar op district / status / risicoscore (⚠️ basis-niveau)

### 4.3 Nieuwe aanvraag (`/aanvragen/nieuw`)

✅ **Scenario-picker** (vier voorgekookte demo-scenario's) toont per klik direct hoe de adviesmotor reageert. Volledig vrij intake-formulier komt later (FR-1.2 t/m FR-1.7 zijn architecturaal voorzien).

| Scenario | Wat het demonstreert |
|---|---|
| **A — Schone aanvraag** | Geen overlap, alle docs compleet → score laag, advies "geschikt voor administratieve afhandeling" |
| **B — Overlap traditioneel gebied** | DEMO_Galibi → R-SOC-001 hard blocker → FPIC-trigger |
| **C — In beschermd gebied** | DEMO_Natuurreservaat → R-RUM-001 + R-ENV-010 → NMA-review hard blocker |
| **D — Onvolledig dossier** | Figuratieve kaart ontbreekt bij specifieke aanvraag → R-ADM-003 hard blocker |

⚠️ **Demo-beperking:** geen tekenpolygoon-op-kaart, geen echte file-upload (FR-1.4); de scenario's brengen je direct naar het advies-rapport om de werking te demonstreren.

### 4.4 Detailpagina (`/aanvragen/[id]`)

Per dossier zie je:

#### 4.4.1 Hoofdcard ✅
- Zaaknummer (mono-font), status-badge, FPIC-/NMA-vlaggen
- Indiener, ID, nationaliteit, district, doel, ingediend op
- Knop **"Adviesrapport (PDF)"** rechtsboven

#### 4.4.2 Workflow-strip ✅
8 statussen visueel: ontvangen → documentcontrole → in_onderzoek → landmetercontrole → bezwaarperiode → juridisch_advies → besluit → beschikking. Geblokkeerde zaken tonen rood vlak. Conform FR-2.3.

#### 4.4.3 Adviesrapport (HERO) ✅
Volledig regelgebaseerd, doc 10:
- **Risicoscore-bolletje** (groot, kleurgecodeerd) — 0-100, met level-label "Laag/Middel/Hoog/Zeer hoog"
- **Hard blockers** in rood vak — opgesomd met regel-IDs
- **5 categorieën-tegels:** administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid; per regel: ID, weging, BLOCKER-vlag, bevinding-tekst
- **Aanbeveling:** "Niet besluitbaar" / "Senior review" / "Standaard workflow", met expliciete vervolgacties (FPIC starten, NMA-reviewtaak)
- **Provenance-strip:** ruleset-versie, toegepaste regel-IDs, gegenereerd-tijdstip

#### 4.4.4 Kaart ✅
MapLibre-kaart van het aangevraagde gebied + context-lagen (ITP-gebieden, concessies, beschermd, percelen, gemeenschappen). Wordt verborgen in print-output (kaart-tiles renderen niet schoon op papier).

#### 4.4.5 Documenten-card ✅
Per verplicht document: ✓ groen "aanwezig" of ✗ rood "ontbreekt". Drie verplichte: nationaliteitsverklaring, ID-kopie, figuratieve kaart (FR-1.5).

#### 4.4.6 Bezwaartermijn ✅
30-daagse klok conform Decreet Uitgifte Domeingrond / FR-17:
- Gepubliceerd op
- Deadline
- Resterende dagen (kleurgecodeerd: groen/oranje/grijs)

#### 4.4.7 FPIC-koppeling ✅
Indien FPIC-vereist: gemeenschap-card met granman, populatie, taal, status-badge en directe link naar `/fpic/[id]`.

#### 4.4.8 Juridische basis ✅
Lijst met toepasselijke wetten:
- Decreet Uitgifte Domeingrond
- Besluit GLIS 2025 (S.B. 2025 nr. 44)
- Wet Grondregistratie en LIS (S.B. 2009 nr. 149)
- UNDRIP / IACHR Saramaka & Kaliña-Lokono (indien FPIC vereist)
- Milieu Raamwet (indien NMA-review)

### 4.5 PDF-export adviesrapport ✅

1. Klik **"Adviesrapport (PDF)"** rechtsboven.
2. Browser-print-dialoog opent.
3. Kies **"Bestemming: Save as PDF"** / "Opslaan als PDF".
4. Klik **Opslaan**.

De PDF bevat:
- Print-only header met case-nummer, gegenereerd-tijdstip, "DEMO — niet voor besluitvorming"-regel
- Hoofdcard met workflow-strip
- Volledig adviesrapport (alle 5 categorieën, alle bevindingen)
- Documenten-card, bezwaartermijn, FPIC-info, juridische basis
- Print-only voettekst met DEMO-disclaimer en gegenereerd-datum

⚠️ De **interactieve kaart wordt weggelaten** uit de PDF (raster tiles + WebGL renderen niet schoon op papier — dat is bewust gekozen).

### 4.6 Demo-beperkingen

- **Geen volledig vrij invulbaar formulier** — scenario-picker is de demonstratiemodus. Productie-portaal in roadmap fase 3.
- **Geen file-upload** voor documenten (FR-1.4) — labels zijn statisch.
- **Geen automatisch zaaknummer-generator** (FR-1.8) — alle zaaknummers zijn voorgekookt.
- **Mutaties niet persistent** — een nieuwe scenario-aanvraag verdwijnt na refresh.

### 4.7 Roadmap

- 🛣 **Volledige aanvraag-form** met 2 types (specifiek/algemeen) (FR-1.2)
- 🛣 **File-upload** voor PDF/JPG/PNG/GeoJSON/Shapefile/KML/GeoPackage (FR-1.4)
- 🛣 **PERCEELSID-validatie** (FR-1.6)
- 🛣 **Schemavalidatie Besluit GLIS 2025** (FR-1.7)
- 🛣 **Geautomatiseerde bevestiging + zaaknummer** (FR-1.8)
- 🛣 **Mobiele aanvraag met GPS** (FR-1.9, doc 13 Fase 3)
- 🛣 **Burgerportaal** (FR-10) met online status volgen, bezwaar indienen, document upload
- 🛣 **Document-verificatie via PKI/QR** op uitgevoerde beschikkingen (FR-18)

---

## 5. Module 4 — FPIC & Consultatie

**Routes:** `/fpic` (lijst) · `/fpic/[id]` (detail-traject)
**Brondocs:** doc 11, FR-8, doc 02 §2.4
**Status:** ✅ **Gebouwd** (data + workflow + events) · 🛣 **Mobiel offline + meertalig**: roadmap

### 5.1 Doel

FPIC (Free, Prior, Informed Consent) operationaliseren conform UNDRIP, VIDS FPIC-document, IACHR Saramaka (2007) en Kaliña-Lokono (2015). FPIC is **eersterangs object** in het datamodel — geen notitie-veldje.

### 5.2 De 9 statussen ✅

Elke status is geïmplementeerd, conform doc 02 §2.4.3 en doc 11 §11.4:

1. `niet_gestart` — trigger gesignaleerd, nog geen actie
2. `identificatie_gezag` — werkstroom inventariseert traditioneel gezag
3. `informatie_verstrekt` — pakket overhandigd, reflectie loopt
4. `consultatie_lopend` — sessies actief
5. `instemming` — volledige consent
6. `voorwaardelijke_instemming` — consent met voorwaarden
7. `bezwaar` — gemeenschap zegt nee
8. `ingetrokken` — eerder gegeven consent ingetrokken
9. `heropening_vereist` — substantiële wijziging vereist nieuwe ronde

### 5.3 Lijstweergave (`/fpic`)

✅ 3 voorbeeld-trajecten:
- **FPIC-001** — niet_gestart (gekoppeld aan APP-2026-002 / DEMO_Galibi)
- **FPIC-002** — consultatie_lopend (DEMO_Diitabiki Aukaans, met reflectieperiode)
- **FPIC-003** — voorwaardelijke_instemming (historische zaak, COM-002)

### 5.4 Detailpagina (`/fpic/[id]`)

Per traject zie je:

#### 5.4.1 Hero met community-info ✅
- Inheems / Tribaal-Marron badge
- Granman, populatie, taal
- Status-badge
- FPIC-contactpersoon

#### 5.4.2 Tijdlijn van events ✅
Per FPIC-event:
- Type (info_provided / meeting / feedback_received / objection_filed / condition_added / consent_given / consent_withdrawn) — elk met eigen icoon
- Datum + locatie
- Aanwezigen — letterlijke lijst inclusief traditioneel gezag, dorpsbewoners, VIDS-waarnemer, werkstroom
- Notities in normaal Nederlands
- **Evidence-bestanden** met type-icoon: 🎤 audio, 📹 video, 📷 foto, 📄 verslag, ✍ handtekening

#### 5.4.3 Voorwaarden ✅
Indien `voorwaardelijke_instemming`: opgesomd met onderbouwing. Bv. "Geen activiteit binnen 500 m van heilige plaats Saramaka-bron".

#### 5.4.4 Gekoppeld dossier ✅
Link naar `/aanvragen/[id]` van de zaak die FPIC heeft getriggerd.

### 5.5 Wat de demo demonstreert

- ✅ De 9 statussen werken als state-machine.
- ✅ Events met aanwezigheidsbewijs (handtekening, foto, audio, video) zijn registreerbaar.
- ✅ Voorwaarden worden expliciet vastgelegd.
- ✅ FPIC blokkeert besluitvorming via R-SOC-001 in adviesmotor (doc 11 §11.10).

### 5.6 Demo-beperkingen

- ⚠️ **Geen meertaligheid**: alle interface-tekst is Nederlands (NFR-4.2 voorbereid, niet geleverd).
- 🛣 **Mobiele veld-app voor offline FPIC-registratie** (doc 13 Fase 3)
- 🛣 **Burger/gemeenschaps-portaal** met directe inzage en correctieverzoek (doc 11 §11.10)
- 🛣 **Onafhankelijk audit-portaal** voor toezichthouders (UN-Habitat / IACHR-NGO)
- ⚠️ **Bezwaar- en voorwaarden-formulieren**: zichtbaar maar niet bewerkbaar in demo (FR-8.5)

### 5.7 Wat de regels afdwingen (adviesmotor)

| Regel | Trigger | Effect |
|---|---|---|
| R-SOC-001 | Aanvraag in customary territory | **Hard blocker** + FPIC-vereist |
| R-SOC-002 | Aanvraag nabij customary territory (buffer) | Consultatie aanbevolen |
| R-SOC-003 | FPIC-vereist maar niet gestart | Senior review |
| R-ENV-040 | Reservaat overlapt traditioneel gebied (Kaliña-Lokono) | FPIC + NMA gecombineerd |

---

## 6. Module 5 — Dossiers

**Route:** `/dossiers`
**Brondoc:** FR-2 (dossiermodule)
**Status:** ✅ **Gebouwd** (lijst per district) · ⚠️ **Detail-page**: integreert via `/aanvragen/[id]`

### 6.1 Doel

Per district groepering van alle dossiers, zodat een ambtenaar GBB of werkstroom-trekker snel kan bladeren door zaken in zijn/haar gebied.

### 6.2 Wat je ziet ✅

Per district (3): tegel met
- District-naam (DEMO_Marowijne / Sipaliwini / Para)
- Aantal geblokkeerde zaken
- Grid met dossier-tegels (zaaknummer, indiener, doel, datum, status-badge, FPIC-badge, risicoscore-badge)

### 6.3 Hoe je 't gebruikt

1. Klik op een dossier-tegel → opent `/aanvragen/[id]`.
2. Geblokkeerd-badge bovenaan elk district = direct visueel signaal.

### 6.4 Demo-beperkingen / roadmap

- ⚠️ **Geen filtering** binnen districtsweergave (filter op type / status zit op `/aanvragen`).
- 🛣 **Documentenbeheer per zaak** met versionering (FR-2.2) — datamodel ondersteunt het, UI nog niet.
- 🛣 **Correspondentie-log** in/uit (doc 06 Module 3) — alleen datamodel.
- 🛣 **Bewijsmateriaal-galerij** (foto's, video, audio, getuigenverklaringen) — wel in FPIC-events, niet in zaakdossier.
- 🛣 **GPS-punten met datum/bron** — datamodel klaar (LA_Source met `source_type=gps_track`).
- 🛣 **Landmeterstukken-categorie** (FR-2.5).

---

## 7. Module 6 — Grondhuur, Conversie & Vervallenverklaring

**Route:** `/grondhuur`
**Brondoc:** doc 18, FR-15
**Status:** ✅ **Gebouwd** (10 cases, 3 conversies, 2 vervallenverklaringen)

### 7.1 Doel

Levenscyclus **ná** uitgifte: verlenging, conversie naar eigendom (Besluit Grondconversie 2023), en vervallenverklaring met hoor & wederhoor. Dit ontbrak voorheen — voor Suriname een dagelijkse-praktijk-realiteit.

### 7.2 KPI-tegels ✅

- **Aflopend < 6 mnd / < 9 mnd / < 12 mnd** — reminderladder Decreet Uitgifte Domeingrond
- **In verlenging / in conversie** — actieve workflows
- **Achterstand totaal (SRD)** — som van openstaande jaarlijkse vergoedingen
- **Vervallen / voornemen** — forfeitures actief

### 7.3 Aflopende grondhuur — tabel ✅

Sortering op urgentie. Kolommen:
- PERCEELSID + tenure-ID + district
- Houder + holderId
- Doel + jaarlijkse vergoeding
- End date + looptijd (jaren)
- **Tijd tot afloop** met kleurcoding:
  - 🔴 < 6 mnd — wettelijke deadline (verlengingsverzoek vereist)
  - 🟠 < 9 mnd — 9-mnd reminder
  - 🟡 < 12 mnd — 12-mnd reminder
  - 📕 expired
- **Achterstand** in SRD (rood indien > 0)
- **Stukken-status** als 2 bolletjes (groen = aanwezig, rood = ontbreekt): hypothecair uittreksel, uitmetingskaart
- Status-badge

### 7.4 Conversie-aanvragen ✅

3 voorbeeld-cases (Besluit Grondconversie 2023):

| Case | Demonstreert |
|---|---|
| **CNV-2026-001** | Volledige stukken op orde — kan voor besluitvorming |
| **CNV-2026-002** | Hypothecair uittreksel ontbreekt → R-CONV-002 blokker |
| **CNV-2026-003** | Conversie raakt traditioneel gebied (CT-004) → R-CONV-010 → FPIC heropend |

Per case: motivatie, decisionStatus-badge, blokkades in rood vak, voorwaarden in goud vak.

### 7.5 Vervallenverklaringen ✅

Workflow conform doc 18 §18.6:
1. signalering → 2. hoor & wederhoor → 3. notice_of_intent → 4. objection_window (30 dagen) → 5. decision_pending → 6. forfeited / restored → 7. schadeloosstelling (Grondwet art. 34)

2 voorbeelden:
- **FRF-2026-001** — voornemen wegens SRD 4.750 achterstand
- **FRF-2025-014** — voltooid, geen schadeloosstelling (doelbinding geschonden)

### 7.6 Bijbehorende adviesregels ✅ (op `/regels`)

| Regel | Beschrijving | Weging | Blocker |
|---|---|---|---|
| R-CONV-001 | Conversie zonder PERCEELSID-kaart | 15 | ✓ |
| R-CONV-002 | Conversie zonder hypothecair uittreksel | 15 | ✓ |
| R-CONV-003 | Conversie met openstaande achterstanden | 15 | ✓ |
| R-CONV-010 | Conversie raakt traditioneel gebied → FPIC heropenen | 20 | — (trigger) |
| R-LIFE-001 | Aflopend < 6 mnd zonder verlengingsverzoek | 12 | ✓ |
| R-LIFE-002 | Achterstand → vervalrisico | 10 | — |

### 7.7 Demo-beperkingen / roadmap

- ⚠️ **Reminder-mailingen 12/9/6 mnd** zijn als statusvlag zichtbaar; in productie automatische mail/SMS naar houder + GBB-officer + MI-GLIS.
- 🛣 **Geautomatiseerde betaalkoppeling** (doc 18 §18.9)
- 🛣 **Geïntegreerde taxatie/CAMA** voor compensatie
- 🛣 **Volledige sjablonenbibliotheek** voor beschikkingen en kennisgevingen
- 🛣 **MI-GLIS-mutatie automatisch inschrijven** na vervallenverklaring

---

## 8. Module 7 — Milieu & NMA

**Route:** `/milieu`
**Brondoc:** doc 17, FR-16, Milieu Raamwet
**Status:** ✅ **Gebouwd** (4 EnvCases, 1 verontreinigd gebied, 1 rehabilitatieplan)

### 8.1 Doel

Milieu is geen optionele bijlage — het is een **werkstroom-trigger**. NMA (officieel gelanceerd juli 2024) is een eersterangs reviewer-rol; MEA-plicht blokkeert besluitvorming.

### 8.2 KPI-tegels ✅

- Open milieu-zaken (screening / mea_required / mer_in_review)
- Beschermde gebieden (uit dataset)
- Verontreinigde gebieden (nationaal register)
- NMA-reviewers actief

### 8.3 MEA-plicht-matrix ✅

5 activiteitstypes (doc 17 §17.9 / FR-16.1):

| Activiteit | MEA? | Drempel |
|---|---|---|
| Mijnbouw klein/middel | Ja | >2 ha verstoring of binnen beschermd gebied |
| Bosbouw concessie | Ja | ≥ 1.000 ha of nabij ITP-gebied |
| Landbouw grootschalig | Ja | >50 ha monocultuur |
| Bebouwing/bewoning | Nee | Tenzij in beschermd gebied |
| Industrie | Ja | Alle vergunningplichtige industrie |

### 8.4 MEA/SEA/MER-werkflow ✅

7-stappen-flow conform doc 17 §17.7: screening → scoping → MER opstellen → NMA-besluit → voorwaarden → monitoring → bij scope-wijziging heropen.

### 8.5 EnvCases ✅

4 voorbeeld-zaken met statussen `screening` / `mea_required` / `mer_in_review` / `conditional`:

| Case | Trigger | Status | Demonstreert |
|---|---|---|---|
| **ENV-2026-001** | Beschermd gebied-overlap | mer_in_review | Hard blocker, IACHR Kaliña-Lokono toets |
| **ENV-2026-002** | MEA-plicht (mijnbouw bij Galibi) | mea_required | Combinatie met FPIC |
| **ENV-2025-014** | Vergunningwijziging (mijnbouw uitbreiding) | conditional | Voorbeeld voorwaardelijke goedkeuring met 4 condities (Hg-lozing, kwartaalrapportage, rehab-plan, audit jaar 2/5) |
| **ENV-2026-003** | Conversie raakt traditioneel gebied | screening | Koppeling met grondhuur-module |

Per case: NMA-reviewer toegewezen, evidence-stukken, notities, voorwaarden indien van toepassing.

### 8.6 Verontreinigde gebieden ✅

Nationaal register conform Milieu Raamwet:
- **CS-001** — DEMO_Verlaten goudwasplaats Sipaliwini-Noord (kwik, hoog)

### 8.7 Rehabilitatieplannen ✅

1 voorbeeld:
- **REHAB-2025-001** — gekoppeld aan CS-001 op grond van **IACHR Kaliña-Lokono-verplichting**
- Mijlpalen 2025-2030: register-opname → bodemonderzoek → plan v1 → sanering eerste zone → eindrapport audit
- Voortgangsbalk + status per mijlpaal

### 8.8 NMA-reviewer-rol (RBAC + ABAC) ✅

Conform doc 17 §17.5:
- **Lezen:** geometrie, MEA/SEA/MER-info, beschermde gebieden, vergunningenregister, gekoppelde dossiers
- **Schrijven:** milieu-advies, voorwaarden, status `EnvCase`
- **Beslissen:** goedkeuring / afwijzing / voorwaarden op milieutoets
- **Niet zichtbaar:** FPIC-restricted documenten (tenzij expliciet gedeeld)

### 8.9 Adviesregels (op `/regels`) ✅

| Regel | Beschrijving | Weging | Blocker |
|---|---|---|---|
| R-ENV-010 | Aanvraag binnen beschermd gebied → NMA + MER | 18 | ✓ |
| R-ENV-020 | MEA-plicht zonder MER-status | 14 | ✓ |
| R-ENV-030 | Locatie in register verontreinigde gebieden | 8 | — |
| R-ENV-040 | Reservaat overlapt traditioneel gebied (Kaliña-Lokono) | 18 | — (FPIC + NMA) |

### 8.10 Demo-beperkingen / roadmap

- 🛣 **Realtime koppeling NMA-vergunningenregister** (FR-16.5, doc 13 Fase 2)
- 🛣 **Volledige rehabilitatiemonitor** met dashboard (doc 17 §17.9)
- 🛣 **SEA-werkstroom** voor overheidsplannen
- 🛣 **Integratie met rampenmeldingen** (Milieu Raamwet rampenbestrijdingsplannen)

---

## 9. Module 8 — Werkgroep-werkruimte

**Route:** `/werkgroep`
**Brondoc:** doc 02, doc 03 §3.2.2, FR-9, doc 14
**Status:** ✅ **Gebouwd** (read-only weergave) · ⚠️ **Bewerkbare formulieren**: roadmap

### 9.1 Doel

Operationele werkruimte voor de werkgroep zelf: vergaderingen, besluiten, actiepunten, mijlpalen, leden, fasen.

### 9.2 Wat je ziet

#### 9.2.1 Werkgroep-leden ✅
6 leden met initialen-avatars:
- **Edgar Dikan** — Voorzitter / Presidentieel adviseur
- **Armand Jurel** — decentralisatie
- **Theresia Cirino** — consultatie
- **Mike Nerkust** — inventarisatie & GIS
- **Martin Misiedjan** — juridisch
- **Sarwan Ramai** — decentralisatie

Conform doc 01 §1.3.

#### 9.2.2 Vergaderingen ✅
3 voorbeeld-vergaderingen (plenair en veldconsultatie):
- **MTG-2026-W18** — Plenair week 18 (4 mei 2026), 6 aanwezigen
- **MTG-2026-W17** — Plenair week 17 (27 april 2026), 5 aanwezigen
- **MTG-2026-VLD-DIITABIKI** — Veldconsultatie (2 mei 2026)

Per vergadering: type-badge (plenair / veldconsultatie / klankbord / stuur_president), datum (NL-stijl), locatie, expanderbare agenda + besluiten + acties.

#### 9.2.3 Fasen-balk F1-F5 ✅
Conform doc 02 §2.1 en doc 03 §3.4:
- **F1 — Constituering & scope** (voltooid)
- **F2 — Inventarisatie & data** (in uitvoering)
- **F3 — Consultatie & FPIC** (gestart)
- **F4 — Analyse & advies** (gepland)
- **F5 — Rapportage & overdracht** (gepland)

Voortgangsbalk per fase met `done/total` mijlpalen.

#### 9.2.4 Recente besluiten ✅
3 besluiten met:
- Besluit-ID (bv. BES-2026-018)
- Stemverhouding (X-Y-Z = voor-tegen-onthouding)
- Status (open / in_uitvoering / voltooid / ingetrokken)
- Outcome-tekst
- Gekoppelde dossiers

#### 9.2.5 Actiepunten ✅
10 voorbeeldacties met:
- Eigenaar (uit de 6 leden)
- Deadline (kleurgecodeerd: rood = achterstallig, oranje = ≤3 dagen, grijs = OK)
- Status-icoon (achterstallig / in_uitvoering / open / voltooid)

### 9.3 Demo-beperkingen / roadmap

- ⚠️ **Read-only**: nieuwe vergadering / besluit / actie aanmaken via UI komt in pilotfase. Datamodel + audit zijn klaar.
- 🛣 **Format consultatieverslag** (doc 02 §2.2.2 notulenformat)
- 🛣 **Documentenbibliotheek per werkstroom** (FR-9.2)
- 🛣 **Wekelijks/maandelijks rapport-export** als PDF (FR-9.4, doc 03 §3.5)
- 🛣 **Klankbord-feedback / commentaar-systeem** (doc 06)
- 🛣 **Persoonlijke werkbak** per lid (FR-7.5)
- 🛣 **Sneltoetsen** (`g d` etc. — doc-only voorbereiding)

---

## 10. Module 9 — Stakeholders & Communities

**Route:** `/stakeholders` (lijst) · `/stakeholders/[id]` (detail)
**Brondoc:** doc 11 §11.6, FR-12
**Status:** ✅ **Gebouwd**

### 10.1 Doel

Wie is betrokken, wie wordt geconsulteerd, wie heeft consent-rechten. ITP-gemeenschappen worden **gelijkwaardig** vermeld als overheid en koepelorganisaties — niet onderaan een lijst.

### 10.2 Categorieën ✅

Conform doc 11 §11.6.1:
- ITP-gemeenschap (5)
- ITP-koepelorganisatie (VIDS, KAMPOS)
- Overheid (GBB)
- Register / autoriteit (MI-GLIS, NMA)
- Politiek (DNA)
- Sector (concessiehouders)
- Civil society (NGO's)
- Internationaal (UN-Habitat, FAO, IDB)
- Academisch (AdeKUS)

### 10.3 ITP-gemeenschappen-sectie ✅

5 fictieve gemeenschappen, met goud-omringd kader:

| ID | Gemeenschap | Type | District | Granman | Bewoners | Taal |
|---|---|---|---|---|---|---|
| COM-001 | DEMO_Inheems_Galibi | Inheems | Marowijne | A. Petrusi | 1.240 | Kalina |
| COM-002 | DEMO_Tribaal_Brokopondo | Tribaal-Marron | Sipaliwini | C. Adjako | 870 | Saramaccaans |
| COM-003 | DEMO_Inheems_Wayana_Apetina | Inheems | Sipaliwini | J. Aloiké | 410 | Wayana |
| COM-004 | DEMO_Tribaal_Aukaans_Diitabiki | Tribaal-Marron | Marowijne | R. Misiedjan | 1.780 | Aukaans |
| COM-005 | DEMO_Inheems_Lokono_Cassipora | Inheems | Para | — | 320 | Lokono |

Per community: granman, kapiteins, basja's, populatie, taal, FPIC-contactpersoon.

### 10.4 Engagement-niveau ✅

Conform doc 11 §11.6.2:
- **Co-creatie / consent** (ITP-gemeenschappen, koepels)
- **Consult** (overheid, registers, sector)
- **Adviserend** (internationaal, academisch)
- **Informeren** (politiek, civil society)

### 10.5 Demo-beperkingen / roadmap

- ⚠️ **Engagement-plan per stakeholder** zichtbaar in datamodel maar niet bewerkbaar (basic-niveau, doc 06 Module 12)
- 🛣 **Contactlog** per stakeholder met datum/onderwerp/uitkomst
- 🛣 **Reisvergoeding-administratie** voor traditioneel gezag (doc 11 §11.6.2)

---

## 11. Module 10 — Audit Trail

**Route:** `/audit`
**Brondoc:** FR-11, doc 14 §14.5, doc 09 §9.4
**Status:** ✅ **Gebouwd** (read-only log met hash-keten-indicator)

### 11.1 Doel

**Audit-by-default**: elke wijziging in zaakstatus, geometrie, document, FPIC-status of besluit wordt onveranderbaar gelogd. Dit is de fundering tegen corruptie en voor IACHR-bestendigheid (doc 09 §9.1 principe 4).

### 11.2 Wat je ziet ✅

#### 11.2.1 KPI-tegels
- Totaal logregels (10 in demo)
- Unieke gebruikers (uit de 6 werkgroepleden)
- **Hash-keten integer: 100%** — niemand heeft de log geknoeid

#### 11.2.2 Tabel
Per logregel:
- Tijdstip (mono-font, sorteerbaar)
- Gebruiker (naam + ID)
- Actie-badge (Aanmaken / Wijzigen / Verwijderen / Geraadpleegd / Geëxporteerd / Aangemeld)
- Object (entityType + entityId)
- Beschrijving
- **Hash** (pseudo-deterministisch in demo, conform datamodel veld `hash_chain_prev` doc 8 §8.7.4)

### 11.3 Demo-beperkingen / roadmap

- 🛣 **Echte append-only opslag** (doc 14 §14.3) — apart database-schema in productie
- 🛣 **Periodieke hash-chaining** elke X uur (doc 11.7 / 14.5)
- 🛣 **Anomalie-detectie** (FR-11.3): snelle herhaalde wijzigingen, ongebruikelijke uren
- 🛣 **Externe ledger-verankering** (FR-11.4, doc 13 Fase 4 — Estland-model)
- 🛣 **Filtering** (gebruiker / datum / actie / object)
- 🛣 **CSV-export** voor onafhankelijke audit (doc 14 §14.5.3)
- 🛣 **Audit-rapport voor toezichthouder** (UN-Habitat / IACHR-NGO)

---

## 12. Module 11 — Adviesregels (transparantie)

**Route:** `/regels`
**Brondoc:** doc 10
**Status:** ✅ **Gebouwd** — alle 22 regels publiek leesbaar

### 12.1 Doel

**Geen black-box.** Elke regel die de adviesmotor toepast staat hier publiek — uitlegbaar voor burger, jurist, toezichthouder. Wijzigingen gaan via **Pull Request** met juridische review (geen ICT-handeling).

### 12.2 Wat je ziet ✅

#### 12.2.1 Risicoscore-formule
ASCII-codeblok met:
- Formule: Risico = ∑ (weging × waargenomen factor)
- Drempels:
  - 0–24: **Laag** — normale workflow
  - 25–49: **Middel** — senior review
  - 50–74: **Hoog** — juridisch + GIS review
  - 75–100: **Zeer hoog** — besluitblokkade tenzij override
- Hard blockers → niet besluitbaar ongeacht totaalsom

#### 12.2.2 Hard blockers-overzicht
Lijst met regel-IDs die altijd besluitvorming blokkeren.

#### 12.2.3 Regels per categorie
6 secties met eigen icoon:

| Categorie | Aantal regels (demo) | Doel |
|---|---|---|
| Administratief | 3 (R-ADM-001/002/003) | Compleetheid dossier |
| Juridisch | 5 (R-JUR-001/002/003 + R-ENV-020/030) | Procedure, recht, risico |
| Ruimtelijk | 4 (R-RUM-001/002/003 + R-ENV-010) | Overlap, bestemming |
| Sociaal / FPIC | 4 (R-SOC-001/002/003 + R-ENV-040) | Gemeenschap, IACHR-toets |
| Beleid | 2 (R-BEL-001/002) | Hotspots, nationaal belang |
| **Levenscyclus** | 6 (R-CONV-001/002/003/010 + R-LIFE-001/002) | Grondhuur, conversie, vervallen |

Per regel: ID (mono-font), weging-getal, BLOCKER-badge, → FPIC / → NMA trigger-badges, beschrijving.

### 12.3 Beheerprincipe ✅

Onderaan staat:
> **Beheer.** Wijzigingen aan deze regelset gaan via Pull Request met review door minstens één jurist en één werkgroeplid. Productieve versie wordt per omgeving gepind. Elke run logt de regelversie. Roadmap: ML-aanvulling met expliciete explainability — niet als vervanging.

Conform doc 10 §10.9 en NFR-1b.

### 12.4 Demo-beperkingen / roadmap

- ⚠️ **Regels in TypeScript** in plaats van YAML — voor de demo bewust simpeler. Doc 09 §9.3.6 voorziet **YAML in Git** met semver in productie.
- 🛣 **Configureerbaar zonder code** (FR-12.2, doc 06 Module 13)
- 🛣 **Audit van regelversies** met replay-test (doc 14 §14.5.4)
- 🛣 **ML-aanvulling met explainability (SHAP/LIME)** — alleen als aanvulling, doc 10 §10.10

---

## 13. Cross-cutting features

Sommige features lopen door meerdere modules heen.

### 13.1 De adviesmotor (regelgebaseerd) ✅

Doc 10. Zie [Module 11](#12-module-11--adviesregels-transparantie). Werkt op elke aanvraag in `/aanvragen/[id]`.

**Werking:**
1. Feature extractor leest case-data
2. Rule engine evalueert alle 22 regels
3. Findings worden gegroepeerd per categorie
4. Risk score = som van gewichten (max 100)
5. Hard blockers maken zaak `niet besluitbaar` ongeacht score
6. Aanbevelingstekst wordt automatisch opgesteld

### 13.2 PDF-export ✅

Doc 7 §7.6.6, FR-6.4. Browser-print-aanpak:
- Knop op `/aanvragen/[id]` → `window.print()`
- Print-CSS in `app/globals.css` verbergt sidebar, header, knoppen, kaart
- Print-only header met case-nummer + DEMO-disclaimer-voettekst
- Werkt in alle moderne browsers (Chrome, Firefox, Edge, Safari)
- Alternatief sneltoets: `Ctrl+P` / `Cmd+P` overal

### 13.3 DEMO-banner ✅

Conform doc 7 §7.8 / 14.3 RP-01: rechtsboven op elk scherm staat goud-omringd:
> ⚠ **DEMO — niet voor besluitvorming**
> Alle data fictief, gelabeld "DEMO_…"

### 13.4 Surinaamse overheidslook ✅

Conform doc 04 visie:
- Vlag-strepen-balk boven en onder elke pagina (groen-wit-rood-wit-groen)
- Wapen-look (CSS-only) met "SR" in goud op groen
- Kleurenpallet: `--sr-green-*` (vlag), `--sr-red-*` (vlag), `--sr-gold-*` (accent), `--sr-cream` (papier)

### 13.5 Audit-by-design ✅

Doc 09 §9.1 principe 4. Elke entiteit in datamodel heeft `created_at`, `updated_at`. Elk event wordt naar `auditLog` geschreven (in productie: append-only PostgreSQL-schema).

### 13.6 Federatieve mandaten ✅ (in datamodel)

Doc 15 §15.4. Het platform respecteert dat:
- **MI-GLIS** = master voor registergoederen
- **GBB / Domeinkantoor** = master voor domeingrond, beschikkingen, conversie
- **Beëdigd landmeter** = master voor geometrievoorstellen
- **NMA** = master voor milieubesluiten
- **DNA / wetgever** = master voor wetregimes
- **Traditioneel gezag** = master voor community-data + customary claims
- **Auditor** = read-only

In demo: één gebruiker met alle rollen, maar autorisatiemodel ligt klaar (RBAC + ABAC, FR-14, NFR-2.2).

### 13.7 Configureerbaar wetregime per zaak ✅ (in datamodel)

FR-19 / doc 15 §15.8. Elk dossier registreert onder welk regime het loopt:
```yaml
case_legal_regime:
  domeingrond_decreet_version: "1981"
  glis_inschrijvingsbesluit_version: "2025"
  collectieve_rechten_status: "ontwerp_dna_2019"
  privacy_regime: "ontwerp_2024"
  wro_regime: "ontwerp_2024"
```
Demo toont dit niet als bewerkbaar veld; data-modelmatig is het voorzien.

---

## 14. End-to-end workflows

Voorbeelden van hoe verschillende modules samen werken.

### 14.1 Nieuwe domeingrondaanvraag tot beschikking

```
1. Burger / loket    →  /aanvragen/nieuw  (intake)
                        ✅ Scenario-picker in demo
                        🛣 Volledig formulier in roadmap

2. Systeem           →  Adviesmotor draait alle 22 regels
                        ✅ Werkt: zie /aanvragen/[id]
                        Output: risicoscore + blockers + aanbeveling

3. Indien overlap ITP →  R-SOC-001 → FPIC-traject geopend
                        ✅ Zichtbaar in /fpic
                        Status: niet_gestart → identificatie_gezag → ...

4. Indien beschermd  →  R-ENV-010 → NMA-reviewtaak
                        ✅ Zichtbaar in /milieu (EnvCase)

5. Documenten check  →  R-ADM-001/002/003
                        ✅ Documenten-card op /aanvragen/[id]

6. Publicatie        →  Bezwaartermijn 30 dgn start
                        ✅ Zichtbaar als klok op detail-page

7. Bezwaar register  →  ⚠️ Basis: in datamodel, niet bewerkbaar UI
                        🛣 Volledig in pilot

8. Beschikking       →  Status → "beschikking" via workflow-strip
                        ⚠️ Status-update read-only in demo

9. MI-GLIS-mutatie   →  🛣 Roadmap fase 2 integratie

10. Audit-log        →  ✅ /audit (read-only weergave)
```

### 14.2 FPIC-traject doorlopen

```
1. Trigger           →  Aanvraag overlapt customary territory (R-SOC-001)
                        ✅ Adviesmotor zet automatisch FPIC-vereist

2. /fpic             →  FPIC_Process aangemaakt, status: niet_gestart
                        ✅ Zichtbaar in lijst

3. Identificatie     →  Werkstroom Consultatie inventariseert gezag
                        ✅ Status overgang in datamodel

4. Eerste contact    →  FPIC_Event type=info_provided
                        ✅ Voorbeeld in FPIC-002

5. Informatiepakket  →  In NL + lokale taal (Aukaans bv.)
                        ⚠️ Demo toont alleen NL

6. Reflectieperiode  →  Min 2 weken; gemeenschap bepaalt langer
                        ✅ Zichtbaar in tijdlijn

7. Consultatiesessies →  Plenair, deelgroepen, vrouwen, jongeren
                        ✅ Met evidence (foto/audio/video)

8. Besluit           →  instemming / voorwaardelijk / bezwaar / ...
                        ✅ 9 statussen werken

9. Vastlegging       →  Audit-trail koppelt aan case
                        ✅ /audit toont fpic_event-records

10. Terugkoppeling   →  Wat met input gedaan
                        ⚠️ Datamodel klaar, UI roadmap
```

### 14.3 Grondhuur-verlenging

```
1. 12 mnd voor end_date  →  Reminder aan houder + GBB + MI-GLIS
                            ✅ Status `expiring`, kleurcodering
                            🛣 E-mail/SMS in productie

2. 9 mnd                 →  Tweede reminder
                            ✅ Tabel-kleur oranje

3. 6 mnd (wettelijk)     →  Verlengingsverzoek vereist (Decreet)
                            ✅ Tabel-kleur rood

4. Verzoek ingediend     →  Document-check: hypothecair uittreksel,
                            betalingsbewijs, uitmetingskaart PERCEELSID
                            ✅ Stukken-bolletjes op /grondhuur

5. Achterstanden-check   →  arrears_amount = 0 vereist
                            ✅ Kolom in tabel

6. Overlap/conflict      →  Adviesmotor R-CONV-* / R-SOC-001 etc.
                            ✅ Werkt

7. FPIC-check            →  Indien overlap traditioneel: FPIC heropenen
                            ✅ Zie TEN-007 / CNV-2026-003

8. Milieu-check          →  Indien activiteit gewijzigd: NMA-review
                            ✅ ENV-2026-003 voorbeeld

9. Beschikking           →  Verleng; nieuwe end_date; nieuwe versie
                            🛣 In productie automatisch

10. MI-GLIS-inschrijving →  Stuk inschrijven conform Besluit GLIS 2025
                            🛣 Roadmap fase 2
```

### 14.4 Conversie naar eigendom (Besluit Grondconversie 2023)

```
1. Aanvraag conversie   →  TEN-005 / TEN-006 / TEN-007 voorbeelden
                           ✅ Zichtbaar op /grondhuur

2. Verplichte stukken   →  PERCEELSID-kaart, hypothecair uittreksel,
                           betalingsbewijs, identiteit (Besluit GLIS 2025)
                           ✅ Bolletjes-systeem op tabel

3. Validatieregels      →  R-CONV-001/002/003 alle hard blockers
                           ✅ Zie /regels

4. FPIC-trigger         →  R-CONV-010 indien overlap CT-*
                           ✅ TEN-007 voorbeeld

5. Besluit              →  Aangevraagd / in_onderzoek / goedgekeurd /
                           afgewezen / voorwaardelijk
                           ✅ Status-kleur badges

6. Voorwaarden          →  Bv. nazorgperiode, restschuld
                           ✅ Goud-vak op aanvraag

7. MI-GLIS-mutatie      →  🛣 Roadmap

8. Audit                →  ✅ Hash-chain in /audit
```

### 14.5 Vervallenverklaring (forfeiture)

```
1. Signalering         →  Achterstand/niet-naleving/klacht
                          ✅ FRF-2026-001 voorbeeld

2. Hoor & wederhoor    →  Houder krijgt termijn
                          ✅ Status `hoor_wederhoor`

3. Voornemen vervallen →  Schriftelijke kennisgeving
                          ✅ Status `notice_of_intent`

4. Bezwaarperiode      →  30 dagen
                          ✅ Status `objection_window`

5. Beschikking         →  Vervallenverklaring of restored
                          ✅ FRF-2025-014 voorbeeld (forfeited)

6. Schadeloosstelling  →  Grondwet art. 34
                          ✅ compensationAmount-veld

7. MI-GLIS-mutatie     →  🛣 Perceel terug beschikbaar
                          (roadmap fase 2)
```

---

## 15. Rollen en autorisatie

### 15.1 Demo-rollen

In de demo log je in als één persoon: **"Edgar Dikan, Voorzitter werkgroep"**. Alle modules zijn zichtbaar. Geen echte authenticatie.

### 15.2 Productie-rollen (RBAC, doc 09 §9.5)

| Rol | Kaart | Dossier | Aanvraag wijz. | Adviesmotor | FPIC-data | Audit-export |
|---|---|---|---|---|---|---|
| `viewer` (publiek) | R (publiek) | — | — | — | — | — |
| `ambtenaar` (GBB/Domeinkantoor) | R/W | R/W eigen | W | run | R algemeen | — |
| `werkgroep_lid` | R/W | R/W | W | run | R | — |
| `consult_partner` (ITP-vert.) | R | R eigen comm | — | — | R/W eigen | — |
| `secretariaat` | R/W | R/W | W | run | R | export op verzoek |
| `nma_reviewer` | R | R env-cases | W env | — | — | — |
| `admin` | R/W | R/W | W | configureren | R | export |

Conform doc 15 §15.4 federatief mandaatmodel.

### 15.3 Attribute-Based Access Control (ABAC)

Naast RBAC ook attribuut-controle (doc 15 §15.5):
- **`sensitivity_level`**: sacred sites alleen need-to-know
- **`classification`**: PII gemaskeerd in publieke kaartlaag
- **`community_id`**: ITP-vertegenwoordiger ziet alleen eigen community
- **`fpic_restricted`**: alleen geautoriseerde rollen tijdens lopend FPIC

### 15.4 Roadmap

- 🛣 **Keycloak SSO/OIDC** (doc 09 §9.3.4)
- 🛣 **Surinaamse Digitale-ID-koppeling** (doc 12 NDS 2023-2030)
- 🛣 **MFA verplicht** voor `ambtenaar+`
- 🛣 **Audit-export richting toezichthouder** (UN-Habitat / IACHR-volgende NGO)

---

## 16. Wat zit er WEL in (volledig)

### 16.1 Volledige route-map

| Route | Module | Status |
|---|---|---|
| `/` | Executive Dashboard | ✅ |
| `/kaart` | GIS-kaart | ✅ |
| `/aanvragen` | Aanvragen-lijst | ✅ |
| `/aanvragen/nieuw` | Scenario-picker | ✅ |
| `/aanvragen/[id]` | Detail + advies + PDF | ✅ |
| `/fpic` | FPIC-trajecten lijst | ✅ |
| `/fpic/[id]` | FPIC-traject detail | ✅ |
| `/dossiers` | Per district | ✅ |
| `/grondhuur` | Levenscyclus + conversie + vervallen | ✅ NIEUW |
| `/milieu` | NMA + EnvCases + rehab | ✅ NIEUW |
| `/werkgroep` | Vergaderingen, besluiten, acties, mijlpalen | ✅ |
| `/stakeholders` | Categorieën + ITP-communities | ✅ |
| `/stakeholders/[id]` | Stakeholder-detail | ✅ |
| `/audit` | Audit Trail | ✅ |
| `/regels` | 22 regels | ✅ |

**Totaal: 15 routes, alle 15 in build.**

### 16.2 Volledige feature-checklist (per requirements-doc)

| Code | Requirement | Status |
|---|---|---|
| FR-1.1 | Aanvraag online starten + concept | ⚠️ Scenario-picker in demo |
| FR-1.2 | 2 aanvraagtypes (specifiek/algemeen) | ✅ Datamodel |
| FR-1.3 | Verplichte velden | ✅ Datamodel |
| FR-1.4 | Document-upload | 🛣 |
| FR-1.5 | Signaleer ontbrekende docs | ✅ R-ADM-001/002/003 |
| FR-1.6 | PERCEELSID-validatie | 🛣 |
| FR-1.7 | Besluit GLIS 2025-validatie | 🛣 |
| FR-1.8 | Bevestiging + zaaknummer | 🛣 |
| FR-1.9 | Mobiele app + GPS | 🛣 (Fase 3) |
| FR-2.1 | Digitaal dossier | ✅ |
| FR-2.2 | Versionering | 🛣 |
| FR-2.3 | 9 statussen | ✅ Workflow-strip |
| FR-2.4 | Audit trail | ✅ |
| FR-2.5 | Tagging op district/type/risico | ✅ |
| FR-3.1 | Interactieve kaart 7 lagen | ✅ |
| FR-3.2 | Pan, zoom, lagen, klik-info | ✅ |
| FR-3.3 | Import GeoJSON/Shapefile/KML | 🛣 |
| FR-3.4 | Tekenfunctie | 🛣 |
| FR-3.5 | Export naar PDF | ✅ Adviesrapport-PDF |
| FR-3.6 | Tijdslider 4D | 🛣 (Fase 4) |
| FR-3.7 | Satellietachtergrond | 🛣 |
| FR-4.1 | Auto overlap-check | ✅ |
| FR-4.2 | Lijst overlappingen + % | ✅ Hardcoded in demo-data |
| FR-4.3 | Overlapsoort onderscheid | ✅ |
| FR-4.4 | Topologie-validatie | 🛣 |
| FR-4.5 | Visuele overlap op kaart | ✅ |
| FR-5.1 | Score laag/middel/hoog | ✅ + zeer_hoog |
| FR-5.2 | Score herleidbaar | ✅ Per regel-ID |
| FR-5.3 | Geschiedenis scores | 🛣 |
| FR-6.1 | Adviesrapport | ✅ |
| FR-6.2 | 5 categorieën | ✅ + lifecycle = 6 |
| FR-6.3 | Onderbouwing per advies | ✅ |
| FR-6.4 | Export PDF + markdown | ✅ PDF (markdown 🛣) |
| FR-6.5 | LLM-uitleg | 🛣 (Fase 4) |
| FR-7.1 | Open dossiers + doorlooptijd | ✅ |
| FR-7.2 | Filter district/status/risico | ⚠️ basis |
| FR-7.3 | Conflict-hotspots op kaart | ⚠️ basis |
| FR-7.4 | CSV/PDF-export | 🛣 (PDF advies wel) |
| FR-7.5 | Persoonlijke werkbak | 🛣 |
| FR-8.1 | Gemeenschap + gezag-registratie | ✅ |
| FR-8.2 | Consultatiemomenten + bewijs | ✅ FPIC-events |
| FR-8.3 | 9 FPIC-statussen | ✅ |
| FR-8.4 | Documenten in lokale taal | ⚠️ Tagging klaar, vertaling 🛣 |
| FR-8.5 | Bezwaar/voorwaarden | ✅ Voorwaarden, bezwaar 🛣 |
| FR-8.6 | Voorwaardelijk/ingetrokken | ✅ |
| FR-9.1 | Agenda/notulen/besluiten/acties | ✅ Read-only |
| FR-9.2 | Documentenbibliotheek | 🛣 |
| FR-9.3 | Dashboard | ✅ |
| FR-9.4 | Wekelijks/maandelijks export | 🛣 |
| FR-10.x | Publiek portaal | 🛣 (Fase 3) |
| FR-11.1 | Onveranderlijk auditlog | ✅ |
| FR-11.2 | Toegangscontrole per rol | 🛣 (datamodel klaar) |
| FR-11.3 | Anomalie-alarmen | 🛣 |
| FR-11.4 | Externe ledger | 🛣 (Fase 4) |
| FR-12.1 | Regelgebaseerd, transparant | ✅ |
| FR-12.2 | Configureerbaar | 🛣 (in code in demo) |
| FR-12.3 | Audit van regelversies | ✅ versie-pinning |
| FR-12.4 | ML-aanvulling | 🛣 (Fase 4) |
| FR-13.x | Realtime integraties | 🛣 (Fase 2) |
| FR-14.1 | Mandaatscheiding MI-GLIS↔GBB | ✅ datamodel |
| FR-14.2 | Beslissing per orgaan | ✅ datamodel |
| FR-14.3 | Authoritative source | ✅ datamodel |
| FR-15.1 | Grondhuur 15-40 jr validatie | ✅ |
| FR-15.2 | Reminders 12/9/6 mnd | ✅ |
| FR-15.3 | Late verzoeken markeren | ✅ |
| FR-15.4 | Conversie-workflow | ✅ |
| FR-15.5 | Vervallenverklaring-workflow | ✅ |
| FR-16.1 | Milieu-triggers | ✅ |
| FR-16.2 | MEA hard blocker | ✅ R-ENV-020 |
| FR-16.3 | NMA-reviewer rol | ✅ datamodel + UI |
| FR-16.4 | Rehabilitatieplan | ✅ |
| FR-16.5 | Realtime NMA-koppeling | 🛣 (Fase 2) |
| FR-17.1 | 30-daagse bezwaartermijn | ✅ |
| FR-17.2 | Blokkade tot termijn verstreken | ✅ |
| FR-17.3 | Bezwarenregister | 🛣 |
| FR-17.4 | Publieke kennisgeving filter | 🛣 |
| FR-18.x | Document PKI/QR-verificatie | 🛣 |
| FR-19.1 | Wetregime per zaak | ✅ datamodel |
| FR-19.2 | Regelset uitwisselbaar | ⚠️ in code |

---

## 17. Wat zit er NIET in (roadmap)

Zie [doc 13](../docs/13-roadmap.md) voor de volledige roadmap. Hieronder de hoofdcategorieën:

### 17.1 Fase 1 — Pilot in één district (~6 mnd)

- Echte (geanonimiseerde) data importeren
- Echte FPIC-trajecten met instemming gemeenschap
- Performance- en beveiligingsaudit
- Privacy Impact Assessment (PIA)
- Gebruikerstrainingen
- Productie-runbook
- Onafhankelijke security review

### 17.2 Fase 2 — Integraties (~9 mnd na pilot)

- 🛣 **Bidirectionele MI-GLIS-koppeling**
- 🛣 **Domeinkantoor / GBB-koppeling**
- 🛣 **Concessieregisters NH/GMD/SBB**
- 🛣 **Identiteitsregister / e-ID / DBZ-CBA**
- 🛣 **NMA-vergunningenregister**
- 🛣 **Adressenregister**
- 🛣 **WRO-bestemmingenregister**
- 🛣 **OGC API – Features volledig conform**
- 🛣 **Open data-portaal publiek**
- 🛣 **Volledige meertaligheid** (NL + Sranantongo + ITP-talen)

### 17.3 Fase 3 — Burgerdiensten en velddata (~12 mnd)

- 🛣 **Burgerportaal** (digitale aanvraag, status volgen, bezwaar online, document-upload, meldingen)
- 🛣 **Veldwerk-app** (mobiel, Android/iOS, GPS-track, foto/audio/video, FPIC offline, sync bij connectiviteit, ≥7 dagen offline)
- 🛣 **Identiteitsverificatie** eIDAS-achtig (NFC, biometrie)
- 🛣 **AI-OCR documentanalyse** voor automatische metadata-extractie
- 🛣 **Online Dispute Resolution (ODR)**-module
- 🛣 **AML/KYC** voor partijen-screening
- 🛣 **PII auto-redactie** voor publieke documenten
- 🛣 **Push-notificaties** SMS/e-mail/WhatsApp

### 17.4 Fase 4 — Maturity, Ledger, AI

- 🛣 **Hash-verankering op externe ledger** (Estland-model)
- 🛣 **Smart contracts** voor automatische uitvoering
- 🛣 **CAMA-module** voor massataxatie
- 🛣 **3D-cadaster** voor stedelijke gebieden + mijnbouw
- 🛣 **AI explainability laag** boven adviesmotor (SHAP/LIME)
- 🛣 **Geautomatiseerde beleidsbriefings**
- 🛣 **Internationale interoperabiliteit** (INSPIRE-achtig)
- 🛣 **Grensoverschrijdende samenwerking** (Frans-Guyana, Guyana)

---

## 18. Veelgestelde vragen

### Wat als ik niet kan inloggen?
In de demo is geen echte login — je gaat direct naar `/`. Bij hosting-issues: secretariaat van de werkgroep.

### Mag ik echte cliëntgegevens invoeren?
**Nee.** Demo-data alleen, met `DEMO_…`-labels. Echte data vanaf pilotfase, met PIA en data-overeenkomst.

### Mijn wijziging is verdwenen na refresh.
Dat klopt — demo is **niet persistent**. In productie wordt elke wijziging gelogd (append-only) en in PostgreSQL persistent gemaakt.

### Het systeem zegt FPIC vereist — moet ik nu echt naar het binnenland?
In demo: nee, simuleren. In productie: ja, FPIC is geen formaliteit. UNDRIP, IACHR Saramaka & Kaliña-Lokono eisen vrije, voorafgaande, geïnformeerde instemming.

### Wat als ik denk dat de adviesmotor verkeerd adviseert?
Geef feedback aan secretariaat met:
- case-nummer
- regel-ID
- juridisch/feitelijk argument

Bij gegrondheid: PR voor regelwijziging met juridische review (doc 10 §10.9).

### Wat als de wet verandert?
Adviesregels zijn versioneerd; ruleset-versie wordt **per zaak gepind** (doc 15 §15.8). Lopende zaken vallen niet plotseling onder ander regime.

### Vervangt SGDP MI-GLIS?
**Nee.** Federatief: MI-GLIS = master voor register; GBB = master voor domeingrond; NMA = master voor milieu. SGDP koppelt en orchestreert (doc 15 §15.4 / FR-14).

### Is dit AI?
**Nee.** Regelgebaseerd. Alle 22 regels staan publiek op `/regels`. ML-aanvulling pas in roadmap fase 4, **mét** explainability — niet als vervanging.

### Wat met privacy van indieners?
- Doelbinding + dataminimalisatie (doc 02 §2.6.3, NFR-3)
- RBAC + ABAC met classificaties `public` / `internal` / `confidential` / `fpic_restricted`
- PII gemaskeerd in publieke kaartlaag
- Logging van alle toegang tot gevoelige data

### Hoe komen ITP-gemeenschappen erin?
Alleen na FPIC met die gemeenschap zelf. Demo-data is volledig fictief. Doc 11 §11.10 / doc 7 §7.4.

### Wat kost het?
- Demo: minimaal (open-source stack, single-tenant)
- Pilot: nationale + IDB / UN-Habitat / EU-fondsen
- Productie: structurele begroting, evt. leges-cofinanciering
- Geen vendor lock-in

### Wat als de werkgroep wisselt?
Documentatie + audit-trail maken overdracht mogelijk (doc 14 RW-10).

### Mag pers in de demo?
Alleen via voorzitter (doc 02 §2.5.2 — communicatieprincipes). Demo-data is fictief, dus geen privacy-issue, maar verkeerde indruk vermijden.

---

## 19. Begrippenlijst

Beknopt; volledige lijst in [doc 12 §12.5](../docs/12-standaarden-referenties.md).

| Term | Betekenis |
|---|---|
| **SGDP** | Suriname Grondenrechten & Decentralisatie Platform |
| **FPIC** | Free, Prior, Informed Consent (vrije, voorafgaande, geïnformeerde instemming) |
| **ITP** | Inheemse en Tribale Volken |
| **VIDS** | Vereniging van Inheemse Dorpshoofden in Suriname |
| **KAMPOS** | Marrons-koepelorganisatie van traditioneel gezag |
| **MI-GLIS** | Management Instituut Grond Registratie en Land Informatie Systeem |
| **GBB** | Ministerie van Grond- en Bosbeheer (incl. Domeinkantoor) |
| **NMA** | Nationale Milieu Autoriteit (sinds juli 2024) |
| **DNA** | De Nationale Assemblée |
| **IACHR** | Inter-Amerikaans Hof voor de Rechten van de Mens |
| **PERCEELSID** | Unieke perceelsidentificatie in GLIS-stukken |
| **MEA / MER / SEA** | Milieueffectanalyse / -rapport / Strategic Environmental Assessment |
| **LADM** | Land Administration Domain Model (ISO 19152) |
| **STDM** | Social Tenure Domain Model (UN-Habitat) |
| **FFP-LA** | Fit-for-Purpose Land Administration |
| **RBAC / ABAC** | Role/Attribute-Based Access Control |
| **PKI / QR** | Public Key Infrastructure + QR-code-verificatie |
| **OIDC / SSO** | OpenID Connect / Single Sign-On |
| **PostGIS** | Geo-extensie voor PostgreSQL |
| **OGC** | Open Geospatial Consortium |
| **WCAG** | Web Content Accessibility Guidelines |
| **CAMA** | Computer-Assisted Mass Appraisal |

---

## Hulp en feedback

| Onderwerp | Waar |
|---|---|
| Bug in demo | Secretariaat — incl. screenshot + URL + tijdstip |
| Feature-aanvraag | Secretariaat — wordt geprioriteerd in roadmap |
| Vraag over een regel | Werkstroom Juridisch (Martin Misiedjan) |
| Vraag over FPIC | Werkstroom Consultatie (Theresia Cirino) |
| Vraag over kaart/inventarisatie | Werkstroom Inv & GIS (Mike Nerkust) |
| Veiligheidsincident | Voorzitter (Edgar Dikan) |

---

**Versie:** 2.0 (volledig) · 9 mei 2026 · Republiek Suriname · Werkarm van het Staatshoofd

**Onderliggende docs:** docs/01 t/m docs/18 in projectroot. Deze handleiding loopt elke feature af die daar beschreven staat.

**Bouwstatus:** 15 routes draaien, build groen, ruleset 1.0.0 met 22 regels in 6 categorieën.
