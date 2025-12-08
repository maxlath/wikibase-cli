# Write operations

Those command modify Wikibase so you will need to first **setup credentials** to use them: you will get a prompt requesting those credentials when required, but if you want to setup those credentials ahead, you can run `wb config credentials https://www.wikidata.org test` (Replace `https://www.wikidata.org` by your Wikibase instance url if necessary). For more documentation on the different options to setup credentials, see [`wikibase-edit` single-user credentials setup](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#single-user-setup) (`wikibase-edit` is the lib on which wikibase-cli relies for all write operations).

Those credentials will be **saved in clear text** (Run `wb config path` to know where). This allows not having to re-enter credentials everytimes, but it can problematic on a non-personal computer: in such a case, make sure to run `wb config clear` once you're done.

The following documentation often assumes that the Wikibase instance we work with is Wikidata (using the `wd` command, which is just an alias of the `wb` command bound to Wikidata config), unless specified otherwise (using the `wb` command and custom instance host (`-i`) and SPARQL endpoint (`-e`).

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [labels](#labels)
  - [wb set-label](#wb-set-label)
  - [wb remove-label](#wb-remove-label)
- [descriptions](#descriptions)
  - [wb set-description](#wb-set-description)
  - [wb remove-description](#wb-remove-description)
- [aliases](#aliases)
  - [wb add-alias](#wb-add-alias)
  - [wb remove-alias](#wb-remove-alias)
  - [wb set-alias](#wb-set-alias)
- [claims](#claims)
  - [wb add-claim](#wb-add-claim)
    - [rich values](#rich-values)
      - [JSON format](#json-format)
      - [query string format](#query-string-format)
    - [with a reference](#with-a-reference)
    - [special claim snaktypes](#special-claim-snaktypes)
  - [wb update-claim](#wb-update-claim)
    - [update claim in batch mode](#update-claim-in-batch-mode)
  - [wb move-claim](#wb-move-claim)
    - [move claim in batch mode](#move-claim-in-batch-mode)
  - [wb remove-claim](#wb-remove-claim)
- [qualifiers](#qualifiers)
  - [wb add-qualifier](#wb-add-qualifier)
    - [special qualifier snaktypes](#special-qualifier-snaktypes)
  - [wb update-qualifier](#wb-update-qualifier)
  - [wb move-qualifier](#wb-move-qualifier)
  - [wb remove-qualifier](#wb-remove-qualifier)
- [references](#references)
  - [wb add-reference](#wb-add-reference)
    - [add a reference with a single snak](#add-a-reference-with-a-single-snak)
    - [add a reference with multiple snaks](#add-a-reference-with-multiple-snaks)
  - [wb remove-reference](#wb-remove-reference)
- [sitelinks](#sitelinks)
  - [wb set-sitelink](#wb-set-sitelink)
  - [wb remove-sitelink](#wb-remove-sitelink)
- [badges](#badges)
  - [wb add-badge](#wb-add-badge)
  - [wb remove-badge](#wb-remove-badge)
- [entity](#entity)
  - [wb create-entity](#wb-create-entity)
  - [wb edit-entity](#wb-edit-entity)
    - [Pass data as inline JSON](#pass-data-as-inline-json)
    - [Pass data as a JSON file](#pass-data-as-a-json-file)
    - [Pass data as a static JS object file](#pass-data-as-a-static-js-object-file)
    - [Generate an edit object from a JS template function](#generate-an-edit-object-from-a-js-template-function)
      - [transform input](#transform-input)
      - [fetch additional data](#fetch-additional-data)
      - [generate several edit objects](#generate-several-edit-objects)
      - [inspect generated edit object data](#inspect-generated-edit-object-data)
      - [template help menu](#template-help-menu)
  - [wb merge-entity](#wb-merge-entity)
  - [wb delete-entity](#wb-delete-entity)
- [edit summary](#edit-summary)
- [baserevid](#baserevid)
- [batch mode](#batch-mode)
  - [Request parameters in batch mode](#request-parameters-in-batch-mode)
  - [Batch process logs](#batch-process-logs)
  - [Handle batch errors](#handle-batch-errors)
- [Options](#options)
  - [maxlag](#maxlag)
- [Demos](#demos)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### labels
See [Wikidata:Glossary#Label](https://www.wikidata.org/wiki/Wikidata:Glossary#Label)
#### wb set-label

Set a label on an entity in a given language
```sh
wb set-label <entity> <language> <label>
# Alias:
wb sl <entity> <language> <label>
```
Example:
```sh
# Set the label 'lorem ipsum' to the item Q4115189 in French
wb set-label Q4115189 fr "lorem ipsum"
```

For more advanced use cases (such as setting multiple labels on a single entity at once) you should rather use [`edit-entity`](#wb-edit-entity).

#### wb remove-label
Remove a label on an entity in a given language
```sh
wb remove-label <entity> <language>
# Alias:
wb rl <entity> <language>
```

Example:
```sh
# Remove Q4115189 French label
wb remove-label Q4115189 fr
```

### descriptions
See [Wikidata:Glossary#Description](https://www.wikidata.org/wiki/Wikidata:Glossary#Description)

#### wb set-description

Set a description on an entity in a given language
```sh
wb set-description <entity> <language> <description>
# Alias:
wb sd <entity> <language> <description>
```
Examples:
```sh
# Set the description "lorem ipsum" to the item Q4115189 in French
wb set-description Q4115189 fr "lorem ipsum"
```

For more advanced use cases (such as setting multiple descriptions on a single entity at once) you should rather use [`edit-entity`](#wb-edit-entity).

#### wb remove-description
Remove a description on an entity in a given language
```sh
wb remove-description <entity> <language>
# Alias:
wb rd <entity> <language>
```

Example:
```sh
# Remove Q4115189 French description
wb remove-description Q4115189 fr
```

### aliases
See [Wikidata:Glossary#Alias](https://www.wikidata.org/wiki/Wikidata:Glossary#Alias)

#### wb add-alias
Add one or several aliases to the list of aliases of an entity in a given language
```sh
wb add-alias <entity> <language> <alias>
# Alias:
wb aa <entity> <language> <alias>
```

```sh
# Add an alias
wb add-alias Q4115189 fr foo
# Add several aliases separated by a pipe
wb add-alias Q4115189 fr "foo|bar"
```

For more advanced use cases, you should rather use [`edit-entity`](#wb-edit-entity).

#### wb remove-alias
Remove one or several aliases from the list of aliases of an entity in a given language
```sh
wb remove-alias <entity> <language> <alias>
# Alias:
wb ra <entity> <language> <alias>
```

```sh
# Remove an alias
wb remove-alias Q4115189 fr foo
# Remove several aliases separated by a pipe
wb remove-alias Q4115189 fr "foo|bar"
```

For more advanced use cases, you should rather use [`edit-entity`](#wb-edit-entity).

#### wb set-alias
Set the list of aliases of an entity in a given language
```sh
wb set-alias <entity> <language> <alias>
# Alias:
wb sa <entity> <language> <alias>
```
```sh
# Replace all Q4115189's French alias by 'foo'
wb set-alias Q4115189 fr foo
# Replace all Q4115189's French alias by 'foo' and 'bar'
wb set-alias Q4115189 fr "foo|bar"
```

For more advanced use cases, you should rather use [`edit-entity`](#wb-edit-entity).

### claims
See [Wikidata:Glossary#Claim](https://www.wikidata.org/wiki/Wikidata:Glossary#Claim)

#### wb add-claim

Add a claim to an entity.<br>
*Alternative*: [QuickStatements](https://tools.wmflabs.org/wikidata-todo/quick_statements.php)

```sh
wb add-claim <entity> <property> <value>
# Alias:
wb ac <entity> <property> <value>
```
Options:
* `--rank <preferred|deprecated>`: set the claim [rank](https://www.wikidata.org/wiki/Wikidata:Glossary/en#Rank)

Examples:
```sh
# Add the Twitter account (P2002) 'bulgroz' to the Sandbox (Q4115189) entity
wd add-claim Q4115189 P2002 bulgroz
# The same but using the command alias
wd ac Q4115189 P2002 bulgroz
# Add the statement that the Sandbox (Q4115189) has for part (P527) the sand (Q34679)
# with a preferred rank
wd ac Q4115189 P527 Q34679 --rank preferred
```

For more advanced use cases, such as adding a claim with qualifiers and references, you should rather use [`edit-entity`](#wb-edit-entity).

##### rich values
Some values like monolingual text, quatities with a unit, or time with a precision, require to pass more data than a simple primitive value. This can be done by passing an object, either in a JSON or a query string format:

###### JSON format
```sh
wd ac Q4115189 P1476 '{"text":"bac à sable","language":"fr"}'
wd ac Q4115189 P1106 '{"amount":123,"unit":"Q4916"}'
# On precision and calendar, see wikibase-edit documentation https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#time
wd ac Q4115189 P578 '{"time":"1800","precision":7,"calendar":"julian"}'
# Set a coordinate on another celestial body than Earth (here, Mars (Q111))
wd ac Q4115189 P626 '{ "latitude": 18.65, "longitude": 226.2, "precision": 0.01, "globe": "http://www.wikidata.org/entity/Q111" }'
```

###### query string format
```sh
wd ac Q4115189 P1476 'text=bac à sable&language=fr'
wd ac Q4115189 P1106 'amount=123&unit=Q4916'
wd ac Q4115189 P578 'time=1800&precision=7'
```

##### with a reference
Workflow example to add a claim with a reference, using [jq](https://stedolan.github.io/jq/). See [`wb add-reference`](#wb-add-reference) for more details.
``` sh
claim_guid=$(wd add-claim Q4115189 P369 Q34679 | jq -r .claim.id)
# Add the reference that this claim is imported from (P143) Wikipedia in Uyghur (Q60856)
wd add-reference $claim_guid P143 Q60856
```

##### special claim snaktypes
You can add [`novalue` and `somevalue`](https://www.wikidata.org/wiki/Help:Statements/en#Unknown_or_no_values) claims by passing the desired snaktype in a JSON object as values:
```sh
wd ac Q4115189 P1106 '{"snaktype":"novalue"}'
wd ac Q4115189 P1106 '{"snaktype":"somevalue"}'
```

##### add claim in batch mode

Arguments can either be passed in object mode
```sh
echo '
{ "id": "Q4115189", "property": "P370", "value": "foo" }
{ "id": "Q4115189", "property": "P370", "value": "bar", "rank": "preferred" }
{ "id": "Q4115189", "property": "P1450", "value": { "language": "fr", "text": "hello" } }
{ "id": "Q4115189", "property": "P578", "value": { "time": "2025-12-01", "precision": 10 } }
' | wb ac -b --summary 'add claim demo'
```
or as inline values, but then you can't set rich values (monolingual text, geo coordinates, etc), ranks, or reconciliation mode
```sh
echo '
Q4115189 P370 foo
Q4115189 P370 bar
Q4115189 P578 2025-12
' | wb ac -b --summary 'add claim demo'
```

*NB*: To add claims with qualifiers and references, rather use [`wb edit-entity`](#wb-edit-entity).

##### add claim unless already existing
A.k.a *reconciliation*, see [`wikibase-edit` docs for more details on reconciliation modes](https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation))

```sh
wb ac Q4115189 P370 bulgroz --reconciliation skip-on-any-value
wb ac Q4115189 P370 bulgroz --reconciliation skip-on-value-match
wb ac Q4115189 P370 bulgroz --reconciliation '{"mode":"merge","matchingQualifiers":["P580:any","P582:all"],"matchingReferences":["P854","P813"]}'
```

It is also possible to set a different strategy per claim:
```sh
echo '
{ "id": "Q4115189", "property": "P370", "value": "test" }
{ "id": "Q4115189", "property": "P370", "value": "test", "reconciliation": { "mode": "skip-on-any-value" } }
{ "id": "Q4115189", "property": "P370", "value": "test", "reconciliation": { "mode": "skip-on-value-match" } }
' | wb ac -b --summary 'add claim demo'
```

#### wb update-claim
Update a claim value while keeping its qualifiers and references
```sh
wb update-claim <entity-id> <property> <old-value> <new-value>
# OR
wb update-claim <guid> <new-value>
# Alias:
wb uc <entity-id> <property> <old-value> <new-value>
wb uc <guid>
```
Options:
* `--rank <normal|preferred|deprecated>`: set the claim [rank](https://www.wikidata.org/wiki/Wikidata:Glossary/en#Rank)

Examples:
```sh
# Change the the Sandbox (Q4115189) Twitter account (P2002) from 'Zorglub' to 'Bulgroz'
wd update-claim Q4115189 P2002 Zorglub Bulgroz
# or using the claim's guid
wd uc 'Q4115189$F00E22C2-AEF7-4145-A743-2AB6292ABFA3' Bulgroz
# Update both the claim rank and value
wd uc 'Q4115189$F00E22C2-AEF7-4145-A743-2AB6292ABFA3' Bulgroz --rank preferred
# Only update the rank
wd uc 'Q4115189$F00E22C2-AEF7-4145-A743-2AB6292ABFA3' --rank preferred
# This can also be written using the object interface
wb uc '{ "guid": "Q4115189$F00E22C2-AEF7-4145-A743-2AB6292ABFA3", "rank": "preferred" }'

# Change a coordinate from Mars (Q112) to Venus (Q313)
wd uc Q4115189 P626 '{ "latitude": 18.65, "longitude": 226.2, "precision": 0.01, "globe": "http://www.wikidata.org/entity/Q111" }' '{ "latitude": 18.65, "longitude": 226.2, "precision": 0.01, "globe": "http://www.wikidata.org/entity/Q313" }'
# or using the claim's guid: that's generally the preferred way to do it
wd uc 'Q4115189$F00E22C2-AEF7-4145-A743-2AB6292ABFA3' '{ "latitude": 18.65, "longitude": 226.2, "precision": 0.01, "globe": "http://www.wikidata.org/entity/Q313" }'
```

##### update claim in batch mode

Arguments can either be passed in object mode
```sh
echo '
{ "guid": "Q1$d941fe74-4a76-a143-6766-a24d2ef2ddad", "newValue": "foo", "rank": "preferred" }
{ "guid": "Q1$63ef3ef4-4499-110a-3f66-33b352b61520", "newValue": "bar" }
{ "guid": "Q1$aaa3162d-4faa-6761-a8e6-f5e6a639afd5", "rank": "deprecated" }
{ "guid": "Q1$b1a0d905-4f20-065d-4aa7-787ea29c5af1", "rank": "normal" }
' | wb uc -b --summary 'update claim demo'
```
or as inline values, but then you can't set rich values (monolingual text, geo coordinates, etc) or ranks
```sh
echo '
Q1$d941fe74-4a76-a143-6766-a24d2ef2ddad foo
Q1$63ef3ef4-4499-110a-3f66-33b352b61520 bar
' | wb uc -b --summary 'update claim demo'
```

#### wb move-claim
Move claims from an entity to another and/or from a property to another
```sh
wb move-claim <guid|property-claims-id> <target-entity-id> <target-property-id> [new-claim-value]
# Alias
wb mc <guid|property-claims-id> <target-entity-id> <target-property-id> [new-claim-value]
```

Examples:
```sh
Q4115189_P19_claim_guid='Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F'

# change the property of a claim (without changing entity)
wb mc $Q4115189_P19_claim_guid Q4115189 P20
# move the claim to another entity (without changing the property)
wb mc $Q4115189_P19_claim_guid Q13406268 P19
# move the claim to another entity and another property
wb mc $Q4115189_P19_claim_guid Q13406268 P20
# move the claim to another entity and another property, and change the value (while still preserving the other claim attributes: rank, qualifiers, references)
wb mc $Q4115189_P19_claim_guid Q13406268 P20 Q15397819

# move all Q4115189 P19 claims to P20 (without changing entity)'
wb mc Q4115189#P19 Q4115189 P20
# move all Q4115189 P19 claims to Q13406268 (without changing the property)'
wb mc Q4115189#P19 Q13406268 P19
# move all Q4115189 P19 claims to Q13406268 P20'
wb mc Q4115189#P19 Q13406268 P20
# move the claim to another entity and another property, and change the value (while still preserving the other claim attributes: rank, qualifiers, references)
wb mc Q4115189#P19 Q13406268 P20 Q15397819
```

Certain claims can be moved between properties of different datatypes, see [wikibase-edit documentation](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#move-claims-between-properties-of-different-datatypes)

##### move claim in batch mode
Arguments can either be passed in object mode
```sh
echo '
{ "guid": "Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F", "id": "Q4115189", "property": "P20" }
{ "guid": "Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F", "id": "Q13406268", "property": "P19" }
{ "guid": "Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F", "id": "Q13406268", "property": "P20" }
{ "guid": "Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F", "id": "Q13406268", "property": "P20", "newValue": "Q15397819" }
' | wb mc -b --summary 'move claim demo'
```
or as inline values, but then you can't set rich values (monolingual text, geo coordinates, etc) or ranks
```sh
echo '
Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F Q4115189 P20
Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F Q13406268 P19
Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F Q13406268 P20
Q4115189$13681798-47F7-4D51-B3B4-BA8C7E044E1F Q13406268 P20 Q15397819
' | wb mc -b --summary 'move claim demo'
```

#### wb remove-claim
Remove a claim
```sh
wb remove-claim <guid>
# Alias:
wb rc <guid>
```

Examples:
```sh
# /!\ beware of the '$' sign that might need escaping
wd remove-claim "Q71\$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7"
# or simply
wd remove-claim 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7'
# or several at a time (required to be claims on the same entity)
wd remove-claim 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7' 'Q71$B8EE0BCB-A0D9-4821-A8B4-FB9E9D2B1251' 'Q71$2FCCF7DD-32BD-496C-890D-FEAD8181EEED'
```

### qualifiers
See [Wikidata:Glossary#Qualifier](https://www.wikidata.org/wiki/Wikidata:Glossary#Qualifier)

#### wb add-qualifier

Add a qualifier to a claim

```sh
wb add-qualifier <claim-guid> <property> <value>
# Alias:
wb aq <claim-guid> <property> <value>
```

Examples:

```sh
claim_guid='Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F'
# entity qualifier
wd add-qualifier $claim_guid P155 'Q13406268'

# string qualifier
wd aq $claim_guid P1545 'A-123'

# time qualifier
wd aq $claim_guid P580 '1802-02-26'

# quantity qualifier
wd aq $claim_guid P2130 123

# quantity qualifier with a unit
wd aq $claim_guid P2130 '{"amount":123,"unit":"Q4916"}'

# monolingualtext qualifier
wd aq $claim_guid P3132 "text=les sanglots long des violons de l'automne&language=fr"
```

##### special qualifier snaktypes
You can add [`novalue` and `somevalue`](https://www.wikidata.org/wiki/Help:Statements/en#Unknown_or_no_values) qualifiers by passing the desired snaktype in a JSON object as values:
```sh
claim_guid='Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F'
wd aq $claim_guid P1106 '{"snaktype":"novalue"}'
wd aq $claim_guid P1106 '{"snaktype":"somevalue"}'
```

#### wb update-qualifier

Update a qualifier from an existing value to a new value

```sh
wb update-qualifier <claim-guid> <property> <old-value> <new-value>
# Alias:
wb uq <claim-guid> <property> <old-value> <new-value>
```

Examples:

```sh
claim_guid='Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F'
# entity qualifier
wd update-qualifier $claim_guid P155 'Q13406268' 'Q3576110'

# string qualifier
wd uq $claim_guid P1545 'A-123' 'B-123'

# time qualifier
wd uq $claim_guid P580 '1802-02-26' '1802-02-27'

# quantity qualifier
wd uq $claim_guid P2130 123 124

# quantity qualifier with a unit
wd uq $claim_guid P2130 'amount=123&unit=Q4916' 'amount=124&unit=Q4916'

# monolingualtext qualifier
wd uq $claim_guid P3132 'text=aaah&language=fr' 'text=ach sooo&language=de'
```

#### wb move-qualifier
Change which property a qualifier is using
```sh
wb move-qualifier <guid> [hash] <old-property-id> <new-property-id>
# Alias
wb mq <guid> [hash] <old-property-id> <new-property-id>
```

Examples:
```sh
claim_guid='Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Or, if you are working from the output of a SPARQL request
claim_guid='wds:Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Or actually any prefix
claim_guid='s:Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Or even no prefix at all, which can be convenient to not have to deal with escaping $
claim_guid='Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F'

# move all P2310 qualifiers of this claim to P2311
wb mq $claim_guid P2310 P2311

# move only the first P2310 qualifier to P2311
qualifier_hash=$(wb data 'Q549$3EDF7856-5BE5-445A-BC60-FB2CDDCDA44F' | jq -r '.qualifiers.P2310[0].hash')
wb mq $claim_guid $qualifier_hash P2310 P2311
```

Just like for `move-claim`, certain qualifiers can be moved between properties of different datatypes, see [wikibase-edit documentation](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#move-claims-between-properties-of-different-datatypes)

#### wb remove-qualifier

```sh
wb remove-qualifier <claim-guid> <qualifiers-hashes>
# Alias:
wb rq <claim-guid> <qualifiers-hashes>
```

Examples:
```sh
claim_guid='Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Or, if you are working from the output of a SPARQL request
claim_guid='wds:Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Or actually any prefix
claim_guid='s:Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Or even no prefix at all, which can be convenient to not have to deal with escaping $
claim_guid='Q4115189-E66DBC80-CCC1-4899-90D4-510C9922A04F'

# Remove a qualifier from this claim
wd rq $claim_guid '24aa18192de7051f81d88d1ab514826002d51c14'
# Remove several qualifiers from this claim by passing the qualifier hashes as one argument made of several pipe-separated hashes
wd rq $claim_guid '24aa18192de7051f81d88d1ab514826002d51c14|f6c14e4eebb3d4f7595f0952c1ece0a34d85368b'}
```

### references
See [Wikidata:Glossary#Reference](https://www.wikidata.org/wiki/Wikidata:Glossary#Reference)

#### wb add-reference
Add a reference to an claim

##### add a reference with a single snak
```sh
wb add-reference <claim-guid> <property> <value>
# Alias:
wb ar <claim-guid> <property> <value>
```

Examples:
```sh
# Add a reference URL (P854) to this claim
# /!\ beware of the '$' sign that might need escaping
wd add-reference "Q4115189\$E66DBC80-CCC1-4899-90D4-510C9922A04F" P854 'https://example.org/rise-and-box-of-the-holy-sand-box'
# or simply
wd add-reference 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P854 'https://example.org/rise-and-box-of-the-holy-sand-box'
# Reference the claim as imported from (P143) Wikipedia in Uyghur (Q60856)
wd add-reference 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P143 Q60856
# or simply
wd ar 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' P143 Q60856
```

See [*add claim with a reference*](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#with-a-reference) for a workflow example to easily get the claim `guid`

##### add a reference with multiple snaks
To create a single reference with multiple snaks we will need to use the object interface, passing the `guid` and `snaks` as a JSON object.
```sh
# That object can be passed as inline JSON
wb add-reference <JSON>
# or as a path to a JSON file
wb ar ./reference.json
# or as a path to JS file exporting an object, or exporting a JS function, which given some arguments would return an object (it can be an async function)
wb ar ./reference.js P248 P813
```

Example:
```js
// reference.js: a JS file exporting an object
module.exports = {
  guid: 'Q63313825$A42967A6-CA5B-41AD-9F1F-3DAEF10DDBB5',
  snaks: {
    P248: 'Q53556514',
    P5199: '000011361',
    P813: '2019-03-06'
  }
}
```
Could then be passed like this
```sh
wb ar ./reference.js
```

In case you need to add a similar kind of reference to several claims, you might want to use a JS function instead:
```js
// reference.js: a JS file exporting an object
module.exports = function (guid, statedIn, BLnumber) {
  const today = new Date().toISOString().split('T')[0]
  return {
    guid,
    snaks: {
      P248: statedIn,
      P5199: BLnumber,
      P813: today
    }
  }
}
```
Could then be passed like this
```sh
wb ar ./reference.js 'Q63313825$A42967A6-CA5B-41AD-9F1F-3DAEF10DDBB5' Q53556514 000011361
```

#### wb remove-reference

Remove a reference from a claim
```sh
wb remove-reference <claim-guid> <references-hashes>
# Alias:
wb rr <claim-guid> <references-hashes>
```

Examples:
```sh
# Remove a reference from this claim
wd remove-reference 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '72ea3cdd27062da9f0971c1feab6df32d729ecb3'
# Remove several references from this claim by passing the reference hashes as one argument made of several pipe-separated hashes
wd remove-reference 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '72ea3cdd27062da9f0971c1feab6df32d729ecb3|5e9840f6896948b13d6e9c6328169643229aa3db'}
```

### sitelinks
See [Wikidata:Glossary#Sitelink](https://www.wikidata.org/wiki/Wikidata:Glossary#Sitelink)

#### wb set-sitelink
Set a sitelink on an entity for a given site
```sh
wb set-sitelink <entity-id> <site> <title> [badges]
# Alias:
wb ss <entity-id> <site> <title> [badges]
```

Examples:
```sh
# Link Q4115189 to the article 'The Sandbox' on the English Wikiquote
wb set-sitelink Q4115189 enwikiquote "The Sandbox"
# Also set badges for that sitelink
wb set-sitelink Q4115189 enwikiquote "The Sandbox" Q17437796,Q17437798
# To remove badges, set the sitelink again without the undesired badges
wb set-sitelink Q4115189 enwikiquote "The Sandbox"
```

The list of badges used on Wikidata can be found at [Help:Badges](https://www.wikidata.org/wiki/Help:Badges/en#List_of_badges)

#### wb remove-sitelink

Remove a sitelink on an entity for a given site
```sh
wb remove-sitelink <entity-id> <site>
# Alias:
wb rs <entity-id> <site>
```

Example:
```sh
# Remove the link from Q4115189 to any article in the English Wikiquote
wb set-sitelink Q4115189 enwikiquote
```

### badges
#### wb add-badge
Add badges on an existing sitelink, without removing other badges that might already have been set
```sh
wb add-badge <entity-id> <site> <badges>
# Alias:
wb ab <entity-id> <site> <badges>
```

Example:
```sh
# Add Q17437796 and Q17437798 badges on Q4115189 enwikiquote sitelink
wb add-badge Q4115189 enwikiquote Q17437796,Q17437798
```
#### wb remove-badge
Remove badges on an existing sitelink
```sh
wb remove-badge <entity-id> <site> <badges>
# Alias:
wb rb <entity-id> <site> <badges>
```

Example:
```sh
# Remove Q17437796 and Q17437798 badges on Q4115189 enwikiquote sitelink
wb remove-badge Q4115189 enwikiquote Q17437796,Q17437798
```

### entity
See [Wikidata:Glossary#Entity](https://www.wikidata.org/wiki/Wikidata:Glossary#Entity)

#### wb create-entity

Create a new entity (currently supported types: item, property)

```sh
# Pass data as JSON
wd create-entity '{"labels":{"en":"a label","fr":"un label"},"descriptions":{"en":"some description","fr":"une description"},"claims":{"P1775":["Q3576110","Q12206942"],"P2002":"bulgroz"}}'

# Pass data as a JSON file
wb create-entity ./new_entity_data.json

# Alias:
wb ce <entity-data>
```

Assuming that you have the proper authorization, **creating a property** can be as simple as:
```sh
wb create-entity '{ "type": "property", "datatype": "string", "labels": { "en": "some new string property" } }'
```

Other that the `datatype` and the absence of `id`, the `create-entity` command is identical to the [`edit-entity` command](#wb-edit-entity).

See [`wikibase-edit` documentation on `entity.create`](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#create-entity) for details on the input format.

**Demos**:
* [Create a new person item](https://github.com/maxlath/wikibase-cli/blob/main/docs/examples/new_person.js)
* [Create a new property](https://github.com/maxlath/wikibase-cli/blob/main/docs/examples/new_property.js)
* [Create a new item with the same references being used multiple times](https://github.com/maxlath/wikibase-cli/blob/main/docs/examples/new_item_with_the_same_references_being_used_multiple_times.js)

See also [wikibase-cli create template collection](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/edit) for some examples.

#### wb edit-entity

Edit an existing item (currently supported types: item, property)

```sh
wb edit-entity <inline-entity-json|file-path>
# Alias:
wb ee <inline-entity-json|file-path>
```

See [`wikibase-edit` documentation on `entity.edit`](https://github.com/maxlath/wikibase-edit/blob/master/docs/how_to.md#edit-entity) for details on the expected input format, especially on how to set complex values, qualifiers and references, or remove existing data. See also the section on [claim reconciliation](https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation).

##### Pass data as inline JSON
Pass data as inline JSON.
```sh
wd edit-entity '{"id":"Q4115189", "labels":{"en":"a label","fr":"un label"},"descriptions":{"en":"some description","fr":"une description"},"claims":{"P1775":["Q3576110","Q12206942"],"P2002":"bulgroz"}, "sitelinks":{"eswiki": "Wikipedia:Wikidata/Zona de pruebas"}}'
```
It works, but writting JSON by hand isn't that fun, we can do better.

##### Pass data as a JSON file
Taking our JSON data from a file can be much more convenient than the inline option above, as it can be generated from other commands, or manually edited with the help of smart text editors that might help you with the syntax.

```sh
wb edit-entity ./existing_entity_data.json
```

This `./existing_entity_data.json` file could be generated in different ways, but the easiest is to use the [`generate-template` command](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-generate-template):
```sh
wd generate-template Q4115189 --format json > Q4115189.edit-template.json
# Do your modifications, and then
wb edit-entity ./Q4115189.edit-template.json
```

The JSON syntax remains heavy with all those `"` though, if you are not generating it somehow and simply writting your data file by hand, you might be better of going with a JS file (see below).

##### Pass data as a static JS object file
The JavaScript object notation is very similar to JSON (thus the name of the later), but much lighter, which is very convenient when editing data manually.

```sh
wb edit-entity ./existing_entity_data.js
```

This `./existing_entity_data.js` could be something like the following:
```js
module.exports = {
  id: 'Q4115189',
  labels: {
    // Add a label
    en: 'a label',
    // Remove a label
    fr: null,
  },
  descriptions: {
    // Add a description
    en: 'some description',
    // Remove a description
    fr: null,
  },
  aliases: {
    // Set aliases in a language (will override existing aliases)
    en: [ 'an alias', 'another alias' ],
    // Remove all aliases in a language
    fr: null,
  },
  claims: {
    P123: 'Q1799264',
    P369: [
      'Q13406268',
      {
        value: 'Q1992907',
        qualifiers: {
          P370: 'some qualifier value'
        },
        references: [
          { P370: 'some reference value', P813: '2022-10-28' },
          { P370: 'another reference value', P813: '2022-10-28' },
        ]
      },
    ],
    P1106: {
      value: 123,
      // Per-claim reconciliation strategy, see https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation
      reconciliation: { mode: 'skip-on-any-value' },
    }
  },
  // Global reconciliation strategy, see https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation
  reconciliation: { mode: 'merge' },
  sitelinks: {
    // Set a sitelink without badges
    eswiki: 'Wikipedia:Wikidata/Zona de pruebas',
    // Set a sitelink with badges
    zhwikisource: {
      title: 'Wikisource:维基数据/沙盒',
      badges: [ 'Q17437796', 'Q17437798' ],
    },
    // Delete the sitelink
    frwikiquote: null
  },
}
```

##### Generate an edit object from a JS template function
**This is the recommended way** as it gives you a crazy level of flexibility :D

It's basically the same as the above JS file approach, but instead of returning an object, the JS file exports a function. All additional command line arguments will be passed to that function.

For instance, to add different P1449 and P1106 values to different entities, you could write a JS file like this:
```js
// add_P1449_and_P1106.js
module.exports = function (id, someString, quantity) {
  return {
    id: id,
    claims: {
      P1449: someString,
      P1106: parseInt(quantity)
    }
  }
}
```
that can then be called as follow:
```sh
wb edit-entity ./add_P1449_and_P1106.js Q1 abc 123
wb edit-entity ./add_P1449_and_P1106.js Q2 def 456
wb edit-entity ./add_P1449_and_P1106.js Q3 ghi 789
```

This way, you can generate infinitely flexible templates. See [wikibase-cli edit template collection](https://github.com/maxlath/wikibase-cli-template-collection/tree/master/edit) for some examples.

A good way to start writting a template function starting from an existing entity is to use the [`generate-template` command](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wd-generate-template):
```sh
# When generating templates for only one entity, JS is the default format,
# and comes with helpful labels as comments, to make ids less obscure
wd generate-template Q4115189 > Q4115189.edit-template.js
# Do your modifications, and then
wd edit-entity ./Q4115189.edit-template.js

# Note that it can also be used to create entities
wd generate-template Q4115189 --create-mode > Q4115189.create-template.js
wd create-entity ./Q4115189.create-template.js
# Note that this id- and guid-less template can be turned back into an addition-only edit template
# by setting an `id` in the returned object
wd edit-entity ./Q4115189.create-template.js Q123
```

JS templates are very powerful, but can be hard to get started with when you are not very familiar with JS: [feel welcome to ask for help to get started!](https://github.com/maxlath/wikibase-cli/issues/new?template=help.md)

Some examples of how such a dynamic template can be useful:

###### transform input
```js
const doSomeComplexTransformation = function (quantity) {
  return parseInt(quantity) * 2
}

module.exports = function (id, quantity) {
  return {
    id: id,
    claims: {
      P1106: doSomeComplexTransformation(quantity)
    }
  }
}
```

**Demo**: See how this principle was applied to create many items from a single JS template file: [Create missing HTTP Status Codes items on Wikidata](https://github.com/maxlath/wikidata-scripting/tree/master/http_status_codes)

###### fetch additional data
The exported function can be an async function, so you could fetch data during the transformation process:
```js
const fetchSomeData = require('./fetch_some_data.js')
const doSomeComplexTransformation = async function (quantity) {
  return quantity * 2
}

module.exports = async function (id, someExternalId) {
  const initialQuantity = await fetchSomeData(someExternalId)
  const finalQuantity = await doSomeComplexTransformation(initialQuantity)
  return {
    id,
    claims: {
      P1106: finalQuantity
    }
  }
}
```

###### generate several edit objects
It can sometimes be convenient to be able to generate several edits from one template call. For that purpose, you can return an array of edit objects. Example hereafter to generate bidirectional relations:
```js
// Add statements that itemA and itemB are different from (P1889) one another
module.exports = function (itemA, itemB) {
  return [
    { id: itemA, claims: { P1889: itemB } },
    { id: itemB, claims: { P1889: itemA } },
  ]
}
```

###### inspect generated edit object data
To inspect the data generated dynamically, you can use the `--dry` option
```sh
wb ee ./template.js Q1 abc 123 --dry
```

###### template help menu
If you end up using a template often, it can be useful to be able to easily remember how to use it; this can be done by setting metadata in the template to allow the generation of a help menu: see [example](https://github.com/maxlath/wikibase-cli/blob/main/tests/assets/edit_data_function.js)
```sh
wd ee ./tests/assets/edit_data_function.js --help
```

#### wb merge-entity
Merge an entity into another (See [wd:Help:Merge](https://www.wikidata.org/wiki/Help:Merge))
```sh
# Merge an item (Q1) into another (Q2)
wb merge-entity Q1 Q2
# Alias:
wb me <from-id> <to-id>
```

Options:
* `--keep-oldest`: Merge the newest entity in the oldest one. By default, the arguments' order determines which entity is kept: the first entity is merged into the second entity.

#### wb delete-entity
Delete an entity (See [mw:Page deletion](https://www.mediawiki.org/wiki/Manual:Page_deletion))
```sh
# Delete an item
wb delete-entity Q1
# Delete a property
wb delete-entity P1
# Alias:
wb de <entity-id>
```

### edit summary
> It's good practice to fill in the Edit Summary field, as it helps everyone to understand what is changed, such as when perusing the history of the page.
[[source](https://meta.wikimedia.org/wiki/Help:Edit_summary)]

For any of the edit commands, you can add an edit summary with `-s, --summary`:
```
wb add-alias Q4115189 fr "lorem ipsum" --summary 'this HAD to be changed!'
```

The `summary` can also be set from an edit object:
```sh
wb create-entity '{"labels":{"la":"lorem ipsum"},"summary":"creating some fantastic item here"}'
```

### baserevid
> baserevid: An id for the last known revision that must be passed so that the server can detect edit collisions.
[[source](https://www.mediawiki.org/wiki/Wikibase/API#Request_Format)]

For any of the edit commands, you can pass a base revision id with `--baserevid`:
```sh
# This command will fail with a "cant-load-entity-content" error, as 1 isn't the current lastrevid
wb add-alias Q4115189 fr "lorem ipsum" --baserevid 1
```

Alternatively, the `baserevid` can be set within an edit object:
```sh
wb edit-entity '{"id":"Q4115189","labels":{"la":"lorem ipsum"},"baserevid":1234}'
```

There are 2 ways to get the current revision id:
* request it directly
```sh
baserevid=$(wb data Q4115189 --props info | jq '.lastrevid')
wb add-alias Q4115189 fr "ipsum lorem" --baserevid "$baserevid"
```
* get the id after an edit
```sh
baserevid=$(wb add-alias Q4115189 fr "lorem ipsum" | jq '.entity.lastrevid')
wb add-alias Q4115189 fr "ipsum lorem" --baserevid "$baserevid"
```

### batch mode
**All write operations commands accept a `-b, --batch` option**. In batch mode, arguments are provided on the command [standard input (`stdin`)](https://en.wikipedia.org/wiki/Standard_streams#Standard_input_(stdin)), with one operation per line. If the edited Wikibase instance is Wikidata, batch edits will automatically be grouped within an [Edit groups](https://www.wikidata.org/wiki/Wikidata:Edit_groups); you are thus encouraged to set a summary (with the [`-s, --summary` option](#edit-summary)) as it will be used as label for the edit group ([example](https://tools.wmflabs.org/editgroups/b/wikibase-cli/b941fa220ab7b/)).

So instead of:
```sh
wb add-claim Q1 P123 123
wb add-claim Q2 P124 'multiple words value'
wb add-claim Q3 P125 '{ "time": "1800", "precision": 7 }'

wb create-entity '{"labels":{"en":"foo"}}'
wb create-entity '{"labels":{"en":"bar"}}'
wb create-entity '{"labels":{"en":"buzz"}}'

wb edit-entity ./template.js Q1 abc 123
wb edit-entity ./template.js Q2 def 456
wb edit-entity ./template.js Q3 ghi 789
```
you can write:
```sh
# NB: simple arguments without spaces (such as in the 1st case hereafter)
# don't need to be wrapped in a JSON array, but it is required for arguments
# that would be harder/error-prone to parse otherwise (2nd and 3rd cases hereafter)
echo '
Q1 P123 123
[ "Q2", "P124", "multiple words value" ]
[ "Q3", "P125", { "time": "1800", "precision": 7 } ]
' | wb add-claim --batch

echo '
{"labels":{"en":"foo"}}
{"labels":{"en":"bar"}}
{"labels":{"en":"buzz"}}
' | wb create-entity --batch

echo '
./template.js Q1 abc 123
./template.js Q2 def 456
./template.js Q3 ghi 789
' | wb edit-entity --batch

# In that last case, the first argument being always the same,
# it could also be written like this:
echo '
Q1 abc 123
Q2 def 456
Q3 ghi 789
' | wb edit-entity ./template.js --batch
```

Or more probably passing those arguments from a file:
```sh
cat ./add_claim_newline_separated_command_args | wb add-claim --batch
cat ./create_entity_newline_separated_command_args | wb create-entity --batch
cat ./edit_entity_newline_separated_command_args | wb edit-entity --batch

# Which can also be written
wb add-claim --batch < ./add_claim_newline_separated_command_args
wb create-entity --batch < ./create_entity_newline_separated_command_args
wb edit-entity --batch < ./edit_entity_newline_separated_command_args

# Or using the short command and option names
wb ac -b < ./add_claim_newline_separated_command_args
wb ce -b < ./create_entity_newline_separated_command_args
wb ee -b < ./edit_entity_newline_separated_command_args
```

#### Request parameters in batch mode
To pass parameters such as [`summary`](#edit-summary) or [`baserevid`](#baserevid), the JSON syntax is the recommended syntax:

```sh
echo '
{ "id": "Q1", "labels": { "en": "foo" }, "summary": "lorem ipsum", "baserevid": 123 }
{ "id": "Q2", "labels": { "en": "bar" }, "summary": "lorem ipsum", "baserevid": 456 }
{ "id": "Q3", "labels": { "en": "buzz" }, "summary": "lorem ipsum", "baserevid": 789 }
' | wb edit-entity --batch
```

#### Batch process logs
The command output (`stdout`) will be made of one Wikibase API response per line, while `stderr` will be used for both progression logs and error messages. For long lists of commands, you could write those outputs to files to keep track of what was done, and, if need be, where the process exited if an error happened. This can be done this way:
```sh
# Redirect stdout and stderr to files
wb ac -b < ./args_list > ./args_list.log 2> ./args_list.err
# In another terminal, start a `tail` process at any time to see the progression. This process can be interrupted without stoppping the batch process
tail -f ./args_list.log ./args_list.err
```

#### Handle batch errors
If one of the batch operation encounters an error, the default behavior is to stop the batch there, the last line logged on `stdout` being the line that triggered the error, the error itself being logged on `stderr`.

In case you would prefer to continue to process the batch rather than exiting, you can set the `--no-exit-on-error` option:
```sh
wb add-claim --batch --no-exit-on-error < ./args_list > ./args_list.log 2> ./args_list.err
```
This can come handy for long batches, where you might encounter errors such as edit conflicts.

### Options
Options common to all edit operations

#### maxlag
Set the [`maxlag`](https://www.mediawiki.org/wiki/Manual:Maxlag_parameter) value (see also [config#maxlag](./config.md#maxlag))

The default value is `5`, meaning that you will tell the server that you accept to wait if the server has a lag of 5 seconds or more.

If you are not in a hurry, you can set an even nicer value, like `2`
```sh
wb add-claim Q4115189 P1106 123 --maxlag 2
```
If you want that command to be done already, you can go for a more aggressive value and be done with it
:warning: should be avoided when you have a long command queue, typically in --batch mode
```sh
wb add-claim Q4115189 P1106 123 --maxlag 100
```

### Demos
* [wikibase-cli-template-collection](https://github.com/maxlath/wikibase-cli-template-collection)
* [wikidata-scripting](https://github.com/maxlath/wikidata-scripting)
