# Wat kun je van SGDP verwachten?

> **Voor:** iedereen die SGDP voor het eerst ziet — president, werkgroep, ambtenaar, jurist, landmeter, ITP-gemeenschap, burger, pers, toezichthouder, internationale partner.
>
> **Doel:** per rol concreet maken wat het platform jou levert, wat verandert ten opzichte van vandaag, en wat (nog) niet kan. Geen marketing — eerlijk wat de demo aantoont en wat in de roadmap zit.

---

## Inhoud

1. [De President](#1-de-president)
2. [De Werkgroep Grondenrechten en Decentralisatie](#2-de-werkgroep-grondenrechten-en-decentralisatie)
3. [Ambtenaar GBB / Domeinkantoor](#3-ambtenaar-gbb--domeinkantoor)
4. [MI-GLIS](#4-mi-glis)
5. [NMA-reviewer](#5-nma-reviewer)
6. [Jurist](#6-jurist)
7. [Beëdigd landmeter](#7-beëdigd-landmeter)
8. [ITP-gemeenschap (granman, kapitein, basja, dorpsraad)](#8-itp-gemeenschap-granman-kapitein-basja-dorpsraad)
9. [VIDS / KAMPOS](#9-vids--kampos)
10. [Burger / aanvrager](#10-burger--aanvrager)
11. [Pers en publiek](#11-pers-en-publiek)
12. [Auditor / IACHR / onafhankelijke toezichthouder](#12-auditor--iachr--onafhankelijke-toezichthouder)
13. [Concessiehouder](#13-concessiehouder)
14. [Internationale partners (UN-Habitat, FAO, IDB)](#14-internationale-partners)
15. [Veiligheid en privacy — wat gebeurt er met mijn data?](#15-veiligheid-en-privacy)
16. [Wat verandert er vergeleken met vandaag?](#16-wat-verandert-er-vergeleken-met-vandaag)
17. [Roadmap — wat staat klaar wanneer?](#17-roadmap--wat-staat-klaar-wanneer)
18. [Wat als ik een fout zie?](#18-wat-als-ik-een-fout-zie)
19. [Lessen uit andere landen](#19-lessen-uit-andere-landen)
20. [Wat SGDP nadrukkelijk NIET is](#20-wat-sgdp-nadrukkelijk-niet-is)

---

## 1. De President

### 1.1 Wat je krijgt

**Eén scherm, één waarheid.** Het Executive Dashboard (`/`) toont in real-time:
- Voortgang fase F1-F5 (waar staat de werkgroep, exact)
- 4 KPI's (ITP-inventarisatie, dossiers, FPIC, actiepunten)
- Top-4 hoog-risico dossiers met klikbare details
- Komende mijlpalen met deadlines
- Lopende besluiten van de werkgroep met stemverhouding
- Top-3 strategische risico's

### 1.2 Wat je nu **niet** krijgt zonder dit systeem

Vandaag werkt advies aan de President via:
- E-mails met PDF-bijlagen die niet doorzoekbaar zijn
- Spreadsheets in 5 verschillende ministeries die niet matchen
- Mondelinge briefings waarbij niemand weet welke data is gebruikt
- Geen herleidbaarheid: *waarom* werd zaak X anders behandeld dan zaak Y?

### 1.3 Wat verandert

| Vandaag | Met SGDP |
|---|---|
| Maandbrief van werkgroep, ~6 pagina's PDF | Real-time dashboard + maandbrief, met klikbare onderbouwing |
| "Ik ga die zaak even checken" → 3 dagen wachten | Direct kijk je in `/aanvragen/[id]` mee |
| Pers vraagt: "wat is jullie beleid?" → onduidelijk | Pers wordt verwezen naar publieke `/regels` |
| IACHR-klacht → maanden bewijs verzamelen | Audit-trail levert het in een dag |

### 1.4 Wat je niet alleen kunt doen

Het systeem **adviseert**, het **beslist niet**. Een Presidentieel besluit blijft jouw afweging, met ministerieel beslisser/wetgever in de keten. SGDP zorgt dat dat besluit **goed onderbouwd** is.

---

## 2. De Werkgroep Grondenrechten en Decentralisatie

### 2.1 Wat je krijgt

Een **40-weken werkomgeving** waar het mandaat (doc 01 §1.1) operationeel wordt:

- **Werkruimte (`/werkgroep`)** — vergaderingen, agenda, besluiten met stemverhouding, actiepunten met deadline-bewaking, fasenbalk F1-F5
- **Inventarisatie (`/kaart`, `/dossiers`)** — alle bekende rechten, claims, concessies, beschermde gebieden, ITP-territorium in één kaart
- **Conflictdetectie** — adviesmotor signaleert overlap/issues automatisch
- **FPIC-werkomgeving** — IACHR-bestendige consultatieregistratie met evidence (audio/video/foto/handtekening)
- **Stakeholderregister** — VIDS, KAMPOS, MI-GLIS, NMA, traditioneel gezag op één plek
- **Audit-trail** — bewijs voor latere overdracht of toetsing

### 2.2 Wat verandert per werkstroom

| Werkstroom (doc 01 §1.4) | Vandaag | Met SGDP |
|---|---|---|
| **Juridisch & Wetgeving** | Word-documenten, legalcommentaarboeken | Wetregime per zaak gepind, 22 regels publiek + versioneerd, IACHR-checks ingebakken |
| **Inventarisatie & GIS** | Shapefiles in mappen, geen integratie | LADM/STDM-datamodel, PostGIS-overlap, FFP-LA-precisie |
| **Consultatie & FPIC** | Notulen in ordners, audio-cassettes | 9 statussen, events met evidence, mandaatregister legitieme vertegenwoordiging |
| **Decentralisatie** | Onduidelijk wie wat mag | Federatief mandaatmodel met RBAC + ABAC |

### 2.3 Acceptatiecriteria voor deze demo (doc 7 §7.6)

Zes criteria, allemaal nu haalbaar in de demo:

1. ✅ MUST-items FR-1 t/m FR-9, FR-11, FR-12 functioneren
2. ✅ Een testaanvraag binnen 5 sec → risicoscore + rapport
3. ⚠️ Werkgroep-lid kan dossier vinden, notulen-besluit registreren, actiepunt toewijzen, rapport van de week exporteren — **lezen werkt, schrijven via UI is roadmap**
4. ✅ Audit-trail toont wijzigingen herleidbaar
5. ✅ Gebruikershandleiding NL aanwezig (`GEBRUIKERSHANDLEIDING.md`)
6. ✅ Demo-script 10-min walkthrough (`DEMO-SCRIPT.md`)

### 2.4 Mijlpalen die SGDP ondersteunt (doc 03 §3.4)

- **M2.3** — Concessielaag, MI-GLIS-laag, ITP-laag samengevoegd → in `/kaart`
- **M3.2** — 50% gebieden FPIC-traject gestart → tracking in `/fpic`
- **M4.1** — Conflictanalyse rapport → adviesmotor + PDF-export
- **M5.1** — Eindadvies definitief → werkgroep-werkruimte + audit

---

## 3. Ambtenaar GBB / Domeinkantoor

### 3.1 Wat je krijgt

Een **werkbalkje voor je dagelijkse zaken**:

- **`/aanvragen`** — lijst van alle dossiers met filtering op district / status / risico
- **`/aanvragen/nieuw`** — intake-formulier (in productie); demo: scenario-picker
- **`/aanvragen/[id]`** — alles per zaak: documenten, kaart, advies, FPIC-status, bezwaartermijn, juridische basis, PDF-export
- **`/dossiers`** — per district groepering
- **`/grondhuur`** — levenscyclus-management: reminders 12/9/6 mnd, conversies, vervallenverklaringen

### 3.2 Wat verandert in jouw dag

| Vandaag | Met SGDP |
|---|---|
| Aanvraag binnen → handmatig MI-GLIS bellen voor PERCEELSID-check | Real-time validatie bij intake |
| Polygoon van indiener handmatig vergelijken met concessies via 3 systemen | 1 sec spatial query: alle overlap zichtbaar |
| Wel/niet-besluitbaar → eigen oordeel, soms inconsistent | 22 regels die universeel toegepast worden |
| Beschikking schrijven → Word-template + handmatige juridische verwijzingen | Auto-gegenereerd adviesrapport als basis |
| Status-updates per e-mail aan indiener | Burgerportaal (roadmap fase 3) |

### 3.3 Veiligheidsnet

- Adviezen zijn **adviserend**, niet bindend (doc 10 §10.8)
- Override mag, **mits gemotiveerd** + audit-gelogd
- Senior review bij score 25-49, jurist + GIS bij 50+
- Hard blockers maken besluit-knop onbeschikbaar, niet onmogelijk (override-pad bestaat)

### 3.4 Wat je niet hoeft te doen

- **Niet zelf de wetten kennen** — adviesmotor doet de eerste check
- **Niet handmatig overlap zoeken** — PostGIS doet het
- **Niet handmatig FPIC-traject starten** — adviesmotor triggert + werkstroom Consultatie pakt op
- **Niet handmatig de NMA bellen** — EnvCase wordt automatisch aangemaakt bij triggers

---

## 4. MI-GLIS

### 4.1 Wat je krijgt

**Geen vervanging.** SGDP is **federatief** (doc 15 §15.4 / FR-14):
> *MI-GLIS blijft authoritative source voor het register; SGDP koppelt en orchestreert.*

Wat je wel krijgt:
- **Bidirectionele API-koppeling** (roadmap fase 2): SGDP leest registergoederen voor overlap-checks; SGDP schrijft mutaties terug bij beschikkingen
- **Datavalidatie aan de bron** — fouten worden bij intake gevangen, niet pas bij inschrijving
- **Audit-trail aan SGDP-kant** — wat heeft SGDP gevraagd en wanneer
- **Federatief mandaat** — niemand grijpt over je bevoegdheid

### 4.2 Wat lost dit op voor jou

| Vandaag | Met SGDP-koppeling |
|---|---|
| Inschrijvingen die later blijken te overlappen met dorpsgebied | Bij intake al rood — zaak komt niet eens bij jou |
| Domeingrond-beschikking die niet overeenkomt met perceeldata | Schemavalidatie bij intake (Besluit GLIS 2025) |
| Burger belt: "wat is de status?" → handmatig opzoeken | Burgerportaal (roadmap) → status volgen op zaaknummer |
| Hypothecaire info per fax of e-mail | Direct bevraagbaar via API bij conversie |

### 4.3 Wat je behoudt

- Authority over de registergoederen
- Beslisrecht op registerinschrijving
- Eigen processen en governance
- Eigen interface (SGDP is **bovenop**, niet **in plaats van**)

---

## 5. NMA-reviewer

### 5.1 Wat je krijgt

Een dedicated rol met dedicated workflow (`/milieu`):

- **EnvCase**-werkomgeving — alle milieu-zaken die op jou wachten
- **MEA-plicht-matrix** — 5 activiteitstypes × drempels — geconfigureerd, niet hardcoded
- **MER-review-workflow** — screening → scoping → review → besluit → voorwaarden → monitoring
- **Verontreinigde gebieden-register** — visuele kaart-laag
- **Rehabilitatieplan-tracking** — IACHR-Kaliña-Lokono-verplichtingen + voortgangsmijlpalen
- **RBAC + ABAC** — je ziet milieu-data, niet FPIC-restricted documenten (tenzij gedeeld)

### 5.2 Wat verandert

| Vandaag | Met SGDP |
|---|---|
| Aanvraag komt te laat bij NMA — beschikking is al af | Adviesmotor triggert bij intake, hard blocker tot MER |
| MEA-screening per casus | 5-types-matrix als regel-basis |
| Rehabilitatie-tracking in spreadsheet | Mijlpalen-dashboard met percentage |
| Beschermd gebied → handmatig kaartcheck | PostGIS spatial query met R-ENV-010 |

### 5.3 Wat blijft jouw werk

Je bent en blijft de **autoriteit op milieutoetsing**. Je tekent het besluit, je schrijft de voorwaarden. SGDP zorgt dat je de **goede informatie op het goede moment** krijgt.

---

## 6. Jurist

### 6.1 Wat je krijgt

**Wetstoetsing als datalaag, niet als ad-hoc onderzoek.**

- **22 regels = 16 compliance-checks** (doc 15 §15.3) — Grondwet art. 34/41, Wet GLIS, Decreet UD, Besluit GLIS 2025, Besluit Grondconversie 2023, Milieu Raamwet, IACHR Saramaka + Kaliña-Lokono, ontwerpwetten ITP/WRO/privacy
- **Wetregime per zaak** (doc 15 §15.8) — geconfigureerd YAML, geen retro-actieve wijziging
- **Versionering van regels** via PR + juridische review
- **Replay-test** bij regelwijziging — zou een eerdere zaak nu anders worden beslist?
- **Juridische basis-card** op elk dossier toont automatisch toepasselijke wetten

### 6.2 Wat verandert

| Vandaag | Met SGDP |
|---|---|
| Per zaak handmatig wettenoverzicht uitschrijven | Auto-gegenereerd op `/aanvragen/[id]` |
| Onduidelijk welk wetregime geldt bij oude zaken | `case_legal_regime` zit op elk dossier vast |
| IACHR-toets ad-hoc | R-SOC-001/002/003 + R-ENV-040 ingebakken |
| Bezwaarbehandeling zonder centrale plek | Bezwaren-register (roadmap) met klok |

### 6.3 Jouw kwaliteit blijft cruciaal

Adviesmotor signaleert. **Jij interpreteert.** Je bent eindverantwoordelijk voor:
- Override met motivatie van een hard blocker
- Bezwaarbehandeling
- IACHR-bestendigheid van de eindadviezen
- Consultatie van DNA bij wetswijziging

---

## 7. Beëdigd landmeter

### 7.1 Wat je krijgt

**FFP-LA in de praktijk** (Fit-for-Purpose Land Administration):

- **Geometrievoorstellen** kun je uploaden (GeoPackage / Shapefile / KML / GeoJSON / GML) — roadmap import-UI
- **Precision-class** systeem: `survey_cm` voor jouw deliverables, `gps_m` voor velddata, `sketch` voor traditioneel-gebied-grenzen
- **Versionering** — geen overschrijven, alleen nieuwe versies
- **PDF/A-deliverables** met PKI-handtekening (roadmap) — verifieerbaar via QR
- **Stap "landmetercontrole"** in de workflow — je beslist of geometrie OK is

### 7.2 Wat verandert

| Vandaag | Met SGDP |
|---|---|
| Uitmetingskaart opsturen per fysiek post | Upload via UI of mobiele veld-app (roadmap) |
| Onduidelijk of indiener al andere uitmeting heeft | Versionering toont historie |
| Foutieve coördinaten → ontdekt na beschikking | Topologie-validatie bij upload (FR-4.4 roadmap) |

### 7.3 Wat blijft

- Beëdigd-statuut: jouw deliverable heeft hogere `evidence_strength` dan een sketch
- Onafhankelijkheid: geen GBB- of MI-GLIS-druk op jouw oordeel

---

## 8. ITP-gemeenschap (granman, kapitein, basja, dorpsraad)

### 8.1 Wat je krijgt

**Co-eigenaarschap van jouw data, niet object van registratie** (doc 4 §4.5 principe 4 + doc 11 §11.1).

- **STDM-datamodel** — jouw traditionele woon- en leefgebied wordt **gelijkwaardig** geregistreerd, niet onder een formele eigendomsmal geforceerd
- **9 FPIC-statussen** met expliciete plek voor *bezwaar*, *voorwaardelijke instemming*, en *intrekking*
- **Bewijsregistratie**: foto, audio, video, getekende aanwezigheidslijsten, vertaalbewijs
- **Mandaatregister** — wie mag namens de gemeenschap praten, vastgelegd
- **Sacred sites** kunnen `fpic_restricted` worden — alleen need-to-know
- **FPIC heropent** automatisch bij scope-wijziging (FAO FPIC Toolkit)

### 8.2 Wat verandert

| Vandaag | Met SGDP |
|---|---|
| Concessie wordt verleend, dorp ontdekt het uit de krant | Adviesmotor blokkeert tot FPIC vóór besluit |
| Eén dorpshoofd "tekent voor allen" — geen bewijs van bredere participatie | Bewijs van vrouwen, jongeren, deelgroepen verplicht |
| Documenten alleen in juridisch Nederlands | Vertaling verplicht voor stukken aan gemeenschap (NL + Aukaans/Saramaccaans/Wayana/Kalina/Lokono — roadmap meertaligheid) |
| Data-extractivisme: jullie geven, krijgen niets terug | Data-eigendom; correctierecht; terugkoppeling verplicht |
| Druk om snel besluit te nemen | Reflectieperiode niet inkortbaar; "Free" wordt afgedwongen |
| FPIC-data lekt naar pers | Restricted-classificatie + RBAC + audit |

### 8.3 IACHR-bestendigheid

Het platform adresseert expliciet bezwaren uit **Saramaka (2007)** en **Kaliña-Lokono (2015)**:
- Effectieve erkenning van traditioneel gebruikte gebieden — STDM-laag
- Bescherming tegen titels aan derden zonder consent — blokkerende regels + FPIC
- Informatie en participatie — consultatiemodule + bewijsregistratie
- Toegang tot rechtsmiddelen — bezwaarmodule + transparante audit

### 8.4 Wat dit niet automatisch oplost

- **Land-grabs uit het verleden** — die moeten via een aparte, politieke route (demarcatieprocedure, ontwerpwet Collectieve Rechten ITP)
- **Vertrouwen** — software bouwt geen vertrouwen, mensen wel. SGDP biedt de infrastructuur
- **Wettelijke erkenning collectieve titel** — DNA-traject, niet IT-platform

---

## 9. VIDS / KAMPOS

### 9.1 Wat je krijgt

**Klankbord-rol met co-creatie engagement** (doc 11 §11.6.1):

- Toegang tot stakeholderregister (`/stakeholders`)
- FPIC-protocol mede-opgesteld (VIDS-bron)
- Waarnemer-rol bij consultatiesessies (zichtbaar in events)
- Inzage in geaggregeerde patronen (FPIC-status per gebied)
- **Niet:** authority over individuele zaken — die bevoegdheid blijft bij gemeenschap zelf

### 9.2 Operationele rol

- **Voorbereiden** van consultaties met gemeenschap
- **Opleiden** van werkstroom Consultatie over cultureel gevoelige thema's
- **Onafhankelijke check** of FPIC procedureel correct verloopt
- **Bemiddelen** bij conflicten tussen gemeenschap en overheid

---

## 10. Burger / aanvrager

### 10.1 Wat je krijgt (in productie — roadmap fase 3)

- **Online aanvraag** (FR-1.1): formulier op `/burger`
- **Status volgen** op zaaknummer (`DG-2026-XXXX`)
- **Document-upload** (PDF, JPG, PNG, GeoJSON, Shapefile, KML)
- **PERCEELSID-validatie** bij invullen
- **Bevestigingsmail/SMS** met zaaknummer
- **Bezwaar online** indienen
- **Publieke kaart** (geanonimiseerd) raadplegen

### 10.2 Wat de demo nu toont

- Bovenstaande als concept (datamodel + UI-flow)
- Adviesmotor-resultaat per scenario zichtbaar
- PDF-export adviesrapport

### 10.3 Wat verandert voor jou

| Vandaag | Met SGDP (productie) |
|---|---|
| Verzoekschrift fysiek inleveren bij Domeinkantoor | Online indienen 24/7 |
| Maanden geen update | Status zichtbaar op `/burger/status/{nummer}` |
| Onduidelijk waarom afgewezen | Adviesrapport met regel-IDs op `/regels` |
| Bezwaar per brief | Online bezwaarformulier |
| Verlenging grondhuur vergeten | 12/9/6 mnd reminders per mail/SMS |

### 10.4 Privacy-bescherming

- **Doelbinding** — jouw data wordt alleen gebruikt voor jouw zaak
- **Dataminimalisatie** — niet meer dan nodig
- **PII gemaskeerd** in publieke kaartlaag
- **Recht op inzage en correctie** — komt in roadmap (ontwerpwet privacy)

---

## 11. Pers en publiek

### 11.1 Wat je krijgt

**Transparantie als feature, niet als toegift:**

- **`/regels`** — alle 22 adviesregels publiek leesbaar (mono-font, met weging en blocker-vlag)
- **Beheerprincipe** — wijzigingen via PR + juridische review
- **Geanonimiseerde publieke kaart** (roadmap fase 2)
- **Kwartaalrapport publiek** (doc 03 §3.5.3)
- **Audit-trail samenvatting** zonder PII

### 11.2 Hoe je dit gebruikt

| Vraag | Waar je antwoord vindt |
|---|---|
| "Waarom werd zaak X afgewezen?" | `/regels` — kijk naar de actieve regel-IDs op de PDF van de zaak |
| "Is dit AI?" | Nee — `/regels` toont expliciet alle regels, geen black-box |
| "Wie heeft dit besluit genomen?" | Audit-trail (in productie) |
| "Hoe komen ITP-gemeenschappen erin?" | Doc 11 + `/stakeholders` met co-creatie engagement |
| "Wat met privacy?" | Sectie 15 hieronder, doc 02 §2.6.3 |

### 11.3 Anti-misinformatie

- Geen feiten op spreadsheet die *ergens* in een ministerie liggen — feiten zitten in een gehashed audit-log
- Geen "het systeem zei het" — elke beslissing herleidbaar naar regelversie + actor

---

## 12. Auditor / IACHR / onafhankelijke toezichthouder

### 12.1 Wat je krijgt

**IACHR-bestendige audit-architectuur** (doc 4 §4.5 principe 5 + doc 14 §14.5.3):

- **Append-only audit-log** — niemand kan verwijderen, ook ICT niet
- **Periodieke hash-chaining** — log-integriteit verifieerbaar
- **Cryptografische hash op brondocumenten**
- **Old/new value, actor, timestamp, source-reference per wijziging**
- **Exporteerbaar** voor onafhankelijke toetsing en gerechtelijke productie
- **Replay-test** voor regel-versies

### 12.2 Wat je in deze demo kunt

- `/audit` toont 10 voorbeeld-events met hash-keten-indicator
- Hash-keten integer: 100% (visueel)
- Pseudo-deterministische hash voor demo

### 12.3 Wat in productie

- **Externe ledger-verankering** (Estland-model, doc 13 fase 4)
- **Smart contract-uitvoering** voor standaardtransacties (fase 4)
- **Anomalie-detectie** (snelle herhaalde wijzigingen, ongebruikelijke uren — FR-11.3)
- **Onafhankelijke audit-portaal** (UN-Habitat / IACHR-volgende NGO)

### 12.4 Steekproef-mogelijkheid

| Vraag toezichthouder | Hoe SGDP antwoordt |
|---|---|
| "Toon alle FPIC-trajecten van community X tussen 2024 en 2026" | API-query op `fpic_process` + `fpic_event` |
| "Welke regelversie werd toegepast op zaak Y?" | `case.legal_regime` + `advice.ruleSetVersion` |
| "Wie heeft polygoon Z gewijzigd en waarom?" | `audit_event` met old/new value + ip + user |
| "Hoeveel zaken zijn met override-blocker beschikt?" | Audit-query op action `override` |

---

## 13. Concessiehouder

### 13.1 Wat je krijgt

**Helderheid vooraf, geen verrassingen achteraf.**

- **Stakeholderregister** — je zit in `/stakeholders` met engagement-niveau "Consult"
- **Pre-check beschikbaar** (roadmap) — `/api/v1/geo/overlap` standalone overlap-check zonder zaak
- **Workflow met FPIC + MEA in keten** — geen latere claim dat je geen kans had
- **Voorwaarden expliciet** in beschikking, gekoppeld aan EnvCase-monitoring

### 13.2 Wat verandert

| Vandaag | Met SGDP |
|---|---|
| Concessie verleend, jaren later IACHR-klacht | FPIC vooraf, of geen concessie |
| Onduidelijke milieu-voorwaarden | EnvCase met expliciete voorwaarden + monitoring |
| Bestaande concessie-uitbreiding zonder herevaluatie | Scope-change triggert heropening (FAO FPIC Toolkit) |

### 13.3 Wat dit niet doet

- **Bestaande concessies retro-actief intrekken** — dat is een politiek/juridisch traject
- **Conflicten oplossen** — SGDP signaleert, mediation gebeurt elders
- **Compensatie regelen** — datamodel + workflow voorbereid, financiële afhandeling roadmap

---

## 14. Internationale partners

### 14.1 UN-Habitat

- **STDM-uitbreiding** (Social Tenure Domain Model) is geïmplementeerd
- **GLTN-best-practices** in datamodel
- **Onafhankelijke evaluator-rol** mogelijk bij eindafronding (doc 14 §14.5.3)

### 14.2 FAO

- **VGGT-conformiteit** — Voluntary Guidelines on the Responsible Governance of Tenure
- **FFP-LA-aanpak** — fit-for-purpose, niet wachten op cm-precisie
- **FPIC Toolkit** geoperationaliseerd in workflow

### 14.3 IDB (Inter-American Development Bank)

- **Mogelijk financier** voor pilotfase (doc 13 §13.3)
- **PIA-toetsing** (Privacy Impact Assessment) verplicht vóór pilot
- **Roadmap-monitoring** via stuurgroep

### 14.4 IACHR

- **Saramaka + Kaliña-Lokono operationeel** — niet alleen verwijzing in tekst, maar ingebakken in regels en datamodel
- **Audit-toegang** voor gerechtelijke productie

---

## 15. Veiligheid en privacy

### 15.1 Wat we doen met data

| Data-categorie | Behandeling |
|---|---|
| **Public** | Anonieme statistieken, kaartlaag zonder PII |
| **Internal** | Werkgroep + ambtenaar — RBAC |
| **Confidential** | Juridisch advies, IACHR-relevante stukken — RBAC + ABAC |
| **FPIC-restricted** | Sacred sites, gevoelige customary informatie — alleen need-to-know + community-toestemming |

### 15.2 Encryptie en transport

- **TLS 1.3** in transit (NFR-2.3)
- **AES-256** at rest
- **Sleutelrotatie** minimaal jaarlijks

### 15.3 Authenticatie en autorisatie

- **OIDC + Surinaamse Digitale-ID** (productie)
- **MFA verplicht** voor `ambtenaar+`
- **RBAC + ABAC** — rol én attribuut bepalen toegang

### 15.4 Backup en herstel

- **Dagelijkse encrypted backups** (NFR-1b.1)
- **Weekly offsite copy**
- **RPO ≤ 24 uur, RTO ≤ 8 uur** (productie)
- **Restore-test** maandelijks

### 15.5 Logs en bewaartermijnen

- **Audit-logs minimaal 7 jaar** bewaard (NFR-7.2)
- **Authenticatie-pogingen** allemaal gelogd
- **Toegang tot gevoelige data** allemaal gelogd
- **Register- en besluitstukken** permanent of archiefwaardig (PDF/A)

### 15.6 Wat er tegen aanvallen wordt gedaan

- **OWASP Top 10** — actieve checks via SAST/DAST in CI (NFR-2)
- **Pen-test jaarlijks** + bij major releases
- **Rate limiting** per IP + per user
- **Dependency scanning** via Dependabot
- **Cyberincident-runbook** met communicatieplan (productie)

---

## 16. Wat verandert er vergeleken met vandaag

### 16.1 Voor het aanvraagproces

```
   VANDAAG                          MET SGDP
   ───────                          ────────

   Burger → Loket fysiek            Burger → Burgerportaal (online)
   → Wachten 1-3 mnd op intake      → Direct zaaknummer + bevestiging
   → Handmatige overlap-check       → 1 sec automatische check
   → Niemand kent FPIC-eisen        → Adviesmotor triggert FPIC
   → Beschikking, soms achteraf     → Voorafgaand FPIC + MEA + jurist
       fout                           → "Goede" beschikking
   → 6-12 mnd doorlooptijd          → ~37 dgn happy path,
                                       ~97 dgn met FPIC
```

### 16.2 Voor IACHR-bestendigheid

| Aspect | Vandaag | Met SGDP |
|---|---|---|
| FPIC-bewijs | Verspreid, soms papier | Eersterangs object, gehasht |
| Customary territory | Niet erkend op kaart | STDM-laag |
| Effectieve consultatie | Symbolisch | Reflectieperiode niet inkortbaar |
| Toegang rechtsmiddelen | Onduidelijk | Bezwaarmodule + audit |

### 16.3 Voor anti-corruptie

| Aspect | Vandaag | Met SGDP |
|---|---|---|
| Wijzigingen op records | Soms onzichtbaar | Append-only + hash |
| Toegang gevoelige data | Soft control | RBAC + ABAC + audit |
| Override van regels | Onzichtbaar | Verplicht gemotiveerd + gelogd |
| Externe toetsing | Maanden bewijs | Eén export-knop |

---

## 17. Roadmap — wat staat klaar wanneer?

```
   ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌───────────┐
   │  Fase 0  │ │  Fase 1  │ │  Fase 2  │ │  Fase 3  │ │  Fase 4   │
   │  DEMO    │ │  Pilot   │ │ Integra- │ │ Burger-  │ │ Maturity  │
   │ (NU)     │ │ (1 distr)│ │  ties    │ │ diensten │ │ + Ledger  │
   └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬─────┘ └─────┬─────┘
        │            │            │            │             │
       0 mnd        ~6 mnd       ~15 mnd      ~27 mnd        ~36+ mnd
```

### Fase 0 — Demo (NU)
Wat je nu hebt. ✅

### Fase 1 — Pilot in 1 district (~6 mnd)
- Echte data uit GBB + MI-GLIS, gemockt naar geanonimiseerde set
- Echte FPIC-trajecten met instemming gemeenschap
- Performance- + securityaudit
- PIA afgerond
- Gebruikerstrainingen
- Productie-runbook

### Fase 2 — Integraties (~9 mnd na pilot)
- Bidirectionele MI-GLIS-API
- Domeinkantoor / GBB-API
- Concessieregisters NH/GMD/SBB
- Identiteit / e-ID / DBZ-CBA
- NMA-vergunningenregister
- WRO-bestemmingenregister (zodra wet aangenomen)
- OGC API – Features volledig conform
- Open data-portaal publiek
- Volledige meertaligheid

### Fase 3 — Burgerdiensten (~12 mnd na fase 2)
- Burgerportaal (digitale aanvraag, status, bezwaar, upload, meldingen)
- Veldwerk-app (mobiel, offline ≥ 7 dgn, GPS, foto/audio/video)
- Identiteitsverificatie eIDAS-achtig
- AI-OCR documentanalyse
- Online Dispute Resolution
- AML/KYC (waar toepasbaar)
- PII auto-redactie
- Push notificaties

### Fase 4 — Maturity, Ledger, AI
- Hash-verankering externe ledger (Estland-model)
- Smart contracts voor standaardtransacties
- CAMA voor massataxatie
- 3D-cadaster
- AI explainability laag (SHAP/LIME)
- Geautomatiseerde beleidsbriefings
- Internationale interoperabiliteit (INSPIRE-achtig)
- Grensoverschrijdende samenwerking (Frans-Guyana, Guyana)

---

## 18. Wat als ik een fout zie?

### 18.1 In data

**Aanvrager / burger:** correctierecht via burgerportaal (roadmap fase 3). In demo: melden bij secretariaat.

**ITP-gemeenschap:** correctierecht op eigen data (community-id ABAC). VIDS/KAMPOS bemiddelt indien nodig.

**Ambtenaar:** wijziging via UI (in productie, met audit-log). Demo: read-only.

### 18.2 In regels

Adviesmotor beslist verkeerd? Zie doc 10 §10.9:
1. Schrijf casus + regel-ID + juridisch/feitelijk argument
2. Stuur naar werkstroom Juridisch (Martin Misiedjan)
3. Bij gegrondheid: PR aangemaakt
4. Review door minstens 1 jurist + 1 werkgroep-lid
5. Replay-test op eerdere zaken
6. Productie-versie gepind

### 18.3 In wetinterpretatie

Bij twijfel telt de **meest beschermende interpretatie voor de gemeenschap** (doc 11 §11.1).

### 18.4 Vermoedde corruptie

- Audit-trail via toezichthouder
- Externe audit jaarlijks
- IACHR-pad open

---

## 19. Lessen uit andere landen

Doc 12 §12.3 beschrijft hoe SGDP put uit:

| Land | Wat we overnemen |
|---|---|
| **Nederland (Kadaster + PDOK)** | Standaard-API's, koppelingen tussen registers |
| **Estland (e-Land Register)** | Hash-verankering op blockchain (fase 4) |
| **Rwanda (e-title)** | Mobiel-eerste burgerportaal (fase 3) |
| **VS (BLM MLRS)** | eRecording, auto-indexering, PII-redactie |
| **Georgië (blockchain landregister)** | Anti-fraude door ledger |
| **Brazilië (CAR)** | Ook *betwiste* claims expliciet vastleggen |
| **Colombia (multi-purpose cadastre)** | Iteratieve FFP-LA in post-conflict |
| **FAO Open Tenure / SOLA** | Open-source componenten waar mogelijk |

We **kopiëren niet**, we **leren**. Suriname-context blijft leidend.

---

## 20. Wat SGDP nadrukkelijk NIET is

| Wat het niet is | Waarom |
|---|---|
| **Geen vervanger van MI-GLIS** | MI-GLIS blijft master. SGDP koppelt en orchestreert. |
| **Geen rechtbank** | SGDP signaleert conflicten; rechter beslist geschillen. |
| **Geen vervanger van consultatie** | FPIC blijft een menselijk proces; SGDP legt vast en bewaakt. |
| **Geen black-box AI** | Regelgebaseerd; ML alleen als aanvulling met explainability. |
| **Geen automatische beslisser** | Adviezen zijn adviserend; mens tekent. |
| **Geen geheim systeem** | 22 regels publiek; data-eigendom bij ITP-gemeenschap. |
| **Geen one-size-fits-all** | Wetregime configureerbaar per zaak. |
| **Geen experiment** | Standaard-conform (LADM, STDM, OGC, FAO-VGGT, FPIC Toolkit). |
| **Geen vendor lock-in** | Open-source stack, open formaten, eigendom code en data bij Suriname. |

---

## Eén-zinsamenvatting per audience

| Voor wie | Wat SGDP voor jou betekent |
|---|---|
| **President** | Eén dashboard met onderbouwd, getoetst, IACHR-bestendig advies — zonder zelf de spreadsheet te beheren. |
| **Werkgroep** | 40 weken werkomgeving die FPIC, conflictdetectie, advies en audit operationeel maakt. |
| **Ambtenaar GBB** | Adviesmotor + werkflow die wettoetsing, overlap-check en stakeholderbeheer vóór jou doet. |
| **MI-GLIS** | Federatieve koppeling die jouw register beschermt en aanvult — niet vervangt. |
| **NMA-reviewer** | Dedicated workflow voor MEA/MER met automatische triggers en monitoring. |
| **Jurist** | Wetstoetsing als datalaag met 22 regels en wetregime-versionering. |
| **Landmeter** | FFP-LA met versionering, PKI/QR-handtekening en mobiel veldwerk. |
| **ITP-gemeenschap** | Co-eigenaarschap van jouw data; FPIC-bewijs IACHR-bestendig vastgelegd. |
| **VIDS / KAMPOS** | Klankbordrol met co-creatie en stakeholderregister. |
| **Burger** | Online aanvraag, status volgen, transparante regels, online bezwaar (roadmap). |
| **Pers / publiek** | Publieke regelset, geanonimiseerde kaart, kwartaalrapport — geen black-box. |
| **Auditor / IACHR** | Append-only audit, hash-keten, exporteerbaar voor gerechtelijke productie. |
| **Concessiehouder** | Helderheid vooraf, expliciete voorwaarden, FPIC + MEA in keten. |
| **Internationale partner** | LADM/STDM-conform, VGGT/FPIC-operationeel, mogelijk pilotfinanciering. |

---

**Versie:** 1.0 · 11 mei 2026 · Republiek Suriname · Werkarm van het Staatshoofd

**Onderliggende docs:** docs/01 t/m docs/18 in projectroot.
