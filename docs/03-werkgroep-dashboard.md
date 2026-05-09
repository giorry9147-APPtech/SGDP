# 03 — Dashboard, KPI's, Mijlpalen, Rapportage

## 3.1 Doel van het dashboard

Eén centrale digitale plek waar de voorzitter, leden, secretariaat en (gedeeltelijk) de President in real-time kunnen zien:

- waar de werkgroep staat in het proces;
- welke besluiten en acties open zijn;
- welk advies klaar is en welk niet;
- waar zich risico's, conflicten of FPIC-blokkades bevinden;
- welke gemeenschappen, gebieden en dossiers nog aandacht behoeven.

Het dashboard maakt deel uit van het **SGDP-platform** ([09-architectuur.md](09-architectuur.md)).

## 3.2 Dashboard-views

### 3.2.1 Voorzitter / President-view (executive)
Hoogste niveau, één scherm:

```
┌──────────────────────────────────────────────────────────────────┐
│ SGDP — Executive Dashboard                                       │
├──────────────────────────────────────────────────────────────────┤
│ Fase huidig: F2 Inventarisatie       Voortgang totaal: ▓▓▓░░ 42% │
│                                                                  │
│ ► MIJLPALEN (komende 30 dagen)                                   │
│   • M2.3  Kaartlaag concessies opgeleverd      ◐ in uitvoering   │
│   • M3.1  Eerste FPIC-consultatie Marowijne    ○ gepland 12-jun  │
│   • M2.4  Inventarisatieverslag conceptklaar   ◐ at risk         │
│                                                                  │
│ ► KPI's                                                          │
│   ITP-gebieden geïnventariseerd       12 / 51   ▓▓░░░ 24%        │
│   FPIC-instemming verkregen            3 / 51   ▓░░░░  6%        │
│   Open besluiten                       7                         │
│   Open actiepunten                    23  (5 over deadline)      │
│   Hoog-risico dossiers                 4                         │
│                                                                  │
│ ► RISICO'S (top 3)                                               │
│   • Overlap concessie X met dorp Y — juridisch advies vereist    │
│   • FPIC-vertraging in gebied Z                                  │
│   • Data-tekort historische kaarten                              │
└──────────────────────────────────────────────────────────────────┘
```

### 3.2.2 Werkstroom-view
Voor trekkers, gericht op operationeel werk:
- actiepuntenlijst met filtering op werkstroom, eigenaar, deadline;
- documenten-statuslijst (concept, in review, goedgekeurd);
- consultatieagenda en logistiek;
- dossierstatussen (nieuwe, in onderzoek, klaar voor advies);
- conflictsignalen vanuit het platform.

### 3.2.3 Geografisch dashboard (kaart)
Interactieve kaart met laagselectie:
- ITP-gebieden, dorpen, traditionele woon-/leefgebieden;
- domeingrond, percelen, concessies (mijnbouw, hout, landbouw);
- beschermde gebieden (natuurreservaten);
- conflicthotspots (kleurcodering rood/oranje/geel/groen);
- consultatie-status per gebied (icoon).

### 3.2.4 Stakeholder-view
- Overzicht van betrokken gemeenschappen, organisaties, ministeries;
- laatste contactmoment, geplande contactmomenten;
- status FPIC per gemeenschap;
- contactpersonen.

## 3.3 KPI's

### 3.3.1 Proces-KPI's
| KPI | Definitie | Streefwaarde | Frequentie |
|---|---|---|---|
| Voortgang fase | % opgeleverde producten in huidige fase | volgens planning | wekelijks |
| Besluiten op tijd | % besluiten binnen geplande vergadering | ≥ 90% | maandelijks |
| Acties op tijd | % actiepunten afgerond vóór deadline | ≥ 85% | wekelijks |
| Notulen tijdig | % notulen binnen 48 uur na vergadering | 100% | wekelijks |
| Klankbord-doorlooptijd | Mediane tijd van conceptdocument naar feedback | ≤ 10 werkdagen | maandelijks |

