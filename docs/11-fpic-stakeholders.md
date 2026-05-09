# 11 — FPIC, ITP-Gemeenschappen en Stakeholders

> **Free, Prior, and Informed Consent** is in dit project geen formaliteit. Het is een eersterangs principe en een eersterangs object in het datamodel.

## 11.1 Juridische en internationale basis

| Bron | Wat het zegt voor SGDP |
|---|---|
| **UNDRIP** (UN Declaration on the Rights of Indigenous Peoples) | Recht op FPIC bij maatregelen die ITP-gebieden raken |
| **ILO 169** (waar van toepassing) | Consultatieverplichting |
| **VIDS FPIC-document** | Surinaamse, ITP-eigen interpretatie van FPIC |
| **Ontwerpwet Collectieve Rechten ITP** (DNA) | Erkenning, demarcatie, traditioneel gezag |
| **IACHR — Saramaka v. Suriname (2007)** | Effectieve erkenning en bescherming traditioneel gebruik |
| **IACHR — Kaliña & Lokono v. Suriname (2015)** | Inheemse eigendom, natuurreservaten, mijnbouw, derden-titels |
| **FAO VGGT** | Verantwoord beheer van eigendomsrechten — formeel én customary |

Het platform en de werkgroep werken expliciet **conform** deze bronnen. Bij twijfel telt de meest beschermende interpretatie voor de gemeenschap.

## 11.2 De vier elementen van FPIC, operationeel

| Element | Concrete invulling in werkgroep + platform |
|---|---|
| **Free** | Geen druk, geen tijdsdwang, gemeenschap bepaalt eigen tempo. Platform: status `consultatie_lopend` kan onbeperkt doorlopen. |
| **Prior** | Consultatie vóór elke beslissing met impact, niet ter bevestiging achteraf. Platform: blokkerende regel R-SOC-001 voorkomt besluitvorming zonder FPIC. |
| **Informed** | Volledige, begrijpelijke informatie in eigen taal; voldoende tijd. Platform: documenten taggen op taal en leesbaarheid; versies bewaren. |
| **Consent** | Recht op ja, nee, voorwaardelijk ja, en op intrekking. Platform: 9 statussen; `ingetrokken` en `bezwaar` zijn altijd geldig. |

## 11.3 Standaardprocedure FPIC per gebied

Volledige flow met platform-stappen:

```
 1. Detectie trigger
    ──► Platform vlagt overlap met customary territory
    ──► Aanmaak FPIC_Process (status: niet_gestart)

 2. Identificatie traditioneel gezag
    ──► Werkstroom Consultatie verzamelt: granman, kapiteins, basjas
    ──► Vastlegging in ST_Community + parties
    ──► Status: identificatie_gezag

 3. Eerste contact (kennismaking)
    ──► Geen agenda, vertrouwen
    ──► FPIC_Event log
    ──► Status: identificatie_gezag

 4. Informatiepakket
    ──► Documenten in NL + lokale taal (Saramaccaans, Aukaans, Wayana, e.a.)
    ──► Kaart, doel, opties, gevolgen, rechten
    ──► Status: informatie_verstrekt

 5. Reflectieperiode
    ──► Minimaal 2 weken; gemeenschap bepaalt verlenging
    ──► Status: informatie_verstrekt

 6. Consultatiesessies
    ──► Plenair, deelgroepen, vrouwenraad, jongeren
    ──► Audio/video/verslag, bewijs van aanwezigheid
    ──► Status: consultatie_lopend

 7. Besluit gemeenschap
    ──► Expliciet vastgelegd door gezag
    ──► Status: instemming / voorwaardelijke_instemming / bezwaar / ingetrokken / heropening_vereist

 8. Vastlegging in dossier
    ──► Onlosmakelijk gekoppeld aan case en spatial unit
    ──► Audit trail

 9. Terugkoppeling
    ──► Wat is met de input gedaan
    ──► Heropent indien nieuwe substantiële informatie
```

## 11.4 FPIC-statussen (overzicht)

