# 14 — Risicobeheer, Evaluatie en Audit

## 14.1 Risicoraamwerk

Voor elk risico vastgelegd: **kans (laag/middel/hoog) × impact (laag/middel/hoog) → score**, eigenaar, mitigatie, status.

Het risicoregister leeft in het SGDP-platform en wordt in elke maandelijkse President-rapportage geactualiseerd.

## 14.2 Risicoregister werkgroep (top-risico's)

| # | Risico | Kans | Impact | Mitigatie | Eigenaar |
|---|---|---|---|---|---|
| RW-01 | Politieke gevoeligheid blokkeert besluit | M | H | Vroege bilaterale informatie; transparantie; strikt mandaat | Voorzitter |
| RW-02 | Onvoldoende vertrouwen ITP-gemeenschappen | M | H | FPIC by design; data-eigendom; VIDS/KAMPOS in adviespool | Werkstroom Consultatie |
| RW-03 | Gebrekkige basisdata MI-GLIS / concessieregisters | H | M | Iteratieve aanvulling; FFP-LA-aanpak; dataleveranciers vroeg betrekken | Werkstroom Inv & GIS |
| RW-04 | Capaciteitsbeperking secretariaat | M | M | Heldere RACI; externe ondersteuning bij piek | Voorzitter |
| RW-05 | Vertraging FPIC-trajecten | H | M | Parallelle gebieden; geen forceren; planning op tempo gemeenschap | Werkstroom Consultatie |
| RW-06 | Lekken vertrouwelijke informatie | L | H | Geheimhoudingsverklaring; classificatie; audit log | Voorzitter |
| RW-07 | Belangenconflict lid | L | M | Belangenverklaring; onthouding stemming; transparantie | Voorzitter |
| RW-08 | Mediadruk / desinformatie | M | M | Communicatieplan; één woordvoerder; feiten op website | Voorzitter |
| RW-09 | Afwijkende interpretatie eindadvies door politiek | M | M | Heldere taal; bijlagen met bewijs; minderheidsstandpunt mogelijk | Voorzitter |
| RW-10 | Tussentijdse wisseling kabinet of mandaat | L | H | Documentatie zo dat overdracht mogelijk is | Voorzitter |

## 14.3 Risicoregister platform

| # | Risico | Kans | Impact | Mitigatie | Eigenaar |
|---|---|---|---|---|---|
| RP-01 | Demo wordt verward met productie | M | M | "DEMO"-banner; geen echte besluiten op basis ervan; communicatie | Productowner |
| RP-02 | Datalek (PII of FPIC-restricted) | L | H | Encryptie; RBAC; PII-redactie; audit; pen-test | Security lead |
| RP-03 | Onjuiste overlap-detectie (false negative) | M | H | Test-suite met bekende cases; menselijke check verplicht | Tech lead |
| RP-04 | Onjuist advies leidt tot verkeerde beschikking | M | H | Adviezen niet bindend; mens beslist; uitleg-verplicht | Tech lead + jurist |
| RP-05 | Beperkte bandbreedte / connectivity bij gebruikers | H | M | Lichte client; offline-tolerant maken in Fase 3 | Tech lead |
| RP-06 | Vendor lock-in | L | M | Open-source, open data formaten | Tech lead |
| RP-07 | Schaalbaarheidsproblemen bij groei | M | M | Architectuur-keuzes (PostGIS, modulair); review na pilot | Tech lead |
| RP-08 | Ontbreken capaciteit GIS-onderhoud | M | M | Documentatie; trainingen; partner kiezen voor onderhoud | Tech lead |
| RP-09 | Cyberaanval / ransomware | L | H | Backups offsite, encrypted, getest; least-privilege; pen-test | Security lead |
| RP-10 | Audittrail gemanipuleerd | L | H | Append-only; periodieke hash-chain; later ledger-verankering | Security lead |

## 14.4 Continuïteit en disaster recovery

| Aspect | Demo | Pilot+ |
|---|---|---|
| Backup-frequentie | Dagelijks | Real-time replicatie + dagelijks snapshot |
| Offsite backup | Wekelijks encrypted | Dagelijks encrypted in tweede regio |
| Restore-test | Eenmaal voor oplevering | Maandelijks |
| RTO (Recovery Time Objective) | 24 uur | 4 uur |
| RPO (Recovery Point Objective) | 24 uur | 1 uur |
| Incident response runbook | Lichtgewicht | Volledig met communicatieplan |

