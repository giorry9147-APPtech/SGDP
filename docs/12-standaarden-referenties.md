# 12 — Standaarden, Referenties en Lessen uit Andere Landen

## 12.1 Internationale standaarden waar SGDP op aansluit

| Standaard / kader | Eigenaar | Relevantie voor SGDP |
|---|---|---|
| **ISO 19152 — LADM** | ISO / FIG | Datamodel voor landadministratie (kern) |
| **STDM** | UN-Habitat / GLTN | Sociale grondrechten, customary tenure |
| **FAO VGGT** | FAO | Verantwoord eigendomsrechtenbeheer, beleidskader |
| **Fit-for-Purpose Land Administration** | FIG / Wereldbank / GLTN | Praktische, betaalbare aanpak — geschikt voor Suriname |
| **FPIC** | UNDRIP / VIDS | Vrije, voorafgaande, geïnformeerde toestemming |
| **OGC API-Features / Tiles** | Open Geospatial Consortium | Geo-API standaarden |
| **INSPIRE (referentie)** | EU | Geografische data-uitwisseling |
| **PRIA** | Property Records Industry Association | Documentstandaarden voor eRecording (referentie) |
| **eIDAS (referentie)** | EU | Digitale identiteit en handtekening |
| **WCAG 2.1 AA** | W3C | Toegankelijkheid |
| **OWASP Top 10** | OWASP | Webbeveiliging |
| **PDF/A** | ISO 19005 | Duurzame archivering |

## 12.2 Surinaamse context

| Bron | Wat het regelt |
|---|---|
| **Grondwet art. 34** | Eigendom, onteigening, schadeloosstelling |
| **Grondwet art. 41** | Natuurlijke rijkdommen behoren de natie toe |
| **Wet Grondregistratie en Land Informatie Systeem (S.B. 2009 nr. 149)** | Openbare registers, percelenadministratie, geometrisch bestand, traditionele woon- en leefgebieden |
| **Decreet Uitgifte Domeingrond** | Procedure aanvraag domeingrond, specifiek vs. algemeen; grondhuur 15–40 jaar; 30-daagse bezwaartermijn |
| **Besluit vereisten in te schrijven stukken GLIS (S.B. 2025 nr. 44)** | Verplichte velden notariële/bestuursstukken: identiteit, perceelsidentificatie |
| **Besluit Grondconversie 2023 (S.B. 2023 nr. 159)** | Conversiechecklist, hypothecair uittreksel, betalingsbewijs, PERCEELSID |
| **Milieu Raamwet** | NMA, MEA/SEA/MER, vergunningenregister, register verontreinigde gebieden, rehabilitatie |
| **MI-GLIS** | Registratie registergoederen, doelstelling rechtszekerheid |
| **Ministerie GBB / Domeinkantoor** | Loket en beslisser domeingrondaanvragen — **gescheiden van MI-GLIS** |
| **Ontwerpwet Collectieve Rechten ITP** | DNA-traject; erkenning, demarcatie, traditioneel gezag, FPIC |
| **Ontwerp Wet Ruimtelijke Ordening 2024** | Bestemmings- en gebruiksrestricties; koppeling GLIS aan ruimtelijke data |
| **Ontwerpwet Bescherming Privacy en Persoonsgegevens** | Dataminimalisatie, doelbinding |
| **National Digital Strategy 2023–2030** | Digitale identiteit, interoperabiliteit, data sharing |
| **Suriname Digitale-ID** | SSO voor overheidsdiensten |
| **VIDS FPIC-document** | Operationalisering FPIC voor Suriname |
| **IACHR — Saramaka v. Suriname (2007)** | Verplichting effectieve erkenning, FPIC bij major-impact, benefit-sharing, prior E&S impact assessment |
| **IACHR — Kaliña en Lokono v. Suriname (2015)** | ITP-eigendom, natuurreservaten, derden-titels, rehabilitatie |

## 12.3 Lessen uit andere landen

### 12.3.1 Nederland — Kadaster en PDOK
- Centrale, gedigitaliseerde *title registry*, gekoppeld aan BRP en BAG.
- **PDOK** als publieke geo-datadistributie met >200 datasets en miljarden API-verzoeken per jaar.
- "Topotijdreis" voor 4D-historische lagen.
- Microservices, OGC-conform, open-source componenten.
- **Les voor SGDP**: zet vroeg in op standaard-API's en koppelingen tussen registers (MI-GLIS, identiteit, adressen).

