# 16 — Integraties, Uitwisselingsformaten en API-contracten

> Strategie: **"authoritative source per gegevenstype"**. Het platform combineert gegevens uit meerdere bronnen, maar **vervangt geen bronhouders**. Voor de demo zijn integraties gemockt; voor pilot en daarna komen echte koppelingen.

## 16.1 Integratiekaart

| Bron / register | Doel in SGDP | Minimale gegevensset | Aanbevolen formaat | Demo |
|---|---|---|---|---|
| **MI-GLIS** | Parcel master, registerstukken, hypothecaire info, perceelsidentificatie | Perceel, partijen, rechten, bronstukken, geometrie, historie | REST/JSON + WFS; fallback batch GeoJSON/GML/PDF/A | Mock |
| **Domeinkantoor / GBB** | Aanvraag- en beschikkingsworkflow | Zaakstatus, aanvraagtype, besluit, grondhuur, conversie, verlenging | REST/JSON, signed PDF/A | Mock |
| **DBZ / CBA / e-ID** | Identiteits- en bevoegdheidscontrole | ID-nummer, naam, adres, nationaliteit, bevolkingsuittrekselstatus, authenticatie | SSO/OIDC; REST/JSON; PKI/QR-verificatie van digitale documenten | Mock (lokale users) |
| **Landmeters (beëdigd)** | Figuratieve kaarten, uitmetingskaarten, meetresultaten | Meetpunten, grenzen, schets, QA, kaartbestanden | GeoPackage / GeoJSON / GML + signed PDF/A | Handmatige import |
| **Concessieregisters NH / GMD / SBB** | Conflict- en overlapdetectie (mijnbouw, bosbouw, olie/gas) | Concessiepolygoon, type, houder, datum, duur, status | WFS / GeoJSON / GML; desnoods CSV + kaartservice | Mockdataset |
| **NMA / beschermde gebieden / natuurbeheer** | Milieuscreening en restricties | Beschermde gebieden, vergunningen, MER/MEA/SEA-status, rehabilitatiegebieden | WMS / WFS / GeoJSON + PDF/A | Mockdataset + handmatig |
| **Ruimtelijke Ordening (WRO-register, toekomstig)** | Bestemmings- en gebruiksrestricties | Zone, toegestane functie, planstatus, participatiedocumenten | WMS / WFS / GML / INSPIRE-profiel | Mock |
| **Rechtspraak / bestuursbesluiten** | Geschil- en uitspraakkoppeling | Zaaknummer, uitspraakdatum, type beslissing, scan/afschrift | Secure document exchange; later API | Handmatig dossier |
| **Publieke kennisgeving / advertentie** | Openbaarheid en bezwaar | Publicatietekst, datum, bezwaartermijn | Public API / signed PDF / RSS / JSON waar mogelijk | Eigen publicatiekanaal demo |

## 16.2 Uitwisselingsformaten en standaarden

| Use case | Standaard | Toelichting |
|---|---|---|
| Kaartbeelden (rendered tiles, achtergrond) | **WMS** (OGC) | Voor web-viewers en print |
| Objectdata (vector features met attributen) | **WFS** of **OGC API – Features** | Voor interactieve query's en interoperabiliteit |
| Web/mobiele distributie | **GeoJSON** | Lichtgewicht, breed ondersteund |
| Rijke gestructureerde uitwisseling tussen overheidsketens | **GML** | Gebaseerd op INSPIRE-profielen |
| Kaartpakketten (bv. landmeter-deliverables) | **GeoPackage**, Shapefile (.zip), KML | Voor import/upload |
| Documentintegriteit en authenticiteit | **PKI + QR-code** | Aansluitend op Surinaamse e-services voor uittreksels en nationaliteitsverklaring |
| Identiteit / SSO | **OIDC** + Surinaamse **Digitale-ID** | Aansluitend op National Digital Strategy |
| Long-term archivering | **PDF/A** | Voor bestuurs- en notariële stukken |
| Metadata | **INSPIRE-referentieprofiel** | Niet juridisch verplicht voor Suriname, wel best practice |

## 16.3 Authoritative source-principe in praktijk

```
                ┌─────────────────────────┐
                │  SGDP-platform          │
                │  (combineert + advies)  │
                └────┬────────────────────┘
                     │ leest / schrijft via API
       ┌─────────────┼──────────────┬──────────────┬─────────────┐
       │             │              │              │             │
   ┌───▼───┐    ┌────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐  ┌────▼─────┐
   │MI-GLIS│    │GBB/Domein│  │ DBZ/CBA/  │  │NMA/Milieu │  │Concessie │
   │master │    │ kantoor  │  │  e-ID     │  │ register  │  │registers │
   └───────┘    └──────────┘  └───────────┘  └───────────┘  └──────────┘
   master       master         master         master         master
   percelen     aanvragen      identiteit     milieu         mijnbouw
   rechten      beschikkingen  authenticatie  vergunningen   bosbouw
                                                              olie/gas
```

SGDP **wijzigt** alleen wat onder eigen mandaat valt (eigen werkprocesentiteiten, FPIC-data, conflictanalyse). Voor master-data van een ander orgaan: **lezen, refereren, verifiëren** — niet stilzwijgend overschrijven.

## 16.4 API-design

- REST onder `/api/v1/...`
- Authenticatie: OIDC / JWT (in productie via Surinaamse Digitale-ID; demo via Keycloak).
- Documentatie automatisch via **OpenAPI/Swagger**.
- Versionering via URL-prefix (`/api/v1`, `/api/v2`).
- Geo-endpoints volgen **OGC API – Features** patronen.
- Idempotency-key voor `POST` waar relevant (intake, validatie, publicatie).
- Pagination: cursor-based op grote resources.

