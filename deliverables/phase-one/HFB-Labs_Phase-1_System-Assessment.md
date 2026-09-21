# Phase 1 System Assessment: Water Treatment Plumbing, As-Marked

**Client:** Happy Farm Botanicals Inc. (HFB Labs)
**Service Provider:** ClearWave Water Solutions
**Document No.:** CW-HFB-P1-2026-001, Rev A
**Issue date:** 2026-09-21
**Responsible representative:** Justin Shoemaker, Principal, ClearWave Water Solutions
**Status:** Draft for Client review
**Governing document:** Quality Agreement between ClearWave Water Solutions and Happy Farm Botanicals Inc. (executed 2026)

---

## 1. Purpose and scope

This document is the Phase 1 scoping deliverable for the HFB Labs water treatment plumbing redesign. Its job is limited and specific: **record what is installed today, as ClearWave marked it during the site walk.** It does not propose a new design. Redesign work is a separate phase and a separate work order.

It is issued as "Documentation" under Section 5 of the Quality Agreement and is built to satisfy the deliverable types named there: an assessment report, a line map, a component inventory, a functional status report, and a photo package.

Per Section 3 of the Quality Agreement, ClearWave does not perform water quality testing. Nothing in this document is a water quality result.

## 2. Basis of assessment

| Source | Status in this revision |
|---|---|
| ClearWave site walk with hand-marked line labels and flow arrows (38 photographs, files 1000034222 through 1000034263) | 9 photographs reviewed and annotated in Rev A. Remaining 29 received; to be annotated in Rev B. |
| Facility plumbing drawing set, sheet series "03_PLUMBING" (22 sheets, supplied by Client) | Received. Not yet reconciled against field conditions. Reconciliation is a Rev B item. |
| ClearWave site walk video (Google Drive folder, supplied by ClearWave) | Received. Not yet reviewed against this document. Rev B item. |
| Quality Agreement, ClearWave / HFB Labs | Reviewed in full. Sections 2, 3, 5, 6, and 7 govern this deliverable. |

Everything stated in Sections 3 through 6 below is a field observation from the photographs. Where a make, model, size, or setting could not be read from a photograph, it is written as "to be confirmed" rather than guessed.

## 3. System overview

The facility runs a single treatment train fed from the municipal supply. Reading the marked lines in flow order:

1. **City supply** enters at the line marked `CITY` / `MAIN IN`.
2. A **bypass manifold** in gray Schedule 80 PVC sits on the main, marked `MAIN IN` and `MAIN OUT`, with three red-handled true-union ball valves. This lets the treatment train be isolated while keeping supply to the building.
3. Water passes to a **carbon filter**, a fiberglass media tank marked `CARBON`, with an electronic control valve head. Its feed is marked `CARBON IN`.
4. Treated water feeds a **commercial reverse osmosis (RO) skid**. The RO feed line is marked `RO IN` and carries an actuated ball valve tied to an AquaGate leak controller. RO product leaves on the line marked `RO OUT`.
5. Downstream distribution runs overhead on insulated lines marked `DI`, `CITY OUT`, and `Recir` (recirculation return).

Whether a softener or a deionization (DI) polisher sits between the RO and the `DI` line could not be confirmed from the photographs reviewed in this revision. The `DI` label suggests a DI stage exists; its location and type are a Rev B confirmation item.

## 4. As-marked line map

Each row is one line as ClearWave marked it in the field. "Material" is what is visible in the photograph. Pipe sizes are not recorded in this revision; they are a field-measurement item.

