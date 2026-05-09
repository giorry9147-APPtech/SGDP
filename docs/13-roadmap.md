# 13 — Roadmap (Latere Stappen)

> Deze roadmap beschrijft het pad van **demo → pilot → uitrol → schaal**. Niets hieronder is in de demo opgenomen tenzij expliciet aangegeven.

## 13.1 Strategische lijn

```
 ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌──────────┐     ┌───────────┐
 │  Fase 0  │ ──► │  Fase 1  │ ──► │  Fase 2  │ ──► │  Fase 3  │ ──► │  Fase 4   │
 │  Demo    │     │  Pilot   │     │  Integ-  │     │  Burger- │     │  Maturity │
 │ (MVP)    │     │ (1 distr)│     │  raties  │     │  diensten│     │ + ledger  │
 └──────────┘     └──────────┘     └──────────┘     └──────────┘     └───────────┘
   ~4 maand        ~6 maand         ~9 maand         ~12 maand          ~doorlopend
```

## 13.2 Fase 0 — Demo (huidige fase)

**Tijdsbestek**: ~4 maanden vanaf bouwstart
**Doel**: bewijs van concept; werkgroep kan ermee werken; stakeholders zien tastbaar resultaat
**Inhoud**: zie [07-mvp-demo-scope.md](07-mvp-demo-scope.md).
**Exit-criterium**: positieve evaluatie door werkgroep + ten minste twee externe stakeholders (bv. VIDS en MI-GLIS).

## 13.3 Fase 1 — Pilot in één district

**Tijdsbestek**: ~6 maanden na Fase 0
**Doel**: echt gebruik op echte dossiers in beperkte scope
**Inhoud**:
- Eén district kiezen waar zowel domeingrondaanvragen als ITP-overlap voorkomen.
- Echte (geanonimiseerde) data importeren in samenwerking met MI-GLIS en GBB.
- Echte FPIC-trajecten met instemming van de gemeenschap.
- Performance- en beveiligingsaudit.
- Privacy Impact Assessment (PIA) afronden.
- Gebruikerstrainingen.
- Productie-runbook (incident response, backup, disaster recovery).
- Onafhankelijke security review.

**Risico's**: politieke gevoeligheid, dataverkrijging, capaciteit ambtenaren. **Mitigatie**: beperkte scope, projectstuur met werkgroep + GBB + MI-GLIS.

## 13.4 Fase 2 — Integraties met bestaande registers

**Tijdsbestek**: ~9 maanden na Fase 1
**Doel**: SGDP wordt ruggengraat in een verbonden register-ecosysteem
**Inhoud**:
- Bidirectionele koppeling **MI-GLIS** (registergoederen).
- Koppeling **Domeinkantoor** (status aanvragen).
- Koppeling **concessieregisters** (mijnbouw, hout).
- Koppeling **identiteitsregister** of equivalent (verificatie partijen).
- Koppeling **adressenregister**.
- OGC API-Features volledig conform.
- Open data-portaal voor publiek (geanonimiseerd, OGC-conform).
- Volledige meertaligheid in interface (NL + Sranantongo + relevante ITP-talen).
- Architectuur: uitsplitsing geo-API en adviesmotor naar aparte services.

**Outputs**: contracten met register-eigenaren, datakoppeling-overeenkomsten, gedeelde governance.

## 13.5 Fase 3 — Burgerdiensten en velddata

**Tijdsbestek**: ~12 maanden na Fase 2
**Doel**: directe interactie met burgers en gemeenschappen
**Inhoud**:
- **Burgerportaal** (volledig): digitale aanvraag, status, bezwaar, document upload, meldingen.
- **Veldwerk-app** (mobiel, Android/iOS): GPS-track, foto, audio, FPIC-registratie offline; sync bij connectiviteit.
- **Identiteitsverificatie** (eIDAS-achtig of overheidsequivalent): NFC-uitlezing waar beschikbaar, biometrische match.
- **AI-OCR documentanalyse**: automatische extractie metadata uit PDF's en foto's van akten/kaarten.
- **Online Dispute Resolution (ODR)**-module: case management, gedeelde kluis, video-mediation, AI-uitkomstadvies.
- **AML / KYC** voor partijen-screening (anti-witwas, sancties, UBO-detectie) — alleen waar wettelijk toepasbaar.
- **PII auto-redactie** voor publieke documenten.
- **Push notificaties** SMS/e-mail/WhatsApp.

