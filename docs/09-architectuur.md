# 09 — Technische Architectuur

## 9.1 Architectuurprincipes

1. **Open standaarden eerst.** OGC API, GeoJSON, ISO 19152, PostGIS — geen vendor lock-in.
2. **Modulair.** Duidelijke moduledomeinen (kaart, dossier, advies, FPIC, werkgroep). Demo: modulair monolith. Roadmap: microservices waar zinvol.
3. **Data-eigendom respecteren.** ITP-data staat in eigen schema's met striktere toegangscontrole.
4. **Audit by design.** Append-only logs; cryptografische hashes op brondocumenten.
5. **Uitlegbaar.** Adviezen regelgebaseerd; ML alleen als aanvulling met explainability.
6. **Begrijpbaar voor 1 persoon.** De stack moet door een klein team te onderhouden zijn — geen onnodige complexiteit voor de demo.

## 9.2 High-level diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                            GEBRUIKERS                               │
│  Werkgroep · Secretariaat · Ambtenaren · ITP-vert. · Burger view    │
└──────────────────────────────┬──────────────────────────────────────┘
                               │ HTTPS
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          WEB FRONTEND                               │
│  React + Vite, kaart op MapLibre GL, Tailwind, i18n                 │
└──────────┬──────────────────────────────────────────┬───────────────┘
           │                                          │
           │  REST + (later) OGC API-Features         │ WebSocket
           ▼                                          ▼