### 12.3.2 Estland — e-Land Register
- Volledig digitaal, gekoppeld aan andere basisregisters.
- Integriteit gewaarborgd via **KSI-blockchain** (hash-verankering).
- **Les voor SGDP**: verankering van hashes op een onveranderlijke ledger als anti-corruptiemaatregel — voor de roadmap.

### 12.3.3 Rwanda — e-title certificaten
- "Zero trips, zero paper" in landregistratie.
- **Les voor SGDP**: digitalisering reduceert dossierverlies en corruptie; mobiel-eerste portaal voor burgers in een latere fase.

### 12.3.4 Verenigde Staten — BLM MLRS / county-systemen
- Gefragmenteerd ecosysteem met sterke focus op **eRecording**, **auto-indexering**, **auto-redactie** van PII.
- **Les voor SGDP**: beheer documentstroom van begin af aan met versionering en audit; auto-redactie van PII is cruciaal voor publieke transparantie.

### 12.3.5 Georgië — landregister op blockchain
- Sinds 2016 notarisering op publieke blockchain.
- Drastische reductie van fraude en corruptiegevoeligheid.
- **Les voor SGDP**: ledger-verankering werkt; eerst minder ingrijpende interne hash-chains, later optioneel publiek.

### 12.3.6 Brazilië — CAR (Cadastro Ambiental Rural)
- Vastleggen van overlappende claims is essentieel om **ontbossing en illegale landroof** te ontmoedigen.
- **Les voor SGDP**: ook *betwiste* of *overlappende* claims expliciet vastleggen, niet wegmoffelen.

### 12.3.7 Colombia — multi-purpose cadastre
- Iteratieve, fit-for-purpose-aanpak in post-conflictgebieden.
- Combinatie van LADM en STDM.
- **Les voor SGDP**: combineer vroeg formele en informele registratie; eerst ruwe nauwkeurigheid, dan verfijnen.

### 12.3.8 FAO Open Tenure / SOLA Suite
- Open-source software ontworpen voor claim-registratie en customary rights.
- **Les voor SGDP**: hergebruik open-source componenten waar dat past; wij hoeven STDM niet from scratch te bouwen.

## 12.4 Officiële externe referenties (URL-bronnen)

