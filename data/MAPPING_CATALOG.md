# Mapping Artifact Catalog

## ConceptMaps

| ID | Title | Bundled mappings | Canonical |
|---|---|:---:|---|
| `v2-administrative-gender-to-fhir` | HL7 v2 Administrative Sex to FHIR Administrative Gender | Yes | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/v2-administrative-gender-to-fhir` |
| `v2-abnormal-flag-to-observation-interpretation` | HL7 v2 Abnormal Flags to FHIR Observation Interpretation | Yes | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/v2-abnormal-flag-to-observation-interpretation` |
| `v2-patient-class-to-encounter-class` | HL7 v2 Patient Class to FHIR Encounter Class | Yes | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/v2-patient-class-to-encounter-class` |
| `v2-order-control-to-request-status` | HL7 v2 Order Control to FHIR Request Status | Yes | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/v2-order-control-to-request-status` |
| `v2-result-status-to-observation-status` | HL7 v2 Result Status to FHIR Observation Status | Yes | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/v2-result-status-to-observation-status` |
| `v2-result-status-to-diagnostic-report-status` | HL7 v2 Result Status to FHIR DiagnosticReport Status | Yes | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/v2-result-status-to-diagnostic-report-status` |
| `ndc-to-rxnorm-template` | NDC to RxNorm Crosswalk Template | No — governed template | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/ndc-to-rxnorm-template` |
| `icd9cm-to-icd10cm-template` | ICD-9-CM to ICD-10-CM Crosswalk Template | No — governed template | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/icd9cm-to-icd10cm-template` |
| `local-lab-to-loinc-template` | Local Laboratory Code to LOINC Template | No — governed template | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/local-lab-to-loinc-template` |
| `local-clinical-to-snomed-template` | Local Clinical Code to SNOMED CT Template | No — governed template | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/local-clinical-to-snomed-template` |
| `local-medication-to-rxnorm-template` | Local Medication Code to RxNorm Template | No — governed template | `https://example.org/fhir/li-xinyang-interop-r4/ConceptMap/local-medication-to-rxnorm-template` |

## StructureMaps

| ID | Title | Source | Target |
|---|---|---|---|
| `v2-pid-to-patient` | HL7 v2 PID to HITC Canonical Patient | `HITCV2PID` | `hitc-canonical-patient` |
| `v2-pv1-to-encounter` | HL7 v2 PV1 to HITC Canonical Encounter | `HITCV2PV1` | `hitc-canonical-encounter` |
| `v2-obx-to-observation` | HL7 v2 OBX to HITC Canonical Observation | `HITCV2OBX` | `hitc-canonical-observation` |
| `v2-obr-to-diagnosticreport` | HL7 v2 OBR to HITC Canonical DiagnosticReport | `HITCV2OBR` | `hitc-canonical-diagnostic-report` |
| `v2-orc-to-servicerequest` | HL7 v2 ORC to HITC Canonical ServiceRequest | `HITCV2ORC` | `hitc-canonical-service-request` |
| `v2-sch-to-encounter` | HL7 v2 SCH to Planned Encounter | `HITCV2SCH` | `hitc-canonical-encounter` |
| `v2-txa-to-documentreference` | HL7 v2 TXA to HITC Canonical DocumentReference | `HITCV2TXA` | `hitc-canonical-document-reference` |
| `ccda-problem-to-condition` | C-CDA Problem Entry to HITC Canonical Condition | `HITCCCDAEntry` | `hitc-canonical-condition` |
| `ccda-allergy-to-allergyintolerance` | C-CDA Allergy Entry to HITC Canonical AllergyIntolerance | `HITCCCDAEntry` | `hitc-canonical-allergy-intolerance` |
| `ccda-procedure-to-procedure` | C-CDA Procedure Entry to HITC Canonical Procedure | `HITCCCDAEntry` | `hitc-canonical-procedure` |
| `ccda-medication-to-medicationstatement` | C-CDA Medication Entry to HITC Canonical MedicationStatement | `HITCCCDAEntry` | `hitc-canonical-medication-statement` |
| `ccda-discharge-medication-to-medicationrequest` | C-CDA Discharge Medication Entry to HITC Canonical MedicationRequest | `HITCCCDAEntry` | `hitc-canonical-medication-request` |
