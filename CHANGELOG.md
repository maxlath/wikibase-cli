# CHANGELOG
*versions follow [SemVer](http://semver.org)*

## 4.5.0 - 2017-02-20
* Added [`wd set-label`](https://github.com/maxlath/wikidata-cli#wd-set-label)
* Added [`wd add-reference`](https://github.com/maxlath/wikidata-cli#wd-add-reference)

## 4.4.0 - 2017-02-19
* Added [`wd add-claim`](https://github.com/maxlath/wikidata-cli#wd-add-claim)
* Added [`wd config`](https://github.com/maxlath/wikidata-cli#config)

## 4.3.0 - 2017-02-07
* Added [`wd props --type`](https://github.com/maxlath/wikidata-cli#get-the-list-of-all-wikidata-properties-and-their-data-types)

## 4.2.0 - 2017-01-28
* Added [`wd coord`](https://github.com/maxlath/wikidata-cli#wd-coord)

## 4.1.0 - 2017-01-24
* [`wd open`](https://github.com/maxlath/wikidata-cli#wd-open) opens a search page when no entity or property id can be found in the input

## 4.0.0 - 2017-01-21
* Make results minimalist unless bassed the `-v, --verbose` option. Could be considered a breaking change as one might have built on the default verbose outputs.
* Not copying results to clipboard anymore, unless passed the `-c, --clipboard` option
* Format outputs for the shell by default, unless passed the `-j, --json` option
* Renamed `wd wikiqid` to [`wd id`](https://github.com/maxlath/wikidata-cli#wd-id). Using [github#master version of commander to be able to set wikiqid as an alias](https://github.com/tj/commander.js/issues/402) to avoid making it a breaking change.

## 3.0.0 - 2016-08-29
* Renamed `wd graph` -> [`wd query`](https://github.com/maxlath/wikidata-cli#wd-query)

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
* Added [qdata](https://github.com/maxlath/wikidata-cli#qdata), a command to get the data of a given entity

## 1.6.0 - 2016-07-17
* [wikiqid](https://github.com/maxlath/wikidata-cli#wikiqid) accepts full wikipedia urls

## 1.5.0 - 2016-06-18
* Added [wdsparqlsimplify](https://github.com/maxlath/wikidata-cli#wdsparqlsimplify), like `wdsparql` but with simplified results out of the box

## 1.4.0 - 2016-06-18
* Added [wdprops](https://github.com/maxlath/wikidata-cli#wdprops), a command to get the list of all Wikidata properties

## 1.3.1 - 2016-06-06
* Added a new option to [wdsparql](https://github.com/maxlath/wikidata-cli#wdsparql):

  `--simplify`, which simplifies the query results using [wikidata-sdk `simplifySparqlResults`](https://github.com/maxlath/wikidata-sdk#simplify-sparql-results) function

## 1.2.1 - 2016-06-03
* Commands use the environment local language as default instead of English

## 1.2.0 - 2016-06-03
* Added [wdsparql](https://github.com/maxlath/wikidata-cli#wdsparql)

## 1.1.0 - 2016-05-13
* Added [qclaims](https://github.com/maxlath/wikidata-cli#qclaims)

## 1.0.0 - 2016-05-13
* Created project, starting with [qlabel](https://github.com/maxlath/wikidata-cli#qlabel) and [wikiqid](https://github.com/maxlath/wikidata-cli#wikiqid) commands
