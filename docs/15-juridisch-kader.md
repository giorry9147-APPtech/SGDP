# 15 — Juridisch Kader Suriname (Compliance-checklist)

> Dit document operationaliseert de Surinaamse rechtsbronnen die het platform en de werkgroep moeten naleven, en koppelt elke norm aan een concrete platformcontrole. Het is bindend voor zowel de **demo** als de **roadmap-fasen** ([13](13-roadmap.md)).

## 15.1 Drie harde uitgangspunten

Uit de combinatie van Surinaamse wet- en beleidsteksten volgen drie architecturale uitgangspunten die niet onderhandelbaar zijn:

1. **Institutionele scheiding respecteren.** **MI-GLIS** is niet hetzelfde als het **Domeinkantoor / Ministerie van Grond- en Bosbeheer (GBB)**. De overheid verwijst burgers voor grondhuur, status van grondaanvragen en huurpercelen expliciet naar het Domeinkantoor. Het platform is daarom federatief: één omgeving met **gescheiden mandaten, taken en beslisrechten** voor MI-GLIS, GBB/Domeinkantoor, landmeters, NMA-reviewers en gemeenschapsvertegenwoordigers.
2. **PERCEELSID als ruggengraat.** Recente Surinaamse regels (Besluit vereisten in te schrijven stukken GLIS 2025, Besluit Grondconversie 2023) stellen perceelsidentificatie, hypothecaire uittreksels en identiteitsgegevens centraal. Het datamodel weigert rechten- of besluitregistraties zonder verbinding met een geldige PERCEELSID, behalve waar de wet dat expliciet toestaat (bv. claims op niet-getitelde traditionele woon- en leefgebieden).
3. **Configurabel rond bewegende wetgeving.** De ontwerpwet Collectieve Rechten ITP, het ontwerp WRO 2024 en de ontwerp privacywet zijn nog niet vastgesteld. Procedures, drempels en velden zijn daarom **regelgedreven en versioneerd** — niet hardcoded.

## 15.2 Rechtsbronnenkaart

| Niveau | Bron | Rol in SGDP |
|---|---|---|
| Grondwet | Art. 34 (eigendom, onteigening, schadeloosstelling) | Beslislog, compensatiemodule, beroepsstatus |
| Grondwet | Art. 41 (natuurlijke rijkdommen behoren de natie toe) | Staatseigendomslaag, concessie-overlap, publieke belangenafweging |
| Wet | Wet Grondregistratie en Land Informatie Systeem (S.B. 2009 nr. 149) | Kernregister: openbare registers, percelenadministratie, geometrisch bestand, traditionele woon- en leefgebieden |
| Wet | Decreet Uitgifte Domeingrond | Aanvraag-, publicatie-, bezwaar- en beschikkingsworkflow; grondhuur 15–40 jaar |
| Wet | Milieu Raamwet | NMA, MEA/SEA/MER, vergunningenregister, register verontreinigde gebieden, rehabilitatie |
| Besluit | Besluit vereisten in te schrijven stukken GLIS (S.B. 2025 nr. 44) | Verplichte velden notariële/bestuursstukken: identiteit, perceelsidentificatie |
| Besluit | Besluit Grondconversie 2023 (S.B. 2023 nr. 159) | Conversiechecklist, hypothecair uittreksel, betalingsbewijs, PERCEELSID |
| Ontwerpwet | Ontwerpwet Collectieve Rechten ITP (DNA, in behandeling) | Erkenning, demarcatie, traditioneel gezag, FPIC |
| Ontwerpwet | Ontwerp Wet Ruimtelijke Ordening 2024 | Bestemmings- en gebruiksrestricties; koppeling GLIS aan ruimtelijke data |
| Ontwerpwet | Ontwerpwet Bescherming Privacy en Persoonsgegevens | Dataminimalisatie, doelbinding, classificatie |
| Wet | **Wet Regionale Organen** (S.B. 1989 no. 44, gewijzigd S.B. 2000 no. 93, 2002 no. 54, 2005 no. 28, 2015 no. 132) | Inrichting districten en ressorten, organen (DR/RR/DC), bevoegdheden — basis decentralisatiespoor; zie [19](19-wro-decentralisatie.md) |
| Regeling | **Interimregeling Financiële Decentralisatie** (2003) | Welke heffingen rechtstreeks naar Districtsfonds vloeien; zie [20](20-financien-districtsfonds.md) |
| Besluit | S.B. 2006 no. 134 — Districtsfonds en Districtsbegroting | Financiële infrastructuur districten |
| Wet | Comptabiliteitswet | Centrale begrotingsdiscipline; conflict-/harmonisatieregel `BF-04` |
| Ontwerpwet | Ontwerpwet DC-Ontkoppeling (verwacht 2026) | DR krijgt eigen voorzitter; DC niet langer voorzitter; regel `BF-03` |
| Ontwerpwet | Ontwerpwet Financiële Autonomie Districten (verwacht 2026) | Directe beschikking eigen middelen; zie [20](20-financien-districtsfonds.md) |
| Beleid | National Digital Strategy 2023–2030 | Digitale identiteit, interoperabiliteit, data sharing |
| Jurisprudentie | IACHR Saramaka v. Suriname (2007) | Collectieve titel, effectieve consultatie, FPIC bij major-impact, benefit-sharing, prior E&S impact assessment |
| Jurisprudentie | IACHR Kaliña en Lokono v. Suriname (2015) | Demarcatie, participatie in natuurreservaten, derdenafweging, rehabilitatie |
| Internationaal | UNDRIP, ILO 169 (waar van toepassing) | FPIC-grondslag |
| Internationaal | FAO VGGT, FAO FPIC Toolkit, UN-Habitat STDM, FIG/Wereldbank FFP-LA | Datamodel- en procesbest practices |