### 3.3.2 Inhoudelijke KPI's
| KPI | Definitie | Streefwaarde |
|---|---|---|
| ITP-gebieden geïnventariseerd | Aantal vs. totaal geïdentificeerde gebieden | 100% einde F2 |
| FPIC voltooid | Aantal gebieden met afgeronde consultatieronde | 100% einde F3 |
| Conflicten in kaart | Aantal geïdentificeerde overlappingen | volledig einde F2 |
| Aanbevelingen onderbouwd | % aanbevelingen met expliciete bron + bewijs | 100% |

### 3.3.3 FPIC- en draagvlak-KPI's
| KPI | Definitie | Streefwaarde |
|---|---|---|
| FPIC-instemming | % gebieden met instemming (incl. voorwaardelijk) | te volgen, niet te forceren |
| Klachten / bezwaren | Aantal openstaande, mediane afhandeltijd | ≤ 30 dagen mediaan |
| Stakeholdertevredenheid | Survey-score 1–10 | ≥ 7 |

## 3.4 Mijlpalen (indicatief 40-weekse werkperiode)

| Fase | Code | Mijlpaal | Doelweek |
|---|---|---|---|
| F1 | M1.1 | Constituerende vergadering, mandaat bevestigd | W1 |
| F1 | M1.2 | Plan van aanpak vastgesteld | W3 |
| F1 | M1.3 | RACI + communicatieplan vastgesteld | W4 |
| F2 | M2.1 | Datasources geïdentificeerd, koppelingen besproken | W6 |
| F2 | M2.2 | GIS-baseline operationeel in SGDP | W10 |
| F2 | M2.3 | Concessielaag, MI-GLIS-laag, ITP-laag samengevoegd | W14 |
| F2 | M2.4 | Inventarisatieverslag concept | W16 |
| F3 | M3.1 | Eerste veldconsultatie | W12 |
| F3 | M3.2 | 50% gebieden FPIC-traject gestart | W20 |
| F3 | M3.3 | Consultatieverslagen tussentijds | W24 |
| F3 | M3.4 | FPIC-status overzicht volledig | W28 |
| F4 | M4.1 | Conflictanalyse rapport | W26 |
| F4 | M4.2 | Juridische opties uitgewerkt | W30 |
| F4 | M4.3 | Conceptadvies ter consultatie | W32 |
| F4 | M4.4 | Klankbord-review afgerond | W34 |
| F5 | M5.1 | Eindadvies definitief | W38 |
| F5 | M5.2 | Aanbieding aan President | W39 |
| F5 | M5.3 | Overdrachtsdossier en publieke samenvatting | W40 |

## 3.5 Rapportageformats

### 3.5.1 Wekelijks voortgangsoverzicht (1 pagina)
- Status-stoplicht (groen / oranje / rood) per werkstroom
- Behaalde resultaten week
- Geplande resultaten komende week
- Top 3 risico's
- Vragen / besluiten benodigd

### 3.5.2 Maandelijks rapport President (4–6 pagina's)
- Samenvatting in 5 bullets
- Voortgang per doelstelling (D1–D6)
- Mijlpaalstatus
- Belangrijkste consultaties en uitkomsten
- Risico's en verzoeken aan President
- Volgende stappen

### 3.5.3 Kwartaalrapport publiek (8–12 pagina's)
- Toegankelijk geschreven, samenvatting voor pers
- Beschrijving van aanpak en transparantie
- Geanonimiseerde voortgang per gebied
- Hoofdbevindingen tot dusver
- Kalender komend kwartaal

### 3.5.4 Eindadvies aan President
- Hoofdrapport (40–80 pagina's)
- Beleidsamenvatting (max. 6 pagina's)
- Bijlagen: kaartenset, consultatieoverzicht, juridische analyse, conflictinventarisatie, FPIC-status, implementatieroadmap, begroting, risicoregister, dataset-overzicht
- Minderheidsstandpunt indien van toepassing
