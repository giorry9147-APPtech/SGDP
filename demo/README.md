# SGDP Demo — Surinaams Grondenrechten & Decentralisatie Platform

> **Werkarm van het Staatshoofd — Demo-versie voor stakeholders**
>
> Volledig fictieve data (gelabeld `DEMO_…`). Geen productiedata. Geen besluitvorming op basis van deze omgeving.

## Wat dit is

Een interactieve web-demo die stakeholders binnen 10 minuten laat ervaren hoe een **Land Rights & Claims Intelligence Platform** voor Suriname werkt: kaart, dossiers, workflow, conflictdetectie, regelgebaseerde adviesmotor en FPIC.

### 9 modules + executive dashboard

1. **Executive Dashboard** — President-view: voortgang werkgroep, mijlpalen, top-risico's
2. **GIS-kaart** — Interactieve kaart Suriname met 7 lagen (ITP-gebieden, concessies, beschermd, percelen, aanvragen, gemeenschappen)
3. **Aanvragen & Adviesmotor** — Domeingrond-intake met live conflictdetectie en regelgebaseerd advies (6 categorieën, 0-100 risicoscore, hard blockers, **PDF-export** via browser-print)
4. **FPIC & Consultatie** — Trajecten met traditioneel gezag, 9 statussen, audit trail van consultatie-events
5. **Dossiers** — Per district, met FPIC-koppeling, documenten, bezwaartermijn
6. **Grondhuur & Conversie** — Levenscyclus ná uitgifte: reminders 12/9/6 mnd, conversie-checklist (Besluit Grondconversie 2023), vervallenverklaring met hoor & wederhoor
7. **Milieu & NMA** — MEA-screening, MER-review, beschermd gebied-overlaps, register verontreinigde gebieden, rehabilitatieplannen (Milieu Raamwet)
8. **Werkgroep-werkruimte** — Vergaderingen, besluiten, actiepunten, mijlpalen, leden
9. **Stakeholders & Communities** — VIDS, KAMPOS, MI-GLIS, NMA + ITP-gemeenschappen
10. **Audit Trail** — Onveranderbaar log met hash-keten
11. **Adviesregels** — Publieke transparantie van de regelmotor (versioneerd, 22 regels in 6 categorieën)

## Lokaal draaien

```bash
cd demo
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Productie-build testen

```bash
npm run build
npm run start
```

## Deploy naar Vercel

### Optie A — via Vercel CLI

```bash
npm install -g vercel
cd demo
vercel
```

Vercel detecteert automatisch Next.js. Volg de prompts (project name, scope). Na deploy krijg je een gedeelde URL.

### Optie B — via Vercel dashboard

1. Push deze map naar een Git-repo (GitHub/GitLab/Bitbucket).
2. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de repo.
3. **Root Directory** zet op `demo` (als deze map onderdeel is van een grotere repo).
4. Framework wordt auto-gedetecteerd als Next.js.
5. Klik **Deploy**.

Geen environment variables nodig — alle data is statisch in `lib/demo-data.ts`.

## Tech stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** + custom Surinaamse themetokens (`globals.css`)
- **MapLibre GL JS** voor de interactieve kaart (open-source, geen access token)
- **CARTO Light** raster tiles als basemap
- **Lucide** iconen
- **Recharts** geïnstalleerd voor latere uitbreiding

## Projectstructuur

```
demo/
├── app/                       # Next.js App Router pages
│   ├── page.tsx              # Executive Dashboard
│   ├── kaart/                # GIS-kaart
│   ├── aanvragen/            # Lijst, detail (met PDF-print), nieuwe aanvraag
│   ├── fpic/                 # Lijst, detail FPIC-traject
│   ├── dossiers/             # Per district
│   ├── grondhuur/            # Grondhuur, conversie, vervallenverklaring
│   ├── milieu/               # NMA-werkstroom, MEA/MER, contaminated sites
│   ├── werkgroep/            # Vergaderingen, besluiten, acties
│   ├── stakeholders/         # Stakeholders + communities
│   ├── audit/                # Audit trail
│   └── regels/               # Adviesregels (transparantie)
├── components/
│   ├── layout/app-shell.tsx  # Surinaamse overheidsheader + sidebar
│   ├── ui/                   # Badge, StatCard, SectionHeader
│   ├── map/sgdp-map.tsx      # MapLibre wrapper met 7 lagen
│   └── advice/               # Adviesrapport-component
└── lib/
    ├── demo-data.ts          # Volledig fictieve dataset (incl. tenures, conversies, env-cases)
    └── advice-engine.ts      # Regelgebaseerde adviesmotor (22 regels in 6 categorieën)
```

## Documentatie voor demo-deelnemers

- **[DEMO-SCRIPT.md](./DEMO-SCRIPT.md)** — 12-minuten walkthrough voor stakeholders (de presentator volgt dit script)
- **[GEBRUIKERSHANDLEIDING.md](./GEBRUIKERSHANDLEIDING.md)** — handleiding voor werkgroepleden die zelfstandig de demo gebruiken

## Dataset

Alles in `lib/demo-data.ts`:

- 3 fictieve districten (DEMO_Marowijne, DEMO_Sipaliwini, DEMO_Para)
- 50 percelen (eigendom / erfpacht / grondhuur)
- 5 ITP-gemeenschappen met traditioneel gezag (granman, kapiteins, basja's)
- 5 traditionele woon- en leefgebieden als polygonen
- 3 concessies (mijnbouw, bosbouw, landbouw — 1 met overlap met ITP)
- 2 beschermde gebieden + 1 verontreinigd gebied (kwik)
- 10 voorbeeld-aanvragen (3 met conflict, 1 met MEA-trigger)
- 3 FPIC-trajecten (in verschillende statussen)
- **10 grondhuur-cases** (actief, aflopend 12/9/6, in renewal, in conversie, expired, vervallen)
- **3 conversie-aanvragen** (Besluit Grondconversie 2023 — incl. 1 die FPIC heropent)
- **2 vervallenverklaringen** (1 in voornemen-fase, 1 voltooid)
- **4 milieu-zaken** (EnvCase: protected_overlap, MEA, permit_change)
- **1 rehabilitatieplan** (IACHR Kaliña-Lokono-verplichting)
- Werkgroep: 6 leden, 3 vergaderingen, 3 besluiten, 10 actiepunten
- Audit log met 10 events
- Stakeholderregister met 16+ entries

## Belangrijke beperkingen

- **Mutaties zijn niet persistent.** De demo toont mutaties in de browser maar slaat niets op. Een refresh herstelt naar de seeddata.
- **Geen echte authenticatie.** Rolweergave is statisch ("Edgar Dikan").
- **Geen MI-GLIS / GBB / NMA-koppeling.** Alle externe registers zijn lokale mocks.
- **Geen mobile-app.** Web-only, responsive maar zonder offline-modus.

Deze beperkingen zijn bewust — zie de productdocumentatie in `../docs/` voor de volledige roadmap.

## Licenties / attributies

- Map tiles: © OpenStreetMap contributors · © CARTO
- MapLibre GL JS — BSD-3
- Lucide icons — ISC

---

**Demo-versie 0.1.0** · ruleset 1.0.0 · gebouwd voor: Werkgroep Grondenrechten & Decentralisatie · Republiek Suriname