## 15.3 Compliance-checklist (norm → platformcontrole)

| # | Normbron | Verplichting / norm | Platformcontrole | Locatie in SGDP-docs |
|---|---|---|---|---|
| C1 | Grondwet art. 34 | Eigendom, onteigening, schadeloosstelling | Beslislog, compensatiemodule, bezwaar-/beroepsstatus, blokkade op gedwongen wijziging zonder besluitspoor | [10-adviesmotor.md](10-adviesmotor.md) §10.4 |
| C2 | Grondwet art. 41 | Natuurlijke rijkdommen ten dienste van de natie | Staatseigendomslaag; verplichte publieke belangenafweging in besluit-template | [05-requirements.md](05-requirements.md) FR-12 |
| C3 | Wet GLIS | Openbare registers, percelenadministratie, geometrisch bestand | Kernregister met versionering; bronstukregistratie; perceelsidentificatie verplicht | [08-data-model.md](08-data-model.md) §8.2 |
| C4 | Wet GLIS toelichting | Traditionele woon- en leefgebieden, concessies, exploratie-/exploitatierechten kunnen in geometrisch bestand | STDM-laag, overlap engine, sensitivity labeling | [08-data-model.md](08-data-model.md) §8.3 |
| C5 | Decreet Uitgifte Domeingrond | Publicatie van aanvragen + 30-daagse bezwaartermijn; verplichte aanvraaggegevens; figuratieve/uitmetingskaart bij specifieke aanvraag | Intakeworkflow met state machine; public notice; bezwaartermijnklok blokkeert besluit | [05-requirements.md](05-requirements.md) FR-1, FR-10 |
| C6 | Decreet Uitgifte Domeingrond | Grondhuur 15–40 jaar; verlenging uiterlijk 6 maanden voor afloop | Reminders 12/9/6 maanden; blokkade bij achterstand | [18-grondhuur-conversie.md](18-grondhuur-conversie.md) §18.2 |
| C7 | Besluit GLIS 2025 | Identiteitsgegevens, partijgegevens, PERCEELSID, afschriften bestuurs-/rechterlijke organen | Document schema validation; typed uploads; mandatory fields; source-traceability | [16-integraties-api.md](16-integraties-api.md) §16.6 |
| C8 | Besluit Grondconversie 2023 | Kaart met PERCEELSID, hypothecair uittreksel, betalingsbewijs | Conversiechecklist met cross-check op MI-GLIS-uittreksel en betaalstatus | [18-grondhuur-conversie.md](18-grondhuur-conversie.md) §18.4 |
| C9 | Milieu Raamwet | MEA/MER/SEA verplicht; geen activiteit zonder MEA-goedkeuring waar vereist; publiek vergunningenregister; nationaal register verontreinigde gebieden | Milieu-trigger; NMA-reviewtaak; registerkoppeling; rehabilitatiemonitor; **hard blocker** in adviesmotor | [17-milieu-nma.md](17-milieu-nma.md) |
| C10 | IACHR Saramaka (2007) | Collectieve titel, effectieve consultatie, FPIC bij major-impact, benefit-sharing, prior E&S impact assessment | FPIC-engine, community title layer, consent states, benefit register, impact gate vóór goedkeuring | [11-fpic-stakeholders.md](11-fpic-stakeholders.md) |
| C11 | IACHR Kaliña & Lokono (2015) | Demarcatie/titel, participatie in natuurreservaten, toegang/gebruik, derdenafweging, rehabilitatie | Reserve-participatiemodule, access/use tracking, third-party rights balancing, rehab-tasks | [11-fpic-stakeholders.md](11-fpic-stakeholders.md), [17-milieu-nma.md](17-milieu-nma.md) |
| C12 | LADM / ISO 19152 | Partijen, RRR, spatial units, sources, versioning | Canoniek datamodel met Party / RRR / SpatialUnit / Source / VersionObject | [08-data-model.md](08-data-model.md) |
| C13 | STDM / UN-Habitat | People-land relaties ook buiten formele titelregistratie | Social tenure relations; evidence-based claims; mixed-formality records | [08-data-model.md](08-data-model.md) §8.3 |
| C14 | FAO VGGT | Transparantie, customary rights, toegankelijke geschilbeslechting | Public+internal transparancy; customary records; grievance & dispute timeline | [11-fpic-stakeholders.md](11-fpic-stakeholders.md) |
| C15 | FAO FPIC Toolkit | Iteratief proces; legitieme vertegenwoordiging; toegankelijke informatie; grievance | Representative verification, disclosure controls, multilingual packets, grievance panel | [11-fpic-stakeholders.md](11-fpic-stakeholders.md) |
| C16 | Ontwerpwet Collectieve Rechten ITP / WRO / privacywet | Toekomstige rechtsontwikkeling | Configureerbare regels, feature flags, metadata voor wetversie en beleidsregime per zaak | [09-architectuur.md](09-architectuur.md) §9.3.6 |
| C17 | WRO (S.B. 1989 no. 44 + wijzigingen) | Bestuurlijke inrichting districten/ressorten; bevoegdheden DR/RR/DC | `AdministrativeUnit`, `RegionalBody`, `Competence` met versionering wetregime | [19-wro-decentralisatie.md](19-wro-decentralisatie.md), [08-data-model.md §8.8](08-data-model.md) |
| C18 | Interimregeling Financiële Decentralisatie 2003 + S.B. 2006 no. 134 | Inkomstenoverdracht naar Districtsfondsen; Level-2-vereiste | `DistrictFund`, `RevenueSource`; regels `BF-01`, `BF-02` | [20-financien-districtsfonds.md](20-financien-districtsfonds.md), [10-adviesmotor.md §10.5](10-adviesmotor.md) |
| C19 | Comptabiliteitswet | Centrale begrotingsdiscipline | Regel `BF-04` detecteert conflict met districtsverordening; review Min. Fin. | [20-financien-districtsfonds.md §20.7](20-financien-districtsfonds.md) |
| C20 | IACHR Saramaka + WRO + Interimregeling (gecombineerd) | Benefit sharing bij exploitatie op customary territory | `BenefitShare`-entiteit, regel `BF-06`, FPIC-toets verplicht | [21-koppeling-grond-fondsen.md](21-koppeling-grond-fondsen.md) |