## 16.5 Concrete endpoints (kerncatalogus)

| Endpoint | Methode | Doel | Belangrijkste velden |
|---|---|---|---|
| `/api/v1/parcels/{perceelsid}` | `GET` | Perceel + rechten + historie ophalen | resp: `perceelsid`, `geometry`, `rights[]`, `documents[]`, `overlaps[]` |
| `/api/v1/cases` | `POST` | Nieuwe domeingrondzaak indienen | req: `caseType`, `applicant`, `purposeType`, `parcelRef|geometry`, `documents[]` |
| `/api/v1/cases/{id}` | `GET` | Zaakdossier ophalen | resp: volledig dossier (gefilterd op rol) |
| `/api/v1/cases/{id}/validate` | `POST` | Document- en veldvalidatie uitvoeren | resp: `errors[]`, `warnings[]`, `nextAllowedState` |
| `/api/v1/cases/{id}/publish` | `POST` | Publieke kennisgeving genereren (start bezwaartermijn) | resp: `noticeId`, `publicationDate`, `objectionDeadline` |
| `/api/v1/cases/{id}/risk-assessment` | `POST` | Overlap- en risicoscore draaien | resp: `riskScore`, `blockers[]`, `requiredReviews[]` |
| `/api/v1/cases/{id}/decision` | `POST` | Beschikking registreren | req: `decisionType`, `outcome`, `reasoning`, `decider` |
| `/api/v1/consultations` | `POST` | Consultatie- of FPIC-dossier openen | req: `caseId`, `triggerType`, `communities[]`, `fpicRequired` |
| `/api/v1/consultations/{id}/sessions` | `POST` | Sessie registreren | req: `date`, `location`, `participants[]`, `minutesDoc` |
| `/api/v1/consultations/{id}/decision` | `POST` | Consent-status registreren | req: `decisionStatus`, `conditions[]`, `benefitSharing[]` |
| `/api/v1/consultations/{id}/grievance` | `POST` | Klacht indienen | req: `category`, `submittedBy`, `description`, `dueDate` |
| `/api/v1/public/notices` | `GET` | Publieke kennisgevingen | filters: `district`, `community`, `dateFrom`, `status` |
| `/api/v1/public/objections` | `POST` | Bezwaar indienen | req: `noticeId`, `objector`, `grounds`, `attachments[]` |
| `/api/v1/documents/{id}/verify` | `GET` | Authenticiteit document controleren | resp: `hashValid`, `signatureValid`, `issuer`, `verificationTs` |
| `/api/v1/mobile/surveys/sync` | `POST` | Offline surveydata synchroniseren | req: `deviceId`, `records[]`; resp: `accepted[]`, `rejected[]` |
| `/api/v1/geo/overlap` | `POST` | Stand-alone overlap-check (zonder zaak) | req: polygon; resp: `overlaps[]` |
| `/api/v1/geo/features` | `GET` | OGC API – Features endpoint per laag | OGC-conform |

## 16.6 Voorbeeldrequest — domeingrondaanvraag

```json
{
  "caseType": "DOMEINGROND_AANVRAAG",
  "applicant": {
    "partyType": "NATURAL_PERSON",
    "name": "Voorbeeld Aanvrager",
    "idNumber": "1234567",
    "nationality": "SUR"
  },
  "purposeType": "BEBOUWING_BEWONING",
  "parcelRef": {
    "perceelsid": "PMB-AB-12345"
  },
  "documents": [
    {"type": "NATIONALITEITSVERKLARING", "documentId": "doc_001"},
    {"type": "ID_KOPIE",                 "documentId": "doc_002"},
    {"type": "FIGURATIEVE_KAART",        "documentId": "doc_003"}
  ]
}
```

Bij ontvangst:

1. Schemavalidatie (Besluit GLIS 2025: identiteit, perceelsidentificatie, partijtype, bronstuktype).
2. Overlap-check tegen alle relevante lagen.
3. Risicoscore (zie [10-adviesmotor.md §10.4](10-adviesmotor.md)).
4. Indien geen hard blocker: status → `ontvangen`; daarna `documentcontrole`.
5. Indien volledig: publicatie → start 30-dagen bezwaartermijn.

## 16.7 Document-verificatie (PKI/QR)

Voor elk uittreksel of authentieke kopie produceert het platform:

- Een **PDF/A** met inhoudsblok en metadata.
- Een **digitale handtekening** met de overheids-PKI van het uitgevende orgaan (MI-GLIS, GBB, NMA).
- Een **QR-code** met verifieerbare URL naar `/api/v1/documents/{id}/verify`.

Verificatie controleert hash-equivalentie, geldigheid van de keten en ondertekenende organisatie.

## 16.8 Demo-status integraties

| Bron | Demo-implementatie |
|---|---|
| MI-GLIS | Lokale mock-tabel met "MI-GLIS-stijl" velden + import van fictieve dataset |
| GBB / Domeinkantoor | Eigen workflow in SGDP; gespiegelde mock |
| DBZ / CBA / e-ID | Lokale Keycloak met fixed users; geen echte ID-koppeling |
| Landmeters | Handmatige upload van Shapefile/GeoPackage |
| Concessieregisters | Mock-laag in PostGIS |
| NMA | Mock-tabel met enkele beschermde gebieden + voorbeeld-MEA-statussen |
| WRO | Stub-bestemmingen voor 3 demo-districten |
| Rechtspraak | Handmatig in dossier |
| Publieke kennisgeving | Eigen demo-portaal (geen externe advertentie) |

Echte integraties starten in **Roadmap Fase 2** ([13-roadmap.md](13-roadmap.md)).
