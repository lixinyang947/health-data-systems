# Final Build and Validation Report

**Package:** `li-xinyang-interop-r4#0.1.0`  
**FHIR version:** R4 / 4.0.1  
**Build date:** 2026-07-21  
**Build command:** `npm ci && npm run build`

## Environment

- Node.js: `v22.16.0`
- npm: `10.9.2`
- Python: `Python 3.13.5`
- SUSHI: `3.20.0`
- Offline validator: `@records-fhir/validator 0.4.2`

## Final results

- SUSHI: **0 errors, 3 warnings**.
- SUSHI output: 35 profiles, 11 extensions, 9 logical models, 7 ValueSets, 7 CodeSystems, and 17 generated instances.
- Assembled FHIR JSON resources: **116**.
- StructureDefinitions with snapshots: **55 of 55**.
- Deterministic integrity checks: **0 errors, 0 warnings, 7 passed groups**.
- Offline non-StructureDefinition validation: **61 resources; 0 fatal, 0 error, 0 warning, 145 informational findings**.

## SUSHI warnings

The three warnings concern optional packages that SUSHI attempted to auto-load but could not retrieve in the build environment:

- `hl7.fhir.uv.tools.r4#latest`
- `hl7.terminology.r4#latest`
- `hl7.fhir.uv.extensions.r4#latest`

FHIR R4 core `hl7.fhir.r4.core#4.0.1` loaded successfully, and the build completed without errors.

## Generated distributions

- FHIR NPM package: `dist/li-xinyang-interop-r4-0.1.0.tgz`
- Package manifest: `dist/package-manifest.json`
- Full resource inventory: `ARTIFACT_INVENTORY.md` and `ARTIFACT_INVENTORY.csv`
- Methodology traceability: `TRACEABILITY_MATRIX.md` and `TRACEABILITY_MATRIX.csv`
- Detailed command output: `BUILD_LOG.txt`

## Validation boundary

This build verifies FSH compilation, snapshot generation, JSON assembly, package indexing, local canonical resolution, mapping-reference resolution, example consistency, and offline validation against R4/local profiles. It has not been run through the official HL7 Java validator. It also does not replace a live terminology-server pass, licensed terminology review, clinical-safety review, security testing, or institution-specific acceptance testing.
