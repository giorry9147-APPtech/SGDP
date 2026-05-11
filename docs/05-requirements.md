# 05 — Requirements

> Notatie: **MUST** = vereiste demo/MVP, **SHOULD** = sterk gewenst, **COULD** = nice-to-have, **WON'T (now)** = expliciet uit demo-scope, in roadmap.

## 5.1 Functionele requirements

### FR-1 Digitale aanvraagmodule (domeingrond)
- FR-1.1 **MUST** Burger of bevoegde indiener kan een aanvraag online starten en opslaan als concept.
- FR-1.2 **MUST** Het systeem herkent twee aanvraagtypes (specifiek met figuratieve kaart / kaart van uitmeting; algemeen) — conform Decreet Uitgifte Domeingrond.
- FR-1.3 **MUST** Verplichte velden: identiteit indiener, **nationaliteit/rechtspersoonlijkheid**, doel, oppervlakte, locatie, contactgegevens.
- FR-1.4 **MUST** Documenten kunnen worden geüpload (PDF, JPG, PNG, GeoJSON/Shapefile/KML, GeoPackage).
- FR-1.5 **MUST** Het systeem signaleert ontbrekende documenten op basis van type aanvraag (minimaal: **nationaliteitsverklaring, ID-kopie, figuratieve kaart**).
- FR-1.6 **MUST** Validatie van **PERCEELSID** waar opgegeven: bestaat, geometrie consistent met opgegeven oppervlakte.
- FR-1.7 **MUST** Validatie conform Besluit GLIS 2025: identiteitsvelden, partijtype, perceelsidentificatie, bronstuktype.
- FR-1.8 **SHOULD** Burger ontvangt geautomatiseerde bevestiging en zaaknummer.
- FR-1.9 **COULD** Aanvraag kan via mobiele app + GPS in het veld worden ingevoerd.

### FR-2 Dossiermodule
- FR-2.1 **MUST** Per zaak één digitale map met: aanvraag, kaart, identiteit, documenten, correspondentie, besluiten, bezwaren, bewijsmateriaal, GPS-punten.
- FR-2.2 **MUST** Versionering — geen overschrijving, alleen nieuwe versies.
- FR-2.3 **MUST** Statussen: ontvangen → incompleet → in onderzoek → landmetercontrole → bezwaarperiode → juridisch advies → besluit → beschikking → registratie.
- FR-2.4 **MUST** Audit trail: wie, wanneer, wat, oude/nieuwe waarde.
- FR-2.5 **SHOULD** Tagging op district, type, prioriteit, risiconiveau.

### FR-3 GIS-kaart
- FR-3.1 **MUST** Interactieve kaart met laagselectie:
  - percelen (MI-GLIS / lokaal),
  - actieve aanvragen,
  - eigendom / erfpacht / grondhuur,
  - concessies,
  - dorpen,
  - traditionele woon- en leefgebieden (ITP),
  - beschermde gebieden,
  - infrastructuur (wegen, kreken, rivieren),
  - betwiste gebieden.
- FR-3.2 **MUST** Inzoomen, verschuiven, lagen aan/uit, klik op object voor info.
- FR-3.3 **MUST** Import van standaardformaten: GeoJSON, Shapefile, KML.
- FR-3.4 **SHOULD** Tekenfunctie voor nieuw perceel/contour.
- FR-3.5 **SHOULD** Print/export naar PDF voor dossier.
- FR-3.6 **COULD** Tijdslider (4D) voor historische lagen.
- FR-3.7 **COULD** Achtergrondlaag satellietbeelden.

### FR-4 Overlap-check
- FR-4.1 **MUST** Bij elke nieuwe aanvraag automatische check tegen alle relevante lagen.
- FR-4.2 **MUST** Resultaten: lijst van overlappende objecten + percentage overlap.
- FR-4.3 **MUST** Onderscheid in overlapsoort: bestaand recht, eerdere aanvraag, ITP-gebied, concessie, beschermd gebied.
- FR-4.4 **SHOULD** Topologie-validatie (gaps/slivers, zelf-snijdende polygonen).
- FR-4.5 **SHOULD** Visuele weergave van overlapping op kaart.

### FR-5 Conflict-risicoscore
- FR-5.1 **MUST** Score laag / middel / hoog op basis van regels (zie [10-adviesmotor.md](10-adviesmotor.md)).
- FR-5.2 **MUST** Score is herleidbaar (welke regels droegen bij).
- FR-5.3 **SHOULD** Geschiedenis van scores per dossier (voor leerproces).