| Line label (as marked) | Flow direction marked | Material observed | Insulation | Where observed | Photo ref |
|---|---|---|---|---|---|
| `CITY` | Arrow marked, into building | PVC with red-handle ball valve at branch | Foam, tape-wrapped | Mechanical wall, near flex conduit | 1000034243 |
| `MAIN IN` | Arrow marked | Cream CPVC, then gray Sch 80 PVC at manifold | None on CPVC | Bypass manifold and carbon feed | 1000034224, 1000034253 |
| `MAIN OUT` | Arrow marked | Gray Sch 80 PVC | None | Bypass manifold | 1000034224 |
| `CARBON IN` | Arrow marked | Gray Sch 80 PVC | None | Carbon tank inlet | 1000034253 |
| `RO IN` | Arrow marked, toward RO | Copper, insulated; actuated ball valve inline | Foam | Wall above AquaGate controller | 1000034244 |
| `RO OUT` | Arrow marked, away from RO | Copper, insulated; push-fit elbow at valve | Foam | Wall run with brass fitting and small clear tube | 1000034245 |
| `DI` | Arrow marked | Copper, insulated; sweat coupling visible | Foam | Wall run near solenoid valve; also overhead | 1000034246, 1000034238, 1000034237 |
| `CITY OUT` | Arrow marked | Insulated line, material not visible | Foam, tape-wrapped joints | Overhead along structure | 1000034238 |
| `Recir` | Arrow marked | Insulated line, material not visible | Foam, tape-wrapped joints | Overhead along structure | 1000034238 |

### 4.1 Flow diagram, as marked

```
CITY / MAIN IN
      |
      +---- [Sch 80 PVC bypass manifold: MAIN IN / MAIN OUT, 3 ball valves] ----> MAIN OUT (to building)
      |
   CARBON IN
      |
 [CARBON filter tank, electronic head]
      |
    RO IN ----[actuated ball valve, AquaGate leak controller]
      |
 [Commercial RO skid: prefilter, pump, 3 flow meters, 3 gauges]
      |
   RO OUT
      |
     DI (stage location to be confirmed)
      |
 overhead distribution: DI / CITY OUT / Recir (return)
```

This is a text sketch of the marked lines only. It is not an engineered P&ID.

## 5. Component inventory

| # | Component | Marking / identifiers observed | Location | Condition noted | Photo ref |
|---|---|---|---|---|---|
| C-1 | Bypass manifold | Gray Sch 80 PVC tee-and-loop; three red-handled true-union ball valves; unions on both legs | Main line, mechanical wall | Serviceable. Cardboard stored against piping. | 1000034224 |
| C-2 | Carbon filter | Fiberglass media tank, hand-marked `CARBON`; electronic control valve head with LCD and push buttons. Make, model, tank size, media volume: to be confirmed. | Mechanical wall | Serviceable. Power cord coiled and hanging at head. | 1000034253 |
| C-3 | RO skid | Black-panel commercial RO unit: three rotameter flow meters, three pressure gauges, digital controller with LED status and a laminated quick-reference card, one blue 20 in. prefilter housing, stainless pump, two sample or drain valves. Make, model, rated GPD: to be confirmed. | Floor, on wood pallet | Operating position unclear. Open buckets staged under skid. | 1000034222 |
| C-4 | RO feed isolation | Actuated ball valve, orange handle, wired to controller | `RO IN` line | Serviceable | 1000034244 |
| C-5 | Leak controller | AquaGate wall-mount controller with quick-reference label; cable to C-4 | Wall below `RO IN` | Serviceable | 1000034244 |
| C-6 | Solenoid or actuated valve | White-body valve with wire lead, on line below `DI` | Wall below `DI` run | Function to be confirmed | 1000034246 |
| C-7 | Push-fit fitting | Push-fit elbow on copper, at brass valve | `RO OUT` line | Serviceable. See observation O-4. | 1000034245 |
| C-8 | Brass valve with small tube | Brass valve body with small clear tubing tee'd off | `RO OUT` line | Purpose to be confirmed (sample port or drain) | 1000034245 |
| C-9 | Pipe supports | Copper two-hole straps, single-hole clamps, threaded rod hanger | Wall runs and overhead | Serviceable | 1000034245, 1000034246 |
| C-10 | Overhead distribution | Three parallel insulated lines along structural steel, marked `DI`, `CITY OUT`, `Recir` | Ceiling structure | Insulation joints tape-wrapped. See O-2. | 1000034238 |
| C-11 | Large insulated service lines | Two large-diameter lines, black insulation with yellow-jacketed sections, overhead | Production area ceiling | Not part of treatment train; identity to be confirmed from 03_PLUMBING sheets. | 1000034237 |

## 6. Functional status and observations

Section 2 of the Quality Agreement requires ClearWave to notify the Client of any observed condition that may affect water quality, system safety, or regulatory compliance, even when outside the active scope. The observations below are made under that clause. They are field observations, not test results.

