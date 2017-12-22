# Read operations

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [wd summary](#wd-summary)
- [wd search](#wd-search)
- [wd label](#wd-label)
- [wd description](#wd-description)
- [wd aliases](#wd-aliases)
- [wd claims](#wd-claims)
- [wd data](#wd-data)
  - [multiple entities](#multiple-entities)
  - [simplified entities](#simplified-entities)
    - [claims simplification keep options](#claims-simplification-keep-options)
  - [filtered properties](#filtered-properties)
- [wd revisions](#wd-revisions)
- [wd id](#wd-id)
- [wd props](#wd-props)
  - [Get the list of all Wikidata properties in your environment local language](#get-the-list-of-all-wikidata-properties-in-your-environment-local-language)
  - [Get the list of all Wikidata properties in another language](#get-the-list-of-all-wikidata-properties-in-another-language)
  - [Get the list of all Wikidata properties and their data types](#get-the-list-of-all-wikidata-properties-and-their-data-types)
  - [Get the list of all Wikidata properties of a given type](#get-the-list-of-all-wikidata-properties-of-a-given-type)
- [wd sparql](#wd-sparql)
  - [static request from a SPARQL file](#static-request-from-a-sparql-file)
  - [dynamic request from a JS file](#dynamic-request-from-a-js-file)
- [wd query](#wd-query)
- [wd open](#wd-open)
  - [open entities and properties pages](#open-entities-and-properties-pages)
  - [open a search page](#open-a-search-page)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


### wd summary
![wd summary Q1](https://cloud.githubusercontent.com/assets/1596934/24504647/5b17135c-1557-11e7-971e-b13648bdc604.gif)

Working with Wikidata, we often end up with obscure ids. We can always look-up those ids labels on the website but that means loading pages and pages, when a small API call and parsing could return just what we need: a label, a description, and some claims to know what we are dealing with.

```sh
wd summary <entities ids>
# Alias:
wd s <entities ids>
```
```sh
wd summary Q27477672
# Label anthropomorphic comic
# Description comic book genre
# instance of (P31):  comic genre (Q20087698)
# subclass of (P279): animal comic (Q10493450)
wd summary Q18120925 Q22117436 Q22117437
```

Options:
* `-p, --properties <properties>`: request additional properties (separated by a comma)
* `-l, --lang <lang>`: specify the summary's language
* `-v, --verbose`: log all claims

### wd search
```sh
wd search <query>
# Alias: (the s was already used by 'wd summary', so 'f' as 'find')
wd f <query>
```
```sh
wd search Ligo
# Q255371    Laser — Interferometer Gravitational-Wave Observatory gravitational-wave detector
# Q18461808  Ligo — Italian town
# Q36946800  Ligo — family name
# Q30026643  Ligonchio — chief town of the homonym municipality
# Q30026645  Ligosullo — chief town of the homonym municipality
# Q18494373  Ligone (Santa Maria)
# Q2520468   Ligonier
# Q70330     Ligornetto
# Q785105    Ligonier, Pennsylvania — borough of Pennsylvania
# Q1781427   Ligorio López — Mexican footballer
```

Options:
* `-l, --lang <lang>`: specify the results labels and descriptions language
* `-t, --limit <num>`: set a custom limit (defaults to 10)
* `-j, --json`: format the result as JSON
* `-v, --verbose`: display rich results (aka summaries)

Verbose mode only:
* `-p, --properties <properties>`: request additional properties (separated by a comma)

### wd label
```sh
wd label <entities ids>
# Alias:
wd l <entities ids>
```
```sh
wd label Q1103345
# => The Cluetrain Manifesto
wd label Q18120925 Q22117436 Q22117437
```

Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the label's language

```sh
wd label Q1103345 -l de
# => Cluetrain-Manifest
wd label Q123 -l zh
# => 9月
```

### wd description
```sh
wd description <entities ids>
# Alias: (the d was already used by 'wd data')
wd desc <entities ids>
```
```sh
wd description Q1103345
wd description Q18120925 Q22117436 Q22117437
```
Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the description's language

### wd aliases
```sh
wd aliases <entities ids>
# Alias:
wd a <entities ids>
```
```sh
wd aliases Q1103345
wd aliases Q18120925 Q22117436 Q22117437
```
Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the aliases's language

### wd claims
A quick way to access the claims of an entity
```sh
wd claims <entities ids> [property id or pattern]
# Alias:
wd c <entities ids> [property id or pattern]
```
```sh
# all Q2001's claims
wd claims Q2001
# or just his place of birth
wd claims Q2001 P19
# or just the claims from properties of type Url
wd claims Q2001 Url
# or just the claims from properties with labels matching "library"
wd claims Q2001 library
# or website, etc
wd claims Q2001 website
```

Options:
* `-l, --lang <lang>`: specify the properties labels' language
```sh
wd claims Q2001 -l es
wd claims Q2001 P19 --lang ru
```

Options when passing both an id an property:
* `-c, --clipboard`: copy the command's result to clipboard
* `-j, --json`: format the result as JSON

### wd data
A quick way to access an entity's raw JSON data
```sh
wd data <entities ids>
# Alias:
wd d <entities ids>
```
```sh
wd data Q1496
```
This simply outputs the result of `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=Q1496`, parsed to keep only what is relevant to the requested entity (here Q1496).
The output is valid json, so it lets you the possibility to pipe it to a JSON parser such as [jsondepth](https://www.npmjs.com/package/jsondepth):
```sh
wd data Q1496 | jd labels.pt
# => { language: 'pt', value: 'Fernão de Magalhães' }
```

#### multiple entities
You can also request several entities at once by passing several ids.
This outputs newline delimited JSON: one entity per-line, each line being valid JSON, but not the whole file as a whole.
```sh
wd data Q1496 Q123
```

#### simplified entities
You can request entities to be simplified, using [wikidata-sdk `simplify.entity` function](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_entities_data.md#simplify-entity)
```sh
wd data --simplify Q515168
# pass options to the simplify function
wd data --simplify --keep ids,references,qualifiers,hashes,nontruthy Q123
```

##### claims simplification keep options

You can customize the output by passing the list of data elements to keep among `ids`, `references`, `qualifiers`, `hashes`, `nontruthy`

```sh
wd data --simplify --keep ids,references,qualifiers,hashes,nontruthy Q123
# equivalent to
wd data --simplify --keep all Q123
# Can be useful to easily access claims ids
wd d -sk ids Q123 | jd .claims.P138 -j
```

> See [`simplify.claims` options](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_claims.md#options) for behavior details

#### filtered properties
Only request properties you need among `labels`,`descriptions`,`aliases`,`claims`,`sitelinks`
```sh
wd data --props labels,claims,sitelinks Q515168
```

### wd revisions
Get entities revisions data
```sh
wd revisions <entities ids>
# Alias:
wd r <entities ids>
```
```sh
wd revisions Q3548931
wd r Q3548931
```

Options:
* `-s, --start <time>`: specify a start time ([date format](https://github.com/maxlath/wikidata-sdk/blob/master/docs/get_revisions.md#get-revisions))
* `-e, --end <time>`: specify an end time ([date format](https://github.com/maxlath/wikidata-sdk/blob/master/docs/get_revisions.md#get-revisions))
* `-l, --limit <time>`: specify a limit number of revision (default and max = 500)

### wd id
This one is kind of the inverse of `wd label`: pass it the title of a Wikipedia article and it will return the corresponding Wikidata id
```sh
wd id <article title or any Wikimedia project URL>
```
```sh
wd id Cantabria
# => Q3946
wd id New Delhi
# => Q987
```

Options:
* `-v, --verbose`: make the output more verbose
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify from which language the title comes
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

### wd props
A command to access the list of all Wikidata properties in a given language (by default the environment local language)
```sh
wd props [filter]
# Alias:
wd p [filter]
```

#### Get the list of all Wikidata properties in your environment local language
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
# look for a property having "image" in its label (case insensitive)
wd props | grep -i image
# which can actually be done by passing the pattern as additional arguments
wd props image
```
Outputs:
```
{
  "P6": "head of government",
  "P10": "video",
  "P14": "graphic symbol of thoroughfare",
  "P15": "route map",
  "P16": "highway system",
  "P17": "country",
  "P18": "image",
[...]
```

#### Get the list of all Wikidata properties in another language
Option: `-l, --lang <lang>`: specify the properties labels language
```sh
wd props -l sv
# outputs the properties in Swedish
```

This command first tries to find the list in the `props` folder (created at wikidata-cli root), and request them to query.wikidata.org if missing.

This means that after a while, your local version will miss new and updated properties: this can be solved by using the `--reset` options

Option: `-n, --no-cache`: ignore properties cache: fetch properties from the SPARQL endpoint, even if already cached
Option: `-r, --reset`: clear cached properties, in all languages, and with or without types

#### Get the list of all Wikidata properties and their data types

Every property accepts values of a precise type, one of `CommonsMedia`, `ExternalId`, `String`, `WikibaseItem`, `Time`, `GlobeCoordinate`, `Monolingualtext`, `Quantity`, `Url`, `WikibaseProperty`, or `Math`

Option: `-t, --type`: include properties types
```sh
wd props --type
```
Outputs:
```
{
  "P6": { "type": "WikibaseItem", "label": "head of government" },
  "P10": { "type": "CommonsMedia", "label": "video" },
  "P14": { "type": "CommonsMedia", "label": "graphic symbol of thoroughfare" },
  "P15": { "type": "CommonsMedia", "label": "route map" },
  "P16": { "type": "WikibaseItem", "label": "highway system" },
  "P17": { "type": "WikibaseItem", "label": "country" },
  "P18": { "type": "CommonsMedia", "label": "image" },
[...]
```

#### Get the list of all Wikidata properties of a given type
Re-using the possibility to pass a pattern to match, you can pass a property type
```sh
wd props --type Url
wd props --type CommonsMedia
```
NB: make sure to respect the case to get an exact match, otherwise it only match on the label.

### wd sparql

A command to run a SPARQL query and get its JSON output
```sh
wd sparql <sparql or javascript file path>
```

#### static request from a SPARQL file

From this SPARQL query file:
```sparql
# author_works.rq
SELECT ?work WHERE {
  ?work wdt:P50 wd:Q42 .
}
```
get its output from your terminal like so:

```sh
wd sparql ./path/to/author_works.rq > ./results.json
```

Options:
* `-v, --verbose`: log the generated SPARQL
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_sparql_results.md) function
* `-x, --index`: get the results indexed by one of the SELECTed variables

```sh
wd sparql ./path/to/query.rq > ./results.json
wd sparql ./path/to/query.rq --raw > ./raw_sparql_results.json
wd sparql ./path/to/query.rq --index someVariableName > ./results_index.json
```

#### dynamic request from a JS file
Alernatively, you can pass the path from a javascript file exporting a function, the remaining arguments will be passed to the function:
```js
// author_works.js
module.exports = authorId => {
  return `SELECT ?item WHERE {
    ?item wdt:P50 wd:${authorId} .
  }`
}
```
```sh
wd sparql ./path/to/author_works.js Q535 --json > ./Q535_works.json
wd sparql ./path/to/author_works.js Q5879 --json > ./Q5879_works.json
# This simple query could actually have been done using the `wd query` command
wd query --property P50 --object Q5879
# but, meh, let's keep it simple for the demo
```

You can use it to build [alias commands](https://en.wikipedia.org/wiki/Alias_%28command%29) for the requests you use often: the above can then be written
```sh
alias authors_works="wd sparql ./path/to/author_works.js --json"
authors_works Q535 > ./Q535_works.json
authors_works Q5879 > ./Q5879_works.json
```

**Demo**: [Add book entities descriptions](https://github.com/maxlath/wikidata-scripting/tree/master/books_descriptions)

#### wellknown queries
Some idiomatic queries than can't be done with [`wd query`](#wd-query) are included for convenience:

#### all-instances
Fetch instances and instances of sub-classes of a given item.
Example, all the instances of languages (Q34770):
```sh
wd sparql all-instances Q34770
```

### wd query
```sh
wd query <options>
# Alias:
wd q <options>
```

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

Other options:
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_sparql_results.md) function
* `-a, --labels`: requests results labels
* `-l, --lang <lang>`: specify the labels' language
* `-t, --limit <num>`: set the request results limit (defaults to 1000)
* `-v, --verbose`: log the generated request

### wd open
```sh
wd open <entities ids>
# Alias:
wd o <entities ids>
```

A command to open a pages on Wikidata in a browser from the command line (yep, you can be that lazy)

#### open entities and properties pages
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
* `-u, --url`: simply generate the url, don't open it in a browser
```sh
wd open -p Q123
# opens https://fr.wikipedia.org/wiki/Septembre because my system language is French
```
* `-l, --lang <lang>`: specify which Wikipedia edition should be targeted
```sh
wd open -p -l sv Q123
# opens https://sv.wikipedia.org/wiki/September instead
wd open -p -l sv Q123 -u
# outputs https://sv.wikipedia.org/wiki/September without opening it in the browser
```

#### open a search page
```sh
wd open Dan Simmons
# opens https://www.wikidata.org/w/index.php?title=Special:Search&search=Dan%20Simmons
```
