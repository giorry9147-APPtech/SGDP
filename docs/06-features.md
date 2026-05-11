# 06 — Volledig Featureoverzicht

> Dit is de volledige catalogus van features die het platform op termijn moet bieden. De **demo-scope** is een geselecteerde subset, zie [07-mvp-demo-scope.md](07-mvp-demo-scope.md).

## Module 1 — Digitale Kaartlaag (GIS)

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Basiskaart met laagselectie | Topografisch + satelliet + lagen aan/uit | ✅ |
| Vector overlays | Percelen, dorpen, concessies, ITP-gebieden | ✅ |
| Klik op object → infovenster | Tonen attributen en links naar dossier | ✅ |
| Tekenen / wijzigen polygoon | Voor nieuwe aanvraag of demarcatie | ✅ |
| Import GeoJSON / Shapefile / KML | Bestaande data inladen | ✅ |
| Export naar PDF / GeoJSON | Voor dossier en delen | ✅ |
| Tijdslider (4D) | Historische lagen | ⏳ later |
| 3D-viewer | Bij gebouwen, mijnbouw | ⏳ later |
| Heatmap conflictdichtheid | Voor beleidsanalyse | ⚠️ basic |

## Module 2 — Claims- en Rechtenregister

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Eigendom | Volle eigendom | ✅ |
| Erfpacht | Met looptijd | ✅ |
| Grondhuur | Met voorwaarden | ✅ |
| Domeingrondaanvraag | In behandeling | ✅ |
| Collectieve rechten ITP | Dorpsgebieden, traditioneel gezag | ✅ |
| Traditioneel gebruik | Jacht, vis, landbouw, cultureel | ✅ |
| Concessies | Mijnbouw, hout, landbouw | ✅ |
| Beperkingen / lasten | Hypotheek, beslag, dienstbaarheid | ⚠️ basic |
| Hypotheken | Volledige administratie | ⏳ later |
| Betwiste gebieden | Eigen status + historie | ✅ |

## Module 3 — Dossiermodule

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Aanvrager / partijen | Persoon, organisatie, gemeenschap | ✅ |
| Documenten | PDF, foto, kaart, GPS | ✅ |
| Versionering | Geen overschrijving | ✅ |
| Correspondentie | In/uit-log | ✅ |
| Besluiten | Interne en externe | ✅ |
| Bezwaren | Indienen, behandelen, status | ⚠️ basic |
| Bewijsmateriaal | Foto's, video, audio, getuigenissen | ✅ |
| GPS-punten | Coördinatenset met datum/bron | ✅ |
| Landmeterstukken | Aparte categorie | ✅ |

## Module 4 — Workflow voor Aanvragen

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Statussen | Ontvangen → … → Registratie | ✅ |
| Triggers | Statuswijziging activeert checks/notificaties | ✅ |
| Toewijzing | Aan ambtenaar of werkstroom | ✅ |
| SLA's | Doorlooptijd-bewaking | ⚠️ indicator |
| Escalatie | Bij overschrijding | ⏳ later |
| Workflow-editor | Configureerbaar zonder code | ⏳ later |

## Module 5 — Overlap- en Conflictdetectie

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Overlap met bestaand recht | Polygoon-vs-polygoon | ✅ |
| Overlap met aanvraag in behandeling | Voorkom dubbele toekenning | ✅ |
| Overlap met ITP-gebied | Trigger FPIC | ✅ |
| Overlap met concessie | Sectorale check | ✅ |
| Overlap met beschermd gebied | Natuurbeleid | ✅ |
| Document-incompleetheid | Op basis van type aanvraag | ✅ |
| Inconsistentie kaart vs. akte | Oppervlakte- of grensafwijking | ⚠️ basic |
| Dubbele aanvraag | Zelfde indiener / zelfde polygoon | ✅ |