### FR-6 Adviesrapport-generator
- FR-6.1 **MUST** Per dossier kan een gestructureerd adviesrapport worden gegenereerd.
- FR-6.2 **MUST** Rapport bevat **6 categorieën**: administratief, juridisch, ruimtelijk, sociaal/FPIC, beleid, **bestuurlijk-financieel** (zie [10-adviesmotor.md §10.2](10-adviesmotor.md)).
- FR-6.3 **MUST** Onderbouwing per advies (welk regel, welk bewijs, welke bron).
- FR-6.4 **SHOULD** Export PDF en bewerkbaar markdown.
- FR-6.5 **COULD** Vrije-tekst-uitleg met LLM (met menselijke toets).

### FR-7 Admin-dashboard
- FR-7.1 **MUST** Aantal openstaande dossiers, doorlooptijd, achterstand.
- FR-7.2 **MUST** Filter op district, status, risiconiveau.
- FR-7.3 **MUST** Conflicthotspots op kaart.
- FR-7.4 **SHOULD** Export naar CSV/PDF.
- FR-7.5 **SHOULD** Persoonlijke werkbak per ambtenaar.

### FR-8 FPIC- en consultatiemodule
- FR-8.1 **MUST** Registratie betrokken gemeenschap, traditioneel gezag (granman/kapitein/basja).
- FR-8.2 **MUST** Registratie consultatiemomenten: datum, locatie, aanwezigen, agenda, verslag, bewijs (audio/video/foto/handtekening).
- FR-8.3 **MUST** FPIC-statussen (zie [02-werkgroep-werkwijze.md §2.4.3](02-werkgroep-werkwijze.md#243-fpic-statussen-in-het-platform)).
- FR-8.4 **MUST** Documenten in begrijpelijke en lokale taal koppelen.
- FR-8.5 **SHOULD** Bezwaar- en voorwaardenregistratie.
- FR-8.6 **SHOULD** Consent kan voorwaardelijk of ingetrokken zijn.

### FR-9 Werkgroep-werkruimte
- FR-9.1 **MUST** Agenda, notulen, besluitenregister, actiepuntenlijst.
- FR-9.2 **MUST** Documentenbibliotheek per werkstroom.
- FR-9.3 **MUST** Dashboard ([03-werkgroep-dashboard.md](03-werkgroep-dashboard.md)).
- FR-9.4 **SHOULD** Export wekelijks/maandelijks rapport.

### FR-10 Publiek portaal
- FR-10.1 **SHOULD** Status volgen op zaaknummer.
- FR-10.2 **SHOULD** Publieke kaart (geanonimiseerd) raadplegen.
- FR-10.3 **SHOULD** Bezwaar online indienen.
- FR-10.4 **WON'T (now)** Volledige burger-account met wallet/eID.

### FR-11 Audit & anti-corruptie
- FR-11.1 **MUST** Onveranderlijk auditlog per record.
- FR-11.2 **MUST** Toegangscontrole per rol.
- FR-11.3 **SHOULD** Geautomatiseerde alarmen bij ongebruikelijke patronen (bv. snel opeenvolgende statuswijzigingen door dezelfde gebruiker).
- FR-11.4 **COULD** Verankering van hashes op een externe ledger (zie roadmap).

### FR-12 Adviesmotor
- FR-12.1 **MUST** Regelgebaseerde engine (transparant, uitlegbaar).
- FR-12.2 **MUST** Regelset configureerbaar door beheerders.
- FR-12.3 **SHOULD** Audit van regelversies.
- FR-12.4 **COULD** ML-aanvulling met explainability (later).

### FR-13 Integraties (later)
- FR-13.1 **WON'T (now), roadmap** Realtime koppeling MI-GLIS.
- FR-13.2 **WON'T (now), roadmap** Koppeling concessieregisters (NH/GMD/SBB).
- FR-13.3 **WON'T (now), roadmap** Koppeling identiteitsregister (DBZ/CBA/e-ID).
- FR-13.4 **WON'T (now), roadmap** Koppeling NMA-vergunningenregister.
- FR-13.5 **WON'T (now), roadmap** Koppeling WRO-bestemmingenregister.
- FR-13.6 **WON'T (now), roadmap** Koppeling rechtspraak/bestuursbesluiten.

### FR-14 Federatief mandaat- en workflowmodel
- FR-14.1 **MUST** Workflow respecteert institutionele scheiding **MI-GLIS ↔ Domeinkantoor/GBB**: registratie en aanvraag-workflow zijn aparte beslislijnen.
- FR-14.2 **MUST** Beslissingsbevoegdheid is per stap geattribueerd aan het juiste orgaan (zie [15-juridisch-kader.md §15.4](15-juridisch-kader.md#154-federatief-autorisatie--en-mandaatmodel)).
- FR-14.3 **MUST** "Authoritative source per gegevenstype" — SGDP overschrijft nooit master-data van een ander orgaan zonder expliciete koppeling.

### FR-15 Verlenging, conversie, vervallenverklaring
- FR-15.1 **MUST** Grondhuur wordt geregistreerd met `start_date`, `end_date`, jaarlijkse vergoeding; looptijd 15–40 jaar gevalideerd.
- FR-15.2 **MUST** Reminders 12 / 9 / 6 maanden voor `end_date`.
- FR-15.3 **MUST** Verlengingsverzoek na de **6-maanden-deadline** wordt geweigerd of als laat-verzoek gemarkeerd.
- FR-15.4 **MUST** Conversie-workflow conform Besluit Grondconversie 2023 met PERCEELSID-kaart, hypothecair uittreksel en betalingsbewijs.
- FR-15.5 **SHOULD** Vervallenverklaring-workflow met hoor en wederhoor, bezwaarperiode, schadeloosstellingsspoor.

### FR-16 Milieu / NMA
- FR-16.1 **MUST** Triggers: beschermd gebied, MEA-plichtige activiteit, verontreinigd gebied, reservaat met traditioneel gebruik.
- FR-16.2 **MUST** Bij MEA-plicht: **hard blocker** op finale beschikking tot MER-status `goedgekeurd`.
- FR-16.3 **MUST** NMA-reviewer rol met read/write op milieu-zaak; advies en voorwaarden vastleggen.
- FR-16.4 **SHOULD** Rehabilitatieplan met mijlpalen.
- FR-16.5 **WON'T (now), roadmap** Realtime koppeling NMA-vergunningenregister.

### FR-17 Publicatie en bezwaartermijn
- FR-17.1 **MUST** Bij publicatie van aanvraag start een **30-daagse bezwaartermijn-klok** (Decreet Uitgifte Domeingrond).
- FR-17.2 **MUST** Het systeem **blokkeert besluitvorming** tot termijn verstreken is óf bezwaar afgehandeld.
- FR-17.3 **MUST** Bezwaren leven in een register met status, eigenaar, deadline.
- FR-17.4 **SHOULD** Publieke kennisgeving filteren op district / community / perceel.

### FR-18 Document-verificatie (PKI/QR)
- FR-18.1 **SHOULD** Uitgegeven documenten dragen QR-code die naar `/api/v1/documents/{id}/verify` verwijst.
- FR-18.2 **SHOULD** Verificatie controleert hash, handtekening en uitgevende organisatie.
- FR-18.3 **WON'T (now), roadmap** Volledige overheids-PKI-keten met andere organen.

### FR-19 Configurabele wetregimes
- FR-19.1 **MUST** Per zaak wordt het toepasselijke wetregime vastgelegd (`domeingrond_decreet_version`, `glis_inschrijvingsbesluit_version`, `collectieve_rechten_status`, `privacy_regime`, `wro_version`, `financiele_autonomie_version`, `dc_ontkoppeling_status`, `comptabiliteitswet_version`).
- FR-19.2 **SHOULD** Regelset in adviesmotor is uitwisselbaar zonder code-deploy ([10-adviesmotor.md §10.9](10-adviesmotor.md#109-beheer-en-versionering-van-regels)).
- FR-19.3 **MUST** WRO-wetshistorie (1989 + S.B. 2000/2002/2005/2015 + ontwerpwetten 2026) is versioned vastgelegd in `LegalProvision` ([08 §8.8.4](08-data-model.md)).

### FR-20 Bestuurlijke entiteiten (WRO)
- FR-20.1 **MUST** Datamodel bevat `AdministrativeUnit` voor 10 districten en 62 ressorten met officiële SR-grenzen.
- FR-20.2 **MUST** Elke `LA_SpatialUnit` wordt geografisch toegewezen aan precies één ressort (en daarmee aan één district).
- FR-20.3 **MUST** GIS-kaart heeft administratieve laag (district + ressort) met filter.
- FR-20.4 **MUST** `RegionalBody` (DR/RR/DC) per administratieve eenheid, met `chairperson_party_id` apart van `dc_party_id` (vooruitlopend op DC-ontkoppelingswet).
- FR-20.5 **SHOULD** `Competence` koppelt bevoegdheden aan organen en bronartikelen.
- FR-20.6 **SHOULD** `RegionalDecision` registreert DR-/RR-besluiten met stemverhouding en bevoegdheidsdekking.
- FR-20.7 **WON'T (now), roadmap** Volledige DR/RR-werkruimte (analoog aan werkgroep-werkruimte) — fase 1.

### FR-21 Financiële Decentralisatie / Districtsfonds
- FR-21.1 **MUST** `DistrictFund` per district per begrotingsjaar, met `algemene_afdracht`, `eigen_inkomsten`, `uitgaven`, `saldo`.
- FR-21.2 **MUST** `RevenueSource` typed naar Interimregeling-categorieën (huurwaarde, vermakelijkheid, leges, marktgeld, parkeergeld, concessie-royalty, grondhuur-aandeel, ITP-royalty-aandeel).
- FR-21.3 **MUST** Elke `RevenueSource` is herleidbaar naar `linked_rrr_id` en/of `linked_spatial_unit_id`.
- FR-21.4 **MUST** Level-2-certificering per district vastgelegd; adviesregel `BF-02` blokkeert eigen tarief zonder certificering.
- FR-21.5 **SHOULD** District-portaal met fondspagina (lichte versie in demo, fictieve cijfers).
- FR-21.6 **SHOULD** Adviesregel `BF-04` signaleert conflicten met Comptabiliteitswet.
- FR-21.7 **WON'T (now), roadmap** Daadwerkelijke koppeling Ministerie van Financiën / CBvS grootboek — fase 2.
- FR-21.8 **WON'T (now), roadmap** Fiscaal-simulator — fase 4.

### FR-22 Benefit sharing (koppeling grond ↔ fondsen ↔ ITP)
- FR-22.1 **MUST** `BenefitShare`-entiteit verbindt concessie/grondhuur ↔ district ↔ ITP-gemeenschap met verdeelpercentages.
- FR-22.2 **MUST** Adviesregel `BF-06` triggert bij overlap concessie ↔ `customary_territory` en stelt scenario (A/B/C/D) voor.
- FR-22.3 **MUST** `BenefitShare` is onlosmakelijk gekoppeld aan een `FPIC_Process`; status `proposed` → `under_fpic` → `agreed` → `ratified`.
- FR-22.4 **MUST** Bekrachtiging vereist meerdere ratificaties (`ratified_by` json: bv. `dna_resolution`, `min_fin_decree`, `community_consent`).
- FR-22.5 **SHOULD** Adviesrapport categorie 6 toont voorgestelde verdeling met juridische onderbouwing (IACHR Saramaka, WRO Interimregeling).
- FR-22.6 **WON'T (now), roadmap** Periodieke royalty-monitoring met afwijkingssignalering — fase 3.
- FR-22.7 **WON'T (now), roadmap** Hash-verankerde benefit-keten + IACHR-rapportage — fase 4.

### FR-23 Wet- & bevoegdhedenbibliotheek
- FR-23.1 **MUST** Publiek leesbare pagina `/wetten` met WRO 1989 + alle S.B.-wijzigingen, Interimregeling Financiële Decentralisatie, Comptabiliteitswet-relevante artikelen, ontwerpwetten 2026.
- FR-23.2 **MUST** Elke wetstekst is gekoppeld aan `LegalProvision`-records (versioned) en wordt door adviesmotor en `Competence`-tabel gerefereerd.
- FR-23.3 **SHOULD** Conceptwet-tracker voor de twee aanstaande wetten 2026 (statisch in demo, levend in pilot).
- FR-23.4 **SHOULD** Wijzigingen aan ruleset of bevoegdhedentabel via PR met juridische review (analoog aan `/regels`).

## 5.2 Niet-functionele requirements

### NFR-1 Beschikbaarheid en performance
- NFR-1.1 Platform **99,5%** beschikbaar tijdens kantoortijden (productie); demo: best effort.
- NFR-1.2 95e percentiel: dossierweergave < 2 sec; standaard kaartlaag + perceelinfo < 3 sec; overlapanalyse < 10 sec.
- NFR-1.3 Onderhoudsvensters planbaar; read-only fall-back voor publieke laag.

### NFR-1b Disaster recovery
- NFR-1b.1 Dagelijkse full backup; point-in-time recovery primaire database.
- NFR-1b.2 **RPO ≤ 24 uur** (productie) — demo: best effort.
- NFR-1b.3 **RTO ≤ 8 uur** voor kernregistratie (productie).

### NFR-2 Beveiliging
- NFR-2.1 **Zero-trust toegang**: MFA voor interne gebruikers; SSO via Surinaamse **Digitale-ID** waar beschikbaar; service-to-service authenticatie met korte tokens.
- NFR-2.2 **RBAC + ABAC**: rolgebaseerd plus attribuutgebaseerd voor gevoelige lagen (sacred sites, FPIC-restricted, persoonsgegevens).
- NFR-2.3 Encryptie in transit (TLS 1.3) en at rest (AES-256); sleutelrotatie minimaal jaarlijks.
- NFR-2.4 Logging van alle authenticatiepogingen en toegang tot gevoelige data.
- NFR-2.5 Demo: lokale of beperkte cloud-hosting; geen export PII zonder filter.

### NFR-3 Privacy en data-eigendom
- NFR-3.1 Persoonsgegevens minimaal en gescheiden van publieke kaart.
- NFR-3.2 ITP-gemeenschap heeft inzage en correctierecht op haar data.
- NFR-3.3 Publicatie alleen na geautomatiseerde PII-redactie.

### NFR-4 Usability
- NFR-4.1 Nederlandstalige interface (demo).
- NFR-4.2 Voorbereid op meertaligheid (Sranantongo, Saramaccaans, e.a.) — i18n in code.
- NFR-4.3 WCAG 2.1 AA (streven).
- NFR-4.4 Mobielvriendelijke webinterface.

### NFR-5 Onderhoudbaarheid en standaarden
- NFR-5.1 Datamodel afgeleid van LADM (ISO 19152).
- NFR-5.2 STDM-uitbreiding voor informele/collectieve rechten.
- NFR-5.3 OGC-conforme GIS-API: **WMS** voor kaartbeelden, **WFS** of **OGC API – Features** voor objectdata, **GeoJSON** voor web/mobile, **GML** voor overheidsketens.
- NFR-5.4 Open formaten (GeoJSON, GeoPackage, GeoTIFF, Shapefile, PDF/A).
- NFR-5.5 **INSPIRE** als referentieprofiel voor metadata en thematische modellen.
- NFR-5.6 Code in Git, semantische versionering, CI/CD.

### NFR-5b Offline / mobile
- NFR-5b.1 Mobiele app moet minstens **7 dagen offline** kunnen werken.
- NFR-5b.2 Conflictvrije synchronisatie bij her-connectie.
- NFR-5b.3 Lokale encryptie van veldgegevens.

### NFR-6 Schaalbaarheid (toekomst)
- NFR-6.1 Architectuur ondersteunt opschalen naar 100k+ dossiers.
- NFR-6.2 Microservices of duidelijk modulair monolith.
- NFR-6.3 Database keuze ondersteunt geo (PostGIS).

### NFR-7 Auditbaarheid
- NFR-7.1 Onveranderlijk auditlog (append-only) gescheiden van transactionele DB.
- NFR-7.2 Logs minimaal 7 jaar bewaard.
- NFR-7.3 Logs export-baar voor onafhankelijke audit.

### NFR-8 Compliance
- NFR-8.1 Aansluiting bij FAO VGGT-principes.
- NFR-8.2 FPIC-procedure conform UNDRIP en VIDS-document.
- NFR-8.3 Conformiteit met Surinaamse wetgeving (Decreet Uitgifte Domeingrond, ontwerpwet Collectieve Rechten ITP, MI-GLIS-regelgeving).

## 5.3 Acceptatiecriteria demo (samenvattend)

De demo wordt **geaccepteerd** wanneer alle MUST-items van FR-1 t/m FR-9, FR-11, FR-12 en de demo-subset van FR-20 t/m FR-23 functioneel werken op een testdataset met:
- 10 districten en 62 ressorten als kaart- en bestuurlijke laag (officiële SR-grenzen),
- ten minste 50 percelen,
- ten minste 5 ITP-dorpen met traditioneel gebied,
- ten minste 3 concessies (waarvan 1 met overlap en `BenefitShare`-voorstel),
- ten minste 10 voorbeeldaanvragen (waarvan 3 met conflict),
- ten minste 3 demo-districten met fictieve `DistrictFund`-pagina,
- de adviesmotor minimaal 15 regels in alle 6 categorieën produceert (categorie 6 minimaal `BF-01`, `BF-02`, `BF-06`),
- de `/wetten`-pagina toont WRO 1989 + minimaal 4 wijzigingen + Interimregeling.

Zie [07-mvp-demo-scope.md](07-mvp-demo-scope.md) voor exacte demo-afbakening.