## 15.4 Federatief autorisatie- en mandaatmodel

Het platform implementeert **één gedeelde data- en applicatieruimte met gescheiden mandaten** per orgaan. Elk orgaan blijft "authoritative source" voor de eigen domein-data.

| Orgaan | Authoritative source voor | Mag wijzigen | Mag beslissen |
|---|---|---|---|
| **MI-GLIS** | Openbare registers, perceelsadministratie, geometrisch bestand, hypothecaire info | Inschrijvingsstatus, registermetadata | Registerinschrijving |
| **GBB / Domeinkantoor** | Domeingrondaanvragen, beschikkingen, grondhuur, conversie, vervallenverklaring | Zaakdossier, taaktoewijzing | Voorbereidend; ministerieel beslisser keurt finaal |
| **GLIS-landmeter / beëdigd landmeter** | Geometrievoorstellen, meetpakketten | Perceelsgrenzen | Niet op rechten/besluiten |
| **NMA** | Milieubesluiten, MEA/SEA/MER, register verontreinigde gebieden | Milieuadvies, voorwaarden | Ja, op milieutoets |
| **DNA / wetgever** | — | Configuratie wetregimes (via beheerproces) | Wetswijzigingen activeren |
| **Traditioneel gezag / community focal point** | Community-data, customary claims | Vertegenwoordigers, comments, grievance | Geen staatsbesluit; wel consent/withhold binnen FPIC-module |
| **Auditor / Rekenkamertype** | — (read-only) | Niets | Nee |