┌─────────────────────────────────────────────────────────────────────┐
│                      BACKEND APPLICATIE                             │
│  Python (FastAPI) of Node.js (NestJS) — modulair monolith           │
│                                                                     │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌────────────┐ ┌──────────┐ │
│  │ Kaart &  │ │ Aanvragen│ │ Dossier  │ │ Advies-    │ │ FPIC &   │ │
│  │ Geo-API  │ │ & Workflow│ │ + Audit  │ │ motor      │ │ Consult. │ │
│  └────┬─────┘ └────┬─────┘ └────┬─────┘ └────┬───────┘ └────┬─────┘ │
│       │            │            │            │              │      │
│  ┌────▼────────────▼────────────▼────────────▼──────────────▼────┐  │
│  │                    Werkgroep + Stakeholders + Beheer          │  │
│  └────────────────────────────┬──────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                          DATALAGEN                                  │
│  ┌───────────────────────┐  ┌───────────────────────┐               │
│  │ PostgreSQL + PostGIS  │  │ Object storage        │               │
│  │ (transactioneel + geo)│  │ (S3 / MinIO)          │               │
│  │ - LADM/STDM-schema    │  │ - documenten          │               │
│  │ - werkgroep-schema    │  │ - foto / audio / video│               │
│  │ - audit (append-only) │  │ - hash-verificatie    │               │
│  └───────────────────────┘  └───────────────────────┘               │
│                                                                     │
│  ┌───────────────────────┐  ┌───────────────────────┐               │
│  │ Identity / Auth       │  │ Tile cache            │               │
│  │ (Keycloak of Auth0)   │  │ (basemap + lagen)     │               │
│  └───────────────────────┘  └───────────────────────┘               │
└─────────────────────────────────────────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────────┐
│                  INTEGRATIES (roadmap, niet demo)                   │
│  MI-GLIS · Domeinkantoor · concessieregister · BR-personen          │
│  Externe ledger voor hash-verankering (later)                       │
└─────────────────────────────────────────────────────────────────────┘
```

## 9.3 Aanbevolen technologie-stack (demo)

### 9.3.1 Frontend
- **React** met **TypeScript** en **Vite**.
- **MapLibre GL JS** voor de kaart (open-source, geen Mapbox-token).
- **Tailwind CSS** + **shadcn/ui** voor consistente UI-componenten.
- **react-i18next** voor meertaligheid.
- **TanStack Query** voor server state.

### 9.3.2 Backend
- **Python 3.12 + FastAPI** — eenvoudig, snelle API, sterke ecosystem voor geo en data.
- Alternatief: **NestJS (Node.js + TypeScript)**.
- **SQLAlchemy + GeoAlchemy2** voor ORM met PostGIS.
- **Pydantic** voor validatie.
- **Alembic** voor database migraties.
- **Celery + Redis** voor achtergrondtaken (overlap-check, rapportgeneratie).

### 9.3.3 Database en opslag
- **PostgreSQL 16 + PostGIS 3** als primaire DB.
- Aparte schema's: `ladm`, `stdm`, `wg` (werkgroep), `audit`, `lookup`.
- **MinIO** (S3-compatibel) voor documenten en media.
- **Redis** voor cache en queues.

### 9.3.4 Identity & Access
- **Keycloak** voor authenticatie, RBAC, 2FA, OIDC. Klaar voor latere koppeling met overheid-IdP.
- Rollen (demo): `admin`, `werkgroep_lid`, `secretariaat`, `ambtenaar`, `consult_partner`, `viewer`.

### 9.3.5 GIS-componenten
- **PostGIS** voor opslag en spatial queries (overlap, intersect, buffer).
- **Tegel-laag** via **pg_tileserv** of **Tegola** voor vector tiles.
- **GeoServer** alleen indien nodig voor OGC WMS/WFS-compliance (later).
- **GDAL** in backend voor import/conversies (Shapefile, KML, GeoTIFF).

### 9.3.6 Adviesmotor
- Eigen regel-engine in Python (zie [10-adviesmotor.md](10-adviesmotor.md)).
- Regels in **YAML** of **JSON**, versioned in Git.
- Generatie van rapport in **Markdown → PDF** via **WeasyPrint**.

### 9.3.7 DevOps en Infrastructuur
- **Docker + docker-compose** voor demo (alles op één host).
- **GitHub Actions** voor CI/CD.
- **Nginx** als reverse proxy.
- **Let's Encrypt** TLS.
- Gestructureerde logging (JSON) → **Loki** of bestand → **Grafana**.
- Backups via cron + encrypted offsite copy.

### 9.3.8 Observability
- **Prometheus** + **Grafana** voor metrics.
- Dashboards: aanvragen/uur, overlap-check-tijden, foutpercentage.

## 9.4 Beveiliging

| Laag | Maatregel |
|---|---|
| Transport | TLS 1.3, HSTS |
| Auth | Keycloak, 2FA verplicht voor ambtenaar+ |
| Autorisatie | RBAC + attribute-based voor FPIC-restricted records |
| Geheimen | `.env` niet in repo, env via vault of host secrets |
| Database | Encryption at rest (volume-niveau), aparte read/write users per service |
| Object storage | Server-side encryption, presigned URLs met korte TTL |
| Backup | Encrypted, offsite, getest restore |
| Audit | Append-only, periodiek hash-chained |
| OWASP | Dependency scanning (Dependabot), SAST in CI |
| Rate limiting | Per IP en per user op publieke endpoints |
| Headers | CSP, X-Frame-Options, X-Content-Type-Options |

## 9.5 Toegangsmodel (RBAC, demo)

| Rol | Kaart | Dossier | Aanvraag wijzigen | Adviesmotor | FPIC-data | Audit-export |
|---|---|---|---|---|---|---|
| viewer | R (publiek) | — | — | — | — | — |
| ambtenaar | R/W | R/W eigen | W | run | R (algemeen) | — |
| werkgroep_lid | R/W | R/W | W | run | R | — |
| consult_partner (ITP-vert.) | R | R eigen gemeenschap | — | — | R/W eigen | — |
| secretariaat | R/W | R/W | W | run | R | export op verzoek |
| admin | R/W | R/W | W | configureren | R | export |

## 9.6 API-design

- REST onder `/api/v1/...`
- Resources: `/cases`, `/parties`, `/spatial-units`, `/rrr`, `/sources`, `/communities`, `/fpic`, `/decisions`, `/actions`, `/meetings`, `/advice`.
- Geo-endpoints volgens **OGC API-Features** patronen (later volledig conform).
- Authenticatie via OIDC / JWT van Keycloak.
- Versionering via URL-prefix (`v1`).
- Documentatie automatisch via OpenAPI/Swagger.

## 9.7 Data import / export

- **Import**: GeoJSON, Shapefile (.zip), KML, CSV-bulk.
- **Export**: GeoJSON, GeoPackage, PDF (rapport), CSV, ZIP-dossier.
- Importtool valideert geometrie (geen self-intersect, gesloten polygonen) voordat opslag plaatsvindt.

## 9.8 Hosting-opties demo

| Optie | Voor- | Tegen- |
|---|---|---|
| Lokaal (kantoor werkgroep) | Volledige controle, geen externe afhankelijkheid | Beperkte beschikbaarheid, backup-discipline |
| Cloud single-tenant (NL/SR-regio) | Schaalbaarheid, beheer eenvoudiger | Privacy/jurisdictie-discussie nodig |
| Hybride (cloud + on-prem voor FPIC-restricted) | FPIC-data blijft lokaal | Complexer |

Aanbeveling demo: **cloud single-tenant** in een regio die juridisch acceptabel is, met optie om FPIC-restricted data later te migreren naar on-prem.

## 9.9 Schaalbaarheid en evolutie

- Demo draait op één node, ~20 gelijktijdige gebruikers, ~10k records.
- Productie-ambitie: ≥ 100k dossiers, ≥ 1M spatial units, ≥ 200 gelijktijdige gebruikers.
- Schaalpad: read replica's PostgreSQL, horizontaal schalen achter load balancer, tile-cache CDN, queue workers in Kubernetes.
- Bij overgang naar microservices: eerst splits van geo-API en adviesmotor.
