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

## Legenda

- ✅ in de demo
- ⚠️ basis-versie in de demo
- ⏳ niet in demo, in roadmap