| # | Bron | URL |
|---|---|---|
| 1 | FAO VGGT | https://www.fao.org/4/i2801e/i2801e.pdf |
| 2 | Kadaster NL | https://www.kadaster.nl/about-us |
| 3 | Estland e-Land Register | https://www.rik.ee/en/international/e-land-register |
| 4 | Rwanda elektronische landregistratie | https://www.environment.gov.rw/news-detail/rwanda-launched-electronic-land-registration-certificate-system |
| 5 | BLM MLRS | https://www.blm.gov/services/land-records/mlrs |
| 6 | FAO SOLA / Open Tenure | https://www.fao.org/tenure/sola-suite/open-tenure/en/ |
| 7 | MI-GLIS | https://gov.sr/ministeries/ministerie-van-grond-en-bosbeheer/mi-glis/ |
| 8 | Grondaanvraag Suriname | https://gov.sr/thema/grondaanvraag/ |
| 9 | VIDS — Wet Collectieve Rechten (memorie van toelichting) | https://vids.sr/wp-content/uploads/2020/11/MvT-Wet-Collectieve-Rechten-20Dec2019-clean.pdf |
| 10 | IACHR Saramaka v. Suriname | https://www.corteidh.or.cr/docs/casos/articulos/seriec_172_ing.pdf |
| 11 | Decreet Uitgifte Domeingrond | https://www.sris.sr/wp-content/uploads/2018/02/decreet_uitgifte_domeingrond.pdf |
| 12 | DNA — Ontwerpwet Collectieve Rechten ITP | https://www.dna.sr/wetgeving/ontwerpwetten-bij-dna/in-behandeling/ontwerpwet-wet-collectieve-rechten-inheemse-en-tribale-volken-traditionele-woon-en-leefgebieden/ |
| 13 | IACHR Kaliña en Lokono v. Suriname | https://www.europeanrights.eu/public/provvedimenti/CIDH_Suriname_-_C.309.pdf |
| 14 | Wet GLIS (S.B. 2009 nr. 149) | https://www.sris.sr/wp-content/uploads/2019/10/S.B.-2009-no.-149-Wet-Grondregistratie-en-Land-Informatie-Systeem.pdf |
| 15 | Besluit vereisten in te schrijven stukken GLIS (S.B. 2025 nr. 44) | https://www.sris.sr/wp-content/uploads/2025/05/S.B.-2025-no.-44-Besluit-vereisten-in-te-schrijven-stukken-GLIS.pdf |
| 16 | Besluit Grondconversie 2023 (S.B. 2023 nr. 159) | https://www.sris.sr/wp-content/uploads/2023/11/S.B.-2023-no.-159-Besluit-Grondconversie-2023.pdf |
| 17 | Milieu Raamwet | https://www.sris.sr/wp-content/uploads/2020/05/mileuraamwet.pdf |
| 18 | Ontwerp Wet Ruimtelijke Ordening 2024 | https://gov.sr/wp-content/uploads/2024/09/Ontwerp_Wet-Ruimtelijke-Ordening-2024_versie-9-september-2024-voor-aanbieding.pdf |
| 19 | Ontwerpwet Bescherming Privacy en Persoonsgegevens | https://www.dna.sr/wetgeving/ontwerpwetten-bij-dna/in-behandeling/ontwerpwet-bescherming-privacy-en-persoonsgegevens/ |
| 20 | National Digital Strategy 2023–2030 | https://gov.sr/wp-content/uploads/2023/09/Suriname-National-Digital-Strategy-2023-2030.pdf |
| 21 | Suriname Digitale-ID | https://gov.sr/digitale-id/ |
| 22 | IACHR Kaliña en Lokono — officiële vertaling NL | https://gov.sr/wp-content/uploads/2022/05/officiele-vertaling-kal-lok-vonnis-nederlands-voor-publicatie-pdf.pdf |
| 23 | UN-Habitat STDM | https://stdm.gltn.net/ |
| 24 | FAO FPIC Toolkit (Technical Guide) | https://www.fao.org/fileadmin/user_upload/partnerships/docs/00000_FPIC_Toolkit_Technical_Guide_FPIC-VGGT-IPs_EN.pdf |
| 25 | ISO 19152 (LADM) | https://www.iso.org/standard/81263.html |
| 26 | OGC WMS | https://www.ogc.org/standards/wms/ |

## 12.5 Begrippenlijst (kort)

| Term | Betekenis |
|---|---|
| **LADM** | Land Administration Domain Model — datamodel voor landadministratie |
| **STDM** | Social Tenure Domain Model — uitbreiding voor informele/customary rechten |
| **FFP-LA** | Fit-for-Purpose Land Administration — pragmatische aanpak |
| **FPIC** | Free, Prior and Informed Consent |
| **ITP** | Inheemse en Tribale Volken |
| **VIDS** | Vereniging van Inheemse Dorpshoofden in Suriname |
| **KAMPOS** | Marrons-koepelorganisatie van traditioneel gezag |
| **MI-GLIS** | Management Instituut voor Grond Registratie en Land Informatie Systeem (Suriname) |
| **GBB** | Ministerie van Grond- en Bosbeheer |
| **DNA** | De Nationale Assemblée |
| **IACHR** | Inter-Amerikaans Hof voor de Rechten van de Mens |
| **PostGIS** | Geo-extensie voor PostgreSQL |
| **OGC** | Open Geospatial Consortium |
| **RBAC** | Role-Based Access Control |
| **eIDAS** | EU-verordening voor elektronische identificatie en handtekeningen |
| **CAMA** | Computer-Assisted Mass Appraisal |
| **ALTA/NSPS** | Amerikaanse landmeetstandaard |
| **PRIA** | Property Records Industry Association |
| **SDG 1.4.2** | UN-indicator over zekere eigendomsrechten |
| **PERCEELSID** | Unieke perceelsidentificatie in GLIS-stukken |
| **NMA** | Nationale Milieu Autoriteit (Suriname, sinds juli 2024) |
| **MEA / MER** | Milieueffectanalyse / milieueffectrapport |
| **SEA** | Strategic Environmental Assessment voor overheidsplannen |
| **WRO** | Wet Ruimtelijke Ordening (in ontwerp 2024) |
| **DBZ / CBA** | Dienst Burgerzaken / Centrale Bevolkingsadministratie |
| **NH / GMD / SBB** | Concessieregisters (mijnbouw / olie-gas / bosbouw) |
| **PKI / QR** | Public Key Infrastructure + QR-code voor documentverificatie |
