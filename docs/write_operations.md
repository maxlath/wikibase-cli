# Write operations

Those command modify Wikidata so you will be asked your Wikidata **username** and **password** to use them. Those will be **persisted in clear text** in this module's folder: `./config.json`. Alternatively, in the case writing to this module's folder would require special rights, the config file with your crendentials can be found in your home folder: `~/.config/wikidata-cli/config.json`. This allows not having to re-enter crendentials everytimes, but it can problematic on a non-personal computer: in such a case, make sure to run `wd config clear` once you're done.

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [wd set-label](#wd-set-label)
- [wd set-description](#wd-set-description)
- [wd add-claim](#wd-add-claim)
  - [with a reference](#with-a-reference)
- [wd update-claim](#wd-update-claim)
- [wd remove-claim](#wd-remove-claim)
- [wd add-reference](#wd-add-reference)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

#### wd set-label

Set a label on an entity in a given language
```sh
wd set-label <entity> <language> <label>
# Alias:
wd sl <entity> <language> <label>
```
Example:
```sh
# Set the label 'Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French
wd set-label Q4115189 fr "Bac à sable bulgroz"
```

#### wd set-description

Set a description on an entity in a given language
```sh
wd set-description <entity> <language> <description>
# Alias:
wd sd <entity> <language> <description>
```
Example:
```sh
# Set the description 'description du Bac à sable bulgroz' to the Sandbox entity (Q4115189) in French
wd set-description Q4115189 fr "description du Bac à sable bulgroz"
```

#### wd add-claim

Add a claim to an entity.<br>

```sh
wd add-claim <entity> <property> <value>
# Alias:
wd ac <entity> <property> <value>
```

Example:
```sh
# Add the Twitter account (P2002) 'bulgroz' to the Sandbox (Q4115189) entity
wd add-claim Q4115189 P2002 bulgroz
# The same but using the command alias
wd ac Q4115189 P2002 bulgroz
# The same but passing a reference as 4th argument:
# Add the statement that the Sandbox (Q4115189) has for part (P527) the sand (Q34679)
wd ac Q4115189 P527 Q34679
```

Alternative: [QuickStatements](https://tools.wmflabs.org/wikidata-todo/quick_statements.php), especially fit for large batches

##### with a reference
Simply add a 4th argument, either a reference URL ([P854](https://www.wikidata.org/wiki/Property:P854)), or the id of the project it is imported from ([P143](https://www.wikidata.org/wiki/Property:P143))
``` sh
# this will be interpreted as being imported from Wikipedia in Uyghur (Q60856)
wd ac Q4115189 P527 Q34679 Q60856
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

Example:
```sh
# /!\ beware of the '$' sign that might need escaping
wd remove-claim "Q71\$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7"
# or simply
wd remove-claim 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7'
# or several at a time (required to be claims on the same entity)
wd remove-claim 'Q71$BD9A4A9F-E3F9-43D4-BFDB-484984A87FD7|Q71$B8EE0BCB-A0D9-4821-A8B4-FB9E9D2B1251|Q71$2FCCF7DD-32BD-496C-890D-FEAD8181EEED'
```

#### wd add-reference

Add a reference to an claim
```sh
wd add-reference <claim-guid> <URL or project entity id>
# Alias:
wd ar <claim-guid> <URL or project entity id>
```

Example:
```sh
# /!\ beware of the '$' sign that might need escaping
wd add-reference "Q4115189\$E66DBC80-CCC1-4899-90D4-510C9922A04F" 'https://example.org/rise-and-box-of-the-holy-sand-box'
# or simply
wd add-reference 'Q4115189$E66DBC80-CCC1-4899-90D4-510C9922A04F' 'https://example.org/rise-and-box-of-the-holy-sand-box'
```