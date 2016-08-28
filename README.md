# Wikidata-CLI
Command-line tools to make working with [wikidata](https://wikidata.org) zuper easy.<br>
For most, those tools are just [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk) functions wrapped for the command-line needs.

## Summary
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Commands](#commands)
  - [wd label](#wd-label)
  - [wd claims](#wd-claims)
  - [wd data](#wd-data)
  - [wd wikiqid](#wd-wikiqid)
  - [wd props](#wd-props)
  - [wd sparl](#wd-sparl)
  - [wd open](#wd-open)
- [Pre-2.0.0 API](#pre-200-api)
- [See Also](#see-also)
  - [wikidata-filter](#wikidata-filter)
  - [wikidata-agent](#wikidata-agent)
  - [wikidata-taxonomy](#wikidata-taxonomy)

-------------

## Dependencies
* [NodeJs](https://nodejs.org)
(recommended way to install it: use the awesome [NVM](https://github.com/creationix/nvm))

-------------

## Installation
```sh
npm install -g wikidata-cli
```
Installing globally allows to make the command `wd` accessible from your shell `$PATH`

-------------

## Commands

### wd label
Working with Wikidata, we often end up with obscure ids. We can always look-up those ids labels on the website but that means loading pages and pages, when a small API call and parsing could return just what we need: a label
```sh
wd label Q1103345
# => The Cluetrain Manifesto
```

**Options**

* `-l, --lang`: specify the label's language

By default, the result uses your environment local language (`process.env.LANG`), but you can pass a 2-letters language code as second argument
```sh
wd label Q1103345 -l de
# => Cluetrain-Manifest
wd label Q123 -l zh
# => 9月
```

### wd claims
A quick way to access the claims of an entity
```sh
# all Q2001's claims
wd claims Q2001
# or just his place of birth
wd claims Q2001 P19
# or by specifying another language than your local language
wd claims Q2001 fr
wd claims Q2001 P19 fr
```

### wd data
A quick way to access an entities data
```sh
wd data Q1496
```
This simply outputs the result of `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=Q1496`, parsed to keep only what is relevant to the requested entity (here Q1496).
The output is valid json, so it lets you the possibility to pipe it to a JSON parser such as [jsondepth](https://www.npmjs.com/package/jsondepth):
```sh
wd data Q1496 | jd labels.pt
# => { language: 'pt', value: 'Fernão de Magalhães' }
```

### wd wikiqid
This one is kind of the inverse of qlabel: pass it the title of a Wikipedia article and it will return the corresponding Wikidata id
```sh
wd wikiqid Cantabria
# => Q3946
wd wikiqid New Delhi
# => Q987
```

**Options**

* `-l, --lang`: specify from which language the title comes
By default, it will look at the Wikipedia corresponding to your environment local language (`process.env.LANG`), but you can specify another language by passing a 2-letters language code
```sh
wd wikiqid -l fr science politique
# => Q36442
```

You can also pass it full Wikipedia urls and let it find the language from there
```sh
wd wikiqid https://en.wikipedia.org/wiki/Friedrich_Nietzsche
# => Q9358
```

### wd props
A command to access the list of all Wikidata properties in a given language (by default the environment local language)

* Get the list of all Wikidata properties in your environment local language:
```sh
wd props
```
Output a JSON object of the kind:
```
[...]
  "P2897": "identifiant Eldoblaje Movie",
  "P2898": null,
  "P2899": "âge minimal",
[...]
```
NB: properties without a label in the requested language are set to `null`, as you can see above for P2898 in French

* Get the list of all Wikidata properties in another language
**Options**
* `-l, --lang`: specify the properties labels language
```sh
wd props -l sv
# outputs the properties in Swedish
```

This command first tries to find the list in the `props` folder (created at wikidata-cli root), and request them to query.wikidata.org if missing.

This means that after a while, your local version will miss new and updated properties: this can be solved by using the `--reset` options

**Options**
* `-r, --reset`: clear properties cache

### wd sparl
A command to run a SPARQL query and get its JSON output

From this SPARQL query file: `./path/to/query.rq`
```sparql
SELECT ?work WHERE {
  ?work wdt:P50 wd:Q42 .
}
```
get its output from your terminal like so:

```sh
wd sparql ./path/to/query.rq > ./results.json
```

**Options**
* `-s, --simplify`: output the results simplifed by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk#simplify-sparql-results) function

```sh
wd sparql -s ./path/to/query.rq > ./simplified_results.json
```

### wd open
A command to open an entity's or property's page on Wikidata in a browser (yep, you can be that lazy)

```sh
wd open Q123
# opens https://wikidata.org/wiki/Q123 in your default browser

wd open P659
# opens https://www.wikidata.org/wiki/Property:P659

# also working with any string that matches /(Q|P)\d+/
wd open https://inventaire.io/entity/wd:Q33977
# opens https://wikidata.org/wiki/Q33977
```

**Options**
* `-p, --wikipedia`: open the Wiki**p**edia article instead
```sh
wd open -p Q123
# opens https://fr.wikipedia.org/wiki/Septembre because my system language is French
```
* `-l, --lang`: specify which Wikipedia edition should be targeted
```sh
wd open -p -l sv Q123
# opens https://sv.wikipedia.org/wiki/September instead
```

-------------

## Pre-2.0.0 API

###qlabel
Renamed [wd label](#wd-label)
###qclaims
Renamed [wd claims](#wd-claims)
###qdata
Renamed [wd data](#wd-data)
###wdprops
Renamed [wd props](#wd-props)
###wikiqid
Renamed [wd wikiqid](#wd-wikiqid)
###wdsparql
Renamed [wd sparql](#wd-sparql)
###wdsparqlsimplify
Removed: use [wd sparql](#wd-sparql) --simplify

-------------

## See Also
Commands that got their own modules:
### [wikidata-filter](https://npmjs.com/package/wikidata-filter)
a command-line tool to filter a Wikidata dump by claim

### [wikidata-agent](https://github.com/maxlath/wikidata-agent)
a small server to edit Wikidata from the terminal:
`curl -X POST http://localhost:4115/claim -d 'entity=Q4115189&property=P2002&value=Zorg'`

### [wikidata-taxonomy](https://github.com/nichtich/wikidata-taxonomy)
command-line tool to extract taxonomies from Wikidata

-------------

## License
[MIT](LICENSE.md)
