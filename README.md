# SGDP — Suriname Grondenrechten & Decentralisatie Platform

**Demo-versie van een Land Rights & Claims Intelligence Platform**, ontworpen ter ondersteuning van de Werkgroep Grondenrechten en Decentralisatie (benoemd december 2025) en als adviessysteem voor de President van de Republiek Suriname.

> Dit project is opgezet als **demo / MVP**. De documentatie beschrijft zowel wat in de demo gebouwd wordt als de volledige doelarchitectuur en latere stappen.

---

## Twee samenhangende sporen

Het project bestaat uit twee complementaire sporen die in deze documentatie strikt gescheiden zijn beschreven:

| Spoor | Wat | Doel |
|-------|-----|------|
| **A. Werkgroep & werkwijze** | Organisatiestructuur, vergaderingen, FPIC-procedures, dashboard, rapportage | Helder, gestructureerd advies aan de President |
| **B. Software-platform** | GIS, claims-register, dossiermodule, conflictdetectie, adviesmotor | Digitale ondersteuning van advies, beleid en uitvoering |

---

## Documentatie-index

### Werkgroep (Spoor A)
- [docs/01-werkgroep-organisatie.md](docs/01-werkgroep-organisatie.md) — Organisatiestructuur, leden, rollen, RACI
- [docs/02-werkgroep-werkwijze.md](docs/02-werkgroep-werkwijze.md) — Werkwijze, vergaderingen, besluitvorming, FPIC
- [docs/03-werkgroep-dashboard.md](docs/03-werkgroep-dashboard.md) — Dashboard, KPI's, mijlpalen, rapportage

### Platform (Spoor B)
- [docs/04-platform-visie.md](docs/04-platform-visie.md) — Visie, positionering, probleemstelling
- [docs/05-requirements.md](docs/05-requirements.md) — Functionele en niet-functionele vereisten
- [docs/06-features.md](docs/06-features.md) — Volledig featureoverzicht
- [docs/07-mvp-demo-scope.md](docs/07-mvp-demo-scope.md) — **Wat er in de demo zit (en wat niet)**
- [docs/08-data-model.md](docs/08-data-model.md) — LADM, STDM, FFP-LA datamodel + erDiagram
- [docs/09-architectuur.md](docs/09-architectuur.md) — Technische architectuur en stack
- [docs/10-adviesmotor.md](docs/10-adviesmotor.md) — Adviescategorieën, regels, risicoscore-formule
- [docs/11-fpic-stakeholders.md](docs/11-fpic-stakeholders.md) — FPIC-module, stakeholders, ITP-gemeenschappen
- [docs/12-standaarden-referenties.md](docs/12-standaarden-referenties.md) — Internationale + Surinaamse bronnen
- [docs/13-roadmap.md](docs/13-roadmap.md) — Latere stappen, schaalbaarheid, integraties
- [docs/14-risico-evaluatie.md](docs/14-risico-evaluatie.md) — Risicobeheer, evaluatie, audit

### Surinaamse juridische en operationele context (Spoor B+)
- [docs/15-juridisch-kader.md](docs/15-juridisch-kader.md) — Grondwet, decreten, ontwerpwetten, compliance-checklist, federatief mandaatmodel
- [docs/16-integraties-api.md](docs/16-integraties-api.md) — Integraties (MI-GLIS, GBB, NMA, e-ID, concessies), uitwisselingsformaten, API-contracten
- [docs/17-milieu-nma.md](docs/17-milieu-nma.md) — Milieu Raamwet, NMA, MEA/SEA/MER, vergunningenregister, rehabilitatie
- [docs/18-grondhuur-conversie.md](docs/18-grondhuur-conversie.md) — Grondhuur (15–40 jaar), verlenging, conversie, vervallenverklaring, compensatie

---

## Snelle samenvatting

**Probleem.** Suriname kent overlappende grondaanvragen, ongedocumenteerde traditionele woon- en leefgebieden van Inheemse en Tribale Volken (ITP), concessies in dezelfde gebieden, en een fragmentarische registratie verspreid over ministeries, MI-GLIS en informele bronnen. De Werkgroep moet de President hierover adviseren.

**Oplossing.** Een platform dat **kaart + dossier + workflow + conflictdetectie + adviesmotor + FPIC + milieumotor** combineert, gebouwd op internationale standaarden (LADM/ISO 19152, STDM, FFP-LA, FPIC) en aangesloten op bestaande Surinaamse rechtsbronnen (Grondwet, Wet GLIS, Decreet Domeingrond, Besluit GLIS 2025, Besluit Grondconversie 2023, Milieu Raamwet) en registers (MI-GLIS, GBB/Domeinkantoor, NMA).

**Drie harde uitgangspunten** ([docs/15](docs/15-juridisch-kader.md)):
1. **Federatief mandaatmodel** — MI-GLIS ↔ Domeinkantoor/GBB blijven gescheiden bevoegd.
2. **PERCEELSID als ruggengraat** — geen recht- of besluitregistratie zonder geldige perceelsidentificatie.
3. **Configurabel rond bewegende wetgeving** — ontwerpwetten worden via regelconfiguratie meegenomen, niet hardcoded.

**Demo-scope.** Zeven kernmodules: digitale aanvraag, dossierupload, GIS-kaart, overlap-check, conflict-risicoscore, adviesrapport, admin-dashboard. Zie [docs/07-mvp-demo-scope.md](docs/07-mvp-demo-scope.md).
