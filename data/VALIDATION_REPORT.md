# Validation and Integrity Report

**Package:** li-xinyang-interop-r4  
**Version:** 0.1.0  
**FHIR:** R4 / 4.0.1  
**Date:** 2026-07-21

## Build status

- SUSHI 3.20.0 build with snapshot generation: **0 errors** and **3 dependency-fetch warnings** for optional auto-provided packages unavailable in the offline build environment.
- Deterministic package checks: **0 errors**, **0 warnings**, **7 passed check groups**.
- JSON resources assembled: **116**.

## Resource counts

| Resource type | Count |
|---|---:|
| Bundle | 1 |
| CapabilityStatement | 1 |
| CodeSystem | 7 |
| ConceptMap | 11 |
| Condition | 1 |
| Device | 1 |
| DocumentReference | 1 |
| Encounter | 1 |
| ImplementationGuide | 1 |
| Location | 1 |
| Observation | 7 |
| OperationDefinition | 2 |
| Organization | 1 |
| Patient | 1 |
| Practitioner | 1 |
| Provenance | 1 |
| SearchParameter | 2 |
| Specimen | 1 |
| StructureDefinition | 55 |
| StructureMap | 12 |
| ValueSet | 7 |

## Passed checks

- All 55 StructureDefinitions include generated snapshots.
- Local conformance-resource canonical URLs use the package canonical base.
- ImplementationGuide indexes all 115 non-IG resources exactly once.
- All StructureMap source/target structures and local ConceptMap references resolve.
- Crosswalk templates do not fabricate licensed or institution-specific mappings.
- Canonical exchange Bundle contains Patient, Provenance, all six quality metrics, and resolved local references.
- All 18 synthetic examples declare resolvable local profiles.

## Warnings

- None

## Errors

- None

## Scope note

This report establishes build integrity, resource indexing, snapshot presence, local canonical resolution, mapping-reference resolution, example-bundle consistency, and terminology-template boundaries. It is not a substitute for institution-specific conformance testing, licensed terminology validation, security testing, clinical safety review, or production acceptance testing.