| # | Observation | Why it matters | Suggested handling |
|---|---|---|---|
| O-1 | All line identification is hand-written marker on foam insulation, with hand-drawn arrows. | Not compliant with ASME A13.1 (pipe identification), which Section 2 of the Quality Agreement names as the applicable standard. Marker on foam fades and is lost when insulation is replaced. | Formal labeling is proposed as a Phase 2 line item. See Section 7. |
| O-2 | Foam insulation is split, gapped, or held with black tape at several joints and valve bodies. | Condensation on cold RO/DI lines can drip onto equipment and floors. Gaps also hide fittings from inspection. | Note for redesign scope. Not urgent. |
| O-3 | Piping mixes four materials in one train: copper, cream CPVC, gray Sch 80 PVC, and push-fit fittings. | Mixed materials are workable, but each transition is a potential leak point and each needs the right fitting type. Copper downstream of RO is also a possible source of copper pickup in low-TDS water. | Confirm material of each segment in Rev B. Redesign should standardize. |
| O-4 | Push-fit elbow used on the `RO OUT` line. | Push-fit fittings are acceptable on potable copper but are not typically specified for process water in a regulated facility. | Confirm with Client whether push-fit is acceptable under their quality system. |
| O-5 | RO skid sits on a wood pallet with open buckets underneath. | Suggests either temporary placement or an unresolved drip or drain. Wood pallets in a wet area are a housekeeping and pest concern. | Confirm skid mounting and drain routing on next site walk. |
| O-6 | Sample and drain lines near the RO are small clear tubing, unlabeled. | Unlabeled tubing can be mistaken for a sample point. | Include in labeling plan. |
| O-7 | Location and type of the DI stage feeding the `DI` line could not be confirmed from the photographs reviewed. | The line map is incomplete without it. | Rev B item. |

No unsafe condition requiring immediate work stoppage was observed in the photographs reviewed.

## 7. Pipe identification plan (proposed for Phase 2)

Included here so the Client can see what "ASME A13.1 compliant" will look like. This is a proposal for scope, not work performed.

| Line (as marked today) | Proposed legend | Color field (ASME A13.1) | Notes |
|---|---|---|---|
| `CITY` / `MAIN IN` | CITY WATER | Green field, white text | Potable water |
| `MAIN OUT` | CITY WATER TO BUILDING | Green field, white text | |
| `CARBON IN` | CARBON FILTER FEED | Green field, white text | |
| `RO IN` | RO FEED | Green field, white text | |
| `RO OUT` | RO PERMEATE | Green field, white text | Legend distinguishes it from feed |
| `DI` | DI WATER | Green field, white text | Confirm DI stage first (O-7) |
| `Recir` | DI RECIRC RETURN | Green field, white text | |
| RO reject / drain lines | RO REJECT TO DRAIN | Green field, white text | Not marked today; add |
| Sample tubing | SAMPLE POINT (numbered) | Tag, not pipe label | Number each point |

Label size and placement follow ASME A13.1 Table 1 (letter height and label length by outside diameter) with labels at every valve, every wall or floor penetration, every change of direction, and at intervals along straight runs. Flow arrows on every label.

## 8. IQ / OQ framework outline

Section 5 of the Quality Agreement lists IQ and OQ framework documents as deliverables. This outline shows what each would verify for this system, so the Client can decide whether to include them in Phase 2.

**Installation Qualification (IQ) would verify:**

- Each component in Section 5 is installed per its manufacturer data sheet (make, model, serial recorded).
- Piping material, size, and joint type recorded for every segment on the line map.
- Every line labeled per Section 7 and every valve tagged.
- Drawings (03_PLUMBING and the ClearWave line map) match the installed condition, with a redline of every difference.
- Utilities (power to RO skid, carbon head, controllers, drain connections) confirmed.

**Operational Qualification (OQ) would verify:**

- Bypass manifold isolates the train and maintains building supply, valve by valve.
- Carbon head runs a full backwash and rinse cycle on its programmed schedule.
- RO skid reaches and holds its rated feed pressure and product flow; reject ratio recorded.
- AquaGate controller closes the RO feed valve on a simulated leak.
- Recirculation loop maintains flow with the DI stage in service.
- Alarm and shutdown functions on each controller confirmed.

