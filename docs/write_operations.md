# Write operations

Those command modify Wikidata so you will be asked your Wikidata **username** and **password** to use them. Those will be **persisted in clear text** in this module's folder: `./config.json`. Alternatively, in the case writing to this module's folder would require special rights, the config file with your crendentials can be found in your home folder: `~/.config/wikidata-cli/config.json`. This allows not having to re-enter crendentials everytimes, but it can problematic on a non-personal computer: in such a case, make sure to run `wd config clear` once you're done.

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [labels](#labels)
  - [wd set-label](#wd-set-label)
- [descriptions](#descriptions)
  - [wd set-description](#wd-set-description)
- [aliases](#aliases)
  - [wd add-alias](#wd-add-alias)
  - [wd remove-alias](#wd-remove-alias)
  - [wd set-alias](#wd-set-alias)
- [claims](#claims)
  - [wd add-claim](#wd-add-claim)
    - [rich values](#rich-values)
    - [with a reference](#with-a-reference)
  - [wd update-claim](#wd-update-claim)
  - [wd remove-claim](#wd-remove-claim)
- [qualifiers](#qualifiers)
  - [wd add-qualifier](#wd-add-qualifier)
  - [wd update-qualifier](#wd-update-qualifier)
  - [wd remove-qualifier](#wd-remove-qualifier)
- [references](#references)
  - [wd add-reference](#wd-add-reference)
  - [wd remove-reference](#wd-remove-reference)
- [item](#item)
  - [wd create-item](#wd-create-item)
  - [wd edit-item](#wd-edit-item)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

### labels
See [Wikidata:Glossary#Label](https://www.wikidata.org/wiki/Wikidata:Glossary#Label)
#### wd set-label

Set a label on an entity in a given language
```sh
wd set-label <entity> <language> <label>
# Alias:
wd sl <entity> <language> <label>
```
Examples:
```sh
# Set the label 'Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French
wd set-label Q4115189 fr "Bac à sable bulgroz"
```

### descriptions
See [Wikidata:Glossary#Description](https://www.wikidata.org/wiki/Wikidata:Glossary#Description)

#### wd set-description

Set a description on an entity in a given language
```sh
wd set-description <entity> <language> <description>
# Alias:
wd sd <entity> <language> <description>
```
Examples:
```sh
# Set the description 'description du Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French
wd set-description Q4115189 fr "description du Bac à sable bulgroz"
```

### aliases
See [Wikidata:Glossary#Alias](https://www.wikidata.org/wiki/Wikidata:Glossary#Alias)

#### wd add-alias
Add one or several aliases to the list of aliases of an entity in a given language
```sh
# Add an alias
wd add-alias Q4115189 fr foo
# Add several aliases separated by a pipe
wd add-alias Q4115189 fr "foo|bar"
```

#### wd remove-alias
Remove one or several aliases from the list of aliases of an entity in a given language
```sh
# Remove an alias
wd remove-alias Q4115189 fr foo
# Remove several aliases separated by a pipe
wd remove-alias Q4115189 fr "foo|bar"
```

#### wd set-alias
Set the list of aliases of an entity in a given language
```sh
# Replace all Q4115189's French alias by 'foo'
wd set-alias Q4115189 fr foo
# Replace all Q4115189's French alias by 'foo' and 'bar'
wd set-alias Q4115189 fr "foo|bar"
```

### claims
See [Wikidata:Glossary#Claim](https://www.wikidata.org/wiki/Wikidata:Glossary#Claim)

#### wd add-claim

Add a claim to an entity.<br>
*Alternative*: [QuickStatements](https://tools.wmflabs.org/wikidata-todo/quick_statements.php)

```sh
wd add-claim <entity> <property> <value>
# Alias:
wd ac <entity> <property> <value>
```

Examples:
```sh
# Add the Twitter account (P2002) 'bulgroz' to the Sandbox (Q4115189) entity
wd add-claim Q4115189 P2002 bulgroz
# The same but using the command alias
wd ac Q4115189 P2002 bulgroz
# Add the statement that the Sandbox (Q4115189) has for part (P527) the sand (Q34679)
wd ac Q4115189 P527 Q34679
```

##### rich values
Some values like monolingual text or quatities with a unit require to pass more data than a simple primitive value. This can be done by passing an object, either in a JSON or a query string format:
```sh
# Add the statement that the Sandbox (Q4115189) has for title (P1476) "bac à sable" in French
# JSON format
wd ac Q4115189 P1476 '{"text":"bac à sable", "language":"fr"}'
# query string format
wd ac Q4115189 P1476 'text=bac à sable&language=fr'
```

##### with a reference
Workflow example to add a claim with a reference, relying on the [jsondepth](https://github.com/maxlath/jsondepth) parser (hereafter referenced as `jd`). See [`wd add-reference`](#wd-add-reference) for more details.
``` sh
claim_guid=$(wd add-claim Q4115189 P369 Q34679 | jd claim.id)
# Add the reference that this claim is imported from (P143) Wikipedia in Uyghur (Q60856)
wd add-reference $claim_guid P143 Q60856
```

#### wd update-claim
```sh
# change the the Sandbox (Q4115189) Twitter account (P2002) from 'Zorglub' to 'Bulgroz'
wd update-claim Q4115189 P2002 Zorglub Bulgroz
```

#### wd remove-claim
Remove a claim
```sh
wd remove-claim <guid>
# Alias:
wd rc <guid>
```

Examples:
```sh
# /!\ beware of the '$' sign that might need escaping
wd remove-claim "Q71\$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7"
# or simply
wd remove-claim 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7'
# or several at a time (required to be claims on the same entity)
wd remove-claim 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7|Q71$B8EE0BCB-A0D9-4821-A8B4-FB9E9D2B1251|Q71$2FCCF7DD-32BD-496C-890D-FEAD8181EEED'
```

### qualifiers
See [Wikidata:Glossary#Qualifier](https://www.wikidata.org/wiki/Wikidata:Glossary#Qualifier)

#### wd add-qualifier

Add a qualifier to a claim

```sh
wd add-qualifier <claim-guid> <property> <value>
# Alias:
wd aq <claim-guid> <property> <value>
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

#### wd update-qualifier

Update a qualifier from an existing value to a new value

```sh
wd update-qualifier <claim-guid> <property> <old-value> <new-value>
# Alias:
wd uq <claim-guid> <property> <old-value> <new-value>
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

#### wd remove-qualifier

```sh
wd remove-qualifier <claim-guid> <qualifiers-hashes>
# Alias:
wd rq <claim-guid> <qualifiers-hashes>
```

Examples:
```sh
claim_guid='Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F'
# Remove a qualifier from this claim
wd rq $claim_guid '24aa18192de7051f81d88d1ab514826002d51c14'
# Remove several qualifiers from this claim by passing the qualifier hashes as one argument made of several pipe-separated hashes
wd rq $claim_guid '24aa18192de7051f81d88d1ab514826002d51c14|f6c14e4eebb3d4f7595f0952c1ece0a34d85368b'}
```

### references
See [Wikidata:Glossary#Reference](https://www.wikidata.org/wiki/Wikidata:Glossary#Reference)

#### wd add-reference

Add a reference to an claim
```sh
wd add-reference <claim-guid> <property> <value>
# Alias:
wd ar <claim-guid> <property> <value>
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

See [*add claim with a reference*](https://github.com/maxlath/wikidata-cli/blob/master/docs/write_operations.md#with-a-reference) for a workflow example to easily get the claim `guid`

#### wd remove-reference

Remove a reference from a claim
```sh
wd remove-reference <claim-guid> <references-hashes>
# Alias:
wd rr <claim-guid> <references-hashes>
```

Examples:
```sh
# Remove a reference from this claim
wd remove-reference 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '72ea3cdd27062da9f0971c1feab6df32d729ecb3'
# Remove several references from this claim by passing the reference hashes as one argument made of several pipe-separated hashes
wd remove-reference 'Q4115189$E51978A1-D13A-4916-800E-74ACD2466970' '72ea3cdd27062da9f0971c1feab6df32d729ecb3|5e9840f6896948b13d6e9c6328169643229aa3db'}
```

### item
See [Wikidata:Glossary#Item](https://www.wikidata.org/wiki/Wikidata:Glossary#Item)

#### wd create-item

Create a new item

```sh
# pass data as JSON
# /!\ Do not run this example command as it would create a junk item
wd create-item '{"labels":{"en":"a label","fr":"un label"},"descriptions":{"en":"some description","fr":"une description"},"claims":{"P1775":["Q3576110","Q12206942"],"P2002":"bulgroz"}}'

# pass data as a JSON file path
wd create-item ./new_item_data.json

# Alias:
wd ci <entity-data>
```

See [`wikidata-edit` documentation on `entity.create`](https://github.com/maxlath/wikidata-edit/blob/master/docs/how_to.md#create-entity) for details on the JSON format, especially on how to pass qualifiers and references.

#### wd edit-item

Edit an existing item

```sh
# pass data as JSON
wd edit-item '{"id":"Q4115189", "labels":{"en":"a label","fr":"un label"},"descriptions":{"en":"some description","fr":"une description"},"claims":{"P1775":["Q3576110","Q12206942"],"P2002":"bulgroz"}}'

# pass data as a JSON file path
wd edit-item ./existing_item_data.json

# Alias:
wd ei <entity-data>
```

See [`wikidata-edit` documentation on `entity.edit`](https://github.com/maxlath/wikidata-edit/blob/master/docs/how_to.md#edit-entity) for details on the JSON format, especially on how to pass qualifiers and references.