| Status | Betekenis |
|---|---|
| `niet_gestart` | Trigger gesignaleerd, nog geen actie |
| `identificatie_gezag` | Werkstroom inventariseert traditioneel gezag |
| `informatie_verstrekt` | Informatiepakket overhandigd, reflectie loopt |
| `consultatie_lopend` | Sessies actief |
| `instemming` | Volledige consent |
| `voorwaardelijke_instemming` | Consent met voorwaarden vastgelegd |
| `bezwaar` | Gemeenschap zegt nee |
| `ingetrokken` | Eerder gegeven consent ingetrokken |
| `heropening_vereist` | Substantiële wijziging vereist nieuwe ronde |

## 11.5 Documenten en bewijs

| Documenttype | Voorbeeld | Bewaarduur |
|---|---|---|
| Informatiepakket | Folder, kaart, beleidsuitleg | Onbeperkt |
| Vergaderverslag | Notulen + audio + foto | Onbeperkt |
| Aanwezigheidslijst | Handtekeningen of vingerafdrukken (met expliciete toestemming) | Onbeperkt |
| Audio/video | Gehele consultatie of representatieve fragmenten | Onbeperkt, encrypted |
| Officiële verklaring gezag | Schriftelijk of geregistreerd mondeling | Onbeperkt |
| Vertaalbewijs | Wie heeft vertaald, kwalificaties | Onbeperkt |
| Klacht / bezwaar | Vrij format | Onbeperkt |

Alle items zijn **brondocumenten (LA_Source)** met hash en classificatie `fpic_restricted` waar nodig.

## 11.6 Stakeholdermap

### 11.6.1 Categorieën

| Categorie | Voorbeelden | Engagement-niveau | Waar vastgelegd |
|---|---|---|---|
| **ITP-gemeenschappen** | Specifieke dorpen, traditioneel gezag | **Co-creatie / consent** | ST_Community + FPIC_Process |
| **ITP-koepelorganisaties** | VIDS, KAMPOS | Adviserend / co-creatie | Stakeholder-register |
| **Nationale overheid** | President, Kabinet, Min. GBB, Min. RO, NIMOS | Beslisser / bron | Stakeholder-register |
| **Registers** | MI-GLIS, Domeinkantoor | Bron / integratiepartner | Stakeholder-register |
| **Politiek** | DNA, partijen | Geconsulteerd | Stakeholder-register |
| **Sector** | Concessiehouders, vakbonden, particuliere landeigenaren | Geconsulteerd | Stakeholder-register |
| **Civil society** | Mensenrechtenorganisaties, NGO's | Geconsulteerd | Stakeholder-register |
| **Internationaal** | UN-Habitat, FAO, IDB, IACHR, OAS | Adviserend | Stakeholder-register |
| **Academisch** | AdeKUS, internationale onderzoekers | Adviserend | Stakeholder-register |
| **Pers / publiek** | Journalisten, burgers | Geïnformeerd | Communicatieplan |

### 11.6.2 Engagement-principes

1. **Geen verrassingen.** Gevoelige punten eerst bilateraal.
2. **Taal aanpassen.** Lokale talen, waar van toepassing — minimaal Sranantongo en relevante ITP-talen voor stukken die gemeenschappen aangaan.
3. **Toegankelijke samenvattingen.** Max. 2 pagina's bij elk beleidsstuk.
4. **Logistiek.** Reis- en verblijfsvergoeding voor gezag bij consultaties; locaties die voor gemeenschap toegankelijk zijn (vaak in het dorp zelf).
5. **Wederkerigheid.** Wat is met de input gedaan? Terugkoppeling expliciet en getoond.
6. **Geheimhouding.** Heilige plaatsen, begraafplaatsen, gevoelige kennis: alleen vastleggen met expliciete consent, en met restricted-classificatie.

## 11.7 Rollen rond FPIC

| Rol | Verantwoordelijkheid |
|---|---|
| Werkstroom Consultatie & FPIC | Operationele leiding |
| Voorzitter werkgroep | Eindverantwoordelijk; tekent als instemming gevraagd wordt |
| Vertegenwoordiger gemeenschap | Aangewezen door gezag |
| Vertaler / facilitator | Onafhankelijk, ervaren met de gemeenschap |
| VIDS / KAMPOS | Zorgdragend / beoordelend |
| Onafhankelijk toezicht | Optioneel, bv. UN-Habitat of IACHR-volgende NGO |