Water quality acceptance criteria within OQ would be set and tested by the Client's own licensed personnel, per Section 3 of the Quality Agreement.

## 9. Change control and deviations

- This document records existing conditions. It does not authorize any change to scope, materials, equipment, or procedures. Any change requires a written change order approved by both parties (Quality Agreement Section 6).
- If hidden plumbing, restricted access, or an unsafe condition is found during later work, ClearWave will pause that work, document the cause, and submit a written change order before continuing (Section 6).
- Any deviation identified during Services will be reported in writing to the Client's designated point of contact within two business days (Section 7).

## 10. Photo package index

All 38 photographs are retained by ClearWave under document CW-HFB-P1-2026-001 for a minimum of seven years (Section 5). The 9 annotated in this revision are listed with descriptions. The remaining 29 are listed by file number and will be annotated in Rev B.

| File | Subject | Rev A annotation |
|---|---|---|
| 1000034222 | RO skid front panel: flow meters, gauges, controller, prefilter housing | Yes |
| 1000034224 | Sch 80 PVC bypass manifold, `MAIN IN` / `MAIN OUT` | Yes |
| 1000034237 | Production area overhead: large service lines, `DI` line | Yes |
| 1000034238 | Overhead run: `DI`, `CITY OUT`, `Recir` | Yes |
| 1000034243 | `CITY` branch with ball valve, taped insulation | Yes |
| 1000034244 | `RO IN`, actuated valve, AquaGate controller | Yes |
| 1000034245 | `RO OUT`, push-fit elbow, brass valve with tube | Yes |
| 1000034246 | `DI` line, sweat coupling, solenoid valve below | Yes |
| 1000034253 | Carbon tank and head, `CARBON IN`, `MAIN IN` CPVC | Yes |
| 1000034223, 1000034225, 1000034226, 1000034228 through 1000034231, 1000034236, 1000034239 through 1000034242, 1000034247 through 1000034252, 1000034254 through 1000034261, 1000034263 | Received | Rev B |

## 11. Open items for Rev B

| # | Item | Owner |
|---|---|---|
| 1 | Annotate the remaining 29 photographs and update Sections 4 and 5 | ClearWave |
| 2 | Reconcile the 03_PLUMBING drawing set (22 sheets) against the field line map; issue a redline list | ClearWave |
| 3 | Review site walk video and add any lines or components not captured in photographs | ClearWave |
| 4 | Confirm make, model, serial, and size for C-2 and C-3; confirm function of C-6 and C-8 | ClearWave, on site |
| 5 | Confirm location and type of the DI stage (O-7) | ClearWave, on site |
| 6 | Measure and record pipe sizes for every line in Section 4 | ClearWave, on site |
| 7 | Confirm the identity of the two large overhead lines (C-11) from drawings | ClearWave |
| 8 | Confirm whether push-fit fittings are acceptable under the Client's quality system (O-4) | Client |
| 9 | Name the Client's designated point of contact for this project (Section 3) | Client |
| 10 | Decide whether Phase 2 includes formal labeling (Section 7) and IQ/OQ (Section 8) | Client |

## 12. Exclusions

- No water quality testing, sampling, or analysis (Quality Agreement Section 3).
- No engineering design, sizing, or specification of replacement equipment or piping.
- No assessment of the building's general plumbing, drainage, or the large overhead service lines (C-11) beyond identifying them.
- No verification of code compliance of existing work performed by others.
- No opinion on regulatory status of the facility.

---

**Sources**

1. ClearWave site walk photographs, files 1000034222 through 1000034263, taken at the HFB Labs facility. Nine reviewed for this revision.
2. Quality Agreement, ClearWave Water Solutions and Happy Farm Botanicals Inc., executed 2026. Sections 2, 3, 5, 6, 7 cited.
3. ASME A13.1, Scheme for the Identification of Piping Systems, current edition, for Section 7.
4. Facility drawing set "03_PLUMBING," 22 sheets, supplied by Client. Not yet reconciled.

ClearWave Water Solutions · support@clearwavewater.com · 757-828-8594 · clearwavewater.com
