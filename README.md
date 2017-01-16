# Wikidata-CLI
The [Command-line interface](https://en.wikipedia.org/wiki/Command-line_interface) interface to [Wikidata](https://wikidata.org)

[![wikidata](https://raw.githubusercontent.com/maxlath/wikidata-sdk/master/assets/wikidata.jpg)](https://wikidata.org)

[![NPM](https://nodei.co/npm/wikidata-cli.png?stars&downloads&downloadRank)](https://npmjs.com/package/wikidata-cli/) [![NPM](https://nodei.co/npm-dl/wikidata-cli.png?months=6&height=3)](https://npmjs.com/package/wikidata-cli/)

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node](https://img.shields.io/badge/node-%3E=%20v4-brightgreen.svg)](http://nodejs.org)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Summary
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Dependencies](#dependencies)
- [Installation](#installation)
- [Commands](#commands)
  - [Read operations](#read-operations)
    - [wd label](#wd-label)
    - [wd claims](#wd-claims)
    - [wd data](#wd-data)
    - [wd id](#wd-id)
    - [wd props](#wd-props)
    - [wd sparl](#wd-sparl)
    - [wd query](#wd-query)
    - [wd open](#wd-open)
  - [Write operations](#write-operations)
- [API changes](#api-changes)
- [See Also](#see-also)
  - [wikidata-sdk](#wikidata-sdk)
  - [wikidata-filter](#wikidata-filter)
  - [wikidata-agent](#wikidata-agent)
  - [wikidata-taxonomy](#wikidata-taxonomy)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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

### Read operations

#### wd label
Working with Wikidata, we often end up with obscure ids. We can always look-up those ids labels on the website but that means loading pages and pages, when a small API call and parsing could return just what we need: a label
```sh
wd label Q1103345
# => The Cluetrain Manifesto
```

Options:
* `-c, --clipboard`: copy the result to clipboard
* `-l, --lang`: specify the label's language

By default, the result uses your environment local language (`process.env.LANG`), but you can pass a 2-letters language code as second argument
```sh
wd label Q1103345 -l de
# => Cluetrain-Manifest
wd label Q123 -l zh
# => 9月
```

#### wd claims
A quick way to access the claims of an entity
```sh
# all Q2001's claims
wd claims Q2001
# or just his place of birth
wd claims Q2001 P19
```

Options:
* `-v, --verbose`: make results more verbose
* `-l, --lang`: specify the properties labels' language
```sh
wd claims Q2001 -l es
wd claims Q2001 P19 --lang ru
```

Options when passing both an id an property:
* `-c, --clipboard`: copy the result to clipboard
* `-j, --json`: format the result as JSON

#### wd data
A quick way to access an entities data
```sh
wd data Q1496
```
This simply outputs the result of `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=Q1496`, parsed to keep only what is relevant to the requested entity (here Q1496).
The output is valid json, so it lets you the possibility to pipe it to a JSON parser such as [jsondepth](https://www.npmjs.com/package/jsondepth):
```sh
wd data Q1496 | jd labels.pt
# => { language: 'pt', value: 'Fernão de Magalhães' }
```

#### wd id
This one is kind of the inverse of `wd label`: pass it the title of a Wikipedia article and it will return the corresponding Wikidata id
```sh
wd id Cantabria
# => Q3946
wd id New Delhi
# => Q987
```

Options:
* `-v, --verbose`: make results more verbose
* `-c, --clipboard`: copy the result to clipboard
* `-l, --lang`: specify from which language the title comes
By default, it will look at the Wikipedia corresponding to your environment local language (`process.env.LANG`), but you can specify another language by passing a 2-letters language code
```sh
wd id -l fr science politique
# => Q36442
```

You can also pass it full Wikipedia urls and let it deduce the language from there
```sh
wd id https://en.wikipedia.org/wiki/Friedrich_Nietzsche
# => Q9358
```

#### wd props
A command to access the list of all Wikidata properties in a given language (by default the environment local language)

* Get the list of all Wikidata properties in your environment local language:
```sh
wd props
```
Outputs a JSON object of the kind:
```
[...]
  "P2897": "identifiant Eldoblaje Movie",
  "P2898": null,
  "P2899": "âge minimal",
[...]
```
NB: properties without a label in the requested language are set to `null`, as you can see above for P2898 in French

This is especially convenient when you're looking for a property:
```sh
# look for a property dealing with images
wd props |grep image
```
Outputs:
```
  "P18": "image",
  "P41": "flag image",
  "P94": "coat of arms image",
  "P154": "logo image",
  "P158": "seal image",
[...]
```

* Get the list of all Wikidata properties in another language
Options:
* `-l, --lang`: specify the properties labels language
```sh
wd props -l sv
# outputs the properties in Swedish
```

This command first tries to find the list in the `props` folder (created at wikidata-cli root), and request them to query.wikidata.org if missing.

This means that after a while, your local version will miss new and updated properties: this can be solved by using the `--reset` options

Options:
* `-r, --reset`: clear properties cache

#### wd sparl
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

Options:
* `-v, --verbose`: log the generated SPARQL
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk#simplify-sparql-results) function

```sh
wd sparql ./path/to/query.rq > ./results.json
wd sparql -r ./path/to/query.rq > ./raw_sparql_results.json
```

#### wd query
A command to generate and run a simple SPARQL query, passing one or two of the elements that make a statement:
* `-s, --subject`
* `-p, --property`
* `-o, --object`

```sh
# what is the entity id matching the twitter username (P2002) "timberners_lee"?
wd query --property P2002 --object timberners_lee
# which works have exoplanets (Q44559) for main subject (P921)?
wd query --property P921 --object Q44559 --labels
# or with the short options syntax
wd query -p P921 -o Q44559 -a
```

Other Options:
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk#simplify-sparql-results) function
* `-a, --labels`: requests results labels
* `-l, --lang <lang>`: specify the labels' language
* `-t, --limit <num>`: set the request results limit (defaults to 1000)
* `-v, --verbose`: log the generated request

#### wd open
A command to open an entity's or property's page on Wikidata in a browser (yep, you can be that lazy)

```sh
wd open Q123
# opens https://wikidata.org/wiki/Q123 in your default browser

wd open P659
# opens https://www.wikidata.org/wiki/Property:P659

# also working with any string that matches /(Q|P)\d+/
wd open https://inventaire.io/entity/wd:Q33977
# opens https://wikidata.org/wiki/Q33977
```

Options:
* `-p, --wikipedia`: open the Wiki**p**edia article instead
```sh
wd open -p Q123
# opens https://fr.wikipedia.org/wiki/Septembre because my system language is French
```
* `-l, --lang`: specify which Wikipedia edition should be targeted
```sh
wd open -p -l sv Q123
# opens https://sv.wikipedia.org/wiki/September instead
```

### Write operations
[Coming soon](https://github.com/maxlath/wikidata-cli/issues/11). Meanwhile you can use [wikidata-agent](https://github.com/maxlath/wikidata-agent)

-------------

## API changes

see [CHANGELOG](CHANGELOG.md) for details

**1.x.x -> 2.0.0**

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
Removed: use [wd sparql](#wd-sparql) instead, it now get simplified results by default. Use the --raw option to disable this behavior

**2.x.x -> 3.0.0**

###wd-graph
Renamed [wd query](#wd-query)

-------------

## See Also
### [wikidata-sdk](https://www.npmjs.com/package/wikidata-sdk)
a javascript tool suite to query and work with wikidata data, heavily used by wikidata-cli

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