## 11.8 Veelvoorkomende valkuilen — en hoe SGDP ze adresseert

| Valkuil | Mitigatie in werkgroep + platform |
|---|---|
| Consultatie wordt symbolisch | Verplichte FPIC-status; blokkerende regel; expliciet besluit gemeenschap nodig |
| Eén dorpshoofd 'tekent voor allen' | Bewijs van bredere participatie verplicht (deelgroepen, vrouwen, jongeren) |
| Documenten alleen in juridisch Nederlands | Tag op leesbaarheid en taal; vertaling verplicht voor stukken aan gemeenschap |
| Data-extractivisme (gemeenschap geeft data, krijgt niets terug) | Data-eigendom bij gemeenschap; toegang tot eigen data; terugkoppeling verplicht |
| Druk om snel besluit te nemen | Reflectieperiode niet inkortbaar; Free element dwingt rust |
| FPIC-data lekt naar pers | Restricted-classificatie + RBAC + audit trail |

## 11.9 Aansluiting bij IACHR-uitspraken

De werkgroep en het platform adresseren expliciet de bezwaren uit **Saramaka** en **Kaliña & Lokono**:

- Effectieve erkenning van traditioneel gebruikte gebieden — via STDM-laag in datamodel.
- Bescherming tegen titels aan derden zonder consent — via blokkerende regels en FPIC-procedure.
- Informatie en participatie — via consultatiemodule en bewijsregistratie.
- Toegang tot rechtsmiddelen — via bezwaarmodule en transparante audit trail.

## 11.9b FPIC-triggers (samenvatting)

Niet elke grondzaak vereist FPIC. De volgende gebeurtenissen starten **automatisch** een consultatie- of consent-flow:

| Trigger | Juridische basis | Systeemactie |
|---|---|---|
| Aanvraag overlapt geregistreerd of geclaimd traditioneel woon- en leefgebied | Wet GLIS; ontwerpwet Collectieve Rechten ITP | Consultatiedossier; **blokkeer finale beslissing** tot minimaal participatiecontrole |
| Project valt in categorie **major development / major impact** | IACHR Saramaka | Status `FPIC vereist`; consent registreren vóór besluit |
| Overlap met beschermd gebied dat traditioneel gebruik raakt | IACHR Kaliña & Lokono | Gecombineerde community + NMA reviewtaak |
| Mijnbouw-, bosbouw- of olie/gasconcessie in community area | IACHR Saramaka & Kaliña-Lokono | Enhanced review met concession overlap note |
| Nieuwe of gewijzigde activiteit met **MEA / SEA-plicht** | Milieu Raamwet | Koppel milieudossier; schort grondbeschikking op tot NMA-besluit ([17](17-milieu-nma.md)) |
| **Wijziging van projectscope** na eerdere consultatie | FAO FPIC Toolkit | **Heropen consent-status**; herstart consultatieflow |

FPIC is **iteratief** — geen lineaire tick-the-box procedure. Scope-wijziging, nieuwe inzichten of veranderde omstandigheden moeten kunnen leiden tot heropening.

## 11.10 Wat in de demo zit (FPIC-onderdeel)

- ST_Community-register met ≥ 5 fictieve gemeenschappen.
- FPIC_Process en FPIC_Event tabellen actief.
- Workflow voor het doorlopen van de 9 statussen.
- Documentupload met tag op taal en classificatie.
- Adviesregel R-SOC-001 die FPIC blokkerend afdwingt.
- Bezwaar- en voorwaardenregistratie.

Wat nog **niet** in de demo zit (roadmap):
- Mobiele app voor in-veld FPIC-registratie offline.
- Burger/gemeenschaps-portaal met directe inzage en correctieverzoek.
- Volledige meertalige interface.
- Onafhankelijk audit-portaal voor toezichthouders.
