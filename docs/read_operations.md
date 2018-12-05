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
  - [alternative formats](#alternative-formats)
    - [ttl](#ttl)
- [wd revisions](#wd-revisions)
- [wd id](#wd-id)
- [wd props](#wd-props)
  - [Get the list of all Wikidata properties in another language](#get-the-list-of-all-wikidata-properties-in-another-language)
  - [Get the list of all Wikidata properties with their types](#get-the-list-of-all-wikidata-properties-with-their-types)
  - [Get the list of all Wikidata properties of a given type](#get-the-list-of-all-wikidata-properties-of-a-given-type)
  - [Get the list of all Wikidata properties with their labels, types, descriptions, and aliases](#get-the-list-of-all-wikidata-properties-with-their-labels-types-descriptions-and-aliases)
  - [Reset properties](#reset-properties)
- [wd sparql](#wd-sparql)
  - [static request from a SPARQL file](#static-request-from-a-sparql-file)
  - [dynamic request from a JS file](#dynamic-request-from-a-js-file)
  - [wellknown queries](#wellknown-queries)
    - [all-instances](#all-instances)
  - [custom SPARQL endpoint](#custom-sparql-endpoint)
- [wd query](#wd-query)
- [wd convert](#wd-convert)
- [wd open](#wd-open)
  - [open entities and properties pages](#open-entities-and-properties-pages)
  - [open a search page](#open-a-search-page)
- [wd hub](#wd-hub)

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

> **NB**: when no `--lang` is specified, the command will try to fallback on English, or whatever language value can be found

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
Alternatively, you can pass ids from stdin:
```sh
echo "Q1496 Q123" | wd data
```
This especially make sense when you have thousands of ids to pass, passing them as arguments would fail. See [`wd sparql all-instances` example](#all-instances).

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

#### alternative formats
##### ttl
Entities can be requested in [Turtle](https://en.wikipedia.org/wiki/Turtle_(syntax))

```sh
wd data --format ttl Q123 Q3548931 Q515168
```

Fetch many entities from a SPARQL request, using [`wd sparql`](#wd-sparql):
```sh
wd sparql ./some_request_that_select_entities.rq > entities_ids
cat entities_ids | wd data --format ttl > entities.ttl
```

The same can be done using [`wd query`](#wd-query)
```sh
wd query --property P50 --object Q237087 > fred_vargas_books_ids
cat fred_vargas_books_ids | wd data --format ttl > fred_vargas_books.ttl
```

> **NB**: other options such as filtered properties will be ignored

This can be used to generated partial Turtle dumps, if [Wikidata full dump](https://www.wikidata.org/wiki/Wikidata:Database_download#RDF_dumps) is too big for your needs, but be aware that it is way less efficient that its NDJSON (the default format) counterpart: while for NDJSON, entities are fetched by batches of 50 (the Wikidata API limit), in TTL, entities are fetched one by one, using the [`/wiki/Special:EntityData/Qxxx.ttl`](https://www.wikidata.org/wiki/Special:EntityData/Q123.ttl) endpoint.

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
wd id https://fr.wikisource.org/wiki/Auteur:George_Sand
# => Q3816
```

### wd props
A command to access the list of all Wikidata properties in a given language (by default the environment local language)
```sh
wd props [filter]
# Alias:
wd p [filter]
```

By default, your config or environment language is used:
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
> **NB**: properties without a label in the requested language are set to `null`, as you can see above for P2898 in French

This is especially convenient when you're looking for a property:
```sh
# look for a property having "image" in its label, description or aliases (case insensitive unless the argument contains capitals)
wd props photo
```
Outputs:
```json
{
  "P18": "image",
  "P344": "director of photography",
  "P1259": "coordinates of the point of view",
  "P1442": "image of grave",
  "P1847": "Nasjonalbiblioteket photographer ID",
  "P1947": "Mapillary ID",
  "P1966": "Biblioteca Nacional de Chile catalogue number",
  "P2033": "Category for pictures taken with camera",
  "P2061": "aspect ratio",
  "P2485": "Fashion Model Directory photographer ID",
  "P2634": "model",
  "P2750": "Photographers' Identities Catalog ID",
  "P3269": "Fotografen.nl ID",
  "P3293": "BALaT image ID",
  "P4082": "image captured with",
  "P4640": "photosphere image",
  "P4759": "Luminous-Lint ID",
  "P5023": "activity policy in this place",
  "P5160": "Thesaurus For Graphic Materials ID"
}
```

Matching on labels, descriptions, and aliases can come very handy in cases such as the following:
```sh
wd props RSS
```
Output:
```json
{
  "P1019": "feed URL"
}
```

But in case you want to match only on labels (ignoring descriptions, and aliases), you can pass the pattern to `grep` instead:
```sh
wd props | grep photo
```

#### Get the list of all Wikidata properties in another language
Option: `-l, --lang <lang>`: specify the properties labels language
```sh
wd props -l sv
# outputs the properties in Swedish
```

#### Get the list of all Wikidata properties with their types

Every property accepts values of a precise type, one of `CommonsMedia`, `ExternalId`, `String`, `WikibaseItem`, `Time`, `GlobeCoordinate`, `Monolingualtext`, `Quantity`, `Url`, `WikibaseProperty`, or `Math`

Option: `-t, --type`: include properties types
```sh
wd props --type
```
Outputs:
```
{
  "P6": { "label": "head of government", "type": "WikibaseItem" },
  "P10": { "label": "video", "type": "CommonsMedia" },
  "P14": { "label": "graphic symbol of thoroughfare", "type": "CommonsMedia" },
  "P15": { "label": "route map", "type": "CommonsMedia" },
  "P16": { "label": "highway system", "type": "WikibaseItem" },
  "P17": { "label": "country", "type": "WikibaseItem" },
  "P18": { "label": "image", "type": "CommonsMedia" },
  "P19": { "label": "place of birth", "type": "WikibaseItem" },
  "P20": { "label": "place of death", "type": "WikibaseItem" },
[...]
```

#### Get the list of all Wikidata properties of a given type
Re-using the possibility to pass a pattern to match, you can pass a property type
```sh
wd props --type Url
wd props --type CommonsMedia
```
> **NB**: make sure to respect the case to get an exact match, otherwise it only match on the labels, descriptions and aliases.

#### Get the list of all Wikidata properties with their labels, types, descriptions, and aliases
```sh
wd props --details
```

#### Reset properties
`wd props` first tries to find the list in the `props` folder (created at wikidata-cli root), and request them to query.wikidata.org if missing.

This means that after a while, your local version will miss new and updated properties: this can be solved by using the `--reset` or `--no-cache` options:

Option: `-n, --no-cache`: ignore properties cache: fetch properties from the SPARQL endpoint, even if already cached
Option: `-r, --reset`: clear cached properties, in all languages

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
* `-x, --index <variable>`: get the results indexed by one of the SELECTed variables
* `-e, --sparql-endpoint <url>`: customize the SPARQL endpoint (see below for examples)

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

##### all-instances
Fetch instances and instances of sub-classes of a given item.
Example, all the instances of languages (Q34770):
```sh
wd sparql all-instances Q34770
```
This can be used to fetch the data associated with all the instances of a given item. For instance, to fetch all the painting's data, you could do:
```sh
# Get the ids of all the paintings
wd sparql all-instances Q3305213 > ./paintings_ids
# Fetch their data in a simplified format, and output it all as newline-delimted JSON, one entity per line (see wd-data for details)
wd data --simplify < ./paintings_ids > ./paintings.ndjson
```

#### custom SPARQL endpoint
The `wd sparql` command can actually be used with on other SPARQL endpoints:
```sh
wd sparql --sparql-endpoint http://data.bnf.fr/sparql bnf_request.rq
wd sparql --sparql-endpoint http://live.dbpedia.org/sparql --raw --index item dbpedia_request.rq
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

This can also be used to get all the uses of a property
```sh
# Get all the subjects and objects linked by the property P2586
wd query --property P2002 P2586
```

Other options:
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_sparql_results.md) function
* `-a, --labels`: requests results labels
* `-l, --lang <lang>`: specify the labels' language
* `-t, --limit <num>`: set the request results limit
* `-v, --verbose`: log the generated request
* `-x, --index <variable>`: get the results indexed by `subject`, `property`, or `object`
* `-e, --sparql-endpoint <url>`: customize the SPARQL endpoint (see [`wd sparql`](#wd-sparql) for examples of how to use this option)

### wd convert
Convert batches of external ids to Wikidata ids and vice versa

```sh
wd convert <property> <ids...>
```

```sh
# get the Wikidata ids corresponding to those BNF ids
wd convert P268 11865344k 11932251d
# get the BNF ids corresponding to those Wikidata ids
wd convert P268 Q45 Q140
# the same but taking the ids from stdin
echo Q45 Q140 | wd convert P268
# which can be a file
cat ids_list | wd convert P268
wd convert P268 < ids_list
# or any command outputting a list of ids:
# here, we get the INSEE department code (P2586) of all French departments (Q6465)
wd sparql all-instances Q6465 | wd convert P2586
```

> **NB**: this conversion is done by batches of 100, so calling this command with 100,000 ids will sequentially make 1000 requests to the SPARQL endpoint, which isn't very efficient; depending on the size of the dataset you're targetting, you should probably rather request all the ids at once using `wd query --property <your-property-id>`, passing the option ` --index object` if the data you have at hand is the external ids, and ` --index subject` if you are instead starting from the Wikidata ids.

Other options:
* `-v, --verbose`: log the generated request
* `-e, --sparql-endpoint <url>`: customize the SPARQL endpoint (see [`wd sparql`](#wd-sparql) for examples of how to use this option)


### wd open
```sh
wd open <entities ids>
# Alias:
wd o <entities ids>
```

A command to open a pages on Wikidata in a browser from the command line (yep, you can be that lazy). For more sophisticated queries, see the [`wd hub`](#wd-hub)

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
* `-y, --history`: open the entity histor**y** page
* `-p, --wikipedia`: open the Wiki**p**edia article
* `-u, --url`: simply generate the url, don't open it in a browser
```sh
# open https://www.wikidata.org/w/index.php?title=Q123&action=history
wd open -y Q123
# open https://fr.wikipedia.org/wiki/Septembre as French is my default system language
wd open -p Q123
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

### wd hub
```sh
wd hub <query>
# Alias:
wd h <query>
```

A command to open web pages using the [Hub](https://tools.wmflabs.org/hub/). Pass arguments to the Hub as you would from a URL, replacing ? and & by spaces.

Options:
* `-l, --lang <lang>`: specify which language should be prefered
* `-j, --json`: get the Hub redirection data instead of opening the page in browser

Examples:
```sh
# Find the entity having 24597135 as VIAF id and open the corresponding page on inventaire.io
wd hub viaf:24597135 site=inventaire
# Get the image illustrating Q3 in 300px
wd hub Q3 property=image width=300 --json | jd destination.url
```
