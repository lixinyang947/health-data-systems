# Offline FHIR R4 JSON Validation Report

**Package:** `li-xinyang-interop-r4#0.1.0`  
**FHIR version:** R4 / 4.0.1  
**Validator:** `@records-fhir/validator` 0.4.2 with bundled R4 core profiles and local generated snapshots  
**Non-StructureDefinition resources checked:** 61

## Summary

- Fatal: **0**
- Error: **0**
- Warning: **0**
- Informational: **145**
- Total issues: **145**

## Error and warning detail

- No fatal, error, or warning findings.
## Scope and limitations

This offline pass validates non-StructureDefinition JSON resources against R4 base definitions or declared local profiles, including JSON structure, FHIRPath invariants, local terminology, and selected reference behavior. The 55 StructureDefinitions are compiled separately by SUSHI with generated snapshots and deterministic snapshot checks. Neither pass replaces the official HL7 Java validator, a live terminology server, licensed crosswalk validation, clinical-safety review, or institution-specific acceptance testing. Informational findings—such as recommendations for narrative text or version metadata—are retained in the JSON report.