## 15.5 Rolautorisatie: RBAC + ABAC

Klassieke rolgebaseerde toegang volstaat niet. Het platform gebruikt **RBAC + Attribute-Based Access Control** zodat:

- Sacred sites en gevoelige customary informatie alleen op need-to-know zichtbaar zijn (attribuut: `sensitivity_level`).
- Persoonsgegevens van indieners gemaskeerd zijn voor het publieke portaal (attribuut: `classification`).
- Communityvertegenwoordigers alleen de eigen community-dossiers kunnen bewerken (attribuut: `community_id` matching).
- FPIC-restricted documenten alleen toegankelijk zijn voor expliciet geautoriseerde rollen tijdens een lopend FPIC-proces.

## 15.6 Doelbinding en privacy

- Verzameling beperkt tot wat een wettelijke grondslag of legitiem mandaat vereist.
- Dataminimalisatie: PII gescheiden van publieke kaartlaag; gemaskeerde publieke versie standaard.
- Logging van toegang tot persoonsgegevens; alle exports zijn loggebaar en beperkt tot rol.
- Datacategorisatie: `public` / `internal` / `confidential` / `fpic_restricted`.
- Bewaartermijnen: register- en besluitstukken permanent of archiefwaardig; veldruwe data en duplicaten volgens configurabel retentiebeleid.

## 15.7 Bewijskracht en audit

Voor IACHR-bestendigheid en interne rechtsmiddelen:

- Onveranderbare audit trail (append-only) op elke wijziging in zaakstatus, geometrie, besluit en document.
- Cryptografische hash op brondocumenten; periodieke hash-chaining.
- Exporteerbaar voor onafhankelijke toetsing en gerechtelijke productie.
- Oude/nieuwe waarde, actor, tijdstip en bronverwijzing per wijziging.

## 15.8 Configuratie van wetregimes

Omdat ontwerpwetten in behandeling zijn, registreert het platform per zaak het **wetregime** waaronder de zaak loopt:

```yaml
case_legal_regime:
  domeingrond_decreet_version: "1981"
  glis_inschrijvingsbesluit_version: "2025"
  collectieve_rechten_status: "ontwerp_dna_2019"        # update bij wetwording
  privacy_regime: "ontwerp_2024"
  wro_version: "S.B._2015_132"                          # laatste van kracht zijnde WRO-wijziging
  financiele_autonomie_version: "interimregeling_2003"  # update bij ontwerp_2026_b
  dc_ontkoppeling_status: "voor_inwerkingtreding"       # ontwerp_2026_a
  comptabiliteitswet_version: "current"
```

Wijziging van wetregime is een geconfigureerde release die door beheerders wordt geactiveerd, niet een code-wijziging. Dit voorkomt dat lopende zaken plotseling onder een ander regime vallen.
