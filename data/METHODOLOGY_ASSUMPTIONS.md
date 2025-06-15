# Methodology-to-Artifact Assumptions and Boundaries

## Formalization choices

The source narratives specify an approximately 35-resource canonical FHIR R4 subset. This package makes that scope concrete as exactly 35 resource profiles, supplemented by 11 extensions and 9 normalized source logical models.

“Strict at the core, flexible at the edges” is implemented by mandatory `meta.profile`, a mandatory source-system extension, selected required identifiers/status/subject/code elements, closed or required bindings where justified, and a registered extension catalog. It does not prohibit all additional standard FHIR elements or external extensions.

The two-phase pipeline is represented as:

- Phase 1: StructureMap resources over normalized HL7 v2 segment and C-CDA entry logical models.
- Phase 2: ConceptMap resources, mapping-strategy codes, UCUM constraints, terminology bindings, mapping-confidence/reviewer extensions, and Provenance examples.

## What is deliberately not fabricated

- No institution-specific identifier namespace, EHR field dictionary, endpoint, client secret, patient-matching coefficient, or cache topology is asserted.
- No licensed or version-sensitive NDC/RxNorm, ICD-9-CM/ICD-10-CM, SNOMED CT, LOINC, or local-code crosswalk is populated without an authoritative source and governance decision.
- No production throughput, latency, mapping accuracy, field-fill rate, or clinical outcome is asserted by the example data.
- No signed deployment agreement, live external adoption, or completed HITC implementation is implied.

## Execution boundary

The FHIR artifacts are machine-consumable specifications. A production implementation would still require:

1. Source parsers for HL7 v2 ER7 and C-CDA XML, including local Z-segments and template variants.
2. A terminology service and licensed terminology content.
3. Runtime StructureMap/FML execution and error handling.
4. Referential transaction management and durable Provenance/Merkle storage.
5. SMART-on-FHIR/OAuth configuration, consent enforcement, audit retention, threat modeling, and privacy review.
6. Clinical-safety validation, human-factors review, performance testing, and site acceptance testing.

## Evidentiary use

The package can support a claim that the methodology has been expressed as a detailed, standards-based technical specification. It should not be characterized as proof of completed production deployment or external adoption unless separate contemporaneous evidence establishes those facts.
