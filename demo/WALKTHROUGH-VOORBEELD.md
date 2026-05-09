# SGDP Hands-On Voorbeeld — Een Werkweek in de Werkgroep

> **Voor wie:** iedereen die de demo voor het eerst opent en wil zien hoe **alle modules samenkomen** bij één zaak.
>
> **Wat dit doet:** wij volgen één concrete aanvraag — `DG-2026-0009` van DEMO_Aanvrager F. Adjako — door een werkweek heen, en raken onderweg álle 11 modules + alle kruisverbanden (FPIC, NMA, grondhuur, audit, regels). Aan het eind van dit document weet u hoe u de hele software gebruikt.
>
> **U speelt:** voorzitter **Edgar Dikan**. Ondertussen werken collega's parallel aan andere zaken die u tegenkomt.
>
> **Demo-tijd:** week van **maandag 11 mei 2026** — vlak vóór de deadline van het tussentijds rapport aan de President (18 mei).

---

## Inhoud

- [Maandag 09:00 — Inloggen + dashboard](#maandag-0900--inloggen--dashboard)
- [Maandag 10:00 — De zaak op de kaart](#maandag-1000--de-zaak-op-de-kaart)
- [Maandag 11:00 — Aanvraag-detail + adviesmotor](#maandag-1100--aanvraag-detail--adviesmotor)
- [Maandag 14:00 — FPIC-traject openen](#maandag-1400--fpic-traject-openen)
- [Dinsdag 09:00 — Stakeholders raadplegen](#dinsdag-0900--stakeholders-raadplegen)
- [Dinsdag 14:00 — Dossiers vergelijken](#dinsdag-1400--dossiers-vergelijken)
- [Woensdag — Grondhuur-zijspoor](#woensdag--grondhuur-zijspoor)
- [Donderdag — Milieu/NMA-zijspoor](#donderdag--milieu-nma-zijspoor)
- [Vrijdag 10:00 — Werkgroep-vergadering](#vrijdag-1000--werkgroep-vergadering)
- [Vrijdag 16:00 — Adviesrapport exporteren als PDF](#vrijdag-1600--adviesrapport-exporteren-als-pdf)
- [Volgende week — Audit + transparantie](#volgende-week--audit--transparantie)
- [Bonus — Nieuwe aanvraag simuleren](#bonus--nieuwe-aanvraag-simuleren)
- [Wat u nu kunt](#wat-u-nu-kunt)

---

## Maandag 09:00 — Inloggen + dashboard

### Stap 1.1 Inloggen

**U doet:**
- Open `http://localhost:3000` (of de gedeelde URL).
- U wordt automatisch doorgestuurd naar `/login`.
- Op het welkom-scherm: links de Surinaamse identiteit, rechts de form.
- Klik op de card **"Edgar Dikan"** (heeft een gouden kroontje — voorzitter).
- Het wachtwoord-veld is al ingevuld met `sgdp2026`.
- Klik **"Inloggen als Edgar"**.

**Wat u ziet:**
- Het systeem brengt u naar `/` (Executive Dashboard).
- Rechtsboven staat nu uw naam: **Edgar Dikan · Voorzitter / Presidentieel adviseur**.

**Wat het systeem doet (achter de schermen):**
- `validateCredentials()` checkt username + wachtwoord.
- Een `httpOnly` cookie `sgdp-session=WG-01` wordt gezet (8 uur geldig).
- De proxy laat alle volgende requests door.
- Audit-event `login` zou worden gelogd (in productie).

### Stap 1.2 Executive Dashboard scannen

**U ziet:**

| Sectie | Wat u eruit haalt |
|---|---|
| Banner rechtsboven | "Tussentijds rapport — deadline 18 mei 2026 — over 7 dagen" → de klok tikt |
| Voortgangstrip F1-F5 | F2 voltooid groen, F3 actief geel-pulse, F4-F5 grijs |
| KPI: ITP-gebieden | 5 / 5 — 100% inventarisatie loopt |
| KPI: Open dossiers | X open, met aantal geblokkeerd |
| KPI: FPIC-trajecten | 3 trajecten, 1 met (voorwaardelijke) instemming |
| KPI: Actiepunten | aantal open + 1 achterstallig (rood) |
| Hoog-risico dossiers (top 4) | Score-bolletje rood, naam, blocker-reden |
| Komende mijlpalen | M3.2 "50% gebieden FPIC-traject gestart" |
| Lopende besluiten | BES-2026-018, BES-2026-017 |
| Top-3 risico's | "Overlap concessie A-12 met DEMO_Galibi" — rood |

**U doet:**
- Scroll over de hoog-risico dossiers.
- Eén dossier valt op: **`DG-2026-0009`** — DEMO_Aanvrager F. Adjako, score 72, hoog risico, FPIC-vereist-badge, in district DEMO_Marowijne.
- **Klik op die rij**.

**Resultaat:** u opent de detail-pagina van de aanvraag (`/aanvragen/APP-2026-009`).

---

## Maandag 10:00 — De zaak op de kaart

### Stap 2.1 Eerst: context op de kaart

Voordat u de aanvraag opent, wilt u weten *waar* het ligt. U gaat eerst even naar de kaart-module.

**U doet:**
- Sidebar links → klik **GIS-kaart**.
- U komt op `/kaart` — een full-screen kaart van Suriname met 7 actieve lagen.

**U ziet:**
- Donkergroene contouren = Suriname-grens
- Goud-getinte polygonen = traditionele woon- en leefgebieden ITP (CT-001 t/m CT-005)
- Rood = mijnbouwconcessies, bruin = bosbouw, groen = landbouw
- Lichtgroen met streepjes = beschermde gebieden
- Kleine kleurpunten = aanvragen (rood = hoog risico)
- Witte cirkels = ITP-dorpen

**U doet:**
- Zoom in op het noordoosten — DEMO_Marowijne.
- Hover over de gele polygoon **CT-004** → popup: *"DEMO_Diitabiki Aukaans gebied — 28.800 ha"*.
- Klik op een rode dot binnen CT-004 → popup: *"DG-2026-0009 — DEMO_Aanvrager F. Adjako — Risico: hoog"*.
- U ziet meteen: de aanvraag ligt binnen het Aukaans gebied. Klassiek FPIC-territorium.

**Wat het systeem doet:**
- MapLibre rendert WebGL-lagen vanuit `lib/demo-data.ts`.
- Mouse-events triggeren popups via de interactiveLayers-config.
- Geen server-call — alles client-side.

### Stap 2.2 Conflict op één scherm zien

**U doet:**
- Pan een beetje westwaarts.
- U ziet de overlap **DEMO_Goudconcessie A-12 (rood)** met **DEMO_Galibi (geel)** — het bekende Saramaka-achtige conflict.
- Dit is wat de demo wil aantonen: in één scherm zichtbaar, niet over 5 verschillende databases verspreid.

**Sleutelinzicht:**
> *"Dit is wat MI-GLIS en het Domeinkantoor vandaag niet samen op één scherm hebben."* — doc 04 §4.2

---

## Maandag 11:00 — Aanvraag-detail + adviesmotor

Terug naar de zaak. U klikt sidebar → **Aanvragen & Advies**, dan rij `DG-2026-0009`.

### Stap 3.1 De hoofdcard lezen

**U ziet bovenaan:**
- Zaaknummer `DG-2026-0009` in mono-font groen
- Status-badge **`geblokkeerd`** (rood)
- Badges **`FPIC vereist`** (goud)
- Titel: *"Domeingrondaanvraag — landbouw"*
- Indiener: DEMO_Aanvrager F. Adjako, ID 8901234, SUR-nationaliteit
- District: DEMO_Marowijne
- Ingediend: 26 april 2026
- Knop rechtsboven: **Adviesrapport (PDF)**

### Stap 3.2 Workflow-strip

Onder de hoofdcard: 8 statussen visueel gerangschikt.

```
ontvangen → documentcontrole → in_onderzoek → landmetercontrole
→ bezwaarperiode → juridisch_advies → besluit → beschikking
```

Voor deze zaak springen alle stappen na `documentcontrole` op een rood vlak — *geblokkeerd*. Dit komt door de hard blockers van de adviesmotor (zo dadelijk).

### Stap 3.3 Het adviesrapport (HERO)

**U ziet:**
- **Risicoscore-bolletje:** **72 / 100** — donkerrood — label **"Hoog"**
- **Hard blockers** in rood vak (2 stuks):
  - *"Aanvraag ligt binnen traditioneel woon- en leefgebied DEMO_Diitabiki Aukaans (CT-004)"* — regel **R-SOC-001**
  - *"FPIC-procedure niet gestart"* — regel **R-SOC-003**
- **5 categorieën-tegels:** administratief / juridisch / ruimtelijk / sociaal / beleid
  - **Sociaal/FPIC:** 2 bevindingen, oranje, BLOCKER-vlag op R-SOC-001
  - Andere categorieën: groen "Geen bevindingen — OK"
- **Aanbeveling:**
  > *"Niet besluitbaar in huidige staat: 1 hard blocker actief. Vereiste acties: FPIC-procedure starten met betrokken gemeenschap. Beschikking aanhouden tot blokkades zijn weggenomen."*
- **Provenance-strip onderaan:** ruleset-versie 1.0.0 · toegepaste regels: R-SOC-001, R-SOC-003 · gegenereerd 11 mei 2026 11:08

**Wat het systeem doet:**
- `generateAdvice(application)` in `lib/advice-engine.ts` evalueert alle 22 regels.
- Voor elke regel: `evaluate(app)` → string of null.
- Findings worden gegroepeerd per categorie, gewichten gesommeerd, blockers verzameld.
- Aanbeveling wordt automatisch opgesteld op basis van blockers + risk level.

### Stap 3.4 Onder de adviesmotor: kaart + dossier-info

**Linksonder:** een live kaart van het aangevraagde gebied (groot 500px).
**Rechterkolom:**
- **Documenten-card:** ✓ nationaliteitsverklaring · ✓ ID-kopie · ✓ figuratieve kaart
- **Bezwaartermijn:** *(deze zaak heeft geen publicatie — staat geen klok)*
- **FPIC-traject card** (goud-omringd):
  - Gemeenschap: DEMO_Tribaal_Aukaans_Diitabiki
  - 1.780 bewoners · taal Aukaans
  - Status-badge **"niet gestart"**
  - Knop: **"Open FPIC-dossier →"**
- **Juridische basis:**
  - Decreet Uitgifte Domeingrond
  - Besluit GLIS 2025
  - Wet Grondregistratie en LIS 2009
  - **UNDRIP / IACHR Saramaka & Kaliña-Lokono** ← wegens FPIC

### Stap 3.5 De regels begrijpen

**U doet (parallel-tabblad):**
- Sidebar → **Adviesregels** (`/regels`).
- Bovenaan: risicoscore-formule, drempels, hard blockers-overzicht.
- Scroll naar **Sociaal / FPIC**.
- U ziet R-SOC-001 met **BLOCKER-badge** + **→ FPIC**-trigger:
  - *"Aanvraag in traditioneel woon- en leefgebied (ITP)"* — weging 20

**Sleutelinzicht:**
> *Geen black-box. U kunt aan de aanvrager precies uitleggen welke regel waarom blokkeert, en die regel staat publiek.*

---

## Maandag 14:00 — FPIC-traject openen

De adviesmotor wijst op FPIC. U opent het traject.

### Stap 4.1 FPIC-lijst

**U doet:**
- Klik op de FPIC-card onder de aanvraag → "Open FPIC-dossier →" *(of: sidebar → FPIC & Consultatie → kies FPIC-001)*.
- Eigenlijk: voor `APP-2026-009` is het traject `FPIC-002` (consultatie_lopend) — het ander voorbeeld.

**Op `/fpic` ziet u 3 trajecten:**

| ID | Status | Gemeenschap | Gekoppelde zaak |
|---|---|---|---|
| FPIC-001 | niet_gestart | DEMO_Galibi | APP-2026-002 |
| **FPIC-002** | **consultatie_lopend** | **DEMO_Diitabiki Aukaans** | **APP-2026-009** ← onze zaak |
| FPIC-003 | voorwaardelijke_instemming | DEMO_Brokopondo | (historische zaak) |

**Klik op FPIC-002.**

### Stap 4.2 FPIC-detail bestuderen

**U ziet:**
- **Hero card** (goud) met community-info:
  - DEMO_Tribaal_Aukaans_Diitabiki — Tribaal-Marron — granman R. Misiedjan — 1.780 bewoners — Aukaans
  - Status-badge: **consultatie_lopend**
  - Gestart 15 april 2026
- **Tijdlijn van events:**

  **Event FE-001 — 15 april 2026 — Informatie verstrekt**
  - Locatie: Diitabiki dorpscentrum
  - Aanwezigen: Granman R. Misiedjan, Kapt. E. Pinas, Kapt. M. Akontu, Werkgroep secretariaat
  - Notities: *"Informatiepakket overhandigd in Aukaans en Nederlands. Vertaling door dorpsraad-vertaler. Reflectieperiode 3 weken afgesproken op verzoek gezag."*
  - Evidence: 📄 verslag · 📷 foto · 🎤 audio

  **Event FE-002 — 2 mei 2026 — Consultatiesessie**
  - Locatie: Diitabiki dorpscentrum
  - Aanwezigen: granman, kapitein, 20 dorpsbewoners, werkstroom Consultatie, **VIDS-waarnemer**
  - Notities: *"Eerste plenaire consultatiesessie. Vragen over impact op jacht- en visgebieden. Verzoek om aanvullende kaart met seizoensgebonden gebruikslagen."*
  - Evidence: 📄 verslag · 📹 video (3 delen) · ✍ getekende aanwezigheidslijst

- **Gekoppelde zaak:** link naar `/aanvragen/APP-2026-009`.

**Sleutelinzicht:**
> *FPIC is iteratief en bewijsbaar. Een rechter (of IACHR) kan jaren later precies zien wie wanneer wat zei en met welke evidence.*

---

## Dinsdag 09:00 — Stakeholders raadplegen

U wilt de FPIC-vervolgsessie plannen, en u wilt zekerheid over wie u moet uitnodigen.

### Stap 5.1 Stakeholderregister openen

**U doet:**
- Sidebar → **Stakeholders** (`/stakeholders`).

**U ziet bovenaan een goud-omringde sectie:**
- **ITP-gemeenschappen** — gelijkwaardig vermeld, niet onderaan
- 5 cards, één per community

**Klik op de card "DEMO_Tribaal_Aukaans_Diitabiki" (COM-004).**

### Stap 5.2 Community-detail

**U ziet:**
- **Granman:** R. Misiedjan
- **Kapiteins:** E. Pinas, M. Akontu
- **Basja's:** D. Boné, F. Adjako *(let op: de aanvrager heet ook Adjako — geen toeval; in productie zou er een belangenconflict-vlag triggeren)*
- **Populatie:** 1.780 bewoners
- **Taal:** Aukaans
- **FPIC-contactpersoon:** Kapt. E. Pinas

### Stap 5.3 Koepelorganisaties checken

Scroll naar **ITP-koepelorganisaties:**
- **VIDS** — co-creatie engagement, laatst contact 30 april 2026, FPIC-protocol mede-opgesteld
- **KAMPOS** — co-creatie, laatst contact 22 april 2026

**U doet (in werkelijkheid):**
- Belt KAMPOS-coördinator om de vervolgsessie van 23 mei te coördineren — zij willen erbij zijn als waarnemer.

---

## Dinsdag 14:00 — Dossiers vergelijken

U wilt weten of er meer Diitabiki-zaken lopen, om patronen te zien.

### Stap 6.1 Dossiers per district

**U doet:**
- Sidebar → **Dossiers** (`/dossiers`).

**U ziet 3 districts-tegels:**
- DEMO_Marowijne — X dossiers, 2 geblokkeerd
- DEMO_Sipaliwini — X dossiers, 1 geblokkeerd
- DEMO_Para — X dossiers, 0 geblokkeerd

### Stap 6.2 Marowijne-blok openen

In het Marowijne-blok ziet u alle zaken in dat district. `DG-2026-0009` heeft een rode "geblokkeerd"-badge en goud "FPIC"-badge. Naast hem staat `DG-2026-0002` (de Galibi-zaak met 78 score, óók geblokkeerd door FPIC).

**Sleutelinzicht:**
> *Twee FPIC-blokkades in één district binnen 2 weken. Dat is een patroon. De adviesmotor heeft regel R-BEL-001 hiervoor: "District is conflict-hotspot — overweeg gebiedsgerichte demarcatie."*

---

## Woensdag — Grondhuur-zijspoor

Tijdens uw onderzoek krijgt u een melding van Mike (werkstroom Inv & GIS): er loopt een conversie-aanvraag voor agrarische grond náást het Diitabiki-gebied. Misschien gerelateerd?

### Stap 7.1 Grondhuur-module openen

**U doet:**
- Sidebar → **Grondhuur & Conversie** (`/grondhuur`).

**U ziet 4 KPI-tegels:**
- Aflopend < 6 mnd: 2 (rood) → wettelijke deadline 6-mnd verlengingsverzoek
- In verlenging / conversie: 1 / 3
- Achterstand totaal: SRD 6.630
- Vervallen / voornemen: 1 / 1

### Stap 7.2 Aflopende grondhuur-tabel scannen

In de tabel ziet u kleur-gecodeerd:
- **TEN-002** (MAR-P-0019) — DEMO_Houder T. Wongsoredjo — landbouw — eind oktober 2026 — **5 mnd** rood — achterstand SRD 760 — uitmetingskaart ontbreekt 🔴
- **TEN-003** (PAR-P-0021) — eind april 2027 — **11 mnd** geel — alles op orde
- **TEN-008** (SIP-P-0014) — verlopen sinds 2025-03 — 14 mnd over deadline 📕

### Stap 7.3 Conversie-aanvragen

Scroll naar **Conversie-aanvragen**. Drie cards:

| Conversie | Status | Probleem |
|---|---|---|
| CNV-2026-001 (TEN-005) | in_onderzoek | Geen blockers — kan voor besluitvorming |
| CNV-2026-002 (TEN-006) | aangevraagd | **R-CONV-002**: hypothecair uittreksel ontbreekt |
| **CNV-2026-003 (TEN-007)** | **voorwaardelijk** | **R-CONV-010: raakt CT-004 → FPIC heropend** |

**Aha!** CNV-2026-003 raakt **hetzelfde Diitabiki-gebied** als uw zaak. De adviesmotor heeft automatisch FPIC heropend (badge **"FPIC heropend"**).

### Stap 7.4 Vervallenverklaringen scannen

Onderaan ziet u:
- **FRF-2026-001** — TEN-009 (DEMO_Houder N. Tjon) — voornemen vervallen wegens SRD 4.750 achterstand over 4 jaar — bezwaartermijn loopt
- **FRF-2025-014** — TEN-010 — voltooid forfeited, geen schadeloosstelling (doelbinding geschonden)

**Sleutelinzicht:**
> *Twee parallelle dossiers raken hetzelfde Diitabiki-gebied. Mike (Inv & GIS) en u kunnen nu coördineren — en de FPIC-vervolgsessie van 23 mei kan beide cases dekken.*

---

## Donderdag — Milieu/NMA-zijspoor

Aan het einde van de week nadert u de werkgroepvergadering. U wilt weten of er milieu-implicaties zijn voor uw zaak. En u zag op het dashboard ook een NMA-blok dossier (`DG-2026-0005` met 100% beschermd-gebied-overlap). Even check.

### Stap 8.1 Milieu-module openen

**U doet:**
- Sidebar → **Milieu & NMA** (`/milieu`).

**U ziet 4 KPI-tegels:**
- Open milieu-zaken: 3
- Beschermde gebieden: 2
- Verontreinigde gebieden: 1
- NMA-reviewers actief: 2

### Stap 8.2 MEA-plicht-matrix bekijken

Een tabel toont 5 activiteitstypes met MEA-eisen:
- Mijnbouw klein/middel — Ja — > 2 ha of in beschermd gebied
- Bosbouw concessie — Ja — ≥ 1.000 ha of nabij ITP
- **Landbouw grootschalig — Ja — > 50 ha monocultuur**  ← uw zaak is landbouw
- Bebouwing/bewoning — Nee (tenzij beschermd)
- Industrie — Ja

Uw zaak APP-2026-009 is landbouw. Vraag: hoe groot is het gebied? In de detail-page stond geen oppervlakte — u maakt mentale notitie om dat te checken.

### Stap 8.3 EnvCases bekijken

Scroll naar **Milieu-zaken (EnvCase)**:

- **ENV-2026-001** — gekoppeld aan APP-2026-005 (Iyoki, 100% in DEMO_Natuurreservaat)
  - Status `mer_in_review`, NMA-reviewer P. Sahdew toegewezen
  - 3 evidence-stukken: GIS-overlap rapport, Concept Scoping Document, Briefwisseling beheerder
  - Link naar het gekoppelde dossier
- **ENV-2026-002** — gekoppeld aan APP-2026-002 (Galibi)
  - Status `mea_required`, MEA-screening positief
- **ENV-2025-014** — historisch voorbeeld, status `conditional`
  - 4 voorwaarden: max Hg 0,5 mg/L, kwartaalrapportage, rehab-plan binnen 24 mnd, audit jaar 2 en 5
  - **Dit is hoe een goedgekeurde-met-voorwaarden eruit ziet — interessant model**
- **ENV-2026-003** — gekoppeld aan TEN-007 (de conversie van gisteren!)
  - Status `screening` — net geopend wegens scope-uitbreiding

### Stap 8.4 Verontreinigde gebieden + rehabilitatie

Helemaal onderaan:
- **CS-001** — DEMO_Verlaten goudwasplaats Sipaliwini-Noord, kwik, hoog
- **REHAB-2025-001** — IACHR Kaliña-Lokono-verplichting, mijlpalen 2025-2030, voortgangsbalk

**Sleutelinzicht:**
> *Voor uw zaak `DG-2026-0009` is er nog geen EnvCase — maar omdat het landbouw is, moet u checken of het > 50 ha betreft. Zo ja: NMA-reviewtaak openen.*

**U doet:**
- U noteert het als actiepunt voor in de werkgroepvergadering.

---

## Vrijdag 10:00 — Werkgroep-vergadering

Plenaire vergadering week 19. U bent voorzitter.

### Stap 9.1 Werkgroep-werkruimte openen

**U doet:**
- Sidebar → **Werkgroep** (`/werkgroep`).

### Stap 9.2 Leden + fasen

**U ziet bovenaan:**
- 6 leden-cards met initialen-avatars (Edgar groot — voorzitter)
- Fasen-balk F1-F5 met percentages:
  - F1 — 3/3 voltooid (100%)
  - F2 — 4/4 voltooid (100%)
  - **F3 — 1/4 voltooid (25%) ← actief**
  - F4 — 0/4 (gepland)
  - F5 — 0/2 (gepland)

### Stap 9.3 Vergaderingen

In het midden ziet u 3 vergaderingen. De bovenste is **MTG-2026-W18** (vorige week). U opent het accordeon om de agenda te zien:
- Vaststelling notulen W17
- Voortgang inventarisatie ITP-gebieden
- FPIC-traject Diitabiki — tussentijdse stand
- Juridisch advies overlap CON-001 / CT-001
- Concept-tussentijdsrapport President
- Communicatieplan persvragen

Besluiten van die vergadering:
- Inventarisatie van CT-002 en CT-003 in mei afronden
- Klankbordsessie met VIDS verzetten naar 21 mei
- Conceptrapport President gereed voor 18 mei

### Stap 9.4 Recente besluiten

Rechtsboven: **Recente besluiten**:
- **BES-2026-018** — Conceptrapport President — stem 6-0-0 unaniem — in_uitvoering
- **BES-2026-017** — Juridisch advies overlap CON-001 / CT-001 — stem 5-0-1 — in_uitvoering — gekoppeld aan APP-2026-002, FPIC-001
- **BES-2026-016** — SGDP-platform geaccepteerd — stem 5-0-0 — voltooid

### Stap 9.5 Actiepunten

Onderaan ziet u 8 open + 1 achterstallig:
- **ACT-2026-098** — *"Risico-update RW-03 (basisdata MI-GLIS)"* — eigenaar Sarwan Ramai — deadline 4 mei (rood, 7 dagen achterstallig)
- ACT-2026-101 — concept tussentijds rapport — Edgar Dikan — deadline 18 mei
- ACT-2026-102 — juridisch memo IACHR Saramaka — Martin Misiedjan — deadline 18 mei
- ACT-2026-105 — vervolgsessie Diitabiki organiseren — Theresia Cirino — deadline 23 mei
- ACT-2026-106 — aanvullende kaart seizoensgebruik Diitabiki — Mike Nerkust — deadline 20 mei
- (etc.)

### Stap 9.6 Wat u in deze vergadering bespreekt (echt)

Hoewel mutaties in de demo niet persistent zijn, zou u in productie:
1. Notulen W18 vaststellen (1 klik).
2. Nieuw besluit registreren: **BES-2026-019 — APP-2026-009 + CNV-2026-003 koppelen aan vervolgsessie Diitabiki 23 mei** (5-0-1).
3. Nieuw actiepunt: **Mike — checkt of APP-2026-009 > 50 ha is voor MEA-trigger** — deadline 16 mei.
4. Nieuw actiepunt: **Theresia — coördineert KAMPOS-aanwezigheid in vervolgsessie 23 mei** — deadline 18 mei.

**Sleutelinzicht:**
> *Vergaderingen verdwijnen niet in een mailbox. Elk besluit, elke actie, elke stem ligt vast en is gekoppeld aan dossiers — herleidbaar via audit.*

---

## Vrijdag 16:00 — Adviesrapport exporteren als PDF

U wilt voor de president-briefing van komende maandag een PDF van het adviesrapport.

### Stap 10.1 PDF genereren

**U doet:**
- Terug naar `/aanvragen/APP-2026-009`.
- Klik rechtsboven op **"Adviesrapport (PDF)"**.
- Browser opent print-dialoog.
- **Bestemming:** kies "Save as PDF" / "Opslaan als PDF" / "Microsoft Print to PDF".
- Klik **Opslaan**.

### Stap 10.2 Wat de PDF bevat

Open de PDF en u ziet:
- **Print-only header** met:
  - "Republiek Suriname — SGDP · Werkarm van het Staatshoofd"
  - "Adviesrapport — DG-2026-0009"
  - "Gegenereerd: 11 mei 2026 16:24 · Demo-omgeving · Niet voor besluitvorming"
- **Hoofdcard** met workflow-strip
- **Volledig adviesrapport:** risicoscore, alle 5 categorieën met bevindingen, hard blockers, aanbeveling, provenance
- **Documenten-card, FPIC-info, juridische basis**
- **Print-only voettekst** met DEMO-disclaimer en datum

⚠️ De **interactieve kaart staat NIET in de PDF** — bewust weggelaten omdat WebGL/raster tiles niet schoon op papier renderen.

### Stap 10.3 Bijlage bij president-briefing

U mailt de PDF naar het kabinet. In productie zou er een PKI-handtekening + QR-code op staan voor verificatie (FR-18, roadmap).

---

## Volgende week — Audit + transparantie

Voor de presidentbriefing wilt u kunnen aantonen dat alles transparant is gegaan.

### Stap 11.1 Audit Trail

**U doet:**
- Sidebar → **Audit Trail** (`/audit`).

**U ziet:**
- 3 KPI-tegels:
  - Totaal logregels: 10
  - Unieke gebruikers: 5
  - **Hash-keten integer: 100%** ← niemand heeft de log geknoeid

- Tabel met events, gesorteerd nieuwste eerst:

| Tijdstip | Gebruiker | Actie | Object | Beschrijving |
|---|---|---|---|---|
| 8 mei 14:32 | Mike Nerkust | Wijzigen | spatial_unit CT-002 | Polygoon DEMO_Brokopondo bijgewerkt — versie 3 |
| 8 mei 11:45 | Theresia Cirino | Aanmaken | fpic_event FE-002 | Plenaire consultatiesessie Diitabiki 2026-05-02 |
| 8 mei 09:18 | Edgar Dikan | Wijzigen | case APP-2026-002 | Risk score hertest — blijft 78 |
| ... | ... | ... | ... | ... |

Elk event heeft een hash-suffix (mono-font, gecondenseerd). In productie: SHA-256 met chain-link naar vorige.

### Stap 11.2 Adviesregels — transparantie aan de pers

Stel: een journalist belt: *"Waarom werd `DG-2026-0009` geblokkeerd?"*

**U doet:**
- Sidebar → **Adviesregels** (`/regels`).
- Toon de risicoscore-formule.
- Wijs op **R-SOC-001** in de Sociaal-categorie:
  > *"Aanvraag in traditioneel woon- en leefgebied (ITP). Weging 20. BLOCKER. Trigger: FPIC."*
- Onderaan: *"Wijzigingen aan deze regelset gaan via Pull Request met juridische review."*

**Sleutelinzicht:**
> *Geen black-box, geen 'het systeem zei het'. U kunt aan iedereen — burger, jurist, IACHR — exact uitleggen welke regel waarom, met welke weging.*

### Stap 11.3 Uitloggen

**U doet:**
- Klik rechtsboven op uw user-card.
- Dropdown verschijnt met uw info:
  - Naam, rol, userId, workstream
  - "Demo-sessie. In productie: Surinaamse Digitale-ID met OIDC + MFA."
- Klik **"Uitloggen"** (rode knop met log-out-icoon).

**Wat het systeem doet:**
- `clearSession()` wist de cookie.
- Redirect naar `/login`.

---

## Bonus — Nieuwe aanvraag simuleren

Voor stakeholder-presentaties: laat zien hoe de motor "live" reageert.

### Stap 12.1 Scenario-picker

**U doet:**
- Login als willekeurig lid (bijv. Theresia).
- Sidebar → **Aanvragen & Advies** → klik rechtsboven **+ Nieuwe aanvraag** (of ga naar `/aanvragen/nieuw`).

**U ziet 4 scenario-cards:**

| Scenario | Wat het demonstreert |
|---|---|
| **A — Schone aanvraag** | Geen overlap, alle docs compleet → score laag, "geschikt voor administratieve afhandeling" |
| **B — Overlap traditioneel gebied** | DEMO_Galibi → R-SOC-001 hard blocker → FPIC-trigger |
| **C — In beschermd gebied** | DEMO_Natuurreservaat → R-RUM-001 + R-ENV-010 → NMA-review hard blocker |
| **D — Onvolledig dossier** | Figuratieve kaart ontbreekt → R-ADM-003 hard blocker |

**Klik scenario C** → systeem brengt u naar een gegenereerd advies met:
- Risk-score 75+ → zeer hoog
- 2 hard blockers (beschermd gebied + MEA)
- Trigger-badges → NMA
- Aanbeveling: *"Niet besluitbaar. Vereiste acties: NMA-reviewtaak aanmaken en MER-status afwachten."*

In ~1 seconde. Zonder server-call. Volledig regelgebaseerd.

---

## Wat u nu kunt

Na deze walkthrough kunt u:

| Module | Wat u kunt |
|---|---|
| **Login + welkom-scherm** | Inloggen als één van de 6 werkgroep-leden, dropdown met user-info, uitloggen |
| **Executive Dashboard** | KPI's lezen, fase-voortgang, top-risico's identificeren, doorklikken naar dossiers |
| **GIS-kaart** | Pannen, zoomen, lagen interpreteren, hover-popups, conflicten visueel zien |
| **Aanvragen-lijst + detail** | Dossier vinden, advies lezen, regel-IDs interpreteren, blockers begrijpen |
| **Nieuwe aanvraag (scenario-picker)** | Live demonstreren hoe de motor reageert op verschillende casetypes |
| **PDF-export** | Adviesrapport als bestand opslaan voor briefing/archief |
| **FPIC-traject** | 9 statussen begrijpen, events met evidence opbouwen, voorwaarden registreren |
| **Dossiers per district** | Patronen zien (hotspots), per district navigeren |
| **Grondhuur & Conversie** | Reminderladder lezen, conversie-blockers herkennen, vervallenverklaring-workflow volgen |
| **Milieu & NMA** | MEA-matrix lezen, EnvCases begrijpen, voorwaardelijke goedkeuring interpreteren, rehabilitatie-mijlpalen volgen |
| **Werkgroep** | Vergaderingen lezen, besluiten met stemverhouding interpreteren, actiepunten + deadlines volgen, fasenvoortgang scannen |
| **Stakeholders** | ITP-communities raadplegen, traditioneel gezag-info opzoeken, koepelorganisaties contacten |
| **Audit Trail** | Onveranderbare log lezen, hash-keten begrijpen, transparantie naar pers/IACHR demonstreren |
| **Adviesregels** | Aan iedereen uitleggen welke regel waarom triggert, hard blockers tonen, beheer-principe (PR met juridische review) communiceren |

## Wat u in deze demo NIET kunt (bewust)

- Mutaties opslaan (refresh wist alles)
- File-upload (FR-1.4 — roadmap)
- Vrij invulbaar aanvraag-formulier (alleen scenario-picker)
- Bewerken van vergaderingen / besluiten / acties (read-only)
- Echte e-mail/SMS-notificaties bij grondhuur-reminders
- Echte koppeling met MI-GLIS / GBB / NMA
- PKI/QR-handtekening op PDF
- Mobiele FPIC-app offline
- Meertaligheid (alleen NL)

Dit is bewust roadmap-werk voor pilot/integratie/burgerportaal — zie [doc 13](../docs/13-roadmap.md).

---

## Tijdslijn-samenvatting (voor demo-presentatie)

```
ma 09:00  Login + dashboard
ma 10:00  GIS-kaart context
ma 11:00  Aanvraag-detail + advies
ma 14:00  FPIC-traject openen

di 09:00  Stakeholders raadplegen
di 14:00  Dossiers vergelijken (hotspot)

wo --     Grondhuur-zijspoor (TEN-007 / CNV-2026-003)

do --     Milieu/NMA-zijspoor (EnvCase + rehab)

vr 10:00  Werkgroep-vergadering
vr 16:00  PDF-export

vlg.wk    Audit-trail check
          Transparantie aan pers
          Logout
```

Alle 11 modules + alle kruisverbanden, in één werkweek-verhaal.

---

**Versie:** 1.0 · 11 mei 2026 · Republiek Suriname · Werkarm van het Staatshoofd