## 14.5 Audit en onafhankelijke evaluatie

### 14.5.1 Interne audit
- **Wekelijkse data-kwaliteit check** door secretariaat (volledigheid velden, ontbrekende verbindingen tussen RRR en SpatialUnit).
- **Maandelijkse procesreview** door voorzitter.
- **Per fase**: interne kwaliteitstoets door werkstroom-trekkers onderling.

### 14.5.2 Klankbord-review
- Voor elk groot tussentijds product (inventarisatieverslag, conflictrapport, conceptadvies).
- Adviespool levert schriftelijke feedback binnen 10 werkdagen.

### 14.5.3 Onafhankelijke externe audit
- **Bij oplevering pilot**: security audit door externe partij.
- **Jaarlijks (productie)**: full audit op proces, data-integriteit, FPIC-naleving.
- **Op verzoek**: audit door internationale toezichthouder (UN-Habitat, FAO, IACHR-volgende NGO).

### 14.5.4 Auditbeleid platform
| Auditdomein | Methode | Frequentie |
|---|---|---|
| Toegangscontrole | Logreview + steekproeven | Maandelijks |
| Wijzigingen op records | Audit log integriteit + hash-check | Wekelijks |
| Adviesmotor consistentie | Replay van eerdere cases met huidige regelversie | Per regelwijziging |
| Backup integriteit | Restore-test | Maandelijks (productie) |
| Beveiliging | Pen-test | Jaarlijks + bij major release |
| FPIC-naleving | Steekproef + interview gemeenschap | Per kwartaal |

## 14.6 Evaluatieraamwerk werkgroep

| Niveau | Wat wordt geëvalueerd | Wanneer |
|---|---|---|
| Vergadering | Korte retro: start/stop/continue | Elke vergadering, 5 min |
| Werkstroom | Voortgang, kwaliteit outputs | Maandelijks |
| Werkgroep totaal | Alignment met mandaat, samenwerking, blokkades | Per faseovergang |
| Stakeholderbeleving | Survey + interviews | Halverwege en einde |
| Eindevaluatie | Onafhankelijk evaluator (bv. UN-Habitat) | Bij afronding |

### 14.6.1 Evaluatiecriteria eindadvies aan President
- Compleetheid (D1–D6 alle gedekt)
- Onderbouwing (bron + bewijs per claim)
- Uitvoerbaarheid (concrete roadmap)
- FPIC-naleving (gedocumenteerd per gebied)
- Risico-bewustzijn (expliciet risicoregister)
- Begrijpelijkheid (samenvatting + jargon-vrije versie)
- Politieke realisme (Fasering, niet alles tegelijk)

## 14.7 Compliance-matrix

| Onderwerp | Bron | Compliance-aanpak |
|---|---|---|
| FPIC | UNDRIP, VIDS-document | Procedure §11.3, blokkerende regels, audit |
| ITP-eigendom | IACHR Saramaka & Kaliña-Lokono | STDM-laag, blokkerende regels, transparantie |
| Domeingrond procedure | Decreet Uitgifte Domeingrond | Workflow §FR-1, twee aanvraagtypen |
| Registratie | MI-GLIS | Aansluiting in Fase 2 (integratie) |
| Persoonsgegevens | Goede praktijken + komende SR-wetgeving | Minimale verzameling, redactie, RBAC |
| Toegankelijkheid | WCAG 2.1 AA | Streven; checklists in QA |
| Webveiligheid | OWASP Top 10 | SAST/DAST, dependency scanning |
| Datastandaarden | LADM, STDM, OGC | Verankerd in datamodel + API |

## 14.8 Continue verbetering

- **Lessons learned** na elke fase-overgang gedocumenteerd in dossier.
- **Regelset adviesmotor** wordt verbeterd op basis van afwijzingen of acceptaties door menselijke beoordelaars.
- **Stakeholder-feedback** wordt minimaal halfjaarlijks omgezet in concrete platform-aanpassingen.
- **Internationale benchmarking** (Estland, Nederland, Rwanda, Colombia) jaarlijks heroverwogen.
