# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 19.1.0 - 2025-10-21
* [`wb open`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-open): added support for opening entity pages and scroll to a specific statement, by passing a statement id

## 19.0.0 - 2025-10-01
**BREAKING CHANGE**: * In simplified claims (as returned by commands such as `wb data --simplify`), the `simplifiedClaim.type` attribute was renamed to `simplifiedClaim.datatype`, for consistency with the raw entities' naming
* [`wb data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): improved support for lexemes, forms and senses

## 18.3.0 - 2024-11-20
* Added global [`--config` option](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#config-1) and `WB_CONFIG` environment variable, to allow customizing the config used

## 18.2.0 - 2024-10-05
* [`wd revisions`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-revisions): now accepts ids on stdin and `--props`

## 18.1.0 - 2024-08-13
* [`wb move-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-claim): Allow to change the moved claim value

## 18.0.0 - 2024-03-15
**BREAKING CHANGE**: updated NodeJS minimal version to `>= v18` to be able to use the native [`fetch`](https://nodejs.org/dist/latest/docs/api/globals.html#fetch)

## 17.0.0 - 2023-07-17
**BREAKING CHANGE**: updated NodeJS minimal version `>= v14.0.0` to be able to convert the code from CommonJS to [ES modules](https://nodejs.org/api/esm.html)
* Added support for `entity.statements` as an alias for `entity.claims`, to support Wikibase-ish instances such as https://commons.wikimedia.org. For more on this oddity, see https://phabricator.wikimedia.org/T149410.
* [`wb summary`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-summary): include an extract from the corresponding Wikipedia article when available

## 16.3.0 - 2022-11-02
* Added [`wb badges`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-badges)
* Added [`wb add-badge`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-badge)
* Added [`wb remove-badge`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-badge)
* [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql) / [`wb query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query): added `--log-response-headers`  option

## 16.2.0 - 2022-11-01
* Added [`wb remove-label`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-label)
* Added [`wb remove-description`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-description)
* Added [`wb set-sitelink`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-set-sitelink)
* Added [`wb remove-sitelink`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-sitelink)
* [`wb data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): added `--keep badges` option

## 16.1.0 - 2022-06-27
* [`wb merge-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-merge-entity): add `--keep-oldest` option

## 16.0.0 - 2022-05-03
**BREAKING CHANGE**: updated NodeJS minimal version `>= v10.0.0`

## 15.17.0 - 2022-04-11
* [`wb search`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-search): added support for Cirrus search

## 15.16.0 - 2022-01-16
* [`wb edit-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#edit-entity)/[`wb create-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#create-claim)/[`wb remove-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#remove-claim): add reconciliation capabilities, through [`wikibase-edit` reconciliation syntax](https://github.com/maxlath/wikibase-edit/blob/main/docs/how_to.md#reconciliation)
* [`wb props`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-props): allow to filter by both type and pattern
* [`wb claims`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-claims): allow to filter claims by both type and pattern

## 15.15.0 - 2021-10-18
* [`wb data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): allow to set the `nondeprecated` simplify option

## 15.14.0 - 2021-10-12
* allow to pass templates to all edit commands where it wasn't possible yet (`wb-add-alias`, `wb-add-qualifier`, `wb-add-reference`, `wb-delete-entity`, `wb-merge-entity`, `wb-move-claim`, `wb-move-qualifier`, `wb-remove-alias`, `wb-remove-claim`, `wb-remove-reference`, `wb-remove-qualifier`, `wb-set-alias`, `wb-set-description`, `wb-set-label`, `wb-update-claim`, `wb-update-qualifier`)
* allow to set `dryRun=false` in templates examples
* allow to set a `commands` shortlist in templates

## 15.13.0 - 2021-10-01
* [`wb data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): added [`--time-converter`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#time-converter)

## 15.12.0 - 2021-09-01
* [`wb id`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-id): added support for dbpedia urls
* [`wb query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query): added `--sample` and `--describe` modes

## 15.11.0 - 2021-05-01
* [`wb data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): added support for [entities schema](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#entities-schema)
* [`wb generate-template`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-generate-template): added a `--json` (equivalent to `--format json`)

## 15.10.0 - 2020-12-27
* [`wb create-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#create-entity) / [`wb edit-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#edit-entity): allow to [generate several edit objects at once](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#generate-several-edit-objects)

## 15.9.0 - 2020-12-14
* Edit commands: allow to [set the `baserevid`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#baserevid)

## 15.8.0 - 2020-12-01
* [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql): added support for template metadata, allowing to generate a [template-specific `--help` menu]

## 15.7.0 - 2020-12-01
* [`wb move-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-qualifier) / [`wb remove-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-qualifier): accept statement uri in place of a statement guid
* [template help menu](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#template-help-menu): added a [new recommended template syntax](https://github.com/maxlath/wikibase-cli/blob/15c824e/tests/assets/edit_data_function.js)
* [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql) / [`wb query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query): add support for xml, tsv, csv, and rdfbin formats

## 15.6.0 - 2020-11-30
* [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql): Added support for async SPARQL-generating functions

## 15.5.0 - 2020-11-06
* [`wb generate-template`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-generate-template): added a `--no-minimize` flag

## 15.4.0 - 2020-11-01
* [`create-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#create-entity) / [`edit-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#edit-entity): add support for [template metadata, allowing to generate a template-specific `--help` menu](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#template-help-menu)

## 15.3.0 - 2020-10-07
* [`wb open`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-open): added a `--talk` option to open an entity's talk page
* [`wb move-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-claim) / [`wb move-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-qualifier): add type conversion between properties of different datatypes

## 15.2.0 - 2020-08-07
* [`wb add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-claim), [`wb update-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-update-claim): Added support for the object interface
* Added support for custom calendars (example with [`wb add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#json-format))

## 15.1.0 - 2020-07-21
* [`wb add-reference`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-reference): support [adding a reference with multiple snaks](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#add-a-reference-with-multiple-snaks)

## 15.0.0 - 2020-07-21
**BREAKING CHANGE**: [`wb convert`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-convert) now requires ids to be passed as explicit subject or object options.

## 14.1.0 - 2020-07-19
* [`wb add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-claim), [`wb update-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-update-claim): Added a `--rank` option

## 14.0.0 - 2020-07-17
**BREAKING CHANGE**: local files are now always stored in the home directory. **To keep your current config after this upgrade**, follow this steps:
```sh
mkdir -p ~/.config/wikibase-cli
wb config --json > ~/.config/wikibase-cli/config.json
# Now we can run the upgrade
npm install -g wikibase-cli@14
```

## 13.2.0 - 2020-07-16
* [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql), [`wb query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query): Added options `--dry` and `--open`

## 13.1.0 - 2020-07-11
* [batch mode](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#batch-mode): allow to combine arguments passed inline and those passed on stdin

## 13.0.0 - 2020-06-26
**BREAKING CHANGE**: output now defaults to newline-delimited values (instead of space-delimited values)

## 12.2.0 - 2020-06-10
* [`wb data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): added support for [property claims id](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#property-claims)

## 12.1.0 - 2020-06-10
* Added [`wb move-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-qualifier)
* [`wb move-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-claim): allow to move all property claims at once

## 12.0.0 - 2020-05-17
* [`wb-generate-template`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-generate-template):
  * **BREAKING CHANGE**: default to format js, when only one entity is requested
  * When using `--format js`: add entities labels as comments
  * Added `--create-mode` option
* Added [`wb move-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-move-claim)

## 11.3.0 - 2020-05-03
* [`wb config credentials`](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#credentials): add a `test` mode, to easily validate credentials
* `wb config <option> reset` => [`wb config <option> reset`](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#reset) (but the keyword `clear` remains available to avoid a breaking change)

## 11.2.0 - 2020-05-02
* batch mode: added [`--no-exit-on-error` option](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#handle-batch-errors)

## 11.1.0 - 2020-04-26
* [`wb-generate-template`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-generate-template): add batch mode

## 11.0.0 - 2020-04-18
**BREAKING CHANGE**:
* the short option `-n` is repurposed to alias `--limit` in read operations (it was previously associated with the `--no-cache` option)
* the short option `-t` is repurposed to alias `--type` in read operations (it was previously associated with the `--limit` option)

**New features**:
* [`wb summary`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-summary): added support for lexemes
* [`wb search`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-search): added support for lexemes, forms, and senses
* [`wb open`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-open): added support for lexemes, forms, and senses
* [`wb lemma`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-lemma)

## 10.0.0 - 2020-04-08
**BREAKING CHANGE**: Removed the `-g, --edit-group <key>` option, as it is now automatically generated when in batch mode and targeting wikidata.org
* Added [edit summary](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#edit-summary)

## 9.2.0 - 2020-03-08
* Added [edit group](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#edit-group) support

## 9.1.0 - 2020-03-08
* Added [batch mode](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#batch-mode) to write operations

## 9.0.0 - 2019-12-16
**BREAKING CHANGE**: updated `wikibase-edit` to `> v4.0.0`, which uses async/await, and started using those internally too, thus requiring NodeJS `>= v7.6.0`. If you are locked on an older version of NodeJS, you are thus advised to stay on `wikibase-cli@8`

## 8.2.0 - 2019-11-28
* [`wb-data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data) / [`wb-generate-template`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-generate-template): add lazy syntax to props selection

## 8.1.0 - 2019-11-07
* [`wb query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query): add `--count` option

## 8.0.0 - 2019-10-01
**BREAKING CHANGES**:
* **renamed**:
  * `create-item` => [`create-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#create-entity)
  * `edit-item` => [`edit-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#edit-entity)
  * `wb config <option> default` => [`wb config <option> clear`](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#clear)
* **removed**:
  * `wb-coord` (as it was just an alias of `wb claims P625`, and thus coupled to Wikidata)
* **changed behavior**:
  * `wb-add-claim`: doesn't stop you from creating duplicated claims anymore (no claim existance check)
* **changed aliases**:
  * `wb s` is now an alias for `wb sparql`, while `wb u` is `wb summary` new alias

**New features**:
* Added a **`wb` command, which is now considered the default command in the documentation**, `wd` simply now being the Wikidata-bound version of it.
* Added [multiple instances credentials](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#credentials) support (so that acting on different instances now only depends on the command flags without the painful process of entering credentials)
* Added [OAuth tokens](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#credentials) support
* Added [`wb delete-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-delete-entity)
* Added [`wb merge-entity`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-merge-entity)
* Add option `--format table` to [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql) and [`wb query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query)
* Add option `--all` to [`wb claims`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-claims)
* Add alias `wb r` to [`wb sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql)

## 7.5.0 - 2019-05-29
* [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): allow to [request sub property keys](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#filtered-properties)

## 7.4.0 - 2019-05-25
* [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): allow to [fetch an old revision's data](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#fetch-an-old-revision)
* [`wd generate-template`](https://github.com/maxlath/wikibase-cli#wb-generate-template): allow to [generate template from a specific revision](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#generate-template-from-a-specific-revision)
* [`wd generate-open`](https://github.com/maxlath/wikibase-cli#wb-generate-template): allow to open a specifc revision's page

## 7.3.0 - 2019-05-17
* [`wd create-item`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-create-item) / [`wd edit-item`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-edit-item): accept JS files as input, where the JS file should export either an object or a function, to which command line arguments are passed
* Added [`wd generate-template`](https://github.com/maxlath/wikibase-cli#wb-generate-template): a command to easily create those JSON or JS files to be passed to `wd create-item` or `wd edit-item` from existing items
* [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): allow to fetch a single claim's data by passing a claim GUID
* Added [`wd lang`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-lang)

## 7.2.0 - 2019-02-26
* [`wd claims`](https://github.com/maxlath/wikibase-cli#wb-claims) returns claims GUIDs when provided with a property and a value

## 7.1.0 - 2018-12-22
* Added new `keep` options values to [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#keep): `richvalues` and `types` (commit 6cd7b7f)
* Add option [`-y, --history` to `wd open`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-open)

## 7.0.0 - 2018-10-05
* **BREAKING CHANGE**: `wd sparql` or `wd query` commands making use of the `--index <variable>` option now get their values aggregated in an array instead of being the direct value of the index key, preventing to delete multiple values for a same key.

## 6.6.0 - 2018-10-05
* Added [`wd convert`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-convert)

## 6.5.0 - 2018-10-02
* [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data): added support for `format=ttl`

## 6.4.0 - 2018-09-24
* Added [`wd hub`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-hub)

## 6.3.0 - 2018-08-07
* Added support for 'novalue' and 'somevalue' snaktypes to [`add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#special-claim-snaktypes) and [`add-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#special-qualifier-snaktypes)

## 6.2.0 - 2018-06-26
* Added the possibility to override config options with [environment variables](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#environment-variables)

## 6.1.0 - 2018-06-07
* `wd props`:
  * [allow to filter properties by matching on descriptions and aliases, instead of just labels](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-props)
  * [added a `-d, --details` option to output properties with all the available data: labels, types, descriptions, aliases](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#get-the-list-of-all-wikidata-properties-with-their-labels-types-descriptions-and-aliases)

## 6.0.0 - 2017-12-16
* **BREAKING CHANGE**: [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data) and [`wd revisions`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-revisions) now output [newline delimited JSON](https://en.wikipedia.org/wiki/JSON_streaming#Line-delimited_JSON), which is valid JSON if taken line by line, but not as a whole.
* [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data) can now fetch more than 50 entities at once and accepts ids from stdin
* Added [`wd sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql) wellknown query: [`all-instances`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#all-instances)

## 5.7.0 - 2017-12-16
* Add option [`-t, --limit` to `wd search`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-search)
* [`wd claims`](https://github.com/maxlath/wikibase-cli#wb-claims) accepts a filter pattern as second arguments, filtering claims by their properties type or label
* [`wd props --type`](https://github.com/maxlath/wikibase-cli#wb-props) accepts an additional arguments to filter matching properties by property type
* Add option [`-n, --no-cache` to `wd props`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-props)

## 5.6.0 - 2017-12-13
* Add option [`-x, --index` to `wd sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql), returns the request results as an index instead of a list

## 5.5.0 - 2017-12-08
* `wd claims`, `wd data`, `wd open`, and `wd revisions` accept numeric ids, assume it's an item id (commit: 37afea9)

## 5.4.0 - 2017-12-06
* Added the command `wikibase-cli` as an alias to `wd` [UPDATE: implementation failed, removed by d0df064]

## 5.3.0 - 2017-11-30
* Added the possibility to pass a JS file to [`wd sparql`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-sparql) to generate SPARQL requests from the command arguments

## 5.2.0 - 2017-11-29
* Add option [`-v, --verbose` to `wd search`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-search) which passes the found ids to [`wd summary`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-summary)

## 5.1.0 - 2017-11-09
* Added `keep` options to [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#keep)

## 5.0.0 - 2017-11-03
* **BREAKING CHANGE**: [`wd add-reference`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-reference) expects a property to be explicity set
* **BREAKING CHANGE**: [`wd add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-claim) now can't be passed a reference: the reference needs to be added separately. See [add claim with a reference](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#with-a-reference).
* Entity attribute commands ([`wd summary`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-summary), [`wd label`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-label), [`wd description`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-description), [`wd aliases`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-aliases)) can now request the attributes of several entities at once
* [`wd add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-claim) accepts time values with month or day precision
* [`wd add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-claim) now supports [rich values]((https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#rich-values))
* Added [`wd edit-item`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-edit-item)
* Added [`wd remove-reference`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-reference)
* Added [`wd add-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-qualifier)
* Added [`wd update-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-update-qualifier)
* Added [`wd remove-qualifier`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-qualifier)

## 4.19.0 - 2017-10-29
* Added [`wd create-item`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-create-item)

## 4.18.0 - 2017-10-13
* Let [`wd props`](https://github.com/maxlath/wikibase-cli#wb-props) accept additional arguments to filter matching properties

## 4.17.0 - 2017-10-13
* Added [`wd summary --properties` option](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-summary)

## 4.16.0 - 2017-10-13
* Added [bot](https://github.com/maxlath/wikibase-cli/blob/main/docs/config.md#bot) support

## 4.15.0 - 2017-10-07
* Added [`wd search`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-search)

## 4.14.0 - 2017-09-11
* Added [`wd aliases`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-aliases)
* Added [`wd add-alias`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-alias)
* Added [`wd remove-alias`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-remove-alias)
* Added [`wd set-alias`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-set-alias)

## 4.13.0 - 2017-06-10
* Added [`wd revisions`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-revisions)

## 4.12.0 - 2017-05-29
* Add option [`-p,--props` to `wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#filtered-properties)

## 4.11.0 - 2017-05-24
* Added [`wd update-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-update-claim)

## 4.10.0 - 2017-05-24
* Added [`wd remove-description`](https://github.com/maxlath/wikibase-cli#wb-remove-description)

## 4.9.0 - 2017-05-14
* Added [`wd set-description`](https://github.com/maxlath/wikibase-cli#wb-set-description)

## 4.8.0 - 2017-03-31
* Added multiple entities mode to [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data)
* Added `simplify` option to [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data)
* Output [`wd data`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-data) data as Wikidata-Dump-style line delimited JSON to make filterable by [`wikidata-filter`](https://github.com/maxlath/wikidata-filter)

## 4.7.0 - 2017-03-30
* Added [`wd summary`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-summary)
* Added [`wd description`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-description)

## 4.6.0 - 2017-02-20
* Added option `-u,--url` to [`wd open`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-open)

## 4.5.0 - 2017-02-20
* Added [`wd set-label`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md/blob/master/docs/write_operations.md#wb-set-label)
* Added [`wd add-reference`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-reference)

## 4.4.0 - 2017-02-19
* Added [`wd add-claim`](https://github.com/maxlath/wikibase-cli/blob/main/docs/write_operations.md#wb-add-claim)
* Added [`wd config`](https://github.com/maxlath/wikibase-cli#config)

## 4.3.0 - 2017-02-07
* Added [`wd props --type`](https://github.com/maxlath/wikibase-cli#get-the-list-of-all-wikidata-properties-and-their-data-types)

## 4.2.0 - 2017-01-28
* Added [`wd coord`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-coord)

## 4.1.0 - 2017-01-24
* [`wd open`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-open) opens a search page when no entity or property id can be found in the input

## 4.0.0 - 2017-01-21
* Make results minimalist unless bassed the `-v, --verbose` option. Could be considered a breaking change as one might have built on the default verbose outputs.
* Not copying results to clipboard anymore, unless passed the `-c, --clipboard` option
* Format outputs for the shell by default, unless passed the `-j, --json` option
* Renamed `wd wikiqid` to [`wd id`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-id). Using [github#master version of commander to be able to set wikiqid as an alias](https://github.com/tj/commander.js/issues/402) to avoid making it a breaking change.

## 3.0.0 - 2016-08-29
* Renamed `wd graph` -> [`wd query`](https://github.com/maxlath/wikibase-cli/blob/main/docs/read_operations.md#wb-query)

## 2.1.0 - 2016-08-29
* Added `wd graph`

## 2.0.0 - 2016-08-26
* Added a help menu: `wd help`
* Renamed `qlabel` -> `wd label`
* Renamed `qclaims` -> `wd claims`
* Renamed `qdata` -> `wd data`
* Renamed `wdprops` -> `wd props`
* Renamed `wdprops reset` -> `wd props --reset`
* Renamed `wikiqid` -> `wd wikiqid`
* Renamed `wdsparql` -> `wd sparql`
* Removed `wdsparqlsimplify`: use `wd sparql -s`
* Replaced all language options by a uniformized `-l, --lang` option
* Added `wd open`

## 1.7.0 - 2016-07-24
* Added [qdata](https://github.com/maxlath/wikibase-cli#qdata), a command to get the data of a given entity

## 1.6.0 - 2016-07-17
* [wikiqid](https://github.com/maxlath/wikibase-cli#wikiqid) accepts full wikipedia urls

## 1.5.0 - 2016-06-18
* Added [wdsparqlsimplify](https://github.com/maxlath/wikibase-cli#wdsparqlsimplify), like `wdsparql` but with simplified results out of the box

## 1.4.0 - 2016-06-18
* Added [wdprops](https://github.com/maxlath/wikibase-cli#wdprops), a command to get the list of all Wikidata properties

## 1.3.1 - 2016-06-06
* Added a new option to [wdsparql](https://github.com/maxlath/wikibase-cli#wdsparql):

  `--simplify`, which simplifies the query results using [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk/blob/master/docs/simplify_sparql_results.md) function

## 1.2.1 - 2016-06-03
* Commands use the environment local language as default instead of English

## 1.2.0 - 2016-06-03
* Added [wdsparql](https://github.com/maxlath/wikibase-cli#wdsparql)

## 1.1.0 - 2016-05-13
* Added [qclaims](https://github.com/maxlath/wikibase-cli#qclaims)

## 1.0.0 - 2016-05-13
* Created project, starting with [qlabel](https://github.com/maxlath/wikibase-cli#qlabel) and [wikiqid](https://github.com/maxlath/wikibase-cli#wikiqid) commands