## 13.6 Fase 4 — Maturity, Ledger, AI

**Tijdsbestek**: doorlopend
**Doel**: nationale schaal, audit-bestendigheid op IACHR-niveau, beleidsanalytics
**Inhoud**:
- **Hash-verankering** op een onveranderlijke ledger (publiek of geconsorteerd, Estland-model).
- **Smart contracts** voor automatische uitvoering bij standaardtransacties (bv. uitgifte na compleet dossier en betaling).
- **CAMA**-module voor massataxatie en grondbelasting.
- **3D-cadaster** voor stedelijke gebieden, mijnbouwlagen en utiliteit.
- **AI explainability laag** boven adviesmotor (SHAP/LIME).
- **Geautomatiseerde beleidsbriefings** uit aggregaten naar President.
- **Internationale interoperabiliteit** (INSPIRE-achtig).
- **Grensoverschrijdende samenwerking** (bv. met Frans-Guyana, Guyana voor grensgebieden).

## 13.7 Cross-cutting onderwerpen door alle fasen

### Capaciteitsopbouw
- Trainingen ambtenaren, werkgroep, secretariaat, ITP-vertegenwoordigers.
- Curriculum-modules: GIS, data-invoer, FPIC, juridisch, beveiliging.
- Mentor-programma met internationale partners.

### Beleid en wetgeving
- Aansluiten op voortgang ontwerpwet Collectieve Rechten ITP.
- Ondersteuning bij operationele invulling demarcatieprocedure.
- Aanbeveling tot wettelijke verankering van het platform als basisregister-component.

### Governance van het platform
- Stuurgroep met werkgroep, MI-GLIS, GBB, VIDS, KAMPOS, civil society.
- Onafhankelijke audit jaarlijks.
- Open documentatie van regels in adviesmotor (publieke versie).

### Financiering
- Fase 0 (demo): minimale investering, internal of donorfinanciering.
- Fase 1 (pilot): nationale + IDB / UN-Habitat / EU bilaterale fondsen.
- Fase 2+: structurele begroting, mogelijk leges-cofinanciering.
- Geen vendor lock-in; eigendom code en data bij Suriname.

### Communicatie
- Doorlopend transparantieportaal.
- Kwartaalbriefings publiek.
- Specifieke briefings voor ITP-koepels.
- Internationaal (UN-Habitat, FAO, IDB) tweemaal per jaar.

## 13.8 Mijlpalen op hoofdlijn (indicatief)

| Mijlpaal | Doel | Termijn |
|---|---|---|
| Demo opgeleverd | 7 kernmodules + werkgroep-werkruimte | Q+4 maanden |
| Demo-evaluatie afgerond | Beslispunt naar pilot | Q+5 maanden |
| Pilot live | District X, echte data | Q+11 maanden |
| Eerste IACHR-bestendige rapportage | Audit trail + FPIC vastgelegd | Q+13 maanden |
| Integratie MI-GLIS | Bidirectioneel | Q+18 maanden |
| Burgerportaal live | Status + bezwaar | Q+24 maanden |
| Veldapp live | Mobiel + offline | Q+27 maanden |
| Hash-verankering live | Anti-corruptie | Q+30 maanden |
| Nationale uitrol | Alle districten | Q+36 maanden |

## 13.9 Beslispunten (gates)

| Gate | Vraag | Beslissers |
|---|---|---|
| G0 → Pilot | Werkt de demo conceptueel? Is er stakeholder-draagvlak? | Werkgroep + President |
| G1 → Integraties | Werkt de pilot operationeel? Zijn audits OK? | Werkgroep + GBB + MI-GLIS |
| G2 → Burgerdiensten | Zijn de integraties stabiel? Is er draagvlak voor burgerportaal? | Stuurgroep + DNA-info |
| G3 → Maturity | Zijn de processen volwassen genoeg voor automatisering en ledger? | Stuurgroep + onafhankelijke audit |
