# Read operations

The following documentation assumes that the Wikibase instance we work with is Wikidata (using the `wd` command, which is just an alias of the `wb` command bound to Wikidata config), unless specified otherwise (using the `wb` command and custom instance host (`-i`) and SPARQL endpoint (`-e`).

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [wb summary](#wb-summary)
- [wb search](#wb-search)
- [wb label](#wb-label)
- [wb description](#wb-description)
- [wb aliases](#wb-aliases)
- [wb lemma](#wb-lemma)
- [wb claims](#wb-claims)
  - [get a claim GUID](#get-a-claim-guid)
- [wb data](#wb-data)
  - [multiple entities](#multiple-entities)
  - [simplified entities](#simplified-entities)
    - [claims simplification keep options](#claims-simplification-keep-options)
  - [filtered properties](#filtered-properties)
  - [fetch an old revision](#fetch-an-old-revision)
  - [alternative formats](#alternative-formats)
    - [ttl](#ttl)
  - [single claim](#single-claim)
- [wb generate-template](#wb-generate-template)
  - [Tailored templates](#tailored-templates)
  - [Dynamic templates](#dynamic-templates)
  - [Generate many templates](#generate-many-templates)
  - [Generate template from a specific revision](#generate-template-from-a-specific-revision)
- [wb revisions](#wb-revisions)
- [wb id](#wb-id)
- [wb props](#wb-props)
  - [Get the list of all Wikibase properties in another language](#get-the-list-of-all-wikibase-properties-in-another-language)
  - [Get the list of all Wikibase properties with their types](#get-the-list-of-all-wikibase-properties-with-their-types)
  - [Get the list of all Wikibase properties of a given type](#get-the-list-of-all-wikibase-properties-of-a-given-type)
  - [Get the list of all Wikibase properties with their labels, types, descriptions, and aliases](#get-the-list-of-all-wikibase-properties-with-their-labels-types-descriptions-and-aliases)
  - [Reset properties](#reset-properties)
- [wb sparql](#wb-sparql)
  - [static request from a SPARQL file](#static-request-from-a-sparql-file)
  - [dynamic request from a JS file](#dynamic-request-from-a-js-file)
  - [wellknown queries](#wellknown-queries)
    - [all-instances](#all-instances)
  - [output format](#output-format)
  - [custom SPARQL endpoint](#custom-sparql-endpoint)
- [wb query](#wb-query)
- [wb convert](#wb-convert)
- [wb open](#wb-open)
  - [open entities and properties pages](#open-entities-and-properties-pages)
  - [open a search page](#open-a-search-page)
  - [open a specific revision's page](#open-a-specific-revisions-page)
- [wb hub](#wb-hub)
- [wb lang](#wb-lang)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


### wb summary
![wb summary Q1](https://cloud.githubusercontent.com/assets/1596934/24504647/5b17135c-1557-11e7-971e-b13648bdc604.gif)

Working with Wikibase, we often end up with obscure ids. We can always look-up those ids labels on the website but that means loading pages and pages, when a small API call and parsing could return just what we need: a label, a description, and some claims to know what we are dealing with.

```sh
wb summary <entities ids>
# Alias:
wb u <entities ids>
```
```sh
wd summary Q27477672
# Can take multiple ids from all the supported entity types: item, lexeme, property
wd summary Q18120925 L525 P123

# With custom properties on an other Wikibase instance
wb summary Q5 -l en -p P2,P12 -i https://wikibase-registry.wmflabs.org -e https://wikibase-registry-query.wmflabs.org/proxy/wdqs/bigdata/namespace/wdq/sparql
```

Options:
* `-p, --properties <properties>`: override default summary properties (separated by a comma)
* `-l, --lang <lang>`: specify the summary's language
* `-v, --verbose`: log all claims

### wb search
```sh
wb search <query>
# Alias: (the s was already used by 'wb summary', so 'f' as 'find')
wb f <query>
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

wb search eagle -i https://wikibase-registry.wmflabs.org
# Q5         EAGLE Wikibase wikibase instance created for the Europeana Ancient Greek and Latin Epigraphy project
```

Options:
* `-l, --lang <lang>`: specify the results labels and descriptions language
* `-t, --type <type>`: set a custom type: i|item, p|property, l|lexeme, f|form, s|sense (Default: item)
```sh
```
* `-n, --limit <num>`: set a custom limit (defaults to 20)
* `-j, --json`: format the result as JSON
* `-v, --verbose`: display rich results (aka summaries)
* `-p, --properties <comma separted properties ids>`: request additional properties (implies verbose mode)

Examples:
```sh
# Display search results with publication dates
wd search --properties P577 "Harry Potter"
# Search properties (but `wb props` might be doing a better job)
wd search --type property "date"
# Search lexemes
wd search --type lexeme "date"
# Search forms
wd search --type form "code"
# Searching senses doesn't seem to work currently (2020-04-17)
wd search --type sense "test"
```

### wb label
```sh
wb label <entities ids>
# Alias:
wb l <entities ids>
```
```sh
wd label Q1103345
# => The Cluetrain Manifesto
wd label Q18120925 Q22117436 Q22117437

wb label Q7 -i https://wikibase-registry.wmflabs.org
# => PlantData
```

Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the label's language

```sh
wb label Q1103345 -l de
# => Cluetrain-Manifest
wb label Q123 -l zh
# => 9月
```

> **NB**: when no `--lang` is specified, the command will try to fallback on English, or whatever language value can be found

### wb description
```sh
wb description <entities ids>
# Alias: (the d was already used by 'wb data')
wb desc <entities ids>
```
```sh
wb description Q1103345
wb description Q18120925 Q22117436 Q22117437
```
Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the description's language

### wb aliases
```sh
wb aliases <entities ids>
# Alias:
wb a <entities ids>
```
```sh
wb aliases Q1103345
wb aliases Q18120925 Q22117436 Q22117437
```
Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the aliases's language

### wb lemma
```sh
wb lemma <lexeme ids>
```
```sh
wb lemma L1
wd lemma L1 L2 L3
```
Options:
* `-c, --clipboard`: copy the command's result to the clipboard
* `-l, --lang <lang>`: specify the lemma's language

### wb claims
A quick way to access the claims of an entity
```sh
wb claims <entities ids> [property id or pattern]
# Alias:
wb c <entities ids> [property id or pattern]
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

# all https://wikibase-registry.wmflabs.org/entity/Q7 claims
wb claims Q7 -i https://wikibase-registry.wmflabs.org -e https://wikibase-registry-query.wmflabs.org/proxy/wdqs/bigdata/namespace/wdq/sparql
```

Options:
* `-l, --lang <lang>`: specify the properties labels' language
```sh
wd claims Q2001 -l es
wd claims Q2001 P19 --lang ru
```
* `-a, --all`: include all claims, not only the truthy ones
```sh
# one result: the claim with the preferred rank
wd claims Q858121 P2002
# several results: claims of all ranks
wd claims Q858121 P2002 --all
```

Options when passing both an id an property:
* `-c, --clipboard`: copy the command's result to clipboard
* `-j, --json`: format the result as JSON

#### get a claim GUID
If a property and a value are provided, `wb claims` returns the matching claims GUIDs
```sh
wd claims Q2013 P2689 1940 --json
# => [ "Q2013$2bcdb018-47a0-5175-eade-1dd6dea2b53d" ]
```

### wb data
A quick way to access an entity's raw JSON data
```sh
wb data <entities ids>
# Alias:
wb d <entities ids>
```
```sh
wd data Q1496
```
This simply outputs the result of `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=Q1496`, parsed to keep only what is relevant to the requested entity (here Q1496).
The output is valid json, so it lets you the possibility to pipe it to a JSON parser such as [jq](https://stedolan.github.io/jq/):
```sh
wd data Q1496 | jq .labels.pt
# => {"language":"pt","value":"Fernão de Magalhães"}
```

#### multiple entities
You can also request several entities at once by passing several ids.
This outputs newline delimited JSON: one entity per-line, each line being valid JSON, but not the whole file as a whole.
```sh
wd data Q1 Q2 Q3 L57332 P2114
wb data Q5 Q6 Q7 -i https://wikibase-registry.wmflabs.org
```
Alternatively, you can pass ids from stdin:
```sh
echo "Q1496 Q123" | wd data
```
This especially make sense when you have thousands of ids to pass, passing them as arguments would fail. See [`wb sparql all-instances` example](#all-instances).

#### simplified entities
You can request entities to be simplified, using [wikibase-sdk `simplify.entity` function](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_entities_data.md#simplify-entity)
```sh
wd data --simplify Q515168
# pass options to the simplify function
wd data --simplify --keep ids,nontruthy,ranks Q123
```

##### claims simplification keep options

You can customize the output by passing the list of data elements to keep:

```sh
wd data --simplify --keep ids,richvalues,types,references,qualifiers,hashes,nontruthy,ranks Q123
# equivalent to
wd data --simplify --keep all Q123
# Can be useful to easily access claims ids
wd d -sk ids Q123 | jq .claims.P138 -j
```

> See [`simplify.claims` options](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_claims.md#options) for behavior details

#### filtered properties
Only request properties you need among `labels`,`descriptions`,`aliases`,`claims`,`sitelinks`
```sh
wd data --props labels,claims,sitelinks Q515168
wd data --props lemmas,forms L525
```
Or even subparts of those properties
```sh
wd data --props labels.fr,claims.P18,claims.P580,sitelinks.dewiki Q515168
```
Which can be rewritten in a more lazy format (but being less specific, it actually also try to give you descriptions and aliases in French)
```sh
wd data --props fr,P18,P580,dewiki Q515168
```

#### fetch an old revision
```sh
wd data Q4115189 --revision 943703455
```

#### alternative formats
##### ttl
Entities can be requested in [Turtle](https://en.wikipedia.org/wiki/Turtle_(syntax))

```sh
wd data --format ttl Q123 Q3548931 Q515168
wb data --format ttl Q5 Q6 Q7 -i https://wikibase-registry.wmflabs.org
```

Fetch many entities from a SPARQL request, using [`wb sparql`](#wb-sparql):
```sh
wb sparql ./some_request_that_select_entities.rq > entities_ids
cat entities_ids | wb data --format ttl > entities.ttl
```

The same can be done using [`wb query`](#wb-query)
```sh
wd query --property P50 --object Q237087 > fred_vargas_books_ids
cat fred_vargas_books_ids | wd data --format ttl > fred_vargas_books.ttl
```

> **NB**: other options such as filtered properties will be ignored

This can be used to generated partial Turtle dumps, if [Wikibase full dump](https://www.wikidata.org/wiki/Wikidata:Database_download#RDF_dumps) is too big for your needs, but be aware that it is way less efficient that its NDJSON (the default format) counterpart: while for NDJSON, entities are fetched by batches of 50 (the Wikibase API limit), in TTL, entities are fetched one by one, using the [`/wiki/Special:EntityData/Qxxx.ttl`](https://www.wikidata.org/wiki/Special:EntityData/Q123.ttl) endpoint.

#### single claim
The command also support finding a single claim from a claim GUID. (If you have a use case where you would need to fetch several claims at once this way, feel welcome to open an issue)
```sh
wd data 'Q2$50fad68d-4f91-f878-6f29-e655af54690e'
wd data --simplify 'Q2$50fad68d-4f91-f878-6f29-e655af54690e'
wd data --simplify --keep ids,references,qualifiers,hashes 'Q2$50fad68d-4f91-f878-6f29-e655af54690e'
```

### wb generate-template
This command lets you generate a data file (JSON by default) pre-formatted to be passed as input of [`wb create-entity`](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-create-entity) or [`wb edit-entity`](https://github.com/maxlath/wikibase-cli/blob/master/docs/write_operations.md#wb-edit-entity)

```sh
wb generate-template <entity-id>
# Alias:
wb gt <entity-id>

# Get Q123 pre-formatted data
wd generate-template Q4115189 > Q4115189.json
# Then the typical workflow would be to edit the generated file as you please,
# before passing it back to the `wb edit-entity` command
wd edit-entity ./Q4115189.json

# For reference,
wd generate-template --format json Q4115189
# is equivalent to
wd data --simplify --keep ids,references,qualifiers,hashes,snaktypes Q4115189
```

Options:
* `-f, --format <json|js>`: output template in the desired format. When requesting only one entity, defaults to `js`. Defaults to `json` when requesting several entities.
* `-m, --create-mode`: optimize for creating an entity from a previously existing one, namely dropping ids from the existing entity used as template

#### Tailored templates

```sh
# Only get data required to edit the labels, claims and sitelinks
wd generate-template Q4115189 --props labels,claims,sitelinks

# Only get data required to edit the Dutch label, the P31 claims, and the frwiki sitelink
wd generate-template Q4115189 --props labels.nl,claims.P31,sitelinks.frwiki

# Only get
# - terms (labels, descriptions, and aliases) in Russian
# - P31 and P659 claims (with a lazy syntax)
# - Spanish Wikipedia sitelinks (with a lazy syntax)
wd generate-template Q4115189 --props ru,P31,P659,eswiki
```

#### Dynamic templates
```sh
# Get the generate-template as a Javascript module,
# ready to be customized to take arguments from the command-line,
# which is typically useful to edit or create several entities with one template
wb generate-template Q123 --format js > template.js
# Call the generated JS generate-template after customization
# by passing the required arguments
wb create-entity ./template.js foo bar 456 'https://example.org'
wb create-entity ./template.js buz bla 987 'https://example2.org'
```

#### Generate many templates
```sh
# Pass ids as arguments
wb generate-template Q123 Q124
# or on stdin (useful especially when there are many ids)
echo Q123 Q124 | wb generate-template
```

Generating many templates at once can be useful, for instance to apply the same modification to many entities. For instance, to remove all P370 qualifiers on P369 claims, you first find all the entities with such a claim with a SPARQL query

```sh
# Find the ids of entities to modify
wd sparql ./find_entities_ids.rq > ids
cat ids | wd generate-template --props P369 > templates.ndjson
# using https://www.npmjs.com/package/ndjson-apply
cat templates.ndjson | ndjson-apply ./remove_qualifier.js > cleaned_up_templates.ndjson
cat cleaned_up_templates.ndjson | wd entity-edit --batch

# Or for short, if you know what you are doing and don't want to inspect intermediary results
wd sparql ./find_entities_ids.rq |
  wd generate-template --props P369 |
  ndjson-apply ./remove_qualifier.js |
  wd entity-edit --batch
```

Where `./find_entities_ids.rq` could be something like:
```sparql
# find all entities with a P370 qualifier on a P369 claim
SELECT ?item {
  ?item p:P369 ?P369_statement .
  ?P369_statement pq:P370 ?P370_claim .
}
```

and `./remove_qualifier.js` could be something like:
```js
module.exports = item => {
  // Filter-out claims that shouldn't be changed
  item.claims.P369 = item.claims.P369
    .filter(claim => claim.qualifiers.P370 != null)
    .map(claim => {
      delete claim.qualifiers.P370
      return claim
    })
  return item
}
```

#### Generate template from a specific revision
```sh
wd generate-template Q4115189 --revision 943703455
```
Use cases:
* Easily recover specific data elements from a previous revision
```sh
wd generate-template Q4115189 --revision 943703455 --props claims.P516 > ./Q4115189_lost_P516_claims.json
wd edit-entity ./Q4115189_lost_P516_claims.json
```

### wb revisions
Get entities revisions data
```sh
wb revisions <entities ids>
# Alias:
wb r <entities ids>
```
```sh
wd revisions Q3548931
wd r Q3548931
```

Options:
* `-s, --start <time>`: specify a start time ([date format](https://github.com/maxlath/wikidata-sdk/blob/master/docs/get_revisions.md#get-revisions))
* `-e, --end <time>`: specify an end time ([date format](https://github.com/maxlath/wikidata-sdk/blob/master/docs/get_revisions.md#get-revisions))
* `-l, --limit <time>`: specify a limit number of revision (default and max = 500)

### wb id
This one is kind of the inverse of `wb label`: pass it the title of a Wikipedia article and it will return the corresponding Wikidata id
**Status command**: still very much coupled to Wikidata, especially for sitelinks resolution

```sh
wb id <article title or any Wikimedia project URL>
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

### wb props
A command to access the list of all Wikibase properties in a given language (by default the environment local language)
```sh
wb props [filter]
# Alias:
wb p [filter]
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

#### Get the list of all Wikibase properties in another language
Option: `-l, --lang <lang>`: specify the properties labels language
```sh
wd props -l sv
# outputs the properties in Swedish
```

#### Get the list of all Wikibase properties with their types

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

#### Get the list of all Wikibase properties of a given type
Re-using the possibility to pass a pattern to match, you can pass a property type
```sh
wd props --type Url
wd props --type CommonsMedia
```
> **NB**: make sure to respect the case to get an exact match, otherwise it only match on the labels, descriptions and aliases.

#### Get the list of all Wikibase properties with their labels, types, descriptions, and aliases
```sh
wd props --details
```

#### Reset properties
`wb props` first tries to find the list in the `props` folder (created at wikibase-cli root), and request them to query.wikidata.org if missing.

This means that after a while, your local version will miss new and updated properties: this can be solved by using the `--reset` or `--no-cache` options:

Option: `--no-cache`: ignore properties cache: fetch properties from the SPARQL endpoint, even if already cached
Option: `-r, --reset`: clear cached properties, in all languages

### wb sparql

A command to run a SPARQL query and get its JSON output
```sh
wb sparql <sparql or javascript file path>
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
wb sparql ./path/to/author_works.rq > ./results.json
```

Options:
* `-v, --verbose`: log the generated SPARQL
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikibase-sdk `simplifySparqlResults`](https://github.com/maxlath/wikibase-sdk/blob/master/docs/simplify_sparql_results.md) function
* `-x, --index <variable>`: get the results indexed by one of the SELECTed variables
* `-f, --format <format>`: output in a different format. Default: `json`. Alternatives: `table`
* `-e, --sparql-endpoint <url>`: customize the SPARQL endpoint (see below for examples)

```sh
wb sparql ./path/to/query.rq > ./results.json
wb sparql ./path/to/query.rq --raw > ./raw_sparql_results.json
wb sparql ./path/to/query.rq --index someVariableName > ./results_index.json
wb sparql ./path/to/query.rq --format table > ./results_table
```

This command can actually be used on any SPARQL endpoint:
```sh
echo 'SELECT * { ?s ?p ?o } LIMIT 5' > ./get_some_triples.rq
# On Wikidata
wd sparql ./get_some_triples.rq
# On another Wikibase
wb sparql ./get_some_triples.rq -e https://wikibase-registry-query.wmflabs.org/proxy/wdqs/bigdata/namespace/wdq/sparql
# On a non-Wikibase SPARQL endpoint
wb sparql ./get_some_triples.rq -e http://data.bibliotheken.nl/sparql
```

#### dynamic request from a JS file
Alernatively, you can pass the path from a javascript file exporting a function, the remaining arguments will be passed to the function:
```js
// author_works.js
module.exports = authorId => `SELECT ?item { ?item wdt:P50 wd:${authorId} . }`
```
```sh
echo 'module.exports = authorId => `SELECT ?item { ?item wdt:P50 wd:${authorId} . }' > ./path/to/author_works.js
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
Some idiomatic queries than can't be done with [`wb query`](#wb-query) are included for convenience:

##### all-instances
:warning: **Coupled to Wikidata P31 and P279 properties**

Fetch instances and instances of sub-classes of a given item.
Example, all the instances of languages (Q34770):
```sh
wb sparql all-instances Q34770
```
This can be used to fetch the data associated with all the instances of a given item. For instance, to fetch all the painting's data, you could do:
```sh
# Get the ids of all the paintings
wd sparql all-instances Q3305213 > ./paintings_ids
# Fetch their data in a simplified format, and output it all as newline-delimted JSON, one entity per line (see wd-data for details)
wd data --simplify < ./paintings_ids > ./paintings.ndjson
```

#### output format
If the query `SELECT`s only one variable, the output will, by default, be a space-separated list of values.
It can alternatively be set to output as json, either with `--format json` (`--json` would also be accepted for consistency with other commands).

If the query `SELECT`s several variables, the output will, by default, be a JSON array.
It can alternatively be requested as a table by setting `--format table`.

To consistently get JSON output, either pass the `--json` flag, or set JSON as your prefered format in config: `wd config json true` (this will affect other commands)

#### custom SPARQL endpoint
The `wb sparql` command can actually be used with on other SPARQL endpoints:
```sh
wb sparql --sparql-endpoint http://data.bnf.fr/sparql bnf_request.rq
wb sparql --sparql-endpoint http://live.dbpedia.org/sparql --raw --index item dbpedia_request.rq
```

### wb query
```sh
wb query <options>
# Alias:
wb q <options>
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

**NB**: if the `--object` value could be interpreted as a number (`123.456`) but should be a string, make sure to pass it between quotes:
```sh
# Doesn't find anything
wd query --property P2448 --object 2217527

# Finds Q138172
wd query --property P2448 --object '"2217527"'
```

Other options:
* `-r, --raw`: output raw SPARQL results (instead of results simplified by [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_sparql_results.md) function
* `-a, --labels`: requests results labels
* `-l, --lang <lang>`: specify the labels' language
* `-n, --limit <num>`: set the request results limit
* `-c, --counts`: return a count of matching results
* `-v, --verbose`: log the generated request
* `-x, --index <variable>`: get the results indexed by `subject`, `property`, or `object`
* `-f, --format <format>`: output in a different format. Default: `json`. Alternatives: `table`
* `-e, --sparql-endpoint <url>`: customize the SPARQL endpoint (see [`wb sparql`](#wb-sparql) for examples of how to use this option)

### wb convert
Convert batches of external ids to Wikibase ids and vice versa

```sh
wb convert <property> <ids...>
```

```sh
# get the Wikibase ids corresponding to those BNF ids
wd convert P268 11865344k 11932251d
# get the BNF ids corresponding to those Wikibase ids
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

> **NB**: this conversion is done by batches of 100, so calling this command with 100,000 ids will sequentially make 1000 requests to the SPARQL endpoint, which isn't very efficient; depending on the size of the dataset you're targetting, you should probably rather request all the ids at once using `wb query --property <your-property-id>`, passing the option ` --index object` if the data you have at hand is the external ids, and ` --index subject` if you are instead starting from the Wikibase ids.

Other options:
* `-v, --verbose`: log the generated request
* `-e, --sparql-endpoint <url>`: customize the SPARQL endpoint (see [`wb sparql`](#wb-sparql) for examples of how to use this option)


### wb open
```sh
wb open <entities ids>
# Alias:
wb o <entities ids>
```

A command to open a pages on Wikibase in a browser from the command line (yep, you can be that lazy). For more sophisticated queries, see the [`wb hub`](#wb-hub)

#### open entities and properties pages
```sh
wd open Q123
# opens https://wikidata.org/entity/Q123 in your default browser

wd open P659
# opens https://www.wikidata.org/entity/P659

wd open L525
# opens https://www.wikidata.org/entity/L525

wd open L525-F1
# opens https://www.wikidata.org/entity/L525-F1

wd open L525-S1
# opens https://www.wikidata.org/entity/L525-S1

# also working with any string that contains an entity id
wd open https://inventaire.io/entity/wd:Q33977
# opens https://wikidata.org/wiki/Q33977

# on a Custom wikibase instance
wb open Q123 -i http://localhost:8181
# opens http://localhost:8181/entity/Q123
```

Options:
* `-y, --history`: open the entity histor**y** page
* `-r, --revision <id>`: open a specific **r**evision
* `-p, --wikipedia`: open the Wiki**p**edia article
* `-u, --url`: simply generate the **u**rl, don't open it in a browser
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

#### open a specific revision's page
```sh
wd open Q44559 --revision 942578737
```

### wb hub
```sh
wb hub <query>
# Alias:
wb h <query>
```

A command to open web pages using the [Hub](https://tools.wmflabs.org/hub/). Pass arguments to the Hub as you would from a URL, replacing ? and & by spaces.

**Command status**: inheriting Wikidata coupling from the Hub

Options:
* `-l, --lang <lang>`: specify which language should be prefered
* `-j, --json`: get the Hub redirection data instead of opening the page in browser

Examples:
```sh
# Find the entity having 24597135 as VIAF id and open the corresponding page on inventaire.io
wd hub viaf:24597135 site=inventaire
# Get the image illustrating Q3 in 300px
wd hub Q3 property=image width=300 --json | jq .destination.url
```

### wb lang
Identify a language and return its associated data

**Command status**: coupled to Wikidata languages

**get the Wikibase id corresponding to a language code**
```sh
wd lang ak
# => Q28026
```

**get the language code corresponding to a Wikibase id**
```sh
wd lang Q28026
# => ak
```

**get languages matching a given string**
```sh
wd lang slo
# sk    Q9058      Slovak     Slovenčina
# sl    Q9063      Slovenian  Slovenščina
```

Options:
* `-j, --json`: get the full language data as JSON
```sh
wd lang ak --json
wd lang Q28026 --json
```
Both commands return the following data:
```json
{
  "code": "ak",
  "label": "Akan",
  "native": "Akana",
  "wd": "Q28026"
}
```