## Module 6 — FPIC- en Consultatiemodule

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Gemeenschappenregister | Dorpen, gezag | ✅ |
| Consultatieagenda | Datum, locatie, agenda | ✅ |
| Verslagen | Notulen, audio, video, foto | ✅ |
| Documenten in begrijpelijke taal | Lokale vertalingen | ⚠️ NL only in demo |
| FPIC-status | 9 statussen (zie [02](02-werkgroep-werkwijze.md#243)) | ✅ |
| Bezwaar / instemming / voorwaarden | Met onderbouwing | ✅ |
| Bewijs van participatie | Lijst aanwezigen, bewijsstuk | ✅ |

## Module 7 — Adviesmotor

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Administratief advies | Compleetheid dossier | ✅ |
| Juridisch advies | Type recht, procedure, risico | ✅ |
| Ruimtelijk advies | Overlap, bestemming, beschermd | ✅ |
| Sociaal advies | FPIC, gemeenschap betrokken | ✅ |
| Beleidsadvies | Hotspots, ontbrekende registratie, demarcatie-prioriteiten | ⚠️ basic |
| **Bestuurlijk-financieel advies** | Districtsopbrengst, WRO-bevoegdheid, Comptabiliteitswet-conflict, ITP-royalty | ⚠️ basic (3 regels) |
| Regelconfiguratie | Zonder code aanpassen | ⏳ later |
| Uitleg per advies | Welke regels, welk bewijs | ✅ |

Zie [10-adviesmotor.md](10-adviesmotor.md) voor de regels.

## Module 8 — Publiek Portaal

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Status volgen | Op zaaknummer | ⏳ later (alleen stub) |
| Documenten uploaden | Burgerlijk | ⏳ later |
| Bezwaar indienen | Online formulier | ⏳ later |
| Publieke kaart | Geanonimiseerd | ⚠️ read-only kaart |
| Meldingen | E-mail / SMS | ⏳ later |

## Module 9 — Ambtenaren-dashboard

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Open dossiers | Per type, status | ✅ |
| Doorlooptijd | Mediaan, max, oud | ✅ |
| Conflictrisico's | Aantal, hotspots | ✅ |
| Geografische hotspots | Op kaart | ✅ |
| Aanvragen per district | Tabel + grafiek | ✅ |
| Achterstanden | SLA-overschrijdingen | ⚠️ basic |
| Juridische risico's | Open IACHR-relevante zaken | ⏳ later |

## Module 10 — Audit & Anti-corruptie

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Wijzigingslog | Wie, wat, wanneer, oude/nieuwe waarde | ✅ |
| Onveranderlijk log | Append-only | ✅ |
| Toegangslog | Login, view, export | ✅ |
| Anomalie-detectie | Snelle herhaalde wijzigingen, ongebruikelijke uren | ⏳ later |
| Externe verankering (hash) | Op publieke ledger | ⏳ later (roadmap) |
| Rapport voor auditor | Export / inzage | ✅ |

## Module 11 — Werkgroep-Werkruimte

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Agenda + notulen | Per vergadering | ✅ |
| Besluitenregister | Met stemverhouding | ✅ |
| Actiepuntenlijst | Met deadline en eigenaar | ✅ |
| Documentenbibliotheek | Per werkstroom | ✅ |
| Klankbord-feedback | Reviews | ⚠️ basic (commentaren) |
| Rapportage-export | Wekelijks/maandelijks | ✅ |

## Module 12 — Stakeholdermanagement

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Stakeholderregister | Categorieën, contactpersonen | ✅ |
| Contactmomenten | Log | ✅ |
| FPIC-status per gemeenschap | Koppeling naar Module 6 | ✅ |
| Engagementplan | Per stakeholder | ⚠️ basic |

## Module 13 — Beheer en Configuratie

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Gebruikers en rollen | RBAC | ✅ |
| Lookup-lijsten | Districten, types, statussen | ✅ |
| Regels adviesmotor | Aanpasbaar | ⚠️ in code |
| Workflow-configuratie | Zonder code | ⏳ later |
| Importtools | CSV, Shapefile bulk | ⚠️ basic |
| API-keys | Voor externe integraties | ⏳ later |

## Module 14 — Bestuurlijke Entiteiten (WRO-spoor)

> Volledige context in [19-wro-decentralisatie.md](19-wro-decentralisatie.md).

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Administratieve kaartlaag | 10 districten + 62 ressorten met officiële SR-grenzen | ✅ |
| `AdministrativeUnit`-entiteit | District/ressort met geometry, populatie, Level-2-status | ✅ |
| `RegionalBody`-register | DR/RR/DC per administratieve eenheid | ✅ basic |
| `Competence` + `LegalProvision` | Bevoegdheden gekoppeld aan WRO-artikelen | ⚠️ basic |
| `RegionalDecision`-register | DR-/RR-besluiten met stemverhouding | ⚠️ basic |
| DR/RR-werkruimte | Eigen agenda, notulen, besluiten | ⏳ later (pilot) |
| Conceptwet-tracker | DC-ontkoppeling + Financiële Autonomie 2026 | ⚠️ statisch |

## Module 15 — Districtsfonds & Eigen Middelen

> Volledige context in [20-financien-districtsfonds.md](20-financien-districtsfonds.md).

| Feature | Korte beschrijving | Demo |
|---|---|---|
| `DistrictFund` per begrotingsjaar | Algemene afdracht + eigen inkomsten + uitgaven + saldo | ⚠️ basic (3 demo-districten, fictief) |
| `RevenueSource` typed | Huurwaarde, vermakelijkheid, leges, marktgeld, parkeergeld, royalty | ⚠️ basic |
| Level-2-certificering | Per district status + datum + bron | ✅ |
| Algemene Afdracht-formule | Afnemend bij stijgende eigen middelen | ⚠️ formule, geen echte cijfers |
| Comptabiliteitswet-conflictsignaal | Regel `BF-04` | ⚠️ basic |
| District-portaal | Fondspagina + inkomstenboom + DR-besluiten | ⚠️ lichte versie |
| Daadwerkelijke koppeling Min. Fin. / CBvS | Grootboek + afdrachten | ⏳ later (fase 2) |
| Fiscaal-simulator | Wat-als-modellen | ⏳ later (fase 4) |

## Module 16 — Wet- & Bevoegdhedenbibliotheek

| Feature | Korte beschrijving | Demo |
|---|---|---|
| Pagina `/wetten` | Publiek leesbare bronnenlijst | ✅ |
| WRO 1989 + S.B. 2000/2002/2005/2015 | Versioned in `LegalProvision` | ✅ |
| Interimregeling Financiële Decentralisatie 2003 | Welke heffingen rechtstreeks naar DistrictFund | ✅ |
| Ontwerpwetten 2026 (DC-ontkoppeling, Financiële Autonomie) | Statisch in demo, levend later | ⚠️ statisch |
| Versionering via Git, wijziging via PR | Analoog aan `/regels` | ✅ |

## Module 17 — Benefit Sharing (Koppeling Grond ↔ Fondsen ↔ ITP)

> Volledige context in [21-koppeling-grond-fondsen.md](21-koppeling-grond-fondsen.md). Dit is het kernpunt van het werkgroep-mandaat.

| Feature | Korte beschrijving | Demo |
|---|---|---|
| `BenefitShare`-entiteit | Concessie ↔ district ↔ ITP-gemeenschap | ✅ (1 demo-casus) |
| Vier verdeelscenario's (A/B/C/D) | Op basis van overlap met customary_territory en protected_area | ✅ |
| Adviesregel `BF-06` actief | Triggert bij overlap concessie/grondhuur ↔ customary | ✅ |
| FPIC-toets verplicht | Geen ratificatie zonder FPIC-consent | ✅ |
| Bekrachtigingsketen | DNA + Min. Fin. + community consent | ⚠️ velden aanwezig |
| Periodieke royalty-monitoring | Met afwijkingssignalering | ⏳ later (fase 3) |
| Hash-verankerde benefit-keten | IACHR-bestendige rapportage | ⏳ later (fase 4) |

## Legenda

- ✅ in de demo
- ⚠️ basis-versie in de demo
- ⏳ niet in demo, in roadmap
