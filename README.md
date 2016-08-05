# Wikidata-CLI
Command-line tools to make working with [wikidata](https://wikidata.org) zuper easy.<br>
For most, those tools are just [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk) functions wrapped for the command-line needs.

## Summary
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Commands](#commands)
  - [qlabel](#qlabel)
  - [qclaims](#qclaims)
  - [qdata](#qdata)
  - [wikiqid](#wikiqid)
  - [wdcoord](#wdcoord)
  - [wdprops](#wdprops)
    - [wdprops reset](#wdprops-reset)
  - [wdsparl](#wdsparl)
  - [wdsparqlsimplify](#wdsparqlsimplify)
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
Installing globally allows to make those commands accessible from your shell `$PATH`

-------------

## Commands

### qlabel
Working with Wikidata, we often end up with obscure ids. We can always look-up those ids labels on the website but that means loading pages and pages, when a small API call and parsing could return just what we need: a label
```sh
qlabel Q1103345
# => The Cluetrain Manifesto
```
By default, the result uses your environment local language (`process.env.LANG`), but we can pass a 2-letters language code as second argument
```sh
qlabel Q1103345 de
# => Cluetrain-Manifest
```

### qclaims
A quick way to access the claims of an entity
```sh
# all Q2001's claims
qclaims Q2001
# or just his place of birth
qclaims Q2001 P19
# or by specifying another language than your local language
qclaims Q2001 fr
qclaims Q2001 P19 fr
```

### qdata
A quick way to access an entities data
```sh
qdata Q1496
```
This simply outputs the result of `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=Q1496`, parsed to keep only what is relevant to the requested entity (here Q1496).
The output is valid json, so it lets you the possibility to pipe it to a JSON parser such as [jsondepth](https://www.npmjs.com/package/jsondepth):
```sh
qdata Q1496 | jd labels.pt
# => { language: 'pt', value: 'Fernão de Magalhães' }
```

### wikiqid
This one is kind of the inverse of qlabel: pass it the title of a Wikipedia article and it will return the corresponding Wikidata id
```sh
wikiqid Cantabria
# => Q3946
wikiqid New Delhi
# => Q987
```
By default, it will look at the Wikipedia corresponding to your environment local language (`process.env.LANG`), but you can specify another language by passing a 2-letters language code as last argument
```sh
wikiqid science politique fr
# => Q36442
```

You can also pass it full Wikipedia urls
```sh
wikiqid https://en.wikipedia.org/wiki/Friedrich_Nietzsche
# => Q9358
```

### wdcoord
A command to the the geographic coordinates (latitude and longitude) of a Wikidata item.

```sh
wdcoord Q2112
# => 52.016666666667 8.5166666666667
```

### wdprops
A command to access the list of all Wikidata properties in a given language (by default the environment local language)

* Get the list of all Wikidata properties in your environment local language:
```sh
wdprops
```
Output an JSON object of the kind:
```
[...]
  "P2897": "identifiant Eldoblaje Movie",
  "P2898": null,
  "P2899": "âge minimal",
[...]
```
NB: properties without a label in the requested language are set to `null`, as you can see above for P2898 in French

* Get the list of all Wikidata properties in another language
```sh
# here swedish
wdprops sv
```

This command first tries to find the list in the `props` folder (created at wikidata-cli root), and request them to query.wikidata.org if missing.

#### wdprops reset
This means that after a while, your local version will miss new and updated properties: this can be solved by running `wdprops reset`

### wdsparl
A command to run a SPARQL query and get its JSON output

From this SPARQL query file: `./path/to/query.rq`
```sparql
SELECT ?work WHERE {
  ?work wdt:P50 wd:Q42 .
}
```
get its output from your terminal like so:

```sh
wdsparql ./path/to/query.rq > ./results.json
```

**Options**
* `-s, --simplify`: output the results simplifed by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk#simplify-sparql-results) function

```sh
wdsparql -s ./path/to/query.rq > ./simplified_results.json
```

### wdsparqlsimplify
A command to apply [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk#simplify-sparql-results) function function to a query results file. Kind of the isolated second step of the `wdsparql --simplify` command:
```sh
wdsparql ./path/to/query.rq > ./results.json
wdsparqlsimplify ./results.json > ./simplified_results.json
```

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
